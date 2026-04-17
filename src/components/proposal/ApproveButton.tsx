'use client';

import { useState } from 'react';
import { approveProposal } from '@/app/actions';
import { Loader2, CheckCircle2 } from 'lucide-react';

export default function ApproveButton({ leadId }: { leadId: string }) {
	const [pending, setPending] = useState(false);

	const handleApprove = async () => {
		setPending(true);
		try {
			// CRITICAL: Ensure leadId is actually passed here!
			await approveProposal(leadId);

			// Note: Since the parent is a Server Component,
			// revalidatePath in the action will handle the UI flip.
		} catch (error) {
			console.error(error);
			alert('Failed to approve. Please try again.');
			setPending(false);
		}
	};

	return (
		<button
			onClick={handleApprove}
			disabled={pending}
			className="w-full bg-emerald-600 text-white font-black py-5 rounded-2xl shadow-xl flex items-center justify-center gap-2 hover:bg-emerald-700 transition-all disabled:opacity-70"
		>
			{pending ? (
				<>
					Securing Date <Loader2 className="animate-spin" size={20} />
				</>
			) : (
				<>
					Electronically Approve <CheckCircle2 size={20} />
				</>
			)}
		</button>
	);
}
