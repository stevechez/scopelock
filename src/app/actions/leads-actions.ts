'use server';

import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';

export async function updateLeadStatus(leadId: string, newStatus: string) {
	const supabase = await createClient();

	const { error } = await supabase
		.from('leads')
		.update({ status: newStatus })
		.eq('id', leadId);

	if (error) {
		console.error('Update Error:', error.message);
		return { success: false };
	}

	revalidatePath('/leads');
	return { success: true };
}
