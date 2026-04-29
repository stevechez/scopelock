'use server';

import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';

// 1. Initialize Clients (Use Service Role Key for server actions to bypass RLS)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!; // 🔐 Private key
const resend = new Resend(process.env.RESEND_API_KEY);

export async function submitIntakeForm(formData: FormData) {
	// 2. Extract and Validate
	const data = {
		name: formData.get('name') as string,
		email: formData.get('email') as string,
		company: formData.get('company') as string,
		service: formData.get('service') as string,
		website: formData.get('website') as string,
		goals: formData.get('goals') as string,
	};

	if (
		!data.name ||
		!data.email ||
		!data.company ||
		!data.service ||
		!data.goals
	) {
		return { success: false, error: 'Please fill in all required fields.' };
	}

	try {
		const supabase = createClient(supabaseUrl, supabaseServiceKey);

		// 3. Insert Lead & Get the generated UUID
		const { data: newLead, error } = await supabase
			.from('onboarding_leads') // Separate table for agency leads
			.insert([data])
			.select()
			.single();

		if (error || !newLead) {
			console.error('Supabase Error:', error);
			throw new Error('Database insertion failed');
		}

		// 4. Generate the Lemon Squeezy Checkout URL
		// We pass the lead_id as a 'custom' parameter so we can match the payment later
		const storeUrl = process.env.LEMON_SQUEEZY_STORE_URL;
		const checkoutUrl = `${storeUrl}?checkout[email]=${encodeURIComponent(data.email)}&checkout[custom][lead_id]=${newLead.id}`;

		// 5. Fire the Notification Email
		await resend.emails.send({
			from: 'BUILDRAIL Onboarding <system@yourdomain.net>',
			to: 'steve@yourdomain.net', // Your actual email
			subject: `🚨 New $2.5k Website Lead: ${data.company}`,
			html: `
                <div style="font-family: sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 12px;">
                    <h2 style="color: #0F172A;">New Project Intake</h2>
                    <p><strong>Company:</strong> ${data.company}</p>
                    <p><strong>Contact:</strong> ${data.name} (${data.email})</p>
                    <p><strong>Service:</strong> ${data.service}</p>
                    <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
                    <p><strong>Goals:</strong><br/>${data.goals}</p>
                    <div style="margin-top: 30px;">
                        <a href="${checkoutUrl}" style="background: #2563EB; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: bold;">
                            Send Checkout Link
                        </a>
                    </div>
                </div>
            `,
		});

		return { success: true, checkoutUrl };
	} catch (err) {
		console.error('Intake Error:', err);
		return { success: false, error: 'Something went wrong. Please try again.' };
	}
}
