import { createClient } from '@/utils/supabase/server';
import { notFound } from 'next/navigation';
import ApproveButton from '@/components/proposal/ApproveButton';
import { HardHat, FileText, CheckCircle2, Download, Clock } from 'lucide-react';

// 1. Define the shapes of your data
interface ProjectUpdate {
	id: string;
	title: string;
	description: string;
	created_at: string;
}

interface ProjectFile {
	id: string;
	file_name: string;
	file_url: string;
	created_at: string;
}

export default async function PublicProposalPage({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const { id } = await params;
	const supabase = await createClient();

	// 1. Fetch lead with tenant info
	const { data: lead } = await supabase
		.from('leads')
		.select(`*, tenants ( name )`)
		.eq('id', id)
		.single();

	if (!lead) notFound();

	const companyName = Array.isArray(lead.tenants)
		? lead.tenants[0]?.name
		: lead.tenants?.name || 'Your Contractor';

	const isWon = lead.status === 'won';

	// 2. Fetch Project Data ONLY if the status is 'won'
	let updates: ProjectUpdate[] = [];
	let files: ProjectFile[] = [];

	if (isWon) {
		const [updatesRes, filesRes] = await Promise.all([
			supabase
				.from('project_updates')
				.select('*')
				.eq('lead_id', id)
				.order('created_at', { ascending: false }),
			supabase.from('project_files').select('*').eq('lead_id', id),
		]);

		// Cast the data or default to empty array
		updates = (updatesRes.data as ProjectUpdate[]) || [];
		files = (filesRes.data as ProjectFile[]) || [];
	}

	return (
		<div className="min-h-screen bg-slate-50 dark:bg-[#0B101E] py-12 md:py-24 px-6">
			<div className="max-w-4xl mx-auto">
				{/* BRAND HEADER */}
				<div className="flex items-center gap-3 mb-12 justify-center opacity-50">
					<HardHat size={24} className="text-slate-900 dark:text-white" />
					<span className="font-black text-slate-900 dark:text-white tracking-widest uppercase text-sm">
						Powered by BUILDRAIL
					</span>
				</div>

				{isWon ? (
					/* CLIENT PORTAL VIEW (PROJECT IS ACTIVE) */
					<div className="space-y-8">
						<div className="bg-white dark:bg-slate-900 border border-emerald-500/20 rounded-[2.5rem] p-8 md:p-12 shadow-2xl">
							<div className="text-center mb-10">
								<div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 text-emerald-600 font-black text-[10px] uppercase tracking-widest mb-6 border border-emerald-500/20">
									<CheckCircle2 size={14} /> Project Active
								</div>
								<h1 className="text-4xl font-black text-slate-900 dark:text-white uppercase italic mb-2">
									Project Portal
								</h1>
								<p className="text-slate-500 font-medium">
									Welcome back, {lead.client_name}. Here is your project status
									with {companyName}.
								</p>
							</div>

							{/* THE VAULT */}
							<section className="mb-12">
								<h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2">
									<FileText size={14} /> Project Documents
								</h3>
								<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
									{files.length === 0 ? (
										<p className="text-slate-400 text-sm italic py-4">
											No documents shared yet.
										</p>
									) : (
										files.map(file => (
											<a
												key={file.id}
												href={file.file_url}
												target="_blank"
												className="p-5 bg-slate-50 dark:bg-white/[0.02] border border-slate-100 dark:border-white/5 rounded-2xl flex justify-between items-center transition-all hover:border-emerald-500/30 group"
											>
												<div className="flex items-center gap-3">
													<FileText className="text-emerald-500" size={18} />
													<span className="font-bold text-sm text-slate-900 dark:text-white truncate max-w-[180px]">
														{file.file_name}
													</span>
												</div>
												<Download
													className="text-slate-400 group-hover:text-emerald-500 transition-colors"
													size={18}
												/>
											</a>
										))
									)}
								</div>
							</section>

							{/* THE FEED */}
							<section>
								<h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-8 flex items-center gap-2">
									<Clock size={14} /> Execution Timeline
								</h3>
								<div className="space-y-10 border-l-2 border-slate-100 dark:border-white/5 ml-4 pl-8">
									{updates.length === 0 ? (
										<p className="text-slate-400 text-sm italic">
											Project is being initialized...
										</p>
									) : (
										updates.map(upd => (
											<div key={upd.id} className="relative">
												<div className="absolute -left-[41px] top-0 w-5 h-5 rounded-full bg-emerald-500 border-4 border-white dark:border-slate-900 shadow-sm" />
												<div className="bg-slate-50 dark:bg-white/[0.02] p-6 rounded-2xl border border-slate-100 dark:border-white/5">
													<div className="flex justify-between items-start mb-2">
														<h4 className="font-black uppercase text-slate-900 dark:text-white italic">
															{upd.title}
														</h4>
														<span className="text-[10px] font-black text-slate-400">
															{new Date(upd.created_at).toLocaleDateString()}
														</span>
													</div>
													<p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
														{upd.description}
													</p>
												</div>
											</div>
										))
									)}
								</div>
							</section>
						</div>
					</div>
				) : (
					/* SALES / PROPOSAL VIEW (PROJECT IS PENDING) */
					<div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/5 rounded-[2.5rem] p-8 md:p-12 shadow-2xl">
						<div className="border-b border-slate-100 dark:border-white/5 pb-8 mb-8 text-center">
							<h1 className="text-sm font-black text-amber-500 uppercase tracking-widest mb-4">
								Official Project Proposal
							</h1>
							<h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white uppercase italic leading-none mb-4">
								{companyName}
							</h2>
							<p className="text-slate-500 font-medium">
								Prepared exclusively for{' '}
								<strong className="text-slate-900 dark:text-white">
									{lead.client_name}
								</strong>
							</p>
						</div>

						<div className="space-y-8 mb-12">
							<div>
								<h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-2">
									<FileText size={14} /> Project Scope
								</h3>
								<p className="text-xl font-medium text-slate-900 dark:text-white">
									{lead.project_type || 'Custom Construction Project'}
								</p>
							</div>
							<div>
								<h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2">
									Projected Timeline
								</h3>
								<p className="text-xl font-medium text-slate-900 dark:text-white">
									{lead.timeline || 'To be determined'}
								</p>
							</div>
							<div className="bg-slate-50 dark:bg-[#0B101E] rounded-2xl p-6 border border-slate-100 dark:border-white/5">
								<h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2">
									Total Proposed Investment
								</h3>
								<p className="text-4xl font-black text-emerald-600 dark:text-emerald-400">
									{lead.budget || 'Pending calculation'}
								</p>
							</div>
						</div>

						<div className="space-y-4">
							<ApproveButton leadId={lead.id} />
							<p className="text-center text-xs text-slate-400 font-medium italic">
								By clicking approve, you agree to move forward with{' '}
								{companyName} for the scope and budget listed above.
							</p>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
