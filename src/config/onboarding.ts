export interface Milestone {
	id: string;
	title: string;
	description: string;
	slug: string; // The markdown file name
	estimatedTime: string;
}

export const ONBOARDING_MILESTONES: Milestone[] = [
	{
		id: 'site',
		title: 'Launch your Website',
		description: 'Connect your domain and go live with Site Engine.',
		slug: 'site-engine-setup',
		estimatedTime: '5 min',
	},
	{
		// Change '3-tier-proposals' to 'three-tier-proposals' if your slug uses words
		id: 'proposals',
		title: 'Build your first 3-Tier Bid',
		description: 'Set up Good/Better/Best pricing to win more jobs.',
		slug: '3-tier-proposals',
		estimatedTime: '8 min',
	},
	{
		id: 'stripe',
		title: 'Connect Payments',
		description: 'Link your bank via Stripe to get paid instantly.',
		slug: 'stripe-integration',
		estimatedTime: '3 min',
	},
];
