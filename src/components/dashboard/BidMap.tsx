'use client';

import { motion } from 'framer-motion';
import { ArrowDownRight, ArrowUpRight, Target } from 'lucide-react';

interface CategoryDelta {
	category: string;
	estimated: number;
	actual: number;
}

export function BidMap({ data }: { data: CategoryDelta[] }) {
	return (
		<div className="bg-[#0a0f1d] border border-white/5 rounded-[2.5rem] p-10 shadow-2xl">
			<div className="flex justify-between items-center mb-10">
				<div>
					<h3 className="text-3xl font-black italic uppercase tracking-tighter text-white">
						BidMap<span className="text-amber-500">™</span>
					</h3>
					<p className="text-muted font-bold text-xs uppercase tracking-widest mt-1">
						Margin Intelligence Engine
					</p>
				</div>
				<div className="bg-white/5 p-4 rounded-2xl border border-white/5">
					<Target className="text-amber-500" size={24} />
				</div>
			</div>

			<div className="space-y-8">
				{data.map(item => {
					const delta = item.estimated - item.actual;
					const isOver = delta < 0;
					const percentage = Math.abs((delta / item.estimated) * 100).toFixed(
						1,
					);

					return (
						<div key={item.category} className="group">
							<div className="flex justify-between items-end mb-3">
								<div>
									<span className="text-[10px] font-black uppercase tracking-[0.2em] text-muted group-hover:text-slate-300 transition-colors">
										{item.category}
									</span>
									<div className="text-xl font-bold text-white mt-1">
										${item.actual.toLocaleString()}
										<span className="text-slate-600 text-sm font-medium ml-2">
											/ ${item.estimated.toLocaleString()}
										</span>
									</div>
								</div>
								<div
									className={`flex items-center gap-1 font-black italic text-sm ${isOver ? 'text-red-500' : 'text-emerald-500'}`}
								>
									{isOver ? (
										<ArrowDownRight size={16} />
									) : (
										<ArrowUpRight size={16} />
									)}
									{isOver ? '-' : '+'}
									{percentage}%
								</div>
							</div>

							{/* Visual Delta Bar */}
							<div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
								<motion.div
									initial={{ width: 0 }}
									animate={{
										width: `${Math.min((item.actual / item.estimated) * 100, 100)}%`,
									}}
									className={`h-full ${isOver ? 'bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]' : 'bg-emerald-500'}`}
								/>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
}
