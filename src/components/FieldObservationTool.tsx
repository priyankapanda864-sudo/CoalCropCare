import React, { useState, useEffect } from 'react';
import { Language, FieldObservation } from '../types';
import { translations } from '../data/translations';
import { Save, Trash2, RotateCcw, Download, Printer, CheckCircle2, AlertCircle, Search, Calendar, MapPin, Sprout, Ruler, Cloud, Database } from 'lucide-react';
import { auth, db, handleFirestoreError, OperationType } from '../firebase';
import { doc, setDoc, deleteDoc } from 'firebase/firestore';
import { FarmDiaryVisualizer } from './visuals/FarmDiaryVisualizer';

interface FieldObservationToolProps {
  currentLang: Language;
  isDarkMode: boolean;
  preFilledData?: {
    crop: string;
    fieldLocation: string;
    distance: string;
    date: string;
    notes: string;
  } | null;
}

const STORAGE_KEY = 'coalcrop_field_observations_v1';

export const FieldObservationTool: React.FC<FieldObservationToolProps> = ({
  currentLang,
  isDarkMode,
  preFilledData,
}) => {
  const t = translations[currentLang];
  const fl = t.fieldLog;

  // Form State
  const [farmerName, setFarmerName] = useState('');
  const [village, setVillage] = useState('');
  const [crop, setCrop] = useState('');
  const [date, setDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [fieldLocation, setFieldLocation] = useState('');
  const [distanceFromMine, setDistanceFromMine] = useState('');
  const [leafCondition, setLeafCondition] = useState('');
  const [soilCondition, setSoilCondition] = useState('');
  const [waterCondition, setWaterCondition] = useState('');
  const [additionalNotes, setAdditionalNotes] = useState('');

  // UI state for messages (no window.alert!)
  const [validationError, setValidationError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [searchFilter, setSearchFilter] = useState('');

  // Saved records
  const [observations, setObservations] = useState<FieldObservation[]>([]);

  // Default option values when language changes or mounts
  useEffect(() => {
    if (!crop) setCrop(fl.cropsList[0]);
    if (!fieldLocation) setFieldLocation(fl.locationOptions[0]);
    if (!distanceFromMine) setDistanceFromMine(fl.distanceOptions[1]);
    if (!leafCondition) setLeafCondition(fl.leafOptions[1]);
    if (!soilCondition) setSoilCondition(fl.soilOptions[0]);
    if (!waterCondition) setWaterCondition(fl.waterOptions[0]);
  }, [fl]);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        setObservations(JSON.parse(saved));
      } else {
        const initialExample: FieldObservation = {
          id: 'obs-demo-1',
          farmerName: 'Ramesh K.',
          village: 'Talcher Area',
          crop: 'Paddy / Rice',
          date: '2026-09-18',
          fieldLocation: 'Plot near road (80m from coal road)',
          distanceFromMine: '< 500m (Very close)',
          leafCondition: 'Thin black dust on top leaves; washed off easily after rain.',
          soilCondition: 'Moist clay soil, thin black dirt near water inlet.',
          waterCondition: 'Canal water was slightly grey after Tuesday rain.',
          additionalNotes: 'Rows of crops right next to road had more dust than the middle of the field. Tree border growing well.',
          createdAt: Date.now() - 86400000 * 6,
        };
        setObservations([initialExample]);
        localStorage.setItem(STORAGE_KEY, JSON.stringify([initialExample]));
      }
    } catch {
      // Ignore
    }
  }, []);

  // Update form if pre-filled data is provided from crop guide
  useEffect(() => {
    if (preFilledData) {
      if (preFilledData.crop) setCrop(preFilledData.crop);
      if (preFilledData.fieldLocation) setFieldLocation(preFilledData.fieldLocation);
      if (preFilledData.distance) setDistanceFromMine(preFilledData.distance);
      if (preFilledData.date) setDate(preFilledData.date);
      if (preFilledData.notes) setAdditionalNotes(preFilledData.notes);
    }
  }, [preFilledData]);

  const handleSaveObservation = (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError('');

    if (!farmerName.trim() || !village.trim()) {
      setValidationError(fl.nameVillageRequired);
      return;
    }

    const newRecord: FieldObservation = {
      id: `obs-${Date.now()}`,
      farmerName: farmerName.trim(),
      village: village.trim(),
      crop: crop || fl.cropsList[0],
      date,
      fieldLocation: fieldLocation || fl.locationOptions[0],
      distanceFromMine: distanceFromMine || fl.distanceOptions[1],
      leafCondition: leafCondition || fl.leafOptions[0],
      soilCondition: soilCondition || fl.soilOptions[0],
      waterCondition: waterCondition || fl.waterOptions[0],
      additionalNotes: additionalNotes.trim(),
      createdAt: Date.now(),
    };

    const updated = [newRecord, ...observations];
    setObservations(updated);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch {
      // Ignore quota error
    }

    // Sync to Firestore if user is signed in
    if (auth.currentUser) {
      const user = auth.currentUser;
      const docRef = doc(db, 'fieldObservations', newRecord.id);
      setDoc(docRef, {
        id: newRecord.id,
        userId: user.uid,
        farmerName: newRecord.farmerName,
        village: newRecord.village,
        crop: newRecord.crop,
        date: newRecord.date,
        fieldLocation: newRecord.fieldLocation,
        distanceFromMine: newRecord.distanceFromMine,
        leafCondition: newRecord.leafCondition,
        soilCondition: newRecord.soilCondition,
        waterCondition: newRecord.waterCondition,
        additionalNotes: newRecord.additionalNotes,
        createdAt: new Date().toISOString(),
      }).catch((err) => {
        console.warn('Could not sync observation to Firestore:', err);
      });
    }

    setSuccessMessage(fl.savedSuccessMsg);
    setTimeout(() => setSuccessMessage(''), 4500);

    // Keep farmer name & village for convenience, clear notes
    setAdditionalNotes('');
  };

  const handleClearForm = () => {
    setFarmerName('');
    setVillage('');
    setCrop(fl.cropsList[0]);
    setDate(new Date().toISOString().split('T')[0]);
    setFieldLocation(fl.locationOptions[0]);
    setDistanceFromMine(fl.distanceOptions[1]);
    setLeafCondition(fl.leafOptions[0]);
    setSoilCondition(fl.soilOptions[0]);
    setWaterCondition(fl.waterOptions[0]);
    setAdditionalNotes('');
    setValidationError('');
  };

  const handleDeleteObservation = async (id: string) => {
    const updated = observations.filter((o) => o.id !== id);
    setObservations(updated);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch {
      // Ignore
    }

    if (auth.currentUser) {
      try {
        await deleteDoc(doc(db, 'fieldObservations', id));
      } catch (err) {
        console.warn('Could not delete observation from Firestore:', err);
      }
    }
  };

  const handleExportCSV = () => {
    if (observations.length === 0) return;

    const headers = ['Date', 'Farmer Name', 'Village', 'Crop', 'Location', 'Distance', 'Leaf Condition', 'Soil Condition', 'Water Condition', 'Notes'];
    const rows = observations.map((o) => [
      `"${o.date}"`,
      `"${o.farmerName}"`,
      `"${o.village}"`,
      `"${o.crop}"`,
      `"${o.fieldLocation}"`,
      `"${o.distanceFromMine}"`,
      `"${o.leafCondition}"`,
      `"${o.soilCondition}"`,
      `"${o.waterCondition}"`,
      `"${o.additionalNotes.replace(/"/g, '""')}"`,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `coalcrop_field_records_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePrint = () => {
    window.print();
  };

  const filteredObservations = observations.filter((obs) => {
    const q = searchFilter.toLowerCase().trim();
    if (!q) return true;
    return (
      obs.farmerName.toLowerCase().includes(q) ||
      obs.village.toLowerCase().includes(q) ||
      obs.crop.toLowerCase().includes(q) ||
      obs.additionalNotes.toLowerCase().includes(q)
    );
  });

  return (
    <section id="field-log" className="py-16 border-t border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-10">
          <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 tracking-wider uppercase block mb-1">
            {fl.sectionTag}
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            {fl.title}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            {fl.desc}
          </p>
        </div>

        {/* Form Card */}
        <div className={`p-6 sm:p-8 rounded-2xl border transition-colors mb-12 ${
          isDarkMode ? 'bg-[#15211B] border-[#25392D]' : 'bg-white border-slate-200 shadow-sm'
        }`}>
          <div className="flex items-center justify-between gap-3 pb-6 border-b border-slate-200 dark:border-slate-800 mb-6">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              {fl.formTitle}
            </h3>
            <span className="text-xs text-slate-500 font-medium">
              * {currentLang === 'hi' ? 'जरूरी जानकारी' : currentLang === 'or' ? 'ଆବଶ୍ୟକ ତଥ୍ୟ' : 'Required fields'}
            </span>
          </div>

          {/* Validation Error Banner */}
          {validationError && (
            <div className="mb-6 p-4 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-rose-800 dark:text-rose-300 text-xs sm:text-sm flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{validationError}</span>
            </div>
          )}

          {/* Success Banner */}
          {successMessage && (
            <div className="mb-6 p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs sm:text-sm flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>{successMessage}</span>
            </div>
          )}

          <form onSubmit={handleSaveObservation} className="space-y-6">
            {/* Row 1: Farmer Name & Village */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  {fl.farmerNameLabel}
                </label>
                <input
                  type="text"
                  placeholder={fl.farmerNamePlaceholder}
                  value={farmerName}
                  onChange={(e) => { setFarmerName(e.target.value); setValidationError(''); }}
                  className="w-full text-xs sm:text-sm p-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-emerald-600 shadow-2xs"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  {fl.villageLabel}
                </label>
                <input
                  type="text"
                  placeholder={fl.villagePlaceholder}
                  value={village}
                  onChange={(e) => { setVillage(e.target.value); setValidationError(''); }}
                  className="w-full text-xs sm:text-sm p-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-emerald-600 shadow-2xs"
                />
              </div>
            </div>

            {/* Row 2: Crop, Date, Location, Distance */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  {fl.cropLabel}
                </label>
                <select
                  value={crop}
                  onChange={(e) => setCrop(e.target.value)}
                  className="w-full text-xs sm:text-sm p-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-emerald-600 cursor-pointer shadow-2xs"
                >
                  {fl.cropsList.map((c, idx) => (
                    <option key={idx} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  {fl.dateLabel}
                </label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full text-xs sm:text-sm p-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-emerald-600 cursor-pointer shadow-2xs"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  {fl.locationLabel}
                </label>
                <select
                  value={fieldLocation}
                  onChange={(e) => setFieldLocation(e.target.value)}
                  className="w-full text-xs sm:text-sm p-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-emerald-600 cursor-pointer shadow-2xs"
                >
                  {fl.locationOptions.map((loc, idx) => (
                    <option key={idx} value={loc}>
                      {loc}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  {fl.distanceLabel}
                </label>
                <select
                  value={distanceFromMine}
                  onChange={(e) => setDistanceFromMine(e.target.value)}
                  className="w-full text-xs sm:text-sm p-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-emerald-600 cursor-pointer shadow-2xs"
                >
                  {fl.distanceOptions.map((dist, idx) => (
                    <option key={idx} value={dist}>
                      {dist}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Row 3: Observations Dropdowns (Leaves, Soil, Water) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  {fl.leafLabel}
                </label>
                <select
                  value={leafCondition}
                  onChange={(e) => setLeafCondition(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-emerald-600 cursor-pointer shadow-2xs"
                >
                  {fl.leafOptions.map((opt, idx) => (
                    <option key={idx} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  {fl.soilLabel}
                </label>
                <select
                  value={soilCondition}
                  onChange={(e) => setSoilCondition(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-emerald-600 cursor-pointer shadow-2xs"
                >
                  {fl.soilOptions.map((opt, idx) => (
                    <option key={idx} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  {fl.waterLabel}
                </label>
                <select
                  value={waterCondition}
                  onChange={(e) => setWaterCondition(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-emerald-600 cursor-pointer shadow-2xs"
                >
                  {fl.waterOptions.map((opt, idx) => (
                    <option key={idx} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Row 4: Notes */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                {fl.notesLabel}
              </label>
              <textarea
                rows={3}
                placeholder={fl.notesPlaceholder}
                value={additionalNotes}
                onChange={(e) => setAdditionalNotes(e.target.value)}
                className="w-full text-xs sm:text-sm p-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-emerald-600 shadow-2xs"
              />
            </div>

            {/* Buttons */}
            <div className="flex flex-wrap items-center justify-end gap-3 pt-4 border-t border-slate-200 dark:border-slate-800">
              <button
                type="button"
                onClick={handleClearForm}
                className="px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>{fl.clearBtn}</span>
              </button>

              <button
                type="submit"
                className="px-5 py-2 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <Save className="w-3.5 h-3.5" />
                <span>{fl.saveBtn}</span>
              </button>
            </div>
          </form>
        </div>

        {/* Farm Diary Visual Charts: "Your recorded observations" (Req #12) */}
        <div className="mb-10">
          <FarmDiaryVisualizer
            currentLang={currentLang}
            isDarkMode={isDarkMode}
            observations={observations}
          />
        </div>

        {/* Saved Records Section */}
        <div className={`p-6 sm:p-8 rounded-2xl border transition-colors ${
          isDarkMode ? 'bg-[#15211B] border-[#25392D]' : 'bg-white border-slate-200 shadow-xs'
        }`}>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  {fl.savedHeading}
                </h3>
                <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300">
                  {observations.length} {fl.recordsCount}
                </span>
              </div>
            </div>

            {/* Search filter & Actions */}
            <div className="flex flex-wrap items-center gap-2">
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder={fl.searchPlaceholder}
                  value={searchFilter}
                  onChange={(e) => setSearchFilter(e.target.value)}
                  className="pl-8 pr-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-900 dark:text-white focus:outline-emerald-600"
                />
              </div>

              <button
                onClick={handleExportCSV}
                disabled={observations.length === 0}
                className="px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>{fl.exportCsvBtn}</span>
              </button>

              <button
                onClick={handlePrint}
                disabled={observations.length === 0}
                className="px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1 cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>{fl.printBtn}</span>
              </button>
            </div>
          </div>

          {/* Records Table / List */}
          {observations.length === 0 ? (
            <div className="py-12 text-center text-xs sm:text-sm text-slate-500">
              {fl.emptyLog}
            </div>
          ) : filteredObservations.length === 0 ? (
            <div className="py-10 text-center text-xs text-slate-500">
              {fl.emptySearch}
            </div>
          ) : (
            <div className="overflow-x-auto my-4">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 font-semibold">
                    <th className="py-2.5 px-3">{fl.dateCol}</th>
                    <th className="py-2.5 px-3">{fl.farmerCol}</th>
                    <th className="py-2.5 px-3">{fl.cropCol}</th>
                    <th className="py-2.5 px-3">{fl.obsCol}</th>
                    <th className="py-2.5 px-3 text-right">{fl.actionsCol}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 text-slate-700 dark:text-slate-300">
                  {filteredObservations.map((obs) => (
                    <tr key={obs.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                      <td className="py-3 px-3 whitespace-nowrap font-mono text-[11px]">
                        {obs.date}
                      </td>
                      <td className="py-3 px-3">
                        <strong className="block text-slate-900 dark:text-white font-semibold">
                          {obs.farmerName}
                        </strong>
                        <span className="text-[11px] text-slate-500">{obs.village}</span>
                      </td>
                      <td className="py-3 px-3">
                        <span className="font-semibold block text-emerald-800 dark:text-emerald-400">
                          {obs.crop}
                        </span>
                        <span className="text-[11px] text-slate-500">{obs.distanceFromMine}</span>
                      </td>
                      <td className="py-3 px-3 max-w-xs">
                        <div className="space-y-0.5 text-[11px]">
                          <div><span className="font-semibold text-slate-600 dark:text-slate-400">Leaf:</span> {obs.leafCondition}</div>
                          {obs.additionalNotes && (
                            <div className="text-slate-500 italic mt-0.5">"{obs.additionalNotes}"</div>
                          )}
                        </div>
                      </td>
                      <td className="py-3 px-3 text-right whitespace-nowrap">
                        <button
                          onClick={() => handleDeleteObservation(obs.id)}
                          className="p-1.5 rounded text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors cursor-pointer"
                          title={fl.deleteBtn}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

      </div>
    </section>
  );
};
