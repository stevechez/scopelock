'use server';

import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export interface ActionState {
	error?: string;
	success?: boolean;
}

export async function createProposalAction(
	prevState: ActionState,
	formData: FormData,
): Promise<ActionState> {
	console.log('🚀 Server Action Triggered'); // LOG 1
	const supabase = await createClient();

	const {
		data: { user },
	} = await supabase.auth.getUser();
	if (!user) {
		console.log('❌ User not found');
		return { error: 'Unauthorized' };
	}

	const title = formData.get('title') as string;
	const amountStr = formData.get('amount') as string;
	const tenantId = formData.get('tenantId') as string;

	console.log('📝 Data Received:', { title, amountStr, tenantId }); // LOG 2

	const { error } = await supabase.from('proposals').insert([
		{
			title,
			amount: parseFloat(amountStr),
			tenant_id: tenantId,
			status: 'published',
		},
	]);

	if (error) {
		console.error('❌ Supabase Error:', error.message);
		return { error: error.message };
	}

	console.log('✅ Success! Redirecting...');
	revalidatePath('/app', 'layout');
	redirect('/app');
}
