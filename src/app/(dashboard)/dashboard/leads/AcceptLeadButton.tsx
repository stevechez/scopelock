'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { acceptLead } from '@/app/actions';
import { Zap, Loader2 } from 'lucide-react';

export function AcceptLeadButton({ leadId }: { leadId: string }) {
	// 📍 Standardized on 'isAccepting' to match your state
	const [isAccepting, setIsAccepting] = useState(false);
	const router = useRouter();

	const handleAccept = async () => {
		setIsAccepting(true); // 📍 Fixed: Use isAccepting instead of setLoading

		try {
			const result = await acceptLead(leadId);

			// Type Guard: If the server action returns an error object
			if (result && 'error' in result) {
				alert(result.error);
				setIsAccepting(false);
				return;
			}

			// Type Guard: On success, navigate to the pulse feed
			if (result && 'id' in result) {
				router.push(`/dashboard/jobs/${result.id}/pulse`);
				// Note: We don't set isAccepting(false) here because
				// the redirect handles the transition.
			} else {
				// If the action redirects internally, this won't run.
				// If it returns null/undefined, reset the button.
				setIsAccepting(false);
			}
		} catch (error) {
			console.error('Lead conversion error:', error);
			alert('Failed to convert lead to job.');
			setIsAccepting(false);
		}
	};

	return (
		<button
			onClick={handleAccept}
			disabled={isAccepting}
			className="flex-[2] bg-slate-900 text-white font-black uppercase text-[10px] tracking-widest py-4 rounded-2xl flex items-center justify-center gap-2 hover:bg-slate-800 active:scale-95 transition-all disabled:opacity-50 shadow-xl shadow-slate-900/20"
		>
			{isAccepting ? (
				<Loader2 size={16} className="animate-spin" />
			) : (
				<Zap size={16} className="fill-white" />
			)}
			{isAccepting ? 'Initialising ScopeLock™...' : 'Accept Project'}
		</button>
	);
}
