import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'tyvqrdzgjvyhbuakfifq.supabase.co', // 👈 Your exact Supabase project URL
				port: '',
				pathname: '/storage/v1/object/public/**', // Lock it down to just your public storage
			},
			{
				protocol: 'https',
				hostname: 'images.unsplash.com', // Keep this if you still have dummy MVP data
			},
		],
	},
};

export default nextConfig;
