/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    emotion: true,
  },
  experimental: {
    externalDir: true,
    scrollRestoration: true,
    forceSwcTransforms: true,
    swcMinify: true,
  },
};

module.exports = nextConfig;
