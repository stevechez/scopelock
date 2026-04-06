'use server';

import {
	lemonSqueezySetup,
	createCheckout,
} from '@lemonsqueezy/lemonsqueezy.js';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

export async function createDepositCheckoutAction(
	proposalId: string,
	subdomain: string,
) {
	// 1. Initialize Lemon Squeezy
	lemonSqueezySetup({ apiKey: process.env.LEMON_SQUEEZY_API_KEY! });
	const storeId = process.env.LEMON_SQUEEZY_STORE_ID!;
	const variantId = process.env.LEMON_SQUEEZY_DEPOSIT_VARIANT_ID!;

	const supabase = await createClient();

	// 2. Fetch the Proposal
	const { data: proposal } = await supabase
		.from('proposals')
		.select('*')
		.eq('id', proposalId)
		.single();

	if (!proposal) throw new Error('Proposal not found');

	// 3. Calculate the Deposit (e.g., 20% of the total amount)
	const DEPOSIT_PERCENTAGE = 0.2;
	// Lemon Squeezy requires custom prices in cents
	const depositAmountInCents = Math.round(
		proposal.amount * DEPOSIT_PERCENTAGE * 100,
	);

	// 4. Update the proposal status to 'accepted' immediately
	await supabase
		.from('proposals')
		.update({ status: 'accepted' })
		.eq('id', proposalId);

	// 5. Create the Lemon Squeezy Checkout
	const clientUrl = `http://${subdomain}.localhost:3000`;

	const { data, error } = await createCheckout(storeId, variantId, {
		checkoutOptions: {
			embed: false,
			media: false,
			logo: true,
		},
		// FIXED: customPrice is now at the root level of the options object
		customPrice: depositAmountInCents,
		checkoutData: {
			// custom is used for metadata, so we can track the proposal ID via webhooks later
			custom: { proposal_id: proposalId },
		},
		productOptions: {
			name: `${proposal.title} - Project Deposit`,
			description: `20% Securing Deposit`,
			receiptButtonText: 'Return to Vault',
			receiptLinkUrl: `${clientUrl}?success=true`,
			redirectUrl: `${clientUrl}?success=true`,
		},
	});

	if (error || !data) {
		console.error('Lemon Squeezy Error:', error);
		throw new Error('Failed to generate checkout link');
	}

	// 6. Redirect the client to the Lemon Squeezy hosted checkout
	redirect(data.data.attributes.url);
}
