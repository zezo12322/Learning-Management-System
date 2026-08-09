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
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains',
          },
          { key: 'Content-Security-Policy', value: contentSecurityPolicy() },
        ],
      },
    ]
  },
}

/**
 * Content-Security-Policy.
 *
 * Built from the same build-time env the app itself uses, so the allowed
 * origins cannot drift from the ones the client actually calls. Anything not
 * listed is blocked by the browser, which is the point: a course title or
 * thumbnail authored by another user cannot reach an origin we did not name.
 *
 * `script-src` keeps `'unsafe-inline'` because the Next.js App Router injects
 * inline bootstrap and flight-data scripts, and per-request nonces are not
 * available on this static-export-to-Workers deployment. The remaining
 * directives still hold, and `object-src 'none'` plus `base-uri 'self'` close
 * the injection routes that do not need script execution.
 */
function contentSecurityPolicy() {
  const origin = (value) => {
    try {
      return value ? new URL(value).origin : null
    } catch {
      return null
    }
  }

  const api = origin(process.env.NEXT_PUBLIC_API_URL)
  const ai = origin(process.env.NEXT_PUBLIC_AI_API_URL)
  const firebase = [
    'https://identitytoolkit.googleapis.com',
    'https://securetoken.googleapis.com',
    'https://www.googleapis.com',
    'https://firebasestorage.googleapis.com',
    'https://storage.googleapis.com',
  ]
  const authDomain = process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
    ? `https://${process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN}`
    : null

  const connect = ["'self'", api, ai, authDomain, ...firebase].filter(Boolean)
  const images = [
    "'self'",
    'data:',
    'blob:',
    'https://firebasestorage.googleapis.com',
    'https://storage.googleapis.com',
    'https://lh3.googleusercontent.com',
  ]

  return [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline'",
    "style-src 'self' 'unsafe-inline'",
    `img-src ${images.join(' ')}`,
    "font-src 'self' data:",
    // Video segments are fetched from signed GCS URLs by hls.js.
    `media-src 'self' blob: https://storage.googleapis.com https://firebasestorage.googleapis.com`,
    `connect-src ${connect.join(' ')}`,
    // Firebase signInWithRedirect hands off to the auth domain in a frame.
    `frame-src 'self' ${authDomain ?? ''}`.trim(),
    "worker-src 'self' blob:",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
    'upgrade-insecure-requests',
  ].join('; ')
}

export default nextConfig

import { initOpenNextCloudflareForDev } from '@opennextjs/cloudflare'

initOpenNextCloudflareForDev()
