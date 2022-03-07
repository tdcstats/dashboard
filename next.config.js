/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["services.tzkt.io"], // domains have to be whitelisted to use Image component
  },
};

module.exports = nextConfig;
