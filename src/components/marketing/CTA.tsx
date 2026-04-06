import Link from 'next/link';
import { motion } from 'framer-motion';

export default function CTA() {
	return (
		<section className="py-28 bg-slate-900 text-white px-6">
			<div className="max-w-3xl mx-auto text-center">
				<h2 className="text-4xl md:text-6xl font-black mb-6">
					Install Your System This Week
				</h2>

				<p className="text-lg text-slate-400 mb-10">
					Stop losing money to underpriced jobs, slow payments, and chaos. Get
					everything set up in days — not months.
				</p>

				<Link href="/jumpstart">
					<motion.button
						whileHover={{ scale: 1.05 }}
						whileTap={{ scale: 0.97 }}
						className="px-12 py-6 bg-white text-slate-900 font-black rounded-xl text-lg hover:bg-amber-400 transition-all shadow-xl"
					>
						Start Your $497 Jumpstart →
					</motion.button>
				</Link>

				<p className="text-sm text-slate-500 mt-6">
					No contracts. No learning curve. We set everything up for you.
				</p>
			</div>
		</section>
	);
}
