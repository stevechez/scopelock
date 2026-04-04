'use client';

export default function BillingFaq() {
	const faqs = [
		{
			q: 'Is there a long-term contract?',
			a: 'No. Blueprint OS is month-to-month. You can cancel at any time with a single click in your settings.',
		},
		{
			q: 'What is your refund policy?',
			a: "We offer a 30-day 'No Questions Asked' money-back guarantee. If you don't feel Blueprint OS has paid for itself within the first month, just email Steve and we'll send your money back.",
		},
		{
			q: 'What happens to my site if I cancel?',
			a: 'Your site will go offline, but we keep your data and design for 90 days in case you decide to return.',
		},
		{
			q: 'How much is the Jumpstart fee?',
			a: "The Jumpstart is a one-time fee of $497. This covers the manual build, SEO setup, and training. After that, it's just the $49/mo subscription.",
		},
	];

	return (
		<div className="max-w-3xl mx-auto py-24 px-6">
			<h1 className="text-4xl font-black text-slate-900 mb-12 tracking-tight underline decoration-amber-500 underline-offset-8 decoration-4">
				Billing & Refunds
			</h1>

			<div className="space-y-12">
				{faqs.map(faq => (
					<div key={faq.q}>
						<h3 className="text-xl font-black text-slate-900 mb-4">{faq.q}</h3>
						<p className="text-lg text-slate-500 font-medium leading-relaxed">
							{faq.a}
						</p>
					</div>
				))}
			</div>

			<div className="mt-16 p-8 bg-amber-50 rounded-[2rem] border border-amber-100 italic font-medium text-amber-900 leading-relaxed">
				&quot;We believe in handshake deals. If you aren&apos;t happy, we
				don&apos;t want your money. It&apos;s that simple.&quot;
			</div>
		</div>
	);
}
