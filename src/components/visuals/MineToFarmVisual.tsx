import React from 'react';
import { Language } from '../../types';
import { translations } from '../../data/translations';
import { ArrowRight, ArrowDown, Wind, CloudRain, ShieldCheck, Sparkles } from 'lucide-react';

interface MineToFarmVisualProps {
  currentLang: Language;
  isDarkMode: boolean;
}

export const MineToFarmVisual: React.FC<MineToFarmVisualProps> = ({
  currentLang,
  isDarkMode,
}) => {
  const t = translations[currentLang];
  const m2f = t.visuals.mineToFarm;

  return (
    <div
      className={`p-6 sm:p-8 rounded-2xl border transition-all duration-200 ${
        isDarkMode
          ? 'bg-[#15211B] border-[#25392D]'
          : 'bg-white border-slate-200/90 shadow-sm'
      }`}
    >
      {/* Title */}
      <div className="max-w-3xl mb-8">
        <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 mb-1">
          <Wind className="w-3.5 h-3.5" />
          <span>Dual Transport Infographic</span>
        </div>
        <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
          {m2f.title}
        </h3>
        <p className="mt-1 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
          {m2f.subtitle}
        </p>
      </div>

      {/* Pathway 1: Airborne Dust Movement */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-3">
          <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse" />
          <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200">
            {m2f.airPathwayTitle}
          </h4>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 relative">
          {m2f.airSteps.map((step, idx) => (
            <div
              key={idx}
              className={`p-4 rounded-xl border flex flex-col justify-between transition-all duration-200 relative group hover:-translate-y-0.5 ${
                isDarkMode
                  ? 'bg-[#19271F] border-slate-800 hover:border-emerald-600/50'
                  : 'bg-slate-50/80 border-slate-200 hover:bg-emerald-50/30 hover:border-emerald-300'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-2xl sm:text-3xl select-none" role="img" aria-label={step.title}>
                    {step.icon}
                  </span>
                  <span className="text-[10px] font-mono font-bold text-slate-400 dark:text-slate-500">
                    Step {idx + 1}
                  </span>
                </div>
                <h5 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white mb-1">
                  {step.title}
                </h5>
                <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed">
                  {step.desc}
                </p>
              </div>

              {/* Desktop arrow connector */}
              {idx < m2f.airSteps.length - 1 && (
                <div className="hidden lg:flex absolute -right-3 top-1/2 -translate-y-1/2 z-10 text-emerald-600 dark:text-emerald-400 pointer-events-none">
                  <ArrowRight className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Pathway 2: Rain & Surface Runoff */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-3">
          <span className="w-2.5 h-2.5 rounded-full bg-sky-500 animate-pulse" />
          <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200">
            {m2f.waterPathwayTitle}
          </h4>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 relative">
          {m2f.waterSteps.map((step, idx) => (
            <div
              key={idx}
              className={`p-4 rounded-xl border flex flex-col justify-between transition-all duration-200 relative group hover:-translate-y-0.5 ${
                isDarkMode
                  ? 'bg-[#162723] border-slate-800 hover:border-sky-500/50'
                  : 'bg-sky-50/50 border-sky-100 hover:bg-sky-50 hover:border-sky-300'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-2xl sm:text-3xl select-none" role="img" aria-label={step.title}>
                    {step.icon}
                  </span>
                  <span className="text-[10px] font-mono font-bold text-sky-600 dark:text-sky-400">
                    Water Stage 0{idx + 1}
                  </span>
                </div>
                <h5 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white mb-1">
                  {step.title}
                </h5>
                <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed">
                  {step.desc}
                </p>
              </div>

              {/* Arrow connector */}
              {idx < m2f.waterSteps.length - 1 && (
                <div className="hidden sm:flex absolute -right-3 top-1/2 -translate-y-1/2 z-10 text-sky-500 pointer-events-none">
                  <ArrowRight className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Educational Callout Note */}
      <div
        className={`p-4 rounded-xl border flex items-start gap-2.5 text-xs ${
          isDarkMode
            ? 'bg-[#18261F] border-[#293E32] text-slate-300'
            : 'bg-emerald-50/70 border-emerald-200 text-emerald-950'
        }`}
      >
        <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          {m2f.studentNote}
        </p>
      </div>
    </div>
  );
};
