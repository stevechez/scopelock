import { createClient } from '@/utils/supabase/server';
import { notFound, redirect } from 'next/navigation';
import { createMilestonePaymentLink } from '@/app/actions';
import { PayButton } from '@/components/PayButton';

interface PageProps {
	params: Promise<{ id: string }>;
}

export default async function PayRailGateway({ params }: PageProps) {
	const { id } = await params;

	const supabase = await createClient();

	// 1. Fetch the milestone
	const { data: milestone, error } = await supabase
		.from('milestones')
		.select(
			`
            *,
            jobs (
                title,
                tenant_id,
                tenants (
                    company_name
                )
            )
        `,
		)
		.eq('id', id)
		.single();

	if (error || !milestone) {
		notFound();
	}

	const job = milestone.jobs;

	// 2. THIS IS THE MISSING FUNCTION
	const handleCheckout = async () => {
		'use server';

		const checkoutUrl = await createMilestonePaymentLink(
			job.tenant_id,
			milestone.id,
			milestone.title,
			milestone.amount,
		);

		redirect(checkoutUrl);
	};

	// 3. The UI
	return (
		<div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-6 font-sans">
			<div className="w-full max-w-lg bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl">
				<h1 className="text-2xl font-black text-white mb-4">{job.title}</h1>
				<div className="text-4xl font-black text-amber-500 mb-8">
					${Number(milestone.amount).toLocaleString()}
				</div>

				{/* 4. The button now has access to the function above! */}
				<PayButton
					handleCheckout={handleCheckout}
					amount={Number(milestone.amount)}
				/>
			</div>
		</div>
	);
}
