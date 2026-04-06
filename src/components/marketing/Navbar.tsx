'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ModeToggle } from '@/components/ModeToggle';

export default function Navbar() {
	const [isOpen, setIsOpen] = useState(false);

	// Animation variants for the mobile menu
	const menuVariants = {
		closed: {
			opacity: 0,
			y: -20,
			transition: { staggerChildren: 0.05, staggerDirection: -1 },
		},
		open: {
			opacity: 1,
			y: 0,
			transition: { staggerChildren: 0.1, delayChildren: 0.2 },
		},
	};

	const itemVariants = {
		closed: { opacity: 0, x: -10 },
		open: { opacity: 1, x: 0 },
	};

	return (
		<nav className="relative z-[100] flex justify-between items-center px-6 py-6 max-w-7xl mx-auto">
			{/* LOGO */}
			<Link
				href="/"
				className="text-2xl font-black tracking-tighter text-slate-900 dark:text-white group"
			>
				BLUEPRINT
				<span className="text-amber-500 transition-colors group-hover:text-amber-400">
					OS
				</span>
			</Link>

			{/* DESKTOP LINKS */}
			<div className="hidden md:flex gap-8 font-bold text-sm text-slate-500 dark:text-slate-400">
				{['Features', 'Blueprint', 'Pricing'].map(item => (
					<Link
						key={item}
						href={`#${item.toLowerCase()}`}
						className="hover:text-slate-900 dark:hover:text-white transition-colors"
					>
						{item}
					</Link>
				))}
			</div>

			{/* RIGHT SECTION: UTILS & HAMBURGER */}
			<div className="flex items-center gap-3 sm:gap-6">
				<ModeToggle />

				{/* Desktop Actions */}
				<Link
					href="/login"
					className="hidden sm:block font-bold text-sm text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
				>
					Log in
				</Link>
				<Link
					href="#pricing"
					className="hidden sm:block px-5 py-2.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-sm font-bold rounded-xl hover:scale-105 active:scale-95 transition-all shadow-lg"
				>
					Start Free Trial
				</Link>

				{/* MOBILE HAMBURGER BUTTON */}
				<button
					onClick={() => setIsOpen(!isOpen)}
					className="md:hidden p-2 text-slate-900 dark:text-white focus:outline-none"
					aria-label="Toggle Menu"
				>
					<div className="w-6 h-5 relative flex flex-col justify-between">
						<motion.span
							animate={isOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
							className="w-full h-0.5 bg-current rounded-full origin-left transition-all"
						/>
						<motion.span
							animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
							className="w-full h-0.5 bg-current rounded-full transition-all"
						/>
						<motion.span
							animate={isOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
							className="w-full h-0.5 bg-current rounded-full origin-left transition-all"
						/>
					</div>
				</button>
			</div>

			{/* MOBILE DROPDOWN MENU */}
			<AnimatePresence>
				{isOpen && (
					<>
						{/* Backdrop to close menu when clicking outside */}
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							onClick={() => setIsOpen(false)}
							className="fixed inset-0 bg-slate-900/20 dark:bg-black/40 backdrop-blur-sm z-[-1] md:hidden"
						/>

						<motion.div
							variants={menuVariants}
							initial="closed"
							animate="open"
							exit="closed"
							className="absolute top-full left-6 right-6 mt-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-2xl shadow-2xl p-6 md:hidden overflow-hidden"
						>
							<div className="flex flex-col gap-6">
								{['Features', 'Blueprint', 'Pricing'].map(item => (
									<motion.div key={item} variants={itemVariants}>
										<Link
											href={`#${item.toLowerCase()}`}
											onClick={() => setIsOpen(false)}
											className="text-lg font-black text-slate-900 dark:text-white"
										>
											{item}
										</Link>
									</motion.div>
								))}
								<hr className="border-slate-100 dark:border-white/5" />
								<motion.div
									variants={itemVariants}
									className="flex flex-col gap-4"
								>
									<Link
										href="/login"
										className="text-lg font-bold text-slate-500"
									>
										Log in
									</Link>
									<Link
										href="#pricing"
										onClick={() => setIsOpen(false)}
										className="w-full py-4 bg-amber-500 text-slate-900 font-black rounded-xl text-center shadow-lg shadow-amber-500/20"
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
	);
}
