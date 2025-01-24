import { hostname } from "os"

/** @type {import('next').NextConfig} */
const nextConfig: import('next').NextConfig = {
  reactStrictMode: true,
  
  images: {
    remotePatterns: [
      {hostname:'via.placeholder.com'},
      {hostname:'avatar.vercel.sh'},
      {hostname:'lh3.googleusercontent.com'},
      {hostname:'localhost'},
      {hostname:'www.gstatic.com'}, 
      {hostname:'assets.example.com'}, 
      {hostname:'plus.unsplash.com'}],
  },
  experimental: {
    serverActions: {},
  },
}

module.exports = nextConfig

