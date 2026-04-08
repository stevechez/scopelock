'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Wand2, ArrowRight, BookText, Wrench } from 'lucide-react';
import CommandPalette from '@/components/help/CommandPalette';
import DecisionWizard from '@/components/help/DecisionWizard';

const QUICK_ACTIONS = [
	{
		label: 'Fix my lead flow',
		icon: <Search className="w-4 h-4" />,
		targetNode: 'leads',
	},
	{
		label: 'Close more jobs',
		icon: <Wand2 className="w-4 h-4" />,
		targetNode: 'bids',
	},
	{
		label: 'Stop bad clients',
		icon: <Wrench className="w-4 h-4" />,
		targetNode: 'project',
	},
];

export default function HelpCenter() {
	const [isWizardOpen, setIsWizardOpen] = useState(false);
	const [wizardStartNode, setWizardStartNode] = useState('start');
	const [aiQuery, setAiQuery] = useState('');
	const [isPaletteOpen, setIsPaletteOpen] = useState(false);
	const [isThinking, setIsThinking] = useState(false);
	const [aiResponse, setAiResponse] = useState<{
		answer: string;
		articles: string[];
	} | null>(null);

	// AI Submission Handler (Moved inside the component)
	const handleAskAI = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!aiQuery.trim()) return;

		setIsThinking(true);
		setAiResponse(null); // Clear previous response to trigger skeleton fluid expansion

		try {
			const res = await fetch('/api/ai-help', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ query: aiQuery }),
			});

			if (!res.ok) {
				throw new Error(`Server responded with ${res.status}`);
			}

			const data = await res.json();

			// Ensure data has the correct shape before setting state
			setAiResponse({
				answer: data.answer || 'I found some information that might help.',
				articles: data.articles || [], // Force an array even if the API forgets it
			});
		} catch (error) {
			console.error('AI Fetch Error:', error);
			// Fallback UI so the app doesn't crash
			setAiResponse({
				answer:
					"Sorry, I'm having trouble connecting to the Knowledge Base right now. Please try again in a moment.",
				articles: [],
			});
		} finally {
			setIsThinking(false);
		}
	};

	return (
		<div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-32 px-6">
			<div className="max-w-4xl mx-auto flex flex-col">
				{/* HEADER */}
				<div className="text-center mb-12">
					<h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight mb-4">
						How can we help you build?
					</h1>
					<p className="text-slate-500 dark:text-slate-400 font-medium">
						Ask the AI, search the docs, or use{' '}
						<kbd
							onClick={() => setIsPaletteOpen(true)}
							className="px-2 py-1 bg-slate-200 dark:bg-slate-800 rounded-md text-xs font-black cursor-pointer hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors"
						>
							⌘K
						</kbd>{' '}
						to jump anywhere.
					</p>
				</div>

				{/* THE AI ASSISTANT INPUT */}
				{/* layout prop added back for fluid movement */}
				<motion.form
					layout
					onSubmit={handleAskAI}
					className="relative group mb-8 z-20"
				>
					<div className="absolute -inset-1 bg-gradient-to-r from-amber-500 to-amber-300 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-500" />
					<div className="relative flex items-center bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-2 shadow-sm focus-within:ring-2 focus-within:ring-amber-500 transition-all">
						<Wand2 className="w-6 h-6 text-amber-500 ml-4" />
						<input
							type="text"
							value={aiQuery}
							onChange={e => setAiQuery(e.target.value)}
							placeholder="Describe your problem... (e.g. How do I send a payment link?)"
							className="w-full bg-transparent border-none text-slate-900 dark:text-white px-4 py-4 focus:outline-none font-medium placeholder:text-slate-400"
						/>
						<button
							type="submit"
							disabled={isThinking || !aiQuery}
							className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-6 py-3 rounded-xl font-bold hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:hover:scale-100 flex items-center gap-2"
						>
							{isThinking ? 'Searching...' : 'Ask'}{' '}
							<ArrowRight className="w-4 h-4" />
						</button>
					</div>
				</motion.form>

				{/* QUICK ACTIONS */}
				<motion.div
					layout
					className="flex flex-wrap justify-center gap-3 mb-16"
				>
					{QUICK_ACTIONS.map((action, i) => (
						<button
							key={i}
							onClick={() => {
								setWizardStartNode(action.targetNode);
								setIsWizardOpen(true);
							}}
							className="flex items-center gap-2 px-4 py-2 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-sm font-bold text-slate-600 dark:text-slate-300 hover:border-amber-500 hover:text-amber-500 dark:hover:text-amber-400 transition-all shadow-sm hover:shadow-md"
						>
							{action.icon} {action.label}
						</button>
					))}
				</motion.div>

				{/* FLUID AI RESPONSE RENDERER */}
				<AnimatePresence mode="popLayout">
					{(isThinking || aiResponse) && (
						<motion.div
							layout // MAGIC BULLET FOR FLUID HEIGHT
							initial={{ opacity: 0, height: 0, y: -20 }}
							animate={{ opacity: 1, height: 'auto', y: 0 }}
							exit={{ opacity: 0, height: 0, y: -20 }}
							transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
							className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-xl"
						>
							<div className="p-8">
								{/* STATE 1: SKELETON LOADER */}
								{isThinking && !aiResponse && (
									<motion.div
										key="skeleton"
										initial={{ opacity: 0 }}
										animate={{ opacity: 1 }}
										exit={{ opacity: 0 }}
										className="space-y-6"
									>
										<div className="flex items-center gap-3 mb-6">
											<div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 animate-pulse" />
											<div className="w-32 h-6 rounded-lg bg-slate-100 dark:bg-slate-800 animate-pulse" />
										</div>
										<div className="space-y-3">
											<div className="w-full h-4 rounded bg-slate-100 dark:bg-slate-800 animate-pulse" />
											<div className="w-5/6 h-4 rounded bg-slate-100 dark:bg-slate-800 animate-pulse" />
											<div className="w-4/6 h-4 rounded bg-slate-100 dark:bg-slate-800 animate-pulse" />
										</div>
									</motion.div>
								)}

								{/* STATE 2: THE ACTUAL RESPONSE */}
								{!isThinking && aiResponse && (
									<motion.div
										key="content"
										initial={{ opacity: 0, filter: 'blur(4px)' }}
										animate={{ opacity: 1, filter: 'blur(0px)' }}
										transition={{ duration: 0.3 }}
									>
										<div className="flex items-center gap-3 mb-6">
											<div className="w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center text-white shadow-lg shadow-amber-500/20">
												<Wand2 className="w-4 h-4" />
											</div>
											<h3 className="font-black text-slate-900 dark:text-white text-lg">
												BuildRail AI
											</h3>
										</div>

										<p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-8 font-medium text-lg">
											{aiResponse.answer}
										</p>

										<div className="pt-6 border-t border-slate-100 dark:border-slate-800">
											<h4 className="font-bold text-xs uppercase tracking-widest text-slate-400 mb-4">
												Relevant Guides
											</h4>
											<div className="grid sm:grid-cols-2 gap-3">
												{aiResponse.articles?.map((article, i) => {
													// Convert the AI's Title into a URL-friendly slug
													// "PayRail: Connecting Stripe" -> "payrail-connecting-stripe"
													const articleSlug = article
														.toLowerCase()
														.replace(/[^a-z0-9]+/g, '-') // Replace non-alphanumeric with hyphens
														.replace(/(^-|-$)+/g, ''); // Trim hyphens from start/end

													return (
														<Link
															key={i}
															href={`/help/${articleSlug}`}
															className="group relative flex items-center justify-between p-4 rounded-xl bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 hover:border-amber-500 cursor-pointer transition-colors block"
														>
															<div className="flex items-center gap-3">
																<BookText className="w-5 h-5 text-slate-400 group-hover:text-amber-500 transition-colors flex-shrink-0" />
																<span className="font-bold text-sm text-slate-700 dark:text-slate-200 group-hover:text-amber-500 transition-colors line-clamp-2">
																	{article}
																</span>
															</div>
															<ArrowRight className="w-4 h-4 text-slate-300 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all flex-shrink-0 ml-2" />

															{/* HOVER PREVIEW TOOLTIP */}
															<div className="absolute left-[105%] top-1/2 -translate-y-1/2 w-64 p-4 bg-slate-900 text-white rounded-xl shadow-2xl opacity-0 invisible xl:group-hover:opacity-100 xl:group-hover:visible transition-all duration-200 z-50">
																<p className="text-xs font-medium">
																	Click to read the full guide.
																</p>
															</div>
														</Link>
													);
												})}
											</div>
										</div>
									</motion.div>
								)}
							</div>
						</motion.div>
					)}
				</AnimatePresence>
			</div>

			<CommandPalette isOpen={isPaletteOpen} setIsOpen={setIsPaletteOpen} />
			{/* The Modals */}
			<CommandPalette isOpen={isPaletteOpen} setIsOpen={setIsPaletteOpen} />
			<DecisionWizard
				isOpen={isWizardOpen}
				setIsOpen={setIsWizardOpen}
				initialStep={wizardStartNode}
			/>
		</div>
	);
}
