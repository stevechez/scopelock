import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import ProposalForm from './ProposalForm';

export default async function NewProposalPage() {
	const supabase = await createClient();

	// 1. Authenticate the Contractor
	const {
		data: { user },
	} = await supabase.auth.getUser();
	if (!user) redirect('/login');

	// 2. Get the Tenant ID (Required to link the proposal to the right brand)
	const { data: tenant } = await supabase
		.from('tenants')
		.select('id')
		.eq('owner_id', user.id)
		.single();

	if (!tenant) {
		// If they haven't set up a tenant yet, they can't make a proposal
		redirect('/app/settings');
	}

	return (
		<div className="max-w-4xl mx-auto py-12 px-6">
			<div className="mb-10">
				<h1 className="text-4xl font-black tracking-tight text-white italic">
					Draft New Proposal
				</h1>
				<p className="text-slate-500 mt-2 font-medium">
					Create a high-end project scope for your client’s Vault.
				</p>
			</div>

			{/* Pass the real tenant ID to the Client Form */}
			<ProposalForm tenantId={tenant.id} />
		</div>
	);
}
