// src/app/actions.ts
'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { createServerClient } from '@supabase/ssr';
import Stripe from 'stripe';
import { Resend } from 'resend';

// 📍 Standard Client (Internal/Auth)
import { createClient } from '@/utils/supabase/server';

// 📍 Lemon Squeezy Imports
import {
	lemonSqueezySetup,
	createCheckout,
} from '@lemonsqueezy/lemonsqueezy.js';

// Initialize Lemon Squeezy
lemonSqueezySetup({ apiKey: process.env.LEMON_SQUEEZY_API_KEY || '' });

interface MilestonePayload {
	tenantId: string;
	milestoneName: string;
	amount: number;
}

interface AIProposalPayload {
	leadId: string;
	// Add any other fields your component sends, e.g.:
	// notes?: string;
	// projectScope?: string;
}

interface SettingsState {
	success?: boolean;
	error?: string;
	message?: string;
}

// --- SHARED TYPES ---
export type ActionResponse =
	| { success: true; message?: string }
	| { success: false; error: string };

export interface ProjectOverrides {
	name: string;
	budget: string;
}

const resend = new Resend(process.env.RESEND_API_KEY);

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

export async function completeOnboarding(formData: FormData) {
	try {
		// Extract the strings inside the function
		const companyName = formData.get('companyName') as string;
		const ownerName = formData.get('ownerName') as string;

		console.log('🚀 Initializing Command Center for:', {
			companyName,
			ownerName,
		});

		// Your existing logic (QuickBooks, Database, etc.) goes here
		// ...

		return { success: true };
	} catch (error) {
		console.error('Onboarding Action Error:', error);
		return { success: false, error: 'Initialization failed' };
	}
}

// ==========================================
// 2. LEAD CAPTURE (Fixed Mapping & Syntax)
// ==========================================
export async function submitPublicLead(
	formData: FormData,
	tenantId: string,
): Promise<ActionResponse> {
	try {
		const supabase = await createClient();

		// 📍 FIX: Do NOT re-declare tenantId here. Use the one from the argument.
		const name = formData.get('name') as string;
		const email = formData.get('email') as string;
		const phone = formData.get('phone') as string;
		const projectType = formData.get('projectType') as string;
		const budget = formData.get('budget') as string;
		const timeline = formData.get('timeline') as string;

		// Validation check to ensure the contractor exists
		const { data: tenantCheck, error: tenantError } = await supabase
			.from('tenants')
			.select('id')
			.eq('id', tenantId)
			.maybeSingle();

		if (tenantError || !tenantCheck) {
			return { success: false, error: 'Invalid contractor ID.' };
		}

		// Insert logic mapping to Supabase column names
		const { error } = await supabase.from('leads').insert([
			{
				tenant_id: tenantId,
				client_name: name,
				client_email: email,
				client_phone: phone,
				project_type: projectType,
				budget: budget,
				timeline: timeline,
				status: 'new',
			},
		]);

		if (error) {
			console.error('Database Insert Error:', error.message);
			return { success: false, error: error.message };
		}

		return { success: true, message: 'Lead submitted successfully! 🚀' };
	} catch (err) {
		console.error('Server Action Crash:', err);
		return { success: false, error: 'An unexpected error occurred.' };
	}
	// 📍 FIX: Removed the unreachable return { success: true } here
}

