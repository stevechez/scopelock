'use client';

import { useState } from 'react';
import { addProjectUpdate } from '@/app/actions';
import { Send, Clock, CheckCircle2, MessageSquare } from 'lucide-react';

interface Update {
	id: string;
	title: string;
	description: string;
	created_at: string;
}

export default function ProjectTimeline({
	leadId,
	updates,
}: {
	leadId: string;
	updates: Update[];
}) {
	const [title, setTitle] = useState('');
	const [desc, setDesc] = useState('');
	const [loading, setLoading] = useState(false);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);
		try {
			await addProjectUpdate(leadId, title, desc);
			setTitle('');
			setDesc('');
		} catch (err) {
			alert('Failed to post update');
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
			{/* POST UPDATE FORM */}
			<div className="lg:col-span-1">
				<form
					onSubmit={handleSubmit}
					className="bg-slate-50 dark:bg-white/[0.03] p-6 rounded-[2rem] border border-border dark:border-white/5 sticky top-24"
				>
					<h3 className="text-sm font-black uppercase tracking-widest text-foreground text-foreground mb-4 flex items-center gap-2">
						<MessageSquare size={16} className="text-amber-500" /> Post Update
					</h3>
					<input
						required
						placeholder="Milestone Title (e.g. Permits Filed)"
						value={title}
						onChange={e => setTitle(e.target.value)}
						className="w-full bg-background text-foreground border border-border border-border rounded-xl px-4 py-3 text-sm mb-3 outline-none focus:ring-2 focus:ring-amber-500"
					/>
					<textarea
						placeholder="Details for the homeowner..."
						value={desc}
						onChange={e => setDesc(e.target.value)}
						className="w-full bg-background text-foreground border border-border border-border rounded-xl px-4 py-3 text-sm mb-4 min-h-[100px] outline-none focus:ring-2 focus:ring-amber-500"
					/>
					<button
						disabled={loading}
						className="w-full bg-slate-900 dark:bg-amber-500 text-white font-black py-3 rounded-xl text-xs uppercase tracking-widest flex items-center justify-center gap-2 hover:opacity-90 transition-all"
					>
						{loading ? (
							'Posting...'
						) : (
							<>
								<Send size={14} /> Post to Feed
							</>
						)}
					</button>
				</form>
			</div>

			{/* THE FEED */}
			<div className="lg:col-span-2 space-y-6">
				{updates.length === 0 ? (
					<div className="text-center py-20 border-2 border-dashed border-border dark:border-white/5 rounded-[3rem]">
						<Clock className="mx-auto text-slate-300 mb-2" size={32} />
						<p className="text-muted font-bold uppercase text-xs tracking-widest">
							No project activity yet
						</p>
					</div>
				) : (
					<div className="relative pl-8 border-l-2 border-border dark:border-white/5 ml-4 space-y-10">
						{updates.map(upd => (
							<div key={upd.id} className="relative">
								<div className="absolute -left-[41px] top-0 w-5 h-5 rounded-full bg-background text-foreground border-4 border-amber-500 shadow-sm" />
								<div className="bg-white dark:bg-[#0B101E] border border-border dark:border-white/5 p-6 rounded-3xl shadow-sm">
									<div className="flex justify-between items-start mb-2">
										<h4 className="font-black text-foreground text-foreground uppercase italic">
											{upd.title}
										</h4>
										<span className="text-[10px] font-black text-muted uppercase">
											{new Date(upd.created_at).toLocaleDateString()}
										</span>
									</div>
									<p className="text-sm text-muted dark:text-muted leading-relaxed font-medium">
										{upd.description}
									</p>
								</div>
							</div>
						))}
					</div>
				)}
			</div>
		</div>
	);
}
