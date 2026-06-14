import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
    output: process.env.TYPE === 'standalone' ? undefined : 'standalone',
    compiler: {
        styledComponents: true,
    },
}

export default nextConfig
