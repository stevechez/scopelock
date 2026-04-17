'use client';

import { useState } from 'react';
import { updateLeadStatus } from '@/app/actions';
import { Loader2 } from 'lucide-react';

export default function StatusDropdown({
	leadId,
	currentStatus,
}: {
	leadId: string;
	currentStatus: string;
}) {
	const [isUpdating, setIsUpdating] = useState(false);

	const handleChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
		setIsUpdating(true);
		const newStatus = e.target.value;

		try {
			await updateLeadStatus(leadId, newStatus);
		} catch (error) {
			alert('Failed to update status.');
		} finally {
			setIsUpdating(false);
		}
	};

	return (
		<div className="relative inline-flex items-center">
			<select
				value={currentStatus || 'new'}
				onChange={handleChange}
				disabled={isUpdating}
				className="appearance-none bg-slate-100 dark:bg-slate-800/50 text-slate-700 dark:text-slate-300 py-2 pl-4 pr-10 rounded-xl text-xs font-black uppercase tracking-widest border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-amber-500 cursor-pointer disabled:opacity-50 transition-all hover:bg-slate-200 dark:hover:bg-slate-800"
			>
				<option value="new">New Lead</option>
				<option value="contacted">Contacted</option>
				<option value="quoted">Quoted</option>
				<option value="won">Won 🎉</option>
				<option value="lost">Archived</option>
			</select>

			{/* Loading Spinner overlay */}
			<div className="absolute right-3 pointer-events-none">
				{isUpdating ? (
					<Loader2 className="w-4 h-4 animate-spin text-amber-500" />
				) : (
					<span className="text-slate-400 text-[10px]">▼</span>
				)}
			</div>
		</div>
	);
}
