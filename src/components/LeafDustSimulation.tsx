import React, { useState } from 'react';
import { Language } from '../types';
import { translations } from '../data/translations';
import { CROP_LEAF_COMPARISON_PATH } from '../data/knowledgeData';
import { Sun, Wind, Droplets, Check, AlertTriangle } from 'lucide-react';
import { LeafDustComparisonCard } from './visuals/LeafDustComparisonCard';

interface LeafDustSimulationProps {
  currentLang: Language;
  isDarkMode: boolean;
}

export const LeafDustSimulation: React.FC<LeafDustSimulationProps> = ({ currentLang, isDarkMode }) => {
  const [dustLevel, setDustLevel] = useState<number>(45); // 0 to 100%
  const [activeLeafView, setActiveLeafView] = useState<'comparison' | 'stomata'>('comparison');
  const [isWashedByRain, setIsWashedByRain] = useState<boolean>(false);

  const t = translations[currentLang];
  const ls = t.leafSim;

  // Compute educational metrics based on dustLevel slider
  const effectiveDust = isWashedByRain ? Math.max(10, Math.round(dustLevel * 0.2)) : dustLevel;
  
  // Sunlight reflection & photosynthetic availability
  const lightPenetration = Math.max(35, 100 - Math.round(effectiveDust * 0.65));
  // Stomatal gas conductance index
  const stomatalConductance = Math.max(40, 100 - Math.round(effectiveDust * 0.55));
  // Surface temperature delta
  const tempDeltaCelsius = (effectiveDust * 0.035).toFixed(1);

  const handleRainWash = () => {
    setIsWashedByRain(true);
    setTimeout(() => {
      setIsWashedByRain(false);
      setDustLevel(15);
    }, 1500);
  };

  return (
    <section id="leaf-study" className="py-16 border-t border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-10">
          <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 tracking-wider uppercase block mb-1">
            {ls.sectionTag}
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            {ls.title}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            {ls.desc}
          </p>
        </div>

        {/* Interactive Sandbox Layout */}
        <div className={`rounded-2xl border overflow-hidden transition-colors ${
          isDarkMode ? 'bg-[#15211B] border-[#25392D]' : 'bg-white border-slate-200 shadow-sm'
        }`}>
          
          {/* Top Control Bar */}
          <div className={`px-5 py-3 border-b flex flex-wrap items-center justify-between gap-3 text-xs ${
            isDarkMode ? 'bg-[#18261E] border-slate-800' : 'bg-slate-50 border-slate-200'
          }`}>
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-900 dark:text-white">{ls.toolTag}</span>
              <span aria-hidden="true" className="text-slate-400">·</span>
              <span className="text-slate-500">{ls.tryTag}</span>
            </div>

            {/* View Switcher: Split Comparison vs Stomata Micro-View */}
            <div className="flex items-center gap-1 p-0.5 rounded-lg bg-slate-200/70 dark:bg-slate-800 text-xs font-medium">
              <button
                onClick={() => setActiveLeafView('comparison')}
                className={`px-3 py-1 rounded-md transition-colors cursor-pointer ${
                  activeLeafView === 'comparison'
                    ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs font-semibold'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                }`}
              >
                {ls.tabPhoto}
              </button>
              <button
                onClick={() => setActiveLeafView('stomata')}
                className={`px-3 py-1 rounded-md transition-colors cursor-pointer ${
                  activeLeafView === 'stomata'
                    ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs font-semibold'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                }`}
              >
                {ls.tabPores}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
            
            {/* Visual Stage (Left 7 Cols) */}
            <div className="lg:col-span-7 p-6 border-b lg:border-b-0 lg:border-r border-slate-200 dark:border-slate-800 flex flex-col justify-between">
              
              {activeLeafView === 'comparison' ? (
                <div>
                  <div className="relative aspect-4/3 rounded-xl overflow-hidden bg-slate-900 border border-slate-200 dark:border-slate-800">
                    <img
                      src={CROP_LEAF_COMPARISON_PATH}
                      alt="Comparative split photo of clean leaf vs dust exposed leaf"
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />

                    {/* Dynamic Coal Dust Particle Overlay (controlled by slider) */}
                    <div
                      className="absolute inset-0 pointer-events-none transition-opacity duration-300"
                      style={{
                        backgroundColor: '#0A0F0D',
                        opacity: (effectiveDust / 100) * 0.45,
                        mixBlendMode: 'multiply',
                      }}
                    />

                    {/* Rain Wash animation banner */}
                    {isWashedByRain && (
                      <div className="absolute inset-0 bg-sky-500/20 backdrop-blur-xs flex items-center justify-center text-white text-xs font-bold">
                        <Droplets className="w-5 h-5 animate-bounce mr-2" />
                        <span>{ls.washingMsg}</span>
                      </div>
                    )}

                    {/* Split Comparison Markers */}
                    <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-xs text-white px-2.5 py-1 rounded-md text-[11px] font-semibold border border-white/20 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-400" />
                      <span>{ls.leftClean}</span>
                    </div>

                    <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-xs text-white px-2.5 py-1 rounded-md text-[11px] font-semibold border border-white/20 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-amber-400" />
                      <span>{ls.rightDusty}</span>
                    </div>

                    <div className="absolute bottom-3 left-3 right-3 bg-black/80 backdrop-blur-md rounded-lg p-2.5 text-white text-[11px] border border-white/10 flex items-center justify-between">
                      <span>{ls.dustOnLeaf} <strong>{effectiveDust}%</strong></span>
                      <button
                        onClick={handleRainWash}
                        className="px-2.5 py-1 rounded bg-emerald-600 hover:bg-emerald-500 text-white font-medium flex items-center gap-1 transition-colors cursor-pointer"
                      >
                        <Droplets className="w-3.5 h-3.5" />
                        <span>{ls.washBtn}</span>
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                /* Stomata Microscopic Diagram Stage */
                <div className="relative aspect-4/3 rounded-xl overflow-hidden bg-[#0D1812] border border-slate-200 dark:border-slate-800 p-6 flex flex-col justify-center items-center text-white">
                  <div className="text-center max-w-sm mb-4">
                    <span className="text-emerald-400 text-xs font-semibold uppercase tracking-wider block">
                      {ls.microscopeTag}
                    </span>
                    <h4 className="text-base font-bold mt-1">{ls.stomaTitle}</h4>
                    <p className="text-[11px] text-slate-300 mt-1">
                      {ls.stomaDesc}
                    </p>
                  </div>

                  {/* SVG Stomata Illustration */}
                  <div className="relative w-44 h-44 flex items-center justify-center">
                    <svg viewBox="0 0 200 200" className="w-full h-full">
                      <rect width="200" height="200" fill="#142B1E" rx="16" />
                      <circle cx="100" cy="100" r="70" fill="#1C3D2B" stroke="#2B593E" strokeWidth="3" />
                      
                      {/* Left Guard Cell */}
                      <path
                        d="M 100 40 C 70 40, 60 70, 60 100 C 60 130, 70 160, 100 160 C 90 140, 85 115, 85 100 C 85 85, 90 60, 100 40 Z"
                        fill="#2E7D32"
                        stroke="#81C784"
                        strokeWidth="2"
                      />
                      {/* Right Guard Cell */}
                      <path
                        d="M 100 40 C 130 40, 140 70, 140 100 C 140 130, 130 160, 100 160 C 110 140, 115 115, 115 100 C 115 85, 110 60, 100 40 Z"
                        fill="#2E7D32"
                        stroke="#81C784"
                        strokeWidth="2"
                      />

                      {/* Stomatal Aperture Center */}
                      <ellipse
                        cx="100"
                        cy="100"
                        rx={Math.max(3, 14 - (effectiveDust * 0.11))}
                        ry="45"
                        fill="#0A120D"
                      />

                      {/* Coal Dust Particle Overlay */}
                      {effectiveDust > 25 && (
                        <>
                          <circle cx="96" cy="85" r={Math.min(7, effectiveDust * 0.08)} fill="#1E2421" stroke="#374151" strokeWidth="1" />
                          <circle cx="104" cy="108" r={Math.min(8, effectiveDust * 0.09)} fill="#1A1F1C" stroke="#374151" strokeWidth="1" />
                          <circle cx="92" cy="120" r={Math.min(6, effectiveDust * 0.07)} fill="#222825" stroke="#374151" strokeWidth="1" />
                          <circle cx="106" cy="72" r={Math.min(5, effectiveDust * 0.06)} fill="#171C19" />
                        </>
                      )}
                    </svg>

                    <div className="absolute -bottom-2 text-[10px] bg-black/80 px-2 py-0.5 rounded text-slate-300">
                      {effectiveDust > 50 ? ls.blockedPoreText : ls.healthyPoreText}
                    </div>
                  </div>

                  <p className="text-[11px] text-slate-400 text-center mt-3 max-w-xs">
                    {ls.stomaFooter}
                  </p>
                </div>
              )}

              {/* Caption */}
              <div className="mt-4 text-xs text-slate-500 dark:text-slate-400">
                {ls.photoCaption}
              </div>
            </div>

            {/* Parameter Controls (Right 5 Cols) */}
            <div className="lg:col-span-5 p-6 flex flex-col justify-between space-y-6">
              
              <div>
                <h4 className="text-base font-bold text-slate-900 dark:text-white mb-1">
                  {ls.sliderHeading}
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 mb-4">
                  {ls.sliderHint}
                </p>

                {/* Dust Slider */}
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 mb-5">
                  <div className="flex items-center justify-between text-xs font-semibold mb-2">
                    <span className="text-slate-700 dark:text-slate-300">{ls.sliderLabel}</span>
                    <span className="text-emerald-700 dark:text-emerald-400 font-mono text-sm">{dustLevel}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={dustLevel}
                    onChange={(e) => setDustLevel(Number(e.target.value))}
                    className="w-full accent-emerald-700 cursor-pointer h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 mt-1.5 font-medium">
                    <span>{ls.dust0}</span>
                    <span>{ls.dust50}</span>
                    <span>{ls.dust100}</span>
                  </div>
                </div>

                {/* Educational Dynamic Metrics */}
                <div className="space-y-3">
                  {/* Metric 1 */}
                  <div className="p-3 rounded-lg border border-slate-200 dark:border-slate-700 text-xs">
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-1.5">
                        <Sun className="w-3.5 h-3.5 text-amber-500" />
                        <span className="font-semibold text-slate-800 dark:text-slate-200">
                          {ls.metric1Title}
                        </span>
                      </div>
                      <span className="font-mono font-bold text-slate-900 dark:text-white">
                        ~{lightPenetration}%
                      </span>
                    </div>
                    <div className="w-full bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden">
                      <div
                        className="bg-amber-500 h-full rounded-full transition-all duration-300"
                        style={{ width: `${lightPenetration}%` }}
                      />
                    </div>
                    <span className="text-[10px] text-slate-500 dark:text-slate-400 mt-1 block">
                      {ls.metric1Desc}
                    </span>
                  </div>

                  {/* Metric 2 */}
                  <div className="p-3 rounded-lg border border-slate-200 dark:border-slate-700 text-xs">
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-1.5">
                        <Wind className="w-3.5 h-3.5 text-sky-500" />
                        <span className="font-semibold text-slate-800 dark:text-slate-200">
                          {ls.metric2Title}
                        </span>
                      </div>
                      <span className="font-mono font-bold text-slate-900 dark:text-white">
                        ~{stomatalConductance}%
                      </span>
                    </div>
                    <div className="w-full bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden">
                      <div
                        className="bg-sky-500 h-full rounded-full transition-all duration-300"
                        style={{ width: `${stomatalConductance}%` }}
                      />
                    </div>
                    <span className="text-[10px] text-slate-500 dark:text-slate-400 mt-1 block">
                      {ls.metric2Desc}
                    </span>
                  </div>

                  {/* Metric 3 */}
                  <div className="p-3 rounded-lg border border-slate-200 dark:border-slate-700 text-xs">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <AlertTriangle className="w-3.5 h-3.5 text-rose-500" />
                        <span className="font-semibold text-slate-800 dark:text-slate-200">
                          {ls.metric3Title}
                        </span>
                      </div>
                      <span className="font-mono font-bold text-rose-600 dark:text-rose-400">
                        +{tempDeltaCelsius}°C
                      </span>
                    </div>
                    <span className="text-[10px] text-slate-500 dark:text-slate-400 mt-1 block">
                      {ls.metric3Desc}
                    </span>
                  </div>
                </div>

              </div>

              {/* Farmer Callout */}
              <div className={`p-4 rounded-xl text-xs border ${
                isDarkMode ? 'bg-[#1C2921] border-[#2B4032]' : 'bg-emerald-50/70 border-emerald-200 text-emerald-950'
              }`}>
                <div className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block font-semibold">{ls.farmerCalloutTitle}</strong>
                    <span>{ls.farmerCalloutDesc}</span>
                  </div>
                </div>
              </div>

            </div>

          </div>

        </div>

        {/* Clean Leaf vs Dusty Leaf Educational Comparison (Req #4) */}
        <div className="mt-12">
          <LeafDustComparisonCard currentLang={currentLang} isDarkMode={isDarkMode} />
        </div>

        {/* Comparison Table */}
        <div className={`mt-8 p-6 rounded-2xl border transition-colors ${
          isDarkMode ? 'bg-[#15211B] border-[#25392D]' : 'bg-white border-slate-200'
        }`}>
          <h3 className="text-base font-bold text-slate-900 dark:text-white mb-4">
            {ls.tableTitle}
          </h3>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 font-semibold">
                  <th className="py-2.5 px-3">{ls.thLook}</th>
                  <th className="py-2.5 px-3 text-emerald-700 dark:text-emerald-400">{ls.thClean}</th>
                  <th className="py-2.5 px-3 text-amber-700 dark:text-amber-400">{ls.thDusty}</th>
                  <th className="py-2.5 px-3">{ls.thHowCheck}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 text-slate-700 dark:text-slate-300">
                {ls.rows.map((row, idx) => (
                  <tr key={idx}>
                    <td className="py-3 px-3 font-semibold text-slate-900 dark:text-white">{row.look}</td>
                    <td className="py-3 px-3">{row.clean}</td>
                    <td className="py-3 px-3">{row.dusty}</td>
                    <td className="py-3 px-3 text-slate-500">{row.check}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-500 dark:text-slate-400">
            {ls.tableNote}
          </div>
        </div>

      </div>
    </section>
  );
};
