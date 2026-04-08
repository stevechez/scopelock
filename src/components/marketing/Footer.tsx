'use client';

import Link from 'next/link';

export default function Footer() {
	const currentYear = new Date().getFullYear();

	return (
		<footer className="bg-slate-950 text-white pt-24 pb-12 px-6 border-t border-white/5">
			<div className="max-w-7xl mx-auto">
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
					{/* BRAND SECTION */}
					<div className="col-span-1">
						<Link
							href="/"
							className="text-2xl font-black tracking-tighter mb-6 block"
						>
							BUILD<span className="text-amber-500">RAIL</span>
						</Link>
						<p className="text-slate-400 font-medium mb-8 leading-relaxed max-w-sm">
							The high-performance operating system for modern trades. Built to
							help contractors win better jobs and protect every dollar of
							profit.
						</p>
						<div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-black uppercase tracking-widest">
							<span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
							Systems Operational
						</div>
					</div>

					{/* MODULES STACK */}
					<div>
						<h4 className="font-black uppercase tracking-widest text-[10px] mb-8 text-slate-500">
							The Rails
						</h4>
						<ul className="space-y-4 font-bold text-sm text-slate-300">
							<li>
								<Link
									href="#features"
									className="hover:text-amber-500 transition-colors"
								>
									Site Engine™
								</Link>
							</li>
							<li>
								<Link
									href="#features"
									className="hover:text-amber-500 transition-colors"
								>
									Comm Vault™
								</Link>
							</li>
							<li>
								<Link
									href="#features"
									className="hover:text-amber-500 transition-colors"
								>
									ScopeLock™
								</Link>
							</li>
							<li>
								<Link
									href="#features"
									className="hover:text-amber-500 transition-colors"
								>
									PayRail™
								</Link>
							</li>
							<li>
								<Link
									href="#features"
									className="hover:text-amber-500 transition-colors"
								>
									smCrewLens™
								</Link>
							</li>
							{/* DISABLED MODULE */}
							<li className="flex items-center gap-2 text-slate-600 cursor-not-allowed select-none">
								SiteVerdict
								<span className="text-[9px] bg-slate-900 border border-slate-800 px-1.5 py-0.5 rounded text-slate-600 uppercase font-black">
									Q4 2026
								</span>
							</li>
						</ul>
					</div>

					{/* SUPPORT & DOCS */}
					<div>
						<h4 className="font-black uppercase tracking-widest text-[10px] mb-8 text-slate-500">
							Resources
						</h4>
						<ul className="space-y-4 font-bold text-sm text-slate-300">
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
									Contact Support
								</Link>
							</li>
							<li>
								<Link
									href="/billing-faq"
									className="hover:text-amber-500 transition-colors"
								>
									Billing & Refunds
								</Link>
							</li>
							<li>
								<Link
									href="/terms"
									className="hover:text-amber-500 transition-colors"
								>
									Terms of Service
								</Link>
							</li>
							<li>
								<Link
									href="/privacy"
									className="hover:text-amber-500 transition-colors"
								>
									Privacy Policy
								</Link>
							</li>
						</ul>
					</div>

					{/* CONTACT & LOCATION */}
					<div>
						<h4 className="font-black uppercase tracking-widest text-[10px] mb-8 text-slate-500">
							Headquarters
						</h4>
						<p className="font-black text-white text-lg mb-2">
							support@buildrail.com
						</p>
						<p className="text-slate-500 text-xs font-bold uppercase tracking-[0.2em] mb-8">
							Cupertino, California
						</p>
						<div className="p-4 rounded-2xl bg-white/5 border border-white/10">
							<p className="text-[10px] font-black text-amber-500 uppercase tracking-widest mb-1">
								Founders Note
							</p>
							<p className="text-xs text-slate-400 leading-relaxed">
								BuildRail is built for the men and women who keep America
								running. We appreciate your business.
							</p>
						</div>
					</div>
				</div>

				{/* BOTTOM BAR */}
				<div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-slate-600 text-[11px] font-black uppercase tracking-[0.3em]">
					<p>© {currentYear} BUILDRAIL. ALL RIGHTS RESERVED.</p>
					<div className="flex gap-8">
						<Link href="/terms" className="hover:text-white transition-colors">
							Terms
						</Link>
						<Link
							href="/privacy"
							className="hover:text-white transition-colors"
						>
							Privacy
						</Link>
						<Link
							href="/cookies"
							className="hover:text-white transition-colors"
						>
							Cookies
						</Link>
					</div>
				</div>
			</div>
		</footer>
	);
}
