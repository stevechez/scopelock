'use server';

import { createClient } from '@/utils/supabase/server';

export async function syncLeadToQuickBooks(leadId: string) {
	const supabase = await createClient();

	// 1. Get the Lead and the Tenant's QB Tokens
	const { data: lead } = await supabase
		.from('leads')
		.select('*')
		.eq('id', leadId)
		.single();
	const { data: tenant } = await supabase
		.from('tenants')
		.select('qb_refresh_token, qb_realm_id')
		.eq('id', '9e443a67-0cfe-4260-a2ce-7f258f681ce1')
		.single();

	if (!tenant?.qb_refresh_token) return { error: 'QuickBooks not connected.' };

	try {
		// 2. Refresh the Access Token
		const refreshResponse = await fetch(
			'https://oauth.platform.intuit.com/oauth2/v1/tokens/bearer',
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
					Authorization: `Basic ${Buffer.from(`${process.env.QB_CLIENT_ID}:${process.env.QB_CLIENT_SECRET}`).toString('base64')}`,
				},
				body: new URLSearchParams({
					grant_type: 'refresh_token',
					refresh_token: tenant.qb_refresh_token,
				}),
			},
		);

		const newTokens = await refreshResponse.json();

		// 3. PUSH the Customer to QuickBooks
		const qbResponse = await fetch(
			`https://sandbox-quickbooks.api.intuit.com/v3/company/${tenant.qb_realm_id}/customer?minorversion=70`,
			{
				method: 'POST',
				headers: {
					Authorization: `Bearer ${newTokens.access_token}`,
					'Content-Type': 'application/json',
					Accept: 'application/json',
				},
				body: JSON.stringify({
					FullyQualifiedName: lead.name,
					PrimaryEmailAddr: { Address: lead.email },
					PrimaryPhone: { FreeFormNumber: lead.phone },
					DisplayName: lead.name,
					Notes: `Lead synced from BUILDRAIL. Project: ${lead.project_type}`,
				}),
			},
		);

		const result = await qbResponse.json();

		if (result.Customer) {
			// Update the lead in Supabase so we know it's synced
			await supabase
				.from('leads')
				.update({ qb_customer_id: result.Customer.Id })
				.eq('id', leadId);
			return { success: true };
		}

		return { error: 'Failed to create customer in QB.' };
	} catch (err) {
		console.error(err);
		return { error: 'Sync failed.' };
	}
}
