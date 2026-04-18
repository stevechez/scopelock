import { createClient } from '@/utils/supabase/server';
import { notFound } from 'next/navigation';
import { PayButton } from '@/components/PayButton';

interface MilestoneWithProject {
	title: string;
	amount: number;
	projects: {
		name: string;
	} | null;
}

export default async function PaymentPage({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const { id } = await params;
	const supabase = await createClient();

	const { data, error } = await supabase
		.from('milestones')
		.select(
			`
            title,
            amount,
            projects:project_id (
                name
            )
        `,
		)
		.eq('id', id)
		.single();

	if (error || !data) notFound();

	const milestone = data as unknown as MilestoneWithProject;
	const projectName = milestone.projects?.name || 'Project Details';

	return (
		<div className="min-h-screen bg-[#05070f] flex items-center justify-center p-6 font-sans text-white">
			<div className="bg-white/[0.03] border border-white/10 p-12 rounded-[3rem] max-w-md w-full text-center space-y-8 backdrop-blur-xl shadow-2xl">
				<div>
					<div className="inline-block bg-amber-500/10 border border-amber-500/20 rounded-full px-4 py-1 mb-6">
						<p className="text-amber-500 font-black text-[9px] uppercase tracking-[0.4em]">
							Secure Payment Portal
						</p>
					</div>
					<h1 className="text-5xl font-black italic uppercase tracking-tighter leading-[0.9]">
						{milestone.title}
					</h1>
					<p className="text-white/30 text-xs mt-4 font-bold uppercase tracking-widest">
						{projectName}
					</p>
				</div>

				<div className="py-10 border-y border-white/5">
					<p className="text-white/20 text-[10px] font-black uppercase tracking-[0.2em] mb-2">
						Amount Due
					</p>
					<p className="text-7xl font-black italic tracking-tighter">
						${milestone.amount?.toLocaleString()}
					</p>
				</div>

				<div className="space-y-4">
					<PayButton milestoneId={id} />
					<p className="text-[9px] text-white/10 font-medium uppercase tracking-[0.1em]">
						Protected by ScopeLock™ Encryption
					</p>
				</div>
			</div>
		</div>
	);
}
