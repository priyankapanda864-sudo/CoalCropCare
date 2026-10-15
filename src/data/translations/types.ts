export interface NavTranslations {
  home: string;
  aboutCoal: string;
  cropEffects: string;
  leafStudy: string;
  soilWater: string;
  observationGuide: string;
  solutions: string;
  fieldLog: string;
  library: string;
  ncscProject: string;
  faq: string;
  help: string;
}

export interface HotspotItem {
  id: string;
  x: number;
  y: number;
  title: string;
  description: string;
  category: string;
}

export interface QuickCardItem {
  id: string;
  title: string;
  desc: string;
}

export interface HeroTranslations {
  ncscBadge: string;
  ncscTheme: string;
  ncscSubtheme: string;
  viewReportBtn: string;
  title: string;
  subTitle: string;
  tagline: string;
  exploreBtn: string;
  howHarmsBtn: string;
  landscapeHeader: string;
  landscapeHint: string;
  landscapeTag: string;
  whatYouSee: string;
  chooseSpot: string;
  hotspots: HotspotItem[];
  quickCards: QuickCardItem[];
  readMore: string;
  disclaimerTitle: string;
  disclaimerBody: string;
}

export interface FlowStep {
  stepNumber: string;
  stageName: string;
  title: string;
  simpleDescription: string;
  mechanism: string;
  keyFactors: string[];
}

export interface MiningTabContent {
  title: string;
  badge: string;
  desc: string;
  points: { title: string; desc: string }[];
}

export interface AboutCoalTranslations {
  sectionTag: string;
  title: string;
  desc: string;
  diagramTitle: string;
  diagramSubtitle: string;
  whatIsCoalTitle: string;
  whatIsCoalDesc: string;
  whatIsDustTitle: string;
  whatIsDustDesc: string;
  tabs: {
    opencastBtn: string;
    undergroundBtn: string;
    transportBtn: string;
    opencast: MiningTabContent;
    underground: MiningTabContent;
    transport: MiningTabContent;
  };
  flowSectionTitle: string;
  flowSectionDesc: string;
  flowSteps: FlowStep[];
  stepOf: string;
  prevBtn: string;
  nextBtn: string;
  mechanismLabel: string;
  keyFactorsLabel: string;
  whyCareLabel: string;
  whyCareDesc: string;
  exploreEffectsBtn: string;
}

export interface CropEffectTopicItem {
  id: string;
  title: string;
  cause: string;
  whatMayHappen: string;
  whatFarmersCanObserve: string;
  caveatNote: string;
}

export interface CropEffectsTranslations {
  sectionTag: string;
  title: string;
  desc: string;
  detailTag: string;
  guideTag: string;
  checkLeafBtn: string;
  step1Tag: string;
  step1Title: string;
  step1Footer: string;
  step2Tag: string;
  step2Title: string;
  step2Footer: string;
  step3Tag: string;
  step3Title: string;
  step3Footer: string;
  ruleTitle: string;
  topics: CropEffectTopicItem[];
}

export interface LeafSimTranslations {
  sectionTag: string;
  title: string;
  desc: string;
  toolTag: string;
  tryTag: string;
  tabPhoto: string;
  tabPores: string;
  leftClean: string;
  rightDusty: string;
  dustOnLeaf: string;
  washBtn: string;
  washingMsg: string;
  microscopeTag: string;
  stomaTitle: string;
  stomaDesc: string;
  blockedPoreText: string;
  healthyPoreText: string;
  stomaFooter: string;
  photoCaption: string;
  sliderHeading: string;
  sliderHint: string;
  sliderLabel: string;
  dust0: string;
  dust50: string;
  dust100: string;
  metric1Title: string;
  metric1Desc: string;
  metric2Title: string;
  metric2Desc: string;
  metric3Title: string;
  metric3Desc: string;
  farmerCalloutTitle: string;
  farmerCalloutDesc: string;
  tableTitle: string;
  thLook: string;
  thClean: string;
  thDusty: string;
  thHowCheck: string;
  rows: { look: string; clean: string; dusty: string; check: string }[];
  tableNote: string;
}

export interface SoilWaterCard {
  title: string;
  desc: string;
  actionTitle: string;
  actionDesc: string;
}

export interface SoilWaterChecklistItem {
  id: string;
  category: 'soil' | 'water';
  question: string;
  explanation: string;
  whatToDo: string;
}

export interface SoilWaterTranslations {
  sectionTag: string;
  title: string;
  desc: string;
  cards: SoilWaterCard[];
  checklistTitle: string;
  checklistDesc: string;
  checkedStatus: string;
  whatToDoLabel: string;
  whyHappensLabel: string;
  items: SoilWaterChecklistItem[];
  acidBoxTitle: string;
  acidBoxDesc: string;
  labAdviceLabel: string;
  labAdviceDesc: string;
}

export interface CropGuideItemTranslation {
  name: string;
  scientificName: string;
  category: string;
  leafTexture: string;
  typicalSeason: string;
  vulnerabilityFactors: string[];
  keyObservationPoints: string[];
}

