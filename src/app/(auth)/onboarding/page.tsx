'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { completeOnboarding } from '@/app/actions'; // Use the correct action for Onboarding
import { motion } from 'framer-motion';
import { Building2, Rocket, ArrowRight, Loader2 } from 'lucide-react';
import { toast } from 'sonner'; // Ensure this is imported correctly

export default function OnboardingPage() {
	const [companyName, setCompanyName] = useState('');
	const [ownerName, setOwnerName] = useState('');
	const [isSubmitting, setIsSubmitting] = useState(false);
	const router = useRouter();

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setIsSubmitting(true);

		try {
			const form = e.currentTarget;
			const data = new FormData(form);

			// Log for debugging in browser console
			console.log('Sending to Onboarding:', Object.fromEntries(data.entries()));

			// Call the correct action
			const result = await completeOnboarding(data);

			if (result?.success) {
				toast.success('Command Center Initialized!');
				router.push('/dashboard');
			} else {
				throw new Error('Onboarding failed');
			}
		} catch (error) {
			console.error('Onboarding error:', error);
			toast.error('Initialization failed. Check console.');
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<div className="min-h-screen bg-slate-950 flex items-center justify-center p-6 font-sans overflow-hidden">
			{/* Background Detail */}
			<div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20 pointer-events-none" />
			<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-amber-500/10 blur-[120px] rounded-full pointer-events-none" />

			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-[2.5rem] p-10 shadow-2xl relative z-10"
			>
				<div className="w-16 h-16 bg-amber-500 text-foreground rounded-2xl flex items-center justify-center mb-8 shadow-lg shadow-amber-500/20">
					<Rocket className="w-8 h-8" />
				</div>

				<h1 className="text-3xl font-black text-white tracking-tight mb-2">
					Initialize BUILDRAIL
				</h1>
				<p className="text-muted font-medium mb-8">
					Let&apos;s set up your Command Center.
				</p>

				<form onSubmit={handleSubmit} className="space-y-6">
					<div>
						<label className="block text-xs font-black text-muted uppercase tracking-widest mb-2 ml-1">
							Company Name
						</label>
						<div className="relative">
							<Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-600" />
							<input
								required
								name="companyName" // CRITICAL: Added name attribute
								value={companyName}
								onChange={e => setCompanyName(e.target.value)}
								className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-12 pr-4 py-4 text-white focus:ring-2 focus:ring-amber-500 outline-none transition-all placeholder:text-slate-700"
								placeholder="e.g. Chez Construction"
							/>
						</div>
					</div>

					<div>
						<label className="block text-xs font-black text-muted uppercase tracking-widest mb-2 ml-1">
							Your Full Name
						</label>
						<input
							required
							name="ownerName" // CRITICAL: Added name attribute
							value={ownerName}
							onChange={e => setOwnerName(e.target.value)}
							className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-4 text-white focus:ring-2 focus:ring-amber-500 outline-none transition-all placeholder:text-slate-700"
							placeholder="e.g. Steve Chez"
						/>
					</div>

					<button
						type="submit"
						disabled={isSubmitting || !companyName}
						className="w-full bg-white text-foreground font-black py-4 rounded-xl hover:bg-slate-200 transition-all flex items-center justify-center gap-2 shadow-xl disabled:opacity-50"
					>
						{isSubmitting ? (
							<>
								<Loader2 className="w-5 h-5 animate-spin" />
								<span>Provisioning...</span>
							</>
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
