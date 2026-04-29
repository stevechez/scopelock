import Link from 'next/link';
import { Lock } from 'lucide-react';

export default function Footer() {
	return (
		<footer className="bg-background text-foreground border-t border-border dark:border-white/5 pt-20 pb-10 px-6">
			<div className="max-w-7xl mx-auto">
				<div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
					{/* BRAND COL */}
					<div className="md:col-span-1">
						<Link href="/" className="flex items-center gap-3 mb-6">
							<div className="w-8 h-8 bg-slate-900 dark:bg-white text-white dark:text-foreground rounded-lg flex items-center justify-center">
								<Lock className="w-4 h-4" />
							</div>
							<span className="font-black text-xl text-foreground text-foreground tracking-tight uppercase italic">
								BuildRail <span className="text-amber-500">HQ</span>
							</span>
						</Link>
						<p className="text-muted dark:text-muted text-sm font-medium leading-relaxed">
							The closed-loop operating system for high-end custom builders.
							Eliminate the admin bleed. Print profit.
						</p>
					</div>

					{/* LINKS COL 1 */}
					<div>
						<h4 className="font-black text-foreground text-foreground uppercase tracking-widest text-xs mb-6">
							Platform
						</h4>
						<ul className="space-y-4">
							<li>
								<Link
									href="#blueprint"
									className="text-muted hover:text-amber-500 font-medium text-sm transition-colors"
								>
									Site Engine
								</Link>
							</li>
							<li>
								<Link
									href="#blueprint"
									className="text-muted hover:text-amber-500 font-medium text-sm transition-colors"
								>
									Comm Vault
								</Link>
							</li>
							<li>
								<Link
									href="#blueprint"
									className="text-muted hover:text-amber-500 font-medium text-sm transition-colors"
								>
									ScopeLock
								</Link>
							</li>
							<li>
								<Link
									href="#blueprint"
									className="text-muted hover:text-amber-500 font-medium text-sm transition-colors"
								>
									PayRail
								</Link>
							</li>
						</ul>
					</div>

					{/* LINKS COL 2 */}
					<div>
						<h4 className="font-black text-foreground text-foreground uppercase tracking-widest text-xs mb-6">
							Company
						</h4>
						<ul className="space-y-4">
							<li>
								<Link
									href="/about"
									className="text-muted hover:text-amber-500 font-medium text-sm transition-colors"
								>
									About Us
								</Link>
							</li>
							<li>
								<Link
									href="#pricing"
									className="text-muted hover:text-amber-500 font-medium text-sm transition-colors"
								>
									Pricing
								</Link>
							</li>
							<li>
								<Link
									href="/login"
									className="text-muted hover:text-amber-500 font-medium text-sm transition-colors"
								>
									Contractor Login
								</Link>
							</li>
						</ul>
					</div>

					{/* LINKS COL 3 */}
					<div>
						<h4 className="font-black text-foreground text-foreground uppercase tracking-widest text-xs mb-6">
							Legal
						</h4>
						<ul className="space-y-4">
							<li>
								<Link
									href="/terms"
									className="text-muted hover:text-amber-500 font-medium text-sm transition-colors"
								>
									Terms of Service
								</Link>
							</li>
							<li>
								<Link
									href="/privacy"
									className="text-muted hover:text-amber-500 font-medium text-sm transition-colors"
								>
									Privacy Policy
								</Link>
							</li>
						</ul>
					</div>
				</div>

				<div className="border-t border-border dark:border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
					<p className="text-muted text-xs font-medium">
						&copy; {new Date().getFullYear()} BuildRail HQ. All rights reserved.
					</p>
					<div className="flex items-center gap-2 text-[10px] font-black text-muted uppercase tracking-widest">
						<span className="w-2 h-2 rounded-full bg-emerald-500"></span>{' '}
						Systems Operational
					</div>
				</div>
			</div>
		</footer>
	);
}
