/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '12000',
        pathname: '/uploads/**',
      },
    ],
    unoptimized: process.env.NODE_ENV === 'development',
  },

  sassOptions: {
    silenceDeprecations: ['legacy-js-api'],
  },

  experimental: {
    serverActions: {
      bodySizeLimit: '5mb',
    },
    scrollRestoration: true, // Восстановление позиции скролла при навигации
  },
};

export default nextConfig;