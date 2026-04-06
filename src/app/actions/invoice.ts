'use server';

import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';

const initialState = { error: '', success: false };

export async function createInvoiceAction(prevState: any, formData: FormData) {
	const supabase = await createClient();

	const description = formData.get('description') as string;
	const amount = parseFloat(formData.get('amount') as string);
	const tenantId = formData.get('tenantId') as string;

	if (!description || !amount || !tenantId) {
		return { error: 'Missing required fields.', success: false };
	}

	const { error } = await supabase.from('invoices').insert([
		{
			tenant_id: tenantId,
			description: description,
			amount: amount,
			status: 'unpaid',
		},
	]);

	if (error) {
		console.error('Supabase Error:', error.message);
		return { error: error.message, success: false };
	}

	// Refresh the dashboard instantly
	revalidatePath('/', 'layout');

	return { error: '', success: true };
}

export async function markInvoicePaidAction(invoiceId: string) {
	const supabase = await createClient();

	const { error } = await supabase
		.from('invoices')
		.update({ status: 'paid' })
		.eq('id', invoiceId);

	if (error) {
		console.error('Supabase Error:', error.message);
		return { error: error.message };
	}

	// Instantly refresh the dashboard to update the math and UI
	revalidatePath('/', 'layout');
	return { success: true };
}
