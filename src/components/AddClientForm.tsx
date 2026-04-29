'use client';

import { useActionState, useEffect, useRef } from 'react';
import { addClientAction, type ClientFormState } from '@/app/actions/client';

const initialState: ClientFormState = { error: '', success: false };

export default function AddClientForm() {
	const [state, formAction, isPending] = useActionState(
		addClientAction,
		initialState,
	);
	const formRef = useRef<HTMLFormElement>(null);

	// Clear the form if the submission was successful
	useEffect(() => {
		if (state.success) {
			formRef.current?.reset();
		}
	}, [state.success]);

	return (
		<div className="bg-slate-900 border border-slate-800 p-8 rounded-[2rem] shadow-xl w-full max-w-md">
			<h2 className="text-2xl font-black text-white italic mb-1 uppercase tracking-tight">
				Invite Client
			</h2>
			<p className="text-muted text-sm mb-6 font-medium">
				Provision a new secure vault.
			</p>

			<form ref={formRef} action={formAction} className="space-y-4">
				<div className="flex gap-4">
					<div className="w-1/2">
						<input
							name="firstName"
							required
							placeholder="First Name"
							className="w-full bg-slate-800/50 border border-slate-700 rounded-xl p-3 text-white focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none transition-all placeholder:text-muted"
						/>
					</div>
					<div className="w-1/2">
						<input
							name="lastName"
							required
							placeholder="Last Name"
							className="w-full bg-slate-800/50 border border-slate-700 rounded-xl p-3 text-white focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none transition-all placeholder:text-muted"
						/>
					</div>
				</div>

				<input
					name="email"
					type="email"
					required
					placeholder="client@email.com"
					className="w-full bg-slate-800/50 border border-slate-700 rounded-xl p-3 text-white focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none transition-all placeholder:text-muted"
				/>

				{state.error && (
					<p className="text-red-400 text-xs font-bold text-center italic mt-2">
						⚠️ {state.error}
					</p>
				)}

				{state.success && (
					<p className="text-emerald-400 text-xs font-bold text-center italic mt-2">
						✅ Client vault provisioned successfully!
					</p>
				)}

				<button
					type="submit"
					disabled={isPending}
					className="w-full bg-amber-500 text-slate-950 font-black py-3 rounded-xl hover:bg-amber-400 transition-all disabled:opacity-50 mt-2 active:scale-[0.98]"
				>
					{isPending ? 'Generating Vault...' : 'Create Client Vault'}
				</button>
			</form>
		</div>
	);
}
