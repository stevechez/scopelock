'use client';

import Link from 'next/link';
import { motion, Variants } from 'framer-motion';
import { CheckCircle2, Zap, DollarSign, TrendingUp, Play } from 'lucide-react';

export default function Hero({ onOpenDemo }: { onOpenDemo: () => void }) {
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
			transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }, // Cinematic "Cubic Bezier" ease
		},
	};

	return (
<section className="relative pt-28 pb-20 md:pt-48 md:pb-32 px-6 overflow-hidden bg-white dark:bg-slate-950">		
			<div className="absolute inset-0 -z-10 h-full w-full bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>

			{/* 2. REFINED AMBIANCE */}
			<div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 pointer-events-none">
				<div className="absolute top-[-5%] left-[10%] w-[50%] h-[40%] rounded-full bg-amber-500/10 blur-[120px]" />
				<div className="absolute top-[20%] right-[10%] w-[30%] h-[30%] rounded-full bg-indigo-500/10 blur-[100px]" />
			</div>

			<motion.div
				variants={containerVariants}
				initial="hidden"
				animate="visible"
				className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 lg:gap-24 items-center"
			>
				{/* LEFT SIDE: THE HOOK */}
				<div className="text-center lg:text-left z-10">
					<motion.div
						variants={itemVariants}
						className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/5 border border-amber-500/20 mb-8"
					>
						<Zap className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
						<span className="text-[10px] font-black uppercase tracking-[0.2em] text-amber-600 dark:text-amber-500">
							FOR THE TOP 1% OF CUSTOM BUILDERS
						</span>
					</motion.div>

					<motion.h1
						variants={itemVariants}
						className="text-5xl md:text-7xl lg:text-[84px] font-black leading-[0.9] tracking-tighter text-slate-900 dark:text-white mb-8"
					>
						Stop Playing <span className="text-slate-400/50">IT Support.</span>{' '}
						<br />
						<span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600 italic pb-2">
							Start Commanding.
						</span>
					</motion.h1>

					<motion.p
						variants={itemVariants}
						className="text-lg md:text-xl text-slate-500 dark:text-slate-400 font-medium mb-12 max-w-xl mx-auto lg:mx-0 leading-relaxed"
					>
						The only Project OS designed to kill the admin bleed. Secure Comm
						Vaults and white-glove client experiences—all under your brand.
					</motion.p>

					{/* CTAs */}
					<motion.div
						variants={itemVariants}
						className="flex flex-col sm:flex-row gap-5 justify-center lg:justify-start mb-12"
					>
						<button
							onClick={e => {
								e.preventDefault();
								const pricingSection = document.getElementById('pricing');
								if (pricingSection) {
									pricingSection.scrollIntoView({ behavior: 'smooth' });
								}
							}}
							className="bg-amber-500 text-slate-900 px-10 py-5 rounded-2xl font-black text-xl shadow-2xl hover:scale-105 hover:bg-amber-400 transition-all text-center flex flex-col items-center justify-center leading-tight"
						>
							<span>Provision Your Vault</span>
							<span className="text-sm font-bold opacity-80">(Free)</span>
						</button>

						<button
							onClick={onOpenDemo}
							className="group w-full sm:w-auto flex items-center justify-center gap-3 border-2 border-slate-200 dark:border-slate-800 dark:text-white px-10 py-5 rounded-2xl font-bold text-lg hover:border-amber-500/50 transition-all active:scale-95"
						>
							<div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center group-hover:bg-amber-500 group-hover:text-white transition-colors">
								<Play className="w-3 h-3 fill-current ml-0.5" />
							</div>
							Watch 3-Min Demo
						</button>
					</motion.div>

					{/* PROOF STRIP */}
					<motion.div
						variants={itemVariants}
						className="flex flex-wrap items-center gap-x-10 gap-y-4 text-[11px] font-black uppercase tracking-widest text-slate-400 justify-center lg:justify-start"
					>
						<div className="flex items-center gap-2 group cursor-default">
							<TrendingUp className="w-4 h-4 text-emerald-500 group-hover:scale-110 transition-transform" />{' '}
							18% Avg Margin Inc.
						</div>
						<div className="flex items-center gap-2 group cursor-default">
							<DollarSign className="w-4 h-4 text-amber-500 group-hover:scale-110 transition-transform" />{' '}
							Get Paid 3x Faster
						</div>
						<div className="flex items-center gap-2 group cursor-default">
							<CheckCircle2 className="w-4 h-4 text-blue-500 group-hover:scale-110 transition-transform" />{' '}
							No Paper Trails
						</div>
					</motion.div>
				</div>

				{/* RIGHT SIDE: THE PRODUCT MOCKUP */}
				<motion.div
					initial={{ opacity: 0, y: 40 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.8, duration: 1 }}
					className="relative hidden lg:block"
				>
					{/* Floating Accent Card */}
					<motion.div
						animate={{ y: [0, -15, 0] }}
						transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
						className="absolute -top-6 -left-12 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.2)] z-30"
					>
						<div className="flex items-center gap-4">
							<div className="w-12 h-12 bg-emerald-500/10 rounded-2xl flex items-center justify-center text-emerald-500">
								<TrendingUp className="w-6 h-6" />
							</div>
							<div>
								<p className="text-[10px] uppercase font-black text-slate-400 tracking-[0.2em]">
									Live Tracking
								</p>
								<p className="text-xl font-black text-slate-900 dark:text-white">
									+$12,450.00
								</p>
							</div>
						</div>
					</motion.div>

					{/* MAIN INTERFACE */}
					<div className="relative group">
						{/* Shadow Glow */}
						<div className="absolute -inset-4 bg-amber-500/20 rounded-[3rem] blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

						<div className="relative bg-slate-950 rounded-[3rem] p-3 shadow-2xl border-[1px] border-white/10 -rotate-3 hover:rotate-0 transition-all duration-700">
							{/* Glass Glare */}
							<div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/10 to-transparent pointer-events-none z-20 rounded-[2.8rem]"></div>

							<div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-10 min-h-[460px] relative z-10">
								<div className="flex justify-between items-center mb-10">
									<div className="space-y-1">
										<h3 className="font-black text-2xl italic dark:text-white">
											Dunn Right Portal
										</h3>
										<p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
											Active Build: Cupertino
										</p>
									</div>
									<div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center font-black text-xs">
										SD
									</div>
								</div>

								<div className="space-y-6">
									<div className="p-6 bg-slate-50 dark:bg-slate-800/50 rounded-[2rem] border border-slate-100 dark:border-slate-800 relative group/card overflow-hidden">
										<div className="flex justify-between mb-2">
											<span className="font-bold text-slate-700 dark:text-slate-200">
												Change Order #04
											</span>
											<span className="flex items-center gap-1.5 text-amber-500 font-black text-[10px] uppercase tracking-tighter">
												<span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />{' '}
												Pending Approval
											</span>
										</div>
										<p className="text-sm text-slate-500 font-medium">
											Kitchen Island Stone Upgrade
										</p>
										<div className="mt-6 flex gap-3">
											<button className="flex-1 bg-slate-900 dark:bg-white dark:text-slate-900 text-white text-xs py-4 rounded-xl font-black uppercase tracking-widest hover:scale-[1.02] transition-transform">
												Approve
											</button>
										</div>
									</div>

									{/* Project Stats Footer */}
									<div className="grid grid-cols-2 gap-4">
										<div className="p-5 bg-emerald-500/5 rounded-2xl border border-emerald-500/10">
											<p className="text-[9px] font-black text-emerald-600 uppercase mb-1">
												Total Paid
											</p>
											<p className="text-lg font-black dark:text-white">
												$142,500
											</p>
										</div>
										<div className="p-5 bg-blue-500/5 rounded-2xl border border-blue-500/10">
											<p className="text-[9px] font-black text-blue-600 uppercase mb-1">
												Status
											</p>
											<p className="text-lg font-black dark:text-white">
												Framing
											</p>
										</div>
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
