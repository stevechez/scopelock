'use client'; // This tells Next.js this file is for the browser

import { Share2, Check } from 'lucide-react';
import { useState } from 'react';

export function SharePortalButton({ projectId }: { projectId: string }) {
	const [copied, setCopied] = useState(false);

	const handleCopy = async () => {
		const url = `${window.location.origin}/portal/${projectId}`;
		await navigator.clipboard.writeText(url);
		setCopied(true);
		setTimeout(() => setCopied(false), 2000); // Reset icon after 2s
	};

	return (
		<button
			onClick={handleCopy}
			className="flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 px-4 py-2 rounded-xl transition-all group"
		>
			{copied ? (
				<Check size={14} className="text-emerald-500" />
			) : (
				<Share2
					size={14}
					className="text-white/40 group-hover:text-amber-500"
				/>
			)}
			<span className="text-[9px] font-black uppercase tracking-widest text-white/40 group-hover:text-white">
				{copied ? 'Link Copied' : 'Share Portal'}
			</span>
		</button>
	);
}
