'use client';

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setLanguage } from '@/store/languageSlice';
import i18n from '@/i18n';

const supportedLanguages = ['en', 'hi', 'mr'];

export default function LanguageInitializer() {
  const dispatch = useDispatch();

  useEffect(() => {
    const browserLang = i18n.language; // Detected by i18next-browser-languagedetector
    const selectedLang = supportedLanguages.includes(browserLang) ? browserLang : 'en';

    i18n.changeLanguage(selectedLang);
    dispatch(setLanguage(selectedLang));
  }, []);

  return null;
}
