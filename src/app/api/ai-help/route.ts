import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// 1. Define your articles here.
// TIP: Keep these titles simple so the slug generator doesn't get confused.
const ARTICLES = [
	'Site Engine Getting Started',
	'Local SEO Basics',
	'Creating Change Orders',
	'3 Tier Proposals',
	'PayRail SMS Setup',
	'Stripe Integration',
	'Automated Follow Ups',
	'Client Objection Handling',
	'Client Portal Overview',
	'Comm Vault Email Tracking',
	'Comm Vault SMS Compliance',
	'Creating Change Orders',
	'Crew Lens GPS Tagging',
	'Crew Lens Setup',
	'Custom Domain Setup',
	'Daily Jobs Log',
	'Defining Project Boundaries',
	'Deposit Requests',
	'Digital Signatures',
	'Emergency Service Routing',
	'Exporting Tax Data',
	'Handling Difficult Clients',
	'Handling Late Payments',
	'High Ticket Financing',
	'Integrating with QuickBooks',
	'Local SEO Basics',
	'Managing Inbound Leads',
	'Multi Location SEO',
	'Notification Routing',
	'Optimizing Mobile App Performance',
	'Payrail Dispute Protection',
	'Photo Documentation',
	'Recovering Deleted Leads',
	'Referral Program Setup',
	'Requesting Google Reviews',
	'Resetting Two Factor Authentication',
	'ScopeLock Change Orders',
	'ScopeLock Legal Templates',
	'ScopeLock Voice Memos',
	'Sharing Project Timelines',
	'Site Engine Chatbot Setup',
	'Site Engine Getting Started',
	'Stripe Integration',
	'Understanding Payout Speeds',
	'White Label Product Portal',
];

export async function POST(req: Request) {
	try {
		const { query } = await req.json();

		const completion = await openai.chat.completions.create({
			model: 'gpt-3.5-turbo',
			messages: [
				{
					role: 'system',
					content: `You are the Support AI for BuildRail. 
                    Answer the user's question directly and briefly in 2-3 sentences. 
                    
                    Recommend 1 to 3 relevant articles from this exact list:
                    ${ARTICLES.join('\n- ')}
                    
                    CRITICAL: You MUST use the exact titles provided above in the "articles" array. 
                    Do not add extra words or change the phrasing.

                    You must respond in valid JSON format:
                    {
                        "answer": "Step-by-step guide to creating pricing tiers that increase your close rate and job margins.",
                        "articles": ["How to Build Good, Better, and Best Pricing Tiers"]
                    }`,
				},
				{ role: 'user', content: query },
			],
			response_format: { type: 'json_object' },
			temperature: 0.3,
		});

		const result = JSON.parse(completion.choices[0].message.content || '{}');
		return NextResponse.json(result);
	} catch (error) {
		console.error('OpenAI API Error:', error);
		return NextResponse.json(
			{ error: 'Failed to process AI request' },
			{ status: 500 },
		);
	}
}
