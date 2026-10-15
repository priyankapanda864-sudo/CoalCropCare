import React from 'react';
import { Language } from '../types';
import { translations } from '../data/translations';
import { Building2, TestTube } from 'lucide-react';

interface HelpContactSectionProps {
  currentLang: Language;
  isDarkMode: boolean;
}

export const HelpContactSection: React.FC<HelpContactSectionProps> = ({ currentLang, isDarkMode }) => {
  const t = translations[currentLang];
  const help = t.help;

  return (
    <section id="help" className="py-16 border-t border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 tracking-wider uppercase block mb-1">
            {help.sectionTag}
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            {help.title}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            {help.desc}
          </p>
        </div>

        {/* 4 Official Institutions Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {help.institutions.map((inst, idx) => (
            <div
              key={idx}
              className={`p-6 rounded-2xl border flex flex-col justify-between transition-colors ${
                isDarkMode ? 'bg-[#15211B] border-[#25392D]' : 'bg-white border-slate-200 shadow-xs'
              }`}
            >
              <div>
                <div className="flex items-center gap-2 mb-2 text-xs font-semibold text-emerald-700 dark:text-emerald-400">
                  <Building2 className="w-4 h-4" />
                  <span>{inst.role}</span>
                </div>
                
                <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mb-2">
                  {inst.name}
                </h3>
                
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                  {inst.description}
                </p>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700 text-xs">
                <strong className="text-slate-900 dark:text-white block mb-0.5">
                  {help.contactHeader}
                </strong>
                <span className="text-slate-600 dark:text-slate-300">
                  {inst.actionNote}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Practical Field Sampling Tips Guide */}
        <div className={`p-6 sm:p-8 rounded-2xl border transition-colors ${
          isDarkMode ? 'bg-[#18261E] border-slate-800' : 'bg-emerald-50/40 border-emerald-200'
        }`}>
          <div className="flex items-center gap-2 mb-4">
            <TestTube className="w-5 h-5 text-emerald-700 dark:text-emerald-400" />
            <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
              {help.tipsTitle}
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            {help.samplingTips.map((tip, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-white dark:bg-[#131F17] border border-slate-200 dark:border-slate-700/80">
                <strong className="text-slate-900 dark:text-white block mb-1 font-bold">
                  {tip.title}
                </strong>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  {tip.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
