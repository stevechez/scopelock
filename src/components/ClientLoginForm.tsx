'use client';

import { useActionState } from 'react';
import {
	sendMagicLinkAction,
	type ClientAuthState,
} from '@/app/actions/client-auth';

const initialState: ClientAuthState = { error: '', success: false };

export default function ClientLoginForm({ subdomain }: { subdomain: string }) {
	const [state, formAction, isPending] = useActionState(
		sendMagicLinkAction,
		initialState,
	);

	// If successful, swap out the form for a friendly success message
	if (state.success) {
		return (
			<div className="text-center py-8">
				<div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-500/10 mb-4">
					<span className="text-2xl">📬</span>
				</div>
				<h3 className="text-xl font-black text-white mb-2">Check your email</h3>
				<p className="text-muted font-medium">
					We sent a secure magic link to your inbox. Click it to access your
					vault.
				</p>
			</div>
		);
	}

	return (
		<form action={formAction} className="space-y-4">
			{/* Hidden input to pass the subdomain to the Server Action */}
			<input type="hidden" name="subdomain" value={subdomain} />

			<input
				name="email"
				type="email"
				required
				placeholder="you@email.com"
				className="w-full bg-slate-800/50 border border-slate-700 rounded-xl p-4 text-white focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none transition-all placeholder:text-slate-600"
			/>

			{state?.error && (
				<div className="bg-red-500/10 border border-red-500/20 rounded-xl p-3">
					<p className="text-red-400 text-xs font-bold text-center italic">
						⚠️ {state.error}
					</p>
				</div>
			)}

			<button
				type="submit"
				disabled={isPending}
				className="w-full bg-amber-500 text-slate-950 font-black py-4 rounded-xl hover:bg-amber-400 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-amber-500/10 active:scale-[0.98]"
			>
				{isPending ? 'Encrypting & Sending...' : 'Send Secure Link'}
			</button>
		</form>
	);
}
