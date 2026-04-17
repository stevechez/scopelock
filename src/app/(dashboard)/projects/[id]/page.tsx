import { createClient } from '@/utils/supabase/server';
import { notFound } from 'next/navigation';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
	Wallet,
	DollarSign,
	ArrowLeft,
	GanttChartSquare,
	ClipboardList,
	TrendingUp,
} from 'lucide-react';
import Link from 'next/link';
import { TaskCard } from '@/components/dashboard/TaskCard';
import { QuickAddTask } from '@/components/dashboard/QuickAddTask';
import { MoneyBar } from '@/components/dashboard/MoneyBar';
import { BuildFlow } from '@/components/dashboard/BuildFlow';
import { BidMap } from '@/components/dashboard/BidMap';

export default async function ProjectDetailPage({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const { id } = await params;
	const supabase = await createClient();

	const [projectRes, tasksRes] = await Promise.all([
		supabase.from('projects').select('*').eq('id', id).single(),
		supabase
			.from('project_tasks')
			.select('*')
			.eq('project_id', id)
			.order('created_at', { ascending: true }),
	]);

	const project = projectRes.data;
	const tasks = tasksRes.data || [];

	if (projectRes.error || !project) notFound();

	const categories = ['Labor', 'Materials', 'Subcontractor', 'Permits'];
	const bidMapData = categories
		.map(cat => ({
			category: cat,
			estimated: tasks
				.filter(t => t.category === cat)
				.reduce((acc, t) => acc + Number(t.estimated_cost), 0),
			actual: tasks
				.filter(t => t.category === cat)
				.reduce((acc, t) => acc + Number(t.actual_cost), 0),
		}))
		.filter(item => item.estimated > 0);

	return (
		<div className="min-h-screen bg-[#05070f] text-white pl-4 pr-6 lg:pr-12 py-10 space-y-10">
			{/* BACK NAVIGATION */}
			<Link
				href="/projects"
				className="inline-flex items-center gap-2 text-white/40 hover:text-white text-xs tracking-[0.2em] uppercase font-bold transition"
			>
				<ArrowLeft size={14} /> Back to Builds
			</Link>

			{/* HEADER SECTION: Cleaned up and Merged */}
			<div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-10 border-b border-white/5 pb-10">
				{/* PROJECT INFO */}
				<div className="space-y-5 max-w-3xl">
					<div className="flex items-center gap-4">
						<Badge className="bg-amber-500 text-black px-3 py-1 text-[10px] font-black tracking-widest uppercase rounded-sm border-none">
							{project.status}
						</Badge>
						<span className="text-white/20 text-[10px] font-black tracking-[0.3em] uppercase">
							NODE {project.id.slice(0, 6)}
						</span>
					</div>

					<h1 className="text-5xl md:text-7xl font-bold leading-[0.85] tracking-tighter italic uppercase">
						{project.name.split(' - ')[0]}
						<span className="block text-white/20 font-medium not-italic">
							{project.name.split(' - ')[1] || 'Project'}
						</span>
					</h1>
				</div>

				{/* FINANCIAL COMMAND ZONE: Actions + KPI */}
				<div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-6 w-full lg:w-auto">
					{/* TOP LEVEL ACTIONS */}
					<div className="flex flex-col gap-2 min-w-[200px]">
						<button className="flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 text-[9px] font-black uppercase tracking-widest py-3 px-6 rounded-xl transition-all">
							<Wallet size={14} /> Log Expense
						</button>
						<button className="flex items-center justify-center gap-2 bg-amber-500 hover:bg-white text-black text-[9px] font-black uppercase tracking-widest py-3 px-6 rounded-xl transition-all border-none">
							<DollarSign size={14} /> Change Order
						</button>
					</div>

					{/* KPI SPEND CARD */}
					<div className="bg-white/[0.04] border border-white/10 rounded-3xl px-10 py-8 backdrop-blur-xl shadow-2xl min-w-[280px] text-right">
						<p className="text-white/30 text-[10px] font-black uppercase tracking-[0.3em] mb-3">
							Actual Spend
						</p>
						<p className="text-5xl font-black italic tracking-tighter">
							${(project.actual_spend || 0).toLocaleString()}
						</p>
					</div>
				</div>
			</div>

			{/* TABS ENGINE */}
			<Tabs defaultValue="tasks" className="w-full">
				<TabsList className="flex gap-4 bg-transparent p-0 mb-12">
					{[
						{ value: 'tasks', label: 'Queue', icon: ClipboardList },
						{ value: 'timeline', label: 'BuildFlow™', icon: GanttChartSquare },
						{ value: 'financials', label: 'BidMap™', icon: DollarSign },
					].map(tab => (
						<TabsTrigger
							key={tab.value}
							value={tab.value}
							className="flex items-center gap-3 px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest text-white/40 data-[state=active]:text-slate-950 data-[state=active]:bg-white transition-all duration-300"
						>
							<tab.icon size={14} />
							{tab.label}
						</TabsTrigger>
					))}
				</TabsList>

				{/* TASKS VIEW */}
				<TabsContent value="tasks" className="mt-0 outline-none focus:ring-0">
					<div className="grid lg:grid-cols-[380px_1fr] gap-8">
						<div className="bg-white/[0.02] border border-white/5 rounded-[2.5rem] p-8 space-y-8 shadow-2xl">
							<div className="flex justify-between items-center border-b border-white/5 pb-6">
								<h3 className="text-xs font-black uppercase tracking-[0.3em] text-white/40">
									Task Queue
								</h3>
								<span className="bg-white/10 px-3 py-1 rounded-full text-[10px] font-black text-white/60">
									{tasks.filter(t => t.status !== 'DONE').length}
								</span>
							</div>

							<QuickAddTask projectId={project.id} />

							<div className="space-y-4">
								{tasks
									.filter(t => t.status !== 'DONE')
									.map(task => (
										<TaskCard key={task.id} task={task} />
									))}
							</div>
						</div>

						<div className="bg-gradient-to-br from-white/[0.02] to-transparent border border-white/5 rounded-[2.5rem] flex items-center justify-center min-h-[600px] border-dashed">
							<p className="text-white/10 text-[10px] font-black uppercase tracking-[0.5em]">
								Provisioning Field Updates...
							</p>
						</div>
					</div>
				</TabsContent>

				{/* BUILDFLOW VIEW */}
				<TabsContent value="timeline" className="outline-none">
					<div className="bg-white/[0.01] border border-white/5 rounded-[3rem] p-2 overflow-hidden">
						<BuildFlow tasks={tasks} />
					</div>
				</TabsContent>

				{/* BIDMAP VIEW */}
				<TabsContent value="financials" className="outline-none">
					<div className="space-y-8 max-w-5xl">
						<MoneyBar
							budget={project.budget_total || 0}
							spend={project.actual_spend || 0}
						/>
						<BidMap data={bidMapData} />
					</div>
				</TabsContent>
			</Tabs>
		</div>
	);
}
