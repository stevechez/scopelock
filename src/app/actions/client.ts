'use server';

import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';

export async function acceptProposalAction(
	proposalId: string,
	subdomain: string,
) {
	const supabase = await createClient();

	// Update the proposal status to 'accepted'
	const { error } = await supabase
		.from('proposals')
		.update({ status: 'accepted' })
		.eq('id', proposalId);

	if (error) {
		console.error('Error accepting proposal:', error);
		throw new Error('Failed to accept proposal');
	}

	// Refresh both the client vault and the contractor dashboard
	revalidatePath(`/client/${subdomain}`);
	revalidatePath('/app', 'layout');
}
