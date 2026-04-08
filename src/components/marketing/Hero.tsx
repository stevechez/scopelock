'use client';

import Link from 'next/link';
import { motion, Variants } from 'framer-motion'; // <-- Add Variants here
import { CheckCircle2, Zap, DollarSign, TrendingUp } from 'lucide-react';

export default function Hero({ onOpenDemo }: { onOpenDemo: () => void }) {
	// Explicitly type the variants to satisfy TypeScript
	const containerVariants: Variants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: { staggerChildren: 0.15, delayChildren: 0.3 },
		},
	};

	const itemVariants: Variants = {
		hidden: { opacity: 0, y: 20 },
		visible: {
			opacity: 1,
			y: 0,
			transition: { duration: 0.5, ease: 'easeOut' }, // Now TS knows "easeOut" is valid
		},
	};

	return (
		<section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6 overflow-hidden">
			{/* BACKGROUND AMBIANCE - The "BuildRail" Glow */}
			<div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 pointer-events-none">
				<div className="absolute top-[-10%] left-[10%] w-[40%] h-[40%] rounded-full bg-amber-500/10 blur-[120px] dark:bg-amber-500/5" />
				<div className="absolute bottom-[10%] right-[10%] w-[30%] h-[30%] rounded-full bg-indigo-500/10 blur-[100px] dark:bg-indigo-500/5" />
			</div>

			<motion.div
				variants={containerVariants}
				initial="hidden"
				animate="visible"
				className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center"
			>
				{/* LEFT SIDE: THE HOOK */}
				<div className="text-center lg:text-left z-10">
					<motion.div
						variants={itemVariants}
						className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 dark:bg-amber-900/30 border border-amber-200 dark:border-amber-500/20 mb-6"
					>
						<Zap className="w-4 h-4 text-amber-600 fill-amber-600" />
						<span className="text-xs font-black uppercase tracking-widest text-amber-700 dark:text-amber-400">
							The Modern OS for Trades
						</span>
					</motion.div>

					<motion.h1
						variants={itemVariants}
						className="text-5xl md:text-6xl lg:text-7xl font-black leading-tight tracking-tighter text-slate-900 dark:text-white mb-8"
					>
						Stop Losing Money <br />
						<span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-amber-600 italic">
							Inside the Job.
						</span>
					</motion.h1>

					<motion.p
						variants={itemVariants}
						className="text-lg md:text-xl text-slate-500 dark:text-slate-400 font-medium mb-10 max-w-xl mx-auto lg:mx-0 leading-relaxed"
					>
						BuildRail captures every missed change order, automates on-site
						payments, and puts your business on the tracks to 20%+ margins.
					</motion.p>

					{/* CTAs */}
					<motion.div
						variants={itemVariants}
						className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-10"
					>
						<Link href="#pricing">
							<button className="group relative w-full sm:w-auto bg-slate-900 dark:bg-white text-white dark:text-slate-950 px-10 py-5 rounded-2xl font-black text-lg transition-all hover:shadow-[0_20px_40px_-10px_rgba(245,158,11,0.3)] active:scale-95 overflow-hidden">
								<span className="relative z-10">Start Free Trial</span>
								<div className="absolute inset-0 bg-amber-500 translate-y-[102%] group-hover:translate-y-0 transition-transform duration-300" />
							</button>
						</Link>

						<button
							onClick={onOpenDemo}
							className="w-full sm:w-auto border-2 border-slate-200 dark:border-slate-800 dark:text-white px-10 py-5 rounded-2xl font-bold text-lg hover:bg-slate-50 dark:hover:bg-white/5 transition-all active:scale-95"
						>
							Watch 2-Min Demo
						</button>
					</motion.div>

					{/* PROOF STRIP - Better Icons, Better Layout */}
					<motion.div
						variants={itemVariants}
						className="flex flex-wrap items-center gap-x-8 gap-y-4 text-sm font-bold text-slate-400 justify-center lg:justify-start"
					>
						<div className="flex items-center gap-2">
							<TrendingUp className="w-4 h-4 text-emerald-500" /> 18% Avg Margin
							Inc.
						</div>
						<div className="flex items-center gap-2">
							<DollarSign className="w-4 h-4 text-amber-500" /> Get Paid 3x
							Faster
						</div>
						<div className="flex items-center gap-2">
							<CheckCircle2 className="w-4 h-4 text-blue-500" /> No More Paper
							Trails
						</div>
					</motion.div>
				</div>

				{/* RIGHT SIDE: THE "LIVE PRODUCT" */}
				<motion.div
					initial={{ opacity: 0, x: 40 }}
					animate={{ opacity: 1, x: 0 }}
					transition={{ delay: 0.6, duration: 0.8 }}
					className="relative perspective-1000 hidden lg:block"
				>
					{/* Floating Accent Card */}
					<motion.div
						animate={{ y: [0, -10, 0] }}
						transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
						className="absolute -top-12 -left-12 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-2xl shadow-2xl z-20"
					>
						<div className="flex items-center gap-3">
							<div className="w-10 h-10 bg-emerald-500/10 rounded-full flex items-center justify-center text-emerald-500 font-bold">
								+$
							</div>
							<div>
								<p className="text-[10px] uppercase font-black text-slate-400 tracking-widest">
									Added to Profit
								</p>
								<p className="text-lg font-black text-slate-900 dark:text-white">
									$2,450.00
								</p>
							</div>
						</div>
					</motion.div>

					{/* Main Interface Mockup */}
					<div className="relative bg-slate-950 rounded-[2.5rem] p-3 shadow-2xl border-[8px] border-slate-900 rotate-2 hover:rotate-0 transition-transform duration-700 overflow-hidden">
						<div className="bg-white dark:bg-slate-900 rounded-[1.8rem] p-8 min-h-[400px]">
							<div className="flex justify-between items-center mb-8">
								<h3 className="font-black text-xl italic dark:text-white">
									Active Job: South Bay Remodel
								</h3>
								<div className="px-3 py-1 bg-amber-500/10 text-amber-500 text-[10px] font-black rounded-full uppercase">
									On Schedule
								</div>
							</div>

							<div className="space-y-6">
								<div className="p-5 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800">
									<div className="flex justify-between mb-2">
										<span className="font-bold text-slate-700 dark:text-slate-200">
											Change Order #4
										</span>
										<span className="text-amber-600 font-black">PENDING</span>
									</div>
									<p className="text-sm text-slate-500">
										Upgraded Quartz Countertops
									</p>
									<div className="mt-4 flex gap-2">
										<button className="flex-1 bg-slate-900 text-white text-xs py-3 rounded-xl font-bold">
											Approve
										</button>
										<button className="flex-1 border border-slate-200 dark:border-slate-700 text-xs py-3 rounded-xl font-bold">
											Details
										</button>
									</div>
								</div>

								<div className="p-5 bg-emerald-500/5 rounded-2xl border border-emerald-500/20">
									<div className="flex justify-between mb-1">
										<span className="font-bold text-emerald-600 uppercase text-[10px] tracking-widest">
											Milestone Payment
										</span>
										<span className="text-emerald-500 font-black">Ready</span>
									</div>
									<div className="flex justify-between items-center">
										<span className="font-black text-slate-800 dark:text-white text-lg">
											Framing Completion
										</span>
										<span className="font-black text-slate-800 dark:text-white text-lg">
											$15,200
										</span>
									</div>
								</div>
							</div>
						</div>
					</div>
				</motion.div>
			</motion.div>
		</section>
	);
}
