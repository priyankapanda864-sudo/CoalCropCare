import React, { useState, useEffect } from 'react';
import { Language, UserProfile } from './types';
import { translations } from './data/translations';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutCoal } from './components/AboutCoal';
import { CropEffects } from './components/CropEffects';
import { LeafDustSimulation } from './components/LeafDustSimulation';
import { SoilWaterSection } from './components/SoilWaterSection';
import { CropObservationGuide } from './components/CropObservationGuide';
import { FarmerSolutions } from './components/FarmerSolutions';
import { FieldObservationTool } from './components/FieldObservationTool';
import { KnowledgeLibrary } from './components/KnowledgeLibrary';
import { FaqSection } from './components/FaqSection';
import { NcscProjectSection } from './components/NcscProjectSection';
import { HelpContactSection } from './components/HelpContactSection';
import { Footer } from './components/Footer';
import { ProfileModal } from './components/ProfileModal';
import { AmbientBackground } from './components/visuals/AmbientBackground';
import { ArrowUp } from 'lucide-react';
import { auth, db, testConnection } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

const LANGUAGE_STORAGE_KEY = 'selectedLanguage';
const PROFILE_STORAGE_KEY = 'coalcrop_user_profile';

const DEFAULT_PROFILE: UserProfile = {
  name: 'Pratik',
  grade: 'Class 7',
  school: 'Talcher / Angul District, Odisha',
  role: 'Student Researcher & Project Lead',
  guideTeacher: 'Science Teacher Guide',
  bio: 'Class 7 student conducting research for National Children\'s Science Congress (NCSC 2026–27) under Food, Agriculture & Health to help local farmers protect crops near coal mines.',
  photoUrl: null,
};

