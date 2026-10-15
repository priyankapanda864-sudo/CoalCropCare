import React, { useState } from 'react';
import { Language } from '../types';
import { translations } from '../data/translations';
import { Layers, Droplets, FlaskConical, AlertCircle, CheckCircle2, ChevronRight, HelpCircle } from 'lucide-react';
import { SoilDiagram } from './visuals/SoilDiagram';
import { WaterFlowDiagram } from './visuals/WaterFlowDiagram';

interface SoilWaterSectionProps {
  currentLang: Language;
  isDarkMode: boolean;
  onNavigate: (id: string) => void;
}

export const SoilWaterSection: React.FC<SoilWaterSectionProps> = ({ currentLang, isDarkMode, onNavigate }) => {
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
  const t = translations[currentLang];
  const sw = t.soilWater;

  const toggleCheck = (id: string) => {
    setCheckedItems((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const checkedCount = Object.values(checkedItems).filter(Boolean).length;
  const cardIcons = [Layers, FlaskConical, Layers, Droplets, Droplets, AlertCircle];

  return (
    <section id="soil-water" className="py-16 border-t border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 tracking-wider uppercase block mb-1">
            {sw.sectionTag}
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            {sw.title}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            {sw.desc}
          </p>
        </div>

        {/* 6 Core Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {sw.cards.map((card, idx) => {
            const Icon = cardIcons[idx % cardIcons.length];
            return (
              <div
                key={idx}
                className={`p-6 rounded-2xl border transition-colors ${
                  isDarkMode ? 'bg-[#15211B] border-[#25392D]' : 'bg-white border-slate-200 shadow-xs'
                }`}
              >
                <div className="w-9 h-9 rounded-lg bg-emerald-100 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 flex items-center justify-center mb-3">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">{card.title}</h3>
                <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {card.desc}
                </p>
                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 text-xs">
                  <strong className="text-slate-800 dark:text-slate-200 block mb-1">{card.actionTitle}</strong>
                  <span className="text-slate-500 dark:text-slate-400">{card.actionDesc}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Illustrated Soil Cross-Section & Horizon Diagram (Req #5: Plant -> Roots -> Topsoil -> Subsoil; Healthy vs Disturbed Soil) */}
        <div className="mb-16">
          <SoilDiagram currentLang={currentLang} isDarkMode={isDarkMode} />
        </div>

        {/* Water Flow Pathway Diagram (Req #6: Rain -> Mining Area -> Water Flow -> Nearby Land -> Farm) */}
        <div className="mb-16">
          <WaterFlowDiagram currentLang={currentLang} isDarkMode={isDarkMode} />
        </div>

        {/* Interactive Observation Checklist */}
        <div className={`p-6 sm:p-8 rounded-2xl border transition-colors ${
          isDarkMode ? 'bg-[#15211B] border-[#25392D]' : 'bg-white border-slate-200 shadow-xs'
        }`}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                {sw.checklistTitle}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
                {sw.checklistDesc}
              </p>
            </div>
            <div className="px-3 py-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 text-xs font-semibold self-start sm:self-auto border border-emerald-200/60 dark:border-emerald-800">
              {checkedCount} / {sw.items.length} {sw.checkedStatus}
            </div>
          </div>

          <div className="space-y-4 my-6">
            {sw.items.map((item) => {
              const isChecked = !!checkedItems[item.id];
              return (
                <div
                  key={item.id}
                  onClick={() => toggleCheck(item.id)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer ${
                    isChecked
                      ? 'bg-emerald-50/50 dark:bg-emerald-950/30 border-emerald-500/50'
                      : isDarkMode
                      ? 'bg-[#17241D] border-slate-800 hover:border-slate-700'
                      : 'bg-slate-50/70 border-slate-200 hover:bg-slate-100/60'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => {}} // handled by parent div onClick
                      className="mt-1 w-4 h-4 text-emerald-700 rounded border-slate-300 focus:ring-emerald-500 cursor-pointer"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                          item.category === 'soil'
                            ? 'bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300'
                            : 'bg-sky-100 dark:bg-sky-950 text-sky-800 dark:text-sky-300'
                        }`}>
                          {item.category === 'soil' ? (currentLang === 'hi' ? 'मिट्टी' : currentLang === 'or' ? 'ମାଟି' : 'Soil') : (currentLang === 'hi' ? 'पानी' : currentLang === 'or' ? 'ପାଣି' : 'Water')}
                        </span>
                        <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                          {item.question}
                        </h4>
                      </div>

                      {isChecked && (
                        <div className="mt-3 pt-3 border-t border-slate-200 dark:border-slate-800 grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                          <div className="p-2.5 rounded-lg bg-white dark:bg-[#121E17] border border-slate-200 dark:border-slate-700">
                            <strong className="block text-slate-700 dark:text-slate-300 mb-0.5">{sw.whyHappensLabel}</strong>
                            <span className="text-slate-600 dark:text-slate-400">{item.explanation}</span>
                          </div>
                          <div className="p-2.5 rounded-lg bg-emerald-100/40 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800">
                            <strong className="block text-emerald-900 dark:text-emerald-300 mb-0.5">{sw.whatToDoLabel}</strong>
                            <span className="text-emerald-800 dark:text-emerald-400 font-medium">{item.whatToDo}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Acid Mine Drainage Callout */}
          <div className="p-4 rounded-xl bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/40 text-xs sm:text-sm">
            <div className="flex items-start gap-3">
              <FlaskConical className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
              <div>
                <strong className="font-bold text-amber-950 dark:text-amber-200 block mb-1">
                  {sw.acidBoxTitle}
                </strong>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-2">
                  {sw.acidBoxDesc}
                </p>
                <div className="flex items-center gap-1.5 text-xs text-amber-900 dark:text-amber-300 font-medium">
                  <strong>{sw.labAdviceLabel}</strong>
                  <span>{sw.labAdviceDesc}</span>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
