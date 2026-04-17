import { createClient } from '@/utils/supabase/server';
import { notFound } from 'next/navigation';
import { BuildFlow } from '@/components/dashboard/BuildFlow';
import { Badge } from '@/components/ui/badge';
import { ShieldCheck, Zap } from 'lucide-react';
import { PortalActionButton } from '@/components/dashboard/PortalActionButton';

export interface TaskNode {
	id: string;
	title: string;
	start_date: string;
	end_date: string;
	status: string;
	dependency_id?: string;
}

export default async function ClientPortalPage({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	// 1. Await the params promise (Next.js 15+ requirement)
	const { id } = await params;
	const supabase = await createClient();

	// 2. Fetch data securely on the server
	const { data: project } = await supabase
		.from('projects')
		.select('*')
		.eq('id', id)
		.single();

	if (!project) notFound();

	const { data: tasks } = await supabase
		.from('project_tasks')
		.select('*')
		.eq('project_id', id)
		.order('start_date', { ascending: true });

	return (
		<div className="min-h-screen bg-[#05070f] text-white font-sans">
			{/* CLEAN PORTAL HEADER */}
			<nav className="border-b border-white/5 px-8 py-6 flex justify-between items-center backdrop-blur-md bg-black/20 sticky top-0 z-50">
				<div className="flex items-center gap-2">
					<div className="bg-amber-500 text-black font-black p-1.5 rounded-lg text-xs">
						BR
					</div>
					<span className="font-bold tracking-tighter text-lg uppercase italic">
						Client
						<span className="text-white/30 text-xs ml-1 not-italic font-black">
							LOCK™
						</span>
					</span>
				</div>

				<div className="flex items-center gap-6">
					{/* 📍 CLIENT COMPONENT BRIDGE */}
					<PortalActionButton projectId={id} />

					<div className="flex items-center gap-2 text-emerald-500 text-[10px] font-black uppercase tracking-widest bg-emerald-500/10 px-4 py-2 rounded-full border border-emerald-500/20">
						<ShieldCheck size={14} /> Secure Link Active
					</div>
				</div>
			</nav>

			<main className="max-w-6xl mx-auto px-6 py-20 space-y-20">
				<div className="space-y-6">
					<Badge className="bg-white/10 text-white/60 border-none uppercase text-[9px] tracking-widest px-3 py-1">
						Live Update: Today
					</Badge>
					<h1 className="text-6xl md:text-8xl font-black italic uppercase tracking-tighter leading-[0.85]">
						{project.name.split(' - ')[0]}
						<br />
						<span className="text-white/20">
							{project.name.split(' - ')[1] || 'Status'}
						</span>
					</h1>
				</div>

				<div className="grid lg:grid-cols-3 gap-12">
					<div className="lg:col-span-2 space-y-12">
						<section className="space-y-6">
							<h3 className="text-xs font-black uppercase tracking-[0.3em] text-white/30 flex items-center gap-2">
								<Zap size={14} className="text-amber-500" /> Project Timeline
							</h3>
							{/* We cast tasks to any[] if types are conflicting temporarily to get you live */}
							<BuildFlow tasks={(tasks as TaskNode[]) || []} />
						</section>
					</div>

					<aside className="space-y-8">
						<div className="bg-white/[0.03] border border-white/10 rounded-[2.5rem] p-10 space-y-6 backdrop-blur-xl">
							<p className="text-white/30 text-[10px] font-black uppercase tracking-[0.3em]">
								Total Investment
							</p>
							<p className="text-5xl font-black italic tracking-tighter">
								${(project.actual_spend || 0).toLocaleString()}
							</p>
							<div className="pt-6 border-t border-white/5 text-center">
								<p className="text-white/20 text-[9px] font-black uppercase tracking-[0.2em] mb-4">
									Approved Scope Only
								</p>
								<button className="w-full bg-white text-black font-black uppercase text-[10px] tracking-widest py-4 rounded-xl hover:bg-amber-500 transition-colors">
									Request Change
								</button>
							</div>
						</div>
					</aside>
				</div>
			</main>
		</div>
	);
}
