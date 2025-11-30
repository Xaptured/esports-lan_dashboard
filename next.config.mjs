/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'http',
                hostname: 'localhost',
                port: '8092',
                pathname: '/**',
            },
            // Optional: add your production API host for later
            {
                protocol: 'https',
                hostname: 'api.esports-lan.com',
                pathname: '/**',
            },
        ],
    },
};

export default nextConfig;
