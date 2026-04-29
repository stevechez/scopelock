import { createClient } from '@/utils/supabase/server';
import { Badge } from '@/components/ui/badge';
import { formatDistanceToNow } from 'date-fns';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';

export default async function LeadsPage() {
	const supabase = await createClient();

	const { data: leads, error } = await supabase
		.from('leads')
		.select('*')
		.order('created_at', { ascending: false });

	if (error) {
		return (
			<div className="p-12 text-red-400 bg-slate-950 min-h-screen flex items-center justify-center">
				<div className="border border-red-900/50 p-8 rounded-[2rem] bg-red-950/10">
					<p className="font-black uppercase italic tracking-tighter text-2xl">
						System Error
					</p>
					<p className="text-sm font-medium opacity-60 mt-2">{error.message}</p>
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-[#020617] text-white selection:bg-amber-500/30">
			<div className="max-w-[1400px] mx-auto pt-32 pb-20 px-6 md:px-10 space-y-12">
				{/* Header Section: Oversized & Bold */}
				<div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-white/5 pb-12">
					<div className="space-y-4">
						<div className="flex items-center gap-3">
							<div className="h-1 w-12 bg-amber-500 rounded-full" />
							<span className="text-amber-500 font-black uppercase tracking-[0.3em] text-sm">
								Real-time Pipeline
							</span>
						</div>
						<h1 className="text-6xl md:text-8xl font-black italic uppercase tracking-[ -0.05em] leading-[0.85]">
							The{' '}
							<span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40">
								Leads
							</span>
						</h1>
						<p className="text-muted font-medium text-xl max-w-xl leading-relaxed">
							Filter, manage, and convert high-intent briefs into world-class
							projects.
						</p>
					</div>

					<div className="flex flex-col items-end gap-3">
						<div className="bg-white/5 backdrop-blur-xl px-6 py-4 rounded-[2rem] border border-white/10 shadow-2xl flex items-center gap-4">
							<div className="relative flex h-3 w-3">
								<span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
								<span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500"></span>
							</div>
							<span className="text-2xl font-black tabular-nums tracking-tighter">
								{leads?.length || 0}
							</span>
							<span className="text-xs font-black uppercase tracking-[0.2em] text-muted">
								Total Inquiries
							</span>
						</div>
					</div>
				</div>

				{/* Table Container: High-End Glassmorphism */}
				<div className="relative group">
					{/* Inner Glow Effect */}
					<div className="absolute -inset-1 bg-gradient-to-r from-amber-500/20 to-transparent rounded-[3rem] blur-2xl opacity-20 group-hover:opacity-30 transition-opacity" />

					<div className="relative bg-[#0a0f1d]/80 backdrop-blur-3xl rounded-[3rem] border border-white/10 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.6)] overflow-hidden">
						<Table>
							<TableHeader className="bg-white/[0.02] border-b border-white/5">
								<TableRow className="hover:bg-transparent border-none">
									<TableHead className="py-8 pl-10 font-black text-muted uppercase text-[11px] tracking-[0.25em]">
										Recieved
									</TableHead>
									<TableHead className="py-8 font-black text-slate-200 uppercase text-[11px] tracking-[0.25em]">
										Client Entity
									</TableHead>
									<TableHead className="py-8 font-black text-slate-200 uppercase text-[11px] tracking-[0.25em]">
										Category
									</TableHead>
									<TableHead className="py-8 font-black text-slate-200 uppercase text-[11px] tracking-[0.25em]">
										Investment
									</TableHead>
									<TableHead className="py-8 pr-10 text-right font-black text-slate-200 uppercase text-[11px] tracking-[0.25em]">
										Status
									</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{leads?.length === 0 ? (
									<TableRow>
										<TableCell
											colSpan={5}
											className="h-96 text-center text-muted font-medium italic text-xl"
										>
											The pipeline is currently clear.
										</TableCell>
									</TableRow>
								) : (
									leads?.map(lead => (
										<TableRow
											key={lead.id}
											className="border-white/[0.03] hover:bg-white/[0.04] transition-all cursor-pointer group/row"
										>
											<TableCell className="py-10 pl-10 text-muted tabular-nums font-bold text-sm uppercase tracking-tighter">
												{formatDistanceToNow(new Date(lead.created_at), {
													addSuffix: true,
												})}
											</TableCell>
											<TableCell className="py-10">
												<div className="text-2xl font-black text-white group-hover/row:text-amber-500 transition-colors tracking-tight">
													{lead.client_name}
												</div>
												<div className="text-sm text-muted font-bold uppercase tracking-widest mt-1">
													{lead.client_email}
												</div>
											</TableCell>
											<TableCell className="py-10">
												<Badge className="bg-white/5 text-slate-300 border border-white/10 rounded-full px-4 py-1 font-black text-[11px] uppercase tracking-widest">
													{lead.project_type || 'General'}
												</Badge>
											</TableCell>
											<TableCell className="py-10 font-black text-white text-xl tracking-tighter tabular-nums">
												{lead.budget}
											</TableCell>
											<TableCell className="py-10 text-right pr-10">
												<Badge className="bg-amber-500 text-slate-950 border-none font-black uppercase text-[10px] tracking-[0.2em] px-5 py-2 rounded-full shadow-[0_0_20px_rgba(245,158,11,0.3)]">
													{lead.status || 'New'}
												</Badge>
											</TableCell>
										</TableRow>
									))
								)}
							</TableBody>
						</Table>
					</div>
				</div>
			</div>
		</div>
	);
}
