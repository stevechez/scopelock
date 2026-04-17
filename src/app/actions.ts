// src/app/actions.ts
'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { createServerClient } from '@supabase/ssr';
import Stripe from 'stripe';

// 📍 Standard Client (Internal/Auth)
import { createClient } from '@/utils/supabase/server';

// 📍 Lemon Squeezy Imports
import {
	lemonSqueezySetup,
	createCheckout,
} from '@lemonsqueezy/lemonsqueezy.js';

// Initialize Lemon Squeezy
lemonSqueezySetup({ apiKey: process.env.LEMON_SQUEEZY_API_KEY || '' });

// --- SHARED TYPES ---
export type ActionResponse = {
	success: boolean;
	message?: string;
} | null;

export interface ProjectOverrides {
	name: string;
	budget: string;
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
	apiVersion: '2025-01-27.acacia',
});

// ==========================================
// 1. AUTHENTICATION & ONBOARDING
// ==========================================
export async function signUpAction(prevState: any, formData: FormData) {
	const supabase = await createClient();
	const email = formData.get('email') as string;
	const password = formData.get('password') as string;

	const { error } = await supabase.auth.signUp({
		email,
		password,
		options: {
			emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/onboarding`,
		},
	});

	if (error) return { error: error.message, success: false };
	redirect('/onboarding');
}

export async function loginAction(prevState: any, formData: FormData) {
	const supabase = await createClient();
	const email = formData.get('email') as string;
	const password = formData.get('password') as string;

	const { error } = await supabase.auth.signInWithPassword({ email, password });
	if (error) return { error: error.message, success: false };

	// Simply redirect to /dashboard.
	// If the user is on app.localhost, it stays on app.localhost.
	redirect('/dashboard');
}

export async function completeOnboarding(
	companyName: string,
	fullName: string,
) {
	const supabase = await createClient();
	let isSuccessful = false;

	try {
		const {
			data: { user },
			error: authError,
		} = await supabase.auth.getUser();

		if (authError || !user) throw new Error('Auth session missing.');

		// 1. Create a unique slug
		const uniqueSlug = `${companyName.toLowerCase().replace(/\s+/g, '-')}-${Math.floor(Math.random() * 1000)}`;

		// 2. Insert the Tenant
		const { data: tenant, error: tenantError } = await supabase
			.from('tenants')
			.insert([
				{
					name: companyName,
					slug: uniqueSlug,
					owner_id: user.id,
					created_by: user.id,
				},
			])
			.select()
			.single();

		if (tenantError || !tenant)
			throw new Error(`Database Error: ${tenantError?.message}`);

		// 3. Update User Metadata (Linking them to the new tenant)
		const { error: updateError } = await supabase.auth.updateUser({
			data: {
				onboarding_complete: true,
				tenant_id: tenant.id,
				full_name: fullName,
			},
		});

		if (updateError) throw new Error('Failed to update user profile.');

		isSuccessful = true;
	} catch (err: any) {
		// Log the actual error for you, return a clean message for the UI
		console.error('Onboarding Error:', err.message);
		return { success: false, error: err.message };
	}

	// 📍 REDIRECT MUST BE OUTSIDE THE TRY/CATCH
	if (isSuccessful) {
		revalidatePath('/', 'layout');
		// Use a relative path to ensure it works across localhost/app.localhost
		redirect('/dashboard');
	}
}

// ==========================================
// 2. LEAD CAPTURE (Fixed Mapping & Syntax)
// ==========================================
export async function submitPublicLead(
	tenantId: string,
	data: {
		name: string;
		email: string;
		phone?: string;
		projectType?: string;
		budget?: string;
		timeline?: string;
	},
): Promise<ActionResponse> {
	try {
		// Use the utility we already have to avoid manual cookie handling errors
		const supabase = await createClient();

		// 📍 1. Verification Check: Does this tenant actually exist?
		const { data: tenantCheck, error: tenantError } = await supabase
			.from('tenants')
			.select('id')
			.eq('id', tenantId)
			.maybeSingle();

		if (tenantError || !tenantCheck) {
			return { success: false, message: 'Invalid contractor ID.' };
		}

		// 📍 2. Insert the Lead
		const { error } = await supabase.from('leads').insert([
			{
				tenant_id: tenantId,
				client_name: data.name,
				client_email: data.email,
				client_phone: data.phone,
				project_type: data.projectType,
				budget: data.budget,
				timeline: data.timeline,
				status: 'new',
			},
		]);

		if (error) {
			console.error('DATABASE REJECTION:', error.message);
			return { success: false, message: `Database error: ${error.message}` };
		}

		return { success: true, message: 'Lead submitted successfully! 🚀' };
	} catch (err) {
		console.error('SERVER ACTION ERROR:', err);
		return { success: false, message: 'An unexpected error occurred.' };
	}
}

// ==========================================
// 3. STRIPE CONNECT (PAYRAIL)
// ==========================================
export async function createStripeConnectLink(tenantId: string) {
	const supabase = await createClient();
	const {
		data: { user },
	} = await supabase.auth.getUser();

	if (!user) throw new Error('Unauthorized');

	const { data: tenant } = await supabase
		.from('tenants')
		.select('*')
		.eq('owner_id', user.id)
		.order('created_at', { ascending: false }) // Get the newest one
		.limit(1)
		.maybeSingle();

	let stripeAccountId = tenant?.stripe_account_id;

	if (!stripeAccountId) {
		const account = await stripe.accounts.create({
			type: 'express',
			capabilities: {
				card_payments: { requested: true },
				transfers: { requested: true },
			},
		});

		stripeAccountId = account.id;

		await supabase
			.from('tenants')
			.update({ stripe_account_id: stripeAccountId })
			.eq('id', tenantId);
	}

	const siteUrl =
		process.env.NEXT_PUBLIC_SITE_URL || 'http://app.localhost:3000';
	const accountLink = await stripe.accountLinks.create({
		account: stripeAccountId,
		refresh_url: `${siteUrl}/dashboard/settings`,
		return_url: `${siteUrl}/dashboard/settings`,
		type: 'account_onboarding',
	});

	return accountLink.url;
}

export async function verifyStripeAccount(tenantId: string) {
	const supabase = await createClient();
	const { data: tenant } = await supabase
		.from('tenants')
		.select('stripe_account_id')
		.eq('id', tenantId)
		.order('created_at', { ascending: false })
		.limit(1)
		.maybeSingle();

	if (!tenant?.stripe_account_id)
		return { success: false, message: 'No Stripe account found.' };

	const account = await stripe.accounts.retrieve(tenant.stripe_account_id);

	if (account.details_submitted) {
		await supabase
			.from('tenants')
			.update({ stripe_onboarding_complete: true })
			.eq('id', tenantId);

		revalidatePath('/dashboard/settings');
		return { success: true, message: 'Stripe Connect setup complete!' };
	}
	return { success: false, message: 'Onboarding is not finished yet.' };
}

// ==========================================
// 4. PROPOSAL & DASHBOARD
// ==========================================
export async function updateLeadStatus(leadId: string, newStatus: string) {
	const supabase = await createClient();
	const { error } = await supabase
		.from('leads')
		.update({ status: newStatus })
		.eq('id', leadId);

	if (error) throw new Error('Could not update lead status');

	revalidatePath('/dashboard');
	revalidatePath(`/dashboard/leads/${leadId}`);
}

export async function finalizeAndSendProposal(
	leadId: string,
	proposedBudget: string,
): Promise<ActionResponse> {
	const supabase = await createClient();
	const {
		data: { user },
	} = await supabase.auth.getUser();
	if (!user) return { success: false, message: 'Unauthorized' };

	const { error } = await supabase
		.from('leads')
		.update({ status: 'quoted', budget: proposedBudget || undefined })
		.eq('id', leadId);

	if (error) return { success: false, message: 'Failed to save the proposal.' };

	revalidatePath(`/dashboard/leads/${leadId}`);
	revalidatePath('/dashboard');
	return { success: true, message: 'Proposal finalized! 📄' };
}

export async function approveProposal(leadId: string): Promise<ActionResponse> {
	const supabase = await createClient();
	const { error } = await supabase
		.from('leads')
		.update({ status: 'won' })
		.eq('id', leadId);
	if (error) return { success: false, message: 'Could not approve proposal.' };

	revalidatePath(`/proposal/${leadId}`);
	revalidatePath('/dashboard');
	return { success: true, message: 'Proposal Approved!' };
}

// ==========================================
// 5. PAYMENT ACTIONS
// ==========================================
export async function createPaymentRequest(
	leadId: string,
	amount: number,
	description: string,
) {
	const supabase = await createClient();
	const siteUrl =
		process.env.NEXT_PUBLIC_SITE_URL || 'http://app.localhost:3000';

	const { data: lead } = await supabase
		.from('leads')
		.select('*, tenants(stripe_account_id, name)')
		.eq('id', leadId)
		.single();

	if (!lead?.tenants?.stripe_account_id)
		throw new Error('Stripe not connected.');

	const session = await stripe.checkout.sessions.create(
		{
			mode: 'payment',
			line_items: [
				{
					price_data: {
						currency: 'usd',
						product_data: { name: `${description} - ${lead.tenants.name}` },
						unit_amount: Math.round(amount * 100),
					},
					quantity: 1,
				},
			],
			success_url: `${siteUrl}/dashboard/leads/${leadId}?payment=success`,
			cancel_url: `${siteUrl}/dashboard/leads/${leadId}?payment=cancelled`,
		},
		{
			stripeAccount: lead.tenants.stripe_account_id,
		},
	);

	await supabase.from('payments').insert({
		lead_id: leadId,
		tenant_id: lead.tenant_id,
		amount,
		description,
		stripe_checkout_id: session.id,
		stripe_url: session.url,
		status: 'pending',
	});

	revalidatePath(`/dashboard/leads/${leadId}`);
	return session.url;
}

// ==========================================
// 6. BILLING (Lemon Squeezy)
// ==========================================
export async function getSubscriptionCheckoutURL(
	variantId: string,
	email?: string,
) {
	try {
		const checkout = await createCheckout(
			process.env.LEMON_SQUEEZY_STORE_ID!,
			variantId,
			{
				checkoutData: { email: email ?? undefined },
				productOptions: {
					redirectUrl: `${process.env.NEXT_PUBLIC_SITE_URL}/dashboard`,
				},
			},
		);
		return checkout.data?.data.attributes.url;
	} catch (error) {
		throw new Error('Could not initialize checkout.');
	}
}
export async function addProjectUpdate(
	leadId: string,
	title: string,
	description: string,
) {
	const supabase = await createClient();

	// 1. Get the tenant_id for security
	const { data: lead } = await supabase
		.from('leads')
		.select('tenant_id')
		.eq('id', leadId)
		.single();

	if (!lead) throw new Error('Lead not found');

	// 2. Insert the update
	const { error } = await supabase.from('project_updates').insert([
		{
			lead_id: leadId,
			tenant_id: lead.tenant_id,
			title,
			description,
			status_type: 'update',
		},
	]);

	if (error) throw new Error(error.message);

	revalidatePath(`/dashboard/leads/${leadId}`);
}
export async function registerProjectFile(
	leadId: string,
	fileName: string,
	fileUrl: string,
	fileSize: number,
) {
	const supabase = await createClient();

	const { data: lead } = await supabase
		.from('leads')
		.select('tenant_id')
		.eq('id', leadId)
		.single();

	if (!lead) throw new Error('Lead not found');

	const { error } = await supabase
		.from('project_files') // We'll create this table in a second
		.insert([
			{
				lead_id: leadId,
				tenant_id: lead.tenant_id,
				file_name: fileName,
				file_url: fileUrl,
				file_size: fileSize,
			},
		]);

	if (error) throw new Error(error.message);

	revalidatePath(`/dashboard/leads/${leadId}`);
}

export async function convertLeadToProject(
	leadId: string,
	overrides: ProjectOverrides, // Add this second argument
) {
	const supabase = await createClient();

	// 1. Fetch lead
	const { data: lead } = await supabase
		.from('leads')
		.select('*')
		.eq('id', leadId)
		.single();

	if (!lead) throw new Error('Lead not found');

	// 2. Insert into projects using the overrides from the Slide-over
	const { data: project, error: pError } = await supabase
		.from('projects')
		.insert({
			tenant_id: lead.tenant_id,
			lead_id: lead.id,
			name: overrides.name,
			status: 'PLANNING',
			// Clean the budget string (remove $, commas, etc)
			budget_total: parseFloat(overrides.budget.replace(/[^0-9.]/g, '') || '0'),
			completion_percentage: 0,
		})
		.select()
		.single();

	if (pError) throw new Error(pError.message);

	// 3. Mark lead as converted
	await supabase.from('leads').update({ status: 'converted' }).eq('id', leadId);

	return { success: true, projectId: project.id };
}
export async function toggleTaskStatus(taskId: string, currentStatus: string) {
	const supabase = await createClient();

	const newStatus = currentStatus === 'DONE' ? 'TODO' : 'DONE';
	const completedAt = newStatus === 'DONE' ? new Date().toISOString() : null;

	const { error } = await supabase
		.from('project_tasks')
		.update({
			status: newStatus,
			completed_at: completedAt,
		})
		.eq('id', taskId);

	if (error) throw new Error(error.message);

	return { success: true };
}

export async function createTask(projectId: string, title: string) {
	const supabase = await createClient();

	// 1. Get the project to grab the tenant_id
	const { data: project } = await supabase
		.from('projects')
		.select('tenant_id')
		.eq('id', projectId)
		.single();

	if (!project) throw new Error('Project not found');

	// 2. Insert the task
	const { error } = await supabase.from('project_tasks').insert({
		project_id: projectId,
		tenant_id: project.tenant_id,
		title,
		status: 'TODO',
		priority: 'MEDIUM',
	});

	if (error) throw new Error(error.message);
	return { success: true };
}
