'use client';

import { useActionState, useState } from 'react';
import { createTenantAction } from '@/app/actions/tenant';
import { motion, AnimatePresence } from 'framer-motion';

export default function OnboardingPage() {
	const [state, formAction, isPending] = useActionState(
		createTenantAction,
		null,
	);
	const [step, setStep] = useState(1);

	// 1. Track the Step 1 data in state so it survives the unmount
	const [businessName, setBusinessName] = useState('');

	return (
		<div className="min-h-screen bg-slate-950 flex items-center justify-center p-6">
			<form
				action={formAction}
				className="max-w-xl w-full bg-slate-900 border border-slate-800 rounded-[2.5rem] p-12 shadow-2xl"
			>
				{/* 2. INVISIBLE PAYLOAD: This ensures Step 1 data is always sent to the Server Action */}
				<input type="hidden" name="businessName" value={businessName} />

				<AnimatePresence mode="wait">
					{step === 1 ? (
						<motion.div
							key="step1"
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
						>
							<h2 className="text-3xl font-black text-white mb-2 italic">
								The Foundation
							</h2>
							<p className="text-slate-400 mb-8">
								What is the legal name of your outfit?
							</p>

							<input
								// We remove the 'name' attribute here because the hidden input handles it
								required
								value={businessName}
								onChange={e => setBusinessName(e.target.value)}
								placeholder="e.g. Dunn Right Construction"
								className="w-full bg-slate-800 border border-slate-700 rounded-xl p-4 text-white focus:border-amber-500 outline-none transition-all"
							/>

							<button
								type="button"
								onClick={() => setStep(2)}
								disabled={!businessName} // Prevent moving forward if empty
								className="w-full mt-8 bg-slate-800 text-white font-black py-4 rounded-xl hover:bg-slate-700 transition-all disabled:opacity-50"
							>
								Next Step
							</button>
						</motion.div>
					) : (
						<motion.div
							key="step2"
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
						>
							<h2 className="text-3xl font-black text-white mb-2 italic">
								Your Digital Address
							</h2>
							<p className="text-slate-400 mb-8">
								Clients will access their vault here.
							</p>

							<div className="flex items-center bg-slate-800 border border-slate-700 rounded-xl p-4 focus-within:border-amber-500 transition-all mb-4">
								<input
									name="subdomain"
									required
									placeholder="your-name"
									className="bg-transparent text-white outline-none w-full text-right"
								/>
								<span className="text-slate-500 font-bold ml-2">
									.getblueprintos.com
								</span>
							</div>

							{state?.error && (
								<p className="text-red-400 text-sm font-bold mb-4">
									⚠️ {state.error}
								</p>
							)}

							<button
								type="submit"
								disabled={isPending}
								className="w-full bg-amber-500 text-slate-900 font-black py-4 rounded-xl hover:bg-amber-400 transition-all disabled:opacity-50"
							>
								{isPending
									? 'Building Your Platform...'
									: 'Launch My Blueprint'}
							</button>

							<button
								type="button"
								onClick={() => setStep(1)}
								className="w-full mt-4 text-slate-500 text-sm font-bold uppercase tracking-widest hover:text-white transition-colors"
							>
								Go Back
							</button>
						</motion.div>
					)}
				</AnimatePresence>
			</form>
		</div>
	);
}
