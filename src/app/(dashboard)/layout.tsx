import { ReactNode } from 'react';
import Sidebar from '@/components/dashboard/Sidebar';

export default function DashboardLayout({ children }: { children: ReactNode }) {
	return (
		<div className="min-h-screen bg-slate-950 selection:bg-amber-500/30 flex">
			{/* 1. Atmospheric Background Layer */}
			<div className="fixed inset-0 overflow-hidden pointer-events-none">
				<div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-amber-500/5 blur-[120px] rounded-full" />
				<div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] bg-indigo-500/5 blur-[120px] rounded-full" />
			</div>

			{/* 2. Navigation Layer */}
			<Sidebar />

			{/* 3. Content Layer */}
			<div className="flex-1 flex flex-col min-w-0 relative">
				{/* Increase to PT-32 (128px) for extra breathing room.
       Ensure the main area is relative so it respects the padding.
    */}
				<main className="relative z-10 flex-1 lg:pl-20 pt-32 pb-20">
					<div className="max-w-[1400px] mx-auto px-6 md:px-10">{children}</div>
				</main>
				{/* Persistent Footer - Integrated into the main content flow */}
				<footer className="relative z-20 w-full px-10 pb-12 pt-8 pointer-events-none lg:pl-32">
					{' '}
					<div className="max-w-7xl flex justify-between items-center opacity-40 text-[10px] font-bold uppercase tracking-[0.2em] text-muted">
						<div>BuildRail // Provisioning Engine v1.0</div>
						<div className="flex items-center gap-2">
							<span className="w-1 h-1 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)]" />
							Secure Connection Established
						</div>
					</div>
				</footer>
			</div>
		</div>
	);
}
