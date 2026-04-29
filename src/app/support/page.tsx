'use client';

import Link from 'next/link';
import { ArrowLeft, Zap, Mail, MessageSquare, ArrowRight } from 'lucide-react';

export default function SupportPage() {
	return (
		<div className="min-h-screen bg-slate-50 selection:bg-slate-900 selection:text-white pb-32">
			<nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-border px-6 py-4">
				<div className="max-w-4xl mx-auto flex justify-between items-center">
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

			<main className="max-w-4xl mx-auto px-6 pt-32">
				<div className="text-center mb-16">
					<h1 className="text-4xl md:text-5xl font-black text-foreground tracking-tight mb-4">
						Client Support
					</h1>
					<p className="text-lg text-muted font-medium max-w-xl mx-auto">
						Need assistance with a payment portal or have questions about your
						active project timeline? We&rsquo;re here to help.
					</p>
				</div>

				<div className="grid md:grid-cols-3 gap-6">
					{/* Direct Contact Card */}
					<div className="bg-white p-8 rounded-[2rem] shadow-xl border border-border md:col-span-2">
						<div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center mb-6">
							<Mail size={24} className="text-emerald-600" />
						</div>
						<h2 className="text-2xl font-black text-foreground mb-2">
							Priority Inbox
						</h2>
						<p className="text-muted mb-8 leading-relaxed">
							For technical issues with the BuildRail platform or secure payment
							links, email our support desk directly.
						</p>
						<a
							href="mailto:support@BuildRail.com"
							className="inline-flex bg-slate-900 text-white font-bold text-sm px-6 py-4 rounded-xl items-center gap-2 hover:bg-slate-800 transition-colors"
						>
							support@BuildRail.com <ArrowRight size={16} />
						</a>
					</div>

					{/* Secondary Contact Options */}
					<div className="space-y-6">
						<div className="bg-white p-6 rounded-[2rem] shadow-sm border border-border flex flex-col justify-center h-full">
							<MessageSquare size={20} className="text-muted mb-4" />
							<h3 className="text-lg font-black text-foreground mb-1">
								SMS Support
							</h3>
							<p className="text-sm text-muted mb-4">
								Reply directly to any automated text you receive regarding your
								project.
							</p>
						</div>
					</div>
				</div>
			</main>
		</div>
	);
}
