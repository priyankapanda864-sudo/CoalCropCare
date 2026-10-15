import React, { useState } from 'react';
import { Language } from '../types';
import { translations } from '../data/translations';
import { ChevronDown, ChevronUp, HelpCircle, Search } from 'lucide-react';
import { MythVsFactCards } from './visuals/MythVsFactCards';
import { PhotoAttributionGallery } from './visuals/PhotoAttributionGallery';

interface FaqSectionProps {
  currentLang: Language;
  isDarkMode: boolean;
}

export const FaqSection: React.FC<FaqSectionProps> = ({ currentLang, isDarkMode }) => {
  // Preserve open indices by numeric index across language changes
  const [openIndices, setOpenIndices] = useState<Record<number, boolean>>({ 0: true });
  const [searchQuery, setSearchQuery] = useState('');

  const t = translations[currentLang];
  const faq = t.faq;

  const toggleAccordion = (idx: number) => {
    setOpenIndices((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  const filteredFaqs = faq.items
    .map((item, originalIndex) => ({ ...item, originalIndex }))
    .filter((item) => {
      const q = searchQuery.toLowerCase().trim();
      if (!q) return true;
      return (
        item.question.toLowerCase().includes(q) ||
        item.answer.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q)
      );
    });

  return (
    <section id="faq" className="py-16 border-t border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 tracking-wider uppercase block mb-1">
            {faq.sectionTag}
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            {faq.title}
          </h2>
          <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">
            {faq.desc}
          </p>

          {/* Quick Search */}
          <div className="mt-5 relative max-w-md mx-auto">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder={faq.searchPlaceholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-900 dark:text-white focus:outline-emerald-600 shadow-xs"
            />
          </div>
        </div>

        {/* FAQ Accordion List */}
        {filteredFaqs.length === 0 ? (
          <div className="py-8 text-center text-xs text-slate-500">
            {faq.noResults}
          </div>
        ) : (
          <div className="space-y-3">
            {filteredFaqs.map((item) => {
              const isOpen = !!openIndices[item.originalIndex];
              return (
                <div
                  key={item.originalIndex}
                  className={`rounded-2xl border transition-all ${
                    isOpen
                      ? 'border-emerald-600/60 dark:border-emerald-700/60 shadow-xs'
                      : isDarkMode
                      ? 'border-slate-800 bg-[#15211B]'
                      : 'border-slate-200 bg-white'
                  } ${isDarkMode ? 'bg-[#15211B]' : 'bg-white'}`}
                >
                  <button
                    onClick={() => toggleAccordion(item.originalIndex)}
                    className="w-full p-5 text-left flex items-start justify-between gap-4 focus:outline-none cursor-pointer"
                  >
                    <div className="flex items-start gap-3">
                      <HelpCircle className="w-5 h-5 text-emerald-700 dark:text-emerald-400 shrink-0 mt-0.5" />
                      <div>
                        <span className="text-[11px] font-semibold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider block mb-1">
                          {item.category}
                        </span>
                        <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                          {item.question}
                        </h3>
                      </div>
                    </div>
                    <div className="p-1 rounded-md text-slate-400 hover:text-slate-600">
                      {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 pt-0 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-800 mt-2 pt-3 pl-12">
                      {item.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Myth vs Fact Section (Req #14: Large Visual Cards: ❌ MYTH vs ✅ FACT) */}
        <div className="mt-16">
          <MythVsFactCards currentLang={currentLang} isDarkMode={isDarkMode} />
        </div>

        {/* Field & Environmental Photo Reference Gallery (Req #16: Photos & Attributions) */}
        <div className="mt-16">
          <PhotoAttributionGallery currentLang={currentLang} isDarkMode={isDarkMode} />
        </div>

      </div>
    </section>
  );
};
