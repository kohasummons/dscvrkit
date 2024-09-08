/** @type {import('next').NextConfig} */

const cspHeader = `
    default-src 'self' *.trycloudflare.com;
    img-src 'self' *.trycloudflare.com;
    connect-src 'self' *.trycloudflare.com
    script-src 'self' *.trycloudflare.com;
    style-src 'self' *.trycloudflare.com;
    font-src 'self' *;
    object-src 'none' *;
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
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
