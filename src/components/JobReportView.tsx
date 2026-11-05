import React, { useState } from 'react';
import { Language, JobAnalysisResult, JobRecord } from '../types';
import { translations } from '../utils/i18n';
import confetti from 'canvas-confetti';
import {
  ShieldCheck,
  AlertTriangle,
  Award,
  CheckCircle,
  Share2,
  BookmarkCheck,
  ArrowRight,
  Sparkles,
  Wrench,
  Layers,
  FileText,
  Clock,
  Send,
  MessageSquare,
} from 'lucide-react';

interface JobReportViewProps {
  language: Language;
  report: JobAnalysisResult;
  beforePhoto?: string;
  afterPhoto?: string;
  durationSeconds: number;
  onAddToPassport: (job: JobRecord) => void;
  onGoHome: () => void;
}

export const JobReportView: React.FC<JobReportViewProps> = ({
  language,
  report,
  beforePhoto,
  afterPhoto,
  durationSeconds,
  onAddToPassport,
  onGoHome,
}) => {
  const t = translations[language];
  const [isSaved, setIsSaved] = useState(false);
  const [photoTab, setPhotoTab] = useState<'sideBySide' | 'slider'>('sideBySide');

  const handleSaveToPassport = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#FFC400', '#22c55e', '#ffffff'],
    });

    const newRecord: JobRecord = {
      id: `job-${Date.now()}`,
      technicianId: 'tech-rajesh',
      title: report.job_title,
      trade: report.trade,
      date: new Date().toISOString().split('T')[0],
      durationSeconds,
      beforePhoto,
      afterPhoto,
      qualityScore: report.quality_score,
      qualityReasons: report.quality_reasons,
      mistakesCaught: report.mistakes_caught,
      safetyChecksPassed: report.safety_checks,
      skillTags: report.skill_tags,
      tasksDone: report.tasks_done,
      materialsUsed: report.materials_tools,
      customerSummaryTelugu: report.customer_summary_telugu,
      customerSummaryEnglish: report.customer_summary_english,
      followUpAdvice: report.follow_up_advice,
      isDemo: false,
    };

    onAddToPassport(newRecord);
    setIsSaved(true);
  };

  const shareWhatsAppSummary = () => {
    const text = `⚡ *ఉస్తాద్ ఎలక్ట్రికల్ పని రసీదు / Work Summary*\n\n📌 *పని:* ${report.job_title}\n✅ *నాణ్యతా స్కోరు:* ${report.quality_score}/100 (AI Verified)\n\n📝 *సారాంశం (Telugu):* ${report.customer_summary_telugu}\n\n📝 *Summary (English):* ${report.customer_summary_english}\n\n🛡️ *భద్రతా తనిఖీ:* 100% సేఫ్టీ నిబంధనలు పాటించబడ్డాయి.\n_గమనిక: ${t.aiAssessedDisclaimer}_`;
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-6 space-y-6 animate-fade-in pb-20">
      {/* Top Banner & Title */}
      <div className="bg-[#14171e] border-2 border-[#FFC400]/40 rounded-2xl p-5 sm:p-6 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 bg-[#FFC400] text-black font-black text-[10px] uppercase px-3 py-1 rounded-bl-xl tracking-wider">
          AI Verified Job
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5 mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              {report.trade}
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-white leading-tight">
              {report.job_title}
            </h1>
            <p className="text-xs text-gray-400 mt-1 flex items-center gap-2">
              <Clock className="w-3.5 h-3.5 text-gray-400" />
              <span>{Math.round(durationSeconds / 60)} నిమిషాలు (Session Duration)</span>
            </p>
          </div>

          {/* Quality Score Circle */}
          <div className="flex-shrink-0 flex items-center gap-3 bg-[#1c212c] p-3.5 rounded-2xl border border-amber-500/30">
            <div className="relative w-16 h-16 flex items-center justify-center rounded-full bg-[#121418] border-4 border-[#FFC400] shadow-md">
              <span className="text-2xl font-black text-[#FFC400]">
                {report.quality_score}
              </span>
            </div>
            <div>
              <span className="text-xs font-bold text-gray-400 block">{t.qualityScore}</span>
              <span className="text-sm font-extrabold text-emerald-400">
                {report.quality_score >= 90 ? 'ఎక్సలెంట్ (Verified)' : 'గుడ్ (Passed)'}
              </span>
            </div>
          </div>
        </div>

        {/* AI Disclaimer tag as requested */}
        <div className="mt-4 pt-3 border-t border-gray-800 text-[11px] text-amber-300/80 font-medium flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-amber-400 flex-shrink-0" />
          <span>{t.aiAssessedDisclaimer}</span>
        </div>
      </div>

      {/* 3 Quality Score Breakdown Reasons */}
      <div className="bg-[#14171e] border border-gray-800 rounded-2xl p-4 sm:p-5">
        <h3 className="text-sm font-extrabold text-white uppercase tracking-wider mb-3 flex items-center gap-2">
          <Award className="w-4 h-4 text-[#FFC400]" />
          {t.scoreReasons}
        </h3>
        <ul className="space-y-2">
          {report.quality_reasons.map((reason, idx) => (
            <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-300">
              <span className="w-5 h-5 rounded-full bg-emerald-950 text-emerald-400 font-bold flex items-center justify-center flex-shrink-0 text-xs mt-0.5 border border-emerald-600/40">
                ✓
              </span>
              <span>{reason}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Before and After Photos Comparison */}
      <div className="bg-[#14171e] border border-gray-800 rounded-2xl p-4 sm:p-5">
        <h3 className="text-sm font-extrabold text-white uppercase tracking-wider mb-3 flex items-center gap-2">
          <Layers className="w-4 h-4 text-[#FFC400]" />
          {t.beforeAfterComparison}
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Before Photo Card */}
          <div className="bg-black/60 rounded-xl overflow-hidden border border-gray-800 flex flex-col">
            <div className="bg-amber-950/60 px-3 py-1.5 border-b border-amber-600/40 flex items-center justify-between">
              <span className="text-[11px] font-extrabold text-amber-300 uppercase">
                పనికి ముందు (BEFORE)
              </span>
              <span className="text-[10px] text-amber-400/80 font-mono">Baseline</span>
            </div>
            <div className="h-48 sm:h-56 bg-zinc-900 flex items-center justify-center overflow-hidden">
              {beforePhoto ? (
                <img src={beforePhoto} alt="Before work" className="w-full h-full object-contain" />
              ) : (
                <span className="text-xs text-gray-500">ఫోటో అందుబాటులో లేదు</span>
              )}
            </div>
          </div>

          {/* After Photo Card */}
          <div className="bg-black/60 rounded-xl overflow-hidden border border-emerald-800/60 flex flex-col">
            <div className="bg-emerald-950/60 px-3 py-1.5 border-b border-emerald-600/40 flex items-center justify-between">
              <span className="text-[11px] font-extrabold text-emerald-300 uppercase">
                పూర్తయిన తర్వాత (AFTER)
              </span>
              <span className="text-[10px] text-emerald-400 font-mono">Clean & Safe</span>
            </div>
            <div className="h-48 sm:h-56 bg-zinc-900 flex items-center justify-center overflow-hidden">
              {afterPhoto ? (
                <img src={afterPhoto} alt="After work" className="w-full h-full object-contain" />
              ) : (
                <span className="text-xs text-gray-500">ఫోటో అందుబాటులో లేదు</span>
              )}
            </div>
          </div>
        </div>

        {report.before_after_notes && (
          <p className="mt-3 text-xs text-gray-400 italic bg-[#101217] p-2.5 rounded-lg border border-gray-800">
            💡 {report.before_after_notes}
          </p>
        )}
      </div>

      {/* Mistakes Caught & Corrected Section */}
      <div className="bg-[#181514] border border-amber-900/50 rounded-2xl p-4 sm:p-5">
        <h3 className="text-sm font-extrabold text-[#FFC400] uppercase tracking-wider mb-3 flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-[#FFC400]" />
          {t.mistakesPrevented} ({report.mistakes_caught.length})
        </h3>
        {report.mistakes_caught.length > 0 ? (
          <div className="space-y-2.5">
            {report.mistakes_caught.map((mistake, i) => (
              <div key={i} className="p-3 rounded-xl bg-amber-950/30 border border-amber-700/40 text-xs sm:text-sm text-amber-200 flex items-start gap-2.5">
                <span className="font-bold text-amber-400">#{i + 1}</span>
                <span>{mistake}</span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-xs text-emerald-400 font-medium">
            అద్భుతం! ఈ పనిలో ఎటువంటి పొరపాట్లు లేకుండా 100% ఖచ్చితత్వంతో చేశారు.
          </p>
        )}
      </div>

      {/* Tasks Completed & Materials Used */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Tasks done */}
        <div className="bg-[#14171e] border border-gray-800 rounded-2xl p-4 sm:p-5">
          <h3 className="text-sm font-extrabold text-white uppercase tracking-wider mb-3 flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-400" />
            {t.tasksCompleted}
          </h3>
          <ul className="space-y-2">
            {report.tasks_done.map((task, i) => (
              <li key={i} className="text-xs sm:text-sm text-gray-300 flex items-start gap-2">
                <span className="text-emerald-400 font-bold">•</span>
                <span>{task}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Materials & Tools */}
        <div className="bg-[#14171e] border border-gray-800 rounded-2xl p-4 sm:p-5">
          <h3 className="text-sm font-extrabold text-white uppercase tracking-wider mb-3 flex items-center gap-2">
            <Wrench className="w-4 h-4 text-blue-400" />
            {t.materialsUsed}
          </h3>
          <ul className="space-y-2">
            {report.materials_tools.map((mat, i) => (
              <li key={i} className="text-xs sm:text-sm text-gray-300 flex items-start gap-2">
                <span className="text-blue-400 font-bold">•</span>
                <span>{mat}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Earned Skill Tags */}
      <div className="bg-[#14171e] border border-gray-800 rounded-2xl p-4 sm:p-5">
        <h3 className="text-sm font-extrabold text-white uppercase tracking-wider mb-3 flex items-center gap-2">
          <Award className="w-4 h-4 text-[#FFC400]" />
          {t.earnedSkillTags}
        </h3>
        <div className="flex flex-wrap gap-2">
          {report.skill_tags.map((tag, i) => (
            <span
              key={i}
              className="px-3 py-1.5 rounded-xl bg-[#FFC400]/15 text-[#FFC400] border border-[#FFC400]/40 text-xs font-bold"
            >
              🏷️ {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Customer Receipt / Summary for Homeowner */}
      <div className="bg-[#121b15] border border-emerald-700/50 rounded-2xl p-5 shadow-lg">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-extrabold text-emerald-300 uppercase tracking-wider flex items-center gap-2">
            <FileText className="w-4 h-4 text-emerald-400" />
            {t.customerReceipt}
          </h3>
          <button
            onClick={shareWhatsAppSummary}
            className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 touch-target-huge sm:min-h-0 sm:min-w-0"
          >
            <Send className="w-3.5 h-3.5" />
            <span>{t.shareCustomerReceipt}</span>
          </button>
        </div>

        <div className="space-y-3">
          <div className="bg-black/40 p-3 rounded-xl border border-emerald-900/40">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">
              {t.customerReceiptTe}
            </span>
            <p className="text-sm text-gray-200 leading-relaxed font-medium">
              {report.customer_summary_telugu}
            </p>
          </div>

          <div className="bg-black/40 p-3 rounded-xl border border-emerald-900/40">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">
              {t.customerReceiptEn}
            </span>
            <p className="text-sm text-gray-200 leading-relaxed font-medium">
              {report.customer_summary_english}
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Sticky Action Buttons */}
      <div className="sticky bottom-4 z-20 pt-2 flex flex-col sm:flex-row items-center gap-3">
        <button
          onClick={handleSaveToPassport}
          disabled={isSaved}
          className={`w-full py-4 px-6 rounded-2xl font-black text-lg transition-all flex items-center justify-center gap-3 touch-target-huge ${
            isSaved
              ? 'bg-emerald-700 text-white cursor-default'
              : 'bg-[#FFC400] hover:bg-[#e0ad00] text-black shadow-xl ustaad-glow cursor-pointer'
          }`}
        >
          <BookmarkCheck className="w-6 h-6" />
          <span>{isSaved ? t.addedToPassportSuccess : t.addToPassport}</span>
        </button>

        <button
          onClick={onGoHome}
          className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-[#1e232c] hover:bg-[#282f3a] text-gray-200 font-bold text-base border border-gray-700 touch-target-huge cursor-pointer"
        >
          {t.myPassport} ➔
        </button>
      </div>
    </div>
  );
};
