'use client';

import Image from 'next/image';
import { motion, Variants, HTMLMotionProps } from 'framer-motion'; // <-- Import Variants
import {
	MousePointer2,
	ShieldCheck,
	Zap,
	Camera,
	Smartphone,
	ArrowRight,
} from 'lucide-react';

// Explicitly type this object
const fadeInUp = {
	initial: { opacity: 0, y: 30 },
	whileInView: { opacity: 1, y: 0 },
	viewport: { once: true },
	transition: { duration: 0.6, ease: 'easeOut' },
} as const;

export default function ProductModules() {
	// ... rest of your component
	return (
		<section
			id="features"
			className="py-32 px-6 bg-white dark:bg-slate-950 overflow-hidden"
		>
			{/* MASTER HEADER */}
			<motion.div {...fadeInUp} className="text-center max-w-4xl mx-auto mb-32">
				<h2 className="text-4xl md:text-7xl font-black text-slate-900 dark:text-white mb-8 leading-[0.95] tracking-tighter">
					From First Click <br />
					<span className="text-amber-500 italic">→ Final Payment.</span>
				</h2>
				<p className="text-xl text-slate-500 dark:text-slate-400 font-medium max-w-2xl mx-auto">
					We didn&quot;t just build a CRM. We built a high-speed rail for your
					business to move from lead to cash without the friction.
				</p>
			</motion.div>

			<div className="space-y-40 max-w-7xl mx-auto">
				{/* STEP 01 — ATTRACT (Site Engine) */}
				<motion.div
					{...fadeInUp}
					className="grid lg:grid-cols-2 gap-16 items-center"
				>
					<div>
						<div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-900/30 border border-indigo-100 dark:border-indigo-500/20 mb-6">
							<MousePointer2 className="w-3 h-3 text-indigo-600" />
							<span className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-700 dark:text-indigo-400">
								Step 01 — Attract
							</span>
						</div>
						<h3 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-6 leading-tight tracking-tight">
							The Site Engine: <br />
							Your 24/7 Closer.
						</h3>
						<p className="text-lg text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
							Most contractor sites are digital brochures. The{' '}
							<strong>Site Engine</strong> is a sales machine. It ranks your
							services locally and forces homeowners to take action.
						</p>
						<ul className="space-y-4 mb-8">
							{[
								'Localized SEO for your specific zip codes',
								'High-conversion lead capture forms',
								'Instant SMS alerts for new inquiries',
							].map((item, i) => (
								<li
									key={i}
									className="flex items-center gap-3 font-bold text-slate-700 dark:text-slate-300"
								>
									<div className="w-5 h-5 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center text-indigo-600 text-xs">
										✓
									</div>
									{item}
								</li>
							))}
						</ul>
					</div>
					<div className="relative group">
						<div className="absolute -inset-4 bg-indigo-500/5 blur-3xl rounded-[3rem] group-hover:bg-indigo-500/10 transition-all" />
						<div className="relative bg-slate-900 rounded-3xl p-2 shadow-2xl border border-slate-800 rotate-1 group-hover:rotate-0 transition-transform duration-500">
							<div className="bg-white dark:bg-slate-900 rounded-2xl overflow-hidden aspect-[4/3] relative">
								<div className="p-6 border-b dark:border-slate-800 flex justify-between items-center bg-slate-50 dark:bg-slate-900">
									<div className="flex gap-1.5">
										<div className="w-2.5 h-2.5 rounded-full bg-red-400" />
										<div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
										<div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
									</div>
									<span className="text-[10px] font-bold text-slate-400 tracking-widest">
										BUILDRIVE ENGINE
									</span>
								</div>
								<div className="p-8">
									<div className="w-2/3 h-8 bg-slate-100 dark:bg-slate-800 rounded-lg mb-4 animate-pulse" />
									<div className="w-full h-32 bg-slate-50 dark:bg-slate-800/50 rounded-xl mb-6" />
									<div className="grid grid-cols-2 gap-4">
										<div className="h-12 bg-indigo-500 rounded-lg" />
										<div className="h-12 bg-slate-200 dark:bg-slate-700 rounded-lg" />
									</div>
								</div>
							</div>
						</div>
					</div>
				</motion.div>

				{/* STEP 02 — CLOSE (Comm Vault) */}
				<motion.div
					{...fadeInUp}
					className="grid lg:grid-cols-2 gap-16 items-center"
				>
					<div className="lg:order-2">
						<div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 dark:bg-amber-900/30 border border-amber-100 dark:border-amber-500/20 mb-6">
							<ShieldCheck className="w-3 h-3 text-amber-600" />
							<span className="text-[10px] font-black uppercase tracking-[0.2em] text-amber-700 dark:text-amber-400">
								Step 02 — Close
							</span>
						</div>
						<h3 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-6 leading-tight tracking-tight">
							The Comm Vault: <br />
							Win the Bid.
						</h3>
						<p className="text-lg text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
							Stop leaving money on the table. Use 3-tier proposals that anchor
							your price higher and let the homeowner choose their level of
							service.
						</p>
						<div className="p-6 bg-amber-500/5 border border-amber-500/10 rounded-2xl">
							<p className="text-sm italic text-amber-700 dark:text-amber-400 font-bold italic">
								&ldquo;Since using the Comm Vault, our average job size
								increased by $4,200 just by offering the &ldquo;Elite&rdquo;
								tier.&rdquo;
							</p>
						</div>
					</div>
					<div className="lg:order-1 relative">
						<div className="bg-slate-50 dark:bg-slate-900 rounded-3xl p-8 shadow-xl border border-slate-200 dark:border-slate-800">
							<div className="space-y-4">
								{['Basic', 'Pro', 'Elite'].map((tier, i) => (
									<div
										key={tier}
										className={`p-4 rounded-xl border flex justify-between items-center ${i === 2 ? 'border-amber-500 bg-amber-500/5 ring-1 ring-amber-500' : 'border-slate-200 dark:border-slate-800'}`}
									>
										<span className="font-black dark:text-white">
											{tier} Package
										</span>
										<span
											className={`font-black ${i === 2 ? 'text-amber-500' : 'text-slate-400'}`}
										>
											${(i + 1) * 5},000
										</span>
									</div>
								))}
							</div>
						</div>
					</div>
				</motion.div>

				{/* STEP 03 — PROTECT (ScopeLock) */}
				<motion.div
					{...fadeInUp}
					className="grid lg:grid-cols-2 gap-16 items-center"
				>
					<div>
						<div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-900/30 border border-emerald-100 dark:border-emerald-500/20 mb-6">
							<Zap className="w-3 h-3 text-emerald-600" />
							<span className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-700 dark:text-emerald-400">
								Step 03 — Protect
							</span>
						</div>
						<h3 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-6 leading-tight tracking-tight">
							ScopeLock™: <br />
							No More Free Work.
						</h3>
						<p className="text-lg text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
							Scope creep kills margins. When a client says &ldquo;while
							you&quot;re here,&rdquo; ScopeLock captures the change, gets
							digital approval, and adds it to the final bill instantly.
						</p>
					</div>
					<div className="relative">
						<motion.div
							animate={{ scale: [1, 1.02, 1] }}
							transition={{ duration: 3, repeat: Infinity }}
							className="bg-emerald-500 text-white p-8 rounded-3xl shadow-[0_20px_50px_rgba(16,185,129,0.3)] text-center"
						>
							<p className="text-xs font-black uppercase tracking-widest opacity-80 mb-2">
								New Change Order Approved
							</p>
							<h4 className="text-4xl font-black mb-1">+$1,850.00</h4>
							<p className="font-bold opacity-90">Recessed Lighting Upgrade</p>
						</motion.div>
					</div>
				</motion.div>

				{/* STEP 04 — PAY (PayRail) */}
				<motion.div
					{...fadeInUp}
					className="grid lg:grid-cols-2 gap-16 items-center"
				>
					<div className="lg:order-2">
						<div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/30 border border-blue-100 dark:border-blue-500/20 mb-6">
							<Smartphone className="w-3 h-3 text-blue-600" />
							<span className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-700 dark:text-blue-400">
								Step 04 — Get Paid
							</span>
						</div>
						<h3 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-6 leading-tight tracking-tight">
							PayRail: <br />
							Paid in 60 Seconds.
						</h3>
						<p className="text-lg text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
							Stop chasing checks. Send an SMS payment link the second the
							milestone is hit. High-speed payouts delivered to your bank via
							Stripe.
						</p>
					</div>
					<div className="lg:order-1">
						<div className="max-w-[300px] mx-auto relative bg-slate-900 rounded-[3rem] p-4 border-[6px] border-slate-800 shadow-2xl">
							<div className="bg-white dark:bg-slate-900 rounded-[2rem] overflow-hidden p-6 aspect-[9/16]">
								<div className="w-12 h-1 bg-slate-100 dark:bg-slate-800 mx-auto mb-8 rounded-full" />
								<div className="space-y-4">
									<div className="p-3 bg-blue-500 text-white rounded-2xl rounded-tr-none ml-8 text-xs font-bold">
										Milestone met! Here is the link for the framing payment.
									</div>
									<div className="p-3 bg-slate-100 dark:bg-slate-800 rounded-2xl rounded-tl-none mr-8 text-xs font-bold text-blue-500 underline">
										pay.buildrail.com/inv_928...
									</div>
								</div>
							</div>
						</div>
					</div>
				</motion.div>
			</div>
		</section>
	);
}
