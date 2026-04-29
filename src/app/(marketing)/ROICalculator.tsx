'use client';

import { useState } from 'react';

export default function ROICalculator() {
	const [projects, setProjects] = useState(5);
	const [avgValue, setAvgValue] = useState(25000);
	const [closeRate, setCloseRate] = useState(30);

	// The "Belief Shock" Math
	const currentRevenue = projects * avgValue * (closeRate / 100);

	// We assume a premium client portal increases trust and bumps close rate by a conservative 15%
	const newCloseRate = Math.min(closeRate + 15, 100);
	const projectedRevenue = projects * avgValue * (newCloseRate / 100);

	// The amount they are losing by looking unprofessional
	const moneyLeaked = projectedRevenue - currentRevenue;

	return (
		<div className="bg-slate-900 border border-slate-800 p-8 rounded-[2rem] shadow-2xl w-full max-w-md mx-auto">
			<h3 className="text-2xl font-black italic mb-6">
				The &ldquo;Leakage&rdquo; Calculator
			</h3>

			<div className="space-y-6">
				<div>
					<label className="flex justify-between text-xs font-bold uppercase tracking-widest text-muted mb-2">
						<span>Leads per Month</span>
						<span className="text-amber-500">{projects}</span>
					</label>
					<input
						type="range"
						min="1"
						max="50"
						value={projects}
						onChange={e => setProjects(Number(e.target.value))}
						className="w-full accent-amber-500"
					/>
				</div>

				<div>
					<label className="flex justify-between text-xs font-bold uppercase tracking-widest text-muted mb-2">
						<span>Avg Project Value</span>
						<span className="text-amber-500">${avgValue.toLocaleString()}</span>
					</label>
					<input
						type="range"
						min="5000"
						max="150000"
						step="5000"
						value={avgValue}
						onChange={e => setAvgValue(Number(e.target.value))}
						className="w-full accent-amber-500"
					/>
				</div>

				<div>
					<label className="flex justify-between text-xs font-bold uppercase tracking-widest text-muted mb-2">
						<span>Current Close Rate</span>
						<span className="text-amber-500">{closeRate}%</span>
					</label>
					<input
						type="range"
						min="10"
						max="90"
						value={closeRate}
						onChange={e => setCloseRate(Number(e.target.value))}
						className="w-full accent-amber-500"
					/>
				</div>
			</div>

			<div className="mt-8 pt-8 border-t border-slate-800 space-y-4">
				<div className="flex justify-between items-end">
					<span className="text-sm font-bold text-muted">
						Current Monthly Revenue
					</span>
					<span className="text-xl font-bold">
						${currentRevenue.toLocaleString()}
					</span>
				</div>
				<div className="flex justify-between items-end">
					<span className="text-sm font-bold text-muted">
						With BuildRale Portal
					</span>
					<span className="text-xl font-bold text-emerald-400">
						${projectedRevenue.toLocaleString()}
					</span>
				</div>

				<div className="mt-6 bg-red-500/10 border border-red-500/20 p-4 rounded-xl text-center">
					<div className="text-xs font-bold uppercase tracking-widest text-red-400 mb-1">
						Money Left On The Table
					</div>
					<div className="text-3xl font-black text-red-500">
						${moneyLeaked.toLocaleString()}
						<span className="text-lg opacity-50">/mo</span>
					</div>
				</div>
			</div>
		</div>
	);
}
