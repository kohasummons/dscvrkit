/** @type {import('next').NextConfig} */

const cspHeader = `
    default-src 'self' https://*.trycloudflare.com https://*.canvas-app.dscvr.one;
    style-src https:;
    script-src 'self';
`

// img-src 'self' * https://*.trycloudflare.com https://*.canvas-app.dscvr.one;
// connect-src 'self' https://*.trycloudflare.com https://*.canvas-app.dscvr.one https://api.dscvr.one https://api1.stg.dscvr.one https://*.helius-rpc.com https://api.devnet.solana.com;
// font-src 'self' https://*.trycloudflare.com https://*.canvas-app.dscvr.one;
// object-src 'none' *;
// base-uri 'self';
// form-action 'self';
// frame-ancestors 'self' https://*.dscvr.one https://dscvr.one;
// upgrade-insecure-requests;

const nextConfig = {
    // async headers() {
    //     return [
    //       {
    //         source: '/(.*)',
    //         headers: [
    //           {
    //             key: 'Content-Security-Policy',
    //             value: cspHeader.replace(/\n/g, ''),
    //           },
    //         ],
    //       },
    //     ]
    //   },
    // output: "export",
    reactStrictMode: true,
    webpack: (config, { dev }) => {
        if (dev) {
            Object.defineProperty(config, 'devtool', {
                get() {
                    return "cheap-source-map";
                },
                set() { },
            });
        }
        return config;
    },
    images: {
        unoptimized: true,
        remotePatterns: [
            {
                protocol: "https",
                hostname: "replicate.com",
            },
            {
                protocol: "https",
                hostname: "replicate.delivery",
            },
        ],
    },
};

export default nextConfig;
