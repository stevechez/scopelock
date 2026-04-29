'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, BookOpen, ExternalLink, Loader2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

interface ContextualHelpProps {
	slug: string;
	trigger: React.ReactNode;
}

export default function ContextualHelp({ slug, trigger }: ContextualHelpProps) {
	const [isOpen, setIsOpen] = useState(false);
	const [content, setContent] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(false);

	// The explicit open function handles the fetch only when triggered by user
	const handleOpen = async () => {
		setIsOpen(true);

		// Only fetch if we haven't already loaded the content for this session
		if (!content) {
			setIsLoading(true);
			try {
				const res = await fetch(`/api/get-article?slug=${slug}`);
				if (!res.ok) throw new Error('Article not found');

				const data = await res.json();
				setContent(data.content);
			} catch (error) {
				console.error('Failed to load guide:', error);
				setContent(
					'## Error\nCould not load the guide. Please check your connection or try again later.',
				);
			} finally {
				setIsLoading(false);
			}
		}
	};

	return (
		<>
			{/* THE TRIGGER */}
			<div onClick={handleOpen} className="cursor-pointer inline-block">
				{trigger}
			</div>

			<AnimatePresence>
				{isOpen && (
					<>
						{/* BACKDROP */}
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							onClick={() => setIsOpen(false)}
							className="fixed inset-0 z-[110] bg-slate-950/20 backdrop-blur-[2px]"
						/>

						{/* SLIDE-OVER PANEL */}
						<motion.div
							initial={{ x: '100%' }}
							animate={{ x: 0 }}
							exit={{ x: '100%' }}
							transition={{ type: 'spring', damping: 25, stiffness: 200 }}
							className="fixed right-0 top-0 h-full w-full max-w-md z-[111] bg-background text-foreground shadow-2xl border-l border-border border-border flex flex-col"
						>
							{/* HEADER */}
							<div className="p-6 border-b border-border border-border flex items-center justify-between bg-slate-50/50 dark:bg-slate-800/30">
								<div className="flex items-center gap-2 text-amber-500 font-bold text-sm">
									<BookOpen className="w-4 h-4" /> Quick Guide
								</div>
								<button
									onClick={() => setIsOpen(false)}
									className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors"
								>
									<X className="w-5 h-5 text-muted" />
								</button>
							</div>

							{/* CONTENT AREA */}
							<div className="flex-1 overflow-y-auto p-8">
								{isLoading ? (
									<div className="h-full flex flex-col items-center justify-center text-muted">
										<Loader2 className="w-8 h-8 animate-spin mb-4" />
										<p className="text-sm font-medium">Loading guide...</p>
									</div>
								) : (
									<div className="prose prose-slate dark:prose-invert prose-sm max-w-none">
										<ReactMarkdown>
											{content || 'Guide not found.'}
										</ReactMarkdown>
									</div>
								)}
							</div>

							{/* FOOTER */}
							<div className="p-6 border-t border-border border-border bg-slate-50/50 dark:bg-slate-800/30">
								<a
									href={`/help/${slug}`}
									target="_blank"
									className="w-full py-3 bg-slate-900 dark:bg-white text-white dark:text-foreground rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
								>
									Open in Full Page <ExternalLink className="w-4 h-4" />
								</a>
							</div>
						</motion.div>
					</>
				)}
			</AnimatePresence>
		</>
	);
}
