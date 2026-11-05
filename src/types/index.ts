export type Language = 'te' | 'hi' | 'en';

export interface SafetyChecklist {
  mcbOff: boolean;
  testerUsed: boolean;
  notWorkingLive: boolean;
}

export interface JobAnalysisResult {
  job_title: string;
  trade: string;
  tasks_done: string[];
  materials_tools: string[];
  mistakes_caught: string[];
  safety_checks: string[];
  skill_tags: string[];
  quality_score: number;
  quality_reasons: [string, string, string];
  before_after_notes: string;
  customer_summary_telugu: string;
  customer_summary_english: string;
  follow_up_advice: string[];
  disclaimer?: string;
}

export interface JobRecord {
  id: string;
  technicianId: string;
  title: string;
  trade: string;
  date: string;
  durationSeconds: number;
  beforePhoto?: string;
  afterPhoto?: string;
  qualityScore: number;
  qualityReasons: string[];
  mistakesCaught: string[];
  safetyChecksPassed: string[];
  skillTags: string[];
  tasksDone: string[];
  materialsUsed: string[];
  customerSummaryTelugu: string;
  customerSummaryEnglish: string;
  followUpAdvice: string[];
  isDemo?: boolean;
}

export interface SkillBadge {
  id: string;
  title: {
    te: string;
    hi: string;
    en: string;
  };
  icon: string;
  verifiedJobsCount: number;
  category: 'safety' | 'wiring' | 'appliances' | 'distribution';
  description: {
    te: string;
    hi: string;
    en: string;
  };
  source?: 'job_verified' | 'skill_test' | 'both';
  testPassedDate?: string;
}

export interface SkillTestQuestion {
  id: string;
  question: {
    te: string;
    hi: string;
    en: string;
  };
  options: {
    te: string[];
    hi: string[];
    en: string[];
  };
  correctIndex: number;
  explanation: {
    te: string;
    hi: string;
    en: string;
  };
}

export interface SkillTest {
  id: string;
  badgeId: string;
  title: {
    te: string;
    hi: string;
    en: string;
  };
  description: {
    te: string;
    hi: string;
    en: string;
  };
  category: 'safety' | 'wiring' | 'appliances' | 'distribution';
  passingScore: number; // e.g. 80 (4/5)
  questions: SkillTestQuestion[];
}

export interface OfflineJobStep {
  stepNumber: number;
  title: {
    te: string;
    hi: string;
    en: string;
  };
  instruction: {
    te: string;
    hi: string;
    en: string;
  };
  voiceScript: {
    te: string;
    hi: string;
    en: string;
  };
  safetyNotice?: {
    te: string;
    hi: string;
    en: string;
  };
  illustration?: string;
}

export interface OfflineJobPacket {
  id: string;
  title: {
    te: string;
    hi: string;
    en: string;
  };
  trade: string;
  difficulty: 'Basic' | 'Intermediate' | 'Advanced';
  estimatedMinutes: number;
  steps: OfflineJobStep[];
  requiredTools: string[];
}

export interface OfflineSyncRecord {
  id: string;
  packetId: string;
  title: string;
  trade: string;
  technicianId: string;
  completedAt: string;
  beforePhoto?: string;
  afterPhoto?: string;
  stepsCompleted: number[];
  qualityScore: number;
  synced: boolean;
}

export interface Technician {
  id: string;
  name: {
    te: string;
    hi: string;
    en: string;
  };
  phone: string;
  trade: {
    te: string;
    hi: string;
    en: string;
  };
  experienceYears: number;
  city: {
    te: string;
    hi: string;
    en: string;
  };
  avatar: string;
  trustScore: number;
  trustBreakdown: {
    verifiedJobsPoints: number;
    safetyCompliancePoints: number;
    mistakesResolvedPoints: number;
    skillTestsPoints?: number;
  };
  verifiedJobsCount: number;
  criticalMistakesPrevented: number;
  safetyChecksPassedCount: number;
  badges: string[]; // Badge IDs
  passedTests?: string[]; // Test IDs
  jobs: JobRecord[];
  isDemo?: boolean;
}
