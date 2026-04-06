'use client';

import Image from 'next/image';

export default function ProductModules() {
	return (
		<section id="features" className="py-32 px-6 space-y-32">
			{/* MASTER HEADER */}
			<div className="text-center max-w-3xl mx-auto">
				<h2 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white mb-6">
					From First Click → Final Payment
				</h2>
				<p className="text-lg text-slate-500 dark:text-slate-400">
					Every step of your business, systemized to attract better jobs, close
					at higher prices, and get paid faster.
				</p>
			</div>

			{/* STEP 01 */}
			<div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-16">
				<div className="flex-1">
					<div className="text-indigo-600 font-black tracking-widest text-sm mb-4 uppercase">
						Step 01 — Attract
					</div>

					<h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-6">
						Get Found First. Look Like the Premium Option.
					</h2>

					<p className="text-lg text-slate-600 dark:text-slate-400 mb-6">
						Most contractor websites silently kill high-value jobs before you
						even know they existed.
					</p>

					<p className="text-lg text-slate-600 dark:text-slate-400">
						The <strong>Site Engine</strong> turns your site into a 24/7 sales
						machine that ranks locally, captures serious leads, and positions
						you as the obvious choice.
					</p>

					<div className="flex gap-6 mt-6 text-sm font-bold text-slate-400">
						<span>📍 Rank locally</span>
						<span>📈 More inbound leads</span>
						<span>💰 Higher-value jobs</span>
					</div>
				</div>

				<div className="flex-1 w-full">
					<Image
						src="/images/site-engine-preview.jpg"
						alt=""
						width={800}
						height={600}
						className="rounded-2xl shadow-2xl"
					/>
				</div>
			</div>

			{/* CONNECTOR */}
			<div className="text-center text-slate-300 dark:text-slate-700 text-sm font-bold tracking-widest">
				↓ NEXT STEP
			</div>

			{/* STEP 02 */}
			<div className="max-w-6xl mx-auto flex flex-col md:flex-row-reverse items-center gap-16">
				<div className="flex-1">
					<div className="text-amber-600 font-black tracking-widest text-sm mb-4 uppercase">
						Step 02 — Close
					</div>

					<h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-6">
						Close Higher-Priced Jobs Without Pushback
					</h2>

					<p className="text-lg text-slate-600 dark:text-slate-400 mb-6">
						Most contractors underprice because they don’t control the
						conversation.
					</p>

					<p className="text-lg text-slate-600 dark:text-slate-400">
						The <strong>Comm Vault</strong> gives you 3-tier proposals and
						proven scripts that anchor your pricing higher and handle objections
						automatically.
					</p>

					<div className="flex gap-6 mt-6 text-sm font-bold text-slate-400">
						<span>📊 Anchor pricing higher</span>
						<span>⚡ Faster decisions</span>
						<span>💰 Bigger job values</span>
					</div>
				</div>

				<div className="flex-1 w-full">
					<Image
						src="/images/commvault.jpg"
						alt=""
						width={800}
						height={600}
						className="rounded-2xl shadow-2xl"
					/>
				</div>
			</div>

			<div className="text-center text-slate-300 dark:text-slate-700 text-sm font-bold tracking-widest">
				↓ NEXT STEP
			</div>

			{/* STEP 03 */}
			<div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-16">
				<div className="flex-1">
					<div className="text-indigo-600 font-black tracking-widest text-sm mb-4 uppercase">
						Step 03 — Protect
					</div>

					<h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-6">
						Lock In Every Dollar You Earn
					</h2>

					<p className="text-lg text-slate-600 dark:text-slate-400 mb-6">
						Scope creep quietly destroys your margins.
					</p>

					<p className="text-lg text-slate-600 dark:text-slate-400">
						<strong>ScopeLock™</strong> captures change orders instantly,
						ensuring every extra request becomes paid work—not lost profit.
					</p>

					<div className="flex gap-6 mt-6 text-sm font-bold text-slate-400">
						<span>🛑 Stop unpaid work</span>
						<span>💵 Capture add-ons instantly</span>
						<span>📈 Protect margins</span>
					</div>
				</div>

				<div className="flex-1 w-full">
					<div className="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-2xl border">
						+ $2,500 Change Order Approved
					</div>
				</div>
			</div>

			<div className="text-center text-slate-300 dark:text-slate-700 text-sm font-bold tracking-widest">
				↓ NEXT STEP
			</div>

			{/* STEP 04 */}
			<div className="max-w-6xl mx-auto flex flex-col md:flex-row-reverse items-center gap-16">
				<div className="flex-1">
					<div className="text-amber-600 font-black tracking-widest text-sm mb-4 uppercase">
						Step 04 — Get Paid
					</div>

					<h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-6">
						Get Paid Before You Leave the Job Site
					</h2>

					<p className="text-lg text-slate-600 dark:text-slate-400 mb-6">
						Waiting 30 days to get paid kills cash flow.
					</p>

					<p className="text-lg text-slate-600 dark:text-slate-400">
						<strong>SiteDraft™</strong> lets you send instant payment links via
						SMS so clients pay on the spot.
					</p>

					<div className="flex gap-6 mt-6 text-sm font-bold text-slate-400">
						<span>⚡ Instant payments</span>
						<span>📱 SMS billing</span>
						<span>💰 Better cash flow</span>
					</div>
				</div>

				<div className="flex-1 w-full">
					<div className="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-2xl border">
						Send Invoice → Paid
					</div>
				</div>
			</div>

			<div className="text-center text-slate-300 dark:text-slate-700 text-sm font-bold tracking-widest">
				↓ FINAL STEP
			</div>

			{/* STEP 05 */}
			<div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-16">
				<div className="flex-1">
					<div className="text-green-600 font-black tracking-widest text-sm mb-4 uppercase">
						Step 05 — Update
					</div>

					<h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-6">
						Keep Clients Informed Without the Headaches
					</h2>

					<p className="text-lg text-slate-600 dark:text-slate-400 mb-6">
						Constant client check-ins waste time and energy.
					</p>

					<p className="text-lg text-slate-600 dark:text-slate-400">
						<strong>smCrewLens™</strong> creates a live project feed with photos
						and updates so clients stay informed without bothering you.
					</p>

					<div className="flex gap-6 mt-6 text-sm font-bold text-slate-400">
						<span>📸 Visual updates</span>
						<span>📉 Fewer interruptions</span>
						<span>😌 Less stress</span>
					</div>
				</div>

				<div className="flex-1 w-full">
					<div className="bg-slate-900 text-white p-6 rounded-2xl shadow-2xl">
						Daily site update feed
					</div>
				</div>
			</div>
		</section>
	);
}
