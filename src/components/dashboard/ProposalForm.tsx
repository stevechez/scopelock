'use client';

import { useState } from 'react';
import { sendProposal } from '@/app/actions';
import { Loader2, Send } from 'lucide-react';

interface Lead {
	id: string;
	name: string; // 📍 We use 'name' here
	email?: string;
}

interface ProposalFormProps {
	tenantId: string;
	lead: Lead;
	proposalText: string;
}

// 📍 Define the exact shape we expect from the Server Action
type ActionResponse = {
	success?: boolean;
	error?: string;
} | null;

export function ProposalForm({
	tenantId,
	lead,
	proposalText,
}: ProposalFormProps) {
	const [loading, setLoading] = useState(false);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);

		try {
			const formData = new FormData();
			formData.append('leadId', lead.id);
			formData.append('tenantId', tenantId);
			formData.append('content', proposalText);

			// 📍 FIX 1: Use 'sendProposal' with 'formData', and cast the type
			const result = (await sendProposal(formData)) as ActionResponse;

			// The absolute truthiness check
			if (!result) {
				throw new Error('No response received from the server.');
			}

			// 📍 FIX 2: Use 'lead.name' to match the interface, and direct property access
			if (result && result.success) {
				alert(`Proposal sent to ${lead.name}!`);
			} else if (result.error) {
				alert(`Error: ${result.error}`);
			}
		} catch (err) {
			console.error('Submission failed:', err);
			alert('A network error occurred. Please try again.');
		} finally {
			setLoading(false);
		}
	};

	return (
		<form onSubmit={handleSubmit} className="space-y-6">
			<textarea
				defaultValue={proposalText}
				className="w-full bg-white/5 border border-white/10 rounded-[2rem] p-8 text-white min-h-[400px] outline-none focus:border-amber-500/50 transition-all shadow-2xl"
			/>
			<button
				type="submit"
				disabled={loading}
				className="w-full bg-white text-black font-black uppercase text-xs tracking-[0.2em] py-5 rounded-2xl hover:bg-amber-500 transition-all flex items-center justify-center gap-2"
			>
				{loading ? (
					<Loader2 className="animate-spin" size={18} />
				) : (
					<Send size={18} />
				)}
				{loading ? 'Transmitting...' : 'Send to Client'}
			</button>
		</form>
	);
}
