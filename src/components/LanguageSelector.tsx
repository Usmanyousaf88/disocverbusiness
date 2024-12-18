import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';

const LanguageSelector = () => {
  const { i18n } = useTranslation();

  const languages = [
    { code: 'en', name: '🇬🇧 EN' },
    { code: 'es', name: '🇪🇸 ES' },
    { code: 'nl', name: '🇳🇱 NL' },
    { code: 'de', name: '🇩🇪 DE' },
    { code: 'fr', name: '🇫🇷 FR' }
  ];

  return (
    <div className="flex gap-2 justify-center mb-4">
      {languages.map((lang) => (
        <Button
          key={lang.code}
          variant={i18n.language === lang.code ? "default" : "outline"}
          onClick={() => i18n.changeLanguage(lang.code)}
          className="transition-all duration-300"
        >
          {lang.name}
        </Button>
      ))}
    </div>
  );
};

export default LanguageSelector;