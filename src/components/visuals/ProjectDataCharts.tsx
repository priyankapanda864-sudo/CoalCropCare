import React from 'react';
import { Language, FieldObservation } from '../../types';
import { translations } from '../../data/translations';
import { PieChart, BarChart2, Calendar, ClipboardCheck, Info, PlusCircle } from 'lucide-react';

interface ProjectDataChartsProps {
  currentLang: Language;
  isDarkMode: boolean;
  observations: FieldObservation[];
  onNavigateToLog?: () => void;
}

export const ProjectDataCharts: React.FC<ProjectDataChartsProps> = ({
  currentLang,
  isDarkMode,
  observations,
  onNavigateToLog,
}) => {
  const t = translations[currentLang];
  const pdc = t.visuals.projectDataCharts;

  // Real observation data (NO FAKE NUMBERS!)
  const hasRealData = observations && observations.length > 0;
  const count = observations ? observations.length : 0;

  // Compute actual counts if available
  const cropMap: Record<string, number> = {};
  const distMap: Record<string, number> = {};

  if (hasRealData) {
    observations.forEach((obs) => {
      const c = obs.crop || 'Other';
      cropMap[c] = (cropMap[c] || 0) + 1;

      const d = obs.distanceFromMine || 'Unrecorded';
      distMap[d] = (distMap[d] || 0) + 1;
    });
  }

  return (
    <div
      className={`p-6 sm:p-8 rounded-2xl border transition-all duration-200 ${
        isDarkMode ? 'bg-[#15211B] border-[#25392D]' : 'bg-white border-slate-200/90 shadow-sm'
      }`}
    >
      {/* Title */}
      <div className="max-w-3xl mb-6">
        <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 mb-1">
          <PieChart className="w-3.5 h-3.5" />
          <span>Research Data Visualizations</span>
        </div>
        <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
          {pdc.title}
        </h3>
        <p className="mt-1 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
          {pdc.subtitle}
        </p>
      </div>

      {!hasRealData ? (
        /* Empty State Template Required by Prompt */
        <div className="py-12 px-4 rounded-xl border border-dashed border-slate-300 dark:border-slate-700 text-center max-w-lg mx-auto bg-slate-50/50 dark:bg-slate-900/30">
          <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 flex items-center justify-center mx-auto mb-3">
            <ClipboardCheck className="w-6 h-6" />
          </div>
          <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-2">
            No Observation Data Yet
          </h4>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
            “{pdc.emptyNotice}”
          </p>
          {onNavigateToLog && (
            <button
              type="button"
              onClick={onNavigateToLog}
              className="px-4 py-2 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold shadow-xs transition-colors inline-flex items-center gap-1.5 cursor-pointer"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>Record First Field Observation</span>
            </button>
          )}
        </div>
      ) : (
        /* 4 Real Data Visual Charts */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* 1. Crop Types Studied (Pie / Doughnut Chart) */}
          <div
            className={`p-5 rounded-xl border ${
              isDarkMode ? 'bg-[#18271F] border-slate-800' : 'bg-slate-50/60 border-slate-200'
            }`}
          >
            <div className="flex items-center gap-2 mb-3 text-xs font-bold text-slate-800 dark:text-slate-200">
              <PieChart className="w-4 h-4 text-emerald-600" />
              <span>{pdc.cropDistribution}</span>
            </div>

            <div className="space-y-2">
              {Object.entries(cropMap).map(([crop, num]) => {
                const pct = Math.round((num / count) * 100);
                return (
                  <div key={crop} className="text-xs">
                    <div className="flex justify-between font-medium mb-1 text-slate-700 dark:text-slate-300">
                      <span>{crop}</span>
                      <span className="font-mono font-bold text-emerald-700 dark:text-emerald-400">
                        {num} ({pct}%)
                      </span>
                    </div>
                    <div className="w-full bg-slate-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
                      <div className="bg-emerald-600 h-full rounded-full" style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 2. Farmer Survey Distance Distribution (Bar Chart) */}
          <div
            className={`p-5 rounded-xl border ${
              isDarkMode ? 'bg-[#18271F] border-slate-800' : 'bg-slate-50/60 border-slate-200'
            }`}
          >
            <div className="flex items-center gap-2 mb-3 text-xs font-bold text-slate-800 dark:text-slate-200">
              <BarChart2 className="w-4 h-4 text-amber-600" />
              <span>{pdc.farmerSurveys}</span>
            </div>

            <div className="space-y-2">
              {Object.entries(distMap).map(([dist, num]) => {
                const pct = Math.round((num / count) * 100);
                return (
                  <div key={dist} className="text-xs">
                    <div className="flex justify-between font-medium mb-1 text-slate-700 dark:text-slate-300">
                      <span className="truncate pr-2">{dist}</span>
                      <span className="font-mono font-bold text-amber-600 dark:text-amber-400">
                        {num} ({pct}%)
                      </span>
                    </div>
                    <div className="w-full bg-slate-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
                      <div className="bg-amber-500 h-full rounded-full" style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 3. Field Observations Total (Bar Summary) */}
          <div
            className={`p-5 rounded-xl border ${
              isDarkMode ? 'bg-[#18271F] border-slate-800' : 'bg-slate-50/60 border-slate-200'
            }`}
          >
            <div className="flex items-center gap-2 mb-2 text-xs font-bold text-slate-800 dark:text-slate-200">
              <ClipboardCheck className="w-4 h-4 text-sky-600" />
              <span>{pdc.fieldObservations}</span>
            </div>
            <div className="text-2xl font-black text-sky-600 dark:text-sky-400 mb-1">
              {count}
            </div>
            <p className="text-[11px] text-slate-500">
              Total individual field plots inspected and logged in the Talcher / Angul mining corridor study.
            </p>
          </div>

          {/* 4. Observation Timeline */}
          <div
            className={`p-5 rounded-xl border ${
              isDarkMode ? 'bg-[#18271F] border-slate-800' : 'bg-slate-50/60 border-slate-200'
            }`}
          >
            <div className="flex items-center gap-2 mb-2 text-xs font-bold text-slate-800 dark:text-slate-200">
              <Calendar className="w-4 h-4 text-purple-600" />
              <span>{pdc.observationTimeline}</span>
            </div>
            <div className="space-y-1 text-xs">
              {observations.slice(0, 3).map((obs) => (
                <div key={obs.id} className="flex justify-between py-1 border-b border-slate-200/50 dark:border-slate-800">
                  <span className="font-mono text-[11px] text-slate-500">{obs.date}</span>
                  <span className="font-medium text-slate-800 dark:text-slate-200">{obs.crop}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      <div className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-800 text-[11px] text-slate-500 flex items-center gap-1.5">
        <Info className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
        <span>Strict Scientific Integrity: Charts update only from authentic farmer and student field log entries.</span>
      </div>
    </div>
  );
};
