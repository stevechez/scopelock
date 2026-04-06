'use client';

import { useActionState } from 'react';
import { createInvoiceAction } from '@/app/actions/invoice';

const initialState = { error: '', success: false };

export default function InvoiceForm({ tenantId }: { tenantId: string }) {
	const [state, formAction, isPending] = useActionState(
		createInvoiceAction,
		initialState,
	);

	return (
		<form action={formAction} className="space-y-4">
			<input type="hidden" name="tenantId" value={tenantId} />

			<div>
				<label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">
					Invoice Description
				</label>
				<input
					name="description"
					required
					placeholder="e.g. Deposit: Kitchen Remodel"
					className="w-full bg-slate-800 border border-slate-700 rounded-xl p-4 text-white focus:border-blue-500 outline-none transition-all"
				/>
			</div>

			<div>
				<label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">
					Amount Due ($)
				</label>
				<input
					name="amount"
					type="number"
					step="0.01"
					required
					placeholder="5000.00"
					className="w-full bg-slate-800 border border-slate-700 rounded-xl p-4 text-white focus:border-blue-500 outline-none transition-all"
				/>
			</div>

			{state.error && (
				<p className="text-red-400 text-sm font-bold mt-2">⚠️ {state.error}</p>
			)}
			{state.success && (
				<p className="text-emerald-400 text-sm font-bold mt-2">
					✓ Invoice sent.
				</p>
			)}

			<button
				type="submit"
				disabled={isPending}
				className="w-full bg-blue-600 text-white font-black py-4 rounded-xl hover:bg-blue-500 transition-all mt-4 disabled:opacity-50"
			>
				{isPending ? 'Processing...' : 'Issue Invoice'}
			</button>
		</form>
	);
}
