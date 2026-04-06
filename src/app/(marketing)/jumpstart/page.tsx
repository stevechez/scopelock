import JumpstartForm from '@/components/marketing/JumpstartForm'; // Import the new client component

export const metadata = {
	title: 'Jumpstart Your Business | BlueprintOS',
	description:
		'Get your professional contractor business system set up in 24 hours.',
};

export default function JumpstartPage() {
	return (
		<main className="bg-white dark:bg-slate-950 min-h-screen">
			<div className="bg-slate-50 dark:bg-slate-900/20 py-12 px-6">
				<div className="max-w-3xl mx-auto">
					{/* HEADER */}
					<div className="text-center mb-12">
						<h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-4 italic">
							The 24-Hour Jumpstart.
						</h1>
						<p className="text-xl text-slate-500 dark:text-slate-400 font-medium">
							Fill this out, pay the deposit, and your business is on autopilot
							by this time tomorrow.
						</p>
					</div>

					{/* THE CLIENT FORM COMPONENT */}
					<JumpstartForm />

					{/* TRUST SIGNALS */}
					<div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
						<div className="p-4">
							<p className="font-black text-slate-900 dark:text-white text-lg italic">
								24-Hour Turnaround
							</p>
							<p className="text-slate-500 text-sm">We build while you work.</p>
						</div>
						<div className="p-4 border-x border-slate-200 dark:border-slate-800">
							<p className="font-black text-slate-900 dark:text-white text-lg italic">
								No Tech Hassle
							</p>
							<p className="text-slate-500 text-sm">
								We handle the domain and hosting.
							</p>
						</div>
						<div className="p-4">
							<p className="font-black text-slate-900 dark:text-white text-lg italic">
								Ready to Scale
							</p>
							<p className="text-slate-500 text-sm">
								A pro system from day one.
							</p>
						</div>
					</div>

					{/* FAQ SECTION (Keep this in page.tsx as it is just text) */}
					<section className="mt-24 border-t border-slate-200 dark:border-slate-800 pt-16">
						<div className="text-center mb-12">
							<h2 className="text-3xl font-black text-slate-900 dark:text-white mb-4 italic">
								Jumpstart FAQ
							</h2>
						</div>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-left">
							<div>
								<h4 className="font-black text-slate-900 dark:text-white mb-2">
									What do I need to provide?
								</h4>
								<p className="text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
									Just the basics: logo, 3-5 photos of your work, and your
									service areas. We handle the rest.
								</p>
							</div>
							<div>
								<h4 className="font-black text-slate-900 dark:text-white mb-2">
									What if I already have a domain?
								</h4>
								<p className="text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
									We can point your existing domain to our high-speed servers
									easily.
								</p>
							</div>
						</div>
					</section>
				</div>
			</div>
		</main>
	);
}
