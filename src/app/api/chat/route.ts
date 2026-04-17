import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { getWidgetConfig } from '@/lib/db';
import { buildSystemPrompt } from '@/lib/prompt';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(req: NextRequest) {
	try {
		const { message, tenantId, history } = await req.json();

		if (!tenantId) {
			return NextResponse.json({ error: 'Missing tenantId' }, { status: 400 });
		}

		// 1. Fetch contractor-specific context from Supabase
		const config = await getWidgetConfig(tenantId);
		if (!config) {
			return NextResponse.json(
				{ error: 'Tenant not found or inactive' },
				{ status: 404 },
			);
		}

		// 2. Initialize Gemini
		const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

		// 3. Build the system instruction
		const systemInstruction = buildSystemPrompt(config);

		// 4. Start chat with history and system context
		const chat = model.startChat({
			history: history || [],
			generationConfig: {
				maxOutputTokens: 250, // Keep it lean and punchy
			},
		});

		// Combine system instructions with the user message for this MVP stage
		// (Gemini 1.5 Flash handles this well within the prompt)
		const result = await chat.sendMessage(
			`SYSTEM INSTRUCTION: ${systemInstruction}\n\nUSER: ${message}`,
		);
		const response = await result.response;
		const text = response.text();

		return NextResponse.json({ text });
	} catch (error) {
		console.error('[CHAT_ERROR]', error);
		return NextResponse.json(
			{ error: 'Internal Server Error' },
			{ status: 500 },
		);
	}
}
