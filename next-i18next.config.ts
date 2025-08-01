const i18nConfig = {
  i18n: {
    defaultLocale: process.env.NEXT_PUBLIC_DEFAULT_LOCALE || 'en',
    locales: ['en', 'hi', 'mr'],
    localeDetection: true,
  },
};

export default i18nConfig;
