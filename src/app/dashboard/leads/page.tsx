import { supabase } from '@/lib/supabase';
import {
	Clock,
	DollarSign,
	Hammer,
	User,
	Phone,
	Zap,
	ArrowRight,
} from 'lucide-react';
import Link from 'next/link';
import { AcceptLeadButton } from './AcceptLeadButton';

export default async function LeadCRMPage() {
	// Fetch only 'new' unhandled leads
	const { data: leads } = await supabase
		.from('leads')
		.select('*')
		.eq('status', 'new')
		.order('created_at', { ascending: false });

	return (
		<div className="min-h-screen bg-[#F8FAFC] pb-32">
			{/* Header */}
			<header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-200/60 px-6 py-4 flex justify-between items-center shadow-sm">
				<div className="flex items-center gap-2">
					<div className="w-7 h-7 bg-slate-900 rounded-lg flex items-center justify-center">
						<Zap size={14} className="text-white fill-white" />
					</div>
					<span className="font-black text-lg tracking-tight italic">
						Blueprint
						<span className="text-slate-400 font-medium not-italic">OS</span>
					</span>
				</div>
				<Link
					href="/dashboard"
					className="text-[10px] font-bold text-slate-400 uppercase tracking-widest hover:text-slate-900 transition-colors"
				>
					Dashboard
				</Link>
			</header>

			<main className="max-w-2xl mx-auto px-6 pt-10 space-y-8">
				<div>
					<h1 className="text-3xl font-black text-slate-900 tracking-tight">
						Lead Inbox
					</h1>
					<p className="text-slate-500 font-medium mt-1">
						Review and qualify incoming applications.
					</p>
				</div>

				{!leads || leads.length === 0 ? (
					<div className="bg-white border-2 border-dashed border-slate-200 rounded-[2.5rem] p-12 text-center flex flex-col items-center">
						<div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
							<Zap size={24} className="text-slate-300" />
						</div>
						<h3 className="text-lg font-black text-slate-900">Inbox Zero</h3>
						<p className="text-slate-500 text-sm mt-1">
							No new applications pending.
						</p>
					</div>
				) : (
					<div className="space-y-6">
						{leads.map(lead => (
							<div
								key={lead.id}
								className="bg-white border border-slate-200 rounded-[2rem] p-6 shadow-sm"
							>
								{/* Lead Header */}
								<div className="flex justify-between items-start mb-6">
									<div>
										<div className="flex items-center gap-2 mb-1">
											<User size={14} className="text-slate-400" />
											<h2 className="text-xl font-black text-slate-900 leading-none">
												{lead.client_name}
											</h2>
										</div>
										<div className="flex items-center gap-2">
											<Phone size={12} className="text-slate-400" />
											<p className="text-xs font-bold text-slate-500">
												{lead.client_phone}
											</p>
										</div>
									</div>
									<span className="bg-emerald-50 text-emerald-600 text-[9px] font-black uppercase tracking-widest px-2 py-1 rounded-sm border border-emerald-100">
										New Lead
									</span>
								</div>

								{/* Lead Details Grid */}
								<div className="grid grid-cols-2 gap-3 mb-8">
									<div className="bg-slate-50 rounded-xl p-3 border border-slate-100">
										<Hammer size={14} className="text-slate-400 mb-2" />
										<p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">
											Project
										</p>
										<p className="text-sm font-black text-slate-900">
											{lead.project_type}
										</p>
									</div>
									<div className="bg-slate-50 rounded-xl p-3 border border-slate-100">
										<DollarSign size={14} className="text-slate-400 mb-2" />
										<p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">
											Budget
										</p>
										<p className="text-sm font-black text-slate-900">
											{lead.budget}
										</p>
									</div>
									<div className="bg-slate-50 rounded-xl p-3 border border-slate-100 col-span-2">
										<Clock size={14} className="text-slate-400 mb-2" />
										<p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">
											Timeline
										</p>
										<p className="text-sm font-black text-slate-900">
											{lead.timeline}
										</p>
									</div>
								</div>

								{/* Action Buttons */}
								<div className="flex gap-3">
									<button className="flex-1 bg-slate-50 text-slate-500 font-bold py-4 rounded-2xl hover:bg-slate-100 transition-colors text-sm">
										Archive
									</button>
									<AcceptLeadButton leadId={lead.id} />
								</div>
							</div>
						))}
					</div>
				)}
			</main>
		</div>
	);
}
