import { Camera, Send, History } from 'lucide-react';
import { DailyPulseForm } from '@/components/DailyPulseFormBulletin';

export default async function DailyPulsePage({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const { id } = await params;

	return (
		<div className="flex-1 flex flex-col bg-slate-50 min-h-screen pb-20">
			<header className="p-6 bg-white border-b border-slate-100">
				<h1 className="text-2xl font-black text-slate-900">Daily Pulse</h1>
				<p className="text-slate-500 font-medium italic">
					&ldquo;Pic or it didn&quot;t happen.&rdquo;
				</p>
			</header>

			<div className="p-6">
				<DailyPulseForm jobId={id} />
			</div>

			{/* We will eventually map the log history here */}
			<div className="px-6 mt-4">
				<button className="w-full py-4 border-2 border-dashed border-slate-300 rounded-2xl text-slate-400 font-bold flex items-center justify-center gap-2">
					<History size={18} />
					View Past Pulses
				</button>
			</div>
		</div>
	);
}
