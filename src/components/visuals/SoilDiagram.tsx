import React, { useState } from 'react';
import { Language } from '../../types';
import { translations } from '../../data/translations';
import { Layers, Sprout, Droplets, Wind, CheckCircle2, AlertCircle, Info } from 'lucide-react';

interface SoilDiagramProps {
  currentLang: Language;
  isDarkMode: boolean;
}

export const SoilDiagram: React.FC<SoilDiagramProps> = ({ currentLang, isDarkMode }) => {
  const [selectedZone, setSelectedZone] = useState<'all' | 'topsoil' | 'roots' | 'subsoil'>('all');
  const t = translations[currentLang];
  const sd = t.visuals.soilDiagram;

  return (
    <div
      className={`p-6 sm:p-8 rounded-2xl border transition-all duration-200 ${
        isDarkMode ? 'bg-[#15211B] border-[#25392D]' : 'bg-white border-slate-200/90 shadow-sm'
      }`}
    >
      {/* Title */}
      <div className="max-w-3xl mb-8">
        <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 mb-1">
          <Layers className="w-3.5 h-3.5" />
          <span>Soil Architecture & Horizon Model</span>
        </div>
        <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
          {sd.title}
        </h3>
        <p className="mt-1 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
          {sd.subtitle}
        </p>
      </div>

      {/* Main Grid: Illustrated Cross-Section + Scientific Comparison */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-8">
        
        {/* Left (7 Cols): Custom Illustrated Soil Cross-Section Diagram */}
        <div className="lg:col-span-7 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-[#0E1712] p-5 text-white">
          <div className="flex items-center justify-between mb-3 text-xs">
            <span className="font-bold text-emerald-400 uppercase tracking-wider text-[11px]">
              {sd.crossSectionTitle}
            </span>
            <div className="flex items-center gap-1.5 text-[10px] text-slate-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>Depth: 0–60 cm</span>
            </div>
          </div>

          {/* Cross-Section SVG Canvas */}
          <div className="relative w-full aspect-4/3 rounded-xl overflow-hidden bg-gradient-to-b from-[#1E3A2B] via-[#2E2015] to-[#1A120B] p-2 border border-white/10">
            <svg viewBox="0 0 360 260" className="w-full h-full">
              {/* Atmospheric Sky Zone (Top 40px) */}
              <rect x="0" y="0" width="360" height="45" fill="#14261C" opacity="0.6" />
              
              {/* Green Crop Plants Above Ground */}
              <g stroke="#10B981" strokeWidth="2.5" fill="none" strokeLinecap="round">
                {/* Central Crop Plant */}
                <path d="M 180 45 L 180 15" strokeWidth="3.5" stroke="#059669" />
                <path d="M 180 30 Q 155 20, 145 10" />
                <path d="M 180 25 Q 205 15, 215 5" />
                <path d="M 180 35 Q 160 30, 150 25" />
                <path d="M 180 32 Q 200 25, 210 20" />
                
                {/* Neighboring Crop Shoots */}
                <path d="M 90 45 L 90 20" strokeWidth="2.5" stroke="#059669" />
                <path d="M 90 30 Q 75 22, 65 18" />
                <path d="M 90 25 Q 105 18, 115 12" />

                <path d="M 270 45 L 270 20" strokeWidth="2.5" stroke="#059669" />
                <path d="M 270 30 Q 255 22, 245 18" />
                <path d="M 270 25 Q 285 18, 295 12" />
              </g>

              {/* Surface Line (y = 45) */}
              <line x1="0" y1="45" x2="360" y2="45" stroke="#059669" strokeWidth="3" />

              {/* Topsoil Horizon (y = 45 to y = 140) 0–20 cm */}
              <rect x="0" y="45" width="360" height="95" fill="#3D2B1F" opacity="0.8" />
              
              {/* Subsoil Horizon (y = 140 to y = 260) 20–60 cm */}
              <rect x="0" y="140" width="360" height="120" fill="#241911" opacity="0.9" />

              {/* Intricate Plant Root System */}
              <g stroke="#FDE68A" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.95">
                {/* Main Taproot & Deep Feeders */}
                <path d="M 180 45 Q 182 90, 180 150 Q 178 190, 175 230" strokeWidth="2.8" />
                {/* Lateral Root Branches */}
                <path d="M 180 65 Q 140 85, 110 110" />
                <path d="M 180 75 Q 220 90, 250 115" />
                <path d="M 180 95 Q 150 120, 130 145" />
                <path d="M 180 110 Q 210 135, 235 160" />
                <path d="M 180 135 Q 160 170, 145 200" />
                <path d="M 180 155 Q 200 185, 215 210" />
                {/* Fine Root Hairs */}
                <path d="M 140 85 Q 130 95, 120 100" strokeWidth="1.2" />
                <path d="M 220 90 Q 230 100, 240 105" strokeWidth="1.2" />
                <path d="M 150 120 Q 140 130, 135 140" strokeWidth="1.2" />
                <path d="M 210 135 Q 220 145, 225 155" strokeWidth="1.2" />
              </g>

              {/* Moisture Droplets in Soil */}
              <g fill="#38BDF8" opacity="0.85">
                <circle cx="120" cy="75" r="3.5" />
                <circle cx="240" cy="85" r="3.5" />
                <circle cx="160" cy="115" r="4" />
                <circle cx="210" cy="150" r="3.5" />
                <circle cx="140" cy="175" r="4" />
              </g>

              {/* Air Pore Spaces */}
              <g fill="#94A3B8" opacity="0.6">
                <ellipse cx="145" cy="65" rx="5" ry="3" />
                <ellipse cx="215" cy="70" rx="6" ry="3" />
                <ellipse cx="110" cy="130" rx="5" ry="3" />
                <ellipse cx="255" cy="140" rx="6" ry="3.5" />
              </g>

              {/* Essential Nutrients (NPK) Particles */}
              <g fill="#F59E0B" opacity="0.9">
                <circle cx="170" cy="80" r="2.5" />
                <circle cx="195" cy="95" r="2.5" />
                <circle cx="130" cy="100" r="2.5" />
                <circle cx="225" cy="110" r="2.5" />
                <circle cx="165" cy="140" r="2.5" />
              </g>

              {/* Horizontal Boundary Lines */}
              <line x1="0" y1="140" x2="360" y2="140" stroke="#78350F" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.5" />
            </svg>

            {/* Micro Callout Labels */}
            <div className="absolute top-2 left-2 bg-black/75 px-2 py-0.5 rounded text-[10px] text-emerald-300 font-bold border border-white/10">
              🌱 {sd.labels.plant}
            </div>
            <div className="absolute top-14 right-2 bg-black/75 px-2 py-0.5 rounded text-[10px] text-amber-200 font-bold border border-white/10">
              🌿 {sd.labels.roots}
            </div>
            <div className="absolute top-24 left-2 bg-black/75 px-2 py-0.5 rounded text-[10px] text-orange-200 font-bold border border-white/10">
              🟫 {sd.labels.topsoil}
            </div>
            <div className="absolute bottom-3 right-2 bg-black/75 px-2 py-0.5 rounded text-[10px] text-slate-300 font-bold border border-white/10">
              ⛰️ {sd.labels.subsoil}
            </div>
          </div>

          {/* Component Key Badges (Roots, Soil, Water, Air, Nutrients) */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 mt-4 text-[11px] text-center">
            <div className="p-1.5 rounded-lg bg-emerald-950/80 border border-emerald-800 text-emerald-300 font-semibold">
              🌱 {sd.labels.roots}
            </div>
            <div className="p-1.5 rounded-lg bg-amber-950/80 border border-amber-800 text-amber-300 font-semibold">
              🟫 {sd.labels.soil}
            </div>
            <div className="p-1.5 rounded-lg bg-sky-950/80 border border-sky-800 text-sky-300 font-semibold">
              💧 {sd.labels.water}
            </div>
            <div className="p-1.5 rounded-lg bg-slate-800/80 border border-slate-700 text-slate-300 font-semibold">
              🌬️ {sd.labels.air}
            </div>
            <div className="p-1.5 rounded-lg bg-yellow-950/80 border border-yellow-800 text-yellow-300 font-semibold">
              🧪 {sd.labels.nutrients}
            </div>
          </div>
        </div>

        {/* Right (5 Cols): Healthy Soil vs Disturbed Soil Scientific Comparison */}
        <div className="lg:col-span-5 space-y-4">
          
          {/* Healthy Soil Box */}
          <div
            className={`p-5 rounded-2xl border transition-colors ${
              isDarkMode
                ? 'bg-[#182820] border-emerald-800/50'
                : 'bg-emerald-50/60 border-emerald-200'
            }`}
          >
            <div className="flex items-center gap-2 mb-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <h4 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                {sd.healthyTitle}
              </h4>
            </div>
            <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
              {sd.healthyPoints.map((pt, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 dark:text-emerald-400 shrink-0 mt-1.5" />
                  <span>{pt}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Disturbed Soil Box */}
          <div
            className={`p-5 rounded-2xl border transition-colors ${
              isDarkMode
                ? 'bg-[#201D1A] border-amber-900/40'
                : 'bg-amber-50/50 border-amber-200'
            }`}
          >
            <div className="flex items-center gap-2 mb-3">
              <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0" />
              <h4 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                {sd.disturbedTitle}
              </h4>
            </div>
            <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
              {sd.disturbedPoints.map((pt, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-600 dark:text-amber-400 shrink-0 mt-1.5" />
                  <span>{pt}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>

      </div>

      {/* Scientific Care Note Required by Prompt */}
      <div
        className={`p-4 rounded-xl border flex items-start gap-2.5 text-xs ${
          isDarkMode
            ? 'bg-[#18231C] border-[#25392D] text-slate-300'
            : 'bg-slate-50 border-slate-200 text-slate-700'
        }`}
      >
        <Info className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          {sd.scientificCareNote}
        </p>
      </div>
    </div>
  );
};
