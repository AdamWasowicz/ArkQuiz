const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },

      {
        protocol: "http",
        hostname: "**",
      },
    ],
  },

  webpack(config, { nextRuntime }) { 
    if (typeof nextRuntime === "undefined") {
      config.resolve.fallback = {
                ...config.resolve.fallback,
                fs: false,
         };  
    }

    return config;
  },
}

module.exports = nextConfig;
