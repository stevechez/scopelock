import { createClient } from '@/utils/supabase/server';
import { redirect, notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Sparkles } from 'lucide-react';
import { ProposalForm } from '@/components/dashboard/ProposalForm';
export default async function NewProposalPage({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const { id } = await params;
	const supabase = await createClient();

	// 1. Get the current logged-in contractor
	const {
		data: { user },
	} = await supabase.auth.getUser();
	if (!user) redirect('/login');

	// 2. Get the Tenant ID (required to link the proposal to your brand)
	const { data: tenant } = await supabase
		.from('tenants')
		.select('id, company_name')
		.eq('owner_id', user.id)
		.single();

	if (!tenant) redirect('/dashboard');

	// 3. Fetch the specific Lead details
	const { data: lead } = await supabase
		.from('leads')
		.select('*')
		.eq('id', id)
		.single();

	if (!lead) notFound();

	// 4. Placeholder AI Text
	// This will pre-fill the form so you don't start from a blank screen.
	const aiGeneratedContent = `## ${lead.project_type} Proposal\n\n**Client:** ${lead.client_name}\n**Timeline:** ${lead.timeline}\n\n### Scope of Work\nThis project involves a comprehensive transformation of the space, focusing on high-end materials and precision craftsmanship. \n\n**Included in this scope:**\n- Initial site prep and protection\n- Premium material procurement\n- Master-level installation\n- Final project walkthrough`;

	return (
		<div className="min-h-screen bg-[#020617] py-12 px-6">
			<div className="max-w-4xl mx-auto">
				{/* Header Section */}
				<div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
					<div>
						<Link
							href={`/dashboard/leads/${id}`}
							className="flex items-center gap-2 text-slate-500 hover:text-white font-bold text-xs uppercase tracking-widest transition-colors mb-4"
						>
							<ArrowLeft size={14} /> Back to {lead.client_name}
						</Link>
						<h1 className="text-5xl font-black text-white italic uppercase tracking-tighter leading-none">
							Draft <span className="text-amber-500">Vault</span> Proposal
						</h1>
						<p className="text-slate-400 mt-4 font-medium max-w-md">
							Review and refine the AI-generated scope. This proposal will be
							stored in the client&quot;s private portal once sent.
						</p>
					</div>

					<div className="hidden md:block">
						<div className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full">
							<Sparkles size={16} className="text-amber-500" />
							<span className="text-white text-[10px] font-black uppercase tracking-widest">
								AI Architect Active
							</span>
						</div>
					</div>
				</div>

				{/* The Proposal Form (Client Component) */}
				<div className="relative">
					<div className="absolute -inset-1 bg-gradient-to-r from-amber-500/20 to-blue-500/20 blur-2xl opacity-20" />
					<div className="relative">
						<ProposalForm
							tenantId={tenant.id}
							lead={lead}
							proposalText={aiGeneratedContent}
						/>
					</div>
				</div>

				{/* Bottom Branding */}
				<div className="mt-12 text-center">
					<p className="text-[10px] text-slate-600 font-black uppercase tracking-[0.2em]">
						Powered by BuildRail Proposal Engine
					</p>
				</div>
			</div>
		</div>
	);
}
