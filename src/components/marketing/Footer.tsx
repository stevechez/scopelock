import Link from 'next/link';

export default function Footer() {
	return (
		<>
			<footer className="bg-slate-900 dark:bg-black text-white pt-20 pb-10 px-6">
				<div className="max-w-7xl mx-auto">
					<div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
						<div className="col-span-1">
							<div className="text-2xl font-black tracking-tighter mb-4">
								BLUEPRINT<span className="text-amber-500">OS</span>
							</div>
							<p className="text-slate-400 font-medium mb-6 leading-relaxed">
								The digital stack for modern tradesmen. Win bids, stop creep,
								and get paid.
							</p>
							<div className="flex items-center gap-2 text-green-400 text-sm font-bold">
								<span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />{' '}
								Systems Operational
							</div>
						</div>
						<div>
							<h4 className="font-black uppercase tracking-widest text-sm mb-6 text-slate-500">
								Modules
							</h4>
							<ul className="space-y-4 font-bold text-slate-300">
								<li>
									<Link
										href="#site-engine"
										className="hover:text-amber-500 transition-colors"
									>
										Site Engine
									</Link>
								</li>
								<li>
									<Link
										href="#comm-vault"
										className="hover:text-amber-500 transition-colors"
									>
										Comm Vault
									</Link>
								</li>
								<li>
									<a
										href="https://www.siteverdict.online/"
										className="hover:text-amber-500 transition-colors flex items-center gap-2"
									>
										SiteVerdict{' '}
										<span className="text-[10px] bg-slate-800 px-2 py-0.5 rounded text-slate-500 uppercase">
											Soon
										</span>
									</a>
								</li>
							</ul>
						</div>
						<div>
							<h4 className="font-black uppercase tracking-widest text-sm mb-6 text-slate-500">
								Support
							</h4>
							<ul className="space-y-4 font-bold text-slate-300">
								<li>
									<Link
										href="/help"
										className="hover:text-amber-500 transition-colors"
									>
										Knowledge Base
									</Link>
								</li>
								<li>
									<Link
										href="/contact"
										className="hover:text-amber-500 transition-colors"
									>
										Contact Steve
									</Link>
								</li>
								<li>
									<Link
										href="/billing-faq"
										className="hover:text-amber-500 transition-colors"
									>
										Billing & Refund Policy
									</Link>
								</li>
							</ul>
						</div>
						<div>
							<h4 className="font-black uppercase tracking-widest text-sm mb-6 text-slate-500">
								Contact
							</h4>
							<p className="font-bold text-slate-300 mb-2">
								Steve@BlueprintOS.com
							</p>
							<p className="text-slate-400 text-sm mb-6 uppercase tracking-wider font-bold">
								Cupertino, CA
							</p>
						</div>
					</div>
					<div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-slate-500 text-sm font-bold">
						<p>© 2026 Blueprint OS. All rights reserved.</p>
						<div className="flex gap-8">
							<Link
								href="/privacy"
								className="hover:text-white transition-colors"
							>
								Privacy Policy
							</Link>
							<Link
								href="/terms"
								className="hover:text-white transition-colors"
							>
								Terms of Service
							</Link>
						</div>
					</div>
				</div>
			</footer>
		</>
	);
}
