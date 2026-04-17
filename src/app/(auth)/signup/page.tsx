'use client';

import { useActionState } from 'react';
import { signUpAction } from '@/app/actions/auth';

const initialState = { error: '', success: false };

export default function SignupPage() {
	const [state, formAction, isPending] = useActionState(
		signUpAction,
		initialState,
	);

	return (
		<div className="min-h-screen bg-[#050505] flex items-center justify-center p-6 text-white selection:bg-amber-500/30">
			<div className="bg-[#0a0a0a] border border-white/10 p-12 rounded-[2.5rem] shadow-2xl w-full max-w-md">
				<div className="text-center mb-10">
					<h1 className="text-4xl font-black italic tracking-tighter uppercase mb-2">
						BuildRail
					</h1>
					<p className="text-zinc-500 font-bold text-sm tracking-widest uppercase">
						Create your Arsenal
					</p>
				</div>

				<form action={formAction} className="space-y-5">
					<div className="space-y-2">
						<label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 ml-1">
							Work Email
						</label>
						<input
							name="email"
							type="email"
							required
							placeholder="name@company.com"
							className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all text-sm"
						/>
					</div>
					<div className="space-y-2">
						<label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 ml-1">
							Password
						</label>
						<input
							name="password"
							type="password"
							required
							placeholder="••••••••"
							className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all text-sm"
						/>
					</div>

					{state?.error && (
						<p className="text-red-400 text-xs font-black text-center uppercase tracking-widest">
							⚠️ {state.error}
						</p>
					)}

					<button
						disabled={isPending}
						className="w-full bg-white text-black font-black py-4 rounded-2xl hover:bg-amber-500 hover:text-white transition-all shadow-xl active:scale-95 disabled:opacity-50"
					>
						{isPending ? 'MINTING ACCOUNT...' : 'CONTINUE TO ONBOARDING'}
					</button>
				</form>

				<p className="mt-8 text-center text-[10px] font-black uppercase tracking-widest text-zinc-600">
					Proprietary OS for elite contractors.
				</p>
			</div>
		</div>
	);
}
