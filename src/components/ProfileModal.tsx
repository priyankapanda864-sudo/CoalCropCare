import React, { useState, useRef, useEffect } from 'react';
import { Language, UserProfile } from '../types';
import { translations } from '../data/translations';
import {
  Camera,
  Trash2,
  X,
  CheckCircle2,
  User,
  AlertCircle,
  Cloud,
  CloudCheck,
  LogIn,
  LogOut,
  Loader2,
  Database
} from 'lucide-react';
import { auth, db, signInWithGoogle, logOut, handleFirestoreError, OperationType } from '../firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  userProfile: UserProfile;
  onSaveProfile: (updated: UserProfile) => void;
  currentLang: Language;
  isDarkMode: boolean;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({
  isOpen,
  onClose,
  userProfile,
  onSaveProfile,
  currentLang,
  isDarkMode,
}) => {
  const t = translations[currentLang];
  const p = t.profile;

  const [currentUser, setCurrentUser] = useState<FirebaseUser | null>(auth.currentUser);
  const [name, setName] = useState(userProfile.name);
  const [grade, setGrade] = useState(userProfile.grade);
  const [school, setSchool] = useState(userProfile.school);
  const [role, setRole] = useState(userProfile.role);
  const [guideTeacher, setGuideTeacher] = useState(userProfile.guideTeacher);
  const [bio, setBio] = useState(userProfile.bio);
  const [photoUrl, setPhotoUrl] = useState<string | null>(userProfile.photoUrl);

  const [feedbackMsg, setFeedbackMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [isSigningIn, setIsSigningIn] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Sync form inputs when userProfile prop changes
  useEffect(() => {
    setName(userProfile.name);
    setGrade(userProfile.grade);
    setSchool(userProfile.school);
    setRole(userProfile.role);
    setGuideTeacher(userProfile.guideTeacher);
    setBio(userProfile.bio);
    setPhotoUrl(userProfile.photoUrl);
  }, [userProfile]);

  // Listen to Firebase Auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (user) {
        // Try fetching cloud profile
        try {
          const docRef = doc(db, 'userProfiles', user.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            const data = docSnap.data();
            if (data.name) setName(data.name);
            if (data.grade) setGrade(data.grade);
            if (data.school) setSchool(data.school);
            if (data.role) setRole(data.role);
            if (data.guideTeacher) setGuideTeacher(data.guideTeacher);
            if (data.bio) setBio(data.bio);
            if (data.photoUrl) setPhotoUrl(data.photoUrl);
          }
        } catch (err) {
          console.warn('Could not fetch cloud profile:', err);
        }
      }
    });

    return () => unsubscribe();
  }, []);

  if (!isOpen) return null;

  // Process selected image file with browser compression
  const handlePhotoSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setErrorMsg('Please select a valid image file (PNG, JPG, JPEG, WEBP).');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setErrorMsg('Image size exceeds 5MB. Please choose a smaller photo.');
      return;
    }

    setErrorMsg('');
    const reader = new FileReader();
    reader.onload = (readerEvent) => {
      const img = new Image();
      img.onload = () => {
        // Resize to standard avatar size (max 360x360) for optimal quality and fast Firestore & localStorage sync
        const canvas = document.createElement('canvas');
        const maxDim = 360;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > maxDim) {
            height = Math.round((height * maxDim) / width);
            width = maxDim;
          }
        } else {
          if (height > maxDim) {
            width = Math.round((width * maxDim) / height);
            height = maxDim;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.82);
          setPhotoUrl(compressedDataUrl);
          setFeedbackMsg(p.changePhoto);
          setTimeout(() => setFeedbackMsg(''), 2500);
        }
      };
      img.src = readerEvent.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const handleRemovePhoto = () => {
    setPhotoUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleGoogleSignIn = async () => {
    setIsSigningIn(true);
    setErrorMsg('');
    try {
      const user = await signInWithGoogle();
      setCurrentUser(user);
      setFeedbackMsg(`Signed in as ${user.displayName || user.email}`);
      setTimeout(() => setFeedbackMsg(''), 3000);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Sign-in failed. Please try again.';
      setErrorMsg(message);
    } finally {
      setIsSigningIn(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await logOut();
      setCurrentUser(null);
      setFeedbackMsg('Signed out of cloud database.');
      setTimeout(() => setFeedbackMsg(''), 2500);
    } catch (err: unknown) {
      console.error(err);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setErrorMsg('');

    const updated: UserProfile = {
      name: name.trim() || 'Pratik',
      grade: grade.trim() || 'Class 7',
      school: school.trim() || 'Talcher, Angul District, Odisha',
      role: role.trim() || 'Student Researcher & Team Lead',
      guideTeacher: guideTeacher.trim() || 'Science Teacher Guide',
      bio: bio.trim(),
      photoUrl,
    };

    // 1. Save locally to keep instant responsiveness
    onSaveProfile(updated);

    // 2. If signed in with Firebase, save persistently to Firestore Database!
    if (currentUser) {
      try {
        const docRef = doc(db, 'userProfiles', currentUser.uid);
        await setDoc(docRef, {
          userId: currentUser.uid,
          name: updated.name,
          grade: updated.grade,
          school: updated.school,
          role: updated.role,
          guideTeacher: updated.guideTeacher,
          bio: updated.bio,
          photoUrl: updated.photoUrl || null,
          updatedAt: new Date().toISOString(),
        });
        setFeedbackMsg(`${p.savedSuccess} ☁️ ${p.syncStatusCloud}`);
      } catch (err: unknown) {
        console.error('Firestore save failed:', err);
        try {
          handleFirestoreError(err, OperationType.WRITE, `userProfiles/${currentUser.uid}`);
        } catch {
          // Display friendly error
          setErrorMsg('Saved on this device. (Cloud sync permission error - please ensure email is verified)');
        }
      }
    } else {
      setFeedbackMsg(`${p.savedSuccess} 💾 ${p.syncStatusLocal}`);
    }

    setIsSaving(false);
    setTimeout(() => {
      setFeedbackMsg('');
      onClose();
    }, 1500);
  };

  const getInitials = (fullName: string) => {
    return fullName
      .split(' ')
      .map((n) => n[0])
      .filter(Boolean)
      .slice(0, 2)
      .join('')
      .toUpperCase() || 'P';
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200">
      <div
        className={`w-full max-w-lg rounded-2xl border shadow-2xl overflow-hidden transition-all max-h-[92vh] flex flex-col ${
          isDarkMode
            ? 'bg-[#15211B] border-[#25392D] text-slate-100'
            : 'bg-white border-slate-200 text-slate-900'
        }`}
      >
        {/* Modal Header */}
        <div className={`px-6 py-4 border-b flex items-center justify-between ${
          isDarkMode ? 'border-slate-800 bg-[#121C16]' : 'border-slate-100 bg-slate-50'
        }`}>
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-700 text-white flex items-center justify-center">
              <User className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white leading-tight">
                {p.modalTitle}
              </h3>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-[11px] text-emerald-700 dark:text-emerald-400 font-semibold">
                  {p.studentBadge}
                </span>
                <span className="text-slate-300 dark:text-slate-700">•</span>
                <span className="text-[11px] flex items-center gap-1 text-slate-500 dark:text-slate-400">
                  <Database className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                  {currentUser ? p.syncStatusCloud : p.syncStatusLocal}
                </span>
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-5 flex-1">
          {/* Status Banners */}
          {errorMsg && (
            <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-rose-800 dark:text-rose-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {feedbackMsg && (
            <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>{feedbackMsg}</span>
            </div>
          )}

          {/* Cloud Database Integration Banner */}
          <div className={`p-3.5 rounded-xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs ${
            currentUser
              ? isDarkMode
                ? 'bg-emerald-950/30 border-emerald-800/60 text-emerald-300'
                : 'bg-emerald-50 border-emerald-200 text-emerald-900'
              : isDarkMode
                ? 'bg-[#18261F] border-slate-800 text-slate-300'
                : 'bg-slate-50 border-slate-200 text-slate-700'
          }`}>
            <div className="flex items-center gap-2.5">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                currentUser ? 'bg-emerald-600 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
              }`}>
                {currentUser ? <CloudCheck className="w-4 h-4" /> : <Cloud className="w-4 h-4" />}
              </div>
              <div>
                <p className="font-semibold text-xs leading-snug">
                  {currentUser ? (
                    <span>Cloud Database: <strong>{currentUser.email || currentUser.displayName}</strong></span>
                  ) : (
                    <span>Firebase Cloud Database</span>
                  )}
                </p>
                <p className="text-[11px] opacity-80 leading-tight">
                  {currentUser ? p.syncStatusCloud : p.cloudSyncHelp}
                </p>
              </div>
            </div>

            <div className="shrink-0">
              {currentUser ? (
                <button
                  type="button"
                  onClick={handleSignOut}
                  className="px-2.5 py-1 rounded-lg border border-slate-300 dark:border-slate-700 text-[11px] font-medium hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <LogOut className="w-3 h-3" />
                  <span>{p.signOut}</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleGoogleSignIn}
                  disabled={isSigningIn}
                  className="px-3 py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-[11px] transition-colors flex items-center gap-1.5 shadow-xs cursor-pointer disabled:opacity-50"
                >
                  {isSigningIn ? (
                    <Loader2 className="w-3 h-3 animate-spin" />
                  ) : (
                    <LogIn className="w-3 h-3" />
                  )}
                  <span>{p.signInWithGoogle}</span>
                </button>
              )}
            </div>
          </div>

          {/* Photo Upload Zone */}
          <div className="flex flex-col sm:flex-row items-center gap-5 p-4 rounded-xl border border-dashed border-emerald-400/60 dark:border-emerald-700/60 bg-emerald-50/30 dark:bg-emerald-950/20">
            {/* Avatar Preview */}
            <div className="relative group shrink-0">
              <div className="w-24 h-24 rounded-full overflow-hidden border-3 border-emerald-600 dark:border-emerald-500 shadow-md bg-emerald-800 flex items-center justify-center text-white">
                {photoUrl ? (
                  <img
                    src={photoUrl}
                    alt={name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-2xl font-bold tracking-wider">
                    {getInitials(name)}
                  </span>
                )}
              </div>

              {/* Quick Camera Overlay */}
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                title={photoUrl ? p.changePhoto : p.uploadPhoto}
                className="absolute bottom-0 right-0 p-2 rounded-full bg-emerald-700 hover:bg-emerald-800 text-white shadow-md border-2 border-white dark:border-slate-900 transition-transform hover:scale-105 cursor-pointer"
              >
                <Camera className="w-4 h-4" />
              </button>
            </div>

            {/* Photo Action Buttons & Guidance */}
            <div className="flex-1 text-center sm:text-left space-y-2">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/png, image/jpeg, image/jpg, image/webp"
                onChange={handlePhotoSelect}
                className="hidden"
              />

              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="px-3.5 py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold shadow-xs flex items-center gap-1.5 cursor-pointer transition-colors"
                >
                  <Camera className="w-3.5 h-3.5" />
                  <span>{photoUrl ? p.changePhoto : p.uploadPhoto}</span>
                </button>

                {photoUrl && (
                  <button
                    type="button"
                    onClick={handleRemovePhoto}
                    className="px-3 py-1.5 rounded-lg border border-rose-300 dark:border-rose-800 text-rose-700 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 text-xs font-medium flex items-center gap-1 cursor-pointer transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>{p.removePhoto}</span>
                  </button>
                )}
              </div>

              <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                {p.photoHelp}
              </p>
            </div>
          </div>

          {/* Profile Form */}
          <form id="profile-edit-form" onSubmit={handleSave} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  {p.nameLabel}
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full text-xs sm:text-sm p-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-emerald-600 shadow-2xs"
                  placeholder="e.g. Priyanka Panda"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  {p.gradeLabel}
                </label>
                <input
                  type="text"
                  value={grade}
                  onChange={(e) => setGrade(e.target.value)}
                  className="w-full text-xs sm:text-sm p-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-emerald-600 shadow-2xs"
                  placeholder="e.g. Class 7"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  {p.schoolLabel}
                </label>
                <input
                  type="text"
                  value={school}
                  onChange={(e) => setSchool(e.target.value)}
                  className="w-full text-xs sm:text-sm p-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-emerald-600 shadow-2xs"
                  placeholder="e.g. Government High School, Talcher"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  {p.roleLabel}
                </label>
                <input
                  type="text"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full text-xs sm:text-sm p-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-emerald-600 shadow-2xs"
                  placeholder="e.g. Project Lead & Field Researcher"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                {p.guideTeacherLabel}
              </label>
              <input
                type="text"
                value={guideTeacher}
                onChange={(e) => setGuideTeacher(e.target.value)}
                className="w-full text-xs sm:text-sm p-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-emerald-600 shadow-2xs"
                placeholder="e.g. Science Teacher Guide"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                {p.bioLabel}
              </label>
              <textarea
                rows={2}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="w-full text-xs sm:text-sm p-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-emerald-600 shadow-2xs"
                placeholder="Short note about your research on coal mining and crops..."
              />
            </div>
          </form>
        </div>

        {/* Modal Footer */}
        <div className={`px-6 py-3 border-t flex items-center justify-between ${
          isDarkMode ? 'border-slate-800 bg-[#121C16]' : 'border-slate-100 bg-slate-50'
        }`}>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          >
            {p.closeBtn}
          </button>

          <button
            type="submit"
            form="profile-edit-form"
            disabled={isSaving}
            className="px-5 py-2 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
          >
            {isSaving ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>{p.saving}</span>
              </>
            ) : (
              <>
                <Database className="w-3.5 h-3.5" />
                <span>{p.saveProfileBtn}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
