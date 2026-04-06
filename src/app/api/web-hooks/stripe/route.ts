import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
	apiVersion: '2023-10-16',
});
const supabaseAdmin = createClient(
	process.env.NEXT_PUBLIC_SUPABASE_URL!,
	process.env.SUPABASE_SERVICE_ROLE_KEY!,
);

export async function POST(req: Request) {
	const body = await req.text();
	const sig = req.headers.get('stripe-signature')!;

	let event: Stripe.Event;

	try {
		event = stripe.webhooks.constructEvent(
			body,
			sig,
			process.env.STRIPE_WEBHOOK_SECRET!,
		);
	} catch (err: any) {
		return NextResponse.json(
			{ error: `Webhook Error: ${err.message}` },
			{ status: 400 },
		);
	}

	// This event fires when a contractor completes onboarding or updates their bank info
	if (event.type === 'account.updated') {
		const account = event.data.object as Stripe.Account;

		// Check if they are now capable of receiving money
		const isEnabled = account.details_submitted && account.charges_enabled;

		if (isEnabled) {
			await supabaseAdmin
				.from('tenants')
				.update({ payments_enabled: true })
				.eq('stripe_account_id', account.id);
		}
	}

	return NextResponse.json({ received: true });
}
