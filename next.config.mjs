import { withPayload } from '@payloadcms/next/withPayload'

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Your Next.js config here
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'eejowrrhyyummrlskjln.supabase.co',
        pathname: '/storage/v1/object/public/media/**',
      },
    ],// Add the Supabase domain here
  },
}

export default withPayload(nextConfig)
