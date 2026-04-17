'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { submitPublicLead } from '@/app/actions';

export default function EliteIntake({ tenantId }: { tenantId: string }) {
	const [step, setStep] = useState(1);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [isSuccess, setIsSuccess] = useState(false);

	// 📍 Track values from steps that get unmounted
	const [formDataState, setFormDataState] = useState({
		project_type: 'Custom Estate Build',
		budget: '$50k - $100k',
		timeline: 'Immediate',
	});

	const nextStep = () => setStep(s => s + 1);

	const updateField = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setFormDataState(prev => ({ ...prev, [e.target.name]: e.target.value }));
	};

	async function clientHandleSubmit(formData: FormData) {
		setIsSubmitting(true);

		// 📍 Manually append the data from the unmounted steps
		formData.append('tenant_id', tenantId);
		formData.append('project_type', formDataState.project_type);
		formData.append('budget', formDataState.budget);
		formData.append('timeline', formDataState.timeline);
	}

	if (isSuccess) {
		return (
			<motion.div
				initial={{ opacity: 0, scale: 0.9 }}
				animate={{ opacity: 1, scale: 1 }}
				className="text-center p-12 bg-zinc-900 rounded-[3rem] border border-amber-500/20"
			>
				<h2 className="text-3xl font-black italic text-amber-500 mb-4">
					Application Received
				</h2>
				<p className="text-zinc-400 font-medium">
					Your project has been queued for review.
				</p>
			</motion.div>
		);
	}

	return (
		<form action={clientHandleSubmit}>
			<AnimatePresence mode="wait">
				{/* STEP 1: SCOPE */}
				{step === 1 && (
					<motion.div
						initial={{ opacity: 0, x: 20 }}
						animate={{ opacity: 1, x: 0 }}
						exit={{ opacity: 0, x: -20 }}
						key="step1"
						className="space-y-6"
					>
						<h2 className="text-2xl font-black italic uppercase tracking-tighter">
							01. Project Scope
						</h2>
						<select
							name="project_type"
							value={formDataState.project_type}
							onChange={updateField}
							className="w-full bg-black border border-white/10 rounded-2xl p-4 text-white outline-none focus:border-amber-500"
						>
							<option value="Custom Estate Build">Custom Estate Build</option>
							<option value="Full Gut Remodel">Full Gut Remodel</option>
							<option value="Kitchen & Master Suite Vault">
								Kitchen & Master Suite Vault
							</option>
							<option value="High-End Addition">High-End Addition</option>
						</select>
						<button
							type="button"
							onClick={nextStep}
							className="w-full bg-white text-black font-black py-4 rounded-2xl"
						>
							Next: Investment
						</button>
					</motion.div>
				)}

				{/* STEP 2: LOGISTICS */}
				{step === 2 && (
					<motion.div
						initial={{ opacity: 0, x: 20 }}
						animate={{ opacity: 1, x: 0 }}
						exit={{ opacity: 0, x: -20 }}
						key="step2"
						className="space-y-6"
					>
						<h2 className="text-2xl font-black italic uppercase tracking-tighter">
							02. Logistics
						</h2>
						<select
							name="budget"
							value={formDataState.budget}
							onChange={updateField}
							className="w-full bg-black border border-white/10 rounded-2xl p-4 text-white"
						>
							<option value="$50k - $100k">$50k - $100k</option>
							<option value="$100k - $250k">$100k - $250k</option>
							<option value="$250k - $500k">$250k - $500k</option>
							<option value="$500k+">$500k+</option>
						</select>
						<select
							name="timeline"
							value={formDataState.timeline}
							onChange={updateField}
							className="w-full bg-black border border-white/10 rounded-2xl p-4 text-white mt-4"
						>
							<option value="Immediate">Immediate (Ready to sign)</option>
							<option value="3-6 Months">3 - 6 Months Out</option>
							<option value="Planning">Planning Stage (6+ Months)</option>
						</select>
						<button
							type="button"
							onClick={nextStep}
							className="w-full bg-white text-black font-black py-4 rounded-2xl"
						>
							Final Step: Contact
						</button>
					</motion.div>
				)}

				{/* STEP 3: CONTACT */}
				{step === 3 && (
					<motion.div
						initial={{ opacity: 0, x: 20 }}
						animate={{ opacity: 1, x: 0 }}
						exit={{ opacity: 0, x: -20 }}
						key="step3"
						className="space-y-6"
					>
						<h2 className="text-2xl font-black italic uppercase tracking-tighter">
							03. Contact
						</h2>
						<input
							name="client_name"
							required
							placeholder="Full Name"
							className="w-full bg-black border border-white/10 rounded-2xl p-4 text-white"
						/>
						<input
							name="client_email"
							type="email"
							required
							placeholder="Email Address"
							className="w-full bg-black border border-white/10 rounded-2xl p-4 text-white"
						/>
						<input
							name="client_phone"
							type="tel"
							required
							placeholder="Phone Number"
							className="w-full bg-black border border-white/10 rounded-2xl p-4 text-white"
						/>
						<button
							disabled={isSubmitting}
							className="w-full bg-amber-500 text-black font-black py-4 rounded-2xl disabled:opacity-50"
						>
							{isSubmitting ? 'PROCESSING...' : 'SUBMIT PROJECT REQUEST'}
						</button>
					</motion.div>
				)}
			</AnimatePresence>
		</form>
	);
}
