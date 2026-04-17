'use client';

import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';

interface QuickStatProps {
	title: string;
	value: string | number;
	description?: string;
	iconName: keyof typeof Icons;
	trend?: string; // e.g. "+15%"
}

export function QuickStat({
	title,
	value,
	description,
	iconName,
	trend,
}: QuickStatProps) {
	// Dynamically grab the icon component
	const Icon = Icons[iconName] as Icons.LucideIcon;
	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			className="group relative bg-white/5 border border-white/10 p-8 rounded-[2.5rem] backdrop-blur-xl transition-all duration-500 hover:border-amber-500/30 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.4)] overflow-hidden"
		>
			{/* Decorative Inner Glow */}
			<div className="absolute -right-6 -top-6 w-24 h-24 bg-amber-500/5 blur-3xl rounded-full group-hover:bg-amber-500/15 transition-all duration-700" />

			<div className="relative z-10 flex flex-col h-full justify-between">
				<div className="flex justify-between items-start mb-6">
					<div className="p-3 bg-white/5 rounded-2xl border border-white/5 text-slate-400 group-hover:text-amber-500 group-hover:bg-amber-500/10 transition-all duration-500">
						{Icon && <Icon size={24} strokeWidth={1.5} />}
					</div>
					{trend && (
						<div className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-[10px] font-black text-emerald-500 uppercase tracking-widest">
							{trend}
						</div>
					)}
				</div>

				<div>
					<div className="text-4xl font-black italic text-white tracking-tighter group-hover:scale-[1.02] origin-left transition-transform duration-500">
						{value}
					</div>
					<div className="flex flex-col mt-2">
						<span className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-500">
							{title}
						</span>
						{description && (
							<span className="text-xs font-medium text-slate-600 mt-1 italic uppercase tracking-tight">
								{description}
							</span>
						)}
					</div>
				</div>
			</div>
		</motion.div>
	);
}
