'use client';

import { useActionState, useState } from 'react';
import {
	createProposalAction,
	type ActionState,
} from '@/app/actions/proposals';
import { finalizeAndSendProposal } from '@/app/actions';
import { Send, Loader2 } from 'lucide-react';
// ✅ Import the Lead type we created earlier
import { Lead } from '@/types/database';

const initialState: ActionState = { error: '', success: false };

// ✅ 1. Accept 'lead' and 'proposal' as props
export default function ProposalForm({
	tenantId,
	lead,
	proposalText,
}: {
	tenantId: string;
	lead: Lead;
	proposalText: string;
}) {
	const [state, formAction] = useActionState(
		createProposalAction,
		initialState,
	);
	const [isSending, setIsSending] = useState(false);

	// ✅ 2. The handleSend function now knows exactly what to send
	const handleSend = async (e: React.MouseEvent) => {
		e.preventDefault();
		setIsSending(true);

		try {
			const result = await finalizeAndSendProposal(lead.id, proposalText);
			if (result.success) {
				alert(`Proposal sent to ${lead.client_name}!`);
			}
		} catch (err) {
			// ✅ Narrow the type from 'unknown' to 'Error'
			const errorMessage =
				err instanceof Error ? err.message : 'An unknown error occurred';

			console.error('FRONTEND ERROR:', errorMessage);
			alert(`Error: ${errorMessage}`);
		} finally {
			setIsSending(false);
		}
	};

	return (
		<div className="w-full max-w-2xl mx-auto mt-8">
			<form action={formAction} className="space-y-8">
				<input type="hidden" name="tenantId" value={tenantId} />
				{/* ✅ Pass the lead ID to the form action as well */}
				<input type="hidden" name="leadId" value={lead.id} />

				<div className="bg-slate-900 border border-slate-700 p-8 rounded-3xl shadow-xl space-y-6">
					<div className="space-y-2">
						<label className="text-xs font-bold uppercase tracking-widest text-slate-400">
							01 / Project Name
						</label>
						<input
							name="title"
							required
							defaultValue={`${lead.project_type} for ${lead.client_name}`}
							className="w-full bg-slate-950 border border-slate-700 rounded-xl p-4 text-white placeholder:text-slate-600 outline-none focus:border-blue-500 transition-all text-lg font-bold"
						/>
					</div>

					<div className="space-y-2">
						<label className="text-xs font-bold uppercase tracking-widest text-slate-400">
							02 / Total Investment ($)
						</label>
						<input
							name="amount"
							type="number"
							step="0.01"
							required
							placeholder="0.00"
							className="w-full bg-slate-950 border border-slate-700 rounded-xl p-4 text-white text-2xl font-black outline-none focus:border-emerald-500 transition-all"
						/>
					</div>

					<div className="space-y-2">
						<label className="text-xs font-bold uppercase tracking-widest text-slate-400">
							03 / Scope of Work
						</label>
						<textarea
							name="description"
							rows={8}
							defaultValue={proposalText} // ✅ Fill the box with the AI generated text
							className="w-full bg-slate-950 border border-slate-700 rounded-xl p-4 text-white placeholder:text-slate-600 outline-none focus:border-blue-500 transition-all resize-none font-mono text-sm"
						/>
					</div>
				</div>

				{state?.error && (
					<div className="p-4 bg-red-900/50 border border-red-500 rounded-xl text-red-200 text-sm font-bold text-center">
						⚠️ {state.error}
					</div>
				)}

				<button
					onClick={handleSend}
					disabled={isSending}
					className="w-full mt-2 bg-emerald-500 hover:bg-emerald-600 text-white font-black py-5 rounded-2xl flex items-center justify-center gap-3 transition-all shadow-xl shadow-emerald-500/10 active:scale-95 disabled:opacity-50"
				>
					{isSending ? (
						<Loader2 className="animate-spin" />
					) : (
						<>
							<Send size={20} /> Finalize & Send to Client
						</>
					)}
				</button>
			</form>
		</div>
	);
}
