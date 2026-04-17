'use client'; // 📍 THIS IS THE KEY

import { Check, Copy } from 'lucide-react';
import { useState } from 'react';

export function PortalActionButton({ projectId }: { projectId: string }) {
	const [copied, setCopied] = useState(false);

	const handleCopy = async () => {
		const url = `${window.location.origin}/portal/${projectId}`;
		await navigator.clipboard.writeText(url);
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
	};

	return (
		<button
			onClick={handleCopy}
			className="text-[10px] font-black uppercase tracking-widest text-white/40 hover:text-amber-500 transition-colors flex items-center gap-2"
		>
			{copied ? (
				<Check size={12} className="text-emerald-500" />
			) : (
				<Copy size={12} />
			)}
			{copied ? 'Link Copied' : 'Copy Portal Link'}
		</button>
	);
}
