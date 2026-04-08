'use server';

import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

export type FormState = {
	error: string;
	success: boolean;
};

export async function createTenantAction(
	prevState: FormState,
	formData: FormData,
): Promise<FormState> {
	const businessName = formData.get('businessName') as string;
	const subdomain = formData.get('subdomain') as string;

	// 1. Validation
	if (!businessName || !subdomain) {
		return {
			error: 'Business name and subdomain are required.',
			success: false,
		};
	}

	// Clean the subdomain (lowercase, no spaces)
	const cleanSubdomain = subdomain.toLowerCase().trim().replace(/\s+/g, '-');

	const supabase = await createClient();

	// 2. Get the Authenticated User
	const {
		data: { user },
		error: userError,
	} = await supabase.auth.getUser();

	if (userError || !user) {
		return {
			error: 'Authentication required. Please log in again.',
			success: false,
		};
	}

	try {
		// 3. Insert the Tenant and link it to the User
		// Note: 'owner_id' (or similar) is crucial so the dashboard knows who owns this data
		const { error: insertError } = await supabase.from('tenants').insert({
			name: businessName,
			subdomain: cleanSubdomain,
			owner_id: user.id, // Linking the tenant to the logged-in user
			status: 'active', // Marking as active so the dashboard doesn't loop
		});

		if (insertError) {
			// Handle unique constraint errors (e.g., subdomain already taken)
			if (insertError.code === '23505') {
				return {
					error: 'That subdomain is already taken. Try another.',
					success: false,
				};
			}
			throw insertError;
		}
	} catch (err: any) {
		console.error('Tenant Creation Error:', err);
		return {
			error: err.message || 'An unexpected error occurred during setup.',
			success: false,
		};
	}

	// 4. Success: Clear the cache so the dashboard sees the new tenant immediately
	revalidatePath('/dashboard', 'layout');
	redirect('/dashboard');
}
