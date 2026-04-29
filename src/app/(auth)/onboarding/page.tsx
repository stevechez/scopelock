'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { completeOnboarding } from '@/app/actions';
import { motion } from 'framer-motion';
import { Building2, Rocket, ArrowRight, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';

export default function OnboardingPage() {
	const [companyName, setCompanyName] = useState('');
	const [ownerName, setOwnerName] = useState('');
	const [isSubmitting, setIsSubmitting] = useState(false);
	const router = useRouter();

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		console.log('🚀 Submit button clicked!'); // If you don't see this in the BROWSER console, the button is broken.

		setIsSubmitting(true);

		try {
			const form = e.currentTarget;
			const data = new FormData(form);

			// Log the actual data being sent
			console.log('Form Data Object:', Object.fromEntries(data.entries()));

			// Fire the action
			const result = await submitJumpstart(data);
			console.log('Server Response:', result);

			toast.success('Application Received! Steve will reach out soon.');
			form.reset();
			setFormData({
				name: '',
				phone: '',
				businessName: '',
				serviceArea: '',
				goal: 'Professionalizing my brand',
				notes: '',
			});
		} catch (error) {
			console.error('Submission error catch:', error);
			toast.error('Check browser console for errors.');
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<div className="min-h-screen bg-slate-950 flex items-center justify-center p-6 font-sans">
			<div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20 pointer-events-none" />

			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-[2.5rem] p-10 shadow-2xl relative z-10"
			>
				<div className="w-16 h-16 bg-amber-500 text-slate-900 rounded-2xl flex items-center justify-center mb-8 shadow-lg shadow-amber-500/20">
					<Rocket className="w-8 h-8" />
				</div>

				<h1 className="text-3xl font-black text-white tracking-tight mb-2">
					Initialize BUILDRAIL
				</h1>
				<p className="text-slate-400 font-medium mb-8">
					Let&quot;s set up your Command Center. This only takes a minute.
				</p>

				<form onSubmit={handleSubmit} className="space-y-6">
					<div>
						<label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2 ml-1">
							Company Name
						</label>
						<div className="relative">
							<Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-600" />
							<input
								required
								value={companyName}
								onChange={e => setCompanyName(e.target.value)}
								className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-12 pr-4 py-4 text-white focus:ring-2 focus:ring-amber-500 outline-none transition-all"
								placeholder="Chez Construction"
							/>
						</div>
					</div>

					<div>
						<label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2 ml-1">
							Your Full Name
						</label>
						<input
							required
							value={ownerName}
							onChange={e => setOwnerName(e.target.value)}
							className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-4 text-white focus:ring-2 focus:ring-amber-500 outline-none transition-all"
							placeholder="Steve Chez"
						/>
					</div>

					<button
						disabled={isSubmitting || !companyName}
						className="w-full bg-white text-slate-900 font-black py-4 rounded-xl hover:bg-slate-200 transition-all flex items-center justify-center gap-2 shadow-xl disabled:opacity-50"
					>
						{isSubmitting ? (
							<Loader2 className="w-5 h-5 animate-spin" />
						) : (
							<>
								Launch Dashboard <ArrowRight className="w-5 h-5" />
							</>
						)}
					</button>
				</form>
			</motion.div>
		</div>
	);
}
