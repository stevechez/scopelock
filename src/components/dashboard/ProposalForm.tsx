'use client';

import { useState } from 'react';
import { finalizeAndSendProposal } from '@/app/actions';
import {
	Loader2,
	FileSignature,
	CheckCircle2,
	AlertCircle,
} from 'lucide-react';

export default function ProposalForm({ leadId }: { leadId: string }) {
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [successMsg, setSuccessMsg] = useState('');
	const [errorMsg, setErrorMsg] = useState('');
	const [budget, setBudget] = useState('');

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsSubmitting(true);
		setErrorMsg('');
		setSuccessMsg('');

		try {
			// Calling the exact action we built earlier
			const result = await finalizeAndSendProposal(leadId, budget);

			if (result?.success) {
				setSuccessMsg(result.message || 'Proposal finalized!');
			} else {
				setErrorMsg(result?.message || 'Failed to generate proposal.');
			}
		} catch (error) {
			setErrorMsg('A critical error occurred.');
		} finally {
			setIsSubmitting(false);
		}
	};

	// If it succeeds, show a beautiful success state instead of the form
	if (successMsg) {
		return (
			<div className="bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 rounded-[2rem] p-8 text-center space-y-4">
				<div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-4">
					<CheckCircle2 size={32} />
				</div>
				<h3 className="text-xl font-black text-emerald-900 dark:text-emerald-400 uppercase italic">
					Proposal Locked
				</h3>
				<p className="text-emerald-700 dark:text-emerald-500/80 font-medium text-sm">
					{successMsg} The client has been moved to the Quoted stage.
				</p>
			</div>
		);
	}

	return (
		<div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-white/5 rounded-[2rem] p-8">
			<h3 className="text-xl font-black text-slate-900 dark:text-white italic uppercase mb-6 flex items-center gap-3">
				<FileSignature className="text-blue-500" />
				Draft Proposal
			</h3>

			<form onSubmit={handleSubmit} className="space-y-6">
				<div>
					<label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">
						Final Proposed Scope & Budget
					</label>
					<div className="relative">
						<span className="absolute left-4 top-4 text-slate-400 font-bold">
							$
						</span>
						<input
							type="text"
							required
							placeholder="125,000"
							value={budget}
							onChange={e => setBudget(e.target.value)}
							className="w-full bg-white dark:bg-[#0B101E] border border-slate-200 dark:border-slate-800 rounded-xl py-4 pl-8 pr-4 text-slate-900 dark:text-white font-black focus:ring-2 focus:ring-blue-500 outline-none transition-all"
						/>
					</div>
					<p className="text-xs text-slate-500 mt-2 ml-1">
						This will update the pipeline value on your dashboard.
					</p>
				</div>

				{errorMsg && (
					<div className="flex items-center gap-2 text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-500/10 p-4 rounded-xl text-sm font-bold border border-red-100 dark:border-red-500/20">
						<AlertCircle size={16} /> {errorMsg}
					</div>
				)}

				<button
					type="submit"
					disabled={isSubmitting || !budget}
					className="w-full bg-blue-600 text-white px-6 py-4 rounded-xl font-black text-sm uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-blue-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-blue-600/20"
				>
					{isSubmitting ? (
						<>
							<Loader2 size={18} className="animate-spin" /> Finalizing...
						</>
					) : (
						'Lock In & Update Status'
					)}
				</button>
			</form>
		</div>
	);
}
