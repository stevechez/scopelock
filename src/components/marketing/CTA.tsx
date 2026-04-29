'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { CheckCircle2, Sparkles, ArrowRight, Wrench } from 'lucide-react';

export default function CTA() {
	return (
		<section className="relative py-24 px-6 overflow-hidden bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800/50">
			{/* THE "RAIL" GRADIENT BACKGROUND */}
			<div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-0 pointer-events-none">
				<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-amber-500/5 via-transparent to-transparent blur-[120px]" />
			</div>

			<div className="relative z-10 max-w-5xl mx-auto">
				<div className="bg-slate-50 dark:bg-slate-900/40 backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-[3rem] p-8 md:p-16 text-center shadow-xl">
					<motion.div
						initial={{ opacity: 0, scale: 0.9 }}
						whileInView={{ opacity: 1, scale: 1 }}
						viewport={{ once: true }}
						className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-200 dark:bg-amber-500/10 border border-slate-300 dark:border-amber-500/20 mb-8"
					>
						<Wrench className="w-4 h-4 text-slate-700 dark:text-amber-500" />
						<span className="text-xs font-black uppercase tracking-[0.2em] text-slate-700 dark:text-amber-500">
							Optional White-Glove Service
						</span>
					</motion.div>

					<h2 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white mb-6 leading-[0.95] tracking-tighter">
						Don&apos;t have time to build it? <br />
						<span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-amber-600 italic">
							We&apos;ll build it for you.
						</span>
					</h2>

					<p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 mb-12 max-w-2xl mx-auto leading-relaxed font-medium">
						Stop fighting website builders on your weekends. With the{' '}
						<strong className="text-slate-900 dark:text-white">
							BuildRail Jumpstart
						</strong>
						, our team designs and launches your high-converting{' '}
						<strong className="text-amber-600 dark:text-amber-500">
							Site Engine
						</strong>{' '}
						portal, so you can stay on the job site while we handle the tech.
					</p>

					{/* VALUE CHECKLIST */}
					<div className="flex flex-wrap justify-center gap-x-8 gap-y-4 mb-12 text-sm font-bold text-slate-700 dark:text-slate-300">
						<div className="flex items-center gap-2">
							<CheckCircle2 className="w-5 h-5 text-amber-500" />
							Full Site Engine Setup
						</div>
						<div className="flex items-center gap-2">
							<CheckCircle2 className="w-5 h-5 text-amber-500" />
							Custom Comm Vault Scripts
						</div>
						<div className="flex items-center gap-2">
							<CheckCircle2 className="w-5 h-5 text-amber-500" />
							Stripe PayRail Verified
						</div>
					</div>

					<div className="flex flex-col items-center gap-6">
						<Link href="/jumpstart" className="w-full sm:w-auto">
							<motion.button
								whileHover={{ scale: 1.02, y: -4 }}
								whileTap={{ scale: 0.98 }}
								className="group relative w-full sm:w-auto px-10 py-5 bg-slate-900 dark:bg-amber-500 text-white dark:text-slate-950 font-black rounded-2xl text-lg shadow-xl transition-all flex items-center justify-center gap-3"
							>
								Get Your Site Built ($497)
								<ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
							</motion.button>
						</Link>

						<div className="flex items-center justify-center gap-3 text-[10px] md:text-xs font-bold text-slate-500 uppercase tracking-widest flex-wrap">
							<span>One-Time Fee</span>
							<span className="w-1 h-1 bg-slate-300 dark:bg-slate-700 rounded-full" />
							<span>Done-For-You</span>
							<span className="w-1 h-1 bg-slate-300 dark:bg-slate-700 rounded-full" />
							<span>Launch in 72hrs</span>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
