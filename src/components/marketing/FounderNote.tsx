import Link from 'next/link';
import { motion } from 'framer-motion';

export default function FounderNote() {
	return (
		<section className="py-28 bg-slate-50 dark:bg-slate-950 px-6">
			<div className="max-w-3xl mx-auto">
				<div className="bg-background text-foreground p-10 md:p-12 rounded-[2.5rem] border border-border border-border shadow-xl text-slate-700 dark:text-slate-300 leading-relaxed text-lg">
					{/* HEADER */}
					<div className="flex items-center gap-4 mb-8">
						<div className="w-16 h-16 rounded-full bg-slate-200 dark:bg-slate-800 border-2 border-amber-500 flex items-center justify-center text-2xl font-black text-foreground text-foreground">
							SD
						</div>

						<div>
							<p className="font-black text-foreground text-foreground text-xl leading-none">
								A note from the founder
							</p>
							<p className="text-muted dark:text-muted font-bold uppercase text-xs tracking-widest mt-1">
								BuildRail
							</p>
						</div>
					</div>

					{/* BODY */}
					<p className="mb-6 italic">
						&ldquo;I built BuildRail OS because I watched too many skilled
						contractors lose money—not because of their work, but because they
						didn’t have the systems behind them.&rdquo;
					</p>

					<p className="mb-6 italic">
						&ldquo;This isn’t software for the sake of software. It’s a way to
						run a tighter business, protect your margins, and finally get paid
						what your work is actually worth.&rdquo;
					</p>

					<p className="mb-10 italic">
						&ldquo;If that’s what you’ve been trying to fix, this will feel like
						flipping a switch.&rdquo;
					</p>

					{/* SIGNATURE */}
					<p className="mb-10 font-black text-foreground text-foreground text-xl">
						— Steve Dunn
					</p>

					{/* CTA BLOCK */}
					<div className="border-t border-border border-border pt-8 text-center">
						<p className="text-muted dark:text-muted mb-6 font-medium">
							Get your system installed in days — not months.
						</p>

						<Link href="/jumpstart">
							<motion.button
								whileHover={{ scale: 1.05 }}
								whileTap={{ scale: 0.97 }}
								className="px-10 py-5 bg-slate-900 text-white font-black rounded-xl hover:bg-amber-500 transition-all shadow-lg"
							>
								Start Your $497 Jumpstart →
							</motion.button>
						</Link>

						<p className="text-xs text-muted mt-4">
							No contracts. No complexity. Just a working system.
						</p>
					</div>
				</div>
			</div>
		</section>
	);
}
