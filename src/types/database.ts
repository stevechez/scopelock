export interface Lead {
	id: string;
	tenant_id: string;
	client_name: string;
	client_email: string;
	client_phone: string;
	project_type: string;
	budget: string;
	timeline: string;
	status: 'new' | 'contacted' | 'quoted' | 'closed';
	created_at?: string;
}
