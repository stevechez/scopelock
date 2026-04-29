import ROICalculator from './ROICalculator';
import Link from 'next/link';
import { getAppUrl } from '@/utils/urls';

export default function MarketingPage() {
	return (
		<div className="min-h-screen bg-slate-950 text-white selection:bg-amber-500/30 overflow-hidden">
			{/* Minimalist Nav */}
			<nav className="max-w-7xl mx-auto px-6 py-6 flex justify-between items-center">
				<div className="text-xl font-black italic tracking-tighter">
					BuildRail
				</div>
				<div className="space-x-4">
					{/* Note: This links directly to your app subdomain! */}
					<Link
						href={getAppUrl('/login')}
						className="text-sm font-bold hover:text-amber-500 transition-colors"
					>
						Log In
					</Link>

					<Link
						href={getAppUrl('/signup')}
						className="text-sm font-bold bg-white text-black px-6 py-2.5 rounded-full hover:bg-amber-500 transition-all"
					>
						Start Free Trial
					</Link>
				</div>
			</nav>

			<main className="max-w-7xl mx-auto px-6 pt-20 pb-32 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
				{/* The "Belief Shock" Copy */}
				<div>
					<div className="inline-block bg-slate-900 border border-slate-800 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest text-amber-500 mb-8">
						For Elite Contractors
					</div>
					<h1 className="text-6xl md:text-7xl font-black tracking-tight leading-[1.1] mb-6">
						Stop losing <span className="italic text-muted">premium</span> jobs
						to better presentation.
					</h1>
					<p className="text-xl text-muted mb-10 max-w-lg leading-relaxed">
						Homeowners judge the quality of your craftsmanship by the quality of
						your communication. Replace PDF proposals with custom-branded Client
						Portals and close deals on the spot.
					</p>

					<div className="flex flex-col sm:flex-row gap-4">
						<Link
							href={getAppUrl('/signup')}
							className="text-center bg-amber-500 text-foreground font-black px-8 py-4 rounded-xl hover:bg-amber-400 transition-all text-lg"
						>
							Claim Your Portal
						</Link>
						<button className="text-center bg-slate-900 border border-slate-800 text-white font-bold px-8 py-4 rounded-xl hover:bg-slate-800 transition-all text-lg">
							Watch Demo
						</button>
					</div>

					<div className="mt-12 flex items-center gap-4 text-sm font-bold text-muted">
						<span>✓ No credit card required</span>
						<span>✓ Setup in 60 seconds</span>
					</div>
				</div>

				{/* The Calculator Injection */}
				<div className="relative">
					{/* Glowing background effect */}
					<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-amber-500/20 blur-[100px] rounded-full pointer-events-none"></div>

					<div className="relative z-10">
						<ROICalculator />
					</div>
				</div>
			</main>
		</div>
	);
}