export interface StandardPoint {
  id: string;
  title: string;
  question: string;
  guide: string;
}

export interface CropGuideTranslations {
  sectionTag: string;
  title: string;
  desc: string;
  cropSelectLabel: string;
  locationLabel: string;
  distanceLabel: string;
  dateLabel: string;
  locations: string[];
  distances: string[];
  crops: CropGuideItemTranslation[];
  leafTypeLabel: string;
  seasonLabel: string;
  vulnerabilitiesTitle: string;
  keyPointsTitle: string;
  checklistTitle: string;
  checkHint: string;
  sendToLogBtn: string;
  standardPoints: StandardPoint[];
}

export interface PracticeItem {
  id: string;
  title: string;
  category: string;
  description: string;
  lowCostBenefit: string;
}

export interface FarmerSolutionsTranslations {
  sectionTag: string;
  title: string;
  desc: string;
  tabPractices: string;
  tabShelterbelt: string;
  practices: PracticeItem[];
  benefitLabel: string;
  shelterbeltTitle: string;
  shelterbeltDesc: string;
  treeLayersTitle: string;
  layers: { name: string; trees: string; role: string }[];
  goldenRulesTitle: string;
  goldenRules: string[];
}

export interface FieldLogTranslations {
  sectionTag: string;
  title: string;
  desc: string;
  formTitle: string;
  farmerNameLabel: string;
  farmerNamePlaceholder: string;
  villageLabel: string;
  villagePlaceholder: string;
  cropLabel: string;
  dateLabel: string;
  locationLabel: string;
  distanceLabel: string;
  leafLabel: string;
  soilLabel: string;
  waterLabel: string;
  notesLabel: string;
  notesPlaceholder: string;
  saveBtn: string;
  clearBtn: string;
  savedHeading: string;
  searchPlaceholder: string;
  exportCsvBtn: string;
  printBtn: string;
  recordsCount: string;
  emptySearch: string;
  emptyLog: string;
  nameVillageRequired: string;
  savedSuccessMsg: string;
  deleteBtn: string;
  dateCol: string;
  farmerCol: string;
  cropCol: string;
  distCol: string;
  obsCol: string;
  actionsCol: string;
  cropsList: string[];
  locationOptions: string[];
  distanceOptions: string[];
  leafOptions: string[];
  soilOptions: string[];
  waterOptions: string[];
}

export interface LibraryItemTranslation {
  id: string;
  category: string;
  title: string;
  simpleExplanation: string;
  whyItMatters: string;
  whatFarmersCanObserve: string;
  scientificContext?: string;
}

export interface LibraryTranslations {
  sectionTag: string;
  title: string;
  desc: string;
  searchPlaceholder: string;
  clearBtn: string;
  categories: { id: string; label: string }[];
  meaningLabel: string;
  mattersLabel: string;
  observeLabel: string;
  scienceLabel: string;
  noResults: string;
  showingResults: string;
  items: LibraryItemTranslation[];
}

export interface FaqItemTranslation {
  question: string;
  answer: string;
  category: string;
}

export interface FaqTranslations {
  sectionTag: string;
  title: string;
  desc: string;
  searchPlaceholder: string;
  items: FaqItemTranslation[];
  noResults: string;
}

export interface NcscTranslations {
  sectionTag: string;
  congressTitle: string;
  projectPrefix: string;
  themeLabel: string;
  subThemeLabel: string;
  academicYearLabel: string;
  tabOverview: string;
  tabMethodology: string;
  tabFindings: string;
  tabAction: string;
  aimTitle: string;
  hypothesisTitle: string;
  methodologyTitle: string;
  surveyDetailsTitle: string;
  targetAudienceLabel: string;
  sampleSizeLabel: string;
  keyQuestionsLabel: string;
  observationsTitle: string;
  analysisTitle: string;
  resultsTitle: string;
  solutionsTitle: string;
  futureTitle: string;
  studentQuoteTitle: string;
  studentQuoteBody: string;
  studentQuoteAuthor: string;
  aimText: string;
  hypothesisText: string;
  methodologyList: string[];
  surveyTarget: string;
  surveySample: string;
  surveyQuestions: string[];
  observationsList: string[];
  analysisList: string[];
  resultsList: string[];
  solutionsList: string[];
  futureList: string[];
}

export interface HelpTranslations {
  sectionTag: string;
  title: string;
  desc: string;
  contactHeader: string;
  tipsTitle: string;
  institutions: { name: string; role: string; description: string; actionNote: string }[];
  samplingTips: { title: string; desc: string }[];
}

export interface FooterTranslations {
  siteTitle: string;
  quote: string;
  ncscCredit: string;
  backToTop: string;
  copyright: string;
  disclaimer: string;
}

