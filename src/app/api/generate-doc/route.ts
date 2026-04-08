import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import fs from 'fs';
import path from 'path';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const CONTENT_DIR = path.join(process.cwd(), 'src/content/help');

// Ensure the directory exists
if (!fs.existsSync(CONTENT_DIR)) {
	fs.mkdirSync(CONTENT_DIR, { recursive: true });
}

export async function POST(req: Request) {
	// SECURITY: In production, you would wrap this in an auth check
	// so only YOU (the admin) can generate docs.
	if (process.env.NODE_ENV !== 'development') {
		return NextResponse.json(
			{ error: 'Only available in development mode' },
			{ status: 403 },
		);
	}

	try {
		const { slug, topic } = await req.json();

		if (!slug || !topic) {
			return NextResponse.json(
				{ error: 'Slug and topic are required' },
				{ status: 400 },
			);
		}

		const prompt = `
        You are an expert technical writer for a SaaS product called BuildRail. 
        BuildRail is an operating system for tradesmen and contractors. It helps them win bids (Site Engine), manage communications (Comm Vault), prevent free work via change orders (ScopeLock), and collect money instantly (PayRail).
        
        Write a comprehensive Help Center article for the topic: "${topic}".
        
        Requirements:
        1. Write it in Markdown format.
        2. It MUST start with frontmatter containing 'title', 'description', and 'readTime'.
        3. Use professional, direct, "no-fluff" language. Speak directly to contractors.
        4. Use formatting like H2s, H3s, bullet points, bold text, and blockquotes for "Pro Tips".
        5. Provide concrete, step-by-step instructions.
        
        Example Output Format:
        ---
        title: "Your Title Here"
        description: "A brief one-sentence description."
        readTime: "3 min read"
        ---
        
        ## Introduction
        ...
        `;

		const completion = await openai.chat.completions.create({
			model: 'gpt-4o', // Use a powerful model for writing
			messages: [{ role: 'system', content: prompt }],
			temperature: 0.7,
		});

		const markdownContent = completion.choices[0].message.content;

		if (!markdownContent) {
			throw new Error('AI returned empty content');
		}

		// Clean up markdown block if the AI wrapped it in ```markdown
		const cleanedContent = markdownContent
			.replace(/^```markdown\n/, '')
			.replace(/\n```$/, '');

		// Save it to the file system!
		const filePath = path.join(CONTENT_DIR, `${slug}.md`);
		fs.writeFileSync(filePath, cleanedContent, 'utf8');

		return NextResponse.json({ success: true, filePath });
	} catch (error) {
		console.error('Doc Gen Error:', error);
		return NextResponse.json(
			{ error: 'Failed to generate document' },
			{ status: 500 },
		);
	}
}
