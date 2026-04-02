'use server';

import { revalidatePath } from 'next/cache';
import { supabase } from '@/lib/supabase';
import twilio from 'twilio';
import {
	lemonSqueezySetup,
	createCheckout,
} from '@lemonsqueezy/lemonsqueezy.js';

// Initialize external clients
const twilioClient = twilio(
	process.env.TWILIO_ACCOUNT_SID,
	process.env.TWILIO_AUTH_TOKEN,
);

lemonSqueezySetup({ apiKey: process.env.LEMON_SQUEEZY_API_KEY });

/**
 * 1. JOB MANAGEMENT
 */
export async function createJob(
	title: string,
	clientPhone: string,
	baseValue: number,
) {
	const { data, error } = await supabase
		.from('jobs')
		.insert([
			{
				title,
				client_phone: clientPhone,
				base_contract_value: baseValue,
				status: 'active',
			},
		])
		.select()
		.single();

	if (error) {
		console.error('Error creating job:', error);
		throw new Error('Failed to create job');
	}

	revalidatePath('/dashboard');
	return data;
}

export async function createChangeOrder(
	jobId: string,
	description: string,
	price: number,
) {
	const { data, error } = await supabase
		.from('change_orders')
		.insert([
			{
				job_id: jobId,
				description,
				price,
				status: 'pending',
			},
		])
		.select()
		.single();

	if (error) {
		console.error('Error creating change order:', error);
		throw new Error('Failed to create change order');
	}

	revalidatePath(`/dashboard/jobs/${jobId}`);
	revalidatePath('/dashboard');

	return data;
}

/**
 * 2. PAYMENTS & MILESTONES (PayRail)
 */
export async function createMilestone(
	jobId: string,
	title: string,
	amount: number,
) {
	const { data, error } = await supabase
		.from('milestones')
		.insert([
			{
				job_id: jobId,
				title,
				amount,
				status: 'pending',
			},
		])
		.select()
		.single();

	if (error) {
		console.error('Error creating milestone:', error);
		throw new Error('Failed to create milestone');
	}

	revalidatePath(`/dashboard/jobs/${jobId}/payments`);

	return data;
}

export async function requestMilestonePayment(
	milestoneId: string,
	jobId: string,
	proofImageUrl: string,
) {
	const { error: updateError } = await supabase
		.from('milestones')
		.update({
			status: 'invoiced',
			proof_image_url: proofImageUrl,
			completed_at: new Date().toISOString(),
		})
		.eq('id', milestoneId);

	if (updateError) {
		console.error('Failed to update milestone:', updateError);
		throw new Error('Database update failed');
	}

	const { data: job } = await supabase
		.from('jobs')
		.select('*')
		.eq('id', jobId)
		.single();

	const { data: milestone } = await supabase
		.from('milestones')
		.select('*')
		.eq('id', milestoneId)
		.single();

	const clientPhone = job?.client_phone || '+15551234567';
	const paymentLink = `${process.env.NEXT_PUBLIC_SITE_URL}/pay/${milestoneId}`;

	try {
		const messageBody = `BlueprintOS: ${job.title} update! Milestone "${milestone.title}" is complete. Tap here to view the photo and submit your secure payment of $${milestone.amount}: ${paymentLink}`;

		await twilioClient.messages.create({
			body: messageBody,
			from: process.env.TWILIO_PHONE_NUMBER,
			to: clientPhone,
		});
		console.log('✅ Payment Request SMS Sent!');
	} catch (error) {
		console.error('⚠️ SMS failed, but database updated:', error);
	}

	revalidatePath(`/dashboard/jobs/${jobId}/payments`);
}

export async function simulatePayment(milestoneId: string) {
	const { error } = await supabase
		.from('milestones')
		.update({ status: 'paid' })
		.eq('id', milestoneId);

	if (error) throw new Error('Payment simulation failed');

	revalidatePath(`/dashboard/jobs/`);
	return { success: true };
}

