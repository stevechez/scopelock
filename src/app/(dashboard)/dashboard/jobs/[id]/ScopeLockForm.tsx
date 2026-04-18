'use client';

import { useState } from 'react';
import { createChangeOrder } from '@/app/actions';
import { ShieldAlert, Loader2, Plus } from 'lucide-react';

export function ScopeLockForm({ jobId }: { jobId: string }) {
	const [description, setDescription] = useState('');
	const [price, setPrice] = useState('');
	const [loading, setLoading] = useState(false);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);

		try {
			// 📍 1. Wrap your arguments into FormData
			const formData = new FormData();
			formData.append('projectId', jobId); // Matches our 'actions.ts' key
			formData.append('title', 'Manual Scope Adjustment');
			formData.append('description', description);
			formData.append('amount', price);

			// 📍 2. Pass the single formData argument
			await createChangeOrder(formData);

			setDescription('');
			setPrice('');
		} catch (err) {
			console.error(err);
			alert('Failed to lock scope change.');
		} finally {
			setLoading(false);
		}
	};

	return (
		<form
			onSubmit={handleSubmit}
			className="bg-[#0a0f1d] border border-amber-500/20 p-8 rounded-[2.5rem] shadow-2xl"
		>
			<div className="flex items-center gap-3 mb-6">
				<ShieldAlert className="text-amber-500" size={20} />
				<h3 className="text-white font-black italic uppercase tracking-tighter text-xl">
					ScopeLock™ Entry
				</h3>
			</div>

			<div className="space-y-4">
				<div>
					<label className="text-[10px] font-black text-white/20 uppercase tracking-[0.2em] ml-1">
						Change Description
					</label>
					<textarea
						required
						value={description}
						onChange={e => setDescription(e.target.value)}
						className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-sm mt-1 text-white outline-none focus:border-amber-500 transition-colors resize-none h-24"
						placeholder="e.g. Added custom LED lighting in pantry"
					/>
				</div>

				<div className="flex gap-4">
					<div className="flex-1">
						<label className="text-[10px] font-black text-white/20 uppercase tracking-[0.2em] ml-1">
							Cost Impact
						</label>
						<div className="relative mt-1">
							<span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 font-bold">
								$
							</span>
							<input
								required
								type="number"
								value={price}
								onChange={e => setPrice(e.target.value)}
								className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 pl-8 text-sm text-white outline-none focus:border-amber-500 transition-colors"
								placeholder="0.00"
							/>
						</div>
					</div>

					<button
						type="submit"
						disabled={loading || !description}
						className="self-end bg-amber-500 text-black font-black uppercase text-[10px] tracking-widest h-[54px] px-8 rounded-2xl hover:bg-white transition-all disabled:opacity-50 flex items-center gap-2"
					>
						{loading ? (
							<Loader2 className="animate-spin" size={16} />
						) : (
							<Plus size={16} />
						)}
						{loading ? 'Locking...' : 'Add to Budget'}
					</button>
				</div>
			</div>
		</form>
	);
}