export interface ProfileTranslations {
  modalTitle: string;
  uploadPhoto: string;
  changePhoto: string;
  removePhoto: string;
  photoHelp: string;
  nameLabel: string;
  gradeLabel: string;
  schoolLabel: string;
  roleLabel: string;
  guideTeacherLabel: string;
  bioLabel: string;
  saveProfileBtn: string;
  savedSuccess: string;
  closeBtn: string;
  viewProfileTooltip: string;
  studentBadge: string;
  syncStatusCloud: string;
  syncStatusLocal: string;
  signInWithGoogle: string;
  signOut: string;
  cloudSyncHelp: string;
  saving: string;
}

export interface VisualTranslations {
  heroBanner: {
    ecoTrio: string;
    caption: string;
  };
  coalMiningDiagram: {
    title: string;
    subtitle: string;
    stepPrompt: string;
    steps: {
      id: string;
      title: string;
      desc: string;
      iconName: string;
      farmerNote: string;
    }[];
  };
  mineToFarm: {
    title: string;
    subtitle: string;
    airPathwayTitle: string;
    waterPathwayTitle: string;
    airSteps: { icon: string; title: string; desc: string }[];
    waterSteps: { icon: string; title: string; desc: string }[];
    studentNote: string;
  };
  leafComparison: {
    title: string;
    subtitle: string;
    cleanTitle: string;
    cleanDesc: string;
    cleanBullet: string;
    dustyTitle: string;
    dustyDesc: string;
    dustyBullet: string;
    scientificQuote: string;
    disclaimer: string;
  };
  soilDiagram: {
    title: string;
    subtitle: string;
    crossSectionTitle: string;
    labels: {
      plant: string;
      roots: string;
      soil: string;
      topsoil: string;
      subsoil: string;
      water: string;
      air: string;
      nutrients: string;
    };
    healthyTitle: string;
    healthyPoints: string[];
    disturbedTitle: string;
    disturbedPoints: string[];
    scientificCareNote: string;
  };
  waterFlow: {
    title: string;
    subtitle: string;
    steps: { title: string; desc: string; icon: string }[];
    mainExplanation: string;
    scientificCarefulNote: string;
  };
  observationInfographic: {
    title: string;
    subtitle: string;
    clickPrompt: string;
    items: {
      id: string;
      title: string;
      icon: string;
      whatToObserve: string;
      whyImportant: string;
      actionTip: string;
    }[];
  };
  cropHealthCards: {
    title: string;
    subtitle: string;
    possibleCausesLabel: string;
    whatToCheckLabel: string;
    cards: {
      id: string;
      title: string;
      icon: string;
      explanation: string;
      possibleCauses: string;
      whatToCheck: string;
      urgency: string;
    }[];
  };
  weatherVisuals: {
    title: string;
    subtitle: string;
    dry: { title: string; desc: string; impact: string };
    wind: { title: string; desc: string; impact: string };
    rain: { title: string; desc: string; impact: string };
  };
  farmerActions7: {
    title: string;
    subtitle: string;
    cards: {
      key: string;
      icon: string;
      title: string;
      action: string;
      detail: string;
    }[];
  };
  fieldMap: {
    title: string;
    subtitle: string;
    instruction: string;
    zones: {
      mine: { name: string; desc: string };
      dust: { name: string; desc: string };
      farm: { name: string; desc: string };
      water: { name: string; desc: string };
      village: { name: string; desc: string };
    };
    bufferTrees: string;
    disclaimer: string;
  };
  farmDiaryCharts: {
    title: string;
    badge: string;
    observationsOverTime: string;
    totalCount: string;
    leafConditions: string;
    soilConditions: string;
    waterConditions: string;
    noDataPrompt: string;
    footerNote: string;
  };
  projectDataCharts: {
    title: string;
    subtitle: string;
    emptyNotice: string;
    cropDistribution: string;
    farmerSurveys: string;
    fieldObservations: string;
    observationTimeline: string;
  };
  mythsVsFacts: {
    title: string;
    subtitle: string;
    mythLabel: string;
    factLabel: string;
    cards: {
      myth: string;
      fact: string;
      scienceExplanation: string;
    }[];
  };
  knowledgeGrid: {
    title: string;
    searchPlaceholder: string;
    topicsCount: string;
    allTopics: string;
  };
  photoGallery: {
    title: string;
    subtitle: string;
    attributionTitle: string;
    generalNotice: string;
    photos: {
      id: string;
      title: string;
      category: string;
      url: string;
      caption: string;
      source: string;
    }[];
  };
}

export interface AppTranslation {
  nav: NavTranslations;
  hero: HeroTranslations;
  aboutCoal: AboutCoalTranslations;
  cropEffects: CropEffectsTranslations;
  leafSim: LeafSimTranslations;
  soilWater: SoilWaterTranslations;
  cropGuide: CropGuideTranslations;
  solutions: FarmerSolutionsTranslations;
  fieldLog: FieldLogTranslations;
  library: LibraryTranslations;
  faq: FaqTranslations;
  ncsc: NcscTranslations;
  help: HelpTranslations;
  footer: FooterTranslations;
  profile: ProfileTranslations;
  visuals: VisualTranslations;
}

