'use client';

import { useActionState } from 'react';
import {
	createProposalAction,
	type ActionState,
} from '@/app/actions/proposals';

const initialState: ActionState = { error: '', success: false };

export default function ProposalForm({ tenantId }: { tenantId: string }) {
	const [state, formAction, isPending] = useActionState(
		createProposalAction,
		initialState,
	);

	return (
		<div className="w-full max-w-2xl mx-auto mt-8">
			<form action={formAction} className="space-y-8">
				{/* Hidden ID so the DB knows who this belongs to */}
				<input type="hidden" name="tenantId" value={tenantId} />

				{/* THE MISSING INPUTS - Wrapped in a visible box */}
				<div className="bg-slate-900 border border-slate-700 p-8 rounded-3xl shadow-xl space-y-6">
					{/* 01. Title Input */}
					<div className="space-y-2">
						<label className="text-xs font-bold uppercase tracking-widest text-slate-400">
							01 / Project Name
						</label>
						<input
							name="title"
							required
							placeholder="e.g. Master Suite Remodel"
							className="w-full bg-slate-950 border border-slate-700 rounded-xl p-4 text-white placeholder:text-slate-600 outline-none focus:border-blue-500 transition-all text-lg"
						/>
					</div>

					{/* 02. Amount Input */}
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
							className="w-full bg-slate-950 border border-slate-700 rounded-xl p-4 text-white text-2xl font-bold outline-none focus:border-emerald-500 transition-all"
						/>
					</div>

					{/* 03. Description */}
					<div className="space-y-2">
						<label className="text-xs font-bold uppercase tracking-widest text-slate-400">
							03 / Scope of Work
						</label>
						<textarea
							name="description"
							rows={4}
							placeholder="Describe the transformation..."
							className="w-full bg-slate-950 border border-slate-700 rounded-xl p-4 text-white placeholder:text-slate-600 outline-none focus:border-blue-500 transition-all resize-none"
						/>
					</div>
				</div>

				{/* Error Display */}
				{state?.error && (
					<div className="p-4 bg-red-900/50 border border-red-500 rounded-xl text-red-200 text-sm font-bold text-center">
						⚠️ {state.error}
					</div>
				)}

				{/* Submit Button */}
				<button
					type="submit"
					disabled={isPending}
					className="w-full bg-white text-black font-black py-5 rounded-2xl hover:bg-gray-200 transition-all disabled:opacity-50 text-xl"
				>
					{isPending ? 'Syncing to Vault...' : 'Publish Proposal'}
				</button>
			</form>
		</div>
	);
}
