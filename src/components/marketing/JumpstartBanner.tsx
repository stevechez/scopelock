'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function CTA() {
	return (
		<section className="py-24 px-6 bg-white dark:bg-slate-950">
			<div className="max-w-5xl mx-auto">
				<div className="relative overflow-hidden bg-slate-900 dark:bg-slate-900 rounded-[2rem] border border-slate-800 shadow-2xl">
					{/* Background Decorative Element */}
					<div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/3 w-96 h-96 bg-amber-500/10 blur-[100px] rounded-full" />

					<div className="relative p-8 md:p-12 lg:p-16 flex flex-col lg:flex-row items-center justify-between gap-10">
						{/* Left Side: The Offer */}
						<div className="max-w-xl text-center lg:text-left">
							<div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 mb-6">
								<Sparkles className="w-3 h-3 text-amber-500" />
								<span className="text-[10px] font-black uppercase tracking-[0.2em] text-amber-500">
									Limited Availability
								</span>
							</div>

							<h3 className="text-3xl md:text-4xl font-black text-white mb-4 italic uppercase tracking-tighter">
								The $497 Jumpstart
							</h3>

							<p className="text-slate-400 font-medium leading-relaxed mb-0">
								We take the office off your plate. Our team hand-builds your
								site, optimizes your local SEO, and configures your Comm Vault.
								<span className="text-white"> You just build.</span>
							</p>
						</div>

						{/* Right Side: Action */}
						<div className="flex flex-col items-center lg:items-end shrink-0">
							<Link href="/jumpstart" className="group">
								<button className="relative bg-white text-slate-950 px-8 py-4 rounded-xl font-black text-sm uppercase tracking-widest flex items-center gap-3 transition-all hover:bg-amber-500 hover:scale-[1.02] active:scale-95 shadow-xl">
									Claim a Slot
									<ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
								</button>
							</Link>
							<p className="mt-4 text-[10px] font-bold text-slate-500 uppercase tracking-[0.3em]">
								3 Slots Remaining for April
							</p>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
