import React, { useState } from 'react';
import { Language } from '../types';
import { translations } from '../data/translations';
import { Search, Info } from 'lucide-react';
import { MythVsFactCards } from './visuals/MythVsFactCards';
import { PhotoAttributionGallery } from './visuals/PhotoAttributionGallery';

interface KnowledgeLibraryProps {
  currentLang: Language;
  isDarkMode: boolean;
}

export const KnowledgeLibrary: React.FC<KnowledgeLibraryProps> = ({ currentLang, isDarkMode }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const t = translations[currentLang];
  const lib = t.library;

  // Icon mapping for library topics (Req #15)
  const getTopicIcon = (id: string, title: string) => {
    const lower = (id + ' ' + title).toLowerCase();
    if (lower.includes('soil test') || lower.includes('परीक्षण') || lower.includes('ପରୀକ୍ଷା') || lower.includes('ph')) return '🔬';
    if (lower.includes('mining') || lower.includes('खनन') || lower.includes('ଖନନ') || lower.includes('opencast') || lower.includes('underground')) return '🏭';
    if (lower.includes('coal') || lower.includes('कोयला') || lower.includes('କୋଇଲା')) return '⛏️';
    if (lower.includes('dust') || lower.includes('धूल') || lower.includes('ଧୂଳି') || lower.includes('particulate')) return '💨';
    if (lower.includes('soil') || lower.includes('मिट्टी') || lower.includes('ମାଟି') || lower.includes('humus') || lower.includes('topsoil')) return '🟫';
    if (lower.includes('water') || lower.includes('पानी') || lower.includes('ପାଣି') || lower.includes('जल') || lower.includes('canal') || lower.includes('drainage')) return '💧';
    if (lower.includes('wind') || lower.includes('हवा') || lower.includes('ପବନ') || lower.includes('aerosol')) return '🌬️';
    if (lower.includes('rain') || lower.includes('बारिश') || lower.includes('ବର୍ଷା') || lower.includes('monsoon')) return '🌧️';
    if (lower.includes('farm') || lower.includes('खेती') || lower.includes('ଚାଷ') || lower.includes('shelterbelt') || lower.includes('manure')) return '🌾';
    if (lower.includes('crop') || lower.includes('फसल') || lower.includes('leaf') || lower.includes('ପତ୍ର') || lower.includes('stomata')) return '🌱';
    return '🌱';
  };

  const quickTopics = [
    { label: 'Coal', icon: '⛏️', query: 'coal' },
    { label: 'Mining', icon: '🏭', query: 'mining' },
    { label: 'Dust', icon: '💨', query: 'dust' },
    { label: 'Crops', icon: '🌱', query: 'crop' },
    { label: 'Soil', icon: '🟫', query: 'soil' },
    { label: 'Water', icon: '💧', query: 'water' },
    { label: 'Wind', icon: '🌬️', query: 'wind' },
    { label: 'Rain', icon: '🌧️', query: 'rain' },
    { label: 'Soil Testing', icon: '🔬', query: 'test' },
    { label: 'Farming', icon: '🌾', query: 'farm' },
  ];

  const filteredItems = lib.items.filter((item) => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const q = searchQuery.toLowerCase().trim();
    if (!q) return matchesCategory;

    const matchesSearch =
      item.title.toLowerCase().includes(q) ||
      item.simpleExplanation.toLowerCase().includes(q) ||
      item.whyItMatters.toLowerCase().includes(q) ||
      item.whatFarmersCanObserve.toLowerCase().includes(q) ||
      (item.scientificContext && item.scientificContext.toLowerCase().includes(q));

    return matchesCategory && matchesSearch;
  });

  return (
    <section id="library" className="py-16 border-t border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-10">
          <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 tracking-wider uppercase block mb-1">
            {lib.sectionTag}
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            {lib.title}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            {lib.desc}
          </p>
        </div>

        {/* Search Bar & Category Controls */}
        <div className="space-y-4 mb-8">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder={lib.searchPlaceholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-12 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-emerald-600 shadow-xs"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 cursor-pointer"
                >
                  {lib.clearBtn}
                </button>
              )}
            </div>

            {/* Category Tabs */}
            <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0 text-xs font-medium">
              {lib.categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
                    selectedCategory === cat.id
                      ? 'bg-emerald-700 text-white font-semibold shadow-xs'
                      : isDarkMode
                      ? 'bg-[#15211B] text-slate-300 hover:bg-slate-800'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Quick Topic Icon Shortcuts (Req #15: Coal, Mining, Dust, Crops, Soil, Water, Wind, Rain, Soil Testing, Farming) */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
            <span className="text-[11px] font-bold text-slate-400 shrink-0 mr-1">Quick Topics:</span>
            {quickTopics.map((qt, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setSearchQuery(qt.query)}
                className="px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-800 hover:border-emerald-400 bg-white dark:bg-slate-900/60 text-slate-700 dark:text-slate-300 hover:text-emerald-700 dark:hover:text-emerald-400 text-xs whitespace-nowrap shrink-0 transition-colors cursor-pointer flex items-center gap-1 shadow-2xs"
              >
                <span>{qt.icon}</span>
                <span>{qt.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Results Count / Empty state */}
        {filteredItems.length === 0 ? (
          <div className="py-16 text-center text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
            {lib.noResults}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => {
              const topicIcon = getTopicIcon(item.id, item.title);
              return (
                <div
                  key={item.id}
                  className={`p-6 rounded-2xl border flex flex-col justify-between transition-all duration-200 group hover:-translate-y-0.5 ${
                    isDarkMode
                      ? 'bg-[#15211B] border-[#25392D] hover:border-emerald-600/50'
                      : 'bg-white border-slate-200 hover:border-emerald-300 shadow-2xs hover:shadow-xs'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl select-none" role="img" aria-label={item.title}>
                          {topicIcon}
                        </span>
                        <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                          {item.category}
                        </span>
                      </div>
                      <span className="text-[10px] font-semibold text-slate-400 dark:text-slate-500">
                        Topic
                      </span>
                    </div>

                    <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mb-3 group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">
                      {item.title}
                    </h3>

                    {/* 1: Simple Explanation */}
                    <div className="mb-3">
                      <div className="flex items-center gap-1 text-xs font-bold text-slate-900 dark:text-white mb-1">
                        <Info className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                        <span>{lib.meaningLabel}</span>
                      </div>
                      <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                        {item.simpleExplanation}
                      </p>
                    </div>

                    {/* 2: Why It Matters */}
                    <div className="mb-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                      <strong className="block text-[11px] font-bold text-slate-900 dark:text-slate-100 mb-0.5">
                        {lib.mattersLabel}
                      </strong>
                      <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                        {item.whyItMatters}
                      </p>
                    </div>

                    {/* 3: What Farmers Observe */}
                    <div className="mb-3 text-xs">
                      <strong className="block font-bold text-slate-900 dark:text-slate-100 mb-0.5 text-[11px]">
                        {lib.observeLabel}
                      </strong>
                      <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                        {item.whatFarmersCanObserve}
                      </p>
                    </div>
                  </div>

                  {/* 4: Scientific context */}
                  {item.scientificContext && (
                    <div className="mt-2 pt-3 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-500 dark:text-slate-400">
                      <strong className="text-emerald-700 dark:text-emerald-400 font-semibold">{lib.scienceLabel}: </strong>
                      <span>{item.scientificContext}</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
        
        {/* Myths vs Facts Scientific Accuracy Cards (Req #14) */}
        <div id="myths-facts" className="mt-16">
          <MythVsFactCards currentLang={currentLang} isDarkMode={isDarkMode} />
        </div>

        {/* Curated Field & Environment Photo Reference Gallery with Source Citations (Req #16) */}
        <div id="photo-gallery" className="mt-16">
          <PhotoAttributionGallery currentLang={currentLang} isDarkMode={isDarkMode} />
        </div>

      </div>
    </section>
  );
};
