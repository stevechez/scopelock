'use client';

import { useState } from 'react';
import { Wand2, Loader2, CheckCircle2 } from 'lucide-react';

export default function DocBuilder() {
	const [slug, setSlug] = useState('');
	const [topic, setTopic] = useState('');
	const [isGenerating, setIsGenerating] = useState(false);
	const [successMsg, setSuccessMsg] = useState('');

	const handleGenerate = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsGenerating(true);
		setSuccessMsg('');

		try {
			const res = await fetch('/api/generate-doc', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ slug, topic }),
			});

			if (!res.ok) throw new Error('Failed to generate');

			setSuccessMsg(`Successfully created: ${slug}.md`);
			setSlug('');
			setTopic('');
		} catch (error) {
			console.error(error);
			alert('Error generating document');
		} finally {
			setIsGenerating(false);
		}
	};

	return (
		<div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-32 px-6 pb-24">
			<div className="max-w-2xl mx-auto bg-white dark:bg-slate-900 p-10 rounded-3xl shadow-xl border border-slate-200 dark:border-slate-800">
				<div className="flex items-center gap-3 mb-8">
					<div className="p-3 bg-amber-100 dark:bg-amber-500/10 text-amber-600 dark:text-amber-500 rounded-xl">
						<Wand2 />
					</div>
					<h1 className="text-3xl font-black text-slate-900 dark:text-white">
						AI Doc Builder
					</h1>
				</div>

				<form onSubmit={handleGenerate} className="space-y-6">
					<div>
						<label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
							File Slug (e.g. scopelock-change-orders)
						</label>
						<input
							required
							value={slug}
							onChange={e =>
								setSlug(
									e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-'),
								)
							}
							className="w-full p-4 border border-slate-300 dark:border-slate-700 rounded-xl bg-transparent text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500"
							placeholder="my-article-slug"
						/>
					</div>

					<div>
						<label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
							Topic Description
						</label>
						<textarea
							required
							value={topic}
							onChange={e => setTopic(e.target.value)}
							className="w-full p-4 border border-slate-300 dark:border-slate-700 rounded-xl h-32 bg-transparent text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500"
							placeholder="Explain how to manage scope creep using ScopeLock..."
						/>
					</div>

					<button
						type="submit"
						disabled={isGenerating}
						className="w-full py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl font-bold flex justify-center items-center gap-2 hover:bg-slate-800 dark:hover:bg-slate-200 disabled:opacity-50 transition-colors"
					>
						{isGenerating ? (
							<Loader2 className="animate-spin" />
						) : (
							'Generate Article'
						)}
					</button>
				</form>

				{successMsg && (
					<div className="mt-6 p-4 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/20 rounded-xl flex items-center gap-3 font-bold">
						<CheckCircle2 /> {successMsg}
					</div>
				)}
			</div>
		</div>
	);
}
