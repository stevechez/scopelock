'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, X, Loader2 } from 'lucide-react';
import { getSubscriptionCheckoutURL } from '@/app/actions';

const fadeInUp = {
	initial: { opacity: 0, y: 20 },
	whileInView: { opacity: 1, y: 0 },
	viewport: { once: true },
	transition: { duration: 0.5, ease: 'easeOut' },
} as const;

export default function Pricing() {
	// We track WHICH tier is loading so the correct button spins
	const [loadingTier, setLoadingTier] = useState<string | null>(null);

	const handleCheckout = async (tierName: string, variantId: string) => {
		setLoadingTier(tierName);
		try {
			// Pass the Lemon Squeezy Variant ID to your backend
			const url = await getSubscriptionCheckoutURL(variantId);
			if (url) {
				window.location.href = url;
			}
		} catch (err) {
			console.error(err);
			alert('Could not load checkout. Please try again.');
			setLoadingTier(null);
		}
	};

	return (
		<section
			id="pricing"
			className="py-32 bg-slate-50 dark:bg-slate-950 px-6 relative overflow-hidden border-t border-slate-200 dark:border-slate-800"
		>
			<div className="max-w-6xl mx-auto relative z-10">
				{/* HEADER */}
				<motion.div {...fadeInUp} className="text-center mb-20">
					<h2 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white mb-6 tracking-tighter uppercase italic">
						Scale on your terms.
					</h2>
					<p className="text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto font-medium">
						Priced at less than one billable hour per month. No corporate
						hoops—if the system doesn&apos;t immediately pay for itself, just
						message Steve directly.
					</p>
				</motion.div>

				{/* PRICING GRID (3 COLUMNS) */}
				<div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
					{/* TIER 1: COMM VAULT */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						className="p-8 rounded-[2rem] bg-white dark:bg-[#0B101E] border border-slate-200 dark:border-white/5 flex flex-col"
					>
						<div className="mb-6">
							<h3 className="text-xl font-black text-slate-900 dark:text-white mb-2">
								Comm Vault
							</h3>
							<div className="flex items-baseline gap-1">
								<span className="text-4xl font-black text-slate-900 dark:text-white tracking-tighter">
									$29
								</span>
								<span className="text-slate-500 dark:text-slate-400 font-bold text-sm">
									/mo
								</span>
							</div>
						</div>
						<ul className="space-y-4 mb-8 flex-grow">
							<li className="flex items-center gap-3 text-slate-600 dark:text-slate-300 font-medium text-sm">
								<Check className="w-4 h-4 text-emerald-500 shrink-0" />
								<span>BidForge™ Estimator</span>
							</li>
							<li className="flex items-center gap-3 text-slate-600 dark:text-slate-300 font-medium text-sm">
								<Check className="w-4 h-4 text-emerald-500 shrink-0" />
								<span>Full AI Script Library</span>
							</li>
							<li className="flex items-center gap-3 text-slate-600 dark:text-slate-300 font-medium text-sm">
								<Check className="w-4 h-4 text-emerald-500 shrink-0" />
								<span>Mobile Access</span>
							</li>
							<li className="flex items-center gap-3 text-slate-400 dark:text-slate-600 font-medium text-sm">
								<X className="w-4 h-4 text-red-400 shrink-0" />
								<span>Custom Website</span>
							</li>
						</ul>
						<button
							onClick={() => handleCheckout('tier-1', '1467148')}
							disabled={loadingTier !== null}
							className="w-full py-3 px-4 rounded-xl bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-center font-bold text-sm hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors flex items-center justify-center"
						>
							{loadingTier === 'tier-1' ? (
								<Loader2 className="w-4 h-4 animate-spin" />
							) : (
								'Start Free Trial'
							)}
						</button>
					</motion.div>

					{/* TIER 2: THE FULL BLUEPRINT (HIGHLIGHTED) */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ delay: 0.1 }}
						className="p-8 rounded-[2rem] bg-slate-900 dark:bg-[#0B101E] border-2 border-amber-500 shadow-2xl relative flex flex-col transform md:-translate-y-4"
					>
						<div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-500 text-slate-950 px-4 py-1 rounded-full font-black text-[10px] uppercase tracking-widest flex items-center gap-1 shadow-lg whitespace-nowrap">
							The Full Blueprint
						</div>

						<div className="mb-6">
							<h3 className="text-xl font-black text-white mb-2">
								Platform Access
							</h3>
							<div className="flex items-baseline gap-1">
								<span className="text-4xl font-black text-white tracking-tighter">
									$49
								</span>
								<span className="text-slate-400 font-bold text-sm">/mo</span>
							</div>
						</div>
						<ul className="space-y-4 mb-8 flex-grow">
							<li className="flex items-center gap-3 text-slate-300 font-medium text-sm">
								<Check className="w-4 h-4 text-amber-500 shrink-0" />
								<span className="font-bold text-amber-500">
									Site Engine Hosting
								</span>
							</li>
							<li className="flex items-center gap-3 text-slate-300 font-medium text-sm">
								<Check className="w-4 h-4 text-emerald-500 shrink-0" />
								<span>Comm Vault Included</span>
							</li>
							<li className="flex items-center gap-3 text-slate-300 font-medium text-sm">
								<Check className="w-4 h-4 text-emerald-500 shrink-0" />
								<span>ScopeLock™ Change Orders</span>
							</li>
							<li className="flex items-center gap-3 text-slate-300 font-medium text-sm">
								<Check className="w-4 h-4 text-emerald-500 shrink-0" />
								<span>PayRail™ SMS Payments</span>
							</li>
							<li className="flex items-center gap-3 text-slate-300 font-medium text-sm">
								<Check className="w-4 h-4 text-emerald-500 shrink-0" />
								<span>CrewLens™ Daily Logs</span>
							</li>
						</ul>
						<button
							onClick={() => handleCheckout('tier-2', '1538468')}
							disabled={loadingTier !== null}
							className="w-full py-3 px-4 rounded-xl bg-amber-500 text-slate-950 text-center font-bold text-sm hover:bg-amber-400 transition-all flex items-center justify-center gap-2"
						>
							{loadingTier === 'tier-2' ? (
								<Loader2 className="animate-spin w-4 h-4" />
							) : (
								'Get the Full Suite'
							)}
						</button>
					</motion.div>

					{/* TIER 3: COMING SOON */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ delay: 0.2 }}
						className="p-8 rounded-[2rem] bg-slate-50 dark:bg-[#0B101E] border border-slate-200 dark:border-white/5 flex flex-col opacity-75"
					>
						<div className="mb-6">
							<span className="inline-block px-2 py-1 bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-[10px] font-black uppercase tracking-widest rounded mb-3">
								Coming Soon
							</span>
							<h3 className="text-xl font-black text-slate-900 dark:text-white mb-2">
								Blueprint Pro +
							</h3>
						</div>
						<ul className="space-y-4 mb-8 flex-grow">
							<li className="flex items-center gap-3 text-slate-500 dark:text-slate-400 font-medium text-sm italic">
								<span>✨ SiteVerdict Integration</span>
							</li>
							<li className="flex items-center gap-3 text-slate-500 dark:text-slate-400 font-medium text-sm italic">
								<span>✨ Automated Lead Audits</span>
							</li>
							<li className="flex items-center gap-3 text-slate-500 dark:text-slate-400 font-medium text-sm italic">
								<span>✨ Advanced Analytics</span>
							</li>
						</ul>
						<button
							disabled
							className="w-full py-3 px-4 rounded-xl bg-slate-200 dark:bg-slate-800/30 text-slate-400 dark:text-slate-600 text-center font-bold text-sm cursor-not-allowed"
						>
							Stay Updated
						</button>
					</motion.div>
				</div>
			</div>
		</section>
	);
}
