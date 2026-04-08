'use client';

import { useActionState, useState } from 'react';
import { createTenantAction } from '@/app/actions/tenant';
import { motion, AnimatePresence } from 'framer-motion';

export type FormState = {
	error: string;
	success: boolean;
};

const initialState: FormState = {
	error: '',
	success: false,
};

export default function OnboardingPage() {
	const [state, formAction, isPending] = useActionState<FormState, FormData>(
		createTenantAction,
		initialState,
	);

	const [step, setStep] = useState(1);
	const [businessName, setBusinessName] = useState('');

	return (
		<div className="min-h-screen bg-slate-950 flex items-center justify-center p-6 text-white selection:bg-amber-500/30">
			<form
				action={formAction}
				className="max-w-xl w-full bg-slate-900 border border-slate-800 rounded-[2.5rem] p-12 shadow-2xl relative overflow-hidden"
			>
				{/* CORE FIX: This hidden input lives outside the animation 
                    logic so it's ALWAYS included in the final FormData.
                */}
				<input type="hidden" name="businessName" value={businessName} />

				<AnimatePresence mode="wait">
					{step === 1 ? (
						<motion.div
							key="step1"
							initial={{ opacity: 0, x: -20 }}
							animate={{ opacity: 1, x: 0 }}
							exit={{ opacity: 0, x: -20 }}
							transition={{ duration: 0.3 }}
						>
							<div className="mb-8">
								<h2 className="text-4xl font-black text-white mb-2 italic tracking-tight uppercase">
									The Foundation
								</h2>
								<p className="text-slate-400 font-medium">
									What is the legal name of your outfit?
								</p>
							</div>

							<input
								required
								autoFocus
								value={businessName}
								onChange={e => setBusinessName(e.target.value)}
								placeholder="e.g. TestDunn2"
								className="w-full bg-slate-800/50 border border-slate-700 rounded-2xl p-4 text-white focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none transition-all placeholder:text-slate-600 text-lg"
							/>

							<button
								type="button"
								onClick={() => setStep(2)}
								disabled={!businessName}
								className="w-full mt-8 bg-white text-slate-950 font-black py-4 rounded-2xl hover:bg-slate-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]"
							>
								Next Step
							</button>
						</motion.div>
					) : (
						<motion.div
							key="step2"
							initial={{ opacity: 0, x: 20 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ duration: 0.3 }}
						>
							<div className="mb-8">
								<h2 className="text-4xl font-black text-white mb-2 italic tracking-tight uppercase">
									Your Address
								</h2>
								<p className="text-slate-400 font-medium">
									Clients will access their vault here.
								</p>
							</div>

							<div className="flex items-center bg-slate-800/50 border border-slate-700 rounded-2xl p-4 focus-within:border-amber-500 focus-within:ring-1 focus-within:ring-amber-500 transition-all mb-4">
								<input
									name="subdomain"
									required
									autoFocus
									placeholder="your-name"
									className="bg-transparent text-white outline-none w-full text-right placeholder:text-slate-600 font-bold text-lg"
								/>
								<span className="text-slate-500 font-black ml-2 tracking-tight">
									.getBuildRail.com
								</span>
							</div>

							{state?.error && (
								<div className="bg-red-500/10 border border-red-500/20 rounded-xl p-3 mb-6">
									<p className="text-red-400 text-xs font-bold text-center italic">
										⚠️ {state.error}
									</p>
								</div>
							)}

							<button
								type="submit"
								disabled={isPending}
								className="w-full bg-amber-500 text-slate-950 font-black py-4 rounded-2xl hover:bg-amber-400 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-amber-500/10 active:scale-[0.98]"
							>
								{isPending ? 'Provisioning...' : 'Launch My Build'}
							</button>

							<button
								type="button"
								onClick={() => setStep(1)}
								className="w-full mt-6 text-slate-500 text-xs font-black uppercase tracking-widest hover:text-white transition-colors"
							>
								← Change Name
							</button>
						</motion.div>
					)}
				</AnimatePresence>
			</form>
		</div>
	);
}
