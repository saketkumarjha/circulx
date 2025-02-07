/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  
  
  images: {
    domains: ['via.placeholder.com', 'avatar.vercel.sh','lh3.googleusercontent.com','localhost','www.gstatic.com'],
  },
  experimental: {
    serverActions: {},
  },
}

module.exports = nextConfig

