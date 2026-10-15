import React, { useState } from 'react';
import { Language } from '../../types';
import { translations } from '../../data/translations';
import { Eye, Info, Sparkles, CheckCircle2, ChevronRight, X } from 'lucide-react';

interface FarmerObservationInfographicProps {
  currentLang: Language;
  isDarkMode: boolean;
}

export const FarmerObservationInfographic: React.FC<FarmerObservationInfographicProps> = ({
  currentLang,
  isDarkMode,
}) => {
  const [selectedId, setSelectedId] = useState<string>('leaves');
  const t = translations[currentLang];
  const oi = t.visuals.observationInfographic;

  const activeItem = oi.items.find((item) => item.id === selectedId) || oi.items[0];

  return (
    <div
      className={`p-6 sm:p-8 rounded-2xl border transition-all duration-200 ${
        isDarkMode ? 'bg-[#15211B] border-[#25392D]' : 'bg-white border-slate-200/90 shadow-sm'
      }`}
    >
      {/* Title */}
      <div className="max-w-3xl mb-6">
        <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 mb-1">
          <Eye className="w-3.5 h-3.5" />
          <span>Field Observation Infographic</span>
        </div>
        <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
          {oi.title}
        </h3>
        <p className="mt-1 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
          {oi.subtitle}
        </p>
      </div>

      <div className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-4 flex items-center gap-1.5">
        <Info className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
        <span>{oi.clickPrompt}</span>
      </div>

      {/* 6 Attractive Interactive Icons Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
        {oi.items.map((item) => {
          const isSelected = selectedId === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setSelectedId(item.id)}
              className={`p-4 rounded-xl border flex flex-col items-center text-center transition-all duration-200 cursor-pointer group ${
                isSelected
                  ? 'bg-emerald-700 text-white border-emerald-700 shadow-md scale-105 z-10'
                  : isDarkMode
                  ? 'bg-[#1A2820] text-slate-200 border-slate-800 hover:border-slate-700 hover:bg-[#203228]'
                  : 'bg-slate-50/80 text-slate-800 border-slate-200 hover:border-emerald-300 hover:bg-emerald-50/40 shadow-2xs'
              }`}
            >
              <span className="text-3xl mb-2 select-none group-hover:scale-110 transition-transform">
                {item.icon}
              </span>
              <span className="text-xs font-bold block mb-1">
                {item.title}
              </span>
              <span
                className={`text-[10px] px-1.5 py-0.5 rounded ${
                  isSelected ? 'bg-white/20 text-white' : 'text-slate-400 dark:text-slate-500'
                }`}
              >
                Inspect
              </span>
            </button>
          );
        })}
      </div>

      {/* Dynamic Popover / Explanation Card for Selected Icon */}
      <div
        className={`p-6 rounded-2xl border transition-all duration-200 ${
          isDarkMode
            ? 'bg-[#1A2A21] border-[#2C4435]'
            : 'bg-emerald-50/60 border-emerald-200 shadow-2xs'
        }`}
      >
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div className="flex items-start gap-3">
            <span className="text-4xl select-none" role="img" aria-label={activeItem.title}>
              {activeItem.icon}
            </span>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-400">
                  Target Indicator
                </span>
                <span aria-hidden="true" className="text-slate-400">·</span>
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  Practical Guidance
                </span>
              </div>
              <h4 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                {activeItem.title}
              </h4>
              <p className="mt-1.5 text-xs sm:text-sm text-slate-700 dark:text-slate-200 leading-relaxed font-medium">
                <strong>What to Observe: </strong>
                {activeItem.whatToObserve}
              </p>
            </div>
          </div>

          <div
            className={`p-4 rounded-xl border text-xs sm:max-w-xs shrink-0 ${
              isDarkMode
                ? 'bg-[#142019] border-slate-800 text-slate-300'
                : 'bg-white border-emerald-200 text-slate-800 shadow-2xs'
            }`}
          >
            <div className="space-y-2">
              <div>
                <strong className="block text-[11px] uppercase tracking-wider text-emerald-800 dark:text-emerald-400 mb-0.5">
                  Why It Matters:
                </strong>
                <span className="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed">
                  {activeItem.whyImportant}
                </span>
              </div>
              <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
                <strong className="block text-[11px] uppercase tracking-wider text-emerald-800 dark:text-emerald-400 mb-0.5">
                  Farmer Action Tip:
                </strong>
                <span className="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed">
                  {activeItem.actionTip}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
