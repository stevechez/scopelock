import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { createClient } from '@supabase/supabase-js';

// We must initialize a fresh Supabase client using the SERVICE ROLE KEY
// This allows the server to bypass RLS and update the proposal without a logged-in user session
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

export async function POST(req: Request) {
	try {
		// 1. Get the raw body and the signature from the headers
		const rawBody = await req.text();
		const signature = req.headers.get('x-signature') || '';
		const secret = process.env.LEMON_SQUEEZY_WEBHOOK_SECRET!;

		// 2. Verify the Signature (Security Check)
		// This ensures the request actually came from Lemon Squeezy and wasn't tampered with
		const hmac = crypto.createHmac('sha256', secret);
		const digest = Buffer.from(hmac.update(rawBody).digest('hex'), 'utf8');
		const signatureBuffer = Buffer.from(signature, 'utf8');

		if (!crypto.timingSafeEqual(digest, signatureBuffer)) {
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

				// Update Supabase to "Deposit Paid"
				const { error } = await supabaseAdmin
					.from('proposals')
					.update({ status: 'deposit_paid' }) // Ensure this string matches your DB constraints
					.eq('id', proposalId);

				if (error) throw error;
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
