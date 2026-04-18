'use client';

import { useActionState } from 'react';
import { submitPublicLead } from '@/app/actions';

// 1. Define the expected response shape locally to fix 'any' or 'unknown' errors
interface ActionResponse {
	success: boolean;
	error?: string;
	message?: string;
}

export default function TestLeadPage() {
	// 2. Hardcoded ID for testing purposes
	const tenantId = 'your-test-tenant-id';

	/**
	 * 3. The Wrapper Function
	 * useActionState expects (state, payload).
	 * Our submitPublicLead action expects (formData, tenantId).
	 * This bridge ensures they talk to each other correctly.
	 */
	const submitAction = async (
		prevState: ActionResponse,
		formData: FormData,
	): Promise<ActionResponse> => {
		try {
			const result = await submitPublicLead(formData, tenantId);
			return result as ActionResponse;
		} catch (err) {
			return {
				success: false,
				error: 'An unexpected error occurred during the test.',
			};
		}
	};

	// 4. Initialize with a valid ActionResponse object instead of null
	const [state, formAction, isPending] = useActionState(submitAction, {
		success: false,
	});

	return (
		<div className="max-w-md mx-auto mt-20 p-8 bg-white rounded-3xl shadow-xl border border-slate-100">
			<h1 className="text-xl font-black mb-6 italic uppercase">
				Lead Submission Test
			</h1>

			<form action={formAction} className="space-y-4">
				<div className="space-y-1">
					<label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
						Client Name
					</label>
					<input
						name="name"
						placeholder="John Doe"
						required
						className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 outline-none focus:ring-2 focus:ring-slate-900 transition-all"
					/>
				</div>

				<div className="space-y-1">
					<label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
						Email Address
					</label>
					<input
						name="email"
						type="email"
						placeholder="john@example.com"
						required
						className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 outline-none focus:ring-2 focus:ring-slate-900 transition-all"
					/>
				</div>

				{/* Adding these because your server action extracts them */}
				<input type="hidden" name="phone" value="555-555-5555" />
				<input type="hidden" name="projectType" value="Test Project" />
				<input type="hidden" name="budget" value="Test Budget" />
				<input type="hidden" name="timeline" value="Test Timeline" />

				<button
					type="submit"
					disabled={isPending}
					className="w-full bg-slate-900 text-white font-bold p-4 rounded-xl disabled:opacity-50 hover:bg-slate-800 transition-all active:scale-[0.98] flex justify-center items-center"
				>
					{isPending ? 'Processing...' : 'Send Test Lead'}
				</button>

				{/* Feedback UI */}
				{state?.error && (
					<div className="p-3 bg-red-50 border border-red-100 rounded-lg">
						<p className="text-red-600 text-xs font-bold">{state.error}</p>
					</div>
				)}

				{state?.success && (
					<div className="p-3 bg-emerald-50 border border-emerald-100 rounded-lg">
						<p className="text-emerald-600 text-xs font-bold">
							{state.message || 'Success! Lead inserted.'}
						</p>
					</div>
				)}
			</form>
		</div>
	);
}
