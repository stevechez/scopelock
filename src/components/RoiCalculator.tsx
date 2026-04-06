'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';

export default function ROICalculator() {
	const [jobs, setJobs] = useState(4);
	const [avgTicket, setAvgTicket] = useState(8500);
	const [leakage, setLeakage] = useState(15); // % of revenue lost to change orders/underbilling

	const monthlyRevenue = jobs * avgTicket;
	const annualLeakage = monthlyRevenue * (leakage / 100) * 12;

	return (
		<section className="py-20 bg-slate-900 text-white rounded-[3rem] my-20 border border-amber-500/30 overflow-hidden relative">
			<div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 blur-[100px] rounded-full" />

			<div className="max-w-4xl mx-auto px-8">
				<h2 className="text-3xl font-black mb-12 italic tracking-tight">
					How much is your current &ldquo;Non-System&rdquo; costing you?
				</h2>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
					<div className="space-y-8">
						<div>
							<label className="block text-sm font-bold uppercase tracking-widest text-slate-400 mb-4">
								Average Jobs Per Month: {jobs}
							</label>
							<input
								type="range"
								min="1"
								max="20"
								value={jobs}
								onChange={e => setJobs(parseInt(e.target.value))}
								className="w-full accent-amber-500"
							/>
						</div>
						<div>
							<label className="block text-sm font-bold uppercase tracking-widest text-slate-400 mb-4">
								Average Job Size: ${avgTicket.toLocaleString()}
							</label>
							<input
								type="range"
								min="1000"
								max="50000"
								step="500"
								value={avgTicket}
								onChange={e => setAvgTicket(parseInt(e.target.value))}
								className="w-full accent-amber-500"
							/>
						</div>
					</div>

					<div className="bg-slate-800 p-8 rounded-3xl border border-slate-700 text-center">
						<p className="text-slate-400 font-bold uppercase text-xs mb-2">
							Estimated Annual Revenue Leakage
						</p>
						<motion.p
							key={annualLeakage}
							initial={{ scale: 0.9, opacity: 0 }}
							animate={{ scale: 1, opacity: 1 }}
							className="text-5xl md:text-6xl font-black text-amber-500 mb-4"
						>
							${annualLeakage.toLocaleString()}
						</motion.p>
						<p className="text-sm text-slate-400 italic">
							*Based on industry average of 15% slippage in change orders and
							underpriced bids.
						</p>
					</div>
				</div>
			</div>
		</section>
	);
}
