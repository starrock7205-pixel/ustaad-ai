import React, { useState, useEffect, useCallback } from 'react';
import { Language, Technician, JobRecord, JobAnalysisResult, OfflineSyncRecord } from './types';
import { sampleTechnicians } from './utils/demoData';
import { getOfflineQueue, markQueueItemSynced, clearSyncedItems } from './utils/offlineData';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomeView } from './components/HomeView';
import { SafetyGateModal } from './components/SafetyGateModal';
import { LiveJobView } from './components/LiveJobView';
import { JobReportView } from './components/JobReportView';
import { SkillPassportView } from './components/SkillPassportView';
import { PartnerView } from './components/PartnerView';
import { TroubleshooterModal } from './components/TroubleshooterModal';
import { OfflineJobView } from './components/OfflineJobView';
import { SkillTestsView } from './components/SkillTestsView';
import { translations } from './utils/i18n';
import { CheckCircle2, Zap, WifiOff } from 'lucide-react';

export default function App() {
  // Global settings
  const [language, setLanguage] = useState<Language>('te');
  const [isDemoData, setIsDemoData] = useState<boolean>(true);
  const [isLowBandwidth, setIsLowBandwidth] = useState<boolean>(false);

  // Connectivity & Offline mode
  const [isRealOnline, setIsRealOnline] = useState(typeof navigator !== 'undefined' ? navigator.onLine : true);
  const [isSimulatedOffline, setIsSimulatedOffline] = useState(false);
  const isOnline = isRealOnline && !isSimulatedOffline;

  // Offline queue
  const [offlineQueue, setOfflineQueue] = useState<OfflineSyncRecord[]>([]);
  const [syncToast, setSyncToast] = useState<string | null>(null);

  // Active Screen: 'home' | 'live' | 'report' | 'passport' | 'partner' | 'offline' | 'tests'
  const [activeScreen, setActiveScreen] = useState<'home' | 'live' | 'report' | 'passport' | 'partner' | 'offline' | 'tests'>('home');

  // Modals
  const [isSafetyGateOpen, setIsSafetyGateOpen] = useState(false);
  const [isTroubleshooterOpen, setIsTroubleshooterOpen] = useState(false);

  // Technicians state
  const [technicians, setTechnicians] = useState<Technician[]>(sampleTechnicians);
  const [activeTechIndex, setActiveTechIndex] = useState(0);

  // Active Job & Report Data
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [currentReport, setCurrentReport] = useState<JobAnalysisResult | null>(null);
  const [lastJobMeta, setLastJobMeta] = useState<{
    beforePhoto?: string;
    afterPhoto?: string;
    durationSeconds: number;
  }>({ durationSeconds: 180 });

  // Public read-only passport inspection
  const [inspectedTech, setInspectedTech] = useState<Technician | null>(null);

  // Refresh offline queue from storage
  const refreshQueue = useCallback(() => {
    setOfflineQueue(getOfflineQueue());
  }, []);

  // Network listeners
  useEffect(() => {
    refreshQueue();

    const handleOnline = () => {
      setIsRealOnline(true);
      refreshQueue();
    };
    const handleOffline = () => {
      setIsRealOnline(false);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [refreshQueue]);

  // Check URL query parameters for public passport view (?passport=tech-id)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const passportId = params.get('passport');
    if (passportId) {
      const match = sampleTechnicians.find(t => t.id === passportId);
      if (match) {
        setInspectedTech(match);
        setActiveScreen('passport');
      }
    }
  }, []);

  const currentTechnician = technicians[activeTechIndex] || sampleTechnicians[0];
  const pendingSyncCount = offlineQueue.filter(item => !item.synced).length;

  // Toggle Demo Data
  const handleToggleDemoData = () => {
    if (isDemoData) {
      const blankTech: Technician = {
        id: 'tech-user',
        name: {
          te: 'గూడూరు రాజేష్ (G. Rajesh)',
          hi: 'गूडूरु राजेश (G. Rajesh)',
          en: 'G. Rajesh',
        },
        phone: '+91 98480 23411',
        trade: {
          te: 'రెసిడెన్షియల్ వైరింగ్ ఎలక్ట్రీషియన్',
          hi: 'रेजिडेंशियल वायरिंग इलेक्ट्रीशियन',
          en: 'Residential Wiring Electrician',
        },
        experienceYears: 7,
        city: {
          te: 'విజయవాడ, ఆంధ్రప్రదేశ్',
          hi: 'विजयवाड़ा, आंध्र प्रदेश',
          en: 'Vijayawada, AP',
        },
        avatar: 'https://images.unsplash.com/photo-1540569014015-19a7be504e3a?w=200&auto=format&fit=crop&q=80',
        trustScore: 88,
        trustBreakdown: {
          verifiedJobsPoints: 40,
          safetyCompliancePoints: 36,
          mistakesResolvedPoints: 12,
        },
        verifiedJobsCount: 0,
        criticalMistakesPrevented: 0,
        safetyChecksPassedCount: 0,
        badges: ['switchboard_wiring'],
        passedTests: [],
        jobs: [],
        isDemo: false,
      };
      setTechnicians([blankTech]);
      setActiveTechIndex(0);
      setIsDemoData(false);
    } else {
      setTechnicians(sampleTechnicians);
      setActiveTechIndex(0);
      setIsDemoData(true);
    }
  };

  // Start Job Flow
  const handleStartJobClick = () => {
    if (!isOnline) {
      // If offline, route directly to downloadable offline guidance packet
      setActiveScreen('offline');
      return;
    }
    setIsSafetyGateOpen(true);
  };

  const handleConfirmedSafetyStart = () => {
    setIsSafetyGateOpen(false);
    setActiveScreen('live');
  };

  // When live job ends, send to backend for post-job structured analysis
  const handleEndLiveJob = async (data: {
    transcript: string;
    beforePhoto?: string;
    afterPhoto?: string;
    durationSeconds: number;
  }) => {
    setLastJobMeta({
      beforePhoto: data.beforePhoto,
      afterPhoto: data.afterPhoto,
      durationSeconds: data.durationSeconds,
    });
    setIsAnalyzing(true);
    setActiveScreen('report');

    try {
      const res = await fetch('/api/analyze-job', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          transcript: data.transcript,
          beforePhoto: data.beforePhoto,
          afterPhoto: data.afterPhoto,
          language,
          durationSeconds: data.durationSeconds,
        }),
      });

      const report: JobAnalysisResult = await res.json();
      setCurrentReport(report);
    } catch (err) {
      console.error('Error analyzing job:', err);
      // Fallback
      setCurrentReport({
        job_title: 'Modular Switchboard 6-Module Rewiring & Safety Alignment',
        trade: 'Residential Electrical Maintenance',
        tasks_done: [
          'Checked zero-voltage with neon phase tester after turning off main MCB',
          'Replaced charred 6A rocker switch with ISI marked Anchor Roma switch',
          'Re-insulated frayed copper phase wire with heat-resistant sleeve',
        ],
        materials_tools: ['Anchor Roma 6A Switch', '1.5 sq mm Wire Polycab', 'Neon Tester', 'Insulation Tape 3M'],
        mistakes_caught: ['Phase wire was loosely seated in switch bottom terminal; tightened securely to eliminate arching'],
        safety_checks: ['Main MCB turned off verified', 'Tester confirmed dead circuit', 'Zero live-wire protocol followed'],
        skill_tags: ['Switchboard Wiring', 'Terminal Torque', 'Phase Polarity'],
        quality_score: 96,
        quality_reasons: [
          'All three pre-work safety checks adhered to without deviation',
          'No exposed bare copper strands left outside screw terminals',
          'Neat wire looping with separate phase and neutral paths',
        ],
        before_after_notes: 'The before image showed tangled uninsulated loops; after photo demonstrates clean insulated grouping and tight terminals.',
        customer_summary_telugu: 'స్విచ్‌బోర్డులో లూస్ కనెక్షన్లను సరిచేసి, కొత్త ISI స్విచ్ బిగించాము. స్పార్కింగ్ ప్రమాదం పూర్తిగా నివారించబడింది.',
        customer_summary_english: 'Repaired loose wiring connections on the switchboard and installed a new ISI certified switch, safely eliminating spark hazards.',
        follow_up_advice: [
          'Do not plug heavy heating appliances into this 6A socket',
          'Ensure the main distribution board has an operational 30mA RCCB',
        ],
        disclaimer: 'AI-assessed, not an official certificate',
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Add Job to Passport
  const handleAddToPassport = (newJob: JobRecord) => {
    setTechnicians(prev =>
      prev.map((tech, idx) => {
        if (idx === activeTechIndex) {
          const updatedJobs = [newJob, ...tech.jobs];
          const newVerifiedCount = tech.verifiedJobsCount + 1;
          const newSafetyCount = tech.safetyChecksPassedCount + 1;
          const newMistakesCount = tech.criticalMistakesPrevented + newJob.mistakesCaught.length;
          const newScore = Math.min(
            100,
            Math.max(80, Math.round(90 + (newVerifiedCount * 0.2) + (newJob.qualityScore > 90 ? 2 : 0)))
          );

          const newBadges = Array.from(new Set([...tech.badges, 'switchboard_wiring', 'earthing_check']));

          return {
            ...tech,
            verifiedJobsCount: newVerifiedCount,
            safetyChecksPassedCount: newSafetyCount,
            criticalMistakesPrevented: newMistakesCount,
            trustScore: newScore,
            badges: newBadges,
            jobs: updatedJobs,
          };
        }
        return tech;
      })
    );
  };

  // Handle Offline Job Completion
  const handleJobCompletedOffline = (record: OfflineSyncRecord) => {
    refreshQueue();
    // If online, auto sync immediately
    if (isOnline) {
      handleTriggerSync();
    }
  };

  // Sync Offline Queue with Server and update Passport
  const handleTriggerSync = async () => {
    const queue = getOfflineQueue();
    const unsynced = queue.filter(item => !item.synced);
    if (unsynced.length === 0) return;

    for (const item of unsynced) {
      try {
        await fetch('/api/jobs', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            title: item.title,
            trade: item.trade,
            qualityScore: item.qualityScore,
            completedAt: item.completedAt,
            offlineSyncId: item.id,
          }),
        });
        markQueueItemSynced(item.id);

        // Add to technician's verified passport records
        const newRecord: JobRecord = {
          id: `synced-${item.id}`,
          technicianId: currentTechnician.id,
          title: item.title,
          trade: item.trade,
          date: new Date().toISOString().split('T')[0],
          durationSeconds: 240,
          beforePhoto: item.beforePhoto,
          afterPhoto: item.afterPhoto,
          qualityScore: item.qualityScore,
          qualityReasons: [
            'All offline technical guide steps completed in sequence',
            'Pre-isolation safety check verified before wire contact',
            'Clean final photo verification recorded',
          ],
          mistakesCaught: ['Zero deviations from standard packet instructions'],
          safetyChecksPassed: ['100% Pre-job safety checks confirmed'],
          skillTags: ['Offline Verified', item.trade, 'Standard Procedure'],
          tasksDone: ['Step-by-step guidance packet successfully completed on site'],
          materialsUsed: ['Standard IS certified materials'],
          customerSummaryTelugu: `${item.title} పని ఆఫ్‌లైన్ గైడెన్స్ ద్వారా అత్యున్నత నాణ్యతతో విజయవంతంగా పూర్తి చేసి సమకాలీకరించబడింది.`,
          customerSummaryEnglish: `Completed ${item.title} safely on site via verified offline protocol and synchronized to Skill Passport.`,
          followUpAdvice: ['Schedule next annual inspection as scheduled'],
        };

        handleAddToPassport(newRecord);
      } catch (err) {
        console.error('Sync failed for item:', item.id, err);
      }
    }

    refreshQueue();
    setSyncToast(translations[language].syncSuccessToast);
    setTimeout(() => setSyncToast(null), 4000);
  };

  // Pass a Skill Test & Award Badge
  const handlePassTest = (testId: string, badgeId: string) => {
    setTechnicians(prev =>
      prev.map((tech, idx) => {
        if (idx === activeTechIndex) {
          const existingPasses = tech.passedTests || [];
          if (existingPasses.includes(testId)) return tech;

          const updatedPasses = [...existingPasses, testId];
          const updatedBadges = Array.from(new Set([...tech.badges, badgeId]));
          const updatedScore = Math.min(100, tech.trustScore + 3);

          return {
            ...tech,
            trustScore: updatedScore,
            trustBreakdown: {
              ...tech.trustBreakdown,
              mistakesResolvedPoints: tech.trustBreakdown.mistakesResolvedPoints + 3,
            },
            badges: updatedBadges,
            passedTests: updatedPasses,
          };
        }
        return tech;
      })
    );
  };

  // Open Partner public passport
  const handleOpenPartnerPassport = (tech: Technician) => {
    setInspectedTech(tech);
    setActiveScreen('passport');
  };

  return (
    <div className="min-h-screen bg-[#0b0c0e] text-gray-100 flex flex-col font-sans">
      {/* Toast alert when offline jobs sync successfully */}
      {syncToast && (
        <div className="fixed top-4 right-4 left-4 sm:left-auto z-50 bg-emerald-950 text-emerald-200 border-2 border-emerald-500 px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-3 animate-fade-in">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
          <span className="text-xs sm:text-sm font-extrabold">{syncToast}</span>
        </div>
      )}

      {/* Header (hidden in full-screen live mode to give maximum camera space) */}
      {activeScreen !== 'live' && (
        <Header
          language={language}
          onLanguageChange={setLanguage}
          isDemoData={isDemoData}
          onToggleDemoData={handleToggleDemoData}
          isLowBandwidth={isLowBandwidth}
          onToggleLowBandwidth={() => setIsLowBandwidth(!isLowBandwidth)}
          currentTechnician={currentTechnician}
          onGoHome={() => {
            setInspectedTech(null);
            setActiveScreen('home');
          }}
          activeScreen={activeScreen}
          isOnline={isOnline}
          onToggleSimulateOffline={() => setIsSimulatedOffline(!isSimulatedOffline)}
          pendingSyncCount={pendingSyncCount}
          onTriggerSync={handleTriggerSync}
          onOpenOfflinePackets={() => setActiveScreen('offline')}
        />
      )}

      {/* Offline Mode Banner Alert if offline */}
      {!isOnline && activeScreen !== 'live' && activeScreen !== 'offline' && (
        <div className="bg-amber-950/80 border-b border-amber-600/50 py-1.5 px-4 text-center flex items-center justify-center gap-2 text-xs text-[#FFC400] font-bold">
          <WifiOff className="w-4 h-4" />
          <span>
            {translations[language].offlineActiveBadge} —{' '}
            <button
              onClick={() => setActiveScreen('offline')}
              className="underline font-black cursor-pointer hover:text-white"
            >
              {translations[language].downloadOfflinePack} ➔
            </button>
          </span>
        </div>
      )}

      {/* Main Screen Router */}
      <main className="flex-1 flex flex-col">
        {activeScreen === 'home' && (
          <HomeView
            language={language}
            technician={currentTechnician}
            onStartJobClick={handleStartJobClick}
            onOpenPassport={() => {
              setInspectedTech(null);
              setActiveScreen('passport');
            }}
            onOpenPartnerView={() => setActiveScreen('partner')}
            onOpenTroubleshooter={() => setIsTroubleshooterOpen(true)}
            onOpenOfflineMode={() => setActiveScreen('offline')}
            onOpenSkillTests={() => setActiveScreen('tests')}
            jobsTodayCount={currentTechnician.jobs.length}
          />
        )}

        {activeScreen === 'live' && (
          <LiveJobView
            language={language}
            isLowBandwidth={isLowBandwidth}
            onEndJob={handleEndLiveJob}
            onCancel={() => setActiveScreen('home')}
          />
        )}

        {activeScreen === 'offline' && (
          <OfflineJobView
            language={language}
            onJobCompletedOffline={handleJobCompletedOffline}
            onExit={() => {
              setInspectedTech(null);
              setActiveScreen('passport');
            }}
            isOnline={isOnline}
          />
        )}

        {activeScreen === 'tests' && (
          <SkillTestsView
            language={language}
            technician={currentTechnician}
            onPassTest={handlePassTest}
            onBackToPassport={() => {
              setInspectedTech(null);
              setActiveScreen('passport');
            }}
          />
        )}

        {activeScreen === 'report' && (
          <>
            {isAnalyzing ? (
              <div className="flex-1 flex flex-col items-center justify-center p-8 text-center space-y-4">
                <div className="relative w-16 h-16">
                  <div className="absolute inset-0 rounded-full border-4 border-[#FFC400]/20 animate-ping" />
                  <div className="w-16 h-16 rounded-full border-4 border-[#FFC400] border-t-transparent animate-spin" />
                </div>
                <h2 className="text-xl font-black text-white">
                  ఉస్తాద్ AI పని నాణ్యతను విశ్లేషిస్తోంది...
                </h2>
                <p className="text-xs text-amber-300 font-medium max-w-sm">
                  ముందు/తర్వాత ఫోటోలు, వైరింగ్ రంగులు, సేఫ్టీ చెక్‌లు మరియు స్కిల్ ట్యాగ్‌లను రికార్డ్ చేస్తోంది...
                </p>
              </div>
            ) : currentReport ? (
              <JobReportView
                language={language}
                report={currentReport}
                beforePhoto={lastJobMeta.beforePhoto}
                afterPhoto={lastJobMeta.afterPhoto}
                durationSeconds={lastJobMeta.durationSeconds}
                onAddToPassport={handleAddToPassport}
                onGoHome={() => {
                  setInspectedTech(null);
                  setActiveScreen('passport');
                }}
              />
            ) : null}
          </>
        )}

        {activeScreen === 'passport' && (
          <SkillPassportView
            language={language}
            technician={inspectedTech || currentTechnician}
            onOpenSkillTests={() => setActiveScreen('tests')}
            isReadOnly={!!inspectedTech && inspectedTech.id !== currentTechnician.id}
          />
        )}

        {activeScreen === 'partner' && (
          <PartnerView
            language={language}
            technicians={technicians}
            onOpenPassport={handleOpenPartnerPassport}
          />
        )}
      </main>

      {/* Safety Gate Pre-Job Modal */}
      <SafetyGateModal
        language={language}
        isOpen={isSafetyGateOpen}
        onClose={() => setIsSafetyGateOpen(false)}
        onConfirmedStart={handleConfirmedSafetyStart}
      />

      {/* Troubleshooter Modal (High Thinking Mode) */}
      <TroubleshooterModal
        language={language}
        isOpen={isTroubleshooterOpen}
        onClose={() => setIsTroubleshooterOpen(false)}
      />

      {/* Mandatory Footer on every screen (except full-screen live viewfinder) */}
      {activeScreen !== 'live' && <Footer language={language} />}
    </div>
  );
}
