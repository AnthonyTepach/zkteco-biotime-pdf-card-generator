/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: "http",
          hostname: "192.168.200.12",
        },
      ],
    },
  };

module.exports = nextConfig;
