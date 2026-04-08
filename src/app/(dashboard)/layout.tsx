import { ReactNode } from 'react';

export default function OnboardingLayout({
	children,
}: {
	children: ReactNode;
}) {
	return (
		<div className="min-h-screen bg-slate-950 selection:bg-amber-500/30">
			{/* Subtle background glow for the '1% Engineering' feel */}
			<div className="fixed inset-0 overflow-hidden pointer-events-none">
				<div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-amber-500/5 blur-[120px] rounded-full" />
				<div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] bg-indigo-500/5 blur-[120px] rounded-full" />
			</div>

			{/* Main Content Container */}
			<main className="relative z-10">{children}</main>

			{/* Persistent Footer for Support/Trust */}
			<footer className="fixed bottom-8 left-0 w-full px-6 pointer-events-none">
				<div className="max-w-7xl mx-auto flex justify-between items-center opacity-40 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
					<div>BuildRail // Provisioning Engine v1.0</div>
					<div>Secure Connection Established</div>
				</div>
			</footer>
		</div>
	);
}
