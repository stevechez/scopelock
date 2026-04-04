'use client';

import Link from 'next/link';
import { ArrowLeft, LifeBuoy, Clock, CheckCircle2 } from 'lucide-react';
import { use } from 'react';

// This is a "Mock Database" for your articles.
// You can expand this as you write more content!
const articleDatabase: Record<
	string,
	{ title: string; readTime: string; content: React.ReactNode }
> = {
	'how-to-get-your-website-live-step-by-step': {
		title: 'How to get your website live (step-by-step)',
		readTime: '3 min read',
		content: (
			<>
				<p>
					Getting your Site Engine live is designed to take less than 24 hours.
					We handle the heavy lifting, but here are the exact steps you need to
					take.
				</p>
				<h3>1. Fill out your Business Profile</h3>
				<p>
					Navigate to Settings. Ensure your Business Name, Primary Service Area,
					and Phone Number are accurate. The AI uses this data to write your SEO
					copy.
				</p>
				<h3>2. Upload your Top 3 Project Photos</h3>
				<p>
					We don&apos;t need a massive portfolio. Just 3 high-quality photos.
					Before/After shots convert the highest.
				</p>
				<h3>3. Click &quot;Request Deployment&quot;</h3>
				<p>
					Hit the green button. My team will assemble the site, run the SEO
					audit, and push it live to your domain.
				</p>
			</>
		),
	},
	'how-to-edit-your-service-area-for-local-seo': {
		title: 'How to edit your service area for local SEO',
		readTime: '2 min read',
		content: (
			<>
				<p>
					If you want to rank on Google, you need to tell Google exactly where
					you work. Vague &quot;serving the county&quot; statements don&apos;t
					work.
				</p>
				<h3>Update your settings</h3>
				<p>
					Go to <strong>Settings &gt; SEO Targeting</strong>. Enter your primary
					city, and up to 4 surrounding high-income zip codes you want to
					target. Our Site Engine will automatically inject these into your page
					metadata.
				</p>
			</>
		),
	},
	'why-your-site-isn-t-getting-leads-and-how-to-fix-it': {
		title: "Why your site isn't getting leads (and how to fix it)",
		readTime: '4 min read',
		content: (
			<>
				<p>
					Traffic without leads means a trust issue. If people are visiting but
					not calling, fix these three things:
				</p>
				<ul>
					<li>
						<strong>Grainy Photos:</strong> Replace them. Homeowners equate the
						quality of your photos with the quality of your work.
					</li>
					<li>
						<strong>No Call to Action:</strong> Ensure your &quot;Get an
						Estimate&quot; button is visible without scrolling.
					</li>
					<li>
						<strong>Vague Services:</strong> Be specific. Don&apos;t say
						&quot;We do it all.&quot; Say &quot;Custom Kitchen Remodels in
						Cupertino.&quot;
					</li>
				</ul>
			</>
		),
	},
	'what-project-photos-actually-convert-homeowners': {
		title: 'What project photos actually convert homeowners?',
		readTime: '2 min read',
		content: (
			<>
				<p>
					Homeowners don&apos;t want to see a pile of lumber. They want to see
					the finished lifestyle.
				</p>
				<p>
					Always upload photos that are well-lit, free of job-site trash, and
					show the completed project. Wide angles work better than zoomed-in
					shots of a single joint or pipe. Show the whole room or the whole
					house.
				</p>
			</>
		),
	},
	'how-to-add-customer-reviews-to-your-site-engine': {
		title: 'How to add customer reviews to your Site Engine',
		readTime: '1 min read',
		content: (
			<>
				<p>
					Reviews are your strongest sales tool. To add them, go to{' '}
					<strong>Site Engine &gt; Reviews</strong>.
				</p>
				<p>
					Paste the text of the review, the client&apos;s first name, and the
					city the job was in (e.g., &quot;John D. - San Jose&quot;). Click
					save, and it will automatically format into a beautiful carousel on
					your live site.
				</p>
			</>
		),
	},
	'connecting-your-google-business-profile': {
		title: 'Connecting your Google Business Profile',
		readTime: '2 min read',
		content: (
			<>
				<p>
					Your Google Business Profile (the map listing) is the #1 driver of
					local leads. Ensure the link to your Blueprint OS site is placed in
					the &quot;Website&quot; field of your Google dashboard.
				</p>
				<p>
					Make sure the name, address, and phone number on Google match the Comm
					Vault settings exactly. Google rewards consistency.
				</p>
			</>
		),
	},
	'how-to-filter-out-tire-kickers-from-web-forms': {
		title: 'How to filter out tire-kickers from web forms',
		readTime: '3 min read',
		content: (
			<>
				<p>
					Stop driving across town for free estimates that go nowhere. We filter
					tire-kickers by adding friction to your contact form.
				</p>
				<p>
					In the <strong>Lead Capture</strong> settings, turn on the
					&quot;Budget Minimum&quot; dropdown. When a homeowner has to select a
					budget range (e.g., &quot;$10k - $25k&quot;), the people looking for a
					$500 cheap fix will self-select out, saving you hours of wasted time.
				</p>
			</>
		),
	},

	// --- SEND BETTER BIDS ---
	'how-to-send-a-3-option-bid-that-wins-jobs': {
		title: 'How to send a 3-option bid that wins jobs',
		readTime: '4 min read',
		content: (
			<>
				<p>
					Never send a single price again. When you give one price, the
					client&apos;s brain says &quot;Yes or No.&quot; When you give three
					options, their brain says &quot;Which one?&quot;
				</p>
				<h3>The 3 Tiers:</h3>
				<ul>
					<li>
						<strong>Option 1 (Basic):</strong> Meets code, standard materials.
						The cheapest you&apos;ll do the job.
					</li>
					<li>
						<strong>Option 2 (Standard):</strong> What you actually recommend.
						High-quality materials, better warranty. (Most choose this).
					</li>
					<li>
						<strong>Option 3 (Premium):</strong> The absolute best materials,
						priority scheduling, white-glove service. High margin.
					</li>
				</ul>
			</>
		),
	},
	'how-to-stop-unpaid-change-orders-scripts-included': {
		title: 'How to stop unpaid change orders (scripts included)',
		readTime: '3 min read',
		content: (
			<>
				<p>
					The phrase &quot;While you&apos;re here, can you just...&quot;
					destroys profit margins. Stop doing free work.
				</p>
				<p>Use the script from your Comm Vault:</p>
				<blockquote className="border-l-4 border-amber-500 pl-4 italic text-slate-600 bg-slate-50 p-4 rounded-r-lg">
					&quot;I can absolutely take care of that for you. Let me write up a
					quick change order for the additional materials and labor, and once
					you approve it on your phone, we&apos;ll get it done.&quot;
				</blockquote>
				<p>This politely anchors the fact that extra work costs extra money.</p>
			</>
		),
	},
	'set-your-pricing-so-you-stop-undercharging': {
		title: 'Set your pricing so you stop undercharging',
		readTime: '5 min read',
		content: (
			<>
				<p>
					Most contractors price by looking at the competition. That&apos;s a
					race to the bottom.
				</p>
				<p>
					You need to know your fully burdened labor rate (wages, taxes,
					insurance, truck gas, phone bill). Take that number, add your
					materials, and then add a strict 30-50% gross profit margin. If you
					lose the bid, let the other guy go bankrupt doing the work.
				</p>
			</>
		),
	},
	'the-good-better-best-psychology-explained': {
		title: 'The "Good, Better, Best" psychology explained',
		readTime: '2 min read',
		content: (
			<>
				<p>
					Human beings use comparison to determine value. If you hand someone a
					$15,000 bid, they have no idea if that&apos;s expensive or cheap until
					they get three more quotes.
				</p>
				<p>
					By providing a $12k, $15k, and $22k option on the same page, you
					eliminate their need to call your competitors. You become your own
					competition.
				</p>
			</>
		),
	},
	'what-to-do-when-a-client-says-you-re-too-expensive': {
		title: 'What to do when a client says "You\'re too expensive"',
		readTime: '3 min read',
		content: (
			<>
				<p>
					Do not immediately drop your price. Dropping your price tells them you
					were trying to overcharge them in the first place.
				</p>
				<p>
					Instead, drop the <strong>scope</strong>. Say: &quot;I understand. To
					get closer to that number, we can swap the premium fixtures for
					standard, or we can handle the demolition yourself.&quot; Make them
					trade value for dollars.
				</p>
			</>
		),
	},
	'how-to-automate-follow-ups-without-being-annoying': {
		title: 'How to automate follow-ups without being annoying',
		readTime: '2 min read',
		content: (
			<>
				<p>
					The fortune is in the follow-up. Set your Comm Vault to ping them 48
					hours after sending the bid.
				</p>
				<p>
					The message shouldn&apos;t be &quot;Are you ready to buy?&quot; It
					should be: &quot;Hi John, checking in to see if you had any questions
					about the three options I sent over. Happy to jump on a quick
					call.&quot; Helpful, not pushy.
				</p>
			</>
		),
	},
	'sending-invoices-that-get-paid-in-24-hours': {
		title: 'Sending invoices that get paid in 24 hours',
		readTime: '2 min read',
		content: (
			<>
				<p>
					Friction delays payments. If they have to mail a check, you&apos;ll
					wait 30 days.
				</p>
				<p>
					Use Blueprint OS to send a digital invoice link directly to their
					phone via SMS. When a homeowner can tap a link and pay with Apple Pay
					or a credit card on their couch, you get paid before you even pack up
					the truck.
				</p>
			</>
		),
	},

	// --- SET UP YOUR SYSTEM ---
	'get-fully-set-up-in-under-30-minutes': {
		title: 'Get fully set up in under 30 minutes',
		readTime: '3 min read',
		content: (
			<>
				<p>
					Welcome to Blueprint OS. To get the engine running, follow this
					checklist:
				</p>
				<ol>
					<li>Upload your logo in Settings.</li>
					<li>
						Define your 3 primary services (e.g., Kitchens, Baths, Additions).
					</li>
					<li>
						Set your default tax rate and markup percentage in the Comm Vault.
					</li>
					<li>Connect your Stripe account to receive payments.</li>
				</ol>
			</>
		),
	},
	'connect-your-custom-domain-without-tech-headaches': {
		title: 'Connect your custom domain without tech headaches',
		readTime: '2 min read',
		content: (
			<>
				<p>
					If you own a domain (like www.smithconstruction.com) on GoDaddy or
					Namecheap, go to <strong>Site Engine &gt; Domains</strong>.
				</p>
				<p>
					Copy the A-Record IP address we provide, log into your registrar, and
					replace the existing A-Record. If this sounds like a foreign language,
					email support and we will do it for you.
				</p>
			</>
		),
	},
	'what-to-do-right-after-your-first-login': {
		title: 'What to do right after your first login',
		readTime: '1 min read',
		content: (
			<>
				<p>Don&apos;t get overwhelmed. Start with the Comm Vault.</p>
				<p>
					Draft a &quot;test proposal&quot; and send it to your own email
					address. See what your clients will see. Experience the 3-tier
					presentation yourself. Once you see how professional it looks,
					you&apos;ll never go back to Word documents.
				</p>
			</>
		),
	},
	'how-to-add-your-company-logo-and-brand-colors': {
		title: 'How to add your company logo and brand colors',
		readTime: '1 min read',
		content: (
			<>
				<p>
					Go to <strong>Settings &gt; Brand</strong>. Upload a high-resolution
					PNG of your logo with a transparent background.
				</p>
				<p>
					Select your primary brand color using the color picker. This color
					will be automatically applied to your website buttons and the action
					buttons on your client proposals.
				</p>
			</>
		),
	},
	'setting-up-sms-notifications-for-new-leads': {
		title: 'Setting up SMS notifications for new leads',
		readTime: '1 min read',
		content: (
			<>
				<p>
					Speed to lead is everything. If you respond within 5 minutes, your
					closing rate skyrockets.
				</p>
				<p>
					In <strong>Settings &gt; Notifications</strong>, enter your mobile
					number and verify it. Now, the second a homeowner fills out the form
					on your Site Engine, your phone will buzz with their details.
				</p>
			</>
		),
	},
	'how-to-save-the-blueprint-os-app-to-your-phone-home-screen': {
		title: 'How to save the Blueprint OS app to your phone home screen',
		readTime: '2 min read',
		content: (
			<>
				<p>
					Blueprint OS is a Progressive Web App (PWA), meaning you don&apos;t
					need the App Store to install it.
				</p>
				<p>
					<strong>On iPhone:</strong> Open Safari, go to your dashboard, tap the
					&quot;Share&quot; icon (square with arrow pointing up), and tap
					&quot;Add to Home Screen.&quot;
				</p>
				<p>
					<strong>On Android:</strong> Open Chrome, go to your dashboard, tap
					the three dots in the top right, and tap &quot;Add to Home
					Screen.&quot;
				</p>
			</>
		),
	},
	'inviting-your-partner-or-office-manager-to-the-vault': {
		title: 'Inviting your partner or office manager to the Vault',
		readTime: '1 min read',
		content: (
			<>
				<p>
					Stop sharing passwords. Go to <strong>Team &gt; Invites</strong>.
				</p>
				<p>
					Enter their email address. You can restrict their permissions so they
					can draft proposals and answer leads, but cannot see your billing
					information or change your pricing defaults.
				</p>
			</>
		),
	},

	// --- BILLING & ACCOUNT ---
	'how-billing-works-simple-breakdown': {
		title: 'How billing works (simple breakdown)',
		readTime: '1 min read',
		content: (
			<>
				<p>
					Blueprint OS operates on a simple, flat monthly subscription. No
					hidden fees, no percentage taken from your bids.
				</p>
				<p>
					Your card is charged on the same day every month. You can view your
					current tier ($29 or $49) in the Billing Dashboard.
				</p>
			</>
		),
	},
	'update-your-credit-card-or-billing-address': {
		title: 'Update your credit card or billing address',
		readTime: '1 min read',
		content: (
			<>
				<p>
					Go to <strong>Settings &gt; Billing</strong>. Click &quot;Update
					Payment Method.&quot;
				</p>
				<p>
					This will open a secure Stripe portal where you can add a new card,
					delete old ones, or change the address associated with your tax
					invoices.
				</p>
			</>
		),
	},
	'cancel-or-pause-your-account': {
		title: 'Cancel or pause your account',
		readTime: '1 min read',
		content: (
			<>
				<p>
					You can cancel anytime without having to call a retention agent. Go to{' '}
					<strong>Settings &gt; Billing</strong> and click &quot;Cancel
					Subscription.&quot;
				</p>
				<p>
					Your account will remain active until the end of your current billing
					cycle. If you just need a break for the winter season, use the
					&quot;Pause&quot; feature instead so you don&apos;t lose your data.
				</p>
			</>
		),
	},
	'upgrading-to-the-full-blueprint-from-comm-vault': {
		title: 'Upgrading to the Full Blueprint (from Comm Vault)',
		readTime: '2 min read',
		content: (
			<>
				<p>
					If you started on the $29/mo plan to use the proposal software and now
					want the custom website, you can upgrade instantly.
				</p>
				<p>
					Click &quot;Upgrade&quot; in your dashboard. You will be pro-rated for
					the difference, and the Site Engine module will unlock immediately.
				</p>
			</>
		),
	},
	'how-the-497-jumpstart-fee-works': {
		title: 'How the $497 Jumpstart fee works',
		readTime: '2 min read',
		content: (
			<>
				<p>
					The Jumpstart is a one-time flat fee of $497. This covers our team
					manually building your site, optimizing your local SEO, and
					configuring your Comm Vault settings so you don&apos;t have to touch a
					computer.
				</p>
				<p>
					After the Jumpstart is complete, you will be placed on the standard
					$49/mo Full Blueprint plan for hosting and software access.
				</p>
			</>
		),
	},
	'accessing-your-monthly-tax-invoices': {
		title: 'Accessing your monthly tax invoices',
		readTime: '1 min read',
		content: (
			<>
				<p>
					Keep your CPA happy. Go to{' '}
					<strong>Settings &gt; Billing &gt; Invoice History</strong>.
				</p>
				<p>
					You can download PDF receipts for every month you&apos;ve been a
					member. Blueprint OS is a software expense and is generally 100%
					tax-deductible for your business.
				</p>
			</>
		),
	},
	'what-happens-to-my-data-if-i-cancel': {
		title: 'What happens to my data if I cancel?',
		readTime: '2 min read',
		content: (
			<>
				<p>
					You own your data. If you cancel, your Site Engine website will go
					offline at the end of the billing cycle, and your Comm Vault will be
					locked.
				</p>
				<p>
					However, before your cycle ends, you can export all of your client
					contacts, leads, and historical proposals to a CSV file. We hold your
					data securely for 6 months in case you decide to reactivate.
				</p>
			</>
		),
	},
};

