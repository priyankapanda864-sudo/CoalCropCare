import React from 'react';
import { Language, FieldObservation } from '../../types';
import { translations } from '../../data/translations';
import { BarChart3, TrendingUp, Calendar, Sprout, Layers, Droplets, Info } from 'lucide-react';

interface FarmDiaryVisualizerProps {
  currentLang: Language;
  isDarkMode: boolean;
  observations: FieldObservation[];
}

export const FarmDiaryVisualizer: React.FC<FarmDiaryVisualizerProps> = ({
  currentLang,
  isDarkMode,
  observations,
}) => {
  const t = translations[currentLang];
  const fdc = t.visuals.farmDiaryCharts;

  // Aggregate metrics from real user observations
  const totalCount = observations.length;

  // Crop distribution
  const cropCounts: Record<string, number> = {};
  observations.forEach((obs) => {
    const c = obs.crop || 'Other';
    cropCounts[c] = (cropCounts[c] || 0) + 1;
  });

  // Distance distribution
  const distanceCounts: Record<string, number> = {};
  observations.forEach((obs) => {
    const d = obs.distanceFromMine || 'Unspecified';
    distanceCounts[d] = (distanceCounts[d] || 0) + 1;
  });

  return (
    <div
      className={`p-6 sm:p-8 rounded-2xl border transition-all duration-200 ${
        isDarkMode ? 'bg-[#15211B] border-[#25392D]' : 'bg-white border-slate-200/90 shadow-sm'
      }`}
    >
      {/* Title with exact label required: "Your recorded observations" */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 block mb-1">
            {fdc.badge}
          </span>
          <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
            “{fdc.title}”
          </h3>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto px-3 py-1.5 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs font-bold">
          <BarChart3 className="w-4 h-4" />
          <span>{totalCount} {fdc.totalCount}</span>
        </div>
      </div>

      {totalCount === 0 ? (
        <div className="py-12 text-center text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
          <p>{fdc.noDataPrompt}</p>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Charts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Chart 1: Crop Observations Breakdown */}
            <div
              className={`p-5 rounded-xl border ${
                isDarkMode ? 'bg-[#18271F] border-slate-800' : 'bg-slate-50/70 border-slate-200'
              }`}
            >
              <div className="flex items-center gap-2 mb-3 text-xs font-bold text-slate-800 dark:text-slate-200">
                <Sprout className="w-4 h-4 text-emerald-600" />
                <span>Crop Types Recorded</span>
              </div>

              <div className="space-y-2.5">
                {Object.entries(cropCounts).map(([cropName, count]) => {
                  const percent = Math.round((count / totalCount) * 100);
                  return (
                    <div key={cropName} className="text-xs">
                      <div className="flex justify-between font-medium mb-1 text-slate-700 dark:text-slate-300">
                        <span>{cropName}</span>
                        <span className="font-mono text-emerald-700 dark:text-emerald-400 font-bold">
                          {count} ({percent}%)
                        </span>
                      </div>
                      <div className="w-full bg-slate-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
                        <div
                          className="bg-emerald-600 h-full rounded-full transition-all duration-300"
                          style={{ width: `${percent}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Chart 2: Distance from Mine Breakdown */}
            <div
              className={`p-5 rounded-xl border ${
                isDarkMode ? 'bg-[#18271F] border-slate-800' : 'bg-slate-50/70 border-slate-200'
              }`}
            >
              <div className="flex items-center gap-2 mb-3 text-xs font-bold text-slate-800 dark:text-slate-200">
                <Layers className="w-4 h-4 text-amber-600" />
                <span>Observation Distance Zones</span>
              </div>

              <div className="space-y-2.5">
                {Object.entries(distanceCounts).map(([distName, count]) => {
                  const percent = Math.round((count / totalCount) * 100);
                  return (
                    <div key={distName} className="text-xs">
                      <div className="flex justify-between font-medium mb-1 text-slate-700 dark:text-slate-300">
                        <span className="truncate pr-2">{distName}</span>
                        <span className="font-mono text-amber-600 dark:text-amber-400 font-bold shrink-0">
                          {count} ({percent}%)
                        </span>
                      </div>
                      <div className="w-full bg-slate-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
                        <div
                          className="bg-amber-500 h-full rounded-full transition-all duration-300"
                          style={{ width: `${percent}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Timeline of Recorded Observations */}
          <div
            className={`p-5 rounded-xl border ${
              isDarkMode ? 'bg-[#18271F] border-slate-800' : 'bg-slate-50/70 border-slate-200'
            }`}
          >
            <div className="flex items-center gap-2 mb-3 text-xs font-bold text-slate-800 dark:text-slate-200">
              <Calendar className="w-4 h-4 text-sky-600" />
              <span>{fdc.observationsOverTime}</span>
            </div>

            <div className="flex items-center gap-2 overflow-x-auto pb-2 pt-1">
              {observations.slice(0, 10).map((obs, idx) => (
                <div
                  key={obs.id || idx}
                  className={`p-3 rounded-lg border text-xs min-w-[150px] shrink-0 ${
                    isDarkMode ? 'bg-[#142019] border-slate-800' : 'bg-white border-slate-200'
                  }`}
                >
                  <span className="text-[10px] font-mono font-bold text-emerald-700 dark:text-emerald-400 block mb-0.5">
                    {obs.date}
                  </span>
                  <strong className="block text-slate-900 dark:text-white truncate">
                    {obs.crop}
                  </strong>
                  <span className="text-[11px] text-slate-500 truncate block">
                    {obs.farmerName || 'Farmer'} · {obs.village || 'Plot'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Scientific Integrity Note */}
      <div className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-800 text-[11px] text-slate-500 flex items-center gap-2">
        <Info className="w-3.5 h-3.5 shrink-0 text-emerald-600" />
        <span>{fdc.footerNote}</span>
      </div>
    </div>
  );
};
