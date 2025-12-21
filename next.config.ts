// next.config.ts
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Remove the empty experimental object
  typescript: {
    ignoreBuildErrors: true,
  },
  // Add this to fix the lockfile warning
  experimental: {
    turbopack: {
      root: __dirname
    }
  }
};

module.exports = nextConfig;