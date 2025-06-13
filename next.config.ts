import { NextConfig } from 'next';

const config: NextConfig = {
  output: 'standalone',
  // i18n: i18nConfig.i18n,
  allowedDevOrigins: ['*'],
  devIndicators: false,
};

export default config;
