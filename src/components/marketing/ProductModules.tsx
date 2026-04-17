'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import {
	MousePointer2,
	ShieldCheck,
	Zap,
	Smartphone,
	ArrowRight,
} from 'lucide-react';
import Link from 'next/link';

const fadeInUp = {
	initial: { opacity: 0, y: 30 },
	whileInView: { opacity: 1, y: 0 },
	viewport: { once: true },
	transition: { duration: 0.6, ease: 'easeOut' },
} as const;

export default function ProductModules() {
	return (
		// Added React Fragment here so we can return multiple <section> tags
		<>
			<section
				id="features"
				className="py-12 px-6 bg-white dark:bg-slate-950 overflow-hidden"
			>
				{/* MASTER HEADER */}
				<motion.div
					{...fadeInUp}
					className="text-center max-w-4xl mx-auto mb-32"
				>
					<h2 className="text-4xl md:text-7xl font-black text-slate-900 dark:text-white mb-8 leading-[0.95] tracking-tighter uppercase italic">
						Lead to Cash <br />
						<span className="text-amber-500 underline decoration-amber-500/20 underline-offset-8">
							Without the Friction.
						</span>
					</h2>
					<p className="text-xl text-slate-500 dark:text-slate-400 font-medium max-w-2xl mx-auto">
						A complete digital stack for the modern contractor. Every tool is
						built to save you an hour of admin and add a point to your margin.
					</p>
				</motion.div>

				<div className="space-y-40 max-w-7xl mx-auto">
					{/* STEP 01 — SITE ENGINE */}
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
								<strong>Site Engine</strong> is a sales machine that ranks your
								services locally and forces homeowners to take action.
							</p>
							<ul className="space-y-4 mb-10">
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
							<button className="flex items-center gap-2 text-indigo-600 font-black uppercase text-xs tracking-widest hover:gap-4 transition-all group">
								Learn more about Site Engine <ArrowRight className="w-4 h-4" />
							</button>
						</div>
						<div className="relative group">
							<div className="absolute -inset-4 bg-indigo-500/10 blur-3xl rounded-[3rem] group-hover:bg-indigo-500/20 transition-all" />
							<div className="relative bg-slate-900 rounded-3xl p-3 shadow-2xl border border-slate-800 rotate-1 group-hover:rotate-0 transition-transform duration-500 overflow-hidden">
								<Image
									src="/images/site-engine-preview.jpg"
									alt="Site Engine Demo"
									width={1200}
									height={900}
									className="rounded-2xl"
								/>
							</div>
						</div>
					</motion.div>

					{/* MODULE 01: BIDFORGE */}
					<motion.div
						{...fadeInUp}
						className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-16"
					>
						<div className="flex-1 w-full">
							<div className="relative group">
								<div className="absolute -inset-4 bg-blue-100 dark:bg-blue-900/20 rounded-[2rem] transform rotate-2 group-hover:rotate-0 transition-transform duration-500"></div>
								<div className="relative bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800">
									<div className="space-y-4">
										<div className="font-black text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-2">
											3-Tier Proposal Generated
										</div>
										<div className="p-3 bg-slate-50 dark:bg-slate-800 rounded border border-slate-100 dark:border-slate-700 text-sm">
											<span className="font-bold text-slate-500">Tier 1:</span>{' '}
											The Standard Finish ($12k)
										</div>
										<div className="p-3 bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 rounded text-sm font-bold text-blue-700 dark:text-blue-400 shadow-sm">
											<span className="text-blue-500">Tier 2:</span> The Premium
											Build ($18k) - Recommended
										</div>
										<div className="p-3 bg-slate-50 dark:bg-slate-800 rounded border border-slate-100 dark:border-slate-700 text-sm">
											<span className="font-bold text-slate-500">Tier 3:</span>{' '}
											The Architectural Suite ($28k)
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className="flex-1">
							<div className="text-blue-600 dark:text-blue-400 font-black tracking-widest text-sm mb-4 uppercase">
								Module 01: Sales & Proposals
							</div>
							<h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-6 italic tracking-tight">
								BidForge™
							</h2>
							<div className="space-y-6 text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
								<p>Stop leaving money on the table with amateur estimates.</p>
								<p>
									**BidForge** equips you with professional, field-tested AI
									scripts and 3-tier proposals. Anchor your price higher, handle
									objections effortlessly, and let the homeowner choose their
									level of premium service.
								</p>
							</div>
							<div className="pt-2">
								<Link
									href="/features/bidforge"
									className="inline-flex items-center gap-2 text-amber-500 font-bold hover:text-amber-400 hover:gap-3 transition-all duration-200"
								>
									Learn more about BidForge{' '}
									<span aria-hidden="true">&rarr;</span>
								</Link>
							</div>
						</div>
					</motion.div>

					{/* STEP 03 — SCOPELOCK */}
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
								you&rsquo;re here,&rdquo; ScopeLock captures the change, gets
								digital approval, and adds it to the final bill instantly.
							</p>
							<button className="flex items-center gap-2 text-emerald-600 font-black uppercase text-xs tracking-widest hover:gap-4 transition-all group">
								Stop Scope Creep <ArrowRight className="w-4 h-4" />
							</button>
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
								<p className="font-bold opacity-90 text-sm">
									Recessed Lighting Upgrade
								</p>
							</motion.div>
						</div>
					</motion.div>

					{/* STEP 04 — PAYRAIL */}
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
							<button className="flex items-center gap-2 text-blue-600 font-black uppercase text-xs tracking-widest hover:gap-4 transition-all group">
								Speed Up Payouts <ArrowRight className="w-4 h-4" />
							</button>
						</div>
						<div className="lg:order-1">
							<div className="max-w-[300px] mx-auto relative bg-slate-900 rounded-[3rem] p-4 border-[6px] border-slate-800 shadow-2xl rotate-[-2deg]">
								<div className="bg-white dark:bg-slate-900 rounded-[2.2rem] overflow-hidden p-6 aspect-[9/16] relative">
									<div className="w-12 h-1 bg-slate-100 dark:bg-slate-800 mx-auto mb-8 rounded-full" />
									<div className="space-y-4">
										<div className="p-4 bg-blue-500 text-white rounded-2xl rounded-tr-none ml-6 text-[10px] font-black leading-tight uppercase tracking-tighter shadow-lg shadow-blue-500/20">
											Milestone met! Link for the framing payment:
										</div>
										<div className="p-4 bg-slate-100 dark:bg-slate-800 rounded-2xl rounded-tl-none mr-6 text-[10px] font-black text-blue-500 underline uppercase tracking-tighter">
											pay.buildrailhq.com/inv_928...
										</div>
									</div>
								</div>
							</div>
						</div>
					</motion.div>

					{/* MODULE 04: CREWLENS (NEW) */}
					<motion.div
						{...fadeInUp}
						className="max-w-6xl mx-auto flex flex-col md:flex-row-reverse items-center gap-16"
					>
						<div className="flex-1">
							<div className="text-teal-600 dark:text-teal-400 font-black tracking-widest text-sm mb-4 uppercase">
								Module 04: Field Visibility
							</div>
							<h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-6 italic tracking-tight">
								CrewLens™
							</h2>
							<div className="space-y-6 text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
								<p>
									You can&quot;t be on every job site at once, but your eyes can
									be.
								</p>
								<p>
									**CrewLens** gives you a real-time visual feed of field
									operations. Crews snap progress photos directly into
									BUILDRAIL, creating an unshakeable visual timeline of the
									build that protects you from liability and keeps clients in
									the loop.
								</p>
							</div>
						</div>
						<div className="flex-1 w-full">
							<div className="relative group">
								<div className="absolute -inset-4 bg-teal-100 dark:bg-teal-900/20 rounded-[2rem] transform -rotate-2 group-hover:rotate-0 transition-transform duration-500"></div>
								<div className="relative bg-slate-900 rounded-2xl shadow-2xl overflow-hidden border border-slate-800 text-white p-6">
									<div className="h-40 bg-slate-800 rounded-xl mb-4 flex flex-col items-center justify-center border border-slate-700 border-dashed">
										<span className="text-2xl mb-2">📸</span>
										<span className="text-slate-400 text-sm font-bold uppercase tracking-widest">
											Live Site Feed
										</span>
									</div>
									<p className="text-sm font-medium text-slate-300">
										&ldquo;Slab poured at 10:45 AM. Rebar inspected and
										passed.&rdquo;
									</p>
									<div className="mt-4 pt-4 border-t border-slate-800 text-[10px] text-teal-400 font-black tracking-widest uppercase">
										Logged via CrewLens Mobile
									</div>
								</div>
							</div>
						</div>
					</motion.div>
				</div>
			</section>

			{/* THE DEEP DIVE (CATCH-ALL) */}
			<section
				id="details"
				className="py-24 bg-white dark:bg-slate-950 px-6 border-t border-slate-100 dark:border-slate-800"
			>
				<div className="max-w-6xl mx-auto">
					<div className="text-center mb-16">
						<h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-4 italic tracking-tight">
							The BUILDRAIL Ecosystem
						</h2>
						<p className="text-xl text-slate-500 dark:text-slate-400 font-medium">
							Everything you get when you deploy the platform.
						</p>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
						{/* Comm Vault */}
						<div className="bg-slate-50 dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-200 dark:border-slate-800">
							<h3 className="text-2xl font-black text-slate-900 dark:text-white mb-4 italic">
								Comm Vault™
							</h3>
							<p className="text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
								The central intelligence hub. Secure communication and
								bank-grade storage with passwordless &ldquo;Magic Link&rdquo;
								client access.
							</p>
						</div>

						{/* BidForge */}
						<div className="bg-slate-50 dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-200 dark:border-slate-800">
							<h3 className="text-2xl font-black text-slate-900 dark:text-white mb-4 italic">
								BidForge™
							</h3>
							<p className="text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
								Professional AI scripts and 3-tier proposal generation designed
								to anchor prices high and close deals effortlessly.
							</p>
						</div>

						{/* Site Engine */}
						<div className="bg-slate-50 dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-200 dark:border-slate-800">
							<h3 className="text-2xl font-black text-slate-900 dark:text-white mb-4 italic">
								Site Engine™
							</h3>
							<p className="text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
								A fully managed, high-converting portfolio website deployed in
								24 hours to capture and funnel local leads into your dashboard.
							</p>
						</div>
					</div>
				</div>
			</section>
		</>
	);
}
