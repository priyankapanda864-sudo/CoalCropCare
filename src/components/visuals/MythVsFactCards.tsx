import React from 'react';
import { Language } from '../../types';
import { translations } from '../../data/translations';
import { XCircle, CheckCircle2, Lightbulb, Scale } from 'lucide-react';

interface MythVsFactCardsProps {
  currentLang: Language;
  isDarkMode: boolean;
}

export const MythVsFactCards: React.FC<MythVsFactCardsProps> = ({ currentLang, isDarkMode }) => {
  const t = translations[currentLang];
  const mvf = t.visuals.mythsVsFacts;

  return (
    <div
      className={`p-6 sm:p-8 rounded-2xl border transition-all duration-200 ${
        isDarkMode ? 'bg-[#15211B] border-[#25392D]' : 'bg-white border-slate-200/90 shadow-sm'
      }`}
    >
      {/* Title */}
      <div className="max-w-3xl mb-8">
        <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 mb-1">
          <Scale className="w-3.5 h-3.5" />
          <span>Scientific Accuracy Check</span>
        </div>
        <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
          {mvf.title}
        </h3>
        <p className="mt-1 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
          {mvf.subtitle}
        </p>
      </div>

      {/* Large Visual Cards: ❌ MYTH vs ✅ FACT */}
      <div className="space-y-6">
        {mvf.cards.map((item, idx) => (
          <div
            key={idx}
            className={`rounded-2xl border overflow-hidden transition-all duration-200 ${
              isDarkMode ? 'border-slate-800' : 'border-slate-200 shadow-2xs'
            }`}
          >
            <div className="grid grid-cols-1 md:grid-cols-2">
              
              {/* Myth Column (Red / Rose Accent) */}
              <div
                className={`p-6 border-b md:border-b-0 md:border-r ${
                  isDarkMode
                    ? 'bg-[#221719] border-rose-950/60 text-slate-200'
                    : 'bg-rose-50/50 border-rose-100 text-slate-900'
                }`}
              >
                <div className="flex items-center gap-2 text-rose-700 dark:text-rose-400 font-extrabold text-xs tracking-wider uppercase mb-3">
                  <XCircle className="w-5 h-5 text-rose-600" />
                  <span>{mvf.mythLabel}</span>
                </div>
                <p className="text-sm sm:text-base font-semibold italic text-slate-800 dark:text-slate-100 leading-relaxed">
                  {item.myth}
                </p>
              </div>

              {/* Fact Column (Green / Emerald Accent) */}
              <div
                className={`p-6 ${
                  isDarkMode
                    ? 'bg-[#15271E] text-slate-200'
                    : 'bg-emerald-50/50 text-slate-900'
                }`}
              >
                <div className="flex items-center gap-2 text-emerald-800 dark:text-emerald-400 font-extrabold text-xs tracking-wider uppercase mb-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  <span>{mvf.factLabel}</span>
                </div>
                <p className="text-sm sm:text-base font-bold text-slate-900 dark:text-white leading-relaxed mb-3">
                  {item.fact}
                </p>

                {/* Science Explanation Box */}
                <div
                  className={`p-3.5 rounded-xl border text-xs ${
                    isDarkMode
                      ? 'bg-[#101F18] border-emerald-900/60 text-slate-300'
                      : 'bg-white border-emerald-200 text-slate-700 shadow-2xs'
                  }`}
                >
                  <div className="flex items-center gap-1.5 font-bold text-emerald-700 dark:text-emerald-400 mb-1 text-[11px]">
                    <Lightbulb className="w-3.5 h-3.5" />
                    <span>Scientific Context:</span>
                  </div>
                  <p className="leading-relaxed">
                    {item.scienceExplanation}
                  </p>
                </div>
              </div>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
