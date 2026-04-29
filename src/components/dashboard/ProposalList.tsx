'use client';

// 1. Import the specific 'Variants' type from framer-motion
import { motion, Variants } from 'framer-motion';

// 2. Define exactly what a Proposal looks like (No more 'any')
export type Proposal = {
	id: string;
	title: string;
	status: string;
	amount: number | string; // Supabase decimals sometimes return as strings
};

export default function ProposalList({ proposals }: { proposals: Proposal[] }) {
	// 3. Strongly type the animation configurations
	const container: Variants = {
		hidden: { opacity: 0 },
		show: { opacity: 1, transition: { staggerChildren: 0.1 } },
	};

	const item: Variants = {
		hidden: { opacity: 0, x: -20 },
		show: {
			opacity: 1,
			x: 0,
			transition: { type: 'spring', stiffness: 300, damping: 24 },
		},
	};

	if (!proposals || proposals.length === 0) {
		return (
			<p className="text-muted font-bold text-center py-8 border border-dashed border-slate-700 rounded-xl">
				No active proposals.
			</p>
		);
	}

	return (
		<motion.div
			variants={container}
			initial="hidden"
			animate="show"
			className="space-y-4"
		>
			{proposals.map(prop => (
				<motion.div
					key={prop.id}
					variants={item}
					className="flex justify-between items-center bg-slate-800 p-4 rounded-xl border border-slate-700 hover:border-amber-500/50 transition-colors"
				>
					<div>
						<div className="font-bold text-white">{prop.title}</div>
						<div className="text-xs text-muted uppercase tracking-widest mt-1 font-bold">
							Status: {prop.status}
						</div>
					</div>
					<div className="font-black text-amber-500 text-lg">
						${Number(prop.amount).toLocaleString()}
					</div>
				</motion.div>
			))}
		</motion.div>
	);
}
