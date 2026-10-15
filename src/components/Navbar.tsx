import React, { useState } from 'react';
import { Language, UserProfile } from '../types';
import { translations } from '../data/translations';
import { Menu, X, Sun, Moon, Sprout, Globe, BookOpen, Camera, User } from 'lucide-react';

interface NavbarProps {
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  onNavigate: (sectionId: string) => void;
  userProfile: UserProfile;
  onOpenProfile: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentLang,
  onLanguageChange,
  isDarkMode,
  onToggleDarkMode,
  onNavigate,
  userProfile,
  onOpenProfile,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = translations[currentLang];

  const handleLinkClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  const navLinks = [
    { id: 'about-coal', label: t.nav.aboutCoal },
    { id: 'crop-effects', label: t.nav.cropEffects },
    { id: 'leaf-study', label: t.nav.leafStudy },
    { id: 'soil-water', label: t.nav.soilWater },
    { id: 'observation-guide', label: t.nav.observationGuide },
    { id: 'solutions', label: t.nav.solutions },
    { id: 'library', label: t.nav.library },
    { id: 'ncsc-project', label: t.nav.ncscProject },
  ];

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .filter(Boolean)
      .slice(0, 2)
      .join('')
      .toUpperCase() || 'P';
  };

  return (
    <header className={`sticky top-0 z-40 transition-colors duration-200 border-b ${
      isDarkMode 
        ? 'bg-[#121A15]/95 backdrop-blur-md border-[#23352A] text-slate-100' 
        : 'bg-[#FBFDF9]/95 backdrop-blur-md border-[#E3ECE5] text-slate-900'
    }`}>
      {/* Top Bar: Exactly 3 Zones */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Zone 1: Single text element wordmark */}
        <button
          onClick={() => handleLinkClick('home')}
          className="flex items-center gap-2.5 text-left focus:outline-none group cursor-pointer"
        >
          <div className="w-9 h-9 rounded-lg bg-emerald-700 text-white flex items-center justify-center shadow-sm group-hover:bg-emerald-800 transition-colors">
            <Sprout className="w-5 h-5 text-emerald-100" />
          </div>
          <div>
            <span className="text-base sm:text-lg font-bold tracking-tight block leading-tight">
              {t.hero.title}
            </span>
            <span className={`text-[11px] block leading-none font-medium ${isDarkMode ? 'text-emerald-400' : 'text-emerald-700'}`}>
              {t.hero.subTitle}
            </span>
          </div>
        </button>

        {/* Zone 2: Clean text navigation links */}
        <nav className="hidden xl:flex items-center gap-4 text-xs font-medium">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleLinkClick(link.id)}
              className={`transition-colors whitespace-nowrap cursor-pointer ${
                isDarkMode 
                  ? 'text-slate-300 hover:text-emerald-400' 
                  : 'text-slate-600 hover:text-emerald-700'
              }`}
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Zone 3: Primary Actions (Profile Photo, Language Switcher, Theme, Field Log) */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* User Profile Avatar with Upload Photo link */}
          <button
            onClick={onOpenProfile}
            className="flex items-center gap-1.5 p-1 rounded-full border border-slate-200 dark:border-slate-700 hover:border-emerald-600 bg-white/80 dark:bg-slate-800/80 transition-all cursor-pointer shadow-2xs group"
            title={t.profile.viewProfileTooltip}
          >
            <div className="w-7 h-7 rounded-full overflow-hidden bg-emerald-700 text-white flex items-center justify-center font-bold text-[11px] ring-1 ring-emerald-500/60 shrink-0">
              {userProfile.photoUrl ? (
                <img
                  src={userProfile.photoUrl}
                  alt={userProfile.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span>{getInitials(userProfile.name)}</span>
              )}
            </div>
            <span className="hidden sm:inline text-xs font-semibold pr-1 text-slate-700 dark:text-slate-200 group-hover:text-emerald-700 dark:group-hover:text-emerald-400">
              {userProfile.name.split(' ')[0]}
            </span>
          </button>

          {/* Prominent Language Selector: English | हिंदी | ଓଡ଼ିଆ */}
          <div className="flex items-center p-0.5 rounded-lg border text-xs font-medium border-slate-200 dark:border-slate-700 bg-white/70 dark:bg-slate-800/70 shadow-2xs">
            <Globe className="w-3.5 h-3.5 ml-1.5 mr-0.5 text-emerald-700 dark:text-emerald-400 hidden xs:inline" />
            <button
              onClick={() => onLanguageChange('en')}
              className={`px-2 py-1 rounded transition-all text-xs cursor-pointer ${
                currentLang === 'en'
                  ? 'bg-emerald-700 text-white font-bold shadow-xs'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
              title="English"
            >
              English
            </button>
            <span className="text-slate-300 dark:text-slate-600 select-none">|</span>
            <button
              onClick={() => onLanguageChange('hi')}
              className={`px-2 py-1 rounded transition-all text-xs cursor-pointer ${
                currentLang === 'hi'
                  ? 'bg-emerald-700 text-white font-bold shadow-xs'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
              title="हिंदी (Hindi)"
            >
              हिंदी
            </button>
            <span className="text-slate-300 dark:text-slate-600 select-none">|</span>
            <button
              onClick={() => onLanguageChange('or')}
              className={`px-2 py-1 rounded transition-all text-xs cursor-pointer ${
                currentLang === 'or'
                  ? 'bg-emerald-700 text-white font-bold shadow-xs'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
              title="ଓଡ଼ିଆ (Odia)"
            >
              ଓଡ଼ିଆ
            </button>
          </div>

          {/* Dark / Light Mode Toggle */}
          <button
            onClick={onToggleDarkMode}
            aria-label="Toggle dark mode"
            className={`p-2 rounded-lg border text-slate-600 dark:text-slate-300 transition-colors cursor-pointer ${
              isDarkMode 
                ? 'border-slate-700 bg-slate-800 hover:bg-slate-700' 
                : 'border-slate-200 bg-white hover:bg-slate-100'
            }`}
          >
            {isDarkMode ? <Sun className="w-4 h-4 text-amber-300" /> : <Moon className="w-4 h-4 text-slate-700" />}
          </button>

          {/* Quick Action: Field Log */}
          <button
            onClick={() => handleLinkClick('field-log')}
            className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-emerald-700 rounded-lg hover:bg-emerald-800 transition-colors whitespace-nowrap shadow-xs cursor-pointer"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>{t.nav.fieldLog}</span>
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Open mobile menu"
            className="xl:hidden p-2 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className={`xl:hidden px-4 pt-2 pb-6 space-y-2 border-t ${
          isDarkMode ? 'bg-[#15211B] border-slate-800 text-slate-200' : 'bg-white border-slate-200 text-slate-800'
        }`}>
          {/* Mobile Profile Banner */}
          <div
            onClick={() => { onOpenProfile(); setMobileMenuOpen(false); }}
            className="flex items-center gap-3 p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 cursor-pointer"
          >
            <div className="w-10 h-10 rounded-full overflow-hidden bg-emerald-700 text-white flex items-center justify-center font-bold text-sm shrink-0">
              {userProfile.photoUrl ? (
                <img src={userProfile.photoUrl} alt={userProfile.name} className="w-full h-full object-cover" />
              ) : (
                <span>{getInitials(userProfile.name)}</span>
              )}
            </div>
            <div>
              <strong className="block text-xs font-bold text-slate-900 dark:text-white">
                {userProfile.name}
              </strong>
              <span className="text-[11px] text-emerald-700 dark:text-emerald-400">
                📷 {userProfile.photoUrl ? t.profile.changePhoto : t.profile.uploadPhoto}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-2">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className={`text-left px-3 py-2 text-xs sm:text-sm font-medium rounded-md transition-colors cursor-pointer ${
                  isDarkMode ? 'hover:bg-slate-800 text-slate-200' : 'hover:bg-emerald-50 text-slate-700'
                }`}
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={() => handleLinkClick('field-log')}
              className="text-left px-3 py-2 text-xs sm:text-sm font-medium rounded-md text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 cursor-pointer"
            >
              📝 {t.nav.fieldLog}
            </button>
            <button
              onClick={() => handleLinkClick('faq')}
              className="text-left px-3 py-2 text-xs sm:text-sm font-medium rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
            >
              ❓ {t.nav.faq}
            </button>
            <button
              onClick={() => handleLinkClick('help')}
              className="text-left px-3 py-2 text-xs sm:text-sm font-medium rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
            >
              🤝 {t.nav.help}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
