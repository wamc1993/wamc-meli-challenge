import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "flagcdn.com",
				pathname: "/**",
			},
		],
	},
};

export default withNextIntl(nextConfig);
