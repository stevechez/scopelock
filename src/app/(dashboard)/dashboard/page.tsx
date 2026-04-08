export const dynamic = 'force-dynamic';

import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import AddClientForm from '@/components/AddClientForm';

export default async function DashboardPage() {
	const supabase = await createClient();

	const {
		data: { user },
	} = await supabase.auth.getUser();
	if (!user) redirect('/login');

	// Safe fetch: Gets all tenants, grabs the first one, ignores the rest
	const { data: tenants } = await supabase
		.from('tenants')
		.select('*')
		.eq('owner_id', user.id);

	const tenant = tenants && tenants.length > 0 ? tenants[0] : null;

	if (!tenant) {
		redirect('/onboarding');
	}

	return (
		<div className="p-8 text-white">
			<h1 className="text-3xl font-black">Welcome back, {tenant.name}</h1>
			<p className="text-slate-400">Your subdomain is: {tenant.subdomain}</p>
			<AddClientForm />
		</div>
	);
}
