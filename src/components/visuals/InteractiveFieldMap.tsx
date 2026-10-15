import React, { useState } from 'react';
import { Language } from '../../types';
import { translations } from '../../data/translations';
import { Map, Wind, Trees, Droplets, Mountain, Home, Sprout, Info, ChevronRight } from 'lucide-react';

interface InteractiveFieldMapProps {
  currentLang: Language;
  isDarkMode: boolean;
}

export const InteractiveFieldMap: React.FC<InteractiveFieldMapProps> = ({ currentLang, isDarkMode }) => {
  const [selectedZone, setSelectedZone] = useState<'mine' | 'dust' | 'farm' | 'water' | 'village'>('farm');
  const t = translations[currentLang];
  const fm = t.visuals.fieldMap;

  const currentZoneData = fm.zones[selectedZone];

  return (
    <div
      className={`p-6 sm:p-8 rounded-2xl border transition-all duration-200 ${
        isDarkMode ? 'bg-[#15211B] border-[#25392D]' : 'bg-white border-slate-200/90 shadow-sm'
      }`}
    >
      {/* Title */}
      <div className="max-w-3xl mb-6">
        <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 mb-1">
          <Map className="w-3.5 h-3.5" />
          <span>Educational Landscape Model</span>
        </div>
        <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
          {fm.title}
        </h3>
        <p className="mt-1 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
          {fm.subtitle}
        </p>
      </div>

      <div className="text-xs text-slate-500 dark:text-slate-400 mb-4 flex items-center gap-1.5">
        <Info className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
        <span>{fm.instruction}</span>
      </div>

      {/* Visual Map Canvas (Simplified Educational Landscape Illustration) */}
      <div className="relative rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-[#0E1A14] aspect-16/9 sm:aspect-21/9 w-full mb-6">
        <svg viewBox="0 0 800 360" className="w-full h-full">
          {/* Background Sky / Ground Zones */}
          <rect x="0" y="0" width="800" height="360" fill="#13241A" />
          
          {/* 1. MINING AREA (Left 0–220) */}
          <rect x="0" y="0" width="220" height="360" fill="#241E19" opacity="0.85" />
          {/* Pit terraces */}
          <path d="M 0 100 L 70 120 L 140 180 L 190 260 L 220 360" stroke="#3E3025" strokeWidth="2.5" fill="none" />
          <path d="M 0 160 L 60 180 L 110 230 L 160 300 L 180 360" stroke="#4B3A2C" strokeWidth="2" fill="none" />
          <path d="M 0 220 L 50 240 L 90 280 L 130 360" stroke="#3E3025" strokeWidth="2" fill="none" />
          {/* Excavator & Coal piles icons */}
          <text x="35" y="80" fontSize="32" className="select-none">⛏️</text>
          <text x="120" y="140" fontSize="28" className="select-none">🏭</text>
          <text x="50" y="220" fontSize="26" className="select-none">🚛</text>

          {/* 2. DUST MOVEMENT / WIND ZONE (220–360) */}
          <rect x="220" y="0" width="160" height="360" fill="#1D2A20" opacity="0.6" />
          {/* Wind arrows & particulate drift */}
          <g stroke="#38BDF8" strokeWidth="2" fill="none" strokeDasharray="6 4" opacity="0.7">
            <path d="M 180 70 Q 250 80, 320 70" />
            <path d="M 200 130 Q 270 140, 340 130" />
            <path d="M 170 190 Q 240 200, 310 190" />
            <path d="M 190 250 Q 260 260, 330 250" />
          </g>
          {/* Dust dots */}
          <g fill="#94A3B8" opacity="0.5">
            <circle cx="240" cy="90" r="3" />
            <circle cx="270" cy="120" r="4" />
            <circle cx="295" cy="160" r="3.5" />
            <circle cx="260" cy="210" r="3" />
            <circle cx="310" cy="230" r="4" />
          </g>
          <text x="255" y="180" fontSize="30" className="select-none">🌬️</text>

          {/* 3. MULTI-LAYER TREE SHELTERBELT BUFFER (360–410) */}
          <rect x="360" y="0" width="55" height="360" fill="#0E2E1D" opacity="0.9" />
          {/* Tree icons representing multi-layer barrier */}
          <text x="365" y="60" fontSize="24" className="select-none">🌲</text>
          <text x="385" y="110" fontSize="26" className="select-none">🌳</text>
          <text x="365" y="170" fontSize="24" className="select-none">🌲</text>
          <text x="385" y="230" fontSize="26" className="select-none">🌳</text>
          <text x="365" y="290" fontSize="24" className="select-none">🌲</text>
          <text x="385" y="340" fontSize="24" className="select-none">🌳</text>

          {/* 4. FARM & CROPLAND ZONE (415–620) */}
          <rect x="415" y="0" width="205" height="360" fill="#153621" opacity="0.8" />
          {/* Crop rows & canal drainage */}
          <g stroke="#10B981" strokeWidth="2" strokeDasharray="3 3" opacity="0.6">
            <line x1="430" y1="50" x2="600" y2="50" />
            <line x1="430" y1="90" x2="600" y2="90" />
            <line x1="430" y1="130" x2="600" y2="130" />
            <line x1="430" y1="230" x2="600" y2="230" />
            <line x1="430" y1="270" x2="600" y2="270" />
            <line x1="430" y1="310" x2="600" y2="310" />
          </g>
          {/* Canal Line (Water source) */}
          <path d="M 420 180 Q 520 160, 620 180" stroke="#0284C7" strokeWidth="8" fill="none" />
          <text x="460" y="80" fontSize="28" className="select-none">🌾</text>
          <text x="540" y="110" fontSize="28" className="select-none">🌱</text>
          <text x="490" y="175" fontSize="24" className="select-none">💧</text>
          <text x="480" y="270" fontSize="28" className="select-none">🌾</text>
          <text x="550" y="300" fontSize="28" className="select-none">👨‍🌾</text>

          {/* 5. VILLAGE & HABITATION ZONE (620–800) */}
          <rect x="620" y="0" width="180" height="360" fill="#1C2E24" opacity="0.9" />
          <text x="650" y="90" fontSize="30" className="select-none">🏠</text>
          <text x="730" y="110" fontSize="28" className="select-none">🏡</text>
          <text x="670" y="200" fontSize="32" className="select-none">🏫</text>
          <text x="740" y="250" fontSize="28" className="select-none">🏠</text>
          <text x="680" y="310" fontSize="24" className="select-none">🌳</text>

          {/* Interactive Clickable Hotspot Circles */}
          {/* Mine */}
          <circle
            cx="110" cy="180" r="28"
            className="cursor-pointer fill-emerald-500/20 stroke-emerald-400 stroke-2 hover:fill-emerald-500/40 transition-colors"
            onClick={() => setSelectedZone('mine')}
          />
          {/* Dust */}
          <circle
            cx="290" cy="180" r="28"
            className="cursor-pointer fill-sky-500/20 stroke-sky-400 stroke-2 hover:fill-sky-500/40 transition-colors"
            onClick={() => setSelectedZone('dust')}
          />
          {/* Farm */}
          <circle
            cx="520" cy="90" r="28"
            className="cursor-pointer fill-emerald-500/20 stroke-emerald-400 stroke-2 hover:fill-emerald-500/40 transition-colors"
            onClick={() => setSelectedZone('farm')}
          />
          {/* Water */}
          <circle
            cx="520" cy="180" r="28"
            className="cursor-pointer fill-sky-500/20 stroke-sky-400 stroke-2 hover:fill-sky-500/40 transition-colors"
            onClick={() => setSelectedZone('water')}
          />
          {/* Village */}
          <circle
            cx="710" cy="180" r="28"
            className="cursor-pointer fill-amber-500/20 stroke-amber-400 stroke-2 hover:fill-amber-500/40 transition-colors"
            onClick={() => setSelectedZone('village')}
          />
        </svg>

        {/* Distance Scales on bottom of map */}
        <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between text-[10px] font-mono text-white/80 bg-black/75 px-3 py-1 rounded-md backdrop-blur-xs border border-white/10">
          <span>0m (Mine Pit)</span>
          <span className="hidden sm:inline">200m (Dust Zone)</span>
          <span>400m (Tree Buffer)</span>
          <span>800m (Farmland)</span>
          <span>1.5km+ (Village)</span>
        </div>
      </div>

      {/* Zone Switcher Buttons */}
      <div className="flex flex-wrap items-center gap-2 mb-6">
        <button
          type="button"
          onClick={() => setSelectedZone('mine')}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer flex items-center gap-1.5 ${
            selectedZone === 'mine'
              ? 'bg-emerald-700 text-white shadow-xs'
              : isDarkMode ? 'bg-[#18261F] text-slate-300' : 'bg-slate-100 text-slate-700'
          }`}
        >
          <span>⛏️</span>
          <span>{fm.zones.mine.name.split(' (')[0]}</span>
        </button>

        <button
          type="button"
          onClick={() => setSelectedZone('dust')}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer flex items-center gap-1.5 ${
            selectedZone === 'dust'
              ? 'bg-emerald-700 text-white shadow-xs'
              : isDarkMode ? 'bg-[#18261F] text-slate-300' : 'bg-slate-100 text-slate-700'
          }`}
        >
          <span>🌬️</span>
          <span>{fm.zones.dust.name}</span>
        </button>

        <button
          type="button"
          onClick={() => setSelectedZone('farm')}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer flex items-center gap-1.5 ${
            selectedZone === 'farm'
              ? 'bg-emerald-700 text-white shadow-xs'
              : isDarkMode ? 'bg-[#18261F] text-slate-300' : 'bg-slate-100 text-slate-700'
          }`}
        >
          <span>🌾</span>
          <span>{fm.zones.farm.name.split(' (')[0]}</span>
        </button>

        <button
          type="button"
          onClick={() => setSelectedZone('water')}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer flex items-center gap-1.5 ${
            selectedZone === 'water'
              ? 'bg-emerald-700 text-white shadow-xs'
              : isDarkMode ? 'bg-[#18261F] text-slate-300' : 'bg-slate-100 text-slate-700'
          }`}
        >
          <span>💧</span>
          <span>{fm.zones.water.name}</span>
        </button>

        <button
          type="button"
          onClick={() => setSelectedZone('village')}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer flex items-center gap-1.5 ${
            selectedZone === 'village'
              ? 'bg-emerald-700 text-white shadow-xs'
              : isDarkMode ? 'bg-[#18261F] text-slate-300' : 'bg-slate-100 text-slate-700'
          }`}
        >
          <span>🏠</span>
          <span>{fm.zones.village.name.split(' (')[0]}</span>
        </button>
      </div>

      {/* Selected Zone Detail Card */}
      <div
        className={`p-4 rounded-xl border mb-4 text-xs sm:text-sm ${
          isDarkMode ? 'bg-[#1A2820] border-[#293E32] text-slate-200' : 'bg-emerald-50/70 border-emerald-200 text-slate-800'
        }`}
      >
        <h4 className="font-bold text-slate-900 dark:text-white mb-1 flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-500" />
          <span>{currentZoneData.name}</span>
        </h4>
        <p className="leading-relaxed text-slate-600 dark:text-slate-300">
          {currentZoneData.desc}
        </p>
      </div>

      {/* Disclaimer */}
      <div className="text-[11px] text-slate-500 dark:text-slate-400">
        {fm.disclaimer}
      </div>
    </div>
  );
};
