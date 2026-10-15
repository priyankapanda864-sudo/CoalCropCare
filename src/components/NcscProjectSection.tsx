import React, { useState, useEffect } from 'react';
import { Language, UserProfile, FieldObservation } from '../types';
import { translations } from '../data/translations';
import { Award, Compass, Microscope, ClipboardList, BarChart3, CheckCircle2, Lightbulb, Calendar, Quote, Camera, User, School, BookOpen } from 'lucide-react';
import { ProjectDataCharts } from './visuals/ProjectDataCharts';

interface NcscProjectSectionProps {
  currentLang: Language;
  isDarkMode: boolean;
  userProfile: UserProfile;
  onOpenProfile: () => void;
}

export const NcscProjectSection: React.FC<NcscProjectSectionProps> = ({
  currentLang,
  isDarkMode,
  userProfile,
  onOpenProfile,
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'methodology' | 'findings' | 'actionPlan'>('overview');
  const [observations, setObservations] = useState<FieldObservation[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem('coalcrop_field_observations_v1');
      if (raw) {
        setObservations(JSON.parse(raw));
      }
    } catch {
      // Ignore
    }
  }, []);

  const t = translations[currentLang];
  const nc = t.ncsc;
  const p = t.profile;

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .filter(Boolean)
      .slice(0, 2)
      .join('')
      .toUpperCase() || 'P';
  };

  return (
    <section id="ncsc-project" className="py-16 border-t border-slate-200 dark:border-slate-800 transition-colors bg-emerald-50/20 dark:bg-emerald-950/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Project Header Banner */}
        <div className={`p-6 sm:p-8 rounded-2xl border mb-8 transition-colors ${
          isDarkMode ? 'bg-[#15211B] border-[#25392D]' : 'bg-white border-emerald-200 shadow-sm'
        }`}>
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 dark:text-emerald-400 mb-2">
                <Award className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />
                <span>{nc.congressTitle}</span>
              </div>
              
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                {nc.projectPrefix} {t.hero.title}
              </h2>

              <div className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300 flex flex-wrap items-center gap-x-4 gap-y-1">
                <span><strong>{nc.themeLabel}</strong> {t.hero.ncscTheme.replace('Theme: ', '').replace('ମୁଖ୍ୟ ବିଷୟ: ', '').replace('मुख्य विषय: ', '')}</span>
                <span aria-hidden="true" className="text-slate-300 dark:text-slate-600 hidden sm:inline">·</span>
                <span><strong>{nc.subThemeLabel}</strong> {t.hero.ncscSubtheme.replace('Sub-theme: ', '').replace('ଉପ-ବିଷୟ: ', '').replace('उप-विषय: ', '')}</span>
              </div>
            </div>

            <div className="flex items-center gap-2 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs self-start lg:self-auto">
              <Calendar className="w-4 h-4 text-emerald-600" />
              <div>
                <span className="text-slate-400 block text-[10px]">{nc.academicYearLabel}</span>
                <span className="font-bold text-slate-800 dark:text-slate-100">2026–27</span>
              </div>
            </div>
          </div>
        </div>

        {/* Student Researcher Profile Card with Interactive Photo Upload */}
        <div className={`p-6 rounded-2xl border mb-10 transition-colors ${
          isDarkMode ? 'bg-[#17261E] border-[#2A3E31]' : 'bg-gradient-to-r from-emerald-50/90 to-teal-50/50 border-emerald-200 shadow-xs'
        }`}>
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
            {/* Student Photo Avatar with Camera Button */}
            <div className="relative group shrink-0">
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden border-3 border-emerald-600 dark:border-emerald-500 shadow-md bg-emerald-800 flex items-center justify-center text-white">
                {userProfile.photoUrl ? (
                  <img
                    src={userProfile.photoUrl}
                    alt={userProfile.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center">
                    <User className="w-8 h-8 text-emerald-200 mb-1" />
                    <span className="text-sm font-bold tracking-wider">{getInitials(userProfile.name)}</span>
                  </div>
                )}
              </div>

              {/* Upload Photo Button Overlay */}
              <button
                type="button"
                onClick={onOpenProfile}
                title={userProfile.photoUrl ? p.changePhoto : p.uploadPhoto}
                className="absolute -bottom-2 -right-2 p-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white shadow-lg border-2 border-white dark:border-slate-900 transition-transform hover:scale-110 cursor-pointer flex items-center gap-1 text-[10px] font-semibold"
              >
                <Camera className="w-3.5 h-3.5" />
                <span className="hidden xs:inline">{userProfile.photoUrl ? p.changePhoto : p.uploadPhoto}</span>
              </button>
            </div>

            {/* Student Profile Info */}
            <div className="flex-1 text-center sm:text-left space-y-2">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-200/80 dark:bg-emerald-900/60 text-emerald-900 dark:text-emerald-300 mb-1">
                    <Award className="w-3 h-3" />
                    {p.studentBadge}
                  </span>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                    {userProfile.name}
                  </h3>
                </div>

                <button
                  type="button"
                  onClick={onOpenProfile}
                  className="px-3 py-1.5 rounded-lg border border-emerald-600 dark:border-emerald-500 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-600 hover:text-white transition-colors text-xs font-semibold self-center sm:self-auto flex items-center gap-1.5 cursor-pointer shadow-2xs"
                >
                  <Camera className="w-3.5 h-3.5" />
                  <span>{userProfile.photoUrl ? p.changePhoto : p.uploadPhoto}</span>
                </button>
              </div>

              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-4 gap-y-1 text-xs text-slate-600 dark:text-slate-300">
                <span className="font-semibold text-emerald-800 dark:text-emerald-400">{userProfile.grade}</span>
                <span aria-hidden="true" className="text-slate-300 dark:text-slate-600">·</span>
                <span>{userProfile.school}</span>
                <span aria-hidden="true" className="text-slate-300 dark:text-slate-600 hidden md:inline">·</span>
                <span className="hidden md:inline"><strong>Guide:</strong> {userProfile.guideTeacher}</span>
              </div>

              {userProfile.bio && (
                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 italic pt-1 leading-relaxed max-w-3xl">
                  "{userProfile.bio}"
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-100 dark:bg-slate-800 max-w-2xl mb-8 text-xs font-semibold border border-slate-200 dark:border-slate-700 overflow-x-auto">
          <button
            onClick={() => setActiveTab('overview')}
            className={`flex-1 py-2 px-3 rounded-lg whitespace-nowrap transition-all cursor-pointer ${
              activeTab === 'overview'
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            {nc.tabOverview}
          </button>
          <button
            onClick={() => setActiveTab('methodology')}
            className={`flex-1 py-2 px-3 rounded-lg whitespace-nowrap transition-all cursor-pointer ${
              activeTab === 'methodology'
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            {nc.tabMethodology}
          </button>
          <button
            onClick={() => setActiveTab('findings')}
            className={`flex-1 py-2 px-3 rounded-lg whitespace-nowrap transition-all cursor-pointer ${
              activeTab === 'findings'
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            {nc.tabFindings}
          </button>
          <button
            onClick={() => setActiveTab('actionPlan')}
            className={`flex-1 py-2 px-3 rounded-lg whitespace-nowrap transition-all cursor-pointer ${
              activeTab === 'actionPlan'
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            {nc.tabAction}
          </button>
        </div>

        {/* Tab 1: Aim & Hypothesis */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className={`p-6 rounded-2xl border ${
              isDarkMode ? 'bg-[#15211B] border-[#25392D]' : 'bg-white border-slate-200 shadow-xs'
            }`}>
              <div className="flex items-center gap-2 mb-3 text-emerald-700 dark:text-emerald-400">
                <Compass className="w-5 h-5" />
                <h3 className="text-base font-bold text-slate-900 dark:text-white">{nc.aimTitle}</h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {nc.aimText}
              </p>
            </div>

            <div className={`p-6 rounded-2xl border ${
              isDarkMode ? 'bg-[#15211B] border-[#25392D]' : 'bg-white border-slate-200 shadow-xs'
            }`}>
              <div className="flex items-center gap-2 mb-3 text-emerald-700 dark:text-emerald-400">
                <Microscope className="w-5 h-5" />
                <h3 className="text-base font-bold text-slate-900 dark:text-white">{nc.hypothesisTitle}</h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {nc.hypothesisText}
              </p>
            </div>
          </div>
        )}

        {/* Tab 2: Methodology & Survey */}
        {activeTab === 'methodology' && (
          <div className="space-y-6">
            <div className={`p-6 rounded-2xl border ${
              isDarkMode ? 'bg-[#15211B] border-[#25392D]' : 'bg-white border-slate-200 shadow-xs'
            }`}>
              <div className="flex items-center gap-2 mb-4 text-emerald-700 dark:text-emerald-400">
                <ClipboardList className="w-5 h-5" />
                <h3 className="text-base font-bold text-slate-900 dark:text-white">{nc.methodologyTitle}</h3>
              </div>
              <div className="space-y-3">
                {nc.methodologyList.map((step, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm">
                    <span className="w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span className="text-slate-600 dark:text-slate-300 leading-relaxed">{step}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className={`p-6 rounded-2xl border ${
              isDarkMode ? 'bg-[#15211B] border-[#25392D]' : 'bg-white border-slate-200 shadow-xs'
            }`}>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-3">
                {nc.surveyDetailsTitle}
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs mb-4">
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60">
                  <strong className="block text-slate-500 mb-1">{nc.targetAudienceLabel}</strong>
                  <span className="text-slate-800 dark:text-slate-200">{nc.surveyTarget}</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60">
                  <strong className="block text-slate-500 mb-1">{nc.sampleSizeLabel}</strong>
                  <span className="text-slate-800 dark:text-slate-200 font-bold">{nc.surveySample}</span>
                </div>
              </div>
              <div className="text-xs">
                <strong className="block text-slate-700 dark:text-slate-300 mb-2">{nc.keyQuestionsLabel}</strong>
                <ul className="space-y-1.5 text-slate-600 dark:text-slate-400 pl-4 list-disc">
                  {nc.surveyQuestions.map((q, idx) => (
                    <li key={idx}>{q}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Findings & Analysis */}
        {activeTab === 'findings' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className={`lg:col-span-6 p-6 rounded-2xl border ${
              isDarkMode ? 'bg-[#15211B] border-[#25392D]' : 'bg-white border-slate-200 shadow-xs'
            }`}>
              <div className="flex items-center gap-2 mb-4 text-emerald-700 dark:text-emerald-400">
                <BarChart3 className="w-5 h-5" />
                <h3 className="text-base font-bold text-slate-900 dark:text-white">{nc.observationsTitle}</h3>
              </div>
              <div className="space-y-3">
                {nc.observationsList.map((obs, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span className="text-slate-600 dark:text-slate-300 leading-relaxed">{obs}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className={`lg:col-span-6 p-6 rounded-2xl border ${
              isDarkMode ? 'bg-[#15211B] border-[#25392D]' : 'bg-white border-slate-200 shadow-xs'
            }`}>
              <div className="flex items-center gap-2 mb-4 text-emerald-700 dark:text-emerald-400">
                <Lightbulb className="w-5 h-5" />
                <h3 className="text-base font-bold text-slate-900 dark:text-white">{nc.resultsTitle}</h3>
              </div>
              <div className="space-y-3">
                {nc.resultsList.map((res, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 mt-2" />
                    <span className="text-slate-600 dark:text-slate-300 leading-relaxed">{res}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Project Data Charts Template (Req #13: Crop Types, Farmer Survey, Field Observations, Observation Dates) */}
            <div className="lg:col-span-12 mt-4">
              <ProjectDataCharts
                currentLang={currentLang}
                isDarkMode={isDarkMode}
                observations={observations}
              />
            </div>
          </div>
        )}

        {/* Tab 4: Solutions & Future Plan */}
        {activeTab === 'actionPlan' && (
          <div className="space-y-6">
            <div className={`p-6 rounded-2xl border ${
              isDarkMode ? 'bg-[#15211B] border-[#25392D]' : 'bg-white border-slate-200 shadow-xs'
            }`}>
              <h3 className="text-base font-bold text-slate-900 dark:text-white mb-4">
                {nc.solutionsTitle}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {nc.solutionsList.map((sol, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-emerald-50/50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 text-xs sm:text-sm text-slate-700 dark:text-slate-200 flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{sol}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className={`p-6 rounded-2xl border ${
              isDarkMode ? 'bg-[#15211B] border-[#25392D]' : 'bg-white border-slate-200 shadow-xs'
            }`}>
              <h3 className="text-base font-bold text-slate-900 dark:text-white mb-3">
                {nc.futureTitle}
              </h3>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300 pl-4 list-disc">
                {nc.futureList.map((f, idx) => (
                  <li key={idx} className="leading-relaxed">{f}</li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Student Team Quote / Teacher Acknowledgement */}
        <div className={`mt-8 p-5 rounded-xl border flex items-start gap-3.5 ${
          isDarkMode ? 'bg-[#17241C] border-[#263D2E]' : 'bg-white border-slate-200'
        }`}>
          <Quote className="w-6 h-6 text-emerald-600 shrink-0 mt-0.5" />
          <div className="text-xs sm:text-sm">
            <strong className="block text-slate-900 dark:text-white mb-1 font-bold">
              {nc.studentQuoteTitle}
            </strong>
            <p className="text-slate-600 dark:text-slate-300 italic mb-2 leading-relaxed">
              "{nc.studentQuoteBody}"
            </p>
            <span className="text-[11px] font-semibold text-emerald-700 dark:text-emerald-400 block">
              — {userProfile.name} & {userProfile.guideTeacher} · {nc.congressTitle}
            </span>
          </div>
        </div>

      </div>
    </section>
  );
};
