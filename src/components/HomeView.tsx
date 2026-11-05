import React from 'react';
import { Language, Technician } from '../types';
import { translations } from '../utils/i18n';
import {
  Zap,
  ShieldCheck,
  Building2,
  Award,
  AlertTriangle,
  Play,
  ArrowRight,
  Brain,
  CheckCircle,
  Clock,
  Sparkles,
} from 'lucide-react';

interface HomeViewProps {
  language: Language;
  technician: Technician;
  onStartJobClick: () => void;
  onOpenPassport: () => void;
  onOpenPartnerView: () => void;
  onOpenTroubleshooter: () => void;
  onOpenOfflineMode: () => void;
  onOpenSkillTests: () => void;
  jobsTodayCount: number;
}

export const HomeView: React.FC<HomeViewProps> = ({
  language,
  technician,
  onStartJobClick,
  onOpenPassport,
  onOpenPartnerView,
  onOpenTroubleshooter,
  onOpenOfflineMode,
  onOpenSkillTests,
  jobsTodayCount,
}) => {
  const t = translations[language];

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 space-y-6 animate-fade-in pb-16">
      {/* Respectful Welcome Banner (Senior Brother Anna tone) */}
      <div className="bg-[#14171e] border-2 border-[#FFC400]/40 rounded-3xl p-5 sm:p-6 shadow-2xl relative overflow-hidden">
        <div className="flex items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-bold text-gray-300">
              నమస్కారం అన్నా! (Welcome, Anna)
            </span>
          </div>

          <div className="bg-[#1c212c] px-3 py-1 rounded-full border border-gray-700 text-[11px] font-mono text-gray-400">
            {jobsTodayCount}/5 Jobs Today
          </div>
        </div>

        <h1 className="text-2xl sm:text-3xl font-black text-white leading-tight">
          {t.appTagline}
        </h1>

        <p className="text-xs sm:text-sm text-gray-400 mt-2 leading-relaxed">
          {t.quickStartHint}
        </p>

        {/* Current Active Technician Mini-Card */}
        <div className="mt-4 pt-4 border-t border-gray-800 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <img
              src={technician.avatar}
              alt={technician.name[language]}
              className="w-11 h-11 rounded-xl object-cover border-2 border-[#FFC400]"
            />
            <div>
              <span className="text-xs font-black text-white block">
                {technician.name[language]}
              </span>
              <span className="text-[11px] text-amber-300 font-medium">
                {technician.trade[language]}
              </span>
            </div>
          </div>

          <div className="text-right">
            <span className="text-[10px] text-gray-400 uppercase font-mono block">TRUST SCORE</span>
            <span className="text-xl font-black text-[#FFC400]">
              {technician.trustScore}
              <span className="text-xs text-gray-500 font-bold">/100</span>
            </span>
          </div>
        </div>
      </div>

      {/* GIANT PRIMARY ACTION: START A JOB BUTTON (Min 56px touch target, glowing yellow) */}
      <div className="relative">
        <button
          onClick={onStartJobClick}
          className="w-full py-6 px-6 rounded-3xl bg-[#FFC400] hover:bg-[#e6b000] text-black font-black text-xl sm:text-2xl shadow-2xl ustaad-glow flex items-center justify-between gap-4 transition-all transform active:scale-98 touch-target-huge cursor-pointer group"
        >
          <div className="flex items-center gap-4 text-left">
            <div className="w-14 h-14 rounded-2xl bg-black text-[#FFC400] flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
              <Play className="w-7 h-7 fill-[#FFC400]" />
            </div>
            <div>
              <span className="block leading-none tracking-tight">
                {t.startJob}
              </span>
              <span className="text-xs sm:text-sm font-bold text-black/75 mt-1 block">
                లైవ్ కెమెరా & ఆడియో గైడెన్స్ (Live Camera & Mic)
              </span>
            </div>
          </div>

          <div className="w-10 h-10 rounded-full bg-black/10 flex items-center justify-center flex-shrink-0">
            <ArrowRight className="w-6 h-6 stroke-[3]" />
          </div>
        </button>

        <p className="text-center text-[11px] text-amber-400 font-bold mt-2 flex items-center justify-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>పని ప్రారంభానికి ముందు 3-స్టెప్ సేఫ్టీ గేట్ ఖచ్చితం</span>
        </p>
      </div>

      {/* Today's Key Metrics Overview */}
      <div className="grid grid-cols-3 gap-2.5 sm:gap-3">
        {/* Metric 1 */}
        <div className="bg-[#14171e] p-3.5 sm:p-4 rounded-2xl border border-gray-800 text-center">
          <span className="text-2xl sm:text-3xl font-black text-emerald-400 block leading-tight">
            {technician.verifiedJobsCount}
          </span>
          <span className="text-[11px] font-bold text-gray-400 leading-tight block mt-0.5">
            {t.verifiedJobs}
          </span>
        </div>

        {/* Metric 2 */}
        <div className="bg-[#14171e] p-3.5 sm:p-4 rounded-2xl border border-gray-800 text-center">
          <span className="text-2xl sm:text-3xl font-black text-[#FFC400] block leading-tight">
            {technician.trustScore}
          </span>
          <span className="text-[11px] font-bold text-gray-400 leading-tight block mt-0.5">
            {t.trustScore}
          </span>
        </div>

        {/* Metric 3 */}
        <div className="bg-[#14171e] p-3.5 sm:p-4 rounded-2xl border border-gray-800 text-center">
          <span className="text-2xl sm:text-3xl font-black text-blue-400 block leading-tight">
            100%
          </span>
          <span className="text-[11px] font-bold text-gray-400 leading-tight block mt-0.5">
            సేఫ్టీ స్ట్రీక్
          </span>
        </div>
      </div>

      {/* Navigation Feature Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        {/* Card 1: My Skill Passport */}
        <div
          onClick={onOpenPassport}
          className="p-5 rounded-3xl bg-[#14171e] border-2 border-gray-800 hover:border-[#FFC400] transition-all cursor-pointer flex flex-col justify-between shadow-xl group touch-target-huge"
        >
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="w-12 h-12 rounded-2xl bg-[#FFC400]/20 text-[#FFC400] flex items-center justify-center border border-[#FFC400]/40 group-hover:scale-105 transition-transform">
                <Award className="w-6 h-6" />
              </div>
              <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-950/60 px-2.5 py-1 rounded-full border border-emerald-600/40">
                {technician.badges.length} Badges
              </span>
            </div>

            <h3 className="text-lg font-black text-white group-hover:text-[#FFC400] transition-colors">
              {t.myPassport}
            </h3>
            <p className="text-xs text-gray-400 mt-1 leading-relaxed">
              ధృవీకరించబడిన పనులతో సంపాదించిన బ్యాడ్జ్‌లు, ట్రస్ట్ స్కోర్ మరియు క్యూఆర్ కోడ్.
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-gray-800/80 flex items-center justify-between text-xs font-bold text-amber-400">
            <span>పాస్‌పోర్ట్ తెరవండి</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

        {/* Card 2: Partner / Contractor View */}
        <div
          onClick={onOpenPartnerView}
          className="p-5 rounded-3xl bg-[#14171e] border-2 border-gray-800 hover:border-blue-500/80 transition-all cursor-pointer flex flex-col justify-between shadow-xl group touch-target-huge"
        >
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="w-12 h-12 rounded-2xl bg-blue-950/60 text-blue-400 flex items-center justify-center border border-blue-500/40 group-hover:scale-105 transition-transform">
                <Building2 className="w-6 h-6" />
              </div>
              <span className="text-xs font-mono font-bold text-blue-300 bg-blue-950/60 px-2.5 py-1 rounded-full border border-blue-500/40">
                Companies
              </span>
            </div>

            <h3 className="text-lg font-black text-white group-hover:text-blue-400 transition-colors">
              {t.partnerView}
            </h3>
            <p className="text-xs text-gray-400 mt-1 leading-relaxed">
              హోమ్ సర్వీసెస్ & కాంట్రాక్టర్ల కోసం వెరిఫైడ్ టెక్నీషియన్ల జాబితా & ఫిల్టర్లు.
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-gray-800/80 flex items-center justify-between text-xs font-bold text-blue-400">
            <span>కంపెనీ వ్యూ చూడండి</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>

      {/* Row: Offline Guidance Mode & Skill Tests */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        {/* Offline Guidance Mode Card */}
        <div
          onClick={onOpenOfflineMode}
          className="p-5 rounded-3xl bg-[#1a1714] border-2 border-amber-600/50 hover:border-amber-400 transition-all cursor-pointer shadow-xl flex flex-col justify-between group touch-target-huge"
        >
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-[#FFC400] flex items-center justify-center border border-amber-500/40 group-hover:scale-105 transition-transform">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <span className="text-xs font-mono font-bold text-amber-300 bg-amber-950/60 px-2.5 py-1 rounded-full border border-amber-600/40">
                0 Bars Signal
              </span>
            </div>

            <h3 className="text-lg font-black text-white group-hover:text-amber-300 transition-colors">
              {t.offlineModeTitle}
            </h3>
            <p className="text-xs text-gray-400 mt-1 leading-relaxed">
              బేస్‌మెంట్ లేదా నెట్‌వర్క్ లేని ప్రదేశంలో గైడెన్స్ ప్యాకెట్ డౌన్‌లోడ్ చేసుకోండి.
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-gray-800/80 flex items-center justify-between text-xs font-bold text-amber-400">
            <span>ఆఫ్‌లైన్ ప్యాకెట్ తెరవండి</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

        {/* Skill Tests Card */}
        <div
          onClick={onOpenSkillTests}
          className="p-5 rounded-3xl bg-[#161a22] border-2 border-emerald-600/50 hover:border-emerald-400 transition-all cursor-pointer shadow-xl flex flex-col justify-between group touch-target-huge"
        >
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/40 group-hover:scale-105 transition-transform">
                <Award className="w-6 h-6" />
              </div>
              <span className="text-xs font-mono font-bold text-emerald-300 bg-emerald-950/60 px-2.5 py-1 rounded-full border border-emerald-600/40">
                4 Exams
              </span>
            </div>

            <h3 className="text-lg font-black text-white group-hover:text-emerald-300 transition-colors">
              {t.skillTestsTab}
            </h3>
            <p className="text-xs text-gray-400 mt-1 leading-relaxed">
              రక్షణ & వైరింగ్ నిబంధనలపై పరీక్షలు రాసి సర్టిఫైడ్ స్కిల్ బ్యాడ్జ్‌లు సంపాదించండి.
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-gray-800/80 flex items-center justify-between text-xs font-bold text-emerald-400">
            <span>పరీక్షలు రాయండి</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>

      {/* Card 3: Argon High Thinking Troubleshooter */}
      <div
        onClick={onOpenTroubleshooter}
        className="p-5 rounded-3xl bg-gradient-to-r from-[#181324] to-[#14171e] border-2 border-purple-800/50 hover:border-purple-500 transition-all cursor-pointer shadow-xl group touch-target-huge"
      >
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-purple-950 text-purple-300 flex items-center justify-center border border-purple-500/50 flex-shrink-0 group-hover:scale-105 transition-transform">
              <Brain className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-black text-white group-hover:text-purple-300 transition-colors">
                  {t.thinkingModeTitle}
                </h3>
              </div>
              <p className="text-xs text-gray-400 mt-0.5">
                ట్రిప్పింగ్, న్యూట్రల్ లీకేజ్ వంటి క్లిష్టమైన సమస్యల పరిష్కారం.
              </p>
            </div>
          </div>

          <div className="w-9 h-9 rounded-full bg-purple-950/70 flex items-center justify-center flex-shrink-0 text-purple-300">
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>
    </div>
  );
};
