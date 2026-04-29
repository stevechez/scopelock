'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

export default function StickyCTA() {
	const [showStickyCTA, setShowStickyCTA] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			setShowStickyCTA(window.scrollY > 600);
		};
		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	return (
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
						className="w-full md:w-auto px-8 py-3 bg-amber-500 text-foreground font-black rounded-xl hover:bg-amber-400 transition-all text-center"
					>
						Start Free Trial
					</Link>
				</motion.div>
			)}
		</AnimatePresence>
	);
}
