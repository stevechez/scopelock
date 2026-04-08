export const getSubdomainUrl = (subdomain: string) => {
	const rootDomain = process.env.NEXT_PUBLIC_ROOT_DOMAIN;
	const protocol = process.env.NEXT_PUBLIC_PROTOCOL;

	return `${protocol}://${subdomain}.${rootDomain}`;
};

export const getAppUrl = (path: string = '') => {
	const rootDomain = process.env.NEXT_PUBLIC_ROOT_DOMAIN; // localhost:3000 or getbuildrail.com
	const protocol = process.env.NEXT_PUBLIC_PROTOCOL; // http or https

	// This specifically targets the "app" subdomain
	return `${protocol}://app.${rootDomain}${path}`;
};
