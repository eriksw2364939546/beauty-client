/** @type {import('next').NextConfig} */
const nextConfig = {
  // Настройка изображений
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '12000',
        pathname: '/uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'localhost',
        port: '12000',
        pathname: '/uploads/**',
      },
    ],
  },

  // SCSS
  sassOptions: {
    silenceDeprecations: ['legacy-js-api'],
  },
};

export default nextConfig;