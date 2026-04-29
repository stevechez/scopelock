'use client';

import { useState } from 'react';
import { toggleTaskStatus } from '@/app/actions';
import { Check, Clock, Activity, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface Task {
	id: string;
	title: string;
	status: string;
	priority: string;
}

export function TaskCard({ task }: { task: Task }) {
	const [isPending, setIsPending] = useState(false);
	const router = useRouter();
	const isDone = task.status === 'DONE';

	const handleToggle = async () => {
		setIsPending(true);
		try {
			await toggleTaskStatus(task.id, task.status);
			router.refresh(); // Updates the server data and reflects changes
		} catch (error) {
			console.error(error);
		} finally {
			setIsPending(false);
		}
	};

	return (
		<div
			className={`group flex items-center justify-between bg-white/[0.03] border transition-all p-6 rounded-2xl shadow-lg ${
				isDone
					? 'border-transparent opacity-60'
					: 'border-white/5 hover:border-amber-500/30'
			}`}
		>
			<div className="flex items-center gap-6">
				<button
					onClick={handleToggle}
					disabled={isPending}
					className={`h-6 w-6 rounded-full border-2 flex items-center justify-center transition-all ${
						isDone
							? 'bg-amber-500 border-amber-500'
							: 'border-slate-700 group-hover:border-amber-500'
					}`}
				>
					{isDone && <Check size={14} className="text-slate-950 stroke-[4]" />}
				</button>

				<div>
					<p
						className={`text-lg font-bold tracking-tight transition-all ${
							isDone
								? 'text-muted line-through decoration-amber-500/50'
								: 'text-white'
						}`}
					>
						{task.title}
					</p>
					<div className="flex gap-3 mt-1">
						<span className="text-[9px] font-black uppercase tracking-widest text-muted">
							Priority:{' '}
							<span
								className={
									task.priority === 'URGENT' ? 'text-red-500' : 'text-muted'
								}
							>
								{task.priority}
							</span>
						</span>
					</div>
				</div>
			</div>

			<div
				className={`transition-colors ${isDone ? 'text-foreground' : 'text-slate-600 group-hover:text-white'}`}
			>
				<ArrowRight size={16} />
			</div>
		</div>
	);
}
