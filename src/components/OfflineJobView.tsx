import React, { useState } from 'react';
import { Language, OfflineJobPacket, OfflineSyncRecord, JobRecord } from '../types';
import { translations } from '../utils/i18n';
import { offlineJobPackets, saveToOfflineQueue } from '../utils/offlineData';
import { generateElectricalSvg } from '../utils/demoData';
import {
  WifiOff,
  DownloadCloud,
  CheckCircle2,
  Volume2,
  VolumeX,
  Camera,
  AlertTriangle,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  Zap,
  BookmarkCheck,
  RefreshCw,
  Layers,
  Wrench,
} from 'lucide-react';

interface OfflineJobViewProps {
  language: Language;
  onJobCompletedOffline: (record: OfflineSyncRecord) => void;
  onExit: () => void;
  isOnline: boolean;
}

export const OfflineJobView: React.FC<OfflineJobViewProps> = ({
  language,
  onJobCompletedOffline,
  onExit,
  isOnline,
}) => {
  const t = translations[language];

  // Selected packet
  const [selectedPacket, setSelectedPacket] = useState<OfflineJobPacket | null>(offlineJobPackets[0]);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [beforePhoto, setBeforePhoto] = useState<string | null>(null);
  const [afterPhoto, setAfterPhoto] = useState<string | null>(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isJobFinished, setIsJobFinished] = useState(false);

  // Text to speech voice playback for Anna's guidance
  const speakVoiceScript = (text: string) => {
    if (!('speechSynthesis' in window)) return;

    window.speechSynthesis.cancel();
    if (isSpeaking) {
      setIsSpeaking(false);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    // Best effort language tag matching
    utterance.lang = language === 'te' ? 'te-IN' : language === 'hi' ? 'hi-IN' : 'en-IN';
    utterance.rate = 0.95; // Slightly slower, calm senior brother tone

    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  const handleCaptureBefore = () => {
    const photo = generateElectricalSvg('messy');
    setBeforePhoto(photo);
  };

  const handleCaptureAfter = () => {
    const photo = generateElectricalSvg('clean');
    setAfterPhoto(photo);
  };

  const handleMarkStepDone = (stepNum: number) => {
    if (!completedSteps.includes(stepNum)) {
      setCompletedSteps(prev => [...prev, stepNum]);
    }

    if (selectedPacket && currentStepIndex < selectedPacket.steps.length - 1) {
      setCurrentStepIndex(prev => prev + 1);
    } else {
      // Completed all steps
      finishOfflineJob();
    }
  };

  const finishOfflineJob = () => {
    if (!selectedPacket) return;

    const record: OfflineSyncRecord = {
      id: `offline-${Date.now()}`,
      packetId: selectedPacket.id,
      title: selectedPacket.title[language],
      trade: selectedPacket.trade,
      technicianId: 'tech-rajesh',
      completedAt: new Date().toISOString(),
      beforePhoto: beforePhoto || generateElectricalSvg('messy'),
      afterPhoto: afterPhoto || generateElectricalSvg('clean'),
      stepsCompleted: completedSteps,
      qualityScore: 97,
      synced: false,
    };

    saveToOfflineQueue(record);
    setIsJobFinished(true);
    onJobCompletedOffline(record);
  };

  const currentStep = selectedPacket ? selectedPacket.steps[currentStepIndex] : null;

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 space-y-5 animate-fade-in pb-20">
      {/* Prominent Offline Mode Indicator Banner */}
      <div className="bg-[#1f1910] border-2 border-amber-500/80 rounded-2xl p-4 shadow-xl flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#FFC400] text-black flex items-center justify-center font-black flex-shrink-0">
            <WifiOff className="w-5 h-5 stroke-[2.5]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-sm sm:text-base text-[#FFC400]">
                {t.offlineActiveBadge}
              </span>
              <span className="text-[10px] bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded font-mono font-bold">
                ZERO NETWORK
              </span>
            </div>
            <p className="text-xs text-gray-300 mt-0.5">
              {t.offlineDesc}
            </p>
          </div>
        </div>

        <button
          onClick={onExit}
          className="text-xs font-bold text-gray-400 hover:text-white px-2.5 py-1.5 rounded-lg bg-gray-800 touch-target-huge sm:min-h-0 sm:min-w-0"
        >
          {language === 'te' ? 'వెనుకకు' : 'Back'}
        </button>
      </div>

      {/* Packet Selection Switcher */}
      <div className="bg-[#14171e] border border-gray-800 rounded-2xl p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-extrabold text-[#FFC400] uppercase tracking-wider flex items-center gap-1.5">
            <DownloadCloud className="w-4 h-4" />
            {t.availableOfflinePacks}
          </span>
          <span className="text-[10px] text-emerald-400 font-bold bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-600/40">
            ✓ 100% PRE-CACHED
          </span>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-1">
          {offlineJobPackets.map(pkt => (
            <button
              key={pkt.id}
              onClick={() => {
                setSelectedPacket(pkt);
                setCurrentStepIndex(0);
                setCompletedSteps([]);
                setIsJobFinished(false);
              }}
              className={`px-3 py-2 rounded-xl text-xs font-bold flex-shrink-0 transition-all text-left border ${
                selectedPacket?.id === pkt.id
                  ? 'bg-[#FFC400] text-black border-[#FFC400] shadow-md'
                  : 'bg-[#1b1f28] text-gray-300 hover:text-white border-gray-700'
              }`}
            >
              <div className="truncate max-w-[190px]">{pkt.title[language]}</div>
              <div className="text-[10px] opacity-80 mt-0.5">
                ⏱️ {pkt.estimatedMinutes} mins • {pkt.difficulty}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Finished Offline Job Confirmation View */}
      {isJobFinished ? (
        <div className="bg-[#121f15] border-2 border-emerald-500 rounded-3xl p-6 text-center space-y-4 shadow-2xl">
          <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center border-2 border-emerald-500">
            <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
          </div>

          <h2 className="text-xl font-black text-white">
            {t.offlineAllCompleted}
          </h2>

          <p className="text-xs sm:text-sm text-gray-300 leading-relaxed max-w-md mx-auto">
            {language === 'te'
              ? 'ఈ పని ఫోటోలు మరియు పూర్తయిన స్టెప్స్ మీ ఫోన్ లోకల్ స్టోరేజ్‌లో సురక్షితంగా నమోదయ్యాయి. ఇంటర్నెట్ రాగానే లేదా పైన సింక్ బటన్ నొక్కగానే స్కిల్ పాస్‌పోర్ట్‌కు చేరుతుంది.'
              : 'Work steps and photos are safely recorded in your device offline queue. Once connectivity resumes, it will automatically sync to your Skill Passport.'}
          </p>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={onExit}
              className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-[#FFC400] text-black font-extrabold text-sm shadow-lg ustaad-glow touch-target-huge"
            >
              పాస్‌పోర్ట్ చూడండి (View Passport)
            </button>
          </div>
        </div>
      ) : selectedPacket && currentStep ? (
        /* Step-by-Step Offline Guidance Card */
        <div className="bg-[#14171e] border-2 border-[#FFC400]/40 rounded-3xl p-5 sm:p-6 shadow-2xl space-y-4 relative overflow-hidden">
          {/* Progress Header */}
          <div className="flex items-center justify-between gap-2 border-b border-gray-800 pb-3">
            <div>
              <span className="text-[11px] font-mono text-amber-400 font-bold uppercase block">
                STEP {currentStep.stepNumber} OF {selectedPacket.steps.length}
              </span>
              <h2 className="text-base sm:text-lg font-black text-white leading-tight mt-0.5">
                {currentStep.title[language]}
              </h2>
            </div>

            {/* Voice prompt trigger */}
            <button
              onClick={() => speakVoiceScript(currentStep.voiceScript[language])}
              className={`p-3 rounded-2xl border flex items-center gap-1.5 touch-target-huge flex-shrink-0 ${
                isSpeaking
                  ? 'bg-amber-500 text-black border-amber-400 animate-pulse'
                  : 'bg-[#1e232d] border-gray-700 text-amber-400 hover:bg-[#282f3c]'
              }`}
              title={t.offlineStepVoice}
            >
              {isSpeaking ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
              <span className="text-xs font-bold hidden sm:inline">
                {isSpeaking ? 'ఆపండి' : 'అన్న వాయిస్'}
              </span>
            </button>
          </div>

          {/* Anna voice quote bubble */}
          <div className="bg-[#FFC400] text-black p-3.5 rounded-2xl border-2 border-amber-300 shadow-md flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-black text-[#FFC400] flex items-center justify-center flex-shrink-0 font-black text-sm mt-0.5">
              <Zap className="w-4 h-4 fill-[#FFC400]" />
            </div>
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-black/70 block">
                ఉస్తాద్ అన్న మాట (Voice Script):
              </span>
              <p className="text-sm font-extrabold text-black leading-snug">
                "{currentStep.voiceScript[language]}"
              </p>
            </div>
          </div>

          {/* Detailed Technical Instruction */}
          <div className="bg-black/40 p-4 rounded-xl border border-gray-800 space-y-2">
            <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block">
              సాంకేతిక విధానం (Technical Instructions):
            </span>
            <p className="text-xs sm:text-sm text-gray-200 leading-relaxed font-medium">
              {currentStep.instruction[language]}
            </p>
          </div>

          {/* Safety Notice if present */}
          {currentStep.safetyNotice && (
            <div className="bg-red-950/60 border border-red-700/60 p-3 rounded-xl flex items-start gap-2.5 text-xs text-red-200 font-semibold">
              <AlertTriangle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
              <span>{currentStep.safetyNotice[language]}</span>
            </div>
          )}

          {/* Photo Slot for Steps 1 or 5 */}
          {currentStep.stepNumber === 2 && (
            <div className="p-3 bg-zinc-900 rounded-xl border border-gray-800 flex items-center justify-between gap-3">
              <div>
                <span className="text-xs font-bold text-amber-300 block">ముందు ఫోటో (Before Photo)</span>
                <span className="text-[10px] text-gray-400">పాత వైర్ల ఫోటో రికార్డు చేయండి</span>
              </div>
              <button
                onClick={handleCaptureBefore}
                className="px-3.5 py-2 bg-[#232833] hover:bg-gray-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 border border-gray-700 touch-target-huge sm:min-h-0 sm:min-w-0"
              >
                <Camera className="w-4 h-4 text-amber-400" />
                <span>{beforePhoto ? '✓ నమోదైంది' : 'ఫోటో తీయండి'}</span>
              </button>
            </div>
          )}

          {currentStep.stepNumber === selectedPacket.steps.length && (
            <div className="p-3 bg-zinc-900 rounded-xl border border-emerald-800/60 flex items-center justify-between gap-3">
              <div>
                <span className="text-xs font-bold text-emerald-300 block">పూర్తయిన ఫోటో (After Photo)</span>
                <span className="text-[10px] text-gray-400">క్లీన్ ఫిట్టింగ్ ఫోటో తీయండి</span>
              </div>
              <button
                onClick={handleCaptureAfter}
                className="px-3.5 py-2 bg-emerald-950 text-emerald-300 hover:bg-emerald-900 rounded-xl text-xs font-bold flex items-center gap-1.5 border border-emerald-600/50 touch-target-huge sm:min-h-0 sm:min-w-0"
              >
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>{afterPhoto ? '✓ నమోదైంది' : 'ఫోటో తీయండి'}</span>
              </button>
            </div>
          )}

          {/* Action Step Completion Button (Min 56px touch target) */}
          <div className="pt-2 flex items-center gap-3">
            {currentStepIndex > 0 && (
              <button
                onClick={() => setCurrentStepIndex(prev => prev - 1)}
                className="p-4 rounded-2xl bg-[#1b1f28] text-gray-300 hover:text-white border border-gray-700 touch-target-huge flex items-center justify-center"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
            )}

            <button
              onClick={() => handleMarkStepDone(currentStep.stepNumber)}
              className="flex-1 py-4 px-6 rounded-2xl bg-[#FFC400] hover:bg-[#e0ad00] text-black font-black text-base sm:text-lg shadow-xl ustaad-glow flex items-center justify-center gap-2 touch-target-huge cursor-pointer"
            >
              <CheckCircle2 className="w-6 h-6 stroke-[2.5]" />
              <span>
                {currentStepIndex === selectedPacket.steps.length - 1
                  ? t.endJob
                  : `${t.offlineStepCompleted} ➔`}
              </span>
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
};
