import React, { useState } from 'react';
import { Language } from '../types';
import { translations } from '../data/translations';
import { Sprout, MapPin, Ruler, CheckSquare, ArrowDown } from 'lucide-react';
import { FarmerObservationInfographic } from './visuals/FarmerObservationInfographic';

interface CropObservationGuideProps {
  currentLang: Language;
  isDarkMode: boolean;
  onPreFillLog: (data: {
    crop: string;
    fieldLocation: string;
    distance: string;
    date: string;
    notes: string;
  }) => void;
}

export const CropObservationGuide: React.FC<CropObservationGuideProps> = ({
  currentLang,
  isDarkMode,
  onPreFillLog,
}) => {
  const [selectedCropIndex, setSelectedCropIndex] = useState(0);
  const [selectedLocationIndex, setSelectedLocationIndex] = useState(0);
  const [selectedDistanceIndex, setSelectedDistanceIndex] = useState(1);
  const [observationDate, setObservationDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [checkedPoints, setCheckedPoints] = useState<Record<string, boolean>>({});

  const t = translations[currentLang];
  const cg = t.cropGuide;

  const activeCrop = cg.crops[selectedCropIndex] || cg.crops[0];

  const toggleCheck = (id: string) => {
    setCheckedPoints((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleSendToLog = () => {
    const checkedTitles = cg.standardPoints
      .filter((p) => checkedPoints[p.id])
      .map((p) => p.title)
      .join(', ');

    const notes = checkedTitles
      ? `${checkedTitles}. (${activeCrop.leafTexture})`
      : `${activeCrop.name} - ${activeCrop.leafTexture}`;

    onPreFillLog({
      crop: activeCrop.name.split(' (')[0],
      fieldLocation: cg.locations[selectedLocationIndex] || cg.locations[0],
      distance: cg.distances[selectedDistanceIndex] || cg.distances[1],
      date: observationDate,
      notes: notes,
    });
  };

  return (
    <section id="observation-guide" className="py-16 border-t border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-10">
          <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 tracking-wider uppercase block mb-1">
            {cg.sectionTag}
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            {cg.title}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            {cg.desc}
          </p>
        </div>

        {/* Farmer Observation Infographic: "What Should I Look For?" (Req #7: Leaves, Plant Growth, Soil, Water, Dust, Weather) */}
        <div className="mb-12">
          <FarmerObservationInfographic currentLang={currentLang} isDarkMode={isDarkMode} />
        </div>

        {/* Configuration Card: Crop, Location, Distance, Date */}
        <div className={`p-6 rounded-2xl border transition-colors mb-8 ${
          isDarkMode ? 'bg-[#15211B] border-[#25392D]' : 'bg-white border-slate-200 shadow-xs'
        }`}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* 1. Crop Selector */}
            <div>
              <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                <Sprout className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <span>{cg.cropSelectLabel}</span>
              </label>
              <select
                value={selectedCropIndex}
                onChange={(e) => setSelectedCropIndex(Number(e.target.value))}
                className="w-full text-xs p-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-emerald-600 cursor-pointer"
              >
                {cg.crops.map((item, idx) => (
                  <option key={idx} value={idx}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>

            {/* 2. Field Location */}
            <div>
              <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                <MapPin className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <span>{cg.locationLabel}</span>
              </label>
              <select
                value={selectedLocationIndex}
                onChange={(e) => setSelectedLocationIndex(Number(e.target.value))}
                className="w-full text-xs p-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-emerald-600 cursor-pointer"
              >
                {cg.locations.map((loc, idx) => (
                  <option key={idx} value={idx}>
                    {loc}
                  </option>
                ))}
              </select>
            </div>

            {/* 3. Distance from Mine */}
            <div>
              <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                <Ruler className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <span>{cg.distanceLabel}</span>
              </label>
              <select
                value={selectedDistanceIndex}
                onChange={(e) => setSelectedDistanceIndex(Number(e.target.value))}
                className="w-full text-xs p-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-emerald-600 cursor-pointer"
              >
                {cg.distances.map((dist, idx) => (
                  <option key={idx} value={idx}>
                    {dist}
                  </option>
                ))}
              </select>
            </div>

            {/* 4. Observation Date */}
            <div>
              <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                <span>📅 {cg.dateLabel}</span>
              </label>
              <input
                type="date"
                value={observationDate}
                onChange={(e) => setObservationDate(e.target.value)}
                className="w-full text-xs p-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-emerald-600 cursor-pointer"
              />
            </div>

          </div>
        </div>

        {/* Dynamic Crop Profile Card */}
        <div className={`p-6 sm:p-8 rounded-2xl border transition-colors mb-8 ${
          isDarkMode ? 'bg-[#15211B] border-[#25392D]' : 'bg-white border-slate-200 shadow-xs'
        }`}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 dark:text-emerald-400 mb-1">
                <span>{activeCrop.category}</span>
                <span aria-hidden="true">·</span>
                <span className="italic">{activeCrop.scientificName}</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                {activeCrop.name}
              </h3>
            </div>
            <div className="text-xs px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 self-start sm:self-auto font-medium">
              <span>{cg.seasonLabel} </span>
              <strong>{activeCrop.typicalSeason}</strong>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 my-6">
            <div className="lg:col-span-6 space-y-4">
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 text-xs">
                <strong className="block text-slate-900 dark:text-white font-bold mb-1">
                  {cg.leafTypeLabel}
                </strong>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  {activeCrop.leafTexture}
                </p>
              </div>

              <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-700 text-xs">
                <strong className="block text-slate-900 dark:text-white font-bold mb-2">
                  {cg.vulnerabilitiesTitle}
                </strong>
                <ul className="space-y-2 text-slate-600 dark:text-slate-300">
                  {activeCrop.vulnerabilityFactors.map((v, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0 mt-1.5" />
                      <span>{v}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="p-4 rounded-xl bg-emerald-50/50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 text-xs h-full flex flex-col justify-between">
                <div>
                  <strong className="block text-emerald-900 dark:text-emerald-300 font-bold mb-2">
                    {cg.keyPointsTitle}
                  </strong>
                  <ul className="space-y-2 text-emerald-950 dark:text-emerald-200">
                    {activeCrop.keyObservationPoints.map((kp, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 shrink-0 mt-1.5" />
                        <span>{kp}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Standard Observation Checkpoints for this field session */}
          <div className="pt-6 border-t border-slate-200 dark:border-slate-800">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
              <div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                  {cg.checklistTitle}
                </h4>
                <p className="text-xs text-slate-500">
                  {cg.checkHint}
                </p>
              </div>

              <button
                onClick={handleSendToLog}
                className="px-4 py-2 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold transition-all shadow-xs flex items-center gap-1.5 self-start sm:self-auto cursor-pointer"
              >
                <span>{cg.sendToLogBtn}</span>
                <ArrowDown className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
              {cg.standardPoints.map((point) => {
                const isChecked = !!checkedPoints[point.id];
                return (
                  <div
                    key={point.id}
                    onClick={() => toggleCheck(point.id)}
                    className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                      isChecked
                        ? 'bg-emerald-50/70 dark:bg-emerald-950/40 border-emerald-500 text-emerald-950 dark:text-emerald-100'
                        : isDarkMode
                        ? 'bg-[#18261E] border-slate-800 text-slate-300 hover:border-slate-700'
                        : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <div className="flex items-start gap-2.5">
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => {}}
                        className="mt-0.5 rounded text-emerald-600 focus:ring-emerald-500 cursor-pointer"
                      />
                      <div>
                        <strong className="block font-semibold mb-0.5">{point.title}</strong>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 mb-1">{point.question}</p>
                        <span className="text-[10px] text-emerald-700 dark:text-emerald-400 block font-medium">
                          Tip: {point.guide}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
