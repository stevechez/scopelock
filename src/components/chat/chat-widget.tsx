'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Send, User, Bot, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';

interface Message {
	role: 'user' | 'model';
	parts: [{ text: string }];
}

interface ChatWidgetProps {
	tenantId: string;
	brandColor?: string;
	welcomeMessage?: string;
}

export default function ChatWidget({
	tenantId,
	brandColor = '#000',
	welcomeMessage = 'Hi 👋 Need a quick quote or have a question about your project?',
}: ChatWidgetProps) {
	const [messages, setMessages] = useState<Message[]>([]);
	const [input, setInput] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const scrollRef = useRef<HTMLDivElement>(null);

	// Auto-trigger welcome message
	useEffect(() => {
		setMessages([{ role: 'model', parts: [{ text: welcomeMessage }] }]);
	}, [welcomeMessage]);

	// Scroll to bottom when messages change
	useEffect(() => {
		if (scrollRef.current) {
			scrollRef.current.scrollIntoView({ behavior: 'smooth' });
		}
	}, [messages, isLoading]);

	const handleSend = async () => {
		if (!input.trim() || isLoading) return;

		const userMessage: Message = { role: 'user', parts: [{ text: input }] };
		setMessages(prev => [...prev, userMessage]);
		setInput('');
		setIsLoading(true);

		try {
			const response = await fetch('/api/chat', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					message: input,
					tenantId: tenantId,
					history: messages, // Send history for context
				}),
			});

			const data = await response.json();
			if (data.text) {
				setMessages(prev => [
					...prev,
					{ role: 'model', parts: [{ text: data.text }] },
				]);
			}
		} catch (error) {
			console.error('Chat error:', error);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="flex flex-col h-screen max-h-screen bg-white shadow-2xl border border-border">
			{/* Header */}
			<div
				className="p-4 flex items-center justify-between text-white shadow-sm"
				style={{ backgroundColor: brandColor }}
			>
				<div className="flex items-center gap-2">
					<div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
						<Bot size={18} />
					</div>
					<span className="font-semibold tracking-tight">
						Project Assistant
					</span>
				</div>
			</div>

			{/* Chat Area */}
			<ScrollArea className="flex-1 p-4">
				<div className="space-y-4">
					{messages.map((m, i) => (
						<div
							key={i}
							className={cn(
								'flex items-end gap-2 max-w-[85%]',
								m.role === 'user' ? 'ml-auto flex-row-reverse' : 'mr-auto',
							)}
						>
							<div
								className={cn(
									'w-6 h-6 rounded-full flex items-center justify-center shrink-0 mb-1',
									m.role === 'user' ? 'bg-slate-100' : 'bg-slate-200',
								)}
							>
								{m.role === 'user' ? (
									<User size={14} className="text-slate-600" />
								) : (
									<Bot size={14} className="text-slate-600" />
								)}
							</div>
							<div
								className={cn(
									'p-3 rounded-2xl text-sm leading-relaxed',
									m.role === 'user'
										? 'bg-slate-900 text-white rounded-br-none'
										: 'bg-slate-100 text-foreground rounded-bl-none border border-border',
								)}
							>
								{m.parts[0].text}
							</div>
						</div>
					))}

					{/* Typing Indicator */}
					{isLoading && (
						<div className="flex items-center gap-2 mr-auto">
							<div className="w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center">
								<Loader2 size={14} className="animate-spin text-slate-600" />
							</div>
							<div className="bg-slate-100 p-3 rounded-2xl rounded-bl-none border border-border">
								<div className="flex gap-1">
									<span className="w-1 h-1 bg-slate-400 rounded-full animate-bounce" />
									<span className="w-1 h-1 bg-slate-400 rounded-full animate-bounce [animation-delay:0.2s]" />
									<span className="w-1 h-1 bg-slate-400 rounded-full animate-bounce [animation-delay:0.4s]" />
								</div>
							</div>
						</div>
					)}
					<div ref={scrollRef} />
				</div>
			</ScrollArea>

			{/* Input Area */}
			<div className="p-4 border-t border-border bg-white">
				<div className="relative flex items-center">
					<Input
						placeholder="Type your message..."
						className="pr-12 py-6 rounded-xl border-border focus-visible:ring-slate-400"
						value={input}
						onChange={e => setInput(e.target.value)}
						onKeyDown={e => e.key === 'Enter' && handleSend()}
					/>
					<Button
						size="icon"
						variant="ghost"
						className="absolute right-2 hover:bg-slate-100 text-slate-600"
						onClick={handleSend}
						disabled={isLoading || !input.trim()}
					>
						<Send size={18} />
					</Button>
				</div>
				<p className="text-[10px] text-center text-muted mt-2 tracking-wide uppercase font-medium">
					Powered by BUILDRAIL
				</p>
			</div>
		</div>
	);
}
