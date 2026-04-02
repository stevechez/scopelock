'use server';

import { revalidatePath } from 'next/cache';
import { supabase } from '@/lib/supabase';
import twilio from 'twilio';

// Initialize Twilio
const twilioClient = twilio(
	process.env.TWILIO_ACCOUNT_SID,
	process.env.TWILIO_AUTH_TOKEN,
);

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

/**
 * 2. CHANGE ORDERS (ScopeLock)
 */
export async function createChangeOrder(
	jobId: string,
	description: string,
	price: number,
) {
	const { data, error } = await supabase
		.from('change_orders')
		.insert([{ job_id: jobId, description, price, status: 'pending' }])
		.select()
		.single();

	if (error) throw new Error('Failed to create change order');

	revalidatePath(`/dashboard/jobs/${jobId}`);
	revalidatePath('/dashboard');
	return data;
}

/**
 * 3. PAYMENTS & MILESTONES (PayRail)
 */
export async function createMilestone(
	jobId: string,
	title: string,
	amount: number,
) {
	const { data, error } = await supabase
		.from('milestones')
		.insert([{ job_id: jobId, title, amount, status: 'pending' }])
		.select()
		.single();

	if (error) throw new Error('Failed to create milestone');

	revalidatePath(`/dashboard/jobs/${jobId}/payments`);
	return data;
}

export async function requestMilestonePayment(
	milestoneId: string,
	jobId: string,
	proofImageUrl: string,
) {
	// Update Milestone
	const { error: updateError } = await supabase
		.from('milestones')
		.update({
			status: 'invoiced',
			proof_image_url: proofImageUrl,
			completed_at: new Date().toISOString(),
		})
		.eq('id', milestoneId);

	if (updateError) throw new Error('Database update failed');

	// Fetch details for SMS
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
		const messageBody = `BlueprintOS: ${job.title} update! Milestone "${milestone.title}" is complete. Tap here to view the photo and pay $${milestone.amount}: ${paymentLink}`;

		await twilioClient.messages.create({
			body: messageBody,
			from: process.env.TWILIO_PHONE_NUMBER,
			to: clientPhone,
		});
	} catch (error) {
		console.error('SMS failed:', error);
	}

	revalidatePath(`/dashboard/jobs/${jobId}/payments`);
}

/**
 * 4. FIELD OPS (SitePulse)
 */
export async function submitDailyPulse(
	jobId: string,
	notes: string,
	photoUrl: string,
) {
	const { data: log, error: logError } = await supabase
		.from('daily_logs')
		.insert([{ job_id: jobId, notes, crew_member_name: 'Field Crew' }])
		.select()
		.single();

	if (logError) throw new Error('Failed to create log entry');

	const { error: photoError } = await supabase
		.from('log_photos')
		.insert([{ log_id: log.id, photo_url: photoUrl }]);

	if (photoError) throw new Error('Failed to attach photo');

	revalidatePath(`/dashboard/jobs/${jobId}/pulse`);
	revalidatePath('/dashboard');
	return { success: true };
}
