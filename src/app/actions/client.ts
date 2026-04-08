'use server';

import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';

export type ClientFormState = {
	error: string;
	success: boolean;
};

export async function addClientAction(
	prevState: ClientFormState,
	formData: FormData,
): Promise<ClientFormState> {
	const firstName = formData.get('firstName') as string;
	const lastName = formData.get('lastName') as string;
	const email = formData.get('email') as string;

	if (!firstName || !lastName || !email) {
		return { error: 'All fields are required.', success: false };
	}

	const supabase = await createClient();

	// 1. Verify the owner is logged in
	const {
		data: { user },
	} = await supabase.auth.getUser();
	if (!user) return { error: 'Unauthorized.', success: false };

	// 2. Securely get the owner's tenant ID
	const { data: tenant } = await supabase
		.from('tenants')
		.select('id')
		.eq('owner_id', user.id)
		.single();

	if (!tenant) return { error: 'Tenant not found.', success: false };

	// 3. Insert the Client
	const { error: insertError } = await supabase.from('clients').insert({
		tenant_id: tenant.id,
		first_name: firstName,
		last_name: lastName,
		email: email.toLowerCase().trim(),
	});

	if (insertError) {
		// 1. Cast the error so TypeScript stops panicking
		const pgError = insertError as any;

		console.error('🚨 DB INSERT ERROR:', pgError);

		// 2. Now TS will let us read the code property
		if (pgError.code === '23505') {
			return {
				error: 'A client with this email already exists.',
				success: false,
			};
		}

		return { error: `DB Error: ${pgError.message}`, success: false };
	}

	// 4. Bust the cache so the new client appears on the dashboard immediately
	revalidatePath('/dashboard');
	return { error: '', success: true };
}
