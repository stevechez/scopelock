'use client';

import { motion } from 'framer-motion';
import { Calendar, AlertCircle, Link2, Check, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TaskNode {
	id: string;
	title: string;
	start_date: string;
	end_date: string;
	status: string;
	dependency_id?: string;
}

export function BuildFlow({ tasks }: { tasks: TaskNode[] }) {
	if (!tasks || tasks.length === 0) {
		return (
			<div className="p-20 border border-dashed border-white/5 rounded-[2.5rem] text-center">
				<p className="text-white/10 text-[10px] font-black uppercase tracking-[0.3em]">
					No Active Schedule Data
				</p>
			</div>
		);
	}

	const sortedTasks = [...tasks].sort(
		(a, b) =>
			new Date(a.start_date).getTime() - new Date(b.start_date).getTime(),
	);

	return (
		<div className="bg-[#0a0f1d] border border-white/5 rounded-[3rem] p-10 shadow-2xl overflow-hidden backdrop-blur-3xl">
			<div className="flex justify-between items-center mb-12">
				<div>
					<h3 className="text-4xl font-black italic uppercase tracking-tighter text-white">
						BuildFlow<span className="text-amber-500">™</span>
					</h3>
					<p className="text-white/20 font-black text-[10px] uppercase tracking-[0.4em] mt-2">
						Live Scheduling Engine
					</p>
				</div>
				<div className="bg-white/5 p-4 rounded-2xl text-white/20 border border-white/5">
					<Calendar size={20} />
				</div>
			</div>

			<div className="relative space-y-6">
				{/* Vertical Connector Line */}
				<div className="absolute left-[15px] top-6 bottom-6 w-[1px] bg-gradient-to-b from-amber-500/50 via-white/5 to-white/5" />

				{sortedTasks.map((task, index) => {
					const isDone = task.status === 'DONE' || task.status === 'COMPLETED';
					const isBlocked =
						task.dependency_id &&
						tasks.find(t => t.id === task.dependency_id)?.status !== 'DONE' &&
						tasks.find(t => t.id === task.dependency_id)?.status !==
							'COMPLETED';

					return (
						<motion.div
							initial={{ opacity: 0, x: -10 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ delay: index * 0.1 }}
							key={task.id}
							className="relative pl-12 group"
						>
							{/* Status Node Icon */}
							<div
								className={cn(
									'absolute left-0 top-1.5 h-8 w-8 rounded-full border flex items-center justify-center z-10 transition-all duration-500',
									isDone
										? 'bg-amber-500 border-amber-500 text-black shadow-[0_0_20px_rgba(245,158,11,0.3)]'
										: isBlocked
											? 'bg-red-500/20 border-red-500 text-red-500 animate-pulse'
											: 'bg-[#05070f] border-white/10 text-white/20',
								)}
							>
								{isDone ? (
									<Check size={16} strokeWidth={4} />
								) : isBlocked ? (
									<AlertCircle size={16} />
								) : (
									<Clock size={14} />
								)}
							</div>

							<div
								className={cn(
									'border rounded-[2rem] p-8 transition-all duration-300',
									isDone
										? 'bg-white/[0.01] border-white/5 opacity-40'
										: 'bg-white/[0.03] border-white/10 group-hover:border-amber-500/50',
								)}
							>
								<div className="flex justify-between items-start gap-4">
									<div className="space-y-2">
										<h4
											className={cn(
												'font-bold text-xl tracking-tight leading-none',
												isDone ? 'text-white/60 line-through' : 'text-white',
											)}
										>
											{task.title}
										</h4>
										<div className="flex items-center gap-4 text-[9px] font-black uppercase tracking-[0.2em] text-white/30">
											<span className="flex items-center gap-1.5">
												<Calendar size={12} className="text-amber-500/50" />
												{new Date(task.start_date).toLocaleDateString()} —{' '}
												{new Date(task.end_date).toLocaleDateString()}
											</span>
											{task.dependency_id && (
												<span className="flex items-center gap-1 text-amber-500/40 border-l border-white/5 pl-4">
													<Link2 size={12} /> Linked to dependency
												</span>
											)}
										</div>
									</div>

									{isBlocked && (
										<div className="flex items-center gap-2 text-red-500 text-[9px] font-black uppercase tracking-widest bg-red-500/10 px-4 py-2 rounded-full border border-red-500/20">
											Blocked
										</div>
									)}
								</div>
							</div>
						</motion.div>
					);
				})}
			</div>
		</div>
	);
}
