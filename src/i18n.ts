import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en/common.json';
import ms from './locales/ms/common.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: en,
      },
      ms: {
        translation: ms,
      },
    },
    lng: 'en',
    fallbackLng: 'en', 
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  })
  .catch(err => console.log('Error initializing i18next', err));

export default i18n;
