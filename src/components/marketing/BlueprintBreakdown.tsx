'use client';

import { motion, HTMLMotionProps } from 'framer-motion';
import { Globe, ShieldCheck, Zap, Hammer, Lock, BarChart3 } from 'lucide-react';

const fadeInUp = {
	initial: { opacity: 0, y: 20 },
	whileInView: { opacity: 1, y: 0 },
	viewport: { once: true },
	transition: { duration: 0.5, ease: 'easeOut' },
} as const;

export default function BlueprintBreakdown() {
	return (
		<section
			id="blueprint"
			className="py-32 bg-white dark:bg-slate-950 px-6 border-y border-slate-200 dark:border-white/5 relative overflow-hidden"
		>
			<div className="max-w-6xl mx-auto relative z-10">
				{/* HEADER */}
				<motion.div
					{...(fadeInUp as HTMLMotionProps<'div'>)}
					className="text-center mb-24"
				>
					<h2 className="text-4xl md:text-7xl font-black text-slate-900 dark:text-white mb-6 tracking-tighter leading-[0.95] uppercase italic">
						The Core <span className="text-amber-500">Infrastructure.</span>
					</h2>
					<p className="text-lg md:text-xl text-slate-500 dark:text-slate-400 max-w-2xl mx-auto font-medium">
						Four proprietary engines designed to eliminate the &ldquo;Admin
						Bleed&rdquo; and maximize your take-home profit.
					</p>
				</motion.div>

				{/* 2x2 GRID */}
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10">
					{/* 01: SITE ENGINE */}
					<motion.div
						{...(fadeInUp as HTMLMotionProps<'div'>)}
						className="group p-10 rounded-[2.5rem] bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-white/5 hover:border-indigo-500/30 transition-all duration-500"
					>
						<div className="flex items-start justify-between mb-8">
							<div className="w-14 h-14 bg-indigo-500/10 text-indigo-600 rounded-2xl flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform">
								<Globe className="w-7 h-7" />
							</div>
							<span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
								Phase 01
							</span>
						</div>
						<h3 className="text-3xl font-black text-slate-900 dark:text-white mb-4 tracking-tight italic">
							Site Engine™
						</h3>
						<p className="text-slate-500 dark:text-slate-400 mb-8 font-medium leading-relaxed">
							Your 24/7 sales machine. It ranks your services locally and
							captures high-intent leads before they call the competition.
						</p>
						<div className="flex items-center gap-2 text-xs font-black text-indigo-600 uppercase tracking-widest">
							<BarChart3 className="w-4 h-4" /> Inbound Dominance
						</div>
					</motion.div>

					{/* 02: COMM VAULT */}
					<motion.div
						{...(fadeInUp as HTMLMotionProps<'div'>)}
						className="group p-10 rounded-[2.5rem] bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-white/5 hover:border-amber-500/30 transition-all duration-500"
					>
						<div className="flex items-start justify-between mb-8">
							<div className="w-14 h-14 bg-amber-500/10 text-amber-600 rounded-2xl flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform">
								<Lock className="w-7 h-7" />
							</div>
							<span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
								Phase 02
							</span>
						</div>
						<h3 className="text-3xl font-black text-slate-900 dark:text-white mb-4 tracking-tight italic">
							Comm Vault™
						</h3>
						<p className="text-slate-500 dark:text-slate-400 mb-8 font-medium leading-relaxed">
							The central intelligence hub. Secure communication and bank-grade
							storage with &ldquo;Magic Link&rdquo; client access.
						</p>
						<div className="flex items-center gap-2 text-xs font-black text-amber-600 uppercase tracking-widest">
							<Zap className="w-3 h-3 fill-amber-600" /> 100% Data Isolation
						</div>
					</motion.div>

					{/* 03: SCOPELOCK */}
					<motion.div
						{...(fadeInUp as HTMLMotionProps<'div'>)}
						className="group p-10 rounded-[2.5rem] bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-white/5 hover:border-emerald-500/30 transition-all duration-500"
					>
						<div className="flex items-start justify-between mb-8">
							<div className="w-14 h-14 bg-emerald-500/10 text-emerald-600 rounded-2xl flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform">
								<ShieldCheck className="w-7 h-7" />
							</div>
							<span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
								Phase 03
							</span>
						</div>
						<h3 className="text-3xl font-black text-slate-900 dark:text-white mb-4 tracking-tight italic">
							ScopeLock™
						</h3>
						<p className="text-slate-500 dark:text-slate-400 mb-8 font-medium leading-relaxed">
							Kill the margin-bleed. Capture change orders on-site, get digital
							approval, and lock in your profit instantly.
						</p>
						<div className="flex items-center gap-2 text-xs font-black text-emerald-600 uppercase tracking-widest">
							<Zap className="w-3 h-3 fill-emerald-600" /> Zero Free Work
						</div>
					</motion.div>

					{/* 04: PAYRAIL */}
					<motion.div
						{...(fadeInUp as HTMLMotionProps<'div'>)}
						className="group p-10 rounded-[2.5rem] bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-white/5 hover:border-blue-500/30 transition-all duration-500"
					>
						<div className="flex items-start justify-between mb-8">
							<div className="w-14 h-14 bg-blue-500/10 text-blue-600 rounded-2xl flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform">
								<Hammer className="w-7 h-7" />
							</div>
							<span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
								Phase 04
							</span>
						</div>
						<h3 className="text-3xl font-black text-slate-900 dark:text-white mb-4 tracking-tight italic">
							PayRail™
						</h3>
						<p className="text-slate-500 dark:text-slate-400 mb-8 font-medium leading-relaxed">
							The fastest track to liquidity. SMS milestone billing that gets
							you paid before you even leave the job site.
						</p>
						<div className="flex items-center gap-2 text-xs font-black text-blue-600 uppercase tracking-widest">
							<Zap className="w-3 h-3 fill-blue-600" /> Instant Bank Payouts
						</div>
					</motion.div>
				</div>
			</div>
		</section>
	);
}
