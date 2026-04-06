'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function BlueprintBreakDown() {
	return (
		<section
			id="blueprint"
			className="py-32 bg-slate-50 dark:bg-slate-900/50 px-6 border-y border-slate-200 dark:border-slate-800"
		>
			<div className="max-w-6xl mx-auto">
				{/* HEADER */}
				<div className="text-center mb-20">
					<h2 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white mb-6 tracking-tight">
						The System That Prints Profit
					</h2>

					<p className="text-xl text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
						Every component is engineered to eliminate free work, close higher
						bids, and accelerate cash flow.
					</p>
				</div>

				{/* GRID */}
				<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
					{/* FEATURED CARD */}
					<div className="md:col-span-2 group relative">
						<div className="p-10 rounded-[2.5rem] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md hover:shadow-2xl transition-all duration-300 group-hover:-translate-y-1">
							<div className="flex items-center gap-4 mb-6">
								<div className="w-14 h-14 bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 rounded-xl flex items-center justify-center text-2xl">
									🌐
								</div>
								<h3 className="text-3xl font-black text-slate-900 dark:text-white">
									Site Engine
								</h3>
							</div>

							<p className="text-slate-500 dark:text-slate-400 mb-6 max-w-2xl">
								Your 24/7 sales machine that attracts, qualifies, and captures
								high-intent local leads automatically.
							</p>

							<ul className="grid md:grid-cols-2 gap-4 font-medium text-slate-600 dark:text-slate-400">
								<li>→ Rank first in your zip code</li>
								<li>→ Capture leads instantly</li>
								<li>→ Route everything to your dashboard</li>
								<li>→ Never miss an opportunity again</li>
							</ul>
						</div>
					</div>

					{/* COMM VAULT */}
					<div className="group">
						<div className="p-8 rounded-[2.5rem] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all duration-300 group-hover:-translate-y-1">
							<div className="w-12 h-12 bg-amber-50 dark:bg-amber-900/30 text-amber-600 rounded-xl flex items-center justify-center text-2xl mb-6">
								⚡
							</div>

							<h3 className="text-2xl font-black text-slate-900 dark:text-white mb-4">
								Close Higher Bids
							</h3>

							<ul className="space-y-3 font-medium text-slate-600 dark:text-slate-400">
								<li>→ 3-tier pricing psychology built-in</li>
								<li>→ AI follow-ups that handle objections</li>
								<li>→ Turn “maybe” into signed deals</li>
							</ul>
						</div>
					</div>

					{/* PROJECT COMMAND */}
					<div className="group">
						<div className="p-8 rounded-[2.5rem] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all duration-300 group-hover:-translate-y-1">
							<div className="w-12 h-12 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 rounded-xl flex items-center justify-center text-2xl mb-6">
								🛠️
							</div>

							<h3 className="text-2xl font-black text-slate-900 dark:text-white mb-4">
								Protect Every Margin
							</h3>

							<ul className="space-y-3 font-medium text-slate-600 dark:text-slate-400">
								<li>→ Lock change orders instantly</li>
								<li>→ Send payment links on-site</li>
								<li>→ Reduce client friction completely</li>
							</ul>
						</div>
					</div>

					{/* JUMPSTART (UNCHANGED BUT ENHANCED) */}
					<div className="md:col-span-2">
						<div className="bg-slate-900 dark:bg-slate-800 p-10 rounded-[2.5rem] border-2 border-amber-500 shadow-2xl text-white text-center">
							<div className="text-amber-500 text-sm font-bold mb-2">
								LIMITED INSTALL OFFER
							</div>

							<h3 className="text-3xl font-black mb-4 text-amber-400">
								Get Everything Installed for $497
							</h3>

							<p className="text-slate-400 mb-8 max-w-xl mx-auto">
								Less than one underpriced job. Installed in days. Used for
								years.
							</p>

							<Link href="/jumpstart">
								<motion.button
									whileHover={{ scale: 1.04 }}
									whileTap={{ scale: 0.98 }}
									className="px-10 py-5 bg-white text-slate-900 font-black rounded-xl hover:bg-amber-50 transition-all shadow-lg"
								>
									Claim Your Spot →
								</motion.button>
							</Link>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
