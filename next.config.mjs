import { withPayload } from '@payloadcms/next/withPayload'

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'eejowrrhyyummrlskjln.supabase.co',
        pathname: '/storage/v1/object/public/media/**',
      },
    ],
  },
}

export default withPayload(nextConfig)