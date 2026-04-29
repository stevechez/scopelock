'use server';

export async function getQuickBooksAuthUrl() {
	const rootUrl = 'https://appcenter.intuit.com/connect/oauth2';

	// These must match your .env.local and Intuit Dashboard exactly
	const options = {
		client_id: process.env.QB_CLIENT_ID!,
		redirect_uri: process.env.QB_REDIRECT_URI!,
		response_type: 'code',
		scope: 'com.intuit.quickbooks.accounting openid profile email',
		state: 'buildrail_auth_state', // In production, use a random string
	};

	const qbUrl = `${rootUrl}?${new URLSearchParams(options).toString()}`;
	return qbUrl;
}
