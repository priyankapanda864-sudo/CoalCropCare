import React, { useState } from 'react';
import { Language } from '../../types';
import { translations } from '../../data/translations';
import { Camera, Image as ImageIcon, ExternalLink, ShieldCheck, Check } from 'lucide-react';

interface PhotoAttributionGalleryProps {
  currentLang: Language;
  isDarkMode: boolean;
}

export const PhotoAttributionGallery: React.FC<PhotoAttributionGalleryProps> = ({
  currentLang,
  isDarkMode,
}) => {
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);
  const t = translations[currentLang];
  const pg = t.visuals.photoGallery;

  return (
    <div
      className={`p-6 sm:p-8 rounded-2xl border transition-all duration-200 ${
        isDarkMode ? 'bg-[#15211B] border-[#25392D]' : 'bg-white border-slate-200/90 shadow-sm'
      }`}
    >
      {/* Title */}
      <div className="max-w-3xl mb-8">
        <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 mb-1">
          <Camera className="w-3.5 h-3.5" />
          <span>Curated Visual Evidence Archive</span>
        </div>
        <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
          {pg.title}
        </h3>
        <p className="mt-1 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
          {pg.subtitle}
        </p>
      </div>

      {/* Photo Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        {pg.photos.map((item, idx) => (
          <div
            key={item.id}
            className={`rounded-2xl border overflow-hidden transition-all duration-200 flex flex-col justify-between group hover:-translate-y-0.5 ${
              isDarkMode
                ? 'bg-[#18271F] border-slate-800 hover:border-emerald-600/50'
                : 'bg-white border-slate-200 hover:border-emerald-300 hover:shadow-xs'
            }`}
          >
            <div>
              {/* Image with zoom on hover */}
              <div className="relative aspect-4/3 overflow-hidden bg-slate-900">
                <img
                  src={item.url}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-md text-[10px] font-bold bg-black/75 text-white backdrop-blur-xs border border-white/20">
                  {item.category}
                </div>
              </div>

              {/* Title & Caption */}
              <div className="p-4">
                <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-1.5 leading-snug">
                  {item.title}
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-3">
                  {item.caption}
                </p>
              </div>
            </div>

            {/* Attribution Footnote Required by Prompt */}
            <div
              className={`px-4 py-2.5 border-t text-[11px] flex items-center justify-between gap-2 ${
                isDarkMode ? 'bg-[#142019] border-slate-800 text-slate-400' : 'bg-slate-50 border-slate-100 text-slate-500'
              }`}
            >
              <span className="truncate">
                <strong>Source: </strong>
                {item.source}
              </span>
              <span className="shrink-0 text-emerald-600 dark:text-emerald-400 text-[10px] font-semibold">
                Verified
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* General Educational Notice Required by Prompt */}
      <div
        className={`p-4 rounded-xl border text-xs ${
          isDarkMode
            ? 'bg-[#18231C] border-[#25392D] text-slate-300'
            : 'bg-slate-50 border-slate-200 text-slate-600'
        }`}
      >
        <p className="leading-relaxed">
          {pg.generalNotice}
        </p>
      </div>
    </div>
  );
};
