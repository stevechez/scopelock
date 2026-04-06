'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';

export default function JumpstartForm() {
	const [isSubmitting, setIsSubmitting] = useState(false);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsSubmitting(true);
		// Simulate submission
		await new Promise(r => setTimeout(r, 1500));
		toast.success(
			'Project Request Received! Steve will reach out within 2 hours.',
		);
		setIsSubmitting(false);
	};

	return (
		<form
			onSubmit={handleSubmit}
			className="bg-white p-8 md:p-12 rounded-[3rem] border border-slate-200 shadow-2xl space-y-8"
		>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
				<section className="space-y-6">
					<h3 className="text-sm font-black uppercase tracking-widest text-amber-600">
						01. Personal Info
					</h3>
					<div>
						<label className="block text-sm font-bold text-slate-700 mb-2">
							Your Name
						</label>
						<input
							required
							type="text"
							className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-slate-900 outline-none bg-slate-50"
							placeholder="e.g. Steve Dunn"
						/>
					</div>
					<div>
						<label className="block text-sm font-bold text-slate-700 mb-2">
							Cell Phone
						</label>
						<input
							required
							type="tel"
							className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-slate-900 outline-none bg-slate-50"
							placeholder="(555) 000-0000"
						/>
					</div>
				</section>

				<section className="space-y-6">
					<h3 className="text-sm font-black uppercase tracking-widest text-indigo-600">
						02. Business Info
					</h3>
					<div>
						<label className="block text-sm font-bold text-slate-700 mb-2">
							Business Name
						</label>
						<input
							required
							type="text"
							className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-slate-900 outline-none bg-slate-50"
							placeholder="e.g. Apex Remodeling"
						/>
					</div>
					<div>
						<label className="block text-sm font-bold text-slate-700 mb-2">
							Primary Service Area
						</label>
						<input
							required
							type="text"
							className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-slate-900 outline-none bg-slate-50"
							placeholder="e.g. South Bay"
						/>
					</div>
				</section>
			</div>

			<hr className="border-slate-100" />

			<section className="space-y-6">
				<h3 className="text-sm font-black uppercase tracking-widest text-slate-400">
					03. Project Goals
				</h3>
				<div>
					<label className="block text-sm font-bold text-slate-700 mb-2">
						What&quot;s your #1 goal?
					</label>
					<select className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-slate-900 outline-none bg-slate-50 appearance-none">
						<option>Professionalizing my brand</option>
						<option>Automating my follow-ups</option>
						<option>Getting more leads</option>
					</select>
				</div>
				<div>
					<label className="block text-sm font-bold text-slate-700 mb-2">
						Notes for Steve
					</label>
					<textarea
						rows={4}
						className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-slate-900 outline-none bg-slate-50 resize-none"
						placeholder="Tell me about your business..."
					></textarea>
				</div>
			</section>

			<button
				type="submit"
				disabled={isSubmitting}
				className="w-full bg-slate-900 text-white font-black text-xl py-6 rounded-2xl hover:bg-slate-800 transition-all shadow-xl disabled:opacity-50"
			>
				{isSubmitting
					? 'Sending Request...'
					: 'Apply for Jumpstart Slot — $497'}
			</button>
		</form>
	);
}
