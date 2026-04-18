import { createClient } from '@/utils/supabase/server';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import {
	ArrowLeft,
	User,
	Mail,
	Phone,
	HardHat,
	Wallet,
	CalendarClock,
	Receipt,
	CheckCircle2,
} from 'lucide-react';
import { ProposalForm } from '@/components/dashboard/ProposalForm';
import PaymentManager from '@/components/dashboard/PaymentManager';
import ProjectTimeline from '@/components/dashboard/ProjectTimeline';
import FileVault from '@/components/dashboard/FileVault';

export default async function LeadDetailsPage({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const { id } = await params;
	const supabase = await createClient();

	// 1. Fetch the lead data
	const { data: lead } = await supabase
		.from('leads')
		.select('*')
		.eq('id', id)
		.single();

	if (!lead) {
		notFound();
	}

	// 2. Fetch the payments data (Moved this UP so safePayments works)
	const { data: payments } = await supabase
		.from('payments')
		.select('*')
		.eq('lead_id', id)
		.order('created_at', { ascending: false });

	const safePayments = payments || [];

	const { data: updates } = await supabase
		.from('project_updates')
		.select('*')
		.eq('lead_id', id)
		.order('created_at', { ascending: false });

	// Helper for formatting the date
	const dateSubmitted = new Date(lead.created_at).toLocaleDateString('en-US', {
		month: 'short',
		day: 'numeric',
		year: 'numeric',
	});

	const { data: files } = await supabase
		.from('project_files')
		.select('*')
		.eq('lead_id', id)
		.order('created_at', { ascending: false });

	return (
		<div className="mt-12 p-8 max-w-4xl mx-auto">
			{/* TOP NAVIGATION */}
			<Link
				href="/dashboard"
				className="inline-flex items-center gap-2 text-slate-500 hover:text-amber-500 transition-colors font-bold text-sm mb-8 uppercase tracking-widest"
			>
				<ArrowLeft size={16} /> Back to Command Center
			</Link>

			{/* HEADER */}
			<div className="bg-white dark:bg-[#0B101E] border border-slate-200 dark:border-white/5 rounded-[2.5rem] p-8 md:p-12 shadow-xl mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 transition-colors">
				<div>
					<h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight italic uppercase leading-none mb-2">
						{lead.client_name}
					</h1>
					<p className="text-slate-500 dark:text-slate-400 font-medium">
						Submitted on {dateSubmitted}
					</p>
				</div>
				<div className="bg-slate-100 dark:bg-slate-800/50 text-slate-600 dark:text-slate-300 px-6 py-3 rounded-2xl font-black text-sm uppercase tracking-widest border border-slate-200 dark:border-slate-700">
					Status: <span className="text-amber-500">{lead.status || 'New'}</span>
				</div>
			</div>

			{/* DOSSIER GRID */}
			<div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
				{/* Contact Card */}
				<div className="bg-white dark:bg-[#0B101E] border border-slate-200 dark:border-white/5 rounded-[2rem] p-8 shadow-sm transition-colors">
					<h2 className="text-xl font-black text-slate-900 dark:text-white italic uppercase mb-6 flex items-center gap-3">
						<User className="text-amber-500" /> Contact Info
					</h2>
					<div className="space-y-6">
						<div>
							<p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">
								Email
							</p>
							<p className="text-lg font-medium text-slate-900 dark:text-white flex items-center gap-2 break-all">
								<Mail size={16} className="text-slate-400 shrink-0" />{' '}
								{lead.client_email}
							</p>
						</div>
						<div>
							<p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">
								Phone
							</p>
							<p className="text-lg font-medium text-slate-900 dark:text-white flex items-center gap-2">
								<Phone size={16} className="text-slate-400 shrink-0" />{' '}
								{lead.client_phone || 'Not provided'}
							</p>
						</div>
					</div>
				</div>

				{/* Project Details Card */}
				<div className="bg-white dark:bg-[#0B101E] border border-slate-200 dark:border-white/5 rounded-[2rem] p-8 shadow-sm transition-colors">
					<h2 className="text-xl font-black text-slate-900 dark:text-white italic uppercase mb-6 flex items-center gap-3">
						<HardHat className="text-amber-500" /> Project Details
					</h2>
					<div className="space-y-6">
						<div>
							<p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">
								Project Type
							</p>
							<p className="text-lg font-medium text-slate-900 dark:text-white">
								{lead.project_type || 'Unspecified'}
							</p>
						</div>
						<div className="grid grid-cols-2 gap-4">
							<div>
								<p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">
									Budget
								</p>
								<p className="text-lg font-medium text-slate-900 dark:text-white flex items-center gap-2">
									<Wallet size={16} className="text-emerald-500 shrink-0" />{' '}
									{lead.budget || 'TBD'}
								</p>
							</div>
							<div className="mb-12">
								<FileVault leadId={lead.id} files={files || []} />
							</div>
							<div>
								<p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">
									Timeline
								</p>
								<p className="text-lg font-medium text-slate-900 dark:text-white flex items-center gap-2">
									<CalendarClock size={16} className="text-blue-500 shrink-0" />{' '}
									{lead.timeline || 'Flexible'}
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* PROPOSAL GENERATOR */}
			{lead.status === 'won' && (
				<div className="mt-16 pt-16 border-t border-slate-100 dark:border-white/5">
					<div className="mb-10">
						<h2 className="text-3xl font-black text-slate-900 dark:text-white italic uppercase flex items-center gap-3">
							<CheckCircle2 className="text-emerald-500" />
							Project Execution Feed
						</h2>
						<p className="text-slate-400 text-sm font-bold uppercase tracking-widest mt-1">
							Real-time updates shared with {lead.client_name}
						</p>
					</div>
					<ProjectTimeline leadId={lead.id} updates={updates || []} />
				</div>
			)}

			{/* FINANCIALS SECTION */}
			<div className="mt-12 pt-12 border-t border-slate-100 dark:border-white/5">
				<div className="mb-8">
					<h2 className="text-2xl font-black text-slate-900 dark:text-white italic uppercase flex items-center gap-3">
						<Receipt className="text-emerald-500" />
						Financials & Milestones
					</h2>
				</div>

				<PaymentManager leadId={lead.id} existingPayments={safePayments} />
			</div>
		</div>
	);
}
