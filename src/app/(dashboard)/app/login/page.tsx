'use client';

import { useActionState } from 'react';
import { loginAction } from '@/app/actions/auth';

const initialState = { error: '', success: false };

export default function LoginPage() {
	// This hook manages the loading state and server errors automatically
	const [state, formAction, isPending] = useActionState(
		loginAction,
		initialState,
	);

	return (
		<div className="min-h-screen bg-slate-950 flex items-center justify-center p-6 text-white selection:bg-amber-500/30">
			<div className="bg-slate-900 border border-slate-800 p-12 rounded-[2rem] shadow-2xl w-full max-w-md">
				<div className="text-center mb-8">
					<h1 className="text-3xl font-black italic mb-2">Welcome Back</h1>
					<p className="text-slate-400">Access your command center.</p>
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
							className="w-full bg-slate-800 border border-slate-700 rounded-xl p-4 text-white focus:border-amber-500 outline-none transition-all"
						/>
					</div>

					{/* Server Action Error Handling */}
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
						{isPending ? 'Authenticating...' : 'Log In'}
					</button>
				</form>

				<div className="mt-6 text-center text-sm font-bold text-slate-500">
					Don&quot;t have an account?{' '}
					<a href="/signup" className="text-amber-500 hover:text-amber-400">
						Sign Up
					</a>
				</div>
			</div>
		</div>
	);
}
