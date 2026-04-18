'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createJob } from '@/app/actions';
import { ArrowLeft, Plus, Loader2 } from 'lucide-react';
import Link from 'next/link';

export default function NewJobPage() {
	const router = useRouter();
	const [title, setTitle] = useState('');
	const [phone, setPhone] = useState('');
	const [value, setValue] = useState('');
	const [loading, setLoading] = useState(false);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);

		try {
			// 📍 1. Create the FormData envelope
			const formData = new FormData();

			// Mapping your local state to the keys expected by the Server Action
			formData.append('name', title);
			formData.append('description', `Client Phone: ${phone}`);
			formData.append('budget', value);

			// 📍 2. Pass the single formData argument
			const result = await createJob(formData);

			// If your createJob action returns an error object instead of redirecting
			if (result?.error) {
				throw new Error(result.error);
			}

			// Note: If createJob uses 'redirect()', the code below won't execute,
			// which is the preferred Next.js 15 pattern.
		} catch (err) {
			console.error('Creation failed:', err);
			alert('Failed to create project. Please try again.');
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="min-h-screen bg-[#05070f] p-8 font-sans text-white">
			<div className="max-w-2xl mx-auto space-y-8">
				<Link
					href="/dashboard/jobs"
					className="flex items-center gap-2 text-white/40 hover:text-white transition-colors text-xs font-black uppercase tracking-widest"
				>
					<ArrowLeft size={14} /> Back to Jobs
				</Link>

				<div className="space-y-2">
					<h1 className="text-5xl font-black italic uppercase tracking-tighter">
						New Project
					</h1>
					<p className="text-white/20 text-xs font-black uppercase tracking-[0.3em]">
						Initialize ScopeLock™ Protocol
					</p>
				</div>

				<form
					onSubmit={handleSubmit}
					className="bg-white/[0.03] border border-white/10 p-10 rounded-[3rem] space-y-6 backdrop-blur-xl"
				>
					<div className="space-y-4">
						<div>
							<label className="text-[10px] font-black text-white/20 uppercase tracking-widest ml-1">
								Project Name
							</label>
							<input
								required
								value={title}
								onChange={e => setTitle(e.target.value)}
								className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 mt-1 text-white outline-none focus:border-amber-500 transition-colors"
								placeholder="e.g. Maciaszek Kitchen"
							/>
						</div>
						<div>
							<label className="text-[10px] font-black text-white/20 uppercase tracking-widest ml-1">
								Client Phone
							</label>
							<input
								required
								value={phone}
								onChange={e => setPhone(e.target.value)}
								className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 mt-1 text-white outline-none focus:border-amber-500 transition-colors"
								placeholder="555-0123"
							/>
						</div>
						<div>
							<label className="text-[10px] font-black text-white/20 uppercase tracking-widest ml-1">
								Initial Budget
							</label>
							<input
								required
								type="number"
								value={value}
								onChange={e => setValue(e.target.value)}
								className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 mt-1 text-white outline-none focus:border-amber-500 transition-colors"
								placeholder="0.00"
							/>
						</div>
					</div>

					<button
						type="submit"
						disabled={loading}
						className="w-full bg-white text-black font-black uppercase text-xs tracking-[0.2em] py-5 rounded-2xl hover:bg-amber-500 transition-all flex items-center justify-center gap-2"
					>
						{loading ? (
							<Loader2 className="animate-spin" size={18} />
						) : (
							<Plus size={18} />
						)}
						{loading ? 'Initializing...' : 'Create Project'}
					</button>
				</form>
			</div>
		</div>
	);
}
