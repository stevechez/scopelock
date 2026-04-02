import React from 'react';
import Link from 'next/link';
import {
	ShieldCheck,
	Zap,
	Smartphone,
	ArrowRight,
	BarChart3,
	Lock,
	MessageSquare,
} from 'lucide-react';

export default function LandingPage() {
	return (
		<div className="min-h-screen bg-white text-slate-900 selection:bg-slate-900 selection:text-white">
			{/* 1. NAV BAR: Transparent & Minimal */}
			<nav className="fixed top-0 w-full z-50 bg-white/70 backdrop-blur-md border-b border-slate-100 px-6 py-4">
				<div className="max-w-6xl mx-auto flex justify-between items-center">
					<div className="flex items-center gap-2">
						<div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center">
							<Zap size={16} className="text-white fill-white" />
						</div>
						<span className="font-black text-xl tracking-tight italic">
							Blueprint
							<span className="text-slate-400 font-medium not-italic">OS</span>
						</span>
					</div>
					<Link
						href="/dashboard"
						className="text-xs font-bold uppercase tracking-widest text-slate-500 hover:text-slate-900 transition-colors"
					>
						Sign In
					</Link>
				</div>
			</nav>

			{/* 2. HERO SECTION: The Value Proposition */}
			<section className="pt-32 pb-20 px-6 bg-gradient-to-b from-slate-50 to-white">
				<div className="max-w-4xl mx-auto text-center">
					<div className="inline-flex items-center gap-2 bg-slate-900 text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest mb-6">
						<span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />{' '}
						Now in Private Beta
					</div>
					<h1 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tighter leading-[0.9] mb-6">
						The Operating System <br />
						<span className="text-slate-400 font-medium italic">
							for Elite Builders.
						</span>
					</h1>
					<p className="text-lg md:text-xl text-slate-500 font-medium max-w-2xl mx-auto mb-10 leading-relaxed">
						Eliminate payment friction and automate project transparency.
						BlueprintOS turns site updates into social proof that gets you paid
						instantly.
					</p>
					<div className="flex flex-col sm:flex-row items-center justify-center gap-4">
						<Link
							href="/apply"
							className="w-full sm:w-auto bg-slate-900 text-white px-10 py-5 rounded-2xl font-black text-lg shadow-2xl hover:bg-slate-800 active:scale-95 transition-all flex items-center justify-center gap-2"
						>
							Start for Free <ArrowRight size={20} />
						</Link>
						<p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
							No credit card required.
						</p>
					</div>
				</div>
			</section>

			{/* 3. THE "TRIPLE THREAT" FEATURES */}
			<section className="py-24 px-6 max-w-6xl mx-auto grid md:grid-cols-3 gap-12">
				<div className="group">
					<div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-slate-900 group-hover:text-white transition-colors duration-500">
						<Smartphone size={24} />
					</div>
					<h3 className="text-xl font-black mb-3">SitePulse™</h3>
					<p className="text-slate-500 font-medium leading-relaxed">
						Daily progress photos and notes captured in seconds. Build a digital
						&ldquo;proof-of-life&rdquo; timeline that keeps homeowners
						delighted.
					</p>
				</div>
				<div className="group">
					<div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-slate-900 group-hover:text-white transition-colors duration-500">
						<Lock size={24} />
					</div>
					<h3 className="text-xl font-black mb-3">ScopeLock™</h3>
					<p className="text-slate-500 font-medium leading-relaxed">
						Capture change orders on the fly. Digital sign-offs mean you never
						do extra work for free again. Secure your margin.
					</p>
				</div>
				<div className="group">
					<div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-slate-900 group-hover:text-white transition-colors duration-500">
						<BarChart3 size={24} />
					</div>
					<h3 className="text-xl font-black mb-3">PayRail™</h3>
					<p className="text-slate-500 font-medium leading-relaxed">
						SMS-triggered payment requests. Homeowners pay via Apple Pay or Card
						the moment a milestone is marked complete.
					</p>
				</div>
			</section>

			{/* 4. THE TRUST SECTION (Social Proof) */}
			<section className="bg-slate-50 py-24 px-6 border-y border-slate-100">
				<div className="max-w-4xl mx-auto text-center">
					<div className="flex justify-center gap-1 mb-8">
						{[...Array(5)].map((_, i) => (
							<div
								key={i}
								className="w-5 h-5 bg-slate-900 rounded-sm flex items-center justify-center"
							>
								<Zap size={12} className="text-white fill-white" />
							</div>
						))}
					</div>
					<blockquote className="text-2xl md:text-3xl font-bold text-slate-800 leading-tight italic mb-8">
						&ldquo;BlueprintOS changed the way my clients perceive my business.
						They don&quot;t just see a contractor; they see a professional
						organization in total control.&rdquo;
					</blockquote>
					<p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
						— Elite Contractor, Cupertino CA
					</p>
				</div>
			</section>

			{/* 5. CTA: The Final Push */}
			<section className="py-32 px-6">
				<div className="max-w-2xl mx-auto bg-slate-900 rounded-[3rem] p-12 text-center shadow-2xl relative overflow-hidden">
					{/* Background Detail */}
					<div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16" />

					<h2 className="text-3xl font-black text-white mb-6">
						Ready to upgrade <br /> your project experience?
					</h2>
					<Link
						href="/apply"
						className="inline-flex bg-white text-slate-900 px-10 py-5 rounded-2xl font-black text-lg hover:bg-slate-100 transition-colors"
					>
						Start for Free
					</Link>
					<p className="text-slate-400 text-xs mt-6 font-medium">
						Join the next generation of builders.
					</p>
				</div>
			</section>

			{/* 6. FOOTER */}
			<footer className="py-12 px-6 border-t border-slate-100">
				<div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
					<div className="flex items-center gap-2 opacity-30 grayscale">
						<div className="w-6 h-6 bg-slate-900 rounded flex items-center justify-center">
							<Zap size={12} className="text-white fill-white" />
						</div>
						<span className="font-black text-sm tracking-tight italic">
							Blueprint<span className="font-medium not-italic">OS</span>
						</span>
					</div>

					{/* The correctly wired footer links */}
					<div className="flex gap-8">
						<Link
							href="/privacy"
							className="text-[10px] font-bold text-slate-400 uppercase tracking-widest hover:text-slate-900 transition-colors"
						>
							Privacy Policy
						</Link>
						<Link
							href="/terms"
							className="text-[10px] font-bold text-slate-400 uppercase tracking-widest hover:text-slate-900 transition-colors"
						>
							Terms of Service
						</Link>
						<Link
							href="/support"
							className="text-[10px] font-bold text-slate-400 uppercase tracking-widest hover:text-slate-900 transition-colors"
						>
							Support
						</Link>
					</div>
				</div>
			</footer>
		</div>
	);
}
