import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import crypto from 'crypto';

export async function POST(req: Request) {
	try {
		const rawBody = await req.text();
		const signature = req.headers.get('x-signature') || '';
		const secret = process.env.LEMON_SQUEEZY_WEBHOOK_SECRET || '';

		// 1. Verify the signature (Security First)
		const hmac = crypto.createHmac('sha256', secret);
		const digest = Buffer.from(hmac.update(rawBody).digest('hex'), 'utf8');
		const signatureBuffer = Buffer.from(signature, 'utf8');

		if (!crypto.timingSafeEqual(digest, signatureBuffer)) {
			return new NextResponse('Invalid signature', { status: 401 });
		}

		const data = JSON.parse(rawBody);
		const eventName = data['meta']['event_name'];
		const customData = data['meta']['custom_data'];

		// 2. Handle the "Order Created" event
		if (eventName === 'order_created') {
			const milestoneId = customData['milestone_id'];

			if (milestoneId) {
				const { error } = await supabase
					.from('milestones')
					.update({
						status: 'paid',
						paid_at: new Date().toISOString(),
					})
					.eq('id', milestoneId);

				if (error) {
					console.error('Database update failed:', error);
					return new NextResponse('DB Error', { status: 500 });
				}

				console.log(`✅ Milestone ${milestoneId} marked as PAID.`);
			}
		}

		return NextResponse.json({ received: true });
	} catch (err) {
		console.error('Webhook error:', err);
		return new NextResponse('Webhook Error', { status: 500 });
	}
}
