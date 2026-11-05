import React from 'react';
import { Language } from '../types';
import { translations } from '../utils/i18n';
import { ShieldAlert } from 'lucide-react';

interface FooterProps {
  language: Language;
}

export const Footer: React.FC<FooterProps> = ({ language }) => {
  const t = translations[language];

  return (
    <footer className="mt-auto border-t border-[#20242c] bg-[#0c0d10] py-3.5 px-4 text-center">
      <div className="max-w-xl mx-auto flex items-center justify-center gap-2 text-xs text-gray-400">
        <ShieldAlert className="w-4 h-4 text-[#FFC400] flex-shrink-0" />
        <p className="font-medium text-[11px] sm:text-xs text-gray-300">
          {t.footerDisclaimer}
        </p>
      </div>
      <p className="text-[10px] text-gray-400 mt-1">
        BIS / IS 732 Safety Standards • Single Phase 230V & Three Phase 415V
      </p>
    </footer>
  );
};
