/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    // This also helps by ignoring type errors during the build
    ignoreBuildErrors: true,
  },
}

export default nextConfig