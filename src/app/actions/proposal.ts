'use server';

// Use the SERVER utility, not the browser one
import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';

export async function acceptProposalAction(
	proposalId: string,
	subdomain: string,
) {
	const supabase = await createClient();

	const { error } = await supabase
		.from('proposals')
		.update({ status: 'accepted' })
		.eq('id', proposalId);

	if (error) {
		console.error('Error accepting proposal:', error);
		throw new Error('Failed to accept proposal');
	}

	// This is perfect—it clears the cache so the user sees the 'Accepted' state immediately
	revalidatePath(`/client/${subdomain}`);
	revalidatePath('/app', 'layout');
}
