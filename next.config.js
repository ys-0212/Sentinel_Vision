/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ['localhost'],
  },
  env: {
    HIVE_API_URL: process.env.HIVE_API_URL || 'https://api.thehive.ai/api/v2',
  },
}

module.exports = nextConfig
