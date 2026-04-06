'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Hero({ onOpenDemo }: { onOpenDemo: () => void }) {
	return (
		<header className="pt-24 pb-28 px-6">
			<div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-14 items-center">
				{/* LEFT SIDE */}
				<div className="text-center md:text-left">
					<motion.h1
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						className="text-5xl md:text-7xl font-black leading-[1.05] tracking-tight text-slate-900 dark:text-white mb-6"
					>
						You’re Not Losing Money on Bids.
						<br />
						<span className="text-amber-500">
							You’re Losing It Inside the Job.
						</span>
					</motion.h1>

					<p className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 font-medium mb-8 max-w-xl mx-auto md:mx-0">
						BlueprintOS captures missed change orders, gets you paid on-site,
						and gives you total control over every job — without adding
						overhead.
					</p>

					{/* CTA */}
					<div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start mb-6">
						<Link href="#pricing">
							<motion.button
								whileHover={{ scale: 1.05 }}
								whileTap={{ scale: 0.97 }}
								className="bg-amber-500 text-slate-900 px-8 py-4 rounded-xl font-black text-lg shadow-xl transition-all"
							>
								Start Free Trial
							</motion.button>
						</Link>

						<motion.button
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.97 }}
							onClick={onOpenDemo}
							className="border border-slate-600  dark:text-white dark:border-slate-700 px-8 py-4 rounded-xl font-bold text-lg hover:bg-slate-50 dark:hover:bg-slate-900 transition-all"
						>
							Watch Demo
						</motion.button>
					</div>

					{/* PROOF STRIP */}
					<div className="flex flex-col sm:flex-row gap-4 text-sm text-slate-500 justify-center md:justify-start">
						<span>💰 +18% avg margin increase</span>
						<span>⚡ Get paid 3x faster</span>
						<span>📸 90% fewer client check-ins</span>
					</div>
				</div>

				{/* RIGHT SIDE VISUAL */}
				<div className="relative hidden md:block">
					<div className="absolute -inset-6 bg-amber-100 dark:bg-amber-900/20 rounded-[2rem] blur-2xl opacity-60" />

					<div className="relative bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl p-6">
						<div className="space-y-4">
							<div className="flex justify-between items-center">
								<span className="font-bold text-slate-800 dark:text-white">
									Active Change Order
								</span>
								<span className="text-emerald-500 font-black">+ $2,500</span>
							</div>

							<p className="text-sm text-slate-500">
								Quartz Countertop Upgrade — Approved
							</p>

							<div className="border-t border-slate-200 dark:border-slate-800 pt-4">
								<p className="text-xs text-slate-400 mb-2">Milestone Payment</p>
								<div className="flex justify-between font-semibold">
									<span>Framing Complete</span>
									<span>$15,000</span>
								</div>
							</div>

							<button className="w-full bg-slate-900 dark:bg-amber-500 text-white dark:text-slate-900 py-3 rounded-lg font-bold mt-4">
								Send Payment Link
							</button>
						</div>
					</div>
				</div>
			</div>
		</header>
	);
}
