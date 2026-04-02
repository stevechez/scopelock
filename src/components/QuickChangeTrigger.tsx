'use client';

import { useState } from 'react';
import { Plus } from 'lucide-react';
import { AddChangeSheet } from '@/components/AddChangeSheet';

export function QuickChangeTrigger({ jobId }: { jobId: string }) {
	const [isSheetOpen, setIsSheetOpen] = useState(false);

	return (
		<>
			<button
				onClick={() => setIsSheetOpen(true)}
				className="w-full bg-slate-900 text-white font-bold text-lg py-4 rounded-2xl shadow-xl flex items-center justify-center gap-2 active:bg-slate-800 transition-colors"
			>
				<Plus size={24} />
				Add Quick Change
			</button>
			<AddChangeSheet
				isOpen={isSheetOpen}
				onClose={() => setIsSheetOpen(false)}
				jobId={jobId}
			/>
		</>
	);
}
