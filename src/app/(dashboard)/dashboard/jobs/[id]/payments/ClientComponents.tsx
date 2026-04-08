'use client';

import { useState } from 'react';
import { createMilestone, requestMilestonePayment } from '@/app/actions';
import { Plus, Loader2, Send } from 'lucide-react';

export function NewMilestoneForm({ jobId }: { jobId: string }) {
	const [title, setTitle] = useState('');
	const [amount, setAmount] = useState('');
	const [loading, setLoading] = useState(false);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);
		try {
			await createMilestone(jobId, title, Number(amount));
			setTitle('');
			setAmount('');
		} catch (err) {
			console.error(err);
			alert('Failed to create milestone.');
		}
		setLoading(false);
	};

	return (
		<form
			onSubmit={handleSubmit}
			className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200 flex gap-4 items-end"
		>
			<div className="flex-1">
				<label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
					Milestone Name
				</label>
				<input
					required
					type="text"
					value={title}
					onChange={e => setTitle(e.target.value)}
					placeholder="e.g. Framing Completed"
					className="w-full bg-slate-50 border border-slate-100 rounded-xl p-3 text-sm mt-1 focus:ring-2 focus:ring-slate-900 outline-none"
				/>
			</div>
			<div className="w-32">
				<label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
					Amount
				</label>
				<div className="relative mt-1">
					<span className="absolute left-3 top-1/2 -translate-y-1/2 font-bold text-slate-400">
						$
					</span>
					<input
						required
						type="number"
						value={amount}
						onChange={e => setAmount(e.target.value)}
						placeholder="0"
						className="w-full bg-slate-50 border border-slate-100 rounded-xl p-3 pl-7 text-sm focus:ring-2 focus:ring-slate-900 outline-none"
					/>
				</div>
			</div>
			<button
				type="submit"
				disabled={loading || !title || !amount}
				className="bg-slate-900 text-white p-3 rounded-xl hover:bg-slate-800 disabled:opacity-50 transition-all h-[46px] w-[46px] flex items-center justify-center"
			>
				{loading ? (
					<Loader2 size={18} className="animate-spin" />
				) : (
					<Plus size={18} />
				)}
			</button>
		</form>
	);
}

export function RequestPaymentButton({
	milestoneId,
	jobId,
}: {
	milestoneId: string;
	jobId: string;
}) {
	const [loading, setLoading] = useState(false);

	const handleSend = async () => {
		setLoading(true);
		try {
			// Passing a placeholder image as the "proof of work" for MVP
			const dummyProofImage =
				'https://images.unsplash.com/photo-1541888081638-3482ee6919e8?auto=format&fit=crop&q=80&w=1000';
			await requestMilestonePayment(milestoneId, jobId, dummyProofImage);
			alert('Payment Request SMS Sent!');
		} catch (err) {
			console.error(err);
			alert('Failed to send request.');
		}
		setLoading(false);
	};

	return (
		<button
			onClick={handleSend}
			disabled={loading}
			className="bg-emerald-50 text-emerald-600 font-bold text-xs px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-emerald-100 transition-colors disabled:opacity-50 border border-emerald-100"
		>
			{loading ? (
				<Loader2 size={14} className="animate-spin" />
			) : (
				<Send size={14} />
			)}
			{loading ? 'Sending...' : 'Send Invoice via SMS'}
		</button>
	);
}
