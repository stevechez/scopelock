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
		<div className="min-h-screen bg-slate-950 flex items-center justify-center p-6 text-white selection:bg-amber-500/30">
			<div className="bg-slate-900 border border-slate-800 p-12 rounded-[2rem] shadow-2xl w-full max-w-md">
				<div className="text-center mb-8">
					<h1 className="text-3xl font-black italic mb-2">Join Blueprint OS</h1>
					<p className="text-slate-400">Create your command center.</p>
				</div>

				<form action={formAction} className="space-y-4">
					<div>
						<label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">
							Email Address
						</label>
						<input
							name="email"
							type="email"
							required
							placeholder="you@company.com"
							className="w-full bg-slate-800 border border-slate-700 rounded-xl p-4 text-white focus:border-amber-500 outline-none transition-all"
						/>
					</div>

					<div>
						<label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">
							Password
						</label>
						<input
							name="password"
							type="password"
							required
							placeholder="••••••••"
							minLength={6}
							className="w-full bg-slate-800 border border-slate-700 rounded-xl p-4 text-white focus:border-amber-500 outline-none transition-all"
						/>
					</div>

					{state.error && (
						<p className="text-red-400 text-sm font-bold mt-2 text-center">
							⚠️ {state.error}
						</p>
					)}

					<button
						type="submit"
						disabled={isPending}
						className="w-full bg-amber-500 text-slate-900 font-black py-4 rounded-xl hover:bg-amber-400 transition-all mt-4 disabled:opacity-50"
					>
						{isPending ? 'Creating Account...' : 'Continue with Email'}
					</button>
				</form>

				<div className="mt-6 text-center text-sm font-bold text-slate-500">
					Already have an account?{' '}
					<a href="/login" className="text-amber-500 hover:text-amber-400">
						Log In
					</a>
				</div>
			</div>
		</div>
	);
}
