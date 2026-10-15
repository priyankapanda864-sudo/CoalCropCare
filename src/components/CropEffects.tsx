import React, { useState } from 'react';
import { Language } from '../types';
import { translations } from '../data/translations';
import { Leaf, Layers, Droplets, Truck, Sprout, AlertCircle, ArrowRight } from 'lucide-react';
import { CropHealthCards } from './visuals/CropHealthCards';
import { WeatherVisuals } from './visuals/WeatherVisuals';

interface CropEffectsProps {
  currentLang: Language;
  isDarkMode: boolean;
  onNavigate: (id: string) => void;
}

export const CropEffects: React.FC<CropEffectsProps> = ({ currentLang, isDarkMode, onNavigate }) => {
  const t = translations[currentLang];
  const ce = t.cropEffects;

  const [selectedTopicIndex, setSelectedTopicIndex] = useState<number>(0);
  const activeTopic = ce.topics[selectedTopicIndex] || ce.topics[0];

  const getTopicIcon = (id: string) => {
    switch (id) {
      case 'dust-leaves':
        return Leaf;
      case 'soil-properties':
        return Layers;
      case 'water-runoff':
        return Droplets;
      case 'transportation-dust':
        return Truck;
      case 'plant-development':
        return Sprout;
      default:
        return Leaf;
    }
  };

  return (
    <section id="crop-effects" className="py-16 border-t border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-10">
          <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 tracking-wider uppercase block mb-1">
            {ce.sectionTag}
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            {ce.title}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            {ce.desc}
          </p>
        </div>

        {/* Interactive Topic Selector Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {ce.topics.map((topic, idx) => {
            const Icon = getTopicIcon(topic.id);
            const isSelected = selectedTopicIndex === idx;
            return (
              <button
                key={topic.id}
                onClick={() => setSelectedTopicIndex(idx)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all border cursor-pointer ${
                  isSelected
                    ? 'bg-emerald-700 text-white border-emerald-700 shadow-xs'
                    : isDarkMode
                    ? 'bg-[#15211B] text-slate-300 border-slate-800 hover:border-slate-700'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                }`}
              >
                <Icon className={`w-4 h-4 ${isSelected ? 'text-emerald-200' : 'text-emerald-600 dark:text-emerald-400'}`} />
                <span>{topic.title}</span>
              </button>
            );
          })}
        </div>

        {/* Detailed Cause-Effect-Observation Explorer Card */}
        <div className={`p-6 sm:p-8 rounded-2xl border transition-colors ${
          isDarkMode ? 'bg-[#15211B] border-[#25392D]' : 'bg-white border-slate-200 shadow-xs'
        }`}>
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 dark:text-emerald-400 mb-1">
                <span>{ce.detailTag}</span>
                <span aria-hidden="true">·</span>
                <span>{ce.guideTag}</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                {activeTopic.title}
              </h3>
            </div>
            
            <button
              onClick={() => onNavigate('leaf-study')}
              className="text-xs font-medium text-emerald-700 dark:text-emerald-400 hover:underline flex items-center gap-1.5 self-start lg:self-auto cursor-pointer"
            >
              <span>{ce.checkLeafBtn}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* 3-Step Chain Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
            
            {/* Step 1: Cause */}
            <div className={`p-5 rounded-xl border flex flex-col justify-between ${
              isDarkMode ? 'bg-[#1A2820] border-slate-800' : 'bg-slate-50 border-slate-200'
            }`}>
              <div>
                <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                  <span className="w-5 h-5 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 flex items-center justify-center text-[10px]">
                    1
                  </span>
                  <span>{ce.step1Tag}</span>
                </div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-2">
                  {ce.step1Title}
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {activeTopic.cause}
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-700/80 text-[11px] text-slate-500">
                {ce.step1Footer}
              </div>
            </div>

            {/* Step 2: What May Happen */}
            <div className={`p-5 rounded-xl border flex flex-col justify-between ${
              isDarkMode ? 'bg-[#1C2C22] border-slate-800' : 'bg-emerald-50/40 border-emerald-100'
            }`}>
              <div>
                <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider mb-2">
                  <span className="w-5 h-5 rounded-full bg-emerald-200 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-200 flex items-center justify-center text-[10px]">
                    2
                  </span>
                  <span>{ce.step2Tag}</span>
                </div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-2">
                  {ce.step2Title}
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {activeTopic.whatMayHappen}
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-emerald-100 dark:border-slate-800 text-[11px] text-emerald-700 dark:text-emerald-400">
                {ce.step2Footer}
              </div>
            </div>

            {/* Step 3: What Farmers Observe */}
            <div className={`p-5 rounded-xl border flex flex-col justify-between ${
              isDarkMode ? 'bg-[#1D2520] border-slate-800' : 'bg-amber-50/30 border-amber-100'
            }`}>
              <div>
                <div className="flex items-center gap-2 text-xs font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wider mb-2">
                  <span className="w-5 h-5 rounded-full bg-amber-200 dark:bg-amber-950 text-amber-900 dark:text-amber-200 flex items-center justify-center text-[10px]">
                    3
                  </span>
                  <span>{ce.step3Tag}</span>
                </div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-2">
                  {ce.step3Title}
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {activeTopic.whatFarmersCanObserve}
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-amber-100 dark:border-slate-800 text-[11px] text-amber-700 dark:text-amber-400">
                {ce.step3Footer}
              </div>
            </div>

          </div>

          {/* Caveat Note Box */}
          <div className={`p-4 rounded-xl border text-xs sm:text-sm flex items-start gap-3 ${
            isDarkMode ? 'bg-[#18231C] border-[#25392D] text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-700'
          }`}>
            <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <strong className="block text-slate-900 dark:text-white mb-0.5">
                {ce.ruleTitle}
              </strong>
              <span>
                {activeTopic.caveatNote}
              </span>
            </div>
          </div>

        </div>

        {/* Visual Crop Health Diagnostic Cards (Req #8: Leaf Changes, Poor Growth, Yellow Leaves, Dust on Leaves, Water Changes, Soil Changes) */}
        <div className="mt-16">
          <CropHealthCards currentLang={currentLang} isDarkMode={isDarkMode} />
        </div>

        {/* Visual Weather Dynamics Section (Req #9: Dry Weather, Wind, Rain) */}
        <div className="mt-16">
          <WeatherVisuals currentLang={currentLang} isDarkMode={isDarkMode} />
        </div>

      </div>
    </section>
  );
};
