'use client';

import { motion } from 'framer-motion';
import { DollarSign, TrendingUp, Wallet } from 'lucide-react';

interface MoneyBarProps {
	budget: number;
	spend: number;
}

export function MoneyBar({ budget, spend }: MoneyBarProps) {
	const burnPercentage = Math.min(Math.round((spend / budget) * 100), 100);
	const remaining = budget - spend;
	const isOverBudget = spend > budget;

	return (
		<div className="bg-[#0a0f1d] border border-white/5 rounded-[2.5rem] p-8 shadow-2xl overflow-hidden relative group">
			{/* Background Glow */}
			<div className="absolute -right-20 -bottom-20 w-64 h-64 bg-emerald-500/5 blur-[100px] group-hover:bg-emerald-500/10 transition-all duration-700" />

			<div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-8">
				<div className="space-y-1">
					<div className="flex items-center gap-2 text-emerald-500 font-black uppercase tracking-[0.3em] text-[9px]">
						<TrendingUp size={12} /> Live Burn Rate
					</div>
					<h3 className="text-3xl font-black italic uppercase tracking-tighter text-white">
						Financial <span className="text-white/30">Stance</span>
					</h3>
				</div>

				<div className="flex gap-8">
					<div className="text-right">
						<div className="text-muted font-black uppercase text-[9px] tracking-[0.2em] mb-1">
							Total Budget
						</div>
						<div className="text-xl font-bold text-white">
							${budget.toLocaleString()}
						</div>
					</div>
					<div className="text-right">
						<div className="text-muted font-black uppercase text-[9px] tracking-[0.2em] mb-1">
							Capital Remaining
						</div>
						<div
							className={`text-xl font-bold ${isOverBudget ? 'text-red-500' : 'text-emerald-500'}`}
						>
							${remaining.toLocaleString()}
						</div>
					</div>
				</div>
			</div>

			{/* The Money Bar */}
			<div className="relative h-4 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
				<motion.div
					initial={{ width: 0 }}
					animate={{ width: `${burnPercentage}%` }}
					transition={{ duration: 1.5, ease: 'circOut' }}
					className={`h-full relative ${
						burnPercentage > 90
							? 'bg-red-500'
							: burnPercentage > 70
								? 'bg-amber-500'
								: 'bg-emerald-500'
					}`}
				>
					{/* Shimmer Effect */}
					<div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
				</motion.div>
			</div>

			<div className="flex justify-between mt-4">
				<span className="text-[10px] font-black uppercase tracking-widest text-slate-600">
					0% Utilized
				</span>
				<span className="text-[10px] font-black uppercase tracking-widest text-white">
					{burnPercentage}% Expended
				</span>
				<span className="text-[10px] font-black uppercase tracking-widest text-slate-600">
					100% Limit
				</span>
			</div>
		</div>
	);
}
