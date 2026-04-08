'use client';

import { motion } from 'framer-motion';
import { Star, ShieldCheck, Quote } from 'lucide-react';

const testimonials = [
	{
		quote:
			'Closed an $18k job at a higher margin just by using the 3-tier bid. Client picked the middle option without hesitation.',
		author: 'Jason R.',
		role: 'Remodeling Contractor',
		impact: '+22% Margin',
	},
	{
		quote:
			'Got paid on-site for the first time ever. No more chasing invoices. PayRail paid for itself in the first 48 hours.',
		author: 'Mike D.',
		role: 'General Contractor',
		impact: 'Paid Instantly',
	},
	{
		quote:
			'Clients stopped texting nonstop. They check smCrewLens updates and leave me alone to actually build. Life changer.',
		author: 'Sarah T.',
		role: 'Custom Home Builder',
		impact: '90% Less Texting',
	},
	{
		quote:
			"ScopeLock caught a $2,500 change order that I definitely would have 'thrown in for free' before. It's found money.",
		author: 'David L.',
		role: 'Electrical Sub',
		impact: '+$2.5k Saved',
	},
	{
		quote:
			"The Site Engine ranked me #1 for 'Kitchen Remodel' in my zip code within 3 weeks. The leads are actually qualified now.",
		author: 'Kevin M.',
		role: 'Kitchen & Bath Specialist',
		impact: 'Ranked #1 Locally',
	},
	{
		quote:
			"I was drowning in paperwork. BuildRail put my business on tracks. I'm finally home for dinner at 5 PM.",
		author: 'Chris B.',
		role: 'Deck & Patio Pro',
		impact: '10hrs Saved/Wk',
	},
];

export default function Testimonials() {
	return (
		<section className="py-32 bg-white dark:bg-slate-950 overflow-hidden border-t border-slate-100 dark:border-white/5">
			<div className="max-w-7xl mx-auto px-6 mb-20 text-center">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-900/30 border border-emerald-200 dark:border-emerald-500/20 mb-6"
				>
					<ShieldCheck className="w-4 h-4 text-emerald-600" />
					<span className="text-xs font-black uppercase tracking-widest text-emerald-700 dark:text-emerald-400">
						Verified Outcomes
					</span>
				</motion.div>

				<h2 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white mb-6 leading-tight tracking-tighter">
					Built for the Trades. <br />
					<span className="text-amber-500 italic">
						Trusted on the Job Site.
					</span>
				</h2>
			</div>

			{/* INFINITE SCROLL CAROUSEL */}
			<div className="relative flex overflow-x-hidden">
				<div className="flex animate-marquee whitespace-nowrap py-12">
					{[...testimonials, ...testimonials].map((t, i) => (
						<div
							key={i}
							className="inline-block w-[350px] md:w-[450px] mx-4 whitespace-normal"
						>
							<div className="h-full p-8 rounded-3xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
								<div className="flex gap-1 mb-4">
									{[...Array(5)].map((_, i) => (
										<Star
											key={i}
											className="w-4 h-4 fill-amber-500 text-amber-500"
										/>
									))}
								</div>

								<Quote className="w-8 h-8 text-slate-200 dark:text-slate-800 mb-4" />

								<p className="text-lg font-bold text-slate-700 dark:text-slate-200 mb-8 leading-relaxed">
									&ldquo;{t.quote}&rdquo;
								</p>

								<div className="flex items-center justify-between mt-auto pt-6 border-t border-slate-200 dark:border-slate-800">
									<div>
										<p className="text-sm font-black text-slate-900 dark:text-white">
											{t.author}
										</p>
										<p className="text-xs font-bold text-slate-500">{t.role}</p>
									</div>
									<div className="px-3 py-1 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] font-black rounded-lg uppercase">
										{t.impact}
									</div>
								</div>
							</div>
						</div>
					))}
				</div>

				{/* Fade Overlays for that high-end look */}
				<div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white dark:from-slate-950 to-transparent z-10" />
				<div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white dark:from-slate-950 to-transparent z-10" />
			</div>
		</section>
	);
}
