import React, { useState } from 'react';
import { Language } from '../../types';
import { translations } from '../../data/translations';
import { Leaf, Sun, Wind, CheckCircle2, AlertTriangle, Sparkles, Droplets } from 'lucide-react';

interface LeafDustComparisonCardProps {
  currentLang: Language;
  isDarkMode: boolean;
}

export const LeafDustComparisonCard: React.FC<LeafDustComparisonCardProps> = ({
  currentLang,
  isDarkMode,
}) => {
  const [activeTab, setActiveTab] = useState<'both' | 'clean' | 'dusty'>('both');
  const t = translations[currentLang];
  const lc = t.visuals.leafComparison;

  return (
    <div
      className={`p-6 sm:p-8 rounded-2xl border transition-all duration-200 ${
        isDarkMode
          ? 'bg-[#15211B] border-[#25392D]'
          : 'bg-white border-slate-200/90 shadow-sm'
      }`}
    >
      {/* Header */}
      <div className="max-w-3xl mb-8">
        <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 mb-1">
          <Leaf className="w-3.5 h-3.5" />
          <span>Educational Comparison Model</span>
        </div>
        <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
          {lc.title}
        </h3>
        <p className="mt-1 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
          {lc.subtitle}
        </p>
      </div>

      {/* Side-by-Side Illustrated Leaf Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        
        {/* 1. CLEAN LEAF */}
        <div
          className={`p-6 rounded-2xl border flex flex-col justify-between transition-all duration-200 relative overflow-hidden ${
            isDarkMode
              ? 'bg-[#182820] border-emerald-800/60'
              : 'bg-gradient-to-b from-emerald-50/50 to-white border-emerald-200'
          }`}
        >
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>{lc.cleanTitle}</span>
              </span>
              <span className="text-[11px] font-semibold text-emerald-700 dark:text-emerald-400">
                100% Light Exposure
              </span>
            </div>

            {/* Custom SVG Illustration: Healthy Vibrant Green Leaf */}
            <div className="relative h-44 w-full flex items-center justify-center my-3 bg-emerald-950/20 dark:bg-emerald-950/40 rounded-xl overflow-hidden border border-emerald-200/50 dark:border-emerald-800/40">
              <svg viewBox="0 0 240 160" className="w-48 h-36 drop-shadow-md">
                {/* Sunlight Rays */}
                <path d="M 20 20 L 45 45" stroke="#F59E0B" strokeWidth="2.5" strokeDasharray="3 3" />
                <path d="M 40 10 L 60 40" stroke="#F59E0B" strokeWidth="2.5" strokeDasharray="3 3" />
                <circle cx="20" cy="15" r="10" fill="#FBBF24" opacity="0.8" />

                {/* Leaf Blade Shape */}
                <path
                  d="M 40 130 C 50 70, 110 30, 200 40 C 180 100, 120 150, 40 130 Z"
                  fill="#10B981"
                  stroke="#059669"
                  strokeWidth="3"
                />
                {/* Central Vein */}
                <path
                  d="M 40 130 Q 115 85, 200 40"
                  stroke="#34D399"
                  strokeWidth="3.5"
                  fill="none"
                  strokeLinecap="round"
                />
                {/* Side Veins */}
                <path d="M 80 110 Q 95 90, 120 85" stroke="#34D399" strokeWidth="1.8" fill="none" />
                <path d="M 115 90 Q 135 70, 155 65" stroke="#34D399" strokeWidth="1.8" fill="none" />
                <path d="M 150 70 Q 170 55, 185 50" stroke="#34D399" strokeWidth="1.8" fill="none" />
                <path d="M 85 110 Q 75 125, 95 130" stroke="#34D399" strokeWidth="1.5" fill="none" />
                <path d="M 120 90 Q 115 110, 135 115" stroke="#34D399" strokeWidth="1.5" fill="none" />

                {/* Open Healthy Stomata Sparkles */}
                <circle cx="90" cy="70" r="2.5" fill="#A7F3D0" />
                <circle cx="130" cy="60" r="2.5" fill="#A7F3D0" />
                <circle cx="160" cy="80" r="2.5" fill="#A7F3D0" />
                <circle cx="110" cy="100" r="2.5" fill="#A7F3D0" />
              </svg>

              <div className="absolute bottom-2 left-3 text-[10px] font-semibold px-2 py-0.5 rounded bg-emerald-800/80 text-white">
                “{lc.cleanDesc}”
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed mt-3">
              {lc.cleanBullet}
            </p>
          </div>
        </div>

        {/* 2. DUSTY LEAF */}
        <div
          className={`p-6 rounded-2xl border flex flex-col justify-between transition-all duration-200 relative overflow-hidden ${
            isDarkMode
              ? 'bg-[#1C241E] border-slate-700'
              : 'bg-gradient-to-b from-slate-50 to-white border-slate-300'
          }`}
        >
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 dark:bg-amber-950 text-amber-900 dark:text-amber-300">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                <span>{lc.dustyTitle}</span>
              </span>
              <span className="text-[11px] font-semibold text-amber-700 dark:text-amber-400">
                Reduced Photosynthesis Zone
              </span>
            </div>

            {/* Custom SVG Illustration: Leaf with Dark Surface Dust Particles */}
            <div className="relative h-44 w-full flex items-center justify-center my-3 bg-slate-900/10 dark:bg-slate-900/60 rounded-xl overflow-hidden border border-slate-300 dark:border-slate-800">
              <svg viewBox="0 0 240 160" className="w-48 h-36 drop-shadow-md">
                {/* Obstructed Sunlight Rays */}
                <path d="M 20 20 L 40 40" stroke="#F59E0B" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.6" />
                <circle cx="20" cy="15" r="8" fill="#FBBF24" opacity="0.5" />

                {/* Leaf Blade Shape with Dulled Green */}
                <path
                  d="M 40 130 C 50 70, 110 30, 200 40 C 180 100, 120 150, 40 130 Z"
                  fill="#047857"
                  stroke="#065F46"
                  strokeWidth="3"
                />
                {/* Central Vein */}
                <path
                  d="M 40 130 Q 115 85, 200 40"
                  stroke="#10B981"
                  strokeWidth="3"
                  fill="none"
                  strokeLinecap="round"
                />
                {/* Side Veins */}
                <path d="M 80 110 Q 95 90, 120 85" stroke="#10B981" strokeWidth="1.5" fill="none" />
                <path d="M 115 90 Q 135 70, 155 65" stroke="#10B981" strokeWidth="1.5" fill="none" />

                {/* Dust Speckle Overlay Clusters */}
                <g fill="#1F2937" stroke="#111827" strokeWidth="0.5">
                  <circle cx="70" cy="90" r="3" />
                  <circle cx="78" cy="85" r="2.5" />
                  <circle cx="95" cy="75" r="3.5" />
                  <circle cx="105" cy="70" r="2.5" />
                  <circle cx="115" cy="65" r="3" />
                  <circle cx="125" cy="60" r="4" />
                  <circle cx="140" cy="55" r="3" />
                  <circle cx="155" cy="50" r="2.5" />
                  <circle cx="168" cy="46" r="3.5" />

                  <circle cx="85" cy="115" r="3" />
                  <circle cx="100" cy="105" r="3.5" />
                  <circle cx="120" cy="95" r="4" />
                  <circle cx="135" cy="85" r="3" />
                  <circle cx="150" cy="75" r="3.5" />
                  <circle cx="165" cy="68" r="2.8" />

                  <circle cx="95" cy="125" r="2.8" />
                  <circle cx="110" cy="118" r="3.2" />
                  <circle cx="130" cy="110" r="3.8" />
                  <circle cx="145" cy="98" r="3" />
                  <circle cx="160" cy="90" r="3.2" />
                  <circle cx="175" cy="75" r="2.5" />
                </g>
              </svg>

              <div className="absolute bottom-2 left-3 text-[10px] font-semibold px-2 py-0.5 rounded bg-slate-900/90 text-white">
                “{lc.dustyDesc}”
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed mt-3">
              {lc.dustyBullet}
            </p>
          </div>
        </div>

      </div>

      {/* PROMINENT SCIENTIFIC QUOTE REQUIRED BY PROMPT */}
      <div
        className={`p-5 rounded-xl border text-center my-6 ${
          isDarkMode
            ? 'bg-[#18231C] border-[#25392D] text-emerald-300'
            : 'bg-emerald-50 border-emerald-300 text-emerald-950 shadow-xs'
        }`}
      >
        <blockquote className="text-sm sm:text-base font-bold italic tracking-wide leading-relaxed">
          {lc.scientificQuote}
        </blockquote>
      </div>

      {/* Scientific Principle Disclaimer */}
      <div
        className={`p-4 rounded-xl border text-xs ${
          isDarkMode
            ? 'bg-[#15201A] border-slate-800 text-slate-300'
            : 'bg-slate-50 border-slate-200 text-slate-700'
        }`}
      >
        <p className="leading-relaxed">
          <strong>Observation Note: </strong>
          {lc.disclaimer}
        </p>
      </div>
    </div>
  );
};
