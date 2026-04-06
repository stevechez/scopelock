'use server';

import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';

export async function updateBrandingAction(prevState: any, formData: FormData) {
	const supabase = await createClient();

	// Get the real user session
	const {
		data: { user },
	} = await supabase.auth.getUser();
	if (!user)
		return { error: 'Session expired. Please log in again.', success: false };

	const primaryColor = formData.get('primaryColor') as string;
	const tenantId = formData.get('tenantId') as string;

	const { error } = await supabase
		.from('tenants')
		.update({ primary_color: primaryColor })
		.eq('id', tenantId)
		.eq('owner_id', user.id); // Security: Ensure they own the tenant

	if (error) {
		return { error: error.message, success: false };
	}

	// Refresh the cache so the settings page and dashboard show the new color
	revalidatePath('/', 'layout');

	return { error: '', success: true };
}
