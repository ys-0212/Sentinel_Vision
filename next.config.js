/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost'],
  },
  env: {
    HIVE_API_URL: process.env.HIVE_API_URL || 'https://api.thehive.ai/api/v2',
  },
}

module.exports = nextConfig
