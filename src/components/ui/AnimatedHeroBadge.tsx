'use client';
import { motion } from 'framer-motion';

export default function AnimatedHeroBadge({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			className="inline-block px-4 py-1.5 bg-amber-100 text-amber-700 font-bold text-sm rounded-full mb-6 border border-amber-200"
		>
			{children}
		</motion.div>
	);
}
