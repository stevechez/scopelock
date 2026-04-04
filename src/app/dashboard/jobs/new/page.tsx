'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createJob } from '@/app/actions';
import { ArrowLeft, Plus, Loader2 } from 'lucide-react';
import Link from 'next/link';

export default function NewJobPage() {
	const [title, setTitle] = useState('');
	const [phone, setPhone] = useState('');
	const [value, setValue] = useState('');
	const [loading, setLoading] = useState(false);
	const router = useRouter();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);

		try {
			const job = await createJob(title, phone, Number(value));
			router.push(`/dashboard/jobs/${job.id}/payments`);
		} catch (err) {
			console.error('Creation failed:', err);
			alert('Error creating job. Please check your connection.');
			setLoading(false);
		}
	};

	return (
		<div className="min-h-screen bg-slate-50 p-6 flex flex-col items-center selection:bg-slate-900 selection:text-white">
			<div className="w-full max-w-lg mt-12">
				<Link
					href="/dashboard"
					className="flex items-center gap-2 text-slate-400 font-bold text-[10px] uppercase tracking-widest mb-8 hover:text-slate-900 transition-colors w-fit"
				>
					<ArrowLeft size={14} /> Back to Command Center
				</Link>

				<div className="mb-10">
					<h1 className="text-4xl font-black text-slate-900 tracking-tight">
						New Project
					</h1>
					<p className="text-slate-500 font-medium mt-2">
						Set the foundation for a new build.
					</p>
				</div>

				<form
					onSubmit={handleSubmit}
					className="space-y-6 bg-white p-8 md:p-10 rounded-[2.5rem] shadow-2xl shadow-slate-200/50 border border-slate-100"
				>
					<div>
						<label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
							Project Name
						</label>
						<input
							required
							type="text"
							value={title}
							onChange={e => setTitle(e.target.value)}
							placeholder="e.g. Cupertino Kitchen Remodel"
							className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-4 text-sm mt-1 focus:ring-2 focus:ring-slate-900 outline-none transition-all text-slate-900"
						/>
					</div>

					<div>
						<label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
							Client Phone (SMS)
						</label>
						<input
							required
							type="tel"
							value={phone}
							onChange={e => setPhone(e.target.value)}
							placeholder="+1 555 000 0000"
							className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-4 text-sm mt-1 focus:ring-2 focus:ring-slate-900 outline-none transition-all text-slate-900"
						/>
					</div>

					<div>
						<label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
							Initial Contract Value
						</label>
						<div className="relative mt-1">
							<span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-slate-400">
								$
							</span>
							<input
								required
								type="number"
								value={value}
								onChange={e => setValue(e.target.value)}
								placeholder="0.00"
								className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-4 pl-8 text-sm focus:ring-2 focus:ring-slate-900 outline-none transition-all text-slate-900"
							/>
						</div>
					</div>

					<button
						type="submit"
						disabled={loading || !title || !phone || !value}
						className="w-full bg-slate-900 text-white font-black text-lg py-5 rounded-2xl shadow-xl flex items-center justify-center gap-2 mt-4 hover:bg-slate-800 active:scale-95 transition-all disabled:opacity-50"
					>
						{loading ? (
							<Loader2 size={20} className="animate-spin" />
						) : (
							<Plus size={20} />
						)}
						{loading ? 'Initializing...' : 'Start Project'}
					</button>
				</form>
			</div>
		</div>
	);
}
