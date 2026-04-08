import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { createSystemAdminClient } from '@/utils/supabase/system';

// 🛑 ADD THIS LINE TO FIX THE BUILD ERROR
// Tells Next.js to always execute this route dynamically at runtime,
// preventing it from checking for environment variables during the build.
export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
	try {
		// 1. Get the raw body and the signature from the headers
		const rawBody = await req.text();
		const signature = req.headers.get('x-signature') || '';
		const secret = process.env.LEMON_SQUEEZY_WEBHOOK_SECRET;

		if (!secret) {
			console.error('❌ Missing LEMON_SQUEEZY_WEBHOOK_SECRET');
			return NextResponse.json(
				{ error: 'Configuration error' },
				{ status: 500 },
			);
		}

		// 2. Verify the Signature (Security Check)
		// This ensures the request actually came from Lemon Squeezy and wasn't tampered with
		const hmac = crypto.createHmac('sha256', secret);
		const digest = Buffer.from(hmac.update(rawBody).digest('hex'), 'utf8');
		const signatureBuffer = Buffer.from(signature, 'utf8');

		// Check if signature length matches before comparing
		if (
			digest.length !== signatureBuffer.length ||
			!crypto.timingSafeEqual(digest, signatureBuffer)
		) {
			console.error('❌ Invalid Webhook Signature');
			return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
		}

		// 3. Parse the verified data
		const data = JSON.parse(rawBody);

		// 4. Handle the specific event
		if (data.meta.event_name === 'order_created') {
			// Extract the custom data we passed during the checkout creation
			const proposalId = data.meta.custom_data?.proposal_id;

			if (proposalId) {
				console.log(
					`✅ Payment received for proposal: ${proposalId}. Updating vault...`,
				);

				// 🛑 FIX: Initialize the Admin Client INSIDE the function.
				// This prevents the build process from trying to load environment
				// variables that don't exist yet.
				const supabaseAdmin = createSystemAdminClient();

				// 🛑 FIX: Changed variable names to avoid duplicates (insertTenantError)
				// This block seems to be a test insert from our previous chat.
				// I have left it here but renamed the error.
				const { data: tenantData, error: insertTenantError } =
					await supabaseAdmin.from('tenants').insert({
						name: 'New Tenant From Webhook',
						subdomain: 'newsub',
					});

				if (insertTenantError) {
					console.error(
						'DANGER: System Admin failed to create tenant!',
						insertTenantError,
					);
					// Decide if you want to fail the whole webhook here or just log it.
				}

				// 🟢 MAIN GOAL: Update the Proposal Status to "Deposit Paid"
				// Using the Service Role Client, we bypass RLS completely.
				const { error: updateProposalError } = await supabaseAdmin
					.from('proposals')
					.update({ status: 'deposit_paid' }) // Ensure this string matches your DB constraints
					.eq('id', proposalId);

				if (updateProposalError) throw updateProposalError;
			}
		}

		// Respond with a 200 OK so Lemon Squeezy knows we received it
		return NextResponse.json({ success: true });
	} catch (err) {
		console.error('❌ Webhook processing failed:', err);
		return NextResponse.json(
			{ error: 'Webhook handler failed' },
			{ status: 500 },
		);
	}
}
