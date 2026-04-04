'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ModeToggle } from '@/components/ModeToggle';

export default function BlueprintMarketingPage() {
	const [isDemoOpen, setIsDemoOpen] = useState(false);
	const [showStickyCTA, setShowStickyCTA] = useState(false);

	// Escape key listener for the modal
	useEffect(() => {
		const handler = (e: KeyboardEvent) => {
			if (e.key === 'Escape') setIsDemoOpen(false);
		};
		window.addEventListener('keydown', handler);
		return () => window.removeEventListener('keydown', handler);
	}, []);

	// Scroll listener for sticky bottom CTA
	useEffect(() => {
		const handleScroll = () => {
			// Show after scrolling down 600px (past hero)
			setShowStickyCTA(window.scrollY > 600);
		};
		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	return (
		<div className="bg-white dark:bg-slate-950 min-h-screen font-sans selection:bg-amber-100 transition-colors duration-300 relative pb-24 md:pb-0">
			{/* STICKY BOTTOM CTA */}
			<AnimatePresence>
				{showStickyCTA && (
					<motion.div
						initial={{ y: 100, opacity: 0 }}
						animate={{ y: 0, opacity: 1 }}
						exit={{ y: 100, opacity: 0 }}
						className="fixed bottom-0 left-0 w-full bg-slate-900 dark:bg-slate-900 border-t border-slate-800 p-4 z-50 shadow-2xl flex justify-center items-center gap-4 md:gap-8"
					>
						<span className="hidden md:inline font-bold text-slate-300">
							Ready to stop leaving money on the table?
						</span>
						<Link
							href="#pricing"
							className="w-full md:w-auto px-8 py-3 bg-amber-500 text-slate-900 font-black rounded-xl hover:bg-amber-400 transition-all text-center"
						>
							Start Free Trial
						</Link>
					</motion.div>
				)}
			</AnimatePresence>

			{/* VIDEO MODAL */}
			<AnimatePresence>
				{isDemoOpen && (
					<div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							onClick={() => setIsDemoOpen(false)}
							className="absolute inset-0 bg-slate-900/90 backdrop-blur-sm"
						/>
						<motion.div
							initial={{ scale: 0.9, opacity: 0 }}
							animate={{ scale: 1, opacity: 1 }}
							exit={{ scale: 0.9, opacity: 0 }}
							className="relative w-full max-w-4xl aspect-video bg-black rounded-3xl overflow-hidden shadow-2xl border border-slate-700"
						>
							<button
								onClick={() => setIsDemoOpen(false)}
								className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/10 hover:bg-white/20 text-white rounded-full flex items-center justify-center backdrop-blur-md transition-all"
							>
								✕
							</button>
							<iframe
								className="w-full h-full"
								src="https://www.youtube.com/embed/dQw4w9WgXcQ"
								title="Blueprint OS Demo"
								allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
								allowFullScreen
							/>
						</motion.div>
					</div>
				)}
			</AnimatePresence>

			{/* 1. NAVIGATION */}
			<nav className="flex justify-between items-center px-6 py-8 max-w-7xl mx-auto">
				<Link
					href="/"
					className="text-3xl font-black tracking-tighter dark:text-white"
				>
					BLUEPRINT<span className="text-amber-500">OS</span>
				</Link>

				{/* CENTER: Exploration Links */}
				<div className="hidden md:flex gap-8 font-bold text-slate-600 dark:text-slate-400">
					<Link
						href="#features"
						className="hover:text-slate-900 dark:hover:text-white transition-colors"
					>
						The Platform
					</Link>
					<Link
						href="#blueprint"
						className="hover:text-slate-900 dark:hover:text-white transition-colors"
					>
						The Blueprint
					</Link>
					<Link
						href="#pricing"
						className="hover:text-slate-900 dark:hover:text-white transition-colors"
					>
						Pricing
					</Link>
				</div>

				{/* RIGHT: Utility & Action Links */}
				<div className="flex items-center gap-6">
					<ModeToggle />
					<Link
						href="/login"
						className="hidden md:block font-bold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
					>
						Log in
					</Link>
					<Link
						href="#pricing"
						className="hidden md:block px-6 py-3 bg-slate-900 dark:bg-amber-500 text-white dark:text-slate-900 font-bold rounded-xl hover:scale-105 transition-all shadow-lg active:scale-95"
					>
						Start Free Trial
					</Link>
				</div>
			</nav>

			{/* 2. HERO SECTION */}
			<header className="pt-16 pb-20 px-6 text-center max-w-4xl mx-auto">
				<motion.h1
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white leading-[1.1] mb-8"
				>
					The Operating System for the <br />
					<span className="text-amber-500 underline decoration-slate-900 dark:decoration-amber-500/30 underline-offset-8">
						Modern Contractor.
					</span>
				</motion.h1>
				<p className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 font-medium mb-10 leading-relaxed max-w-3xl mx-auto">
					Stop doing free work, win bigger bids, and completely eliminate
					Accounts Receivable. The ultimate command center for high-end trades.
				</p>
				<div className="flex flex-col sm:flex-row gap-4 justify-center">
					<Link href="#pricing" className="block w-full sm:w-auto">
						<motion.button
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.97 }}
							className="w-full sm:w-auto bg-slate-900 dark:bg-amber-500 text-white dark:text-slate-900 px-10 py-5 rounded-2xl font-black text-xl shadow-2xl transition-all text-center"
						>
							Get the Full Suite
						</motion.button>
					</Link>
					<motion.button
						whileHover={{ scale: 1.05 }}
						whileTap={{ scale: 0.97 }}
						onClick={() => setIsDemoOpen(true)}
						className="w-full sm:w-auto bg-white dark:bg-slate-900 text-slate-900 dark:text-white border-2 border-slate-200 dark:border-slate-800 px-10 py-5 rounded-2xl font-black text-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-all"
					>
						Watch the Demo
					</motion.button>
				</div>
			</header>

			{/* NEW: SOCIAL PROOF / TRUST SECTION */}
			<section className="py-12 border-y border-slate-100 dark:border-slate-800/50 bg-slate-50/50 dark:bg-slate-900/20">
				<div className="max-w-4xl mx-auto px-6 text-center">
					<p className="text-sm font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-8">
						Used by contractors scaling from $250k to $2M+
					</p>
					<blockquote className="text-xl md:text-2xl font-medium text-slate-700 dark:text-slate-300 italic mb-6">
						&ldquo;Blueprint OS saved me 10+ hours a week in the office and gave
						me the exact proposal layout to close an $18k HVAC job at full
						price.&rdquo;
					</blockquote>
					<div className="font-bold text-slate-900 dark:text-white">
						— Mike R., HVAC Contractor
					</div>
				</div>
			</section>

			{/* 3. PRODUCT MODULES */}
			<section id="features" className="py-24 space-y-32 px-6">
				{/* MODULE 01: SITE ENGINE */}
				<div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-16">
					<div className="flex-1">
						<div className="text-indigo-600 dark:text-indigo-400 font-black tracking-widest text-sm mb-4 uppercase">
							Module 01: Marketing
						</div>
						<h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-6 italic">
							The Site Engine
						</h2>
						<div className="space-y-6 text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
							<p>
								Most contractor websites are &quot;ghost towns&quot;—outdated,
								ugly, and broken on mobile. They don&apos;t just look bad; they
								actively cost you high-paying jobs.
							</p>
							<p>
								The <strong>Site Engine</strong> deploys a professional,
								high-converting portfolio and lead-capture system in under 24
								hours. Get found locally, capture real leads, and look like a
								premier firm.
							</p>
							<div className="pt-4 flex flex-col sm:flex-row gap-4">
								<a
									href="https://local-trades-template.vercel.app/"
									target="_blank"
									className="flex items-center justify-center gap-2 px-6 py-3 border-2 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 font-bold rounded-xl hover:bg-slate-50 dark:hover:bg-slate-900 transition-all"
								>
									See Example Site <span className="text-xl">↗</span>
								</a>
							</div>
						</div>
					</div>
					<div className="flex-1 w-full">
						<div className="relative group">
							<div className="absolute -inset-4 bg-indigo-100 dark:bg-indigo-900/20 rounded-[2rem] transform rotate-2 group-hover:rotate-0 transition-transform duration-500"></div>
							<div className="relative bg-white dark:bg-slate-900 rounded-2xl shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-800">
								<Image
									src="/images/site-engine-preview.jpg"
									alt="Site Engine Template Preview"
									width={800}
									height={600}
									className="w-full h-auto"
								/>
							</div>
						</div>
					</div>
				</div>

				{/* MODULE 02: COMM VAULT */}
				<div className="max-w-6xl mx-auto flex flex-col md:flex-row-reverse items-center gap-16">
					<div className="flex-1">
						<div className="text-amber-600 dark:text-amber-400 font-black tracking-widest text-sm mb-4 uppercase">
							Module 02: Operations
						</div>
						<h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-6 italic">
							The Comm Vault
						</h2>
						<div className="space-y-6 text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
							<p>
								The biggest profit killer in the trades isn&apos;t materials.
								It&apos;s unbilled time, verbal agreements, and bad
								communication.
							</p>
							<p>
								The <strong>Comm Vault</strong> arms you with 3-tier proposals
								that anchor your prices higher, and automated scripts that
								instantly handle scope creep and late payments.
							</p>
							<div className="pt-4 flex flex-col sm:flex-row gap-4">
								<a
									href="https://contractor-prompt-pack.vercel.app/"
									target="_blank"
									className="flex items-center justify-center gap-2 px-6 py-3 border-2 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 font-bold rounded-xl hover:bg-slate-50 dark:hover:bg-slate-900 transition-all"
								>
									See Example Vault <span className="text-xl">↗</span>
								</a>
							</div>
						</div>
					</div>
					<div className="flex-1 w-full">
						<div className="relative group">
							<div className="absolute -inset-4 bg-amber-100 dark:bg-amber-900/20 rounded-[2rem] transform -rotate-2 group-hover:rotate-0 transition-transform duration-500"></div>
							<div className="relative bg-white dark:bg-slate-900 rounded-2xl shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-800">
								<Image
									src="/images/commvault.jpg"
									alt="Comm Vault Preview"
									width={800}
									height={600}
									className="w-full h-auto"
								/>
							</div>
						</div>
					</div>
				</div>

				{/* MODULE 03: SCOPELOCK */}
				<div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-16">
					<div className="flex-1">
						<div className="text-indigo-600 dark:text-indigo-400 font-black tracking-widest text-sm mb-4 uppercase">
							Module 03: Revenue Protection
						</div>
						<h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-6 italic tracking-tight">
							ScopeLock™
						</h2>
						<div className="space-y-6 text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
							<p>
								Scope creep is the silent killer of construction margins.
								Clients ask for &ldquo;one quick favor&rdquo; and suddenly you
								are eating $3,000 in materials and labor.
							</p>
							<p>
								<strong>ScopeLock</strong> captures change orders on the fly.
								Input the request, set the price, and secure your margins
								instantly with digital tracking inside your project dashboard.
							</p>
						</div>
					</div>
					<div className="flex-1 w-full">
						<div className="relative group">
							<div className="absolute -inset-4 bg-indigo-100 dark:bg-indigo-900/20 rounded-[2rem] transform rotate-2 group-hover:rotate-0 transition-transform duration-500"></div>
							<div className="relative bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-800">
								<div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4 mb-4">
									<div className="font-black text-slate-900 dark:text-white">
										Active Change Order
									</div>
									<div className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
										+ $2,500
									</div>
								</div>
								<div className="space-y-2">
									<div className="font-medium text-slate-600 dark:text-slate-300">
										Upgrade to Quartz Countertops
									</div>
									<div className="text-sm font-bold text-slate-400 uppercase">
										Status: Approved
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* MODULE 04: PAYRAIL */}
				<div className="max-w-6xl mx-auto flex flex-col md:flex-row-reverse items-center gap-16">
					<div className="flex-1">
						<div className="text-amber-600 dark:text-amber-400 font-black tracking-widest text-sm mb-4 uppercase">
							Module 04: Cash Flow Engine
						</div>
						<h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-6 italic tracking-tight">
							SiteDraft™
						</h2>
						<div className="space-y-6 text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
							<p>
								Chasing down final payments shouldn&apos;t be part of the job.
							</p>
							<p>
								<strong>SiteDraft</strong>&nbsp;replaces Net-30 invoicing with a
								milestone-based trigger system. Send instant, secure payment
								links directly to the client&apos;s phone via SMS. They pay with
								Apple Pay or ACH before you even leave the site.
							</p>
						</div>
					</div>
					<div className="flex-1 w-full">
						<div className="relative group">
							<div className="absolute -inset-4 bg-amber-100 dark:bg-amber-900/20 rounded-[2rem] transform -rotate-2 group-hover:rotate-0 transition-transform duration-500"></div>
							<div className="relative bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-800">
								<div className="space-y-4">
									<div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700 flex justify-between items-center">
										<div>
											<div className="font-bold text-slate-900 dark:text-white">
												Rough Framing
											</div>
											<div className="text-[10px] text-slate-400 font-black uppercase tracking-widest">
												Milestone 2
											</div>
										</div>
										<div className="text-emerald-500 font-black">$15,000</div>
									</div>
									<button className="w-full bg-slate-900 dark:bg-amber-500 text-white dark:text-slate-900 font-black py-4 rounded-xl shadow-lg flex items-center justify-center gap-2">
										Send SMS Invoice
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* MODULE 05: SITEPULSE */}
				<div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-16">
					<div className="flex-1">
						<div className="text-green-600 dark:text-green-400 font-black tracking-widest text-sm mb-4 uppercase">
							Module 05: Field Ops
						</div>
						<h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-6 italic tracking-tight">
							CrewLens™
						</h2>
						<div className="space-y-6 text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
							<p>End the &ldquo;what got done today?&rdquo; phone calls.</p>
							<p>
								<strong>CrewLens</strong> is a dead-simple, photo-first daily
								logging tool for your crew. Snap a photo, add a note, and
								generate an instant feed of site progress that creates total
								transparency for you and your client.
							</p>
						</div>
					</div>
					<div className="flex-1 w-full">
						<div className="relative group">
							<div className="absolute -inset-4 bg-green-100 dark:bg-green-900/20 rounded-[2rem] transform rotate-2 group-hover:rotate-0 transition-transform duration-500"></div>
							<div className="relative bg-slate-900 rounded-2xl shadow-2xl overflow-hidden border border-slate-800 text-white p-6">
								<div className="h-40 bg-slate-800 rounded-xl mb-4 flex items-center justify-center">
									<span className="text-slate-600">📷 Site Photo</span>
								</div>
								<p className="text-sm font-medium text-slate-300">
									&ldquo;Rough plumbing completed on the second floor. Passed
									city inspection this afternoon.&rdquo;
								</p>
								<div className="mt-4 pt-4 border-t border-slate-800 text-[10px] text-slate-500 font-black tracking-widest uppercase">
									Logged by: Field Crew
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* THE DEEP DIVE (CATCH-ALL WITH NEW 2x2 GRID) */}
			<section
				id="blueprint"
				className="py-24 bg-slate-50 dark:bg-slate-900/50 px-6 border-y border-slate-200 dark:border-slate-800"
			>
				<div className="max-w-6xl mx-auto">
					<div className="text-center mb-16">
						<h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-4 italic tracking-tight">
							The Blueprint Breakdown
						</h2>
						<p className="text-xl text-slate-500 dark:text-slate-400 font-medium">
							Everything you get when you join the ecosystem.
						</p>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
						{/* SITE ENGINE */}
						<div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow">
							<div className="w-12 h-12 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-xl flex items-center justify-center text-2xl mb-6">
								🌐
							</div>
							<h3 className="text-2xl font-black text-slate-900 dark:text-white mb-4 italic">
								Site Engine
							</h3>
							<ul className="space-y-4 font-medium text-slate-600 dark:text-slate-400">
								<li className="flex items-start gap-3">
									<span className="text-indigo-600 font-bold">→</span>
									<span>
										<strong>SEO Branding:</strong> Zip-code specific targeting
										so locals find you first.
									</span>
								</li>
								<li className="flex items-start gap-3">
									<span className="text-indigo-600 font-bold">→</span>
									<span>
										<strong>Lead Capture:</strong> Native forms that route
										straight to your dashboard, not your junk folder.
									</span>
								</li>
							</ul>
						</div>

						{/* COMM VAULT */}
						<div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow">
							<div className="w-12 h-12 bg-amber-50 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 rounded-xl flex items-center justify-center text-2xl mb-6">
								⚡
							</div>
							<h3 className="text-2xl font-black text-slate-900 dark:text-white mb-4 italic">
								Comm Vault
							</h3>
							<ul className="space-y-4 font-medium text-slate-600 dark:text-slate-400">
								<li className="flex items-start gap-3">
									<span className="text-amber-600 font-bold">→</span>
									<span>
										<strong>3-Tier Bids:</strong> Anchoring psychology built-in
										to upsell clients naturally.
									</span>
								</li>
								<li className="flex items-start gap-3">
									<span className="text-amber-600 font-bold">→</span>
									<span>
										<strong>AI Templates:</strong> Overcome objections and
										follow up automatically without typing a word.
									</span>
								</li>
							</ul>
						</div>

						{/* NEW: PROJECT COMMAND SUITE */}
						<div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow">
							<div className="w-12 h-12 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-xl flex items-center justify-center text-2xl mb-6">
								🛠️
							</div>
							<h3 className="text-2xl font-black text-slate-900 dark:text-white mb-4 italic">
								Project Command
							</h3>
							<ul className="space-y-4 font-medium text-slate-600 dark:text-slate-400">
								<li className="flex items-start gap-3">
									<span className="text-emerald-600 font-bold">→</span>
									<span>
										<strong>ScopeLock:</strong> Capture change orders instantly
										and protect margins.
									</span>
								</li>
								<li className="flex items-start gap-3">
									<span className="text-emerald-600 font-bold">→</span>
									<span>
										<strong>SiteDraft:</strong> Trigger SMS payment links
										directly from the job site.
									</span>
								</li>
								<li className="flex items-start gap-3">
									<span className="text-emerald-600 font-bold">→</span>
									<span>
										<strong>CrewLens:</strong> Upload daily photos to keep
										clients out of your hair.
									</span>
								</li>
							</ul>
						</div>

						{/* JUMPSTART */}
						<div
							id="jumpstart"
							className="bg-slate-900 dark:bg-slate-800 p-8 rounded-[2.5rem] border-2 border-amber-500 shadow-2xl text-white"
						>
							<div className="w-12 h-12 bg-amber-500 text-slate-900 rounded-xl flex items-center justify-center text-2xl mb-6 font-black">
								🚀
							</div>
							<h3 className="text-2xl font-black mb-4 italic text-amber-500">
								The $497 Jumpstart
							</h3>
							<p className="text-slate-400 mb-6 font-medium leading-tight text-sm">
								We’ll build your entire system for less than the cost of one
								bad, underpriced job.
							</p>
							<ul className="space-y-4 font-medium text-sm">
								<li className="flex items-start gap-3">
									<span className="text-amber-500">✅</span>
									<span>
										<strong>Full Site Build:</strong> Hand-crafted and written
										by our team.
									</span>
								</li>
								<li className="flex items-start gap-3">
									<span className="text-amber-500">✅</span>
									<span>
										<strong>SEO Optimized:</strong> Rank locally from Day 1.
									</span>
								</li>
								<li className="flex items-start gap-3">
									<span className="text-amber-500">✅</span>
									<span>
										<strong>Vault Config:</strong> Custom script setup included.
									</span>
								</li>
							</ul>
							<Link href="/jumpstart" className="block w-full mt-8">
								<motion.button
									whileHover={{ scale: 1.02 }}
									whileTap={{ scale: 0.98 }}
									className="w-full py-4 bg-white text-slate-900 font-black rounded-xl hover:bg-amber-50 transition-all flex items-center justify-center"
								>
									Claim a Jumpstart Slot
								</motion.button>
							</Link>
						</div>
					</div>
				</div>
			</section>

			{/* 4. THE PATH (3 STEPS) */}
			<section className="py-24 bg-white dark:bg-slate-950 px-6 border-y border-slate-100 dark:border-slate-900">
				<div className="max-w-6xl mx-auto text-center">
					<h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-16 tracking-tight">
						The Path to a Systematized Business
					</h2>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
						<div className="hidden md:block absolute top-1/4 left-0 w-full h-0.5 bg-slate-100 dark:bg-slate-800 -z-10" />
						<div className="text-center group">
							<div className="w-16 h-16 bg-slate-900 dark:bg-slate-800 text-white rounded-2xl flex items-center justify-center text-2xl font-black mx-auto mb-6 shadow-xl group-hover:bg-indigo-600 transition-colors duration-300">
								01
							</div>
							<h3 className="text-2xl font-black text-slate-900 dark:text-white mb-3">
								Deploy Front Office
							</h3>
							<p className="text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
								Launch your professional 24-hour website and start capturing
								leads passively.
							</p>
						</div>
						<div className="text-center group">
							<div className="w-16 h-16 bg-slate-900 dark:bg-slate-800 text-white rounded-2xl flex items-center justify-center text-2xl font-black mx-auto mb-6 shadow-xl group-hover:bg-amber-500 transition-colors duration-300">
								02
							</div>
							<h3 className="text-2xl font-black text-slate-900 dark:text-white mb-3">
								Secure Back Office
							</h3>
							<p className="text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
								Log in to the Comm Vault and lock in your default prices and
								proposal templates.
							</p>
						</div>
						<div className="text-center group">
							<div className="w-16 h-16 bg-slate-900 dark:bg-slate-800 text-white rounded-2xl flex items-center justify-center text-2xl font-black mx-auto mb-6 shadow-xl group-hover:bg-green-500 transition-colors duration-300">
								03
							</div>
							<h3 className="text-2xl font-black text-slate-900 dark:text-white mb-3">
								Scale Your Margins
							</h3>
							<p className="text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
								Deploy ScopeLock and SiteDraft to eliminate unbilled hours and
								get paid faster.
							</p>
						</div>
					</div>
				</div>
			</section>

			{/* 5. PRICING */}
			<section
				id="pricing"
				className="py-24 bg-slate-50 dark:bg-slate-900/50 px-6"
			>
				<div className="max-w-6xl mx-auto">
					<div className="text-center mb-16">
						<h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-4">
							Scale on your terms.
						</h2>
						<p className="text-xl text-slate-500 dark:text-slate-400 font-medium max-w-2xl mx-auto">
							Priced at less than one billable hour per month. No corporate
							hoops—if the system doesn&apos;t immediately pay for itself, just
							message Steve directly.
						</p>
					</div>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
						{/* TIER 1 */}
						<div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 flex flex-col justify-between">
							<div>
								<h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
									Comm Vault
								</h3>
								<div className="flex items-baseline gap-1 mb-6">
									<span className="text-4xl font-black dark:text-white">
										$29
									</span>
									<span className="text-slate-500 font-bold">/mo</span>
								</div>
								<ul className="space-y-4 mb-8 dark:text-slate-300">
									<li>✅ 3-Tier Bid Estimator</li>
									<li>✅ Full AI Script Library</li>
									<li>✅ Mobile Access</li>
									<li className="text-slate-400 dark:text-slate-600">
										❌ Custom Website
									</li>
								</ul>
							</div>
							<Link href="/signup?plan=vault" className="w-full block">
								<motion.button
									whileHover={{ scale: 1.02 }}
									whileTap={{ scale: 0.98 }}
									className="w-full py-4 border-2 border-slate-900 dark:border-slate-700 text-slate-900 dark:text-white font-bold rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-all text-center"
								>
									Start Free Trial
								</motion.button>
							</Link>
						</div>
						{/* TIER 2 */}
						<div className="bg-slate-900 p-8 rounded-3xl border-4 border-amber-500 flex flex-col justify-between relative transform md:scale-110 shadow-2xl z-10 text-white">
							<div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-amber-500 text-slate-900 font-black px-4 py-1 rounded-full text-sm uppercase tracking-wide whitespace-nowrap">
								The Full Blueprint
							</div>
							<div>
								<h3 className="text-xl font-bold mb-2">Platform Access</h3>
								<div className="flex items-baseline gap-1 mb-6">
									<span className="text-4xl font-black">$49</span>
									<span className="text-slate-400 font-bold">/mo</span>
								</div>
								<ul className="space-y-4 mb-8">
									<li className="font-bold text-amber-400">
										✅ Site Engine Hosting
									</li>
									<li className="font-bold text-amber-400">
										✅ Comm Vault Included
									</li>
									<li>✅ ScopeLock™ Change Orders</li>
									<li>✅ SiteDraft™ SMS Payments</li>
									<li>✅ CrewLens™ Daily Logs</li>
								</ul>
							</div>
							<Link href="/signup?plan=pro" className="w-full block">
								{' '}
								<motion.button
									whileHover={{ scale: 1.05 }}
									whileTap={{ scale: 0.95 }}
									className="w-full py-4 bg-amber-500 text-slate-900 font-black rounded-xl hover:bg-amber-400 transition-all shadow-lg text-center"
								>
									Get the Full Suite
								</motion.button>
							</Link>
						</div>
						{/* TIER 3 */}
						<div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 flex flex-col justify-between opacity-80">
							<div>
								<div className="mb-4">
									<span className="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 font-bold text-xs rounded-full uppercase tracking-tighter">
										Coming Soon
									</span>
								</div>
								<h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
									Blueprint Pro +
								</h3>
								<ul className="space-y-4 mb-8 italic text-slate-500 dark:text-slate-400">
									<li>✨ SiteVerdict Integration</li>
									<li>✨ Automated Lead Audits</li>
									<li>✨ Advanced Analytics</li>
								</ul>
							</div>
							<button
								disabled
								className="w-full py-4 bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-600 font-bold rounded-xl cursor-not-allowed"
							>
								Stay Updated
							</button>
						</div>
					</div>
				</div>
			</section>

			{/* 6. JUMPSTART BANNER */}
			<section className="py-16 bg-amber-50 dark:bg-amber-950/30 border-y border-amber-100 dark:border-amber-900/50">
				<div className="max-w-4xl mx-auto px-6 flex flex-col md:flex-row items-center gap-8">
					<div className="flex-1 text-center md:text-left">
						<h3 className="text-2xl font-black text-slate-900 dark:text-amber-500 mb-2">
							Too busy to set it up yourself?
						</h3>
						<p className="text-slate-600 dark:text-slate-400 font-medium italic">
							For a flat fee of <strong>$497</strong>, we’ll build your site,
							optimize SEO, and configure your Vault. Less than the cost of one
							bad job.
						</p>
					</div>
					<Link href="/jumpstart">
						<motion.button
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.95 }}
							className="whitespace-nowrap px-8 py-4 bg-slate-900 dark:bg-amber-500 text-white dark:text-slate-900 font-bold rounded-2xl shadow-lg"
						>
							Book Your Jumpstart
						</motion.button>
					</Link>
				</div>
			</section>

			{/* 7. FOUNDER NOTE */}
			<section className="py-24 bg-slate-50 dark:bg-slate-950 px-6">
				<div className="max-w-3xl mx-auto bg-white dark:bg-slate-900 p-8 md:p-12 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-sm italic text-slate-700 dark:text-slate-300 leading-relaxed text-lg">
					<div className="flex items-center gap-4 mb-8 not-italic">
						<div className="w-16 h-16 rounded-full bg-slate-200 dark:bg-slate-800 border-2 border-amber-500 overflow-hidden flex items-center justify-center text-2xl font-black text-slate-900 dark:text-white">
							SD
						</div>
						<div>
							<p className="font-black text-slate-900 dark:text-white text-xl leading-none">
								A note from the founder
							</p>
							<p className="text-slate-500 dark:text-slate-400 font-bold uppercase text-xs tracking-widest mt-1">
								Blueprint OS
							</p>
						</div>
					</div>
					<p className="mb-6">
						&ldquo;I built Blueprint OS because I saw too many talented
						contractors getting crushed by the &apos;office side&apos; of the
						business.&rdquo;
					</p>
					<p className="mb-6">
						&ldquo;Blueprint OS is designed to give you the professional edge of
						a 40-person firm, while letting you stay lean and focused on the
						build.&rdquo;
					</p>
					<p className="mt-8 not-italic font-black text-slate-900 dark:text-white text-xl">
						— Steve Dunn
					</p>
				</div>
			</section>

			{/* 8. FOOTER */}
			<footer className="bg-slate-900 dark:bg-black text-white pt-20 pb-10 px-6">
				<div className="max-w-7xl mx-auto">
					<div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
						<div className="col-span-1">
							<div className="text-2xl font-black tracking-tighter mb-4">
								BLUEPRINT<span className="text-amber-500">OS</span>
							</div>
							<p className="text-slate-400 font-medium mb-6 leading-relaxed">
								The digital stack for modern tradesmen. Win bids, stop creep,
								and get paid.
							</p>
							<div className="flex items-center gap-2 text-green-400 text-sm font-bold">
								<span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />{' '}
								Systems Operational
							</div>
						</div>
						<div>
							<h4 className="font-black uppercase tracking-widest text-sm mb-6 text-slate-500">
								Platform
							</h4>
							<ul className="space-y-4 font-bold text-slate-300">
								<li>
									<Link
										href="https://local-trades-template.vercel.app/"
										className="hover:text-amber-500 transition-colors"
									>
										Site Engine
									</Link>
								</li>
								<li>
									<Link
										href="https://contractor-prompt-pack.vercel.app/"
										className="hover:text-amber-500 transition-colors"
									>
										Comm Vault
									</Link>
								</li>
								<li>
									<Link
										href="#features"
										className="hover:text-amber-500 transition-colors"
									>
										ScopeLock™
									</Link>
								</li>
								<li>
									<Link
										href="#features"
										className="hover:text-amber-500 transition-colors"
									>
										SiteDraft™
									</Link>
								</li>
								<li>
									<Link
										href="#features"
										className="hover:text-amber-500 transition-colors"
									>
										CrewLens™
									</Link>
								</li>
							</ul>
						</div>
						<div>
							<h4 className="font-black uppercase tracking-widest text-sm mb-6 text-slate-500">
								Support
							</h4>
							<ul className="space-y-4 font-bold text-slate-300">
								<li>
									<Link
										href="/help"
										className="hover:text-amber-500 transition-colors"
									>
										Knowledge Base
									</Link>
								</li>
								<li>
									<Link
										href="/billing-faq"
										className="hover:text-amber-500 transition-colors"
									>
										Billing & FAQ
									</Link>
								</li>
								<li>
									<Link
										href="/contact"
										className="hover:text-amber-500 transition-colors"
									>
										Contact Support
									</Link>
								</li>
							</ul>
						</div>
						<div>
							<h4 className="font-black uppercase tracking-widest text-sm mb-6 text-slate-500">
								Contact
							</h4>
							<p className="font-bold text-slate-300 mb-2">
								Steve@BlueprintOS.com
							</p>
							<p className="text-slate-400 text-sm mb-6 uppercase tracking-wider font-bold">
								Cupertino, CA
							</p>
						</div>
					</div>
					<div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-slate-500 text-sm font-bold">
						<p>© 2026 Blueprint OS. All rights reserved.</p>
						<div className="flex gap-8">
							<Link
								href="/privacy"
								className="hover:text-white transition-colors"
							>
								Privacy Policy
							</Link>
							<Link
								href="/terms"
								className="hover:text-white transition-colors"
							>
								Terms of Service
							</Link>
						</div>
					</div>
				</div>
			</footer>
		</div>
	);
}
