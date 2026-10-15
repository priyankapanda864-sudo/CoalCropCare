import React from 'react';
import { Language } from '../../types';
import { translations } from '../../data/translations';
import { Sun, Wind, CloudRain, CloudSun } from 'lucide-react';

interface WeatherVisualsProps {
  currentLang: Language;
  isDarkMode: boolean;
}

export const WeatherVisuals: React.FC<WeatherVisualsProps> = ({ currentLang, isDarkMode }) => {
  const t = translations[currentLang];
  const wv = t.visuals.weatherVisuals;

  return (
    <div
      className={`p-6 sm:p-8 rounded-2xl border transition-all duration-200 ${
        isDarkMode ? 'bg-[#15211B] border-[#25392D]' : 'bg-white border-slate-200/90 shadow-sm'
      }`}
    >
      {/* Title */}
      <div className="max-w-3xl mb-8">
        <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 mb-1">
          <CloudSun className="w-3.5 h-3.5" />
          <span>Weather Dynamics & Transport</span>
        </div>
        <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
          {wv.title}
        </h3>
        <p className="mt-1 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
          {wv.subtitle}
        </p>
      </div>

      {/* 3 Visual Weather Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* 1. Dry Weather */}
        <div
          className={`p-6 rounded-2xl border flex flex-col justify-between transition-all duration-200 hover:-translate-y-0.5 ${
            isDarkMode
              ? 'bg-[#1E2319] border-amber-900/40 hover:border-amber-500/50'
              : 'bg-gradient-to-b from-amber-50/50 to-white border-amber-200 hover:border-amber-300 shadow-2xs'
          }`}
        >
          <div>
            {/* Simple Graphic SVG */}
            <div className="h-28 w-full flex items-center justify-center mb-4 bg-amber-950/10 dark:bg-amber-950/30 rounded-xl border border-amber-200/50 dark:border-amber-800/30">
              <svg viewBox="0 0 160 100" className="w-32 h-20">
                {/* Sun */}
                <circle cx="80" cy="40" r="22" fill="#F59E0B" />
                <g stroke="#FBBF24" strokeWidth="2.5" strokeLinecap="round">
                  <line x1="80" y1="8" x2="80" y2="2" />
                  <line x1="80" y1="72" x2="80" y2="78" />
                  <line x1="48" y1="40" x2="42" y2="40" />
                  <line x1="112" y1="40" x2="118" y2="40" />
                  <line x1="57" y1="17" x2="52" y2="12" />
                  <line x1="103" y1="63" x2="108" y2="68" />
                  <line x1="57" y1="63" x2="52" y2="68" />
                  <line x1="103" y1="17" x2="108" y2="12" />
                </g>
                {/* Rising dust particles */}
                <circle cx="50" cy="85" r="2.5" fill="#78350F" opacity="0.7" />
                <circle cx="70" cy="80" r="3" fill="#78350F" opacity="0.8" />
                <circle cx="95" cy="82" r="2.5" fill="#78350F" opacity="0.7" />
                <circle cx="115" cy="86" r="3.2" fill="#78350F" opacity="0.6" />
                <path d="M 60 92 Q 80 88, 100 92" stroke="#B45309" strokeWidth="2" fill="none" strokeDasharray="3 3" />
              </svg>
            </div>

            <h4 className="text-base font-bold text-slate-900 dark:text-white mb-2">
              {wv.dry.title}
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-3">
              {wv.dry.desc}
            </p>
          </div>

          <div className="pt-3 border-t border-amber-200/60 dark:border-slate-800 text-[11px] font-semibold text-amber-800 dark:text-amber-400">
            → {wv.dry.impact}
          </div>
        </div>

        {/* 2. Wind */}
        <div
          className={`p-6 rounded-2xl border flex flex-col justify-between transition-all duration-200 hover:-translate-y-0.5 ${
            isDarkMode
              ? 'bg-[#182622] border-sky-900/40 hover:border-sky-500/50'
              : 'bg-gradient-to-b from-sky-50/50 to-white border-sky-200 hover:border-sky-300 shadow-2xs'
          }`}
        >
          <div>
            {/* Simple Graphic SVG */}
            <div className="h-28 w-full flex items-center justify-center mb-4 bg-sky-950/10 dark:bg-sky-950/30 rounded-xl border border-sky-200/50 dark:border-sky-800/30">
              <svg viewBox="0 0 160 100" className="w-32 h-20">
                {/* Flowing Wind Lines */}
                <path d="M 20 30 Q 70 25, 110 32 T 140 28" stroke="#38BDF8" strokeWidth="3" fill="none" strokeLinecap="round" />
                <path d="M 30 50 Q 80 46, 120 52 T 148 48" stroke="#0284C7" strokeWidth="3.5" fill="none" strokeLinecap="round" />
                <path d="M 15 70 Q 60 66, 100 72 T 135 68" stroke="#38BDF8" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                {/* Airborne Particles carried in wind */}
                <circle cx="65" cy="40" r="2.8" fill="#1E293B" />
                <circle cx="85" cy="58" r="3.2" fill="#1E293B" />
                <circle cx="115" cy="42" r="2.5" fill="#1E293B" />
                <circle cx="130" cy="60" r="3" fill="#1E293B" />
              </svg>
            </div>

            <h4 className="text-base font-bold text-slate-900 dark:text-white mb-2">
              {wv.wind.title}
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-3">
              {wv.wind.desc}
            </p>
          </div>

          <div className="pt-3 border-t border-sky-200/60 dark:border-slate-800 text-[11px] font-semibold text-sky-800 dark:text-sky-400">
            → {wv.wind.impact}
          </div>
        </div>

        {/* 3. Rain */}
        <div
          className={`p-6 rounded-2xl border flex flex-col justify-between transition-all duration-200 hover:-translate-y-0.5 ${
            isDarkMode
              ? 'bg-[#182326] border-teal-900/40 hover:border-teal-500/50'
              : 'bg-gradient-to-b from-teal-50/50 to-white border-teal-200 hover:border-teal-300 shadow-2xs'
          }`}
        >
          <div>
            {/* Simple Graphic SVG */}
            <div className="h-28 w-full flex items-center justify-center mb-4 bg-teal-950/10 dark:bg-teal-950/30 rounded-xl border border-teal-200/50 dark:border-teal-800/30">
              <svg viewBox="0 0 160 100" className="w-32 h-20">
                {/* Cloud Shape */}
                <path
                  d="M 45 45 A 18 18 0 0 1 75 35 A 24 24 0 0 1 115 42 A 16 16 0 0 1 125 58 L 45 58 Z"
                  fill="#94A3B8"
                />
                {/* Rain Streaks */}
                <line x1="50" y1="65" x2="45" y2="85" stroke="#0284C7" strokeWidth="2.5" strokeLinecap="round" />
                <line x1="70" y1="65" x2="65" y2="85" stroke="#0284C7" strokeWidth="2.5" strokeLinecap="round" />
                <line x1="90" y1="65" x2="85" y2="85" stroke="#0284C7" strokeWidth="2.5" strokeLinecap="round" />
                <line x1="110" y1="65" x2="105" y2="85" stroke="#0284C7" strokeWidth="2.5" strokeLinecap="round" />
                {/* Cleansed ground runoff wave */}
                <path d="M 30 92 Q 80 87, 140 93" stroke="#0D9488" strokeWidth="3" fill="none" />
              </svg>
            </div>

            <h4 className="text-base font-bold text-slate-900 dark:text-white mb-2">
              {wv.rain.title}
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-3">
              {wv.rain.desc}
            </p>
          </div>

          <div className="pt-3 border-t border-teal-200/60 dark:border-slate-800 text-[11px] font-semibold text-teal-800 dark:text-teal-400">
            → {wv.rain.impact}
          </div>
        </div>

      </div>
    </div>
  );
};
