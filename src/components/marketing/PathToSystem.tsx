'use client';

import { motion } from 'framer-motion';
import { DollarSign, Zap, Rocket, ArrowRight } from 'lucide-react';

const steps = [
	{
		id: '01',
		title: 'Capture Every Dollar',
		desc: 'Lock in change orders instantly and eliminate thousands in missed revenue on every job.',
		icon: <DollarSign className="w-6 h-6" />,
		color: 'text-indigo-500',
		bg: 'bg-indigo-500/10',
	},
	{
		id: '02',
		title: 'Get Paid On-Site',
		desc: 'Send milestone payment links via SMS and eliminate Net-30 delays forever.',
		icon: <Zap className="w-6 h-6" />,
		color: 'text-amber-500',
		bg: 'bg-amber-500/10',
	},
	{
		id: '03',
		title: 'Run Jobs on Autopilot',
		desc: 'Track progress, reduce client friction, and scale your margins without adding overhead.',
		icon: <Rocket className="w-6 h-6" />,
		color: 'text-emerald-500',
		bg: 'bg-emerald-500/10',
	},
];

export default function PathToSystem() {
	return (
		<section className="py-24 light:bg-white dark:bg-slate-950 px-6 transition-colors duration-500">
			<div className="max-w-7xl mx-auto">
				{/* HEADLINE SECTION */}
				<div className="text-center mb-20">
					<motion.h2
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						className="text-4xl md:text-6xl font-black dark:text-white light:text-slate-900 dark:text-white mb-6 tracking-tight"
					>
						From Chaos{' '}
						<span className="text-slate-300 dark:text-slate-700">→</span>{' '}
						Control{' '}
						<span className="text-slate-300 dark:text-slate-700">→</span> Profit
					</motion.h2>

					<p className="text-xl light:text-slate-500 dark:text-white max-w-2xl mx-auto font-medium">
						BuildRail installs the systems that eliminate free work, accelerate
						cash flow, and make every job predictable.
					</p>
				</div>

				{/* THE GRID */}
				<div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
					{steps.map((step, idx) => (
						<motion.div
							key={step.id}
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ delay: idx * 0.1 }}
							className="group relative"
						>
							{/* PRE-HOVER ACCENT (The "New" Line) */}
							{idx !== steps.length - 1 && (
								<div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-[2px] bg-slate-100 dark:bg-slate-800 z-0" />
							)}

							<div className="relative z-10 h-full p-8 md:p-10 rounded-[2.5rem] bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-white/5 hover:border-amber-500/30 transition-all duration-500 group-hover:shadow-2xl group-hover:shadow-amber-500/10 group-hover:-translate-y-2">
								{/* ICON & STEP # */}
								<div className="flex justify-between items-start mb-8">
									<div
										className={`w-14 h-14 ${step.bg} ${step.color} rounded-2xl flex items-center justify-center transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3`}
									>
										{step.icon}
									</div>
									<span className="text-4xl font-black text-slate-200 dark:text-slate-800 select-none">
										{step.id}
									</span>
								</div>

								<h3 className="text-2xl font-black text-slate-900 dark:text-white mb-4 group-hover:text-amber-500 transition-colors">
									{step.title}
								</h3>

								<p className="text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
									{step.desc}
								</p>

								{/* HOVER ARROW */}
								<div className="mt-8 flex items-center gap-2 text-amber-600 dark:text-amber-500 font-bold text-sm opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-[-10px] group-hover:translate-x-0 duration-300">
									Learn the system <ArrowRight className="w-4 h-4" />
								</div>
							</div>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	);
}
