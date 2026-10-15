import React, { useState } from 'react';
import { Language } from '../../types';
import { translations } from '../../data/translations';
import {
  Layers,
  Pickaxe,
  Wind,
  Droplets,
  Sprout,
  UserCheck,
  ArrowRight,
  ArrowDown,
  Info,
  ChevronRight,
  CheckCircle2,
} from 'lucide-react';

interface CoalMiningProcessDiagramProps {
  currentLang: Language;
  isDarkMode: boolean;
}

export const CoalMiningProcessDiagram: React.FC<CoalMiningProcessDiagramProps> = ({
  currentLang,
  isDarkMode,
}) => {
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);
  const t = translations[currentLang];
  const diag = t.visuals.coalMiningDiagram;

  const iconMap: Record<string, React.ElementType> = {
    Layers: Layers,
    Pickaxe: Pickaxe,
    Wind: Wind,
    Droplets: Droplets,
    Sprout: Sprout,
    UserCheck: UserCheck,
  };

  const activeStep = diag.steps[activeStepIndex] || diag.steps[0];
  const ActiveIcon = iconMap[activeStep.iconName] || Layers;

  return (
    <div
      className={`p-6 sm:p-8 rounded-2xl border transition-all duration-200 ${
        isDarkMode
          ? 'bg-[#15211B] border-[#25392D] shadow-md'
          : 'bg-gradient-to-b from-white to-slate-50/50 border-slate-200/90 shadow-sm'
      }`}
    >
      {/* Header */}
      <div className="max-w-3xl mb-6">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 mb-1.5">
          <Pickaxe className="w-4 h-4" />
          <span>Interactive Science Chain</span>
        </div>
        <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          {diag.title}
        </h3>
        <p className="mt-1 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
          {diag.subtitle}
        </p>
      </div>

      <div className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-4 flex items-center gap-1.5">
        <Info className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
        <span>{diag.stepPrompt}</span>
      </div>

      {/* 6-Step Horizontal / Stacked Diagram Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
        {diag.steps.map((step, idx) => {
          const Icon = iconMap[step.iconName] || Layers;
          const isSelected = activeStepIndex === idx;

          return (
            <div key={step.id} className="relative flex flex-col items-center">
              <button
                type="button"
                onClick={() => setActiveStepIndex(idx)}
                className={`w-full p-3.5 rounded-xl border text-left transition-all duration-200 flex flex-col justify-between h-full cursor-pointer group ${
                  isSelected
                    ? 'bg-emerald-700 text-white border-emerald-700 shadow-md scale-[1.02]'
                    : isDarkMode
                    ? 'bg-[#1A2820] text-slate-200 border-slate-800 hover:border-slate-700 hover:bg-[#203228]'
                    : 'bg-white text-slate-800 border-slate-200 hover:border-emerald-300 hover:bg-emerald-50/30'
                }`}
              >
                <div className="flex items-center justify-between w-full mb-2">
                  <div
                    className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold ${
                      isSelected
                        ? 'bg-white/20 text-white'
                        : isDarkMode
                        ? 'bg-emerald-950 text-emerald-400'
                        : 'bg-emerald-100 text-emerald-800'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <span
                    className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded ${
                      isSelected
                        ? 'bg-black/30 text-white'
                        : 'text-slate-400 dark:text-slate-500'
                    }`}
                  >
                    0{idx + 1}
                  </span>
                </div>

                <div>
                  <h4 className="text-xs font-bold leading-snug line-clamp-2">
                    {step.title}
                  </h4>
                  <p
                    className={`text-[11px] mt-1 line-clamp-2 ${
                      isSelected ? 'text-emerald-100' : 'text-slate-500 dark:text-slate-400'
                    }`}
                  >
                    {step.desc}
                  </p>
                </div>
              </button>

              {/* Arrow connector between steps (desktop horizontal) */}
              {idx < diag.steps.length - 1 && (
                <div className="hidden lg:flex absolute -right-2 top-1/2 -translate-y-1/2 translate-x-1/2 z-10 text-emerald-600 dark:text-emerald-400 pointer-events-none">
                  <ArrowRight className="w-4 h-4" />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Expanded Active Step Callout Card */}
      <div
        className={`p-5 rounded-xl border transition-all duration-200 ${
          isDarkMode
            ? 'bg-[#1B2A22] border-[#2A4234]'
            : 'bg-emerald-50/70 border-emerald-200'
        }`}
      >
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-700 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
              <ActiveIcon className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-400">
                  Step 0{activeStepIndex + 1} of 06
                </span>
                <span aria-hidden="true" className="text-slate-400">·</span>
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  Interactive Details
                </span>
              </div>
              <h4 className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-white">
                {activeStep.title}
              </h4>
              <p className="mt-1 text-xs sm:text-sm text-slate-700 dark:text-slate-200 leading-relaxed max-w-2xl">
                {activeStep.desc}
              </p>
            </div>
          </div>

          <div
            className={`p-3.5 rounded-lg border text-xs sm:max-w-xs shrink-0 ${
              isDarkMode
                ? 'bg-[#142019] border-slate-800 text-slate-300'
                : 'bg-white border-emerald-200/90 text-slate-800 shadow-2xs'
            }`}
          >
            <div className="flex items-center gap-1.5 font-bold text-emerald-800 dark:text-emerald-400 mb-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>What Farmers Should Know:</span>
            </div>
            <p className="text-[11px] leading-relaxed text-slate-600 dark:text-slate-300">
              {activeStep.farmerNote}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
