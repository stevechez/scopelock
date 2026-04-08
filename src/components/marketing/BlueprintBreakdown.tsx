'use client';

import Link from 'next/link';
import { motion, HTMLMotionProps } from 'framer-motion';
import {
	Globe,
	ShieldCheck,
	Zap,
	Hammer,
	ArrowRight,
	Sparkles,
} from 'lucide-react';

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
			className="py-32 bg-slate-50 dark:bg-slate-950 px-6 border-y border-slate-200 dark:border-white/5 relative overflow-hidden"
		>
			<div className="max-w-6xl mx-auto relative z-10">
				{/* HEADER */}
				<motion.div
					{...(fadeInUp as HTMLMotionProps<'div'>)}
					className="text-center mb-20"
				>
					<h2 className="text-4xl md:text-7xl font-black text-slate-900 dark:text-white mb-6 tracking-tighter leading-[0.95]">
						A System Engineered <br />
						<span className="text-amber-500 italic">To Print Profit.</span>
					</h2>
					<p className="text-lg md:text-xl text-slate-500 dark:text-slate-400 max-w-2xl mx-auto font-medium">
						BuildRail isn&apos;t just tools. It&apos;s a closed-loop system that
						eliminates free work and accelerates your cash flow.
					</p>
				</motion.div>

				{/* GRID */}
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
					{/* FEATURED: SITE ENGINE */}
					<motion.div
						{...(fadeInUp as HTMLMotionProps<'div'>)}
						className="md:col-span-2 group relative overflow-hidden rounded-[2.5rem] bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 shadow-sm hover:shadow-2xl transition-all duration-500"
					>
						{/* Abstract Rail Pattern Background */}
						<div className="absolute top-0 right-0 w-1/2 h-full opacity-[0.03] dark:opacity-[0.05] pointer-events-none uppercase font-black text-8xl leading-none select-none p-10 break-all">
							BUILDRAIL ENGINE BUILDRAIL ENGINE
						</div>

						<div className="p-10 relative z-10">
							<div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
								<div className="flex items-center gap-5">
									<div className="w-16 h-16 bg-indigo-500/10 text-indigo-600 rounded-2xl flex items-center justify-center shadow-inner">
										<Globe className="w-8 h-8" />
									</div>
									<div>
										<h3 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
											Site Engine™
										</h3>
										<p className="text-indigo-600 dark:text-indigo-400 font-bold text-xs uppercase tracking-widest">
											Inbound Dominance
										</p>
									</div>
								</div>
								<div className="hidden md:block px-4 py-2 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700 text-[10px] font-black text-slate-400 uppercase tracking-widest">
									Status: High-Performance
								</div>
							</div>

							<div className="grid md:grid-cols-2 gap-12 items-end">
								<div>
									<p className="text-lg text-slate-600 dark:text-slate-400 mb-8 leading-relaxed font-medium">
										Your 24/7 sales machine. It doesn&apos;t just look good—it
										ranks, qualifies, and captures high-intent local leads
										before they call the competition.
									</p>
									<ul className="space-y-4 text-sm font-bold text-slate-700 dark:text-slate-300">
										<li className="flex items-center gap-3">
											<div className="w-1.5 h-1.5 rounded-full bg-indigo-500" />{' '}
											Rank #1 for local service keywords
										</li>
										<li className="flex items-center gap-3">
											<div className="w-1.5 h-1.5 rounded-full bg-indigo-500" />{' '}
											Automated Lead-to-CRM routing
										</li>
										<li className="flex items-center gap-3">
											<div className="w-1.5 h-1.5 rounded-full bg-indigo-500" />{' '}
											Professional positioning out-of-the-box
										</li>
									</ul>
								</div>
								<div className="p-6 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-700">
									<div className="flex justify-between items-center mb-4">
										<span className="text-[10px] font-black text-slate-400 uppercase">
											Monthly Performance
										</span>
										<span className="text-emerald-500 font-black text-xs">
											+142%
										</span>
									</div>
									<div className="h-2 w-full bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
										<motion.div
											initial={{ width: 0 }}
											whileInView={{ width: '85%' }}
											transition={{ duration: 1, delay: 0.5 }}
											className="h-full bg-indigo-500"
										/>
									</div>
								</div>
							</div>
						</div>
					</motion.div>

					{/* SCOPELOCK */}
					<motion.div
						{...(fadeInUp as HTMLMotionProps<'div'>)}
						className="p-8 rounded-[2.5rem] bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 shadow-sm hover:shadow-xl transition-all duration-300 group"
					>
						<div className="w-12 h-12 bg-emerald-500/10 text-emerald-600 rounded-xl flex items-center justify-center mb-6">
							<ShieldCheck className="w-6 h-6" />
						</div>
						<h3 className="text-2xl font-black text-slate-900 dark:text-white mb-4 tracking-tight">
							ScopeLock™
						</h3>
						<p className="text-slate-500 dark:text-slate-400 mb-6 font-medium">
							Lock change orders instantly from the site. If the client asks for
							more, you get paid for more. Zero friction.
						</p>
						<div className="flex items-center gap-2 text-xs font-black text-emerald-600 uppercase tracking-widest">
							<Zap className="w-3 h-3 fill-emerald-600" /> Protect Every Margin
						</div>
					</motion.div>

					{/* PAYRAIL */}
					<motion.div
						{...(fadeInUp as HTMLMotionProps<'div'>)}
						className="p-8 rounded-[2.5rem] bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 shadow-sm hover:shadow-xl transition-all duration-300 group"
					>
						<div className="w-12 h-12 bg-amber-500/10 text-amber-600 rounded-xl flex items-center justify-center mb-6">
							<Hammer className="w-6 h-6" />
						</div>
						<h3 className="text-2xl font-black text-slate-900 dark:text-white mb-4 tracking-tight">
							PayRail™
						</h3>
						<p className="text-slate-500 dark:text-slate-400 mb-6 font-medium">
							The fastest tracks from work-done to money-in-bank. SMS billing
							that clients actually pay on the spot.
						</p>
						<div className="flex items-center gap-2 text-xs font-black text-amber-600 uppercase tracking-widest">
							<Zap className="w-3 h-3 fill-amber-600" /> Accelerate Cash Flow
						</div>
					</motion.div>

					{/* JUMPSTART: THE FIX */}
					<motion.div
						{...(fadeInUp as HTMLMotionProps<'div'>)}
						className="md:col-span-2 relative group mt-8"
					>
						{/* Dynamic Background that works in Light & Dark */}
						<div className="relative bg-slate-900 dark:bg-amber-500 p-10 md:p-16 rounded-[3rem] border-4 border-amber-500 dark:border-white shadow-2xl overflow-hidden transition-colors duration-500">
							{/* Decorative Sparkle for that "Exclusive" feel */}
							<div className="absolute top-0 right-0 p-8 opacity-20">
								<Sparkles className="w-24 h-24 text-white dark:text-slate-950" />
							</div>

							<div className="relative z-10 flex flex-col items-center text-center">
								<div className="px-4 py-1.5 rounded-full bg-amber-500/20 dark:bg-white/20 border border-amber-500/30 dark:border-white/30 text-amber-500 dark:text-white text-[10px] font-black uppercase tracking-[0.3em] mb-6">
									Limited Installation Window
								</div>

								<h3 className="text-4xl md:text-6xl font-black mb-6 text-white dark:text-slate-950 leading-none tracking-tighter">
									The $497 Jumpstart
								</h3>

								<p className="text-lg md:text-xl text-slate-400 dark:text-slate-800 mb-10 max-w-xl font-medium">
									We install the entire Rails system for you. Less than the cost
									of one underpriced job. Done in 72 hours.
								</p>

								<Link href="/jumpstart" className="w-full sm:w-auto">
									<motion.button
										whileHover={{ scale: 1.05, y: -2 }}
										whileTap={{ scale: 0.98 }}
										className="w-full sm:w-auto px-12 py-6 bg-white dark:bg-slate-950 text-slate-950 dark:text-white font-black rounded-2xl text-xl transition-all shadow-xl flex items-center justify-center gap-3"
									>
										Claim Your Spot
										<ArrowRight className="w-6 h-6" />
									</motion.button>
								</Link>

								<p className="mt-8 text-[10px] font-black uppercase tracking-[0.4em] text-slate-500 dark:text-slate-700">
									No Monthly Subscriptions. Just Results.
								</p>
							</div>
						</div>
					</motion.div>
				</div>
			</div>
		</section>
	);
}
