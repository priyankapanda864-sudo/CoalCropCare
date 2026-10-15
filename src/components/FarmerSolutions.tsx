import React, { useState } from 'react';
import { Language } from '../types';
import { translations } from '../data/translations';
import { ShieldCheck, Trees, Sprout, Droplets, BookOpen, FlaskConical, Users, Check, Search, ClipboardPen, HeartHandshake, UserCheck } from 'lucide-react';

interface FarmerSolutionsProps {
  currentLang: Language;
  isDarkMode: boolean;
  onNavigate: (id: string) => void;
}

export const FarmerSolutions: React.FC<FarmerSolutionsProps> = ({ currentLang, isDarkMode, onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'practices' | 'shelterbelt'>('practices');
  const t = translations[currentLang];
  const sol = t.solutions;
  const fa7 = t.visuals.farmerActions7;

  const actionIconMap: Record<string, React.ElementType> = {
    Search: Search,
    ClipboardPen: ClipboardPen,
    HeartHandshake: HeartHandshake,
    Droplets: Droplets,
    FlaskConical: FlaskConical,
    UserCheck: UserCheck,
    Trees: Trees,
  };

  const practiceIcons = [Sprout, BookOpen, ShieldCheck, Droplets, Trees, FlaskConical, Users];

  return (
    <section id="solutions" className="py-16 border-t border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-10">
          <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 tracking-wider uppercase block mb-1">
            {sol.sectionTag}
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            {sol.title}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            {sol.desc}
          </p>
        </div>

        {/* 7 Core Action Cards (Req #10: Check, Record, Care, Check Water, Test Soil, Ask Experts, Protect Nature) */}
        <div className="mb-14">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
              7 Protective Pillars for Farmers
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {fa7.cards.map((card, idx) => {
              const Icon = actionIconMap[card.icon] || ShieldCheck;
              return (
                <div
                  key={card.key}
                  className={`p-5 rounded-2xl border flex flex-col justify-between transition-all duration-200 group hover:-translate-y-0.5 ${
                    isDarkMode
                      ? 'bg-[#18261F] border-slate-800 hover:border-emerald-600/50'
                      : 'bg-white border-slate-200 hover:border-emerald-300 shadow-2xs hover:shadow-xs'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-9 h-9 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 flex items-center justify-center">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-mono font-bold text-slate-400 dark:text-slate-500">
                        0{idx + 1}
                      </span>
                    </div>

                    <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider block mb-1">
                      {card.title}
                    </span>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1.5 leading-snug">
                      {card.action}
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                      {card.detail}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* View Switcher */}
        <div className="flex items-center gap-2 p-1 rounded-xl bg-slate-100 dark:bg-slate-800 max-w-md mb-8 text-xs font-semibold border border-slate-200 dark:border-slate-700">
          <button
            onClick={() => setActiveTab('practices')}
            className={`flex-1 py-2 px-3 rounded-lg transition-all cursor-pointer ${
              activeTab === 'practices'
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            {sol.tabPractices}
          </button>
          <button
            onClick={() => setActiveTab('shelterbelt')}
            className={`flex-1 py-2 px-3 rounded-lg transition-all cursor-pointer ${
              activeTab === 'shelterbelt'
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            {sol.tabShelterbelt}
          </button>
        </div>

        {activeTab === 'practices' ? (
          /* Practical Low-Cost Practices Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {sol.practices.map((practice, idx) => {
              const Icon = practiceIcons[idx % practiceIcons.length];
              return (
                <div
                  key={practice.id}
                  className={`p-6 rounded-2xl border flex flex-col justify-between transition-colors ${
                    isDarkMode ? 'bg-[#15211B] border-[#25392D]' : 'bg-white border-slate-200 shadow-xs'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <div className="w-9 h-9 rounded-lg bg-emerald-100 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 flex items-center justify-center">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-[11px] font-medium text-slate-500">
                        {practice.category}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                      {practice.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                      {practice.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 text-xs">
                    <strong className="text-emerald-800 dark:text-emerald-400 block mb-0.5">
                      {sol.benefitLabel}
                    </strong>
                    <span className="text-slate-500 dark:text-slate-400">
                      {practice.lowCostBenefit}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* Shelterbelt Technical Guide */
          <div className={`p-6 sm:p-8 rounded-2xl border transition-colors ${
            isDarkMode ? 'bg-[#15211B] border-[#25392D]' : 'bg-white border-slate-200 shadow-xs'
          }`}>
            <div className="max-w-2xl mb-8">
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-2">
                {sol.shelterbeltTitle}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {sol.shelterbeltDesc}
              </p>
            </div>

            {/* Tree Layers Grid */}
            <div className="mb-8">
              <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-4">
                {sol.treeLayersTitle}
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {sol.layers.map((layer, idx) => (
                  <div
                    key={idx}
                    className={`p-4 rounded-xl border ${
                      isDarkMode ? 'bg-[#1A2720] border-slate-800' : 'bg-slate-50 border-slate-200'
                    }`}
                  >
                    <span className="text-[11px] font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider block mb-1">
                      {layer.name}
                    </span>
                    <strong className="text-sm block text-slate-900 dark:text-white mb-2">
                      {layer.trees}
                    </strong>
                    <p className="text-xs text-slate-600 dark:text-slate-400">
                      {layer.role}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* 4 Golden Rules */}
            <div className="p-4 sm:p-5 rounded-xl bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 text-xs">
              <strong className="block text-emerald-900 dark:text-emerald-300 font-bold mb-3 text-sm">
                {sol.goldenRulesTitle}
              </strong>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {sol.goldenRules.map((rule, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span className="text-emerald-950 dark:text-emerald-200">{rule}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
