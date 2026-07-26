import { fileURLToPath } from 'node:url'

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  outputFileTracingRoot: fileURLToPath(new URL('.', import.meta.url)),
  // Firebase's Node build pulls in `undici`, whose private-class-field syntax
  // webpack can't parse. Mark these external so Node loads them natively during
  // the server compile of client components.
  serverExternalPackages: ['firebase', '@firebase/auth', '@firebase/functions', 'undici'],
  images: {
    // Keep the temporary Workers deployment inside the free tier by serving
    // source images directly instead of using Cloudflare Images transforms.
    unoptimized: true,
    remotePatterns: [
      { protocol: 'https', hostname: 'firebasestorage.googleapis.com' },
      { protocol: 'https', hostname: 'storage.googleapis.com' },
      { protocol: 'https', hostname: 'lh3.googleusercontent.com' },
    ],
  },
  webpack: (config) => {
    // Force the browser build of Firebase (esm2017, no undici) everywhere by
    // preferring the `browser` export condition and dropping `node`. This also
    // covers the RSC client-reference compile (which runs in the server
    // compiler), where the undici parse error otherwise occurs.
    const names = config.resolve.conditionNames || ['require', 'node', 'import']
    config.resolve.conditionNames = ['browser', ...names.filter((c) => c !== 'node')]
    return config
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
          { key: 'Cross-Origin-Opener-Policy', value: 'same-origin-allow-popups' },
        ],
      },
    ]
  },
}

export default nextConfig

import { initOpenNextCloudflareForDev } from '@opennextjs/cloudflare'

initOpenNextCloudflareForDev()
