import React, { useState } from 'react';
import { Language } from '../types';
import { translations } from '../data/translations';
import { HERO_IMAGE_PATH } from '../data/knowledgeData';
import { ArrowRight, Mountain, Leaf, Droplets, ShieldCheck, Info } from 'lucide-react';

interface HeroProps {
  currentLang: Language;
  onNavigate: (sectionId: string) => void;
  isDarkMode: boolean;
}

export const Hero: React.FC<HeroProps> = ({ currentLang, onNavigate, isDarkMode }) => {
  const t = translations[currentLang];
  const [selectedHotspotIndex, setSelectedHotspotIndex] = useState<number>(0);

  const activeHotspot = t.hero.hotspots[selectedHotspotIndex] || t.hero.hotspots[0];

  const quickCardIcons = [Mountain, Leaf, Droplets, ShieldCheck];

  return (
    <section id="home" className="pt-8 pb-16 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* NCSC Project Banner Header */}
        <div className={`mb-6 p-3 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs ${
          isDarkMode 
            ? 'bg-[#18261E] border-[#2A4032] text-slate-300' 
            : 'bg-emerald-50/80 border-emerald-200/80 text-emerald-900'
        }`}>
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-bold text-emerald-800 dark:text-emerald-400">{t.hero.ncscBadge}</span>
            <span aria-hidden="true" className="text-slate-400">·</span>
            <span>{t.hero.ncscTheme}</span>
            <span aria-hidden="true" className="text-slate-400 hidden md:inline">·</span>
            <span className="hidden md:inline text-slate-600 dark:text-slate-400">{t.hero.ncscSubtheme}</span>
          </div>
          <button
            onClick={() => onNavigate('ncsc-project')}
            className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 hover:underline flex items-center gap-1 self-start sm:self-auto cursor-pointer"
          >
            <span>{t.hero.viewReportBtn}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Hero Title & Actions */}
        <div className="text-center max-w-3xl mx-auto mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 mb-4 shadow-2xs">
            <span>⛏️</span>
            <span>{t.visuals.heroBanner.ecoTrio}</span>
            <span>🌾</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
            {t.hero.title}
            <span className="block text-xl sm:text-2xl font-semibold text-emerald-700 dark:text-emerald-400 mt-1">
              {t.hero.subTitle}
            </span>
          </h1>

          <p className="mt-3 text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
            {t.hero.tagline}
          </p>

          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            {t.visuals.heroBanner.caption}
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => onNavigate('about-coal')}
              className="px-5 py-2.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white font-medium text-sm transition-all shadow-xs flex items-center gap-2 cursor-pointer"
            >
              <span>{t.hero.exploreBtn}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => onNavigate('crop-effects')}
              className="px-5 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-medium text-sm transition-all shadow-xs cursor-pointer"
            >
              {t.hero.howHarmsBtn}
            </button>
          </div>
        </div>

        {/* Interactive Visual Landscape Scene */}
        <div className={`rounded-2xl border overflow-hidden shadow-sm transition-colors ${
          isDarkMode ? 'bg-[#15201A] border-[#2A3E31]' : 'bg-white border-slate-200'
        }`}>
          {/* Top Bar for Landscape */}
          <div className={`px-4 sm:px-6 py-3 border-b flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs ${
            isDarkMode ? 'bg-[#18261E] border-[#2A3E31]' : 'bg-slate-50 border-slate-200'
          }`}>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-slate-800 dark:text-slate-200">
                {t.hero.landscapeHeader}
              </span>
              <span aria-hidden="true" className="text-slate-400">·</span>
              <span className="text-slate-500 dark:text-slate-400">
                {t.hero.landscapeHint}
              </span>
            </div>
            <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
              <Info className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>{t.hero.landscapeTag}</span>
            </div>
          </div>

          {/* Key Landscape Components Visual Strip */}
          <div className={`px-4 sm:px-6 py-2 border-b flex items-center gap-2 overflow-x-auto text-[11px] font-medium ${
            isDarkMode ? 'bg-[#131F18] border-slate-800 text-slate-300' : 'bg-emerald-50/50 border-slate-100 text-slate-700'
          }`}>
            <span className="text-slate-400 font-bold shrink-0">Landscape Elements:</span>
            <span className="inline-flex items-center gap-1 shrink-0 px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300">
              🌱 Green Crop Field
            </span>
            <span className="inline-flex items-center gap-1 shrink-0 px-2 py-0.5 rounded bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300">
              👨‍🌾 Farmer
            </span>
            <span className="inline-flex items-center gap-1 shrink-0 px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200">
              ⛏️ Coal Mine in Background
            </span>
            <span className="inline-flex items-center gap-1 shrink-0 px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200">
              🚛 Coal Transportation
            </span>
            <span className="inline-flex items-center gap-1 shrink-0 px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300">
              🌲 Trees & Shelterbelts
            </span>
            <span className="inline-flex items-center gap-1 shrink-0 px-2 py-0.5 rounded bg-yellow-100 dark:bg-yellow-950 text-yellow-800 dark:text-yellow-300">
              🟫 Soil Layers
            </span>
            <span className="inline-flex items-center gap-1 shrink-0 px-2 py-0.5 rounded bg-sky-100 dark:bg-sky-950 text-sky-800 dark:text-sky-300">
              💧 Irrigation Water
            </span>
          </div>

          <div className="relative aspect-video max-h-[520px] w-full bg-slate-900 overflow-hidden">
            <img
              src={HERO_IMAGE_PATH}
              alt="Agricultural crops, canal, tree buffer, and coal mine landscape"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            {/* Subtle Gradient Scrim at bottom */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent pointer-events-none" />

            {/* Hotspot Pins */}
            {t.hero.hotspots.map((spot, idx) => {
              const isSelected = selectedHotspotIndex === idx;
              return (
                <button
                  key={spot.id}
                  onClick={() => setSelectedHotspotIndex(idx)}
                  style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
                  aria-label={`Inspect ${spot.title}`}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 p-1.5 rounded-full transition-all duration-200 cursor-pointer group ${
                    isSelected
                      ? 'bg-emerald-500 text-white ring-4 ring-white/80 scale-110 z-20'
                      : 'bg-black/60 hover:bg-emerald-600 text-white backdrop-blur-xs ring-2 ring-white/50 scale-100 z-10'
                  }`}
                >
                  <div className="w-3 h-3 rounded-full bg-current" />
                  <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 px-2 py-0.5 rounded text-[11px] font-semibold whitespace-nowrap bg-black/85 text-white pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
                    {spot.title}
                  </span>
                </button>
              );
            })}

            {/* Active Hotspot Educational Callout (Bottom Overlay) */}
            <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 z-20">
              <div className="bg-slate-950/85 backdrop-blur-md rounded-xl p-3 sm:p-4 text-white border border-white/15 max-w-2xl">
                <div className="flex items-center gap-2 text-xs text-emerald-300 font-semibold mb-1">
                  <span>{activeHotspot.category}</span>
                  <span aria-hidden="true" className="text-white/40">·</span>
                  <span className="text-white/80">{t.hero.whatYouSee}</span>
                </div>
                <h3 className="text-sm sm:text-base font-bold text-white">
                  {activeHotspot.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-200 mt-1 leading-relaxed">
                  {activeHotspot.description}
                </p>
              </div>
            </div>
          </div>

          {/* Quick Hotspot Selectors */}
          <div className={`p-3 border-t flex flex-wrap items-center justify-center gap-1.5 text-xs ${
            isDarkMode ? 'bg-[#15201A] border-[#2A3E31]' : 'bg-white border-slate-100'
          }`}>
            <span className="text-slate-500 dark:text-slate-400 mr-2 font-medium">{t.hero.chooseSpot}</span>
            {t.hero.hotspots.map((spot, idx) => (
              <button
                key={spot.id}
                onClick={() => setSelectedHotspotIndex(idx)}
                className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors cursor-pointer ${
                  selectedHotspotIndex === idx
                    ? 'bg-emerald-700 text-white'
                    : isDarkMode
                    ? 'bg-[#1C2C22] text-slate-300 hover:bg-[#25392C]'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {spot.title}
              </button>
            ))}
          </div>
        </div>

        {/* 4 Quick Information Cards */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {t.hero.quickCards.map((card, idx) => {
            const Icon = quickCardIcons[idx % quickCardIcons.length];
            return (
              <button
                key={card.id}
                onClick={() => onNavigate(card.id)}
                className={`text-left p-5 rounded-xl border transition-all duration-200 group hover:-translate-y-0.5 cursor-pointer ${
                  isDarkMode
                    ? 'bg-[#15211B] border-[#25392D] hover:border-emerald-500/50'
                    : 'bg-white border-slate-200 hover:border-emerald-600/40 hover:shadow-xs'
                }`}
              >
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 ${
                  isDarkMode ? 'bg-emerald-950 text-emerald-400' : 'bg-emerald-50 text-emerald-700'
                }`}>
                  <Icon className="w-5 h-5" />
                </div>
                <h2 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">
                  {card.title}
                </h2>
                <p className="mt-1 text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {card.desc}
                </p>
                <div className="mt-3 flex items-center gap-1 text-xs font-semibold text-emerald-700 dark:text-emerald-400">
                  <span>{t.hero.readMore}</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </div>
              </button>
            );
          })}
        </div>

        {/* Scientific Precision Disclaimer Box */}
        <div className={`mt-8 p-4 rounded-xl border text-xs sm:text-sm ${
          isDarkMode ? 'bg-[#1A261F] border-[#2A3E31] text-slate-300' : 'bg-amber-50/70 border-amber-200 text-amber-950'
        }`}>
          <div className="flex items-start gap-2.5">
            <Info className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <strong className="font-semibold block text-slate-900 dark:text-slate-100 mb-0.5">
                {t.hero.disclaimerTitle}
              </strong>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                {t.hero.disclaimerBody}
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
