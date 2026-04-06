import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Testimonials() {
	return (
		<section className="py-24 bg-white dark:bg-slate-950 px-6 border-t border-slate-200 dark:border-slate-800">
			<div className="max-w-5xl mx-auto text-center">
				<h2 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white mb-6">
					What Happens When You Install The System
				</h2>

				<p className="text-lg text-slate-500 dark:text-slate-400 mb-16">
					Real contractors. Real outcomes.
				</p>

				<div className="grid md:grid-cols-3 gap-8">
					<div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-left">
						<p className="font-medium text-slate-700 dark:text-slate-300 mb-4">
							“Closed a $18k job at a higher margin just by using the 3-tier
							bid. Client picked the middle option without hesitation.”
						</p>
						<p className="text-sm font-black text-slate-900 dark:text-white">
							— Remodeling Contractor
						</p>
					</div>

					<div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-left">
						<p className="font-medium text-slate-700 dark:text-slate-300 mb-4">
							“Got paid on-site for the first time ever. No more chasing
							invoices. This alone paid for itself instantly.”
						</p>
						<p className="text-sm font-black text-slate-900 dark:text-white">
							— General Contractor
						</p>
					</div>

					<div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-left">
						<p className="font-medium text-slate-700 dark:text-slate-300 mb-4">
							“Clients stopped texting nonstop. They just check updates in one
							place. Way less stress.”
						</p>
						<p className="text-sm font-black text-slate-900 dark:text-white">
							— Home Services Owner
						</p>
					</div>
				</div>
			</div>
		</section>
	);
}
