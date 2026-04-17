'use client';

import { useState } from 'react';
import { createPaymentRequest } from '@/app/actions';
import { Loader2, DollarSign, ExternalLink, Receipt, Plus } from 'lucide-react';

interface Payment {
	id: string;
	amount: number;
	description: string;
	status: string;
	stripe_url: string;
	created_at: string;
}

export default function PaymentManager({
	leadId,
	existingPayments,
}: {
	leadId: string;
	existingPayments: Payment[];
}) {
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [description, setDescription] = useState('');
	const [amount, setAmount] = useState('');

	const handleCreate = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsSubmitting(true);

		try {
			const url = await createPaymentRequest(
				leadId,
				parseFloat(amount),
				description,
			);
			if (url) window.open(url, '_blank'); // Open Stripe Checkout in new tab

			// Clear form
		} catch (error: unknown) {
			if (error instanceof Error) {
				alert(error.message);
			} else {
				alert('An unexpected error occurred while creating the payment.');
			}
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<div className="space-y-8">
			{/* 1. NEW REQUEST FORM */}
			<div className="bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/5 rounded-[2rem] p-8">
				<h3 className="text-xl font-black text-slate-900 dark:text-white italic uppercase mb-6 flex items-center gap-3">
					<Plus className="text-emerald-500" />
					New Milestone Request
				</h3>

				<form
					onSubmit={handleCreate}
					className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end"
				>
					<div className="md:col-span-1">
						<label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">
							Description
						</label>
						<input
							type="text"
							placeholder="e.g. Deposit / Framing"
							value={description}
							onChange={e => setDescription(e.target.value)}
							className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
							required
						/>
					</div>
					<div>
						<label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">
							Amount (USD)
						</label>
						<div className="relative">
							<span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">
								$
							</span>
							<input
								type="number"
								placeholder="5000"
								value={amount}
								onChange={e => setAmount(e.target.value)}
								className="w-all bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl py-3 pl-8 pr-4 text-sm text-slate-900 dark:text-white font-black focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
								required
							/>
						</div>
					</div>
					<button
						type="submit"
						disabled={isSubmitting || !amount}
						className="bg-emerald-600 text-white px-6 py-3.5 rounded-xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-emerald-500 transition-all disabled:opacity-50 shadow-lg shadow-emerald-600/20"
					>
						{isSubmitting ? (
							<Loader2 size={16} className="animate-spin" />
						) : (
							<DollarSign size={16} />
						)}
						Issue Request
					</button>
				</form>
			</div>

			{/* 2. PAYMENT HISTORY */}
			<div className="space-y-4">
				<h3 className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">
					Payment Ledger
				</h3>

				{existingPayments.length === 0 ? (
					<div className="text-center py-12 bg-white dark:bg-[#0B101E] rounded-[2rem] border border-dashed border-slate-200 dark:border-white/10">
						<Receipt className="mx-auto text-slate-300 mb-2" size={32} />
						<p className="text-slate-400 font-bold text-sm uppercase">
							No payments issued yet
						</p>
					</div>
				) : (
					<div className="grid gap-3">
						{existingPayments.map(p => (
							<div
								key={p.id}
								className="bg-white dark:bg-[#0B101E] border border-slate-100 dark:border-white/5 p-5 rounded-2xl flex items-center justify-between group transition-all hover:border-emerald-500/30"
							>
								<div className="flex items-center gap-4">
									<div
										className={`w-10 h-10 rounded-xl flex items-center justify-center ${p.status === 'paid' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'}`}
									>
										<DollarSign size={20} />
									</div>
									<div>
										<p className="font-black text-slate-900 dark:text-white uppercase text-xs italic">
											{p.description}
										</p>
										<p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
											{new Date(p.created_at).toLocaleDateString()}
										</p>
									</div>
								</div>

								<div className="flex items-center gap-6">
									<div className="text-right">
										<p className="font-black text-slate-900 dark:text-white">
											${p.amount.toLocaleString()}
										</p>
										<span
											className={`text-[9px] font-black uppercase tracking-tighter ${p.status === 'paid' ? 'text-emerald-500' : 'text-amber-500'}`}
										>
											{p.status}
										</span>
									</div>

									{p.status !== 'paid' && (
										<a
											href={p.stripe_url}
											target="_blank"
											className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800 text-slate-400 hover:text-emerald-500 transition-colors"
										>
											<ExternalLink size={16} />
										</a>
									)}
								</div>
							</div>
						))}
					</div>
				)}
			</div>
		</div>
	);
}
