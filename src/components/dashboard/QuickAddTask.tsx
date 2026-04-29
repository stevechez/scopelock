'use client';

import { useState } from 'react';
import { Plus, Loader2 } from 'lucide-react';
import { createTask } from '@/app/actions'; // We'll create this next
import { useRouter } from 'next/navigation';

export function QuickAddTask({ projectId }: { projectId: string }) {
	const [title, setTitle] = useState('');
	const [isPending, setIsPending] = useState(false);
	const router = useRouter();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!title.trim() || isPending) return;

		setIsPending(true);
		try {
			await createTask(projectId, title);
			setTitle('');
			router.refresh();
		} catch (error) {
			console.error(error);
		} finally {
			setIsPending(false);
		}
	};

	return (
		<form onSubmit={handleSubmit} className="relative group mb-6">
			<div className="absolute inset-y-0 left-5 flex items-center pointer-events-none text-muted group-focus-within:text-amber-500 transition-colors">
				{isPending ? (
					<Loader2 size={16} className="animate-spin" />
				) : (
					<Plus size={16} />
				)}
			</div>
			<input
				type="text"
				value={title}
				onChange={e => setTitle(e.target.value)}
				placeholder="Quick add task..."
				className="w-full bg-white/[0.03] border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-sm font-medium text-white placeholder:text-slate-600 focus:outline-none focus:border-amber-500/50 focus:bg-white/[0.05] transition-all"
				disabled={isPending}
			/>
		</form>
	);
}
