'use client';

import { useEffect, useState } from 'react';
import { motion, Variants } from 'framer-motion';
import { CheckCircle2, Zap, DollarSign, TrendingUp, Play } from 'lucide-react';

export default function Hero({ onOpenDemo }: { onOpenDemo: () => void }) {
	const [mouse, setMouse] = useState({ x: 0, y: 0 });

	useEffect(() => {
		const handleMouseMove = (e: MouseEvent) => {
			const x = (e.clientX / window.innerWidth - 0.5) * 20;
			const y = (e.clientY / window.innerHeight - 0.5) * 20;
			setMouse({ x, y });
		};

		window.addEventListener('mousemove', handleMouseMove);
		return () => window.removeEventListener('mousemove', handleMouseMove);
	}, []);

	const containerVariants: Variants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: { staggerChildren: 0.12, delayChildren: 0.2 },
		},
	};

	const itemVariants: Variants = {
		hidden: { opacity: 0, y: 24 },
		visible: {
			opacity: 1,
			y: 0,
			transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
		},
	};

	return (
		<section className="relative overflow-hidden bg-background text-primary transition-colors duration-500 px-6 pt-28 pb-20 md:pt-40 md:pb-32">
			{/* GRID */}
			<div
				className="absolute inset-0 -z-10
				bg-[linear-gradient(to_right,rgba(0,0,0,0.04)_1px,transparent_1px),
				linear-gradient(to_bottom,rgba(0,0,0,0.04)_1px,transparent_1px)]
				dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),
				linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)]
				bg-[size:14px_24px]
				[mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"
			/>

			{/* AMBIENT LIGHT */}
			<div className="absolute inset-0 -z-10 pointer-events-none">
				<div className="absolute top-[-5%] left-[10%] w-[50%] h-[40%] rounded-full bg-amber-400/20 dark:bg-amber-400/30 blur-[140px]" />
				<div className="absolute top-[20%] right-[10%] w-[30%] h-[30%] rounded-full bg-indigo-400/20 dark:bg-indigo-400/30 blur-[120px]" />
			</div>

			<motion.div
				variants={containerVariants}
				initial="hidden"
				animate="visible"
				className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 lg:gap-24 items-center"
			>
				{/* LEFT */}
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

					{/* HEADLINE */}
					<motion.h1
						variants={itemVariants}
						className="text-5xl md:text-7xl lg:text-[84px] font-black leading-[0.9] tracking-tighter mb-8"
					>
						Stop Playing <span className="text-muted/50">IT Support.</span>
						<br />
						<span className="relative inline-block italic">
							<span className="bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 bg-[length:200%_100%] bg-clip-text text-transparent animate-[shimmer_4s_linear_infinite]">
								Start Commanding.
							</span>
						</span>
					</motion.h1>

					<motion.p
						variants={itemVariants}
						className="text-lg md:text-xl text-muted dark:text-muted font-medium mb-12 max-w-xl mx-auto lg:mx-0 leading-relaxed"
					>
						The only Project OS designed to kill the admin bleed. Secure Comm
						Vaults and white-glove client experiences—all under your brand.
					</motion.p>

					{/* CTA */}
					<motion.div
						variants={itemVariants}
						className="flex flex-col sm:flex-row gap-5 justify-center lg:justify-start mb-12"
					>
						<button
							onClick={e => {
								e.preventDefault();
								document
									.getElementById('pricing')
									?.scrollIntoView({ behavior: 'smooth' });
							}}
							className="bg-amber-500 text-black px-5 py-5 rounded-2xl font-black text-xl shadow-2xl hover:scale-105 hover:bg-amber-400 hover:shadow-[0_0_40px_rgba(245,158,11,0.4)] transition-all"
						>
							Provision Your Vault
							<span className="text-sm ml-2 opacity-80">(Free)</span>
						</button>

						<button
							onClick={onOpenDemo}
							className="group flex items-center justify-center gap-3 border-2 border-slate-200 bg-white dark:border-slate-800 text-slate-900 dark:text-white px-10 py-5 rounded-2xl font-bold text-lg hover:border-amber-500/50 hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-all active:scale-95"
						>
							{/* Icon Wrapper */}
							<div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 flex items-center justify-center group-hover:bg-amber-500 group-hover:text-white transition-all duration-300 group-hover:scale-110 shadow-sm">
								<Play className="w-3.5 h-3.5 fill-current ml-0.5" />
							</div>
							Watch 3-Min Demo
						</button>
					</motion.div>

					{/* STATS */}
					<motion.div
						variants={itemVariants}
						className="flex flex-wrap gap-x-10 gap-y-4 text-[11px] font-black uppercase tracking-widest text-muted justify-center lg:justify-start"
					>
						<div className="flex items-center gap-2">
							<TrendingUp className="w-4 h-4 text-emerald-500" />
							18% Avg Margin Inc.
						</div>
						<div className="flex items-center gap-2">
							<DollarSign className="w-4 h-4 text-amber-500" />
							Get Paid 3x Faster
						</div>
						<div className="flex items-center gap-2">
							<CheckCircle2 className="w-4 h-4 text-blue-500" />
							No Paper Trails
						</div>
					</motion.div>
				</div>

				{/* RIGHT MOCKUP */}
				<motion.div
					style={{
						transform: `translate(${mouse.x}px, ${mouse.y}px)`,
					}}
					initial={{ opacity: 0, y: 40 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.6, duration: 1 }}
					className="relative hidden lg:block"
				>
					<div className="relative group">
						<div className="absolute -inset-6 bg-amber-500/20 rounded-[3rem] blur-3xl opacity-0 group-hover:opacity-100 transition duration-700" />

						<div className="relative bg-slate-900 dark:bg-black rounded-[3rem] p-3 shadow-2xl border border-slate-200 dark:border-white/10 -rotate-3 group-hover:rotate-0 transition duration-700">
							<div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-10 min-h-[460px]">
								<div className="flex justify-between mb-10">
									<div>
										<h3 className="font-black text-2xl italic text-slate-900 dark:text-white">
											Dunn Right Portal
										</h3>
										<p className="text-xs text-slate-400 uppercase tracking-widest">
											Active Build: Cupertino
										</p>
									</div>
									<div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-white/10 flex items-center justify-center text-xs font-black text-slate-900 dark:text-white">
										SD
									</div>
								</div>

								<div className="p-6 bg-slate-50 dark:bg-white/[0.05] rounded-[2rem] border border-slate-100 dark:border-white/10">
									<div className="flex justify-between mb-2">
										<span className="font-bold text-slate-900 dark:text-white">
											Change Order #04
										</span>
										<span className="text-amber-500 text-[10px] uppercase font-black">
											Pending
										</span>
									</div>

									<p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
										Kitchen Island Stone Upgrade
									</p>

									<button className="w-full bg-slate-900 text-white dark:bg-white dark:text-slate-900 py-4 rounded-xl text-xs font-black uppercase tracking-widest">
										Approve
									</button>
								</div>
							</div>
						</div>
					</div>
				</motion.div>
			</motion.div>

			{/* SHIMMER KEYFRAMES */}
		</section>
	);
}
