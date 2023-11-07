// eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-var-requires
const path = require('path');

const environment = process.env.NODE_ENV;

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

    unoptimized: true,
  },

  basePath: environment === 'development' ? undefined : '/ArkQuiz',
}

module.exports = nextConfig;
