import { createClient } from '@/utils/supabase/server';
import { redirect, notFound } from 'next/navigation';
import ProposalForm from './ProposalForm';

// ✅ 1. Accept params to get the lead ID from the URL
export default async function NewProposalPage({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const { id } = await params;
	const supabase = await createClient();

	// 2. Authenticate the Contractor
	const {
		data: { user },
	} = await supabase.auth.getUser();
	if (!user) redirect('/login');

	// 3. Get the Tenant ID
	const { data: tenant } = await supabase
		.from('tenants')
		.select('id')
		.eq('owner_id', user.id)
		.single();

	if (!tenant) redirect('/dashboard');

	// ✅ 4. Fetch the Lead details using the ID from the URL
	const { data: lead } = await supabase
		.from('leads')
		.select('*')
		.eq('id', id)
		.single();

	if (!lead) notFound();

	// ✅ 5. Set a placeholder for the AI Content
	// (Later, this will come from your generateAIProposal action)
	const aiGeneratedContent = `Project: ${lead.project_type}\n\nScope of work for ${lead.client_name}...`;

	return (
		<div className="max-w-4xl mx-auto py-12 px-6">
			<div className="mb-10">
				<h1 className="text-4xl font-black tracking-tight text-white italic">
					Draft New Proposal
				</h1>
				<p className="text-slate-500 mt-2 font-medium">
					Create a high-end project scope for {lead.client_name}.
				</p>
			</div>

			{/* ✅ Now lead and aiGeneratedContent are defined! */}
			<ProposalForm
				tenantId={tenant.id}
				lead={lead}
				proposalText={aiGeneratedContent}
			/>
		</div>
	);
}
