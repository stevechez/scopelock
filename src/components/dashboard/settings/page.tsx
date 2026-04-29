import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import SettingsForm from '@/components/dashboard/SettingsForm';
import { Settings } from 'lucide-react';
import QuickBooksSettings from '@/components/dashboard/QuickBooksSettings';

export default async function SettingsPage() {
	const supabase = await createClient();

	const {
		data: { user },
	} = await supabase.auth.getUser();
	if (!user) redirect('/login');

	const { data: tenant } = await supabase
		.from('tenants')
		.select('name')
		.eq('owner_id', user.id)
		.single();

	if (!tenant) redirect('/onboarding');

	return (
		<div className="mt-20 p-8 max-w-3xl mx-auto space-y-10">
			{/* Header */}
			<div>
				<h1 className="text-4xl font-black text-foreground text-foreground tracking-tight italic uppercase leading-none flex items-center gap-3">
					<Settings className="text-amber-500" size={36} />
					Platform Settings
				</h1>
				<p className="text-muted dark:text-muted font-medium mt-2">
					Manage your company profile and preferences.
				</p>
			</div>

			{/* Settings Card */}
			<div className="bg-white dark:bg-[#0B101E] p-8 rounded-[2.5rem] border border-border dark:border-white/5 shadow-xl transition-colors">
				<h2 className="text-xl font-black text-foreground text-foreground italic uppercase mb-8 border-b border-border dark:border-white/5 pb-4">
					Company Profile
				</h2>

				<SettingsForm currentName={tenant.name} />
			</div>
		</div>
	);
}
