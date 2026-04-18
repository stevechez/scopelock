'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
	ArrowRight,
	ArrowLeft,
	CheckCircle2,
	Zap,
	Loader2,
} from 'lucide-react';
import Link from 'next/link';
import { submitLead } from '@/app/actions';

// Qualification Data
const PROJECT_TYPES = [
	'Kitchen Remodel',
	'Bathroom Remodel',
	'Whole Home',
	'Exterior / Deck',
];
const BUDGETS = ['Under $25k', '$25k - $50k', '$50k - $100k', '$100k+'];
const TIMELINES = ['ASAP', '1-3 Months', '3-6 Months', 'Just Exploring'];

export default function LeadFilterPage() {
	const [step, setStep] = useState(1);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [formData, setFormData] = useState({
		projectType: '',
		budget: '',
		timeline: '',
		name: '',
		email: '',
		phone: '',
	});

	const handleNext = () => setStep(s => s + 1);
	const handleBack = () => setStep(s => s - 1);

	const updateForm = (key: string, value: string) => {
		setFormData({ ...formData, [key]: value });
		if (['projectType', 'budget', 'timeline'].includes(key)) {
			setTimeout(handleNext, 300);
		}
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsSubmitting(true);

		try {
			const currentTenantId = 'default-tenant-id';

			const serverFormData = new FormData();
			serverFormData.append('tenantId', currentTenantId);
			serverFormData.append('projectType', formData.projectType);
			serverFormData.append('budget', formData.budget);
			serverFormData.append('timeline', formData.timeline);

			if (formData.name) serverFormData.append('name', formData.name);
			if (formData.email) serverFormData.append('email', formData.email);
			if (formData.phone) serverFormData.append('phone', formData.phone);

			// 📍 FIX applied here:
			const result = await submitLead(serverFormData, currentTenantId);

			if (result && 'error' in result) {
				alert(`Error: ${result.error}`);
				setIsSubmitting(false);
			} else {
				setStep(5);
			}
		} catch (error) {
			console.error('Submission failed:', error);
			alert('Failed to submit application. Please try again.');
			setIsSubmitting(false);
		}
	};

	return (
		<div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center pt-20 px-6">
			{/* Header */}
			<div className="w-full max-w-2xl flex justify-between items-center mb-16">
				<Link
					href="/"
					className="flex items-center gap-2 opacity-50 hover:opacity-100 transition-opacity"
				>
					<div className="w-6 h-6 bg-slate-900 rounded flex items-center justify-center">
						<Zap size={12} className="text-white fill-white" />
					</div>
					<span className="font-black text-sm tracking-tight italic">
						BUILD<span className="font-medium not-italic">RAIL</span>
					</span>
				</Link>
				<div className="flex gap-1">
					{[1, 2, 3, 4].map(i => (
						<div
							key={i}
							className={`h-1.5 rounded-full transition-all duration-500 ${step >= i ? 'w-6 bg-slate-900' : 'w-2 bg-slate-200'}`}
						/>
					))}
				</div>
			</div>

			{/* Form Container */}
			<div className="w-full max-w-2xl bg-white rounded-[2.5rem] shadow-xl border border-slate-100 overflow-hidden relative min-h-[400px] p-8 md:p-12">
				<AnimatePresence mode="wait">
					{/* STEP 1: PROJECT TYPE */}
					{step === 1 && (
						<motion.div
							key="step1"
							initial={{ opacity: 0, x: 20 }}
							animate={{ opacity: 1, x: 0 }}
							exit={{ opacity: 0, x: -20 }}
							className="space-y-6"
						>
							<h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest">
								Question 1 of 4
							</h2>
							<h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
								What type of project are you planning?
							</h1>
							<div className="grid sm:grid-cols-2 gap-4 mt-8">
								{PROJECT_TYPES.map(type => (
									<button
										key={type}
										onClick={() => updateForm('projectType', type)}
										className={`p-6 rounded-2xl border-2 text-left transition-all active:scale-95 ${formData.projectType === type ? 'border-slate-900 bg-slate-50' : 'border-slate-100 hover:border-slate-300'}`}
									>
										<span className="font-bold text-slate-900">{type}</span>
									</button>
								))}
							</div>
						</motion.div>
					)}

					{/* STEP 2: BUDGET */}
					{step === 2 && (
						<motion.div
							key="step2"
							initial={{ opacity: 0, x: 20 }}
							animate={{ opacity: 1, x: 0 }}
							exit={{ opacity: 0, x: -20 }}
							className="space-y-6"
						>
							<h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest">
								Question 2 of 4
							</h2>
							<h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
								What is your anticipated budget?
							</h1>
							<div className="grid sm:grid-cols-2 gap-4 mt-8">
								{BUDGETS.map(budget => (
									<button
										key={budget}
										onClick={() => updateForm('budget', budget)}
										className={`p-6 rounded-2xl border-2 text-left transition-all active:scale-95 ${formData.budget === budget ? 'border-slate-900 bg-slate-50' : 'border-slate-100 hover:border-slate-300'}`}
									>
										<span className="font-bold text-slate-900">{budget}</span>
									</button>
								))}
							</div>
						</motion.div>
					)}

					{/* STEP 3: TIMELINE */}
					{step === 3 && (
						<motion.div
							key="step3"
							initial={{ opacity: 0, x: 20 }}
							animate={{ opacity: 1, x: 0 }}
							exit={{ opacity: 0, x: -20 }}
							className="space-y-6"
						>
							<h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest">
								Question 3 of 4
							</h2>
							<h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
								When do you want to break ground?
							</h1>
							<div className="grid sm:grid-cols-2 gap-4 mt-8">
								{TIMELINES.map(timeline => (
									<button
										key={timeline}
										onClick={() => updateForm('timeline', timeline)}
										className={`p-6 rounded-2xl border-2 text-left transition-all active:scale-95 ${formData.timeline === timeline ? 'border-slate-900 bg-slate-50' : 'border-slate-100 hover:border-slate-300'}`}
									>
										<span className="font-bold text-slate-900">{timeline}</span>
									</button>
								))}
							</div>
						</motion.div>
					)}

					{/* STEP 4: CONTACT & SUBMIT */}
					{step === 4 && (
						<motion.form
							key="step4"
							initial={{ opacity: 0, x: 20 }}
							animate={{ opacity: 1, x: 0 }}
							exit={{ opacity: 0, x: -20 }}
							onSubmit={handleSubmit}
							className="space-y-6"
						>
							<h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest">
								Final Step
							</h2>
							<h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
								Where should we send your project brief?
							</h1>

							<div className="space-y-4 mt-8">
								<div>
									<label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
										Full Name
									</label>
									<input
										required
										type="text"
										value={formData.name}
										onChange={e =>
											setFormData({ ...formData, name: e.target.value })
										}
										className="w-full bg-slate-50 text-black border border-slate-100 rounded-2xl p-4 text-lg mt-1 focus:ring-2 focus:ring-slate-900 outline-none transition-all"
									/>
								</div>
								<div>
									<label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
										Email Address
									</label>
									<input
										required
										type="email"
										value={formData.email}
										onChange={e =>
											setFormData({ ...formData, email: e.target.value })
										}
										className="w-full bg-slate-50 text-black border border-slate-100 rounded-2xl p-4 text-lg mt-1 focus:ring-2 focus:ring-slate-900 outline-none transition-all"
									/>
								</div>
								<div>
									<label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
										Mobile Phone (For Text Updates)
									</label>
									<input
										required
										type="tel"
										value={formData.phone}
										onChange={e =>
											setFormData({ ...formData, phone: e.target.value })
										}
										className="w-full bg-slate-50 text-black border border-slate-100 rounded-2xl p-4 text-lg mt-1 focus:ring-2 focus:ring-slate-900 outline-none transition-all"
									/>
								</div>
							</div>

							<button
								type="submit"
								disabled={isSubmitting}
								className="w-full bg-emerald-500 hover:bg-emerald-600 disabled:bg-emerald-400 text-white font-black text-xl py-5 rounded-2xl shadow-xl shadow-emerald-200 flex items-center justify-center gap-3 mt-8 active:scale-95 transition-all"
							>
								{isSubmitting ? (
									<>
										Processing... <Loader2 size={20} className="animate-spin" />
									</>
								) : (
									<>
										Submit Application <ArrowRight size={20} />
									</>
								)}
							</button>
						</motion.form>
					)}

					{/* SUCCESS SCREEN */}
					{step === 5 && (
						<motion.div
							key="success"
							initial={{ opacity: 0, scale: 0.9 }}
							animate={{ opacity: 1, scale: 1 }}
							className="flex flex-col items-center text-center py-12"
						>
							<div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mb-6">
								<CheckCircle2 size={40} className="text-emerald-600" />
							</div>
							<h1 className="text-3xl font-black text-slate-900 tracking-tight mb-4">
								Application Received
							</h1>
							<p className="text-slate-500 font-medium max-w-sm leading-relaxed mb-8">
								Our team is reviewing your project details. We will text you
								shortly to discuss the next steps.
							</p>
							<Link
								href="/"
								className="text-slate-400 font-bold text-sm uppercase tracking-widest hover:text-slate-900 transition-colors"
							>
								Return Home
							</Link>
						</motion.div>
					)}
				</AnimatePresence>

				{/* Back Button (Hidden on Step 1 and Success) */}
				{step > 1 && step < 5 && (
					<button
						onClick={handleBack}
						disabled={isSubmitting}
						className="absolute bottom-8 left-8 text-slate-400 hover:text-slate-900 disabled:opacity-50 flex items-center gap-1 text-xs font-bold uppercase tracking-widest transition-colors"
					>
						<ArrowLeft size={14} /> Back
					</button>
				)}
			</div>
		</div>
	);
}
