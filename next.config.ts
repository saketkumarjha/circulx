/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['via.placeholder.com', 'avatar.vercel.sh','lh3.googleusercontent.com','localhost','www.gstatic.com'],
  },
  experimental: {
    serverActions: true,
  },
}

module.exports = nextConfig

