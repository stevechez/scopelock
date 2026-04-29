'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { Loader2, ShieldCheck } from 'lucide-react';
import { submitJumpstart } from '@/app/actions';

export default function JumpstartForm() {
	const [isSubmitting, setIsSubmitting] = useState(false);

	const [formData, setFormData] = useState({
		name: '',
		phone: '',
		businessName: '',
		serviceArea: '',
		goal: 'Professionalizing my brand',
		notes: '',
	});

	const handleInputChange = (
		e: React.ChangeEvent<
			HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
		>,
	) => {
		const { name, value } = e.target;
		setFormData(prev => ({ ...prev, [name]: value }));
	};

	// Corrected placement of handleSubmit logic
	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setIsSubmitting(true);

		try {
			const form = e.currentTarget;
			const data = new FormData(form);

			// Fire the actual server action
			const result = await submitJumpstart(data);

			if (result?.success) {
				// Sonner syntax
				toast.success('System Initialized!', {
					description: 'Steve will reach out within 2 hours.',
				});

				// Reset state and the HTML form
				form.reset();
				setFormData({
					name: '',
					phone: '',
					businessName: '',
					serviceArea: '',
					goal: 'Professionalizing my brand',
					notes: '',
				});
			}
		} catch (error) {
			console.error('Submission error:', error);
			toast.error('Something went wrong. Please try again.');
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<form
			onSubmit={handleSubmit}
			className="bg-white dark:bg-[#0B101E] p-8 md:p-12 rounded-[2.5rem] border border-slate-200 dark:border-white/5 shadow-2xl space-y-10 transition-colors"
		>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-10">
				{/* SECTION 1 */}
				<section className="space-y-6">
					<div className="flex items-center gap-3 mb-6">
						<span className="w-6 h-6 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-500 flex items-center justify-center text-xs font-black">
							1
						</span>
						<h3 className="text-sm font-black uppercase tracking-widest text-slate-900 dark:text-white">
							Personal Details
						</h3>
					</div>

					<div className="space-y-1.5">
						<label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide">
							Your Name
						</label>
						<input
							required
							name="name"
							value={formData.name}
							onChange={handleInputChange}
							type="text"
							className="w-full px-4 py-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 text-slate-900 dark:text-white focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all"
							placeholder="e.g. Steve Dunn"
						/>
					</div>
					<div className="space-y-1.5">
						<label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide">
							Cell Phone
						</label>
						<input
							required
							name="phone"
							value={formData.phone}
							onChange={handleInputChange}
							type="tel"
							className="w-full px-4 py-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 text-slate-900 dark:text-white focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all"
							placeholder="(555) 000-0000"
						/>
					</div>
				</section>

				{/* SECTION 2 */}
				<section className="space-y-6">
					<div className="flex items-center gap-3 mb-6">
						<span className="w-6 h-6 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-500 flex items-center justify-center text-xs font-black">
							2
						</span>
						<h3 className="text-sm font-black uppercase tracking-widest text-slate-900 dark:text-white">
							Business Profile
						</h3>
					</div>

					<div className="space-y-1.5">
						<label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide">
							Business Name
						</label>
						<input
							required
							name="businessName"
							value={formData.businessName}
							onChange={handleInputChange}
							type="text"
							className="w-full px-4 py-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 text-slate-900 dark:text-white focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all"
							placeholder="e.g. Apex Remodeling"
						/>
					</div>
					<div className="space-y-1.5">
						<label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide">
							Primary Service Area
						</label>
						<input
							required
							name="serviceArea"
							value={formData.serviceArea}
							onChange={handleInputChange}
							type="text"
							className="w-full px-4 py-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 text-slate-900 dark:text-white focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all"
							placeholder="e.g. South Bay"
						/>
					</div>
				</section>
			</div>

			<hr className="border-slate-100 dark:border-white/5" />

			{/* SECTION 3 */}
			<section className="space-y-6">
				<div className="flex items-center gap-3 mb-6">
					<span className="w-6 h-6 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-500 flex items-center justify-center text-xs font-black">
						3
					</span>
					<h3 className="text-sm font-black uppercase tracking-widest text-slate-900 dark:text-white">
						Project Scope
					</h3>
				</div>

				<div className="space-y-1.5">
					<label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide">
						What&apos;s your primary goal?
					</label>
					<div className="relative">
						<select
							name="goal"
							value={formData.goal}
							onChange={handleInputChange}
							className="w-full px-4 py-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 text-slate-900 dark:text-white focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none appearance-none transition-all"
						>
							<option>Professionalizing my brand</option>
							<option>Automating my client follow-ups</option>
							<option>Streamlining my change orders</option>
						</select>
						<div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-slate-400">
							<svg
								className="w-4 h-4"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M19 9l-7 7-7-7"
								/>
							</svg>
						</div>
					</div>
				</div>
				<div className="space-y-1.5">
					<label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide">
						Notes for Steve
					</label>
					<textarea
						name="notes"
						value={formData.notes}
						onChange={handleInputChange}
						rows={4}
						className="w-full px-4 py-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 text-slate-900 dark:text-white focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none resize-none transition-all placeholder:text-slate-400"
						placeholder="Tell me a bit about the types of jobs you usually run..."
					></textarea>
				</div>
			</section>

			<div className="pt-4 space-y-4">
				<button
					type="submit"
					disabled={isSubmitting}
					className="w-full bg-slate-900 dark:bg-amber-500 text-white dark:text-slate-950 font-black text-lg py-5 rounded-xl hover:scale-[1.02] active:scale-95 transition-all shadow-xl disabled:opacity-50 flex items-center justify-center gap-3"
				>
					{isSubmitting ? (
						<>
							<Loader2 className="w-5 h-5 animate-spin" />
							<span>Processing Application...</span>
						</>
					) : (
						'Submit Jumpstart Application — $497'
					)}
				</button>

				<div className="flex items-center justify-center gap-2 text-slate-500 dark:text-slate-400">
					<ShieldCheck className="w-4 h-4 text-emerald-500" />
					<span className="text-xs font-medium">
						No payment required until your application is approved.
					</span>
				</div>
			</div>
		</form>
	);
}
