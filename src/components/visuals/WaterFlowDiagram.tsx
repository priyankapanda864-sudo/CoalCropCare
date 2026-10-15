import React from 'react';
import { Language } from '../../types';
import { translations } from '../../data/translations';
import { CloudRain, Mountain, ArrowDownRight, Layers, Droplet, ArrowRight, Info } from 'lucide-react';

interface WaterFlowDiagramProps {
  currentLang: Language;
  isDarkMode: boolean;
}

export const WaterFlowDiagram: React.FC<WaterFlowDiagramProps> = ({ currentLang, isDarkMode }) => {
  const t = translations[currentLang];
  const wf = t.visuals.waterFlow;

  const iconMap: Record<string, React.ElementType> = {
    CloudRain: CloudRain,
    Mountain: Mountain,
    ArrowDownRight: ArrowDownRight,
    Layers: Layers,
    Droplet: Droplet,
  };

  return (
    <div
      className={`p-6 sm:p-8 rounded-2xl border transition-all duration-200 ${
        isDarkMode ? 'bg-[#15211B] border-[#25392D]' : 'bg-white border-slate-200/90 shadow-sm'
      }`}
    >
      {/* Title */}
      <div className="max-w-3xl mb-8">
        <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400 mb-1">
          <Droplet className="w-3.5 h-3.5" />
          <span>Surface Hydrology Flow Model</span>
        </div>
        <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
          {wf.title}
        </h3>
        <p className="mt-1 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
          {wf.subtitle}
        </p>
      </div>

      {/* 5-Step Visual Flow */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 relative mb-6">
        {wf.steps.map((step, idx) => {
          const Icon = iconMap[step.icon] || Droplet;
          return (
            <div
              key={idx}
              className={`p-4 rounded-xl border flex flex-col justify-between transition-all duration-200 relative group hover:-translate-y-0.5 ${
                isDarkMode
                  ? 'bg-[#172722] border-slate-800 hover:border-sky-500/50'
                  : 'bg-gradient-to-b from-sky-50/50 to-white border-sky-100 hover:border-sky-300 shadow-2xs'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="w-8 h-8 rounded-lg bg-sky-100 dark:bg-sky-950 text-sky-700 dark:text-sky-300 flex items-center justify-center">
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-mono font-bold text-sky-600 dark:text-sky-400">
                    0{idx + 1}
                  </span>
                </div>
                <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white mb-1">
                  {step.title}
                </h4>
                <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed">
                  {step.desc}
                </p>
              </div>

              {/* Arrow connector */}
              {idx < wf.steps.length - 1 && (
                <div className="hidden lg:flex absolute -right-3 top-1/2 -translate-y-1/2 z-10 text-sky-500 pointer-events-none">
                  <ArrowRight className="w-4 h-4" />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Core Explanation */}
      <div
        className={`p-4 rounded-xl border mb-4 text-xs sm:text-sm ${
          isDarkMode
            ? 'bg-[#192723] border-[#254238] text-slate-200'
            : 'bg-sky-50/70 border-sky-200 text-sky-950'
        }`}
      >
        <p className="leading-relaxed font-medium">
          💧 {wf.mainExplanation}
        </p>
      </div>

      {/* Scientifically Careful Note Required by Prompt */}
      <div
        className={`p-4 rounded-xl border flex items-start gap-2.5 text-xs ${
          isDarkMode
            ? 'bg-[#16211C] border-slate-800 text-slate-300'
            : 'bg-slate-50 border-slate-200 text-slate-700'
        }`}
      >
        <Info className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          {wf.scientificCarefulNote}
        </p>
      </div>
    </div>
  );
};
