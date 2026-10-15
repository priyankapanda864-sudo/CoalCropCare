import React from 'react';
import { Language } from '../../types';
import { translations } from '../../data/translations';
import { HeartPulse, AlertCircle, CheckCircle2, Search } from 'lucide-react';

interface CropHealthCardsProps {
  currentLang: Language;
  isDarkMode: boolean;
}

export const CropHealthCards: React.FC<CropHealthCardsProps> = ({ currentLang, isDarkMode }) => {
  const t = translations[currentLang];
  const chc = t.visuals.cropHealthCards;

  return (
    <div
      className={`p-6 sm:p-8 rounded-2xl border transition-all duration-200 ${
        isDarkMode ? 'bg-[#15211B] border-[#25392D]' : 'bg-white border-slate-200/90 shadow-sm'
      }`}
    >
      {/* Title */}
      <div className="max-w-3xl mb-8">
        <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 mb-1">
          <HeartPulse className="w-3.5 h-3.5" />
          <span>Symptom Evaluation Matrix</span>
        </div>
        <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
          {chc.title}
        </h3>
        <p className="mt-1 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
          {chc.subtitle}
        </p>
      </div>

      {/* 6 Visual Crop Health Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {chc.cards.map((card) => (
          <div
            key={card.id}
            className={`p-5 rounded-2xl border flex flex-col justify-between transition-all duration-200 hover:-translate-y-0.5 ${
              isDarkMode
                ? 'bg-[#19271F] border-slate-800 hover:border-emerald-600/50'
                : 'bg-gradient-to-b from-slate-50/50 to-white border-slate-200/90 hover:border-emerald-300 hover:shadow-xs'
            }`}
          >
            <div>
              {/* Header */}
              <div className="flex items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-2xl select-none" role="img" aria-label={card.title}>
                    {card.icon}
                  </span>
                  <h4 className="text-base font-bold text-slate-900 dark:text-white">
                    {card.title}
                  </h4>
                </div>
                <span
                  className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${
                    card.urgency === 'High' || card.urgency === 'उच्च' || card.urgency === 'ଉଚ୍ଚ'
                      ? 'bg-rose-100 dark:bg-rose-950/60 text-rose-800 dark:text-rose-300 border border-rose-200 dark:border-rose-900'
                      : 'bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-900'
                  }`}
                >
                  {card.urgency}
                </span>
              </div>

              {/* Short Explanation */}
              <p className="text-xs text-slate-600 dark:text-slate-300 mb-4 leading-relaxed">
                {card.explanation}
              </p>

              {/* Possible Causes Box */}
              <div
                className={`p-3 rounded-xl border text-xs mb-3 ${
                  isDarkMode
                    ? 'bg-[#142019] border-slate-800/80 text-slate-300'
                    : 'bg-amber-50/40 border-amber-100 text-slate-800'
                }`}
              >
                <div className="flex items-center gap-1 font-bold text-amber-800 dark:text-amber-400 mb-1 text-[11px]">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>{chc.possibleCausesLabel}</span>
                </div>
                <p className="text-[11px] leading-relaxed text-slate-600 dark:text-slate-300">
                  {card.possibleCauses}
                </p>
              </div>
            </div>

            {/* What to check */}
            <div
              className={`p-3 rounded-xl border text-xs mt-2 ${
                isDarkMode
                  ? 'bg-[#18261F] border-[#293E32] text-slate-200'
                  : 'bg-emerald-50/60 border-emerald-200 text-emerald-950'
              }`}
            >
              <div className="flex items-center gap-1 font-bold text-emerald-800 dark:text-emerald-400 mb-1 text-[11px]">
                <Search className="w-3.5 h-3.5" />
                <span>{chc.whatToCheckLabel}</span>
              </div>
              <p className="text-[11px] leading-relaxed text-slate-700 dark:text-slate-300">
                {card.whatToCheck}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