export default function ArticlePage({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	// Unwrap the params (Required for Next.js 15+ dynamic routes)
	const resolvedParams = use(params);
	const slug = resolvedParams.slug;

	// Look up the article in our database. If it doesn't exist, show a fallback.
	const article = articleDatabase[slug] || {
		title: 'Article coming soon',
		readTime: '1 min read',
		content: (
			<p>
				We are currently writing this guide. Check back tomorrow, or email Steve
				directly if you need this answer immediately!
			</p>
		),
	};

	return (
		<div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300 pb-24 font-sans selection:bg-amber-100">
			{/* CLEAN HEADER */}
			<div className="bg-slate-900 dark:bg-black pt-12 pb-24 px-6 relative overflow-hidden">
				<div className="max-w-3xl mx-auto relative z-10">
					<Link
						href="/help"
						className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors font-bold text-sm uppercase tracking-widest mb-12"
					>
						<ArrowLeft className="w-4 h-4" /> Back to Knowledge Base
					</Link>

					<div className="flex items-center gap-2 text-amber-500 font-bold text-sm mb-4">
						<Clock className="w-4 h-4" /> {article.readTime}
					</div>

					<h1 className="text-4xl md:text-5xl font-black text-white italic tracking-tight leading-[1.1]">
						{article.title}
					</h1>
				</div>
			</div>

			{/* ARTICLE CONTENT */}
			<div className="max-w-3xl mx-auto px-6 -mt-12 relative z-20">
				<div className="bg-white dark:bg-slate-900 rounded-[2rem] shadow-2xl shadow-slate-200/50 dark:shadow-black/50 border border-slate-200 dark:border-slate-800 p-8 md:p-12">
					{/* We use a "prose" styling approach here. 
                        This makes standard HTML tags look beautiful automatically.
                    */}
					<div className="prose prose-lg dark:prose-invert prose-headings:font-black prose-headings:italic prose-headings:tracking-tight prose-a:text-amber-500 hover:prose-a:text-amber-600 prose-strong:text-slate-900 dark:prose-strong:text-white max-w-none">
						{article.content}
					</div>

					<hr className="my-12 border-slate-100 dark:border-slate-800" />

					{/* WAS THIS HELPFUL? WIDGET */}
					<div className="flex flex-col sm:flex-row items-center justify-between gap-6 bg-slate-50 dark:bg-slate-800/50 p-6 rounded-2xl border border-slate-100 dark:border-slate-700/50">
						<div className="font-bold text-slate-700 dark:text-slate-300">
							Did this solve your problem?
						</div>
						<div className="flex gap-3 w-full sm:w-auto">
							<button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-bold text-slate-600 dark:text-slate-400 hover:border-green-500 hover:text-green-600 dark:hover:text-green-400 transition-all">
								<CheckCircle2 className="w-4 h-4" /> Yes
							</button>
							<a
								href="mailto:Steve@BlueprintOS.com"
								className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-bold text-slate-600 dark:text-slate-400 hover:border-amber-500 hover:text-amber-600 dark:hover:text-amber-400 transition-all"
							>
								<LifeBuoy className="w-4 h-4" /> No, I need help
							</a>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
