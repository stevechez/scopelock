import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createClient } from '@/utils/supabase/server';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
	apiVersion: '2023-10-16',
});

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

export async function POST(req: Request) {
	const body = await req.text();

	// 1. Correctly await the headers result
	const headersList = await headers();
	const sig = headersList.get('stripe-signature') as string;

	let event: Stripe.Event;

	try {
		if (!sig || !endpointSecret) {
			throw new Error('Missing stripe-signature or endpoint secret');
		}
		event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
	} catch (err) {
		// 2. Type-safe error handling (No 'any')
		const errorMessage = err instanceof Error ? err.message : 'Unknown error';
		console.error(`❌ Webhook Error: ${errorMessage}`);
		return NextResponse.json(
			{ error: `Webhook Error: ${errorMessage}` },
			{ status: 400 },
		);
	}

	if (event.type === 'checkout.session.completed') {
		const session = event.data.object as Stripe.Checkout.Session;
		const milestoneId = session.metadata?.milestone_id;

		if (milestoneId) {
			const supabase = await createClient();

			const { error } = await supabase
				.from('milestones')
				.update({
					status: 'paid',
					paid_at: new Date().toISOString(),
				})
				.eq('id', milestoneId);

			if (error) {
				console.error('❌ Database update failed:', error);
				return NextResponse.json(
					{ error: 'DB Update Failed' },
					{ status: 500 },
				);
			}

			console.log(`✅ Milestone ${milestoneId} marked as PAID.`);
		}
	}

	return NextResponse.json({ received: true });
}
