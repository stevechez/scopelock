'use client';

import { useState } from 'react';
import { createChangeOrder } from '@/app/actions';
import { ShieldCheck, Loader2 } from 'lucide-react';

export function ScopeLockForm({ jobId }: { jobId: string }) {
	const [description, setDescription] = useState('');
	const [price, setPrice] = useState('');
	const [loading, setLoading] = useState(false);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);
		try {
			await createChangeOrder(jobId, description, Number(price));
			setDescription('');
			setPrice('');
		} catch (err) {
			console.error(err);
			alert('Failed to lock scope change.');
		}
		setLoading(false);
	};

	return (
		<form
			onSubmit={handleSubmit}
			className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200 flex flex-col md:flex-row gap-4 items-end mt-6"
		>
			<div className="flex-1 w-full">
				<label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
					Scope Change Description
				</label>
				<input
					required
					type="text"
					value={description}
					onChange={e => setDescription(e.target.value)}
					placeholder="e.g. Add 2 recessed lights in kitchen"
					className="w-full bg-slate-50 border border-slate-100 rounded-xl p-3 text-sm mt-1 focus:ring-2 focus:ring-slate-900 outline-none"
				/>
			</div>
			<div className="w-full md:w-40">
				<label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
					Additional Cost
				</label>
				<div className="relative mt-1">
					<span className="absolute left-3 top-1/2 -translate-y-1/2 font-bold text-slate-400">
						$
					</span>
					<input
						required
						type="number"
						value={price}
						onChange={e => setPrice(e.target.value)}
						placeholder="0"
						className="w-full bg-slate-50 border border-slate-100 rounded-xl p-3 pl-7 text-sm focus:ring-2 focus:ring-slate-900 outline-none"
					/>
				</div>
			</div>
			<button
				type="submit"
				disabled={loading || !description || !price}
				className="bg-slate-900 text-white px-6 py-3 rounded-xl hover:bg-slate-800 disabled:opacity-50 transition-all h-[46px] flex items-center justify-center gap-2 font-bold text-sm w-full md:w-auto"
			>
				{loading ? (
					<Loader2 size={16} className="animate-spin" />
				) : (
					<ShieldCheck size={16} />
				)}
				{loading ? 'Locking...' : 'Lock Scope'}
			</button>
		</form>
	);
}
