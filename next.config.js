const path = require('path');

const environment = process.env.NODE_ENV;

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },

  output: 'export',

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

    unoptimized: true,
  },

  basePath: environment === 'development' ? undefined : '/ArkQuiz',
  assetPrefix: environment === 'development' ? undefined : 'https://adamwasowicz.github.io/ArkQuiz'
}

module.exports = nextConfig;
