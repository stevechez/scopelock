'use client';

import { useState } from 'react';
import { Plus, Send } from 'lucide-react';
import { createMilestone } from '@/app/actions';

export function AddMilestoneForm({
	jobId,
	remaining,
}: {
	jobId: string;
	remaining: number;
}) {
	const [isOpen, setIsOpen] = useState(false);
	const [title, setTitle] = useState('');
	const [amount, setAmount] = useState<number | ''>('');
	const [isSubmitting, setIsSubmitting] = useState(false);

	const handleSave = async () => {
		if (!title || !amount) return;
		setIsSubmitting(true);
		try {
			await createMilestone(jobId, title, Number(amount));
			setIsOpen(false);
			setTitle('');
			setAmount('');
		} catch (error) {
			console.error(error);
			alert('Failed to save milestone.');
		} finally {
			setIsSubmitting(false);
		}
	};

	if (!isOpen) {
		return (
			<button
				onClick={() => setIsOpen(true)}
				className="w-full bg-slate-200 text-slate-700 font-bold text-lg py-4 rounded-2xl border-2 border-dashed border-slate-300 flex items-center justify-center gap-2 active:bg-slate-300 transition-colors"
			>
				<Plus size={24} />
				Add Milestone
			</button>
		);
	}

	return (
		<div className="bg-white p-5 rounded-2xl shadow-xl border border-slate-200 flex flex-col gap-4">
			<h3 className="font-bold text-slate-900">New Milestone</h3>
			<input
				type="text"
				placeholder="e.g. Foundation Poured"
				value={title}
				onChange={e => setTitle(e.target.value)}
				className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-slate-900"
			/>
			<div className="relative">
				<span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 font-bold">
					$
				</span>
				<input
					type="number"
					placeholder={`Max: ${remaining}`}
					max={remaining}
					value={amount}
					onChange={e => setAmount(Number(e.target.value))}
					className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-8 pr-4 focus:outline-none focus:ring-2 focus:ring-slate-900"
				/>
			</div>
			<div className="flex gap-2 mt-2">
				<button
					onClick={() => setIsOpen(false)}
					className="flex-1 py-3 text-slate-500 font-semibold active:bg-slate-100 rounded-xl"
				>
					Cancel
				</button>
				<button
					onClick={handleSave}
					disabled={isSubmitting || !title || !amount || amount > remaining}
					className="flex-1 bg-emerald-500 text-white font-bold py-3 rounded-xl shadow flex items-center justify-center gap-2 disabled:opacity-50 active:bg-emerald-600"
				>
					{isSubmitting ? 'Saving...' : 'Save'}
				</button>
			</div>
		</div>
	);
}
