'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence, Variants } from 'framer-motion'; // <-- Add Variants here
import { ModeToggle } from '@/components/ModeToggle';
import { getAppUrl } from '@/utils/urls';

export default function Navbar() {
	const [isOpen, setIsOpen] = useState(false);
	const [scrolled, setScrolled] = useState(false);

	// --- Animation Variants ---
	// Add the ': Variants' type here
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
			className={`fixed top-0 left-0 right-0 z-[100] border-b transition-all duration-300 ${
				scrolled
					? 'bg-white/90 dark:bg-slate-950/90 backdrop-blur-md py-3 shadow-sm'
					: 'bg-background text-foreground py-5' // Added solid bg here to prevent overlap
			} border-border dark:border-white/10`}
		>
			<nav className="max-w-7xl mx-auto px-6 flex justify-between items-center">
				{/* LOGO */}
				<Link
					href="/"
					className="text-2xl md:text-3xl font-black tracking-tighter text-foreground text-foreground group flex items-center gap-1"
				>
					BUILD
					<span className="text-amber-500 transition-colors group-hover:text-amber-400">
						RAIL
					</span>
				</Link>

				{/* DESKTOP LINKS - Precision spacing and sizing */}
				<div className="hidden md:flex items-center gap-10">
					{['Features', 'Blueprint', 'Pricing'].map(item => (
						<Link
							key={item}
							href={`#${item.toLowerCase()}`}
							className="text-sm font-bold text-muted dark:text-muted hover:text-foreground dark:hover:text-white transition-colors"
						>
							{item}
						</Link>
					))}
				</div>

				{/* RIGHT SECTION */}
				<div className="flex items-center gap-4">
					<div className="hidden sm:flex items-center gap-6 mr-2">
						{/* <ModeToggle /> */}
						<Link
							href={getAppUrl('/login')}
							className="text-sm font-bold text-muted dark:text-muted hover:text-foreground dark:hover:text-white transition-colors"
						>
							Log in
						</Link>
					</div>

					<Link
						href={getAppUrl('#pricing')}
						className="hidden sm:block px-5 py-2.5 bg-slate-900 dark:bg-amber-500 text-white dark:text-foreground text-sm font-black rounded-xl hover:shadow-[0_0_20px_rgba(245,158,11,0.3)] transition-all active:scale-95"
					>
						Start Free Trial
					</Link>

					{/* MOBILE TOGGLE (Includes ModeToggle for mobile users) */}
					<div className="flex md:hidden items-center gap-2">
						<ModeToggle />

						<button
							onClick={() => setIsOpen(!isOpen)}
							className="p-2 text-foreground text-foreground focus:outline-none"
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
							<motion.div
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								exit={{ opacity: 0 }}
								onClick={() => setIsOpen(false)}
								className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[-1]"
							/>

							<motion.div
								variants={menuVariants}
								initial="closed"
								animate="open"
								exit="closed"
								className="absolute top-full left-4 right-4 mt-3 bg-background text-foreground border border-border dark:border-white/10 rounded-3xl shadow-2xl p-8 md:hidden"
							>
								<div className="flex flex-col gap-8">
									{['Features', 'Blueprint', 'Pricing'].map(item => (
										<motion.div key={item} variants={itemVariants}>
											<Link
												href={`#${item.toLowerCase()}`}
												onClick={() => setIsOpen(false)}
												className="text-2xl font-black text-foreground text-foreground flex items-center justify-between"
											>
												{item}
												<span className="text-amber-500 text-sm">→</span>
											</Link>
										</motion.div>
									))}
									<hr className="border-border dark:border-white/5" />
									<motion.div variants={itemVariants} className="space-y-4">
										<Link
											href={getAppUrl('/login')}
											className="block text-center font-bold text-muted py-2"
										>
											Log in to Dashboard
										</Link>
										<Link
											href={getAppUrl('/signup')}
											onClick={() => setIsOpen(false)}
											className="block w-full py-5 bg-amber-500 text-foreground font-black rounded-2xl text-center shadow-xl shadow-amber-500/20 text-lg"
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
