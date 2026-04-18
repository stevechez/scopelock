'use client';

import { Terminal, Copy, BookOpen } from 'lucide-react';

const SCRIPTS = [
	{
		title: 'The Delay Pivot',
		context: 'Use when a vendor pushes a delivery date.',
		text: "Hi Steve, quick update: The backsplash tile delivery was pushed by 48 hours. I've adjusted the BuildFlow™ to prioritize the island trim so we stay on track for Friday. Check the portal for the new timeline.",
	},
	{
		title: 'Change Order Friction',
		context: "Use when a client asks for a 'quick' verbal change.",
		text: "That sounds like a great addition! To keep the ScopeLock™ integrity, could you hit the 'Request Change' button in your portal? I'll get the quote in there immediately so we don't stall the crew.",
	},
];

export default function PromptLibrary() {
	const copyToClipboard = (text: string) => {
		navigator.clipboard.writeText(text);
		// Add toast notification here if you have one
	};

	return (
		<div className="grid gap-6 md:grid-cols-2">
			{SCRIPTS.map((script, i) => (
				<div
					key={i}
					className="bg-white/[0.03] border border-white/10 rounded-[2rem] p-8 space-y-4 hover:border-amber-500/30 transition-all group"
				>
					<div className="flex justify-between items-start">
						<div className="p-3 bg-amber-500/10 rounded-xl text-amber-500">
							<BookOpen size={20} />
						</div>
						<button
							onClick={() => copyToClipboard(script.text)}
							className="opacity-0 group-hover:opacity-100 p-2 text-white/20 hover:text-white transition-all"
						>
							<Copy size={18} />
						</button>
					</div>
					<div>
						<h3 className="text-xl font-black italic uppercase tracking-tighter text-white">
							{script.title}
						</h3>
						<p className="text-[10px] font-black uppercase tracking-widest text-amber-500/60 mt-1">
							{script.context}
						</p>
					</div>
					<p className="text-white/60 text-sm leading-relaxed bg-black/20 p-4 rounded-xl border border-white/5">
						&ldquo;{script.text}&rdquo;
					</p>
				</div>
			))}
		</div>
	);
}
