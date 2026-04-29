'use client';

import { useEffect } from 'react';
import { createBrowserClient } from '@supabase/ssr';
import { toast } from 'react-hot-toast'; // Run: npm install react-hot-toast
import { DollarSign, PartyPopper } from 'lucide-react';

export default function RealtimeNotifications({
	tenantId,
}: {
	tenantId: string;
}) {
	const supabase = createBrowserClient(
		process.env.NEXT_PUBLIC_SUPABASE_URL!,
		process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
	);

	useEffect(() => {
		// 1. Subscribe to changes in the 'milestones' table
		const channel = supabase
			.channel('milestone-updates')
			.on(
				'postgres_changes',
				{
					event: 'UPDATE',
					schema: 'public',
					table: 'milestones',
				},
				payload => {
					// 2. Only trigger if the status changed to 'paid'
					if (payload.new.status === 'paid' && payload.old.status !== 'paid') {
						toast.custom(
							t => (
								<div
									className={`${t.visible ? 'animate-enter' : 'animate-leave'} max-w-md w-full bg-white shadow-2xl rounded-3xl pointer-events-auto flex ring-1 ring-black ring-opacity-5 border-l-8 border-emerald-500`}
								>
									<div className="flex-1 w-0 p-5">
										<div className="flex items-start">
											<div className="flex-shrink-0 pt-0.5">
												<div className="h-10 w-10 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center">
													<DollarSign className="w-6 h-6" />
												</div>
											</div>
											<div className="ml-4 flex-1">
												<p className="text-sm font-black text-foreground uppercase tracking-tight">
													Payment Received!
												</p>
												<p className="mt-1 text-sm text-muted font-medium">
													A milestone for{' '}
													<span className="text-foreground font-bold">
														{payload.new.title}
													</span>{' '}
													was just paid.
												</p>
											</div>
										</div>
									</div>
									<div className="flex border-l border-border p-4 items-center">
										<PartyPopper className="w-5 h-5 text-amber-500" />
									</div>
								</div>
							),
							{ duration: 5000 },
						);
					}
				},
			)
			.subscribe();

		return () => {
			supabase.removeChannel(channel);
		};
	}, [supabase, tenantId]);

	return null; // This is a logic-only component
}
