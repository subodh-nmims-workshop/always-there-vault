import { useState, useEffect } from 'react';
import { t, subscribeI18n, getLanguage, setLanguage, Language } from '../utils/i18n';

export const useTranslation = () => {
  const [lang, setLang] = useState(getLanguage());

  useEffect(() => {
    return subscribeI18n(() => {
      setLang(getLanguage());
    });
  }, []);

  return { t, changeLanguage: setLanguage, currentLanguage: lang };
};
