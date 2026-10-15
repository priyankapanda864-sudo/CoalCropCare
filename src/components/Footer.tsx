import React from 'react';
import { Language } from '../types';
import { translations } from '../data/translations';
import { Sprout, ArrowUp } from 'lucide-react';

interface FooterProps {
  currentLang: Language;
  isDarkMode: boolean;
  onNavigate: (id: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ currentLang, isDarkMode, onNavigate }) => {
  const t = translations[currentLang];
  const ft = t.footer;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const footerLinks = [
    { id: 'home', label: t.nav.home },
    { id: 'about-coal', label: t.nav.aboutCoal },
    { id: 'crop-effects', label: t.nav.cropEffects },
    { id: 'leaf-study', label: t.nav.leafStudy },
    { id: 'soil-water', label: t.nav.soilWater },
    { id: 'observation-guide', label: t.nav.observationGuide },
    { id: 'solutions', label: t.nav.solutions },
    { id: 'library', label: t.nav.library },
    { id: 'ncsc-project', label: t.nav.ncscProject },
    { id: 'faq', label: t.nav.faq },
    { id: 'help', label: t.nav.help },
  ];

  return (
    <footer className={`border-t transition-colors ${
      isDarkMode ? 'bg-[#0E1511] border-slate-800 text-slate-400' : 'bg-slate-900 text-slate-300 border-slate-800'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-8 pb-10 border-b border-slate-800">
          
          {/* Brand & Purpose */}
          <div className="max-w-md">
            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-700 text-white flex items-center justify-center">
                <Sprout className="w-4 h-4 text-emerald-100" />
              </div>
              <span className="text-base font-bold text-white tracking-tight">
                {ft.siteTitle}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-medium">
              {ft.quote}
            </p>
            <p className="text-xs text-slate-500 mt-2 leading-relaxed">
              {ft.ncscCredit}
            </p>
          </div>

          {/* Quick Links */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            {footerLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => onNavigate(link.id)}
                className="text-left text-slate-400 hover:text-emerald-400 transition-colors py-1 cursor-pointer"
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Back to top button */}
          <div>
            <button
              onClick={scrollToTop}
              className="p-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors flex items-center gap-2 text-xs font-semibold cursor-pointer"
              title={ft.backToTop}
            >
              <span>{ft.backToTop}</span>
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>

        </div>

        {/* Bottom Credits & Disclaimer */}
        <div className="pt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-[11px] text-slate-500">
          <div>
            {ft.copyright}
          </div>
          <div className="text-slate-400 font-medium">
            {ft.disclaimer}
          </div>
        </div>
      </div>
    </footer>
  );
};
