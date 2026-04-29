import Link from 'next/link';
import { ArrowLeft, Zap } from 'lucide-react';

export default function TermsPage() {
	return (
		<div className="min-h-screen bg-slate-50 selection:bg-slate-900 selection:text-white pb-32">
			<nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-border px-6 py-4">
				<div className="max-w-3xl mx-auto flex justify-between items-center">
					<Link
						href="/"
						className="flex items-center gap-2 hover:opacity-80 transition-opacity"
					>
						<div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center">
							<Zap size={16} className="text-white fill-white" />
						</div>
						<span className="font-black text-xl tracking-tight italic">
							BuildRail
							<span className="text-muted font-medium not-italic">OS</span>
						</span>
					</Link>
					<Link
						href="/"
						className="flex items-center gap-2 text-[10px] font-bold text-muted uppercase tracking-widest hover:text-foreground transition-colors"
					>
						<ArrowLeft size={14} /> Back to Site
					</Link>
				</div>
			</nav>

			<main className="max-w-3xl mx-auto px-6 pt-32">
				<h1 className="text-4xl font-black text-foreground tracking-tight mb-4">
					Terms of Service
				</h1>
				<p className="text-sm font-bold text-muted uppercase tracking-widest mb-12">
					Last Updated: April 2026
				</p>

				<article className="prose prose-slate prose-p:text-slate-600 prose-headings:font-black prose-headings:text-foreground max-w-none space-y-8">
					<section>
						<h2 className="text-2xl mb-4">1. Scope of Service</h2>
						<p className="leading-relaxed">
							BuildRail provides a digital infrastructure for tracking project
							milestones, facilitating change orders (ScopeLock™), and
							requesting payments. By using this service, you agree to the
							electronic delivery of project updates and invoices.
						</p>
					</section>

					<section>
						<h2 className="text-2xl mb-4">
							2. Milestone Approvals & Change Orders
						</h2>
						<p className="leading-relaxed">
							When a progress photo is submitted and a payment is requested, or
							when a change order is digitally presented, your authorization via
							our secure payment gateway (Lemon Squeezy) constitutes a legally
							binding acceptance of the completed work or the requested scope
							modification.
						</p>
					</section>

					<section>
						<h2 className="text-2xl mb-4">3. Platform Liability</h2>
						<p className="leading-relaxed">
							BuildRail acts strictly as the software interface between the
							builder and the client. We are not liable for the physical quality
							of construction, project delays, or disputes arising from the
							real-world execution of the contracted work.
						</p>
					</section>
				</article>
			</main>
		</div>
	);
}
