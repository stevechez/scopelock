import Link from 'next/link';
import { motion } from 'framer-motion';

export default function CTA() {
	return (
		<section className="py-28 bg-slate-900 text-white px-6">
			<div
				id="jumpstart"
				className="bg-slate-900 dark:bg-slate-800 p-8 rounded-[2.5rem] border-2 border-amber-500 shadow-2xl text-white"
			>
				<div className="w-12 h-12 bg-amber-500 text-slate-900 rounded-xl flex items-center justify-center text-2xl mb-6 font-black">
					🚀
				</div>
				<h3 className="text-2xl font-black mb-4 italic text-amber-500">
					The $497 Jumpstart
				</h3>
				<p className="text-slate-400 mb-6 font-medium leading-tight text-sm">
					We take the office off your plate entirely.
				</p>
				<ul className="space-y-4 font-medium text-sm">
					<li className="flex items-start gap-3">
						<span className="text-amber-500">✅</span>
						<span>**Full Site Build:** Hand-crafted by our team.</span>
					</li>
					<li className="flex items-start gap-3">
						<span className="text-amber-500">✅</span>
						<span>**SEO Optimized:** Rank locally from Day 1.</span>
					</li>
					<li className="flex items-start gap-3">
						<span className="text-amber-500">✅</span>
						<span>**Vault Config:** Custom script setup included.</span>
					</li>
				</ul>
				<Link
					href="/jumpstart"
					className="w-full mt-8 py-4 bg-white text-slate-900 font-black rounded-xl hover:bg-amber-500 transition-all flex items-center justify-center"
				>
					Claim a Jumpstart Slot
				</Link>
			</div>
		</section>
	);
}