export async function getPaymentLink(milestoneId: string) {
	const { data: milestone } = await supabase
		.from('milestones')
		.select('*, jobs(*)')
		.eq('id', milestoneId)
		.single();

	if (!milestone) throw new Error('Milestone not found');

	const checkout = await createCheckout(
		process.env.LEMON_SQUEEZY_STORE_ID!,
		process.env.LEMON_SQUEEZY_VARIANT_ID!,
		{
			checkoutData: {
				custom: {
					milestone_id: milestoneId,
				},
			},
			// 👇 customPrice goes here at the root level!
			customPrice: Math.round(Number(milestone.amount) * 100),
			productOptions: {
				name: `${milestone.title}`,
				description: `Project: ${(milestone.jobs as any).title}`,
				receiptButtonText: 'Return to Project',
				receiptLinkUrl: `${process.env.NEXT_PUBLIC_SITE_URL}/pay/${milestoneId}`,
			},
		},
	);

	return checkout.data?.data.attributes.url;
}

/**
 * 3. FIELD OPS (SitePulse)
 */
export async function submitDailyPulse(
	jobId: string,
	notes: string,
	photoUrl: string,
) {
	const { data: log, error: logError } = await supabase
		.from('daily_logs')
		.insert([
			{
				job_id: jobId,
				notes,
				crew_member_name: 'Field Crew',
			},
		])
		.select()
		.single();

	if (logError) throw new Error('Failed to create log entry');

	const { error: photoError } = await supabase.from('log_photos').insert([
		{
			log_id: log.id,
			photo_url: photoUrl,
		},
	]);

	if (photoError) throw new Error('Failed to attach photo');

	revalidatePath(`/dashboard/jobs/${jobId}/pulse`);
	return { success: true };
}

/**
 * 4. LEAD GENERATION (Site Engine)
 */
export async function submitLead(data: {
	projectType: string;
	budget: string;
	timeline: string;
	name: string;
	phone: string;
}) {
	const { error } = await supabase.from('leads').insert([
		{
			project_type: data.projectType,
			budget: data.budget,
			timeline: data.timeline,
			client_name: data.name,
			client_phone: data.phone,
			status: 'new',
		},
	]);

	if (error) {
		console.error('Error submitting lead:', error);
		throw new Error('Failed to submit application');
	}

	return { success: true };
}

/**
 * 6. CRM LEAD CONVERSION
 */
export async function acceptLead(leadId: string) {
	// 1. Fetch the lead
	const { data: lead, error: leadError } = await supabase
		.from('leads')
		.select('*')
		.eq('id', leadId)
		.single();

	if (leadError || !lead) throw new Error('Lead not found');

	// 2. Parse a rough base contract value from their budget string
	let baseValue = 0;
	if (lead.budget.includes('25k')) baseValue = 25000;
	if (lead.budget.includes('50k')) baseValue = 50000;
	if (lead.budget.includes('100k')) baseValue = 100000;

	// 3. Create the new Job
	const { data: job, error: jobError } = await supabase
		.from('jobs')
		.insert([
			{
				title: `${lead.client_name} - ${lead.project_type}`,
				client_phone: lead.client_phone,
				base_contract_value: baseValue,
				status: 'active',
			},
		])
		.select()
		.single();

	if (jobError) throw new Error('Failed to create job from lead');

	// 4. Mark the lead as accepted
	await supabase.from('leads').update({ status: 'accepted' }).eq('id', leadId);

	revalidatePath('/dashboard/leads');
	revalidatePath('/dashboard');

	return job;
}

/**
 * 0. AUTHENTICATION (The Keys)
 */
export async function signIn(email: string, password: string) {
	const { error } = await supabase.auth.signInWithPassword({
		email,
		password,
	});

	if (error) {
		console.error('Login error:', error.message);
		throw new Error(error.message);
	}

	// Redirect happens on the client side after a successful response
	return { success: true };
}
