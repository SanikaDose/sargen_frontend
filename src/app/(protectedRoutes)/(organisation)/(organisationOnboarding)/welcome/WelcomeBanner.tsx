'use client';

import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export default function WelcomeBanner() {
  const { t, i18n } = useTranslation();
console.log('inside the welcomepage')

  useEffect(() => {
    console.log('Detected language from browser or cookie:', i18n.language);
  }, [i18n.language]);
  return (
    <div>
      <h1>{t('hello')}</h1>
      <p>{t('welcome')}</p>

      {/* <button onClick={() => i18n.changeLanguage('hi')}>हिंदी</button>
      <button onClick={() => i18n.changeLanguage('en')}>English</button>
         <button onClick={() => i18n.changeLanguage('mr')}>marathi</button> */}
    </div>
  );
}
