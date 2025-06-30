import { NextConfig } from 'next';

const config: NextConfig = {
  output: 'standalone',
  assetPrefix: '/',
  basePath: '',
  // i18n: i18nConfig.i18n,
  allowedDevOrigins: ['*'],
  devIndicators: false,
  webpack: (config) => {
    config.resolve.fallback = { ...config.resolve.fallback, fs: false };
    return config;
  },
};

// export default config;
// import { NextConfig } from 'next';

// const config: NextConfig = {
//   output: 'standalone', // good for Docker or Node hosting

//   reactStrictMode: true, // helps catch bugs during development

//   compress: true, // enables gzip compression

//   turbopack: {
//     rules: {
//       '*.svg': {
//         loaders: [
//           {
//             loader: '@svgr/webpack',
//             options: {
//               icon: true,
//             },
//           },
//         ],
//         as: '*.js',
//       },
//     },
//   },

//   images: {
//     formats: ['image/webp'], // faster image delivery
//     minimumCacheTTL: 60, // in seconds (cache hint)
//     domains: ['your-cdn.com', 'localhost'], // optimize images from these domains
//   },

//   headers: async () => [
//     {
//       source: '/(.*)',
//       headers: [
//         {
//           key: 'Cache-Control',
//           value: 'public, max-age=3600, stale-while-revalidate=59',
//         },
//       ],
//     },
//   ],

//   allowedDevOrigins: ['*'], // optional; can restrict in production
//   devIndicators: {
//     buildActivity: false,
//   },
// };

export default config;
