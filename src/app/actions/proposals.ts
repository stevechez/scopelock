'use server';

import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

// 1. Define a clear interface for the state
export interface ActionState {
	error?: string;
	success?: boolean;
}

// 2. Ensure prevState is the FIRST argument
export async function createProposalAction(
	prevState: ActionState,
	formData: FormData,
): Promise<ActionState> {
	const supabase = await createClient();

	const {
		data: { user },
	} = await supabase.auth.getUser();
	if (!user) return { error: 'Unauthorized' };

	const title = formData.get('title') as string;
	const amountStr = formData.get('amount') as string;
	const description = formData.get('description') as string;
	const tenantId = formData.get('tenantId') as string;

	const { error } = await supabase.from('proposals').insert([
		{
			title,
			amount: parseFloat(amountStr),
			description,
			tenant_id: tenantId,
			status: 'published',
		},
	]);

	if (error) return { error: error.message };

	revalidatePath('/app');
	// Important: Redirects inside try/catch or actions work best at the very end
	redirect('/app');

	// This return is technically unreachable due to redirect, but keeps TS happy
	return { success: true };
}
