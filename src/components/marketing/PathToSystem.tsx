export default function PathToSystem() {
	return (
		<section className="py-32 bg-white dark:bg-slate-950 px-6 border-y border-slate-100 dark:border-slate-900">
			<div className="max-w-6xl mx-auto text-center">
				{/* HEADLINE */}
				<h2 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white mb-6 tracking-tight">
					From Chaos → Control → Profit
				</h2>

				<p className="text-xl text-slate-500 dark:text-slate-400 mb-20 max-w-2xl mx-auto">
					BlueprintOS installs the systems that eliminate free work, accelerate
					cash flow, and make every job predictable.
				</p>

				{/* STEPS */}
				<div className="grid grid-cols-1 md:grid-cols-3 gap-10 relative">
					{/* CONNECTOR LINE */}
					<div className="hidden md:block absolute top-1/2 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-slate-200 dark:via-slate-700 to-transparent -z-10" />

					{/* STEP 1 */}
					<div className="group relative">
						<div className="p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all duration-300 group-hover:-translate-y-1">
							<div className="w-14 h-14 bg-slate-900 text-white rounded-xl flex items-center justify-center text-xl font-black mx-auto mb-6 group-hover:bg-indigo-600 transition-colors">
								01
							</div>

							<h3 className="text-2xl font-black text-slate-900 dark:text-white mb-3">
								Capture Every Dollar
							</h3>

							<p className="text-slate-500 dark:text-slate-400 leading-relaxed">
								Lock in change orders instantly and eliminate thousands in
								missed revenue on every job.
							</p>
						</div>
					</div>

					{/* STEP 2 */}
					<div className="group relative">
						<div className="p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all duration-300 group-hover:-translate-y-1">
							<div className="w-14 h-14 bg-slate-900 text-white rounded-xl flex items-center justify-center text-xl font-black mx-auto mb-6 group-hover:bg-amber-500 transition-colors">
								02
							</div>

							<h3 className="text-2xl font-black text-slate-900 dark:text-white mb-3">
								Get Paid On-Site
							</h3>

							<p className="text-slate-500 dark:text-slate-400 leading-relaxed">
								Send milestone payment links via SMS and eliminate Net-30 delays
								forever.
							</p>
						</div>
					</div>

					{/* STEP 3 */}
					<div className="group relative">
						<div className="p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all duration-300 group-hover:-translate-y-1">
							<div className="w-14 h-14 bg-slate-900 text-white rounded-xl flex items-center justify-center text-xl font-black mx-auto mb-6 group-hover:bg-green-500 transition-colors">
								03
							</div>

							<h3 className="text-2xl font-black text-slate-900 dark:text-white mb-3">
								Run Jobs on Autopilot
							</h3>

							<p className="text-slate-500 dark:text-slate-400 leading-relaxed">
								Track progress, reduce client friction, and scale your margins
								without adding overhead.
							</p>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
