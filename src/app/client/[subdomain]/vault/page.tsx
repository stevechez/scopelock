import { createClient } from '@/utils/supabase/server';
import { notFound, redirect } from 'next/navigation';
import VaultGallery from '@/components/VaultGallery';

export default async function ClientVaultPage(props: {
	params: Promise<{ subdomain: string }>;
}) {
	const { subdomain } = await props.params;
	const supabase = await createClient();

	// 1. Get the current user from the session
	const {
		data: { user },
	} = await supabase.auth.getUser();
	if (!user) redirect('/login');

	// 2. Fetch the Tenant using the subdomain from the URL
	const { data: tenant } = await supabase
		.from('tenants')
		.select('*')
		.eq('subdomain', subdomain)
		.single();

	if (!tenant) notFound();

	// 3. FETCH BY EMAIL (Case-Insensitive)
	// We trim and lowercase both to ensure a perfect match
	const { data: clientRecord } = await supabase
		.from('clients')
		.select('*')
		.eq('tenant_id', tenant.id)
		.ilike('email', user.email?.trim() || '') // ilike is case-insensitive
		.maybeSingle();

	// 4. THE HANDSHAKE: If we found a record but the ID isn't linked yet, link it!
	if (clientRecord && !clientRecord.auth_user_id) {
		await supabase
			.from('clients')
			.update({ auth_user_id: user.id })
			.eq('id', clientRecord.id);
	}

	// 5. IF STILL NO RECORD, SHOW ACCESS DENIED
	if (!clientRecord) {
		return (
			<div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-6 text-center">
				<div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center mb-6 border border-red-500/20">
					<span className="text-3xl">🚫</span>
				</div>
				<h1 className="text-2xl font-black text-white mb-2 uppercase italic">
					Access Denied
				</h1>
				<p className="text-slate-400 max-w-sm mb-8">
					We found your account ({user.email}), but it isn&quot;t linked to the{' '}
					<span className="text-white font-bold">{tenant.name}</span> project.
				</p>
				<div className="bg-slate-900 p-4 rounded-xl text-left mb-8 font-mono text-[10px] text-slate-500">
					<p>Debug Info:</p>
					<p>Target Subdomain: {subdomain}</p>
					<p>Target Tenant ID: {tenant.id.substring(0, 8)}...</p>
				</div>
				<a
					href="/login"
					className="text-amber-500 font-black uppercase tracking-widest text-xs"
				>
					← Back to Login
				</a>
			</div>
		);
	}

	// 6. SUCCESS
	return (
		<div className="min-h-screen bg-slate-950 text-white p-8">
			<header className="max-w-6xl mx-auto flex justify-between items-center mb-16">
				<div>
					<p className="text-amber-500 font-bold uppercase tracking-[0.3em] text-[10px] mb-2">
						Secure Portal
					</p>
					<h1 className="text-4xl font-black italic uppercase">
						{tenant.name}
					</h1>
				</div>
				<div className="bg-slate-900 border border-slate-800 px-6 py-3 rounded-full text-sm font-bold">
					Project:{' '}
					<span className="italic">
						{clientRecord.first_name} {clientRecord.last_name}
					</span>
				</div>
			</header>

			<main className="max-w-6xl mx-auto">
				<VaultGallery tenantId={tenant.id} />
			</main>
		</div>
	);
}
