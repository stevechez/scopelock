'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
	CheckCircle2,
	Circle,
	Clock,
	ArrowRight,
	Sparkles,
} from 'lucide-react';
import Link from 'next/link';
import { ONBOARDING_MILESTONES } from '@/config/onboarding';

export default function OnboardingConcierge() {
	const [completed, setCompleted] = useState<string[]>([]);

	const toggleMilestone = (id: string) => {
		setCompleted(prev =>
			prev.includes(id) ? prev.filter(m => m !== id) : [...prev, id],
		);
	};

	const progress = Math.round(
		(completed.length / ONBOARDING_MILESTONES.length) * 100,
	);

	return (
		<div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
			{/* Header / Progress Bar */}
			<div className="p-8 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30">
				<div className="flex items-center justify-between mb-6">
					<div className="flex items-center gap-3">
						<div className="p-2 bg-amber-500 rounded-lg text-white">
							<Sparkles className="w-5 h-5" />
						</div>
						<div>
							<h2 className="text-xl font-black text-slate-900 dark:text-white">
								Quick Start Guide
							</h2>
							<p className="text-sm text-slate-500 font-medium">
								Complete these to launch your business.
							</p>
						</div>
					</div>
					<span className="text-2xl font-black text-amber-500">
						{progress}%
					</span>
				</div>

				{/* Visual Progress Bar */}
				<div className="h-2 w-full bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
					<motion.div
						initial={{ width: 0 }}
						animate={{ width: `${progress}%` }}
						className="h-full bg-amber-500"
					/>
				</div>
			</div>

			{/* Milestone List */}
			<div className="divide-y divide-slate-100 dark:divide-slate-800">
				{ONBOARDING_MILESTONES.map(milestone => {
					const isDone = completed.includes(milestone.id);
					return (
						<div
							key={milestone.id}
							className={`group flex items-start gap-4 p-6 transition-colors ${isDone ? 'bg-slate-50/50 dark:bg-slate-800/20' : 'hover:bg-slate-50 dark:hover:bg-slate-800/50'}`}
						>
							<button
								onClick={() => toggleMilestone(milestone.id)}
								className="mt-1 transition-transform hover:scale-110"
							>
								{isDone ? (
									<CheckCircle2 className="w-6 h-6 text-emerald-500 fill-emerald-50" />
								) : (
									<Circle className="w-6 h-6 text-slate-300 dark:text-slate-600" />
								)}
							</button>

							<div className="flex-1">
								<div className="flex items-center justify-between mb-1">
									<h3
										className={`font-bold transition-all ${isDone ? 'text-slate-400 line-through' : 'text-slate-900 dark:text-white'}`}
									>
										{milestone.title}
									</h3>
									<span className="flex items-center gap-1 text-[10px] font-black uppercase tracking-wider text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded">
										<Clock className="w-3 h-3" /> {milestone.estimatedTime}
									</span>
								</div>
								<p
									className={`text-sm mb-4 ${isDone ? 'text-slate-400' : 'text-slate-500'}`}
								>
									{milestone.description}
								</p>

								{!isDone && (
									<Link
										href={`/help/${milestone.slug}`}
										className="inline-flex items-center gap-2 text-sm font-bold text-amber-500 hover:text-amber-600 transition-colors"
									>
										Read Guide <ArrowRight className="w-4 h-4" />
									</Link>
								)}
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
}
