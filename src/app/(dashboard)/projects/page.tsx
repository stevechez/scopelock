import { createClient } from '@/utils/supabase/server';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress'; // shadcn/ui
import { HardHat, Calendar, DollarSign, ArrowRight } from 'lucide-react';

interface Project {
	id: string;
	name: string;
	status: 'PLANNING' | 'ACTIVE' | 'ON_HOLD' | 'COMPLETED';
	tenant_id: string;
	budget_total?: number;
	actual_spend?: number;
	completion_percentage?: number;
	estimated_end_date?: string;
	created_at: string;
}

interface ProjectCardProps {
	project: Project;
}

export default async function ProjectsPage() {
	const supabase = await createClient();

	// Fetch projects (eventually filtered by tenant)
	const { data: projects } = await supabase
		.from('projects')
		.select('*')
		.order('created_at', { ascending: false });

	return (
		<div className="p-10 space-y-10">
			{/* Header */}
			<div className="flex justify-between items-end">
				<div>
					<h1 className="text-5xl font-black italic uppercase tracking-tighter text-white">
						Active Builds
					</h1>
					<p className="text-slate-500 font-medium text-lg mt-2">
						Real-time status of your current portfolio.
					</p>
				</div>
				<button className="bg-amber-500 text-slate-950 font-black px-6 py-3 rounded-xl uppercase text-xs tracking-widest hover:bg-white transition-colors">
					+ New Project
				</button>
			</div>

			{/* Project Grid */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{projects?.length === 0 ? (
					<div className="col-span-full py-20 text-center border-2 border-dashed border-white/5 rounded-[3rem]">
						<p className="text-slate-500 italic">
							No active builds. Convert a lead to get started.
						</p>
					</div>
				) : (
					projects?.map(project => (
						<ProjectCard key={project.id} project={project} />
					))
				)}
			</div>
		</div>
	);
}

function ProjectCard({ project }: { project: Project }) {
	return (
		<div className="group bg-[#0a0f1d] border border-white/5 rounded-[2.5rem] p-8 hover:border-amber-500/50 transition-all duration-500 shadow-2xl relative overflow-hidden">
			{/* Decorative Glow */}
			<div className="absolute -right-4 -top-4 w-24 h-24 bg-amber-500/5 blur-3xl rounded-full group-hover:bg-amber-500/10 transition-colors" />

			<div className="space-y-6">
				<div className="flex justify-between items-start">
					<Badge className="bg-amber-500/10 text-amber-500 border-none font-black text-[10px] tracking-widest px-3 py-1">
						{project.status || 'PLANNING'}
					</Badge>
					<div className="text-slate-600">
						<HardHat size={20} />
					</div>
				</div>

				<div>
					<h3 className="text-2xl font-black text-white group-hover:text-amber-500 transition-colors">
						{project.name}
					</h3>
					<div className="flex items-center gap-2 text-slate-500 text-xs font-bold mt-1 uppercase tracking-widest">
						<Calendar size={12} />
						Est. Completion: June 2026
					</div>
				</div>

				{/* Progress Bar - Apple Style */}
				<div className="space-y-2">
					<div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-slate-500">
						<span>Phase: Rough-in</span>
						<span>65%</span>
					</div>
					<Progress value={65} className="h-1 bg-white/5" />
				</div>

				<div className="pt-4 border-t border-white/5 flex justify-between items-center">
					<div className="flex items-center gap-1">
						<DollarSign size={14} className="text-emerald-500" />
						<span className="text-white font-bold tabular-nums">$42,500</span>
						<span className="text-[10px] text-slate-600 font-bold uppercase ml-1">
							Spent
						</span>
					</div>
					<button className="h-10 w-10 rounded-full bg-white/5 flex items-center justify-center text-white hover:bg-amber-500 hover:text-slate-950 transition-all">
						<ArrowRight size={18} />
					</button>
				</div>
			</div>
		</div>
	);
}
