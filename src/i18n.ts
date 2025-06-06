// 'use client';

// import i18n from 'i18next';
// import { initReactI18next } from 'react-i18next';
// import HttpBackend from 'i18next-http-backend';

// i18n
//   .use(HttpBackend) // load translations via HTTP (from public folder)
//   .use(initReactI18next)
//   .init({
//     fallbackLng: 'en',
//     supportedLngs: ['en', 'hi','mr'],
//     lng: 'en', // initial language
//     backend: {
//       loadPath: '/locales/{{lng}}/common.json',
//     },
//     interpolation: {
//       escapeValue: false,
//     },
//   });

// export default i18n;


import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpBackend from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';

i18n
  .use(HttpBackend) // load translations from /public/locales
  .use(LanguageDetector) // detects browser language
  .use(initReactI18next)
  .init({
      fallbackLng: 'en',
  supportedLngs: ['en', 'hi', 'mr'],
  interpolation: { escapeValue: false },
    detection: {
      order: ['querystring', 'cookie', 'localStorage', 'navigator'],
      caches: ['cookie'],
    },
  });

export default i18n;
