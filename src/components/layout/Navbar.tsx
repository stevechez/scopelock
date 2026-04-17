'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Lock, Menu } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

	return (
		<motion.nav
			initial={{ y: -20, opacity: 0 }}
			animate={{ y: 0, opacity: 1 }}
			className="fixed top-0 inset-x-0 z-50 bg-white/70 dark:bg-slate-950/70 backdrop-blur-md border-b border-slate-200/50 dark:border-white/5"
		>
			<div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
				{/* LOGO */}
				<Link href="/" className="flex items-center gap-3 group">
					<div className="w-10 h-10 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl flex items-center justify-center transition-transform group-hover:scale-105">
						<Lock className="w-5 h-5" />
					</div>
					<div className="flex flex-col">
						<span className="font-black text-lg text-slate-900 dark:text-white leading-none tracking-tight uppercase italic">
							Blueprint <span className="text-amber-500">OS</span>
						</span>
						<span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">
							By BuildRail HQ
						</span>
					</div>
				</Link>

				{/* DESKTOP LINKS */}
				<div className="hidden md:flex items-center gap-8">
					<Link
						href="#blueprint"
						className="text-sm font-bold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors uppercase tracking-widest"
					>
						The System
					</Link>
					<Link
						href="#pricing"
						className="text-sm font-bold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors uppercase tracking-widest"
					>
						Pricing
					</Link>
					<div className="w-px h-6 bg-slate-200 dark:bg-slate-800" />{' '}
					{/* Divider */}
					<Link
						href="/login"
						className="text-sm font-bold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors uppercase tracking-widest"
					>
						Client Login
					</Link>
					<Link
						href="#pricing"
						className="bg-slate-900 dark:bg-white text-white dark:text-slate-950 px-6 py-2.5 rounded-lg font-black text-xs uppercase tracking-widest hover:bg-amber-500 dark:hover:bg-amber-500 dark:hover:text-white transition-all hover:scale-105 active:scale-95"
					>
						Get Jumpstart
					</Link>
				</div>

				{/* MOBILE TOGGLE */}
				<button
					className="md:hidden p-2 text-slate-600 dark:text-slate-400"
					onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
				>
					<Menu className="w-6 h-6" />
				</button>
			</div>

			{/* MOBILE MENU (Simplified) */}
			{isMobileMenuOpen && (
				<div className="md:hidden bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-white/5 p-6 flex flex-col gap-4 shadow-2xl">
					<Link
						href="#blueprint"
						className="font-bold text-slate-900 dark:text-white uppercase tracking-widest"
					>
						The System
					</Link>
					<Link
						href="#pricing"
						className="font-bold text-slate-900 dark:text-white uppercase tracking-widest"
					>
						Pricing
					</Link>
					<Link
						href="/login"
						className="font-bold text-slate-900 dark:text-white uppercase tracking-widest"
					>
						Client Login
					</Link>
				</div>
			)}
		</motion.nav>
	);
}
