'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { CheckCircle2, Sparkles, ArrowRight } from 'lucide-react';

export default function CTA() {
	return (
		<section className="relative py-12 px-6 overflow-hidden bg-slate-950">
			{/* THE "RAIL" GRADIENT BACKGROUND */}
			<div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-0 pointer-events-none">
				<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-amber-500/10 via-transparent to-transparent blur-[120px]" />
			</div>

			<div className="relative z-10 max-w-5xl mx-auto">
				<div className="bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-[3rem] p-8 md:p-16 text-center shadow-2xl">
					<motion.div
						initial={{ opacity: 0, scale: 0.9 }}
						whileInView={{ opacity: 1, scale: 1 }}
						className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 mb-8"
					>
						<Sparkles className="w-4 h-4 text-amber-500" />
						<span className="text-xs font-black uppercase tracking-[0.2em] text-amber-500">
							limited monthly spots available
						</span>
					</motion.div>

					<h2 className="text-4xl md:text-7xl font-black text-white mb-8 leading-[0.95] tracking-tighter">
						Install Your System <br />
						<span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600 italic">
							This Week.
						</span>
					</h2>

					<p className="text-xl text-slate-400 mb-12 max-w-2xl mx-auto leading-relaxed">
						Stop losing money to underpriced jobs and slow payments. Let our
						team build your{' '}
						<span className="text-white font-bold text-nowrap">
							BuildRail Rails
						</span>{' '}
						for you—so you can focus on building the job.
					</p>

					{/* VALUE CHECKLIST */}
					<div className="flex flex-wrap justify-center gap-x-8 gap-y-4 mb-12 text-sm font-bold text-slate-300">
						<div className="flex items-center gap-2">
							<CheckCircle2 className="w-5 h-5 text-emerald-500" />
							Full Site Engine Setup
						</div>
						<div className="flex items-center gap-2">
							<CheckCircle2 className="w-5 h-5 text-emerald-500" />
							Custom Comm Vault Scripts
						</div>
						<div className="flex items-center gap-2">
							<CheckCircle2 className="w-5 h-5 text-emerald-500" />
							Stripe PayRail Verified
						</div>
					</div>

					<div className="flex flex-col items-center gap-6">
						<Link href="/jumpstart" className="w-full sm:w-auto">
							<motion.button
								whileHover={{ scale: 1.02, y: -4 }}
								whileTap={{ scale: 0.98 }}
								className="group relative w-full sm:w-auto px-12 py-6 bg-amber-500 text-slate-950 font-black rounded-2xl text-xl shadow-[0_20px_50px_rgba(245,158,11,0.3)] transition-all flex items-center justify-center gap-3"
							>
								Get The $497 Jumpstart
								<ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
							</motion.button>
						</Link>

						<div className="flex items-center gap-4 text-xs font-bold text-slate-500 uppercase tracking-widest">
							<span>No Contract</span>
							<span className="w-1 h-1 bg-slate-700 rounded-full" />
							<span>Done-For-You Setup</span>
							<span className="w-1 h-1 bg-slate-700 rounded-full" />
							<span>Launch in 72hrs</span>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
