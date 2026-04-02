import Link from 'next/link';
import { ArrowLeft, Zap } from 'lucide-react';

export default function PrivacyPage() {
	return (
		<div className="min-h-screen bg-slate-50 selection:bg-slate-900 selection:text-white pb-32">
			<nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-100 px-6 py-4">
				<div className="max-w-3xl mx-auto flex justify-between items-center">
					<Link
						href="/"
						className="flex items-center gap-2 hover:opacity-80 transition-opacity"
					>
						<div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center">
							<Zap size={16} className="text-white fill-white" />
						</div>
						<span className="font-black text-xl tracking-tight italic">
							Blueprint
							<span className="text-slate-400 font-medium not-italic">OS</span>
						</span>
					</Link>
					<Link
						href="/"
						className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest hover:text-slate-900 transition-colors"
					>
						<ArrowLeft size={14} /> Back to Site
					</Link>
				</div>
			</nav>

			<main className="max-w-3xl mx-auto px-6 pt-32">
				<h1 className="text-4xl font-black text-slate-900 tracking-tight mb-4">
					Privacy Policy
				</h1>
				<p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-12">
					Last Updated: April 2026
				</p>

				<article className="prose prose-slate prose-p:text-slate-600 prose-headings:font-black prose-headings:text-slate-900 prose-a:text-emerald-600 max-w-none space-y-8">
					<section>
						<h2 className="text-2xl mb-4">1. Data Collection & Usage</h2>
						<p className="leading-relaxed">
							BlueprintOS (&ldquo;we&rdquo;, &ldquo;our&rdquo;, or
							&ldquo;us&rdquo;) collects information necessary to facilitate
							project management, communication, and payment processing between
							contractors and their clients. This includes project details,
							contact information, and timeline data submitted via our
							application forms.
						</p>
					</section>

					<section>
						<h2 className="text-2xl mb-4">2. Third-Party Services</h2>
						<p className="leading-relaxed">
							We utilize industry-leading third-party services to securely
							process your data:
						</p>
						<ul className="list-disc pl-5 mt-4 space-y-2 text-slate-600">
							<li>
								<strong>Twilio:</strong> Used for sending transactional SMS
								updates and payment links securely to your device.
							</li>
							<li>
								<strong>Lemon Squeezy:</strong> Used as our merchant of record
								for processing milestone payments via Apple Pay, Google Pay, and
								major credit cards. We do not store your raw payment data on our
								servers.
							</li>
						</ul>
					</section>

					<section>
						<h2 className="text-2xl mb-4">3. Data Security</h2>
						<p className="leading-relaxed">
							All project photos, communication logs, and change orders are
							secured using 256-bit encryption. Access to the command center is
							restricted via secure authentication protocols to ensure your
							project details remain strictly confidential.
						</p>
					</section>
				</article>
			</main>
		</div>
	);
}
