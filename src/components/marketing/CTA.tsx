'use client';

import { CheckCircle2, ArrowRight, Zap, Shield, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

export default function JumpstartHero() {
	return (
		<section className="py-24 bg-white dark:bg-slate-950 px-6 transition-colors duration-500">
			<div className="max-w-4xl mx-auto text-center">
				{/* Badge */}
				<div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 mb-8">
					<Zap className="w-3 h-3 text-amber-500" />
					<span className="text-[10px] font-black uppercase tracking-widest text-amber-600">
						Limited Concierge Spots Available
					</span>
				</div>

				<h1 className="text-5xl md:text-8xl font-black text-slate-900 dark:text-white mb-8 tracking-tighter uppercase italic leading-[0.85]">
					Don&apos;t have time? <br />
					<span className="text-amber-500">We&apos;ll build it.</span>
				</h1>

				<p className="text-xl text-slate-600 dark:text-slate-400 font-medium max-w-2xl mx-auto mb-12 leading-relaxed">
					Stop fighting website builders on your weekends. We design and launch
					your high-converting{' '}
					<span className="text-slate-900 dark:text-white font-bold">
						Site Engine
					</span>{' '}
					portal in 72 hours. You stay on the job site, we handle the tech.
				</p>

				{/* Proof Grid */}
				<div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
					{[
						{ icon: <Zap />, text: 'Full Site Engine Setup' },
						{ icon: <Shield />, text: 'Custom Comm Vault Scripts' },
						{ icon: <Clock />, text: 'Stripe PayRail Verified' },
					].map((item, i) => (
						<div
							key={i}
							className="flex items-center justify-center gap-3 p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-white/5"
						>
							<div className="text-amber-500 w-5 h-5">{item.icon}</div>
							<span className="text-sm font-bold text-slate-700 dark:text-slate-300">
								{item.text}
							</span>
						</div>
					))}
				</div>

				{/* THE MASTER CTA */}
				<motion.button
					whileHover={{ scale: 1.02 }}
					whileTap={{ scale: 0.98 }}
					onClick={() => {
						/* Trigger your getSubscriptionCheckoutURL action here */
					}}
					className="group relative inline-flex items-center gap-3 px-10 py-6 bg-slate-900 dark:bg-amber-500 text-white dark:text-slate-900 rounded-3xl font-black uppercase tracking-widest text-lg shadow-2xl hover:shadow-amber-500/20 transition-all"
				>
					Get Your Site Built ($497)
					<ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
				</motion.button>

				<div className="mt-8 flex items-center justify-center gap-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
					<span>One-Time Fee</span>
					<span className="w-1 h-1 bg-slate-300 rounded-full" />
					<span>Done-For-You</span>
					<span className="w-1 h-1 bg-slate-300 rounded-full" />
					<span>Launch in 72hrs</span>
				</div>
			</div>
		</section>
	);
}
