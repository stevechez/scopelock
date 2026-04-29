'use client';

import { motion } from 'framer-motion';
import {
	Globe,
	Lock,
	ShieldCheck,
	Zap,
	Smartphone,
	TrendingUp,
	MousePointer2,
	ArrowRight,
} from 'lucide-react';

const fadeInUp = {
	initial: { opacity: 0, y: 20 },
	whileInView: { opacity: 1, y: 0 },
	viewport: { once: true },
	transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
} as const;

const modules = [
	{
		phase: 'Phase 01: Capture',
		title: 'Site Engine™',
		desc: 'A 24/7 sales machine that ranks your services locally and forces homeowners to take action.',
		icon: <Globe className="w-6 h-6" />,
		color: 'text-indigo-500',
		bg: 'bg-indigo-500/10',
		border: 'hover:border-indigo-500/30',
		glow: 'group-hover:shadow-indigo-500/10',
		tag: 'Inbound Dominance',
	},
	{
		phase: 'Phase 02: Close',
		title: 'BidForge™',
		desc: 'Professional 3-tier proposals designed to anchor prices high and close deals without the "Thinking about it" delays.',
		icon: <MousePointer2 className="w-6 h-6" />,
		color: 'text-blue-500',
		bg: 'bg-blue-500/10',
		border: 'hover:border-blue-500/30',
		glow: 'group-hover:shadow-blue-500/10',
		tag: 'Higher Conversions',
	},
	{
		phase: 'Phase 03: Centralize',
		title: 'Comm Vault™',
		desc: 'The central hub for all client docs and comms. Secure, professional, and accessed via one-click magic links.',
		icon: <Lock className="w-6 h-6" />,
		color: 'text-amber-500',
		bg: 'bg-amber-500/10',
		border: 'hover:border-amber-500/30',
		glow: 'group-hover:shadow-amber-500/10',
		tag: 'Zero Data Leak',
	},
	{
		phase: 'Phase 04: Protect',
		title: 'ScopeLock™',
		desc: 'Captures "while you’re here" change orders instantly. Gets digital approval and locks in profit before the work starts.',
		icon: <ShieldCheck className="w-6 h-6" />,
		color: 'text-emerald-500',
		bg: 'bg-emerald-500/10',
		border: 'hover:border-emerald-500/30',
		glow: 'group-hover:shadow-emerald-500/10',
		tag: 'Margin Protection',
	},
	{
		phase: 'Phase 05: Liquidate',
		title: 'PayRail™',
		desc: 'SMS milestone billing that gets you paid in 60 seconds. Stop chasing checks and start moving at the speed of Stripe.',
		icon: <Smartphone className="w-6 h-6" />,
		color: 'text-rose-500',
		bg: 'bg-rose-500/10',
		border: 'hover:border-rose-500/30',
		glow: 'group-hover:shadow-rose-500/10',
		tag: 'Instant Cash Flow',
	},
];

export default function ProductEcosystem() {
	return (
		<section
			id="ecosystem"
			className="py-32 light:bg-white dark:bg-slate-950 px-6 transition-colors duration-500"
		>
			<div className="max-w-7xl mx-auto">
				{/* HEADLINE SECTION */}
				<motion.div
					{...fadeInUp}
					className="text-center max-w-4xl mx-auto mb-24"
				>
					<h2 className="text-4xl md:text-7xl font-black light:text-slate-900 dark:text-white mb-8 tracking-tighter uppercase italic leading-[0.9]">
						Lead to Cash <br />
						<span className="text-amber-500 dark:text-white underline decoration-amber-500/20 underline-offset-8">
							Without the Friction.
						</span>
					</h2>
					<p className="text-xl light:text-slate-500 dark:text-slate-400 font-medium max-w-2xl mx-auto">
						Five proprietary engines built into one seamless OS. Eliminate the
						admin bleed and maximize your take-home profit.
					</p>
				</motion.div>

				{/* THE ECOSYSTEM GRID */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{modules.map((mod, idx) => (
						<motion.div
							key={mod.title}
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ delay: idx * 0.1 }}
							className="group relative flex flex-col h-full"
						>
							<div
								className={`relative flex-1 p-8 rounded-[2.5rem] bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-white/5 ${mod.border} transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-2xl ${mod.glow}`}
							>
								{/* Header: Phase & Icon */}
								<div className="flex justify-between items-start mb-8">
									<div
										className={`w-14 h-14 ${mod.bg} ${mod.color} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-500`}
									>
										{mod.icon}
									</div>
									<span className="text-[10px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-[0.2em]">
										{mod.phase}
									</span>
								</div>

								{/* Content */}
								<h3 className="text-2xl font-black text-slate-900 dark:text-white mb-4 italic tracking-tight">
									{mod.title}
								</h3>
								<p className="text-slate-600 dark:text-slate-400 font-medium leading-relaxed mb-8">
									{mod.desc}
								</p>

								{/* Bottom Stat/Tag */}
								<div
									className={`flex items-center gap-2 text-[10px] font-black uppercase tracking-widest ${mod.color}`}
								>
									<TrendingUp className="w-3 h-3" />
									{mod.tag}
								</div>
							</div>
						</motion.div>
					))}

					{/* CALL TO ACTION CARD */}
					<motion.div
						initial={{ opacity: 0, scale: 0.95 }}
						whileInView={{ opacity: 1, scale: 1 }}
						viewport={{ once: true }}
						className="group relative flex flex-col h-full lg:col-span-1"
					>
						<div className="relative flex-1 p-8 rounded-[2.5rem] bg-slate-900 dark:bg-amber-500 flex flex-col justify-center items-center text-center transition-all duration-500 border border-transparent hover:scale-[1.02]">
							<h3 className="text-3xl font-black text-white dark:text-slate-900 mb-6 italic leading-tight">
								Ready to <br /> Command?
							</h3>
							<button className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white px-8 py-4 rounded-xl font-black uppercase text-xs tracking-widest shadow-xl flex items-center gap-2 hover:gap-4 transition-all">
								Deploy BUILDRAIL <ArrowRight className="w-4 h-4" />
							</button>
						</div>
					</motion.div>
				</div>
			</div>
		</section>
	);
}
