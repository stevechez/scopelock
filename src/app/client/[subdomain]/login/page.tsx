import { createClient } from '@/utils/supabase/server';
import { notFound } from 'next/navigation';
import ClientLoginForm from '@/components/ClientLoginForm'; // Adjust path if needed

export default async function ClientLoginPage(props: {
	params: Promise<{ subdomain: string }>;
}) {
	const { subdomain } = await props.params;
	const supabase = await createClient();

	const { data: tenant } = await supabase
		.from('tenants')
		.select('name')
		.eq('subdomain', subdomain)
		.single();

	if (!tenant) notFound();

	return (
		<div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-6 text-white selection:bg-amber-500/30">
			<div className="text-center mb-10">
				<p className="text-amber-500 font-bold uppercase tracking-[0.3em] text-xs mb-2">
					Client Portal
				</p>
				<h1 className="text-4xl font-black italic tracking-tight">
					{tenant.name}
				</h1>
			</div>

			<div className="bg-slate-900 border border-slate-800 p-10 rounded-[2rem] shadow-2xl w-full max-w-sm min-h-[300px] flex flex-col justify-center">
				<p className="text-slate-400 text-center mb-8 font-medium">
					Enter your email to access your project vault.
				</p>

				{/* Drop the interactive form here */}
				<ClientLoginForm subdomain={subdomain} />
			</div>

			<div className="mt-12 opacity-50 hover:opacity-100 transition-opacity">
				<p className="text-[10px] uppercase tracking-widest font-bold text-slate-500">
					Powered by <span className="text-white italic">BuildRail</span>
				</p>
			</div>
		</div>
	);
}
