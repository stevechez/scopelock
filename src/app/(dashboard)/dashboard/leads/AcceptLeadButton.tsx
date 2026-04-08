'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { acceptLead } from '@/app/actions';
import { Zap, Loader2 } from 'lucide-react';

export function AcceptLeadButton({ leadId }: { leadId: string }) {
	const [isAccepting, setIsAccepting] = useState(false);
	const router = useRouter();

	const handleAccept = async () => {
		setIsAccepting(true);
		try {
			const job = await acceptLead(leadId);
			// Route them straight to the new job's pulse feed to get started
			router.push(`/dashboard/jobs/${job.id}/pulse`);
		} catch (error) {
			console.error(error);
			alert('Failed to convert lead to job.');
			setIsAccepting(false);
		}
	};

	return (
		<button
			onClick={handleAccept}
			disabled={isAccepting}
			className="flex-[2] bg-slate-900 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2 hover:bg-slate-800 active:scale-95 transition-all disabled:opacity-50"
		>
			{isAccepting ? (
				<Loader2 size={16} className="animate-spin" />
			) : (
				<Zap size={16} className="fill-white" />
			)}
			{isAccepting ? 'Converting...' : 'Accept Project'}
		</button>
	);
}
