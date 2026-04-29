'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { ModeToggle } from '@/components/ModeToggle';
import { getAppUrl } from '@/utils/urls';

export default function Navbar() {
	const [isOpen, setIsOpen] = useState(false);
	const [scrolled, setScrolled] = useState(false);

	// 1. THE MISSING SCROLL LOGIC
	// This detects when the user scrolls down and triggers the solid background
	useEffect(() => {
		const handleScroll = () => {
			setScrolled(window.scrollY > 20);
		};
		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	// 2. UPDATED NAVIGATION ROUTING
	// Matches the new section IDs we just built
	const navLinks = [
		{ name: 'Ecosystem', href: '#ecosystem' },
		{ name: 'Reviews', href: '#reviews' },
		{ name: 'Pricing', href: '#pricing' },
	];

	// --- Animation Variants ---
	const menuVariants: Variants = {
		closed: {
			opacity: 0,
			scale: 0.95,
			y: -10,
			transition: { duration: 0.2, ease: 'easeInOut' },
		},
		open: {
			opacity: 1,
			scale: 1,
			y: 0,
			transition: {
				type: 'spring',
				stiffness: 300,
				damping: 30,
				staggerChildren: 0.07,
				delayChildren: 0.1,
			},
		},
	};

	const itemVariants: Variants = {
		closed: { opacity: 0, x: -10 },
		open: { opacity: 1, x: 0 },
	};

	return (
		<header
			className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
				scrolled
					? 'bg-white/95 dark:bg-slate-950/95 backdrop-blur-md py-4 shadow-sm border-b border-slate-200 dark:border-white/10'
					: 'bg-transparent py-6 border-b border-transparent'
			}`}
		>
			<nav className="max-w-7xl mx-auto px-6 flex justify-between items-center">
				{/* 3. LOGO FIX (Contrast Restored) */}
				<Link
					href="/"
					className="text-2xl md:text-3xl font-black tracking-tighter light:text-slate-900 dark:text-white group flex items-center"
				>
					BUILD
					<span className="text-amber-500 transition-colors group-hover:text-amber-400">
						RAIL
					</span>
				</Link>

				{/* DESKTOP LINKS */}
				<div className="hidden md:flex items-center gap-10">
					{navLinks.map(item => (
						<Link
							key={item.name}
							href={item.href}
							// Smooth scroll behavior can be handled natively by HTML anchor links
							className="text-sm font-bold text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
						>
							{item.name}
						</Link>
					))}
				</div>

				{/* RIGHT SECTION & CTAs */}
				<div className="flex items-center gap-4">
					<div className="hidden sm:flex items-center gap-6 mr-2">
						<ModeToggle />
						<Link
							href={getAppUrl('/login')}
							className="text-sm font-bold text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
						>
							Log in
						</Link>
					</div>

					<Link
						href={getAppUrl('#pricing')}
						className="hidden sm:block px-6 py-2.5 bg-slate-900 dark:bg-amber-500 text-white dark:text-slate-900 text-sm font-black rounded-xl hover:shadow-lg hover:shadow-amber-500/20 hover:-translate-y-0.5 transition-all active:scale-95"
					>
						Start Free Trial
					</Link>

					{/* MOBILE TOGGLE */}
					<div className="flex md:hidden items-center gap-4">
						<ModeToggle />

						<button
							onClick={() => setIsOpen(!isOpen)}
							className="p-2 text-slate-900 dark:text-white focus:outline-none"
							aria-label="Toggle Menu"
						>
							<div className="w-6 h-5 relative flex flex-col justify-between">
								<motion.span
									animate={isOpen ? { rotate: 45, y: 9 } : { rotate: 0, y: 0 }}
									className="w-full h-0.5 bg-current rounded-full origin-center transition-all"
								/>
								<motion.span
									animate={
										isOpen ? { opacity: 0, x: -10 } : { opacity: 1, x: 0 }
									}
									className="w-full h-0.5 bg-current rounded-full transition-all"
								/>
								<motion.span
									animate={
										isOpen ? { rotate: -45, y: -9 } : { rotate: 0, y: 0 }
									}
									className="w-full h-0.5 bg-current rounded-full origin-center transition-all"
								/>
							</div>
						</button>
					</div>
				</div>

				{/* MOBILE DROPDOWN */}
				<AnimatePresence>
					{isOpen && (
						<>
							{/* Backdrop */}
							<motion.div
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								exit={{ opacity: 0 }}
								onClick={() => setIsOpen(false)}
								className="fixed inset-0 top-[72px] bg-slate-900/40 backdrop-blur-sm z-[-1]"
							/>

							{/* Menu Modal */}
							<motion.div
								variants={menuVariants}
								initial="closed"
								animate="open"
								exit="closed"
								className="absolute top-full left-4 right-4 mt-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-[2rem] shadow-2xl p-8 md:hidden overflow-hidden"
							>
								<div className="flex flex-col gap-6">
									{navLinks.map(item => (
										<motion.div key={item.name} variants={itemVariants}>
											<Link
												href={item.href}
												onClick={() => setIsOpen(false)}
												className="text-2xl font-black text-slate-900 dark:text-white flex items-center justify-between group"
											>
												{item.name}
												<span className="text-amber-500 opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all">
													→
												</span>
											</Link>
										</motion.div>
									))}

									<hr className="border-slate-100 dark:border-white/5 my-2" />

									<motion.div variants={itemVariants} className="space-y-4">
										<Link
											href={getAppUrl('/login')}
											onClick={() => setIsOpen(false)}
											className="block text-center font-bold text-slate-500 dark:text-slate-400 py-2"
										>
											Log in to Dashboard
										</Link>
										<Link
											href={getAppUrl('#pricing')}
											onClick={() => setIsOpen(false)}
											className="block w-full py-5 bg-amber-500 text-slate-900 font-black rounded-2xl text-center shadow-xl shadow-amber-500/20 text-lg active:scale-95 transition-transform"
										>
											Start Free Trial
										</Link>
									</motion.div>
								</div>
							</motion.div>
						</>
					)}
				</AnimatePresence>
			</nav>
		</header>
	);
}
