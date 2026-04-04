'use client';

import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';
import { ArrowRight, Loader2 } from 'lucide-react';

// 1. Create the internal component to handle the logic
function SignupForm() {
	const router = useRouter();
	const searchParams = useSearchParams();

	// Grab the plan from the URL, default to 'pro' if they just went to /signup directly
	const initialPlan = searchParams.get('plan') || 'pro';

	// Store it in state so we can send it to the database/stripe later
	const [selectedPlan, setSelectedPlan] = useState(initialPlan);

	// --- THESE WERE MISSING ---
	const [fullName, setFullName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(false);
	const [isSuccess, setIsSuccess] = useState(false);
	// -------------------------

	const handleSignup = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);
		setError(null);

		try {
			const { data, error } = await supabase.auth.signUp({
				email,
				password,
				options: {
					data: {
						full_name: fullName,
						plan: selectedPlan, // 💡 Bonus: We pass the plan to Supabase user metadata!
					},
				},
			});

			if (error) throw error;

			// If email confirmation is ON in Supabase, show a success message
			// If it is OFF, redirect to dashboard immediately
			if (data.user?.identities?.length === 0) {
				setError('This email is already registered. Please sign in.');
			} else if (data.session) {
				router.push('/dashboard');
				router.refresh();
			} else {
				setIsSuccess(true);
			}
		} catch (err) {
			if (err instanceof Error) {
				setError(err.message);
			} else {
				setError('An unexpected error occurred. Please try again.');
			}
		} finally {
			setIsLoading(false);
		}
	};

	if (isSuccess) {
		return (
			<div className="animate-in fade-in slide-in-from-bottom-4 duration-500 text-center">
				<div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl">
					✨
				</div>
				<h1 className="text-3xl font-black text-slate-900 dark:text-white mb-4">
					Check your email
				</h1>
				<p className="text-slate-500 dark:text-slate-400 font-medium mb-8">
					We sent a secure link to <strong>{email}</strong> to verify your
					account.
				</p>
				<Link
					href="/login"
					className="px-8 py-3 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-bold rounded-xl hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
				>
					Return to login
				</Link>
			</div>
		);
	}

	return (
		<div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
			<h1 className="text-3xl font-black text-slate-900 dark:text-white mb-2">
				Build your system
			</h1>
			<p className="text-slate-500 dark:text-slate-400 font-medium mb-8">
				Start your 14-day free trial. No credit card required.
			</p>

			{error && (
				<div className="mb-6 p-4 bg-rose-50 dark:bg-rose-900/20 border-l-4 border-rose-500 text-rose-700 dark:text-rose-400 text-sm font-medium rounded-r-xl">
					{error}
				</div>
			)}

			<form onSubmit={handleSignup} className="space-y-5">
				<div>
					<label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
						Full Name
					</label>
					<input
						type="text"
						required
						value={fullName}
						onChange={e => setFullName(e.target.value)}
						className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 outline-none transition-all dark:text-white"
						placeholder="John Doe"
					/>
				</div>

				<div>
					<label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
						Email Address
					</label>
					<input
						type="email"
						required
						value={email}
						onChange={e => setEmail(e.target.value)}
						className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 outline-none transition-all dark:text-white"
						placeholder="steve@blueprintos.com"
					/>
				</div>

				<div>
					<label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
						Password
					</label>
					<input
						type="password"
						required
						minLength={6}
						value={password}
						onChange={e => setPassword(e.target.value)}
						className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 outline-none transition-all dark:text-white"
						placeholder="At least 6 characters"
					/>
				</div>

				<button
					type="submit"
					disabled={isLoading}
					className="w-full py-4 bg-slate-900 dark:bg-amber-500 text-white dark:text-slate-900 font-black rounded-xl hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:hover:scale-100 shadow-lg mt-2"
				>
					{isLoading ? (
						<Loader2 className="animate-spin" size={20} />
					) : (
						<>
							Create Account <ArrowRight size={20} />
						</>
					)}
				</button>
			</form>

			<p className="mt-8 text-center text-slate-500 dark:text-slate-400 font-medium">
				Already have an account?{' '}
				<Link
					href="/login"
					className="text-slate-900 dark:text-white font-bold hover:text-amber-500 transition-colors"
				>
					Sign in here
				</Link>
			</p>
		</div>
	);
} // <-- This closing bracket was missing!

// 2. Wrap it in Suspense at the bottom of the file
export default function SignupPage() {
	return (
		<Suspense
			fallback={
				<div className="p-8 text-center flex justify-center">
					<Loader2 className="animate-spin text-amber-500" size={32} />
				</div>
			}
		>
			<SignupForm />
		</Suspense>
	);
}
