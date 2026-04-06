'use server';

import Stripe from 'stripe';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
	apiVersion: '2023-10-16',
});

export async function createStripeAccountAction() {
	const supabase = await createClient();
	const {
		data: { user },
	} = await supabase.auth.getUser();
	if (!user) throw new Error('Unauthorized');

	// 1. Check if they already have an account
	const { data: tenant } = await supabase
		.from('tenants')
		.select('stripe_account_id')
		.eq('owner_id', user.id)
		.single();

	let accountId = tenant?.stripe_account_id;

	// 2. If not, create a new Express Account
	if (!accountId) {
		const account = await stripe.accounts.create({
			type: 'express',
			capabilities: {
				card_payments: { requested: true },
				transfers: { requested: true },
			},
		});
		accountId = account.id;

		// Save the ID immediately
		await supabase
			.from('tenants')
			.update({ stripe_account_id: accountId })
			.eq('owner_id', user.id);
	}

	// 3. Create an Account Link (The Onboarding URL)
	const accountLink = await stripe.accountLinks.create({
		account: accountId,
		refresh_url: `${process.env.NEXT_PUBLIC_APP_URL}/settings`,
		return_url: `${process.env.NEXT_PUBLIC_APP_URL}/settings?stripe_callback=success`,
		type: 'account_onboarding',
	});

	redirect(accountLink.url);
}
