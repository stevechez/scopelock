'use client';

import { useActionState } from 'react';
import { updateTenantSettings } from '@/app/actions';
import { Loader2, Save } from 'lucide-react';

export default function SettingsForm({ currentName }: { currentName: string }) {
	const [state, formAction, isPending] = useActionState(
		updateTenantSettings,
		{}, // Pass an empty object instead of null
	);

	return (
		<form action={formAction} className="space-y-6">
			<div>
				<label className="block text-[10px] font-black text-muted uppercase tracking-widest mb-2">
					Company Name
				</label>
				<input
					type="text"
					name="companyName"
					defaultValue={currentName}
					required
					className="w-full bg-slate-50 dark:bg-slate-900/50 border border-border dark:border-white/10 rounded-xl p-4 text-foreground text-foreground font-medium focus:ring-2 focus:ring-amber-500 focus:outline-none transition-all"
				/>
			</div>

			<button
				type="submit"
				disabled={isPending}
				className="bg-amber-500 text-slate-950 px-6 py-4 rounded-xl font-black text-sm uppercase tracking-widest flex items-center gap-2 hover:bg-amber-400 transition-all disabled:opacity-50"
			>
				{isPending ? (
					<Loader2 size={18} className="animate-spin" />
				) : (
					<Save size={18} />
				)}
				{isPending ? 'Saving...' : 'Save Changes'}
			</button>

			{/* Success/Error Feedback */}
			{state?.success && (
				<div className="text-emerald-500 font-bold text-sm bg-emerald-50 dark:bg-emerald-500/10 p-4 rounded-xl border border-emerald-100 dark:border-emerald-500/20 inline-block">
					{state.message}
				</div>
			)}
			{state?.success === false && (
				<div className="text-red-500 font-bold text-sm bg-red-50 dark:bg-red-500/10 p-4 rounded-xl border border-red-100 dark:border-red-500/20 inline-block">
					{state.message}
				</div>
			)}
		</form>
	);
}
