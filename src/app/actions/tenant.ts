// src/app/actions/tenant.ts
'use server';

import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

export async function createTenantAction(prevState: any, formData: FormData) {
	const supabase = await createClient();

	// 1. GET THE REAL USER
	const {
		data: { user },
	} = await supabase.auth.getUser();
	if (!user) return { error: 'Authentication required.', success: false };

	const businessName = formData.get('businessName') as string;
	const subdomain = formData.get('subdomain') as string;

	if (!/^[a-z0-9-]+$/.test(subdomain)) {
		return {
			error:
				'Subdomain can only contain lowercase letters, numbers, and hyphens.',
			success: false,
		};
	}

	// 2. USE THE REAL USER ID
	const { error } = await supabase.from('tenants').insert([
		{
			name: businessName,
			subdomain: subdomain,
			owner_id: user.id, // <-- Securely linked!
			config: { theme: 'dark', modules: ['comm-vault'] },
		},
	]);

	if (error) {
		if (error.code === '23505')
			return { error: 'That subdomain is already taken.', success: false };
		return { error: error.message, success: false };
	}

	redirect(`/onboarding/success?subdomain=${subdomain}`);
}
