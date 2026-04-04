import Link from 'next/link';
import Image from 'next/image';

export default function AuthLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="min-h-screen grid grid-cols-1 md:grid-cols-2 bg-white dark:bg-slate-950 transition-colors duration-300">
			{/* LEFT SIDE: Auth Forms */}
			<div className="flex flex-col justify-center px-8 sm:px-16 lg:px-24 py-12">
				<div className="w-full max-w-md mx-auto">
					<Link
						href="/"
						className="text-2xl font-black tracking-tighter text-slate-900 dark:text-white mb-12 inline-block"
					>
						BLUEPRINT<span className="text-amber-500">OS</span>
					</Link>
					{children}
				</div>
			</div>

			{/* RIGHT SIDE: Branding / Mockup / Testimonial */}
			<div className="hidden md:flex flex-col justify-between bg-slate-900 p-8 lg:p-12 xl:p-16 relative overflow-hidden">
				{/* Background Grid Pattern */}
				<div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

				{/* Ambient Glow Behind Image */}
				<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-amber-500/20 blur-[120px] rounded-full pointer-events-none"></div>

				{/* TOP: Headline */}
				<div className="relative z-10 w-full max-w-2xl mx-auto">
					<div className="inline-block px-3 py-1 bg-amber-500/10 text-amber-500 font-bold text-xs uppercase tracking-widest rounded-full mb-6 border border-amber-500/20">
						System Access
					</div>
					<h2 className="text-4xl lg:text-5xl font-black text-white leading-[1.1]">
						The command center <br />
						<span className="text-slate-400">for elite builders.</span>
					</h2>
				</div>

				{/* MIDDLE: Image */}
				<div className="relative z-10 w-full max-w-2xl mx-auto my-8 transform transition-transform duration-700 hover:scale-[1.02]">
					<Image
						src="/images/dashboard-mockup.jpg"
						alt="Blueprint OS Dashboard Command Center"
						width={1200}
						height={900}
						className="w-full h-auto rounded-2xl shadow-2xl border border-slate-700/50"
						priority // Loads this image immediately since it's above the fold
					/>
				</div>

				{/* BOTTOM: Testimonial */}
				<div className="relative z-10 w-full max-w-2xl mx-auto">
					<blockquote className="text-xl font-medium text-slate-300 italic mb-6">
						&ldquo;Blueprint OS saved me 10+ hours a week in the office and gave
						me the exact proposal layout to close an $18k HVAC job at full
						price.&rdquo;
					</blockquote>
					<div className="flex items-center gap-4 text-white">
						<div className="w-12 h-12 bg-slate-800 rounded-full flex items-center justify-center font-black border border-slate-700">
							MR
						</div>
						<div>
							<div className="font-bold">Mike R.</div>
							<div className="text-sm text-slate-500">HVAC Contractor</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
