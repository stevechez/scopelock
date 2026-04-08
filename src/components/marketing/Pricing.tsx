import Link from 'next/link';

export default function Pricing() {
	return (
		<>
			<section
				id="pricing"
				className="py-24 bg-slate-50 dark:bg-slate-900/50 px-6"
			>
				<div className="max-w-6xl mx-auto">
					<div className="text-center mb-16">
						<h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-4">
							Simple, Transparent Pricing
						</h2>
						<p className="text-xl text-slate-500 dark:text-slate-400 font-medium">
							Build your system today. Scale your business tomorrow.
						</p>
					</div>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
						{/* TIER 1 */}
						<div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 flex flex-col justify-between">
							<div>
								<h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
									Comm Vault
								</h3>
								<div className="flex items-baseline gap-1 mb-6">
									<span className="text-4xl font-black dark:text-white">
										$29
									</span>
									<span className="text-slate-500 font-bold">/mo</span>
								</div>
								<ul className="space-y-4 mb-8 dark:text-slate-300">
									<li>✅ 3-Tier Bid Estimator</li>
									<li>✅ Full AI Script Library</li>
									<li>✅ Mobile Access</li>
									<li className="text-slate-400 dark:text-slate-600">
										❌ Custom Website
									</li>
								</ul>
							</div>
							<Link
								href="/signup"
								className="w-full py-4 border-2 border-slate-900 dark:border-slate-700 text-slate-900 dark:text-white font-bold rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-all text-center"
							>
								Start Free Trial
							</Link>
						</div>
						{/* TIER 2 */}
						<div className="bg-slate-900 p-8 rounded-3xl border-4 border-amber-500 flex flex-col justify-between relative transform md:scale-110 shadow-2xl z-10 text-white">
							<div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-amber-500 text-slate-900 font-black px-4 py-1 rounded-full text-sm uppercase">
								Most Popular
							</div>
							<div>
								<h3 className="text-xl font-bold mb-2">The Full Build</h3>
								<div className="flex items-baseline gap-1 mb-6">
									<span className="text-4xl font-black">$49</span>
									<span className="text-slate-400 font-bold">/mo</span>
								</div>
								<ul className="space-y-4 mb-8">
									<li className="font-bold text-amber-400">
										✅ Custom Site & Hosting
									</li>
									<li>✅ Full AI Script Library</li>
									<li>✅ Unlimited Lead Storage</li>
									<li>✅ Priority Support</li>
								</ul>
							</div>
							<Link
								href="/signup"
								className="w-full py-4 bg-amber-500 text-slate-900 font-black rounded-xl hover:bg-amber-400 transition-all shadow-lg text-center"
							>
								Get the Full Suite
							</Link>
						</div>
						{/* TIER 3 */}
						<div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 flex flex-col justify-between opacity-80">
							<div>
								<div className="mb-4">
									<span className="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 font-bold text-xs rounded-full uppercase tracking-tighter">
										Coming Soon
									</span>
								</div>
								<h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
									BuildRail
								</h3>
								<ul className="space-y-4 mb-8 italic text-slate-500 dark:text-slate-400">
									<li>✨ SiteVerdict Integration</li>
									<li>✨ Automated Lead Audits</li>
									<li>✨ Advanced Analytics</li>
								</ul>
							</div>
							<button
								disabled
								className="w-full py-4 bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-600 font-bold rounded-xl cursor-not-allowed"
							>
								Stay Updated
							</button>
						</div>
					</div>
				</div>
			</section>
		</>
	);
}
