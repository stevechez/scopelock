'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';

export default function JumpstartPage() {
	const [isSubmitting, setIsSubmitting] = useState(false);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsSubmitting(true);
		// Simulate submission
		await new Promise(r => setTimeout(r, 1500));
		toast.success(
			'Project Request Received! Steve will reach out within 2 hours.',
		);
		setIsSubmitting(false);
	};

	return (
		<div className="bg-slate-50 min-h-screen py-12 px-6">
			<div className="max-w-3xl mx-auto">
				{/* HEADER */}
				<div className="text-center mb-12">
					<h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 italic">
						The 24-Hour Jumpstart.
					</h1>
					<p className="text-xl text-slate-500 font-medium">
						Fill this out, pay the deposit, and your business is on autopilot by
						this time tomorrow.
					</p>
				</div>

				{/* THE "GLORIFIED" FORM */}
				<form
					onSubmit={handleSubmit}
					className="bg-white p-8 md:p-12 rounded-[3rem] border border-slate-200 shadow-2xl space-y-8"
				>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
						<section className="space-y-6">
							<h3 className="text-sm font-black uppercase tracking-widest text-amber-600">
								01. Personal Info
							</h3>
							<div>
								<label className="block text-sm font-bold text-slate-700 mb-2">
									Your Name
								</label>
								<input
									required
									type="text"
									className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-slate-900 outline-none bg-slate-50"
									placeholder="e.g. Steve Dunn"
								/>
							</div>
							<div>
								<label className="block text-sm font-bold text-slate-700 mb-2">
									Cell Phone (For Text Updates)
								</label>
								<input
									required
									type="tel"
									className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-slate-900 outline-none bg-slate-50"
									placeholder="(555) 000-0000"
								/>
							</div>
						</section>

						<section className="space-y-6">
							<h3 className="text-sm font-black uppercase tracking-widest text-indigo-600">
								02. Business Info
							</h3>
							<div>
								<label className="block text-sm font-bold text-slate-700 mb-2">
									Business Name
								</label>
								<input
									required
									type="text"
									className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-slate-900 outline-none bg-slate-50"
									placeholder="e.g. Apex Remodeling"
								/>
							</div>
							<div>
								<label className="block text-sm font-bold text-slate-700 mb-2">
									Primary Service Area
								</label>
								<input
									required
									type="text"
									className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-slate-900 outline-none bg-slate-50"
									placeholder="e.g. South Bay, Cupertino"
								/>
							</div>
						</section>
					</div>

					<hr className="border-slate-100" />

					<section className="space-y-6">
						<h3 className="text-sm font-black uppercase tracking-widest text-slate-400">
							03. Project Goals
						</h3>
						<div>
							<label className="block text-sm font-bold text-slate-700 mb-2">
								What&apos;s your #1 goal with Blueprint OS?
							</label>
							<select className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-slate-900 outline-none bg-slate-50 appearance-none">
								<option>Professionalizing my brand to win bigger bids</option>
								<option>Automating my follow-ups and payments</option>
								<option>Getting more leads from my local area</option>
								<option>All of the above</option>
							</select>
						</div>
						<div>
							<label className="block text-sm font-bold text-slate-700 mb-2">
								Any specific notes for Steve?
							</label>
							<textarea
								rows={4}
								className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-slate-900 outline-none bg-slate-50 resize-none"
								placeholder="Tell me about your business..."
							></textarea>
						</div>
					</section>

					<button
						type="submit"
						disabled={isSubmitting}
						className="w-full bg-slate-900 text-white font-black text-xl py-6 rounded-2xl hover:bg-slate-800 transition-all shadow-xl disabled:opacity-50"
					>
						{isSubmitting
							? 'Sending Request...'
							: 'Apply for Jumpstart Slot — $497'}
					</button>

					<p className="text-center text-slate-400 text-sm font-medium">
						By clicking above, you are requesting a 24-hour setup. <br /> Steve
						will contact you to finalize the build plan and payment.
					</p>
				</form>

				{/* TRUST SIGNALS */}
				<div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
					<div className="p-4">
						<p className="font-black text-slate-900 text-lg italic">
							24-Hour Turnaround
						</p>
						<p className="text-slate-500 text-sm">We build while you work.</p>
					</div>
					<div className="p-4 border-x border-slate-200">
						<p className="font-black text-slate-900 text-lg italic">
							No Tech Hassle
						</p>
						<p className="text-slate-500 text-sm">
							We handle the domain and hosting.
						</p>
					</div>
					<div className="p-4">
						<p className="font-black text-slate-900 text-lg italic">
							Ready to Scale
						</p>
						<p className="text-slate-500 text-sm">A pro system from day one.</p>
					</div>
				</div>
				{/* JUMPSTART FAQ SECTION */}
				<section className="mt-24 border-t border-slate-200 pt-16">
					<div className="text-center mb-12">
						<h2 className="text-3xl font-black text-slate-900 mb-4 italic">
							Jumpstart FAQ
						</h2>
						<p className="text-slate-500 font-medium">
							Everything you need to know before we build.
						</p>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-left">
						<div>
							<h4 className="font-black text-slate-900 mb-2">
								What do I need to provide?
							</h4>
							<p className="text-slate-600 leading-relaxed font-medium">
								Just the basics: your logo (if you have one), 3-5 photos of your
								best work, and a list of the services you want to rank for. We
								handle all the copywriting and technical setup from there.
							</p>
						</div>

						<div>
							<h4 className="font-black text-slate-900 mb-2">
								What if I already have a domain?
							</h4>
							<p className="text-slate-600 leading-relaxed font-medium">
								No problem. We can either point your existing domain to our
								high-speed servers or help you register a brand new,
								SEO-optimized one (e.g., YourCityPainter.com).
							</p>
						</div>

						<div>
							<h4 className="font-black text-slate-900 mb-2">
								Do I own the website?
							</h4>
							<p className="text-slate-600 leading-relaxed font-medium">
								Yes. As long as your Blueprint OS subscription is active, your
								site is live and managed. If you ever leave us, we can provide
								you with your content and lead data so you don&apos;t lose your
								history.
							</p>
						</div>

						<div>
							<h4 className="font-black text-slate-900 mb-2">
								Is the $497 refundable?
							</h4>
							<p className="text-slate-600 leading-relaxed font-medium">
								We offer a 100% satisfaction guarantee. If we build the site and
								it doesn&apos;t meet your standards, we&apos;ll work on it until
								it does—or we&apos;ll give you a full refund. Handshake deal.
							</p>
						</div>
					</div>
				</section>
			</div>
		</div>
	);
}
