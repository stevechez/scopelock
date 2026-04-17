import { createClient } from '@supabase/supabase-js';

// ⚠️ IMPORTANT: We use the Service Role Key because the widget API
// is called by unauthenticated visitors on external websites.
// Never expose the service_role key to the client/browser.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

// --- Types ---

export interface FAQ {
	q: string;
	a: string;
}

export interface WidgetConfig {
	tenant_id: string;
	is_active: boolean;
	system_tone: string;
	services: string[];
	faq: FAQ[];
	service_area: string | null;
	brand_color: string;
	welcome_message: string;
}

export interface LeadInsert {
	tenant_id: string;
	first_name: string;
	last_name?: string | null;
	client_email?: string | null;
	phone?: string | null;
	project_details?: string | null;
	source?: string;
}

// --- Database Operations ---

/**
 * Fetches the specific widget configuration for a contractor.
 * Called by the /api/chat route to build the Gemini prompt.
 */
export async function getWidgetConfig(
	tenantId: string,
): Promise<WidgetConfig | null> {
	const { data, error } = await supabaseAdmin
		.from('widget_configs')
		.select('*')
		.eq('tenant_id', tenantId)
		.single();

	if (error || !data) {
		console.error(
			`[DB] Error fetching widget config for tenant ${tenantId}:`,
			error?.message,
		);
		return null;
	}

	// Ensure is_active is true before returning
	if (!data.is_active) {
		console.warn(`[DB] Widget config for tenant ${tenantId} is inactive.`);
		return null;
	}

	return data as WidgetConfig;
}

/**
 * Inserts a new lead captured by the AI directly into the contractor's pipeline.
 */
export async function createLead(leadData: LeadInsert) {
	const { data, error } = await supabaseAdmin
		.from('leads')
		.insert([
			{
				...leadData,
				source: 'ai_widget', // Hardcoded safeguard to track origin
				status: 'new',
			},
		])
		.select()
		.single();

	if (error) {
		console.error('[DB] Error creating lead:', error.message);
		throw new Error('Failed to insert lead into database.');
	}

	return data;
}