// ==========================================
// 3. STRIPE CONNECT (PAYRAIL)
// ==========================================
export async function createStripeConnectLink({
	tenantId,
	email,
}: {
	tenantId: string;
	email: string;
}) {
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
	if (!user) return { success: false, error: 'Unauthorized' };

	const { error } = await supabase
		.from('leads')
		.update({ status: 'quoted', budget: proposedBudget || undefined })
		.eq('id', leadId);

	if (error) return { success: false, error: 'Failed to save the proposal.' };

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
	if (error) return { success: false, error: 'Could not approve proposal.' };

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
export async function submitLead(formData: FormData, tenantId: string) {
	const supabase = await createClient();

	// 1. Extract values using the EXACT keys sent from the client
	// 2. Add fallbacks to prevent inserting 'null' strings
	const rawFormData = {
		tenant_id: tenantId, // Crucial: Assign the lead to the tenant
		name: (formData.get('name') as string) || '',
		email: (formData.get('email') as string) || '',
		phone: (formData.get('phone') as string) || '',
		project_type: (formData.get('projectType') as string) || '', // Matches client key
		budget: (formData.get('budget') as string) || '', // Matches client key
		timeline: (formData.get('timeline') as string) || '', // Matches client key
	};

	try {
		const { error } = await supabase
			.from('leads')
			.insert([rawFormData])
			.select();

		if (error) {
			console.error('Supabase Error:', error.message);
			return { success: false, error: error.message };
		}

		return { success: true };
	} catch (err) {
		console.error('Server Action Error:', err);
		return { success: false, error: 'Failed to process lead.' };
	}
}
export async function submitDailyPulse(formData: FormData) {
	const supabase = await createClient();

	const projectId = formData.get('projectId') as string;
	const content = formData.get('content') as string;

	const { data, error } = await supabase
		.from('daily_logs') // or 'daily_pulse' depending on your schema
		.insert([
			{
				project_id: projectId,
				content: content,
				created_at: new Date().toISOString(),
			},
		]);

	if (error) {
		console.error('Pulse Error:', error.message);
		return { error: error.message };
	}

	// Refresh the page so the new pulse shows up instantly
	revalidatePath(`/dashboard/jobs/${projectId}/pulse`);

	return { success: true };
}
export async function requestMilestonePayment(formData: FormData) {
	const supabase = await createClient();

	const milestoneId = formData.get('milestoneId') as string;
	const proofUrl = formData.get('proofUrl') as string;

	const { error } = await supabase
		.from('milestones')
		.update({
			status: 'PAYMENT_PENDING',
			proof_photo_url: proofUrl,
			requested_at: new Date().toISOString(),
		})
		.eq('id', milestoneId);

	if (error) {
		console.error('Payment Request Error:', error.message);
		return { error: error.message };
	}

	// Refresh the payments dashboard
	revalidatePath('/dashboard/jobs/payments');

	return { success: true };
}
export async function createMilestonePaymentLink(payload: MilestonePayload) {
	const supabase = await createClient();
	const { tenantId, milestoneName, amount } = payload;

	const { data, error } = await supabase
		.from('milestones')
		.update({ payment_status: 'PROCESSING' })
		// 👇 Update the column names to match your exact Supabase schema
		.eq('tenant_id', tenantId)
		.eq('name', milestoneName)
		.select()
		.single();

	if (error) {
		console.error('Payment Link Error:', error.message);
		return { error: error.message };
	}

	return { success: true, milestone: data };
}

export async function createMilestone(formData: FormData) {
	const supabase = await createClient();

	const jobId = formData.get('jobId') as string;
	const title = formData.get('title') as string;
	const amount = parseFloat(formData.get('amount') as string);

	const { error } = await supabase.from('milestones').insert({
		project_id: jobId,
		title,
		amount,
		status: 'PENDING',
	});

	if (error) {
		console.error('Create Milestone Error:', error.message);
		return { error: error.message };
	}

	// Refresh the dashboard so the new milestone shows up in the list
	revalidatePath(`/dashboard/jobs/payments/${jobId}`);

	return { success: true };
}
export async function createJob(formData: FormData) {
	const supabase = await createClient();

	const name = formData.get('name') as string;
	const description = formData.get('description') as string;
	const budget = formData.get('budget') as string;

	const { data, error } = await supabase
		.from('projects')
		.insert({
			name,
			description,
			budget_total: parseFloat(budget) || 0,
			status: 'ACTIVE',
			// Assumes your tenant_id is handled by a trigger or session
		})
		.select()
		.single();

	if (error) {
		console.error('Create Job Error:', error.message);
		return { error: error.message };
	}

	// Refresh the list and jump into the new project
	revalidatePath('/dashboard/jobs');
	redirect(`/dashboard/jobs/${data.id}`);
}
export async function createChangeOrder(formData: FormData) {
	const jobId = formData.get('jobId') as string;
	const description = formData.get('description') as string;
	const price = Number(formData.get('price'));
	const supabase = await createClient();

	const projectId = formData.get('projectId') as string;
	const title = formData.get('title') as string;
	const amount = parseFloat(formData.get('amount') as string) || 0;

	const { error } = await supabase.from('change_orders').insert({
		project_id: projectId,
		title,
		description,
		estimated_cost: amount,
		status: 'APPROVED', // Manual entries are usually pre-approved on-site
	});

	if (error) {
		console.error('Change Order Error:', error.message);
		return { error: error.message };
	}

	// Refresh the project detail and financial pages
	revalidatePath(`/dashboard/jobs/${projectId}`);

	return { success: true };
}
export async function acceptLead(leadId: string) {
	const supabase = await createClient();

	// 1. Fetch the lead data first
	const { data: lead, error: fetchError } = await supabase
		.from('leads')
		.select('*')
		.eq('id', leadId)
		.single();

	if (fetchError || !lead) {
		return { error: 'Lead not found' };
	}

	// 2. Create the Project
	const { data: project, error: projectError } = await supabase
		.from('projects')
		.insert({
			/* ... */
		})
		.select()
		.single();

	if (projectError) return { error: projectError.message };

	// 📍 IMPORTANT: Do NOT call redirect() here if the client
	// needs to use the ID for router.push. Just return the project.
	return project;
	// 3. Mark lead as accepted
	await supabase.from('leads').update({ status: 'ACCEPTED' }).eq('id', leadId);

	// 4. Clean up and Redirect
	revalidatePath('/dashboard/leads');
	revalidatePath('/dashboard/jobs');

	redirect(`/dashboard/jobs/${project.id}`);
}

export async function sendProposal(
	formData: FormData,
): Promise<ActionResponse> {
	const supabase = await createClient();

	const leadId = formData.get('leadId') as string;
	const content = formData.get('content') as string;
	const tenantId = formData.get('tenantId') as string;

	const { error } = await supabase.from('proposals').insert({
		lead_id: leadId,
		tenant_id: tenantId,
		content,
		status: 'SENT',
	});

	if (error) {
		return { success: false, error: error.message };
	}

	await supabase
		.from('leads')
		.update({ status: 'PROPOSAL_SENT' })
		.eq('id', leadId);

	revalidatePath('/dashboard/leads');

	return { success: true };
}
export async function createLog(formData: FormData) {
	try {
		const supabase = await createClient();

		// 1. Extract the data packaged in the component
		const tenantId = formData.get('tenantId') as string;
		const jobId = formData.get('jobId') as string;
		const content = formData.get('content') as string;
		const type = (formData.get('type') as string) || 'general';

		// 2. Insert into your Supabase logs/updates table
		const { data, error } = await supabase
			.from('project_logs') // Ensure this matches your actual table name
			.insert([
				{
					tenant_id: tenantId,
					job_id: jobId,
					content: content,
					log_type: type,
					created_at: new Date().toISOString(),
				},
			])
			.select()
			.single();

		if (error) throw error;

		// 3. Refresh the dashboard so the new log appears immediately
		revalidatePath('/(dashboard)/jobs/[id]', 'page');

		return { success: true, data };
	} catch (error: any) {
		console.error('CrewLens Log Error:', error.message);
		return { success: false, error: error.message };
	}
}
export async function generateAIProposal(payload: AIProposalPayload) {
	try {
		const { leadId } = payload;

		// ==========================================
		// TODO: ADD YOUR ACTUAL AI LOGIC HERE LATER
		// ==========================================
		// Example with OpenAI:
		// const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
		// const completion = await openai.chat.completions.create({
		//     model: "gpt-4o",
		//     messages: [{ role: "user", content: `Write a proposal for lead ${leadId}` }],
		// });
		// const aiText = completion.choices[0].message.content;

		// 2. Simulate a network delay so you can see your loading spinners in the UI
		await new Promise(resolve => setTimeout(resolve, 1500));

		// 3. Return a successful mocked response for now
		return {
			success: true,
			proposalText:
				'This is an AI-generated proposal placeholder. Your OpenAI logic will replace this text.',
		};
	} catch (error) {
		console.error('AI Generation Error:', error);
		return {
			error: 'Failed to generate AI proposal. Please try again.',
		};
	}
}
export async function updateTenantSettings(
	prevState: SettingsState,
	formData: FormData,
): Promise<SettingsState> {
	try {
		// 3. Extract your form values (assuming your input has name="companyName")
		const companyName = formData.get('companyName') as string;

		if (!companyName) {
			return { error: 'Company name is required.' };
		}

		// ==========================================
		// TODO: ADD YOUR DATABASE UPDATE LOGIC HERE
		// ==========================================
		// Example with Supabase:
		// const supabase = await createClient();
		// const { error } = await supabase.from('tenants').update({ name: companyName }).eq('id', tenantId);
		// if (error) throw error;

		// Simulate network delay for your loading spinner
		await new Promise(resolve => setTimeout(resolve, 1000));

		// 4. Return the new state so useActionState can update the UI
		return {
			success: true,
			message: 'Settings updated successfully!',
		};
	} catch (error) {
		console.error('Settings Update Error:', error);
		return { error: 'Failed to update settings. Please try again.' };
	}
}
export async function connectQuickBooks() {
	const supabase = await createClient();

	// 1. Get current tenant/user
	const {
		data: { user },
	} = await supabase.auth.getUser();
	if (!user) throw new Error('Unauthorized');

	// 2. Build the Intuit Auth URL
	const authUrl = new URL('https://appcenter.intuit.com/connect/oauth2');
	authUrl.searchParams.append('client_id', process.env.QUICKBOOKS_CLIENT_ID!);
	authUrl.searchParams.append('response_type', 'code');
	authUrl.searchParams.append('scope', 'com.intuit.quickbooks.accounting'); // Adjust scopes as needed
	authUrl.searchParams.append(
		'redirect_uri',
		`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/quickbooks/callback`,
	);
	authUrl.searchParams.append('state', user.id); // Use user ID as state for verification

	// 3. Redirect the user to Intuit
	redirect(authUrl.toString());
}
export async function submitJumpstart(formData: FormData) {
	try {
		const name = formData.get('name') as string;
		const phone = formData.get('phone') as string;
		const businessName = formData.get('businessName') as string;
		const serviceArea = formData.get('serviceArea') as string;
		const goal = formData.get('goal') as string;
		const notes = formData.get('notes') as string;

		// The "Top 1%" Automated Notification
		await resend.emails.send({
			from: 'BUILDRAIL <onboarding@resend.dev>', // You can verify your domain later
			to: ['stevechez@gmail.com'], // Put your actual email here
			subject: `🚀 New Jumpstart Lead: ${businessName}`,
			html: `
                <h2>New Jumpstart Application</h2>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Phone:</strong> ${phone}</p>
                <p><strong>Business:</strong> ${businessName}</p>
                <p><strong>Area:</strong> ${serviceArea}</p>
                <p><strong>Goal:</strong> ${goal}</p>
                <p><strong>Notes:</strong> ${notes}</p>
            `,
		});

		return { success: true };
	} catch (error) {
		console.error('Email Action Error:', error);
		return { success: false, error: 'Failed to send notification' };
	}
}
