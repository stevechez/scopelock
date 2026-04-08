export default function SocialProof() {
	return (
		<section className="py-14 border-y border-slate-100 dark:border-slate-800/50 bg-slate-50/50 dark:bg-slate-900/20">
			<div className="max-w-6xl mx-auto px-6 text-center">
				{/* QUALIFIER */}
				<p className="text-sm font-bold text-amber-500 uppercase tracking-widest mb-10">
					Built for Contractors Scaling from $250K → $2M+
				</p>

				{/* PROOF STATS (NEW — HUGE IMPACT) */}
				<div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
					<div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm">
						<div className="text-2xl font-black text-slate-900 dark:text-white mb-1">
							+18%
						</div>
						<div className="text-sm text-slate-500">
							Average Margin Increase
						</div>
					</div>

					<div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm">
						<div className="text-2xl font-black text-slate-900 dark:text-white mb-1">
							3x Faster
						</div>
						<div className="text-sm text-slate-500">Payments Collected</div>
					</div>

					<div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm">
						<div className="text-2xl font-black text-slate-900 dark:text-white mb-1">
							-90%
						</div>
						<div className="text-sm text-slate-500">Client Check-ins</div>
					</div>
				</div>

				{/* TESTIMONIAL (UPGRADED) */}
				<blockquote className="text-xl md:text-2xl font-medium text-slate-700 dark:text-slate-300 italic mb-6 max-w-3xl mx-auto">
					“BuildRail saved me 10+ hours a week and helped me close an $18K HVAC
					job at full price — without going back and forth with the client.”
				</blockquote>

				<div className="font-bold text-slate-900 dark:text-white">
					— Mike R., HVAC Contractor
				</div>
			</div>
		</section>
	);
}
