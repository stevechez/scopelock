'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useRouter, useSearchParams } from 'next/navigation';
import { toast } from 'sonner';
import { syncLeadToQuickBooks } from '@/app/actions/qb-sync';
import { RefreshCw, ExternalLink, X } from 'lucide-react';

export interface Lead {
	id: string;
	tenant_id: string;
	client_name: string;
	client_email: string;
	client_phone: string;
	project_type: string;
	budget: string;
	timeline: string;
	notes?: string;
	status: 'new' | 'contacted' | 'quoted' | 'closed';
	qb_customer_id?: string; // Track if already synced
	created_at?: string;
}

export default function LeadDetailDrawer({ leads }: { leads: Lead[] }) {
	const router = useRouter();
	const searchParams = useSearchParams();
	const activeId = searchParams.get('id');
	const lead = leads.find(l => l.id === activeId);

	const close = () => router.push('/leads');

	const handleSync = async () => {
		if (!lead) return;

		toast.promise(syncLeadToQuickBooks(lead.id), {
			loading: 'Pushing to QuickBooks...',
			success: 'Customer created in QuickBooks! 🚀',
			error: err => `Sync failed: ${err}`,
		});
	};

	return (
		<AnimatePresence>
			{activeId && lead && (
				<>
					{/* Backdrop */}
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						onClick={close}
						className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
					/>

					{/* Drawer */}
					<motion.div
						initial={{ x: '100%' }}
						animate={{ x: 0 }}
						exit={{ x: '100%' }}
						transition={{ type: 'spring', damping: 25, stiffness: 200 }}
						className="fixed right-0 top-0 h-full w-full max-w-xl bg-zinc-950 border-l border-white/5 z-50 p-8 shadow-2xl flex flex-col"
					>
						{/* Header */}
						<div className="flex justify-between items-start mb-12">
							<div>
								<span className="text-[10px] font-black uppercase tracking-[0.2em] text-amber-500 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
									Project Scope: {lead.project_type}
								</span>
								<h2 className="text-3xl font-black italic uppercase tracking-tighter text-white mt-4">
									{lead.client_name}
								</h2>
							</div>
							<button
								onClick={close}
								className="text-zinc-500 hover:text-white transition-colors bg-white/5 p-2 rounded-xl"
							>
								<X size={20} />
							</button>
						</div>

						{/* Content Scroll Area */}
						<div className="flex-1 overflow-y-auto space-y-8 pr-2">
							<section className="grid grid-cols-2 gap-4">
								<div className="p-4 bg-zinc-900/50 rounded-2xl border border-white/5">
									<p className="text-[10px] font-bold text-zinc-500 uppercase">
										Budget Range
									</p>
									<p className="text-lg font-mono text-white mt-1">
										{lead.budget}
									</p>
								</div>
								<div className="p-4 bg-zinc-900/50 rounded-2xl border border-white/5">
									<p className="text-[10px] font-bold text-zinc-500 uppercase">
										Timeline
									</p>
									<p className="text-lg text-white mt-1">{lead.timeline}</p>
								</div>
							</section>

							<section className="space-y-2">
								<p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
									Contact Information
								</p>
								<div className="p-6 bg-zinc-900/50 rounded-3xl border border-white/5 space-y-3">
									<p className="text-white font-medium">{lead.client_email}</p>
									<p className="text-zinc-400 font-mono tracking-tight">
										{lead.client_phone}
									</p>
								</div>
							</section>

							<section className="space-y-2">
								<p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
									Internal Notes
								</p>
								<textarea
									placeholder="Add details about the site visit..."
									defaultValue={lead.notes || ''}
									className="w-full h-32 bg-zinc-900/50 border border-white/5 rounded-3xl p-4 text-sm text-zinc-300 outline-none focus:border-amber-500/50 transition-all resize-none"
								/>
							</section>
						</div>

						{/* Footer Action Area */}
						<div className="pt-8 mt-auto border-t border-white/5">
							<button
								onClick={handleSync}
								disabled={!!lead.qb_customer_id}
								className={`w-full py-5 rounded-2xl font-black text-sm uppercase tracking-widest flex items-center justify-center gap-3 transition-all active:scale-95 ${
									lead.qb_customer_id
										? 'bg-zinc-800 text-zinc-500 cursor-not-allowed'
										: 'bg-[#2CA01C] text-white hover:bg-[#258a18] shadow-xl shadow-green-900/20'
								}`}
							>
								{lead.qb_customer_id ? (
									<>
										Synced to QuickBooks <ExternalLink size={16} />
									</>
								) : (
									<>
										Push to QuickBooks <RefreshCw size={16} />
									</>
								)}
							</button>
							{lead.qb_customer_id && (
								<p className="text-center text-[10px] text-zinc-600 mt-4 uppercase font-bold tracking-tighter">
									QB Reference ID: {lead.qb_customer_id}
								</p>
							)}
						</div>
					</motion.div>
				</>
			)}
		</AnimatePresence>
	);
}
