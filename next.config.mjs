/** @type {import('next').NextConfig} */

const cspHeader = `
    default-src 'self' *.trycloudflare.com *.canvas-app.dscvr.one;
    img-src 'self' * https://*.trycloudflare.com https://*.canvas-app.dscvr.one https://nextjs.org;
    connect-src 'self' https://*.trycloudflare.com https://*.canvas-app.dscvr.one https://nextjs.org;
    script-src 'self' https://*.trycloudflare.com https://*.canvas-app.dscvr.one https://nextjs.org;
    style-src 'self' https://*.trycloudflare.com https://*.canvas-app.dscvr.one https://nextjs.org;
    font-src 'self' https://*.trycloudflare.com https://*.canvas-app.dscvr.one https://nextjs.org;
    object-src 'none' *;
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'self' https://*.dscvr.one https://dscvr.one;
    upgrade-insecure-requests;
`

const nextConfig = {
    async headers() {
        return [
          {
            source: '/(.*)',
            headers: [
              {
                key: 'Content-Security-Policy',
                value: cspHeader.replace(/\n/g, ''),
              },
            ],
          },
        ]
      },
};

export default nextConfig;
