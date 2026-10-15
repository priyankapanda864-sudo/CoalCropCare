import React, { useState } from 'react';
import { Language } from '../types';
import { translations } from '../data/translations';
import { COAL_MINING_DIAGRAM_PATH } from '../data/knowledgeData';
import { Mountain, Truck, Wind, Layers, ArrowRight, ShieldAlert, CheckCircle2 } from 'lucide-react';
import { CoalMiningProcessDiagram } from './visuals/CoalMiningProcessDiagram';
import { MineToFarmVisual } from './visuals/MineToFarmVisual';
import { InteractiveFieldMap } from './visuals/InteractiveFieldMap';

interface AboutCoalProps {
  currentLang: Language;
  isDarkMode: boolean;
  onNavigate: (id: string) => void;
}

export const AboutCoal: React.FC<AboutCoalProps> = ({ currentLang, isDarkMode, onNavigate }) => {
  const [selectedFlowIndex, setSelectedFlowIndex] = useState(0);
  const [activeMiningTab, setActiveMiningTab] = useState<'opencast' | 'underground' | 'transport'>('opencast');
  const t = translations[currentLang];
  const ac = t.aboutCoal;

  const currentFlow = ac.flowSteps[selectedFlowIndex] || ac.flowSteps[0];
  const activeTabContent = ac.tabs[activeMiningTab];

  return (
    <section id="about-coal" className="py-16 border-t border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 tracking-wider uppercase block mb-1">
            {ac.sectionTag}
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            {ac.title}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            {ac.desc}
          </p>
        </div>

        {/* 2-Column: Mining Concept Illustration & Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
          
          {/* Left: Educational Diagram */}
          <div className="lg:col-span-6 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm bg-slate-900">
            <div className="relative aspect-4/3 w-full overflow-hidden">
              <img
                src={COAL_MINING_DIAGRAM_PATH}
                alt="Educational diagram of coal strata, terraces, and mining shafts"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-4 right-4 text-white text-xs">
                <span className="font-semibold block text-emerald-300 text-sm">
                  {ac.diagramTitle}
                </span>
                <span className="text-slate-200">
                  {ac.diagramSubtitle}
                </span>
              </div>
            </div>
            
            {/* Quick Facts Below Image */}
            <div className={`p-4 border-t text-xs ${
              isDarkMode ? 'bg-[#14211A] border-slate-800 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-700'
            }`}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <span className="font-bold block text-slate-900 dark:text-white">{ac.whatIsCoalTitle}</span>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400">{ac.whatIsCoalDesc}</span>
                </div>
                <div>
                  <span className="font-bold block text-slate-900 dark:text-white">{ac.whatIsDustTitle}</span>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400">{ac.whatIsDustDesc}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Interactive Tabs for Mining Methods */}
          <div className="lg:col-span-6 space-y-4">
            {/* Interactive Tab Switcher */}
            <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold">
              <button
                onClick={() => setActiveMiningTab('opencast')}
                className={`flex-1 py-2 px-3 rounded-lg transition-all cursor-pointer ${
                  activeMiningTab === 'opencast'
                    ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {ac.tabs.opencastBtn}
              </button>
              <button
                onClick={() => setActiveMiningTab('underground')}
                className={`flex-1 py-2 px-3 rounded-lg transition-all cursor-pointer ${
                  activeMiningTab === 'underground'
                    ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {ac.tabs.undergroundBtn}
              </button>
              <button
                onClick={() => setActiveMiningTab('transport')}
                className={`flex-1 py-2 px-3 rounded-lg transition-all cursor-pointer ${
                  activeMiningTab === 'transport'
                    ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {ac.tabs.transportBtn}
              </button>
            </div>

            {/* Dynamic Tab Content */}
            <div className={`p-6 rounded-2xl border transition-colors ${
              isDarkMode ? 'bg-[#15211B] border-[#25392D]' : 'bg-white border-slate-200 shadow-xs'
            }`}>
              <div className="flex items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-2">
                  <Mountain className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    {activeTabContent.title}
                  </h3>
                </div>
                <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300">
                  {activeTabContent.badge}
                </span>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                {activeTabContent.desc}
              </p>

              <div className="space-y-3 pt-3 border-t border-slate-100 dark:border-slate-800 text-xs">
                {activeTabContent.points.map((pt, idx) => (
                  <div key={idx} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-slate-900 dark:text-white font-semibold">{pt.title}: </strong>
                      <span className="text-slate-600 dark:text-slate-300">{pt.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 2. Interactive Coal Mining Process Diagram (Req #2: COAL IN GROUND -> MINING -> DUST/WATER -> SOIL/WATER -> CROPS -> FARMERS) */}
        <div className="mb-16">
          <CoalMiningProcessDiagram currentLang={currentLang} isDarkMode={isDarkMode} />
        </div>

        {/* 3. Large Infographic: From Mine to Farm (Req #3: Dual Pathway Infographic) */}
        <div className="mb-16">
          <MineToFarmVisual currentLang={currentLang} isDarkMode={isDarkMode} />
        </div>

        {/* 5-Step Visual Flow: From Mine to Farm */}
        <div className={`p-6 sm:p-8 rounded-2xl border transition-colors ${
          isDarkMode ? 'bg-[#15211B] border-[#25392D]' : 'bg-white border-slate-200 shadow-xs'
        }`}>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
            <div>
              <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider block mb-1">
                {ac.flowSectionTitle}
              </span>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                {ac.flowSectionDesc}
              </p>
            </div>

            {/* Stepper Progress Badges */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
              {ac.flowSteps.map((step, idx) => (
                <button
                  key={step.stepNumber}
                  onClick={() => setSelectedFlowIndex(idx)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                    selectedFlowIndex === idx
                      ? 'bg-emerald-700 text-white shadow-xs'
                      : isDarkMode
                      ? 'bg-[#1D2B22] text-slate-400 hover:text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {step.stepNumber} · {step.stageName}
                </button>
              ))}
            </div>
          </div>

          {/* Active Flow Step Card */}
          <div className="py-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center gap-2">
                <span className="text-2xl font-black text-emerald-600 dark:text-emerald-400">
                  {currentFlow.stepNumber}
                </span>
                <div>
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                    {currentFlow.stageName}
                  </span>
                  <h4 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                    {currentFlow.title}
                  </h4>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-200 leading-relaxed font-medium">
                {currentFlow.simpleDescription}
              </p>

              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 text-xs">
                <strong className="block text-slate-900 dark:text-white font-bold mb-1">
                  {ac.mechanismLabel}
                </strong>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  {currentFlow.mechanism}
                </p>
              </div>
            </div>

            <div className="lg:col-span-5 space-y-4">
              <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-700 text-xs">
                <strong className="block font-bold text-slate-900 dark:text-white mb-2">
                  {ac.keyFactorsLabel}
                </strong>
                <ul className="space-y-2 text-slate-600 dark:text-slate-300">
                  {currentFlow.keyFactors.map((fac, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 shrink-0 mt-1.5" />
                      <span>{fac}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-3 rounded-xl bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-200/60 dark:border-emerald-800 text-xs">
                <strong className="text-emerald-900 dark:text-emerald-300 block mb-0.5">
                  {ac.whyCareLabel}
                </strong>
                <span className="text-emerald-800 dark:text-emerald-400">
                  {ac.whyCareDesc}
                </span>
              </div>
            </div>
          </div>

          {/* Stepper Navigation Buttons */}
          <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <button
              onClick={() => setSelectedFlowIndex((prev) => Math.max(0, prev - 1))}
              disabled={selectedFlowIndex === 0}
              className="px-3.5 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 text-xs font-semibold disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 cursor-pointer"
            >
              {ac.prevBtn}
            </button>

            <span className="text-xs text-slate-500 font-medium">
              {ac.stepOf} {selectedFlowIndex + 1} / {ac.flowSteps.length}
            </span>

            {selectedFlowIndex < ac.flowSteps.length - 1 ? (
              <button
                onClick={() => setSelectedFlowIndex((prev) => Math.min(ac.flowSteps.length - 1, prev + 1))}
                className="px-3.5 py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold shadow-xs cursor-pointer"
              >
                {ac.nextBtn}
              </button>
            ) : (
              <button
                onClick={() => onNavigate('crop-effects')}
                className="px-3.5 py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold shadow-xs flex items-center gap-1.5 cursor-pointer"
              >
                <span>{ac.exploreEffectsBtn}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Interactive Field Map (Req #11: Simple visual map-style section: Mining Area, Dust Movement, Farm, Water, Village) */}
        <div className="mt-16">
          <InteractiveFieldMap currentLang={currentLang} isDarkMode={isDarkMode} />
        </div>

      </div>
    </section>
  );
};
