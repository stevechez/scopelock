// src/app/test-lead/page.tsx
'use client';

import { useActionState } from 'react';
import { submitPublicLead } from '@/app/actions';

export default function TestLeadPage() {
	// initialState is null
	const [state, formAction, isPending] = useActionState(submitPublicLead, null);

	return (
		<div className="max-w-md mx-auto mt-20 p-8 bg-white rounded-3xl shadow-xl border border-slate-100">
			<h2 className="text-2xl font-black mb-6 italic uppercase text-slate-900">
				Request a Quote
			</h2>

			<form action={formAction} className="space-y-4">
				{/* 📍 REPLACE WITH YOUR ACTUAL TENANT ID FROM SUPABASE */}
				<input
					type="hidden"
					name="tenant_id"
					value="c798b3d0-ead8-4619-816a-73980bf68ef0"
				/>

				<input
					name="client_name"
					placeholder="Your Name"
					className="w-full p-3 rounded-xl border border-slate-200 text-slate-900 focus:ring-2 focus:ring-amber-500 outline-none"
					required
				/>
				<input
					name="client_email"
					type="email"
					placeholder="Email"
					className="w-full p-3 rounded-xl border border-slate-200 text-slate-900 focus:ring-2 focus:ring-amber-500 outline-none"
					required
				/>
				<input
					name="project_type"
					placeholder="Project (e.g. Kitchen Remodel)"
					className="w-full p-3 rounded-xl border border-slate-200 text-slate-900 focus:ring-2 focus:ring-amber-500 outline-none"
				/>
				<input
					name="budget"
					placeholder="Budget (e.g. $50k)"
					className="w-full p-3 rounded-xl border border-slate-200 text-slate-900 focus:ring-2 focus:ring-amber-500 outline-none"
				/>

				<button
					type="submit"
					disabled={isPending}
					className="w-full bg-slate-900 text-white font-bold py-4 rounded-xl hover:bg-amber-500 hover:text-slate-900 transition-all disabled:opacity-50 flex justify-center items-center"
				>
					{isPending ? 'Sending...' : 'Submit Request'}
				</button>

				{/* Feedback UI */}
				{state?.success && (
					<div className="bg-emerald-50 p-4 rounded-xl border border-emerald-100 mt-4">
						<p className="text-emerald-700 font-bold text-center text-sm">
							✨ Lead sent successfully!
						</p>
					</div>
				)}

				{state?.success === false && (
					<div className="bg-red-50 p-4 rounded-xl border border-red-100 mt-4">
						<p className="text-red-700 font-bold text-center text-sm">
							{state.message || 'Something went wrong.'}
						</p>
					</div>
				)}
			</form>
		</div>
	);
}