export default function App() {
  const [currentLang, setCurrentLang] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem(LANGUAGE_STORAGE_KEY);
      if (saved === 'hi' || saved === 'or' || saved === 'en') {
        return saved as Language;
      }
    } catch {
      // Ignore
    }
    return 'en';
  });

  const [userProfile, setUserProfile] = useState<UserProfile>(() => {
    try {
      const saved = localStorage.getItem(PROFILE_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.name === 'Priyanka Panda' || !parsed.name) {
          parsed.name = 'Pratik';
        }
        return { ...DEFAULT_PROFILE, ...parsed };
      }
    } catch {
      // Ignore
    }
    return DEFAULT_PROFILE;
  });

  const [isProfileModalOpen, setIsProfileModalOpen] = useState<boolean>(false);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [showFloatingTop, setShowFloatingTop] = useState<boolean>(false);

  // Pre-fill state passed from Crop Guide to Field Log
  const [preFilledLogData, setPreFilledLogData] = useState<{
    crop: string;
    fieldLocation: string;
    distance: string;
    date: string;
    notes: string;
  } | null>(null);

  // Test connection to Firestore on initial boot as required by Firestore integration skill
  useEffect(() => {
    testConnection();
  }, []);

  // Listen to Auth state and load cloud profile if signed in
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const docRef = doc(db, 'userProfiles', user.uid);
          const snap = await getDoc(docRef);
          if (snap.exists()) {
            const cloudData = snap.data();
            setUserProfile((prev) => {
              const merged: UserProfile = {
                ...prev,
                name: cloudData.name || prev.name,
                grade: cloudData.grade || prev.grade,
                school: cloudData.school || prev.school,
                role: cloudData.role || prev.role,
                guideTeacher: cloudData.guideTeacher || prev.guideTeacher,
                bio: cloudData.bio !== undefined ? cloudData.bio : prev.bio,
                photoUrl: cloudData.photoUrl !== undefined ? cloudData.photoUrl : prev.photoUrl,
              };
              try {
                localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(merged));
              } catch {
                // Ignore
              }
              return merged;
            });
          }
        } catch (err) {
          console.warn('Could not load profile from Firestore:', err);
        }
      }
    });

    return () => unsubscribe();
  }, []);

  // Sync document language and meta title
  useEffect(() => {
    try {
      localStorage.setItem(LANGUAGE_STORAGE_KEY, currentLang);
    } catch {
      // Ignore
    }

    document.documentElement.lang = currentLang;
    const t = translations[currentLang];
    document.title = `${t.hero.title} – ${t.hero.subTitle}`;
  }, [currentLang]);

  // Dark mode class toggle on documentElement
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Floating top button visibility on scroll
  useEffect(() => {
    const handleScroll = () => {
      setShowFloatingTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLanguageChange = (lang: Language) => {
    setCurrentLang(lang);
  };

  const handleSaveProfile = (updated: UserProfile) => {
    setUserProfile(updated);
    try {
      localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(updated));
    } catch {
      // Ignore
    }
  };

  const handleNavigate = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const topOffset = element.getBoundingClientRect().top + window.scrollY - 70;
      window.scrollTo({ top: topOffset, behavior: 'smooth' });
    }
  };

  const handlePreFillLog = (data: {
    crop: string;
    fieldLocation: string;
    distance: string;
    date: string;
    notes: string;
  }) => {
    setPreFilledLogData(data);
    handleNavigate('field-log');
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className={`min-h-screen relative transition-colors duration-200 ${
      isDarkMode ? 'bg-[#0E1511] text-slate-100' : 'bg-[#FBFDF9] text-slate-900'
    }`}>
      {/* Subtle Atmospheric Ambient Background Graphics */}
      <AmbientBackground isDarkMode={isDarkMode} />

      {/* 3-Zone Top Bar Navigation with Language Selector & Profile Photo Avatar */}
      <Navbar
        currentLang={currentLang}
        onLanguageChange={handleLanguageChange}
        isDarkMode={isDarkMode}
        onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
        onNavigate={handleNavigate}
        userProfile={userProfile}
        onOpenProfile={() => setIsProfileModalOpen(true)}
      />

      {/* Main Content */}
      <main>
        {/* 1. Hero with Agricultural Landscape & Quick Cards */}
        <Hero
          currentLang={currentLang}
          onNavigate={handleNavigate}
          isDarkMode={isDarkMode}
        />

        {/* 2. About Coal, Mining Methods, & From Mine to Farm Visual Flow */}
        <AboutCoal
          currentLang={currentLang}
          isDarkMode={isDarkMode}
          onNavigate={handleNavigate}
        />

        {/* 3. How Coal Mining Can Affect Crops (Cause -> May Happen -> Observe) */}
        <CropEffects
          currentLang={currentLang}
          isDarkMode={isDarkMode}
          onNavigate={handleNavigate}
        />

        {/* 4. Effect of Coal Dust on Leaves (Interactive Simulator & Comparison) */}
        <LeafDustSimulation
          currentLang={currentLang}
          isDarkMode={isDarkMode}
        />

        {/* 5. Soil & Water Knowledge and Checklist */}
        <SoilWaterSection
          currentLang={currentLang}
          isDarkMode={isDarkMode}
          onNavigate={handleNavigate}
        />

        {/* 6. Crop Observation Guide (Interactive Selector & Dynamic Checklist) */}
        <CropObservationGuide
          currentLang={currentLang}
          isDarkMode={isDarkMode}
          onPreFillLog={handlePreFillLog}
        />

        {/* 7. What Can Farmers Do? Practical & Sustainable Solutions */}
        <FarmerSolutions
          currentLang={currentLang}
          isDarkMode={isDarkMode}
          onNavigate={handleNavigate}
        />

        {/* 8. Field Record / Observation Tool ("My Field Observation" with LocalStorage) */}
        <FieldObservationTool
          currentLang={currentLang}
          isDarkMode={isDarkMode}
          preFilledData={preFilledLogData}
        />

        {/* 9. Searchable Knowledge Library */}
        <KnowledgeLibrary
          currentLang={currentLang}
          isDarkMode={isDarkMode}
        />

        {/* 10. Expandable FAQ Accordion */}
        <FaqSection
          currentLang={currentLang}
          isDarkMode={isDarkMode}
        />

        {/* 11. Dedicated NCSC 2026-27 School Project Section with Student Profile & Photo Upload */}
        <NcscProjectSection
          currentLang={currentLang}
          isDarkMode={isDarkMode}
          userProfile={userProfile}
          onOpenProfile={() => setIsProfileModalOpen(true)}
        />

        {/* 12. Need More Help? Official Agricultural Extension Contacts */}
        <HelpContactSection
          currentLang={currentLang}
          isDarkMode={isDarkMode}
        />
      </main>

      {/* Footer with Project Context and Navigation */}
      <Footer
        currentLang={currentLang}
        isDarkMode={isDarkMode}
        onNavigate={handleNavigate}
      />

      {/* Profile Photo & Student Details Modal */}
      <ProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        userProfile={userProfile}
        onSaveProfile={handleSaveProfile}
        currentLang={currentLang}
        isDarkMode={isDarkMode}
      />

      {/* Floating Back-to-Top Button */}
      {showFloatingTop && (
        <button
          onClick={scrollToTop}
          aria-label="Scroll back to top"
          className="fixed bottom-6 right-6 p-3 rounded-full bg-emerald-700 hover:bg-emerald-800 text-white shadow-lg transition-all duration-200 z-30 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 cursor-pointer"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}
    </div>
  );
}
