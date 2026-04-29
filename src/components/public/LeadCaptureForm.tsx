'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { submitPublicLead as submitLead } from '@/app/actions';
import { Loader2, CheckCircle2, ArrowRight, ArrowLeft } from 'lucide-react';

interface LeadCaptureFormProps {
	tenantName: string;
	tenantId: string;
}

const PROJECT_TYPES = [
	'Kitchen Remodel',
	'Bathroom Remodel',
	'Whole Home',
	'Exterior / Deck',
];
const BUDGETS = ['Under $25k', '$25k - $50k', '$50k - $100k', '$100k+'];
const TIMELINES = ['ASAP', '1-3 Months', '3-6 Months', 'Just Exploring'];

export default function LeadCaptureForm({
	tenantName,
	tenantId,
}: LeadCaptureFormProps) {
	const [step, setStep] = useState(1);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [submitted, setSubmitted] = useState(false);

	const [formData, setFormData] = useState({
		name: '',
		email: '',
		phone: '',
		projectType: '',
		budget: '',
		timeline: '',
	});

	const handleNext = () => setStep(s => s + 1);
	const handleBack = () => setStep(s => s - 1);

	const updateField = (key: string, value: string) => {
		setFormData(prev => ({ ...prev, [key]: value }));
		if (['projectType', 'budget', 'timeline'].includes(key)) {
			setTimeout(handleNext, 300);
		}
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsSubmitting(true);

		try {
			// 1. Create the FormData object that the server action expects first
			const data = new FormData();
			data.append('name', formData.name);
			data.append('email', formData.email);
			data.append('phone', formData.phone);
			data.append('projectType', formData.projectType);
			data.append('budget', formData.budget);
			data.append('timeline', formData.timeline);

			/**
			 * 2. THE FIX:
			 * Your action is defined as: submitLead(formData: FormData, tenantId: string)
			 * You must pass 'data' first and 'tenantId' second.
			 */
			const result = await submitLead(data, tenantId);

			if (result && 'error' in result) {
				alert(result.error);
			} else {
				setSubmitted(true);
			}
		} catch (err) {
			console.error('Submission error:', err);
			alert('Something went wrong. Please try again.');
		} finally {
			setIsSubmitting(false);
		}
	};

	if (submitted) {
		return (
			<div className="bg-white p-12 rounded-[2.5rem] shadow-2xl border border-border text-center">
				<div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
					<CheckCircle2 className="w-10 h-10 text-emerald-600" />
				</div>
				<h3 className="text-3xl font-black text-foreground mb-2 italic uppercase">
					Success
				</h3>
				<p className="text-muted font-medium">
					We&apos;ve received your brief,{' '}
					{formData.name.split(' ')[0] || 'friend'}.
				</p>
			</div>
		);
	}

	return (
		<div className="bg-white p-8 md:p-10 rounded-[2.5rem] shadow-2xl border border-border min-h-[450px] flex flex-col justify-center relative">
			{/* Progress Bar */}
			{step < 5 && (
				<div className="absolute top-8 left-10 right-10 flex gap-2">
					{[1, 2, 3, 4].map(i => (
						<div
							key={i}
							className={`h-1 rounded-full flex-1 transition-all ${step >= i ? 'bg-amber-500' : 'bg-slate-100'}`}
						/>
					))}
				</div>
			)}

			<AnimatePresence mode="wait">
				{step === 1 && (
					<motion.div
						key="s1"
						initial={{ opacity: 0, x: 10 }}
						animate={{ opacity: 1, x: 0 }}
						exit={{ opacity: 0, x: -10 }}
						className="space-y-6"
					>
						<h2 className="text-2xl font-black text-foreground italic uppercase">
							Project Type
						</h2>
						<div className="grid grid-cols-1 gap-3">
							{PROJECT_TYPES.map(t => (
								<button
									key={t}
									onClick={() => updateField('projectType', t)}
									className={`p-4 rounded-2xl border-2 text-left font-bold transition-all ${formData.projectType === t ? 'border-slate-900 bg-slate-50 text-foreground' : 'border-border text-muted hover:border-slate-300'}`}
								>
									{t}
								</button>
							))}
						</div>
					</motion.div>
				)}

				{step === 2 && (
					<motion.div
						key="s2"
						initial={{ opacity: 0, x: 10 }}
						animate={{ opacity: 1, x: 0 }}
						exit={{ opacity: 0, x: -10 }}
						className="space-y-6"
					>
						<h2 className="text-2xl font-black text-foreground italic uppercase">
							Budget Range
						</h2>
						<div className="grid grid-cols-1 gap-3">
							{BUDGETS.map(b => (
								<button
									key={b}
									onClick={() => updateField('budget', b)}
									className={`p-4 rounded-2xl border-2 text-left font-bold transition-all ${formData.budget === b ? 'border-slate-900 bg-slate-50 text-foreground' : 'border-border text-muted hover:border-slate-300'}`}
								>
									{b}
								</button>
							))}
						</div>
					</motion.div>
				)}

				{step === 3 && (
					<motion.div
						key="s3"
						initial={{ opacity: 0, x: 10 }}
						animate={{ opacity: 1, x: 0 }}
						exit={{ opacity: 0, x: -10 }}
						className="space-y-6"
					>
						<h2 className="text-2xl font-black text-foreground italic uppercase">
							Timeline
						</h2>
						<div className="grid grid-cols-1 gap-3">
							{TIMELINES.map(tl => (
								<button
									key={tl}
									onClick={() => updateField('timeline', tl)}
									className={`p-4 rounded-2xl border-2 text-left font-bold transition-all ${formData.timeline === tl ? 'border-slate-900 bg-slate-50 text-foreground' : 'border-border text-muted hover:border-slate-300'}`}
								>
									{tl}
								</button>
							))}
						</div>
					</motion.div>
				)}

				{step === 4 && (
					<motion.form key="s4" onSubmit={handleSubmit} className="space-y-4">
						<h2 className="text-2xl font-black text-foreground italic uppercase mb-6">
							Contact Info
						</h2>
						<input
							required
							placeholder="Full Name"
							value={formData.name}
							onChange={e => setFormData({ ...formData, name: e.target.value })}
							className="w-full p-4 bg-slate-50 border border-border rounded-2xl text-foreground font-bold outline-none focus:ring-2 focus:ring-amber-500"
						/>
						<input
							required
							type="email"
							placeholder="Email"
							value={formData.email}
							onChange={e =>
								setFormData({ ...formData, email: e.target.value })
							}
							className="w-full p-4 bg-slate-50 border border-border rounded-2xl text-foreground font-bold outline-none focus:ring-2 focus:ring-amber-500"
						/>
						<input
							required
							type="tel"
							placeholder="Phone"
							value={formData.phone}
							onChange={e =>
								setFormData({ ...formData, phone: e.target.value })
							}
							className="w-full p-4 bg-slate-50 border border-border rounded-2xl text-foreground font-bold outline-none focus:ring-2 focus:ring-amber-500"
						/>

						<button
							type="submit"
							disabled={isSubmitting}
							className="w-full bg-slate-900 text-white font-black py-5 rounded-2xl shadow-xl flex items-center justify-center gap-2 mt-4 hover:bg-slate-800 transition-all active:scale-[0.98]"
						>
							{isSubmitting ? (
								<Loader2 className="animate-spin text-amber-500" />
							) : (
								<>
									Submit Brief <ArrowRight size={20} />
								</>
							)}
						</button>
					</motion.form>
				)}
			</AnimatePresence>

			{step > 1 && !submitted && (
				<button
					type="button"
					onClick={handleBack}
					className="absolute bottom-6 left-10 text-muted font-bold text-xs uppercase tracking-widest flex items-center gap-1 hover:text-foreground transition-colors"
				>
					<ArrowLeft size={14} /> Back
				</button>
			)}
		</div>
	);
}
