import React, { useState } from 'react';
import { Language, Technician } from '../types';
import { translations, sampleBadges } from '../utils/i18n';
import {
  Building2,
  ShieldCheck,
  AlertTriangle,
  Award,
  Search,
  Filter,
  CheckCircle,
  ExternalLink,
  Zap,
  Star,
  Users,
} from 'lucide-react';

interface PartnerViewProps {
  language: Language;
  technicians: Technician[];
  onOpenPassport: (technician: Technician) => void;
}

export const PartnerView: React.FC<PartnerViewProps> = ({
  language,
  technicians,
  onOpenPassport,
}) => {
  const t = translations[language];

  // Filters state
  const [selectedSkill, setSelectedSkill] = useState<string>('all');
  const [minTrustScore, setMinTrustScore] = useState<number>(0);
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Aggregated Counters across all technicians
  const totalVerifiedJobs = technicians.reduce((acc, tech) => acc + tech.verifiedJobsCount, 0);
  const totalMistakesCaught = technicians.reduce((acc, tech) => acc + tech.criticalMistakesPrevented, 0);
  const totalSafetyChecks = technicians.reduce((acc, tech) => acc + tech.safetyChecksPassedCount, 0);

  // Filtered Technicians
  const filteredTechnicians = technicians.filter(tech => {
    // Skill filter
    if (selectedSkill !== 'all' && !tech.badges.includes(selectedSkill)) {
      return false;
    }
    // Trust score filter
    if (tech.trustScore < minTrustScore) {
      return false;
    }
    // Search query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const name = tech.name[language]?.toLowerCase() || '';
      const city = tech.city[language]?.toLowerCase() || '';
      const trade = tech.trade[language]?.toLowerCase() || '';
      if (!name.includes(q) && !city.includes(q) && !trade.includes(q)) {
        return false;
      }
    }
    return true;
  });

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-6 animate-fade-in pb-20">
      {/* Top Company Partner Header */}
      <div className="bg-[#14171e] border-2 border-[#FFC400]/40 rounded-3xl p-5 sm:p-7 shadow-xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-black text-[#FFC400] uppercase tracking-wider flex items-center gap-2 mb-1">
              <Building2 className="w-4 h-4" />
              {t.partnerView}
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-white">
              {t.partnerTitle}
            </h1>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              {t.partnerSubtitle}
            </p>
          </div>

          <div className="bg-[#1c202a] px-3.5 py-2 rounded-xl border border-gray-700/80 text-right">
            <span className="text-[10px] text-gray-400 uppercase font-mono block">PARTNER API</span>
            <span className="text-xs font-bold text-emerald-400">● LIVE VERIFICATION SYNC</span>
          </div>
        </div>

        {/* 3 Big Platform Counters as requested */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 mt-6 pt-5 border-t border-gray-800">
          {/* Counter 1: Jobs Verified */}
          <div className="bg-black/50 p-4 rounded-2xl border border-gray-800/90 flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-emerald-950/80 text-emerald-400 flex items-center justify-center flex-shrink-0 border border-emerald-500/40">
              <CheckCircle className="w-6 h-6 stroke-[2.5]" />
            </div>
            <div>
              <span className="text-2xl sm:text-3xl font-black text-white block leading-none">
                {totalVerifiedJobs}
              </span>
              <span className="text-xs text-gray-400 font-semibold">
                {t.totalJobsVerified}
              </span>
            </div>
          </div>

          {/* Counter 2: Critical Mistakes Caught / Prevented */}
          <div className="bg-black/50 p-4 rounded-2xl border border-gray-800/90 flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-amber-950/80 text-[#FFC400] flex items-center justify-center flex-shrink-0 border border-amber-500/40">
              <AlertTriangle className="w-6 h-6 stroke-[2.5]" />
            </div>
            <div>
              <span className="text-2xl sm:text-3xl font-black text-[#FFC400] block leading-none">
                {totalMistakesCaught}
              </span>
              <span className="text-xs text-gray-400 font-semibold">
                {t.criticalMistakesPreventedStat}
              </span>
            </div>
          </div>

          {/* Counter 3: Safety Checks Passed */}
          <div className="bg-black/50 p-4 rounded-2xl border border-gray-800/90 flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-blue-950/80 text-blue-400 flex items-center justify-center flex-shrink-0 border border-blue-500/40">
              <ShieldCheck className="w-6 h-6 stroke-[2.5]" />
            </div>
            <div>
              <span className="text-2xl sm:text-3xl font-black text-white block leading-none">
                100%
              </span>
              <span className="text-xs text-gray-400 font-semibold">
                {t.safetyComplianceRate} ({totalSafetyChecks} Checks)
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-[#14171e] border border-gray-800 p-4 rounded-2xl space-y-3">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-gray-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder={t.searchTechnician}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#1b1f28] text-white text-xs sm:text-sm border border-gray-700/80 focus:outline-none focus:border-[#FFC400]"
            />
          </div>

          {/* Trust Score Filter */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-400 flex-shrink-0 font-medium">
              {t.filterByTrust}:
            </span>
            <select
              value={minTrustScore}
              onChange={e => setMinTrustScore(Number(e.target.value))}
              className="bg-[#1b1f28] text-white text-xs py-2 px-3 rounded-xl border border-gray-700/80 focus:outline-none focus:border-[#FFC400]"
            >
              <option value={0}>All Scores</option>
              <option value={90}>90+ (Top Tier)</option>
              <option value={95}>95+ (Master)</option>
              <option value={98}>98+ (Elite)</option>
            </select>
          </div>
        </div>

        {/* Skill Badges Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
          <span className="text-gray-400 flex-shrink-0 font-medium">{t.filterBySkill}:</span>
          <button
            onClick={() => setSelectedSkill('all')}
            className={`px-3 py-1.5 rounded-xl font-bold flex-shrink-0 transition-all ${
              selectedSkill === 'all'
                ? 'bg-[#FFC400] text-black shadow-md'
                : 'bg-[#1b1f28] text-gray-400 hover:text-white border border-gray-700'
            }`}
          >
            {t.allSkills}
          </button>
          {Object.entries(sampleBadges).map(([key, badge]) => (
            <button
              key={key}
              onClick={() => setSelectedSkill(key)}
              className={`px-3 py-1.5 rounded-xl font-bold flex-shrink-0 transition-all ${
                selectedSkill === key
                  ? 'bg-[#FFC400] text-black shadow-md'
                  : 'bg-[#1b1f28] text-gray-400 hover:text-white border border-gray-700'
              }`}
            >
              {badge[language]}
            </button>
          ))}
        </div>
      </div>

      {/* Technicians List */}
      <div className="space-y-3.5">
        <div className="flex items-center justify-between text-xs text-gray-400 font-bold px-1">
          <span>{filteredTechnicians.length} TECHNICIANS VERIFIED</span>
          <span>CLICK ANY CARD FOR PUBLIC PASSPORT</span>
        </div>

        {filteredTechnicians.map(tech => (
          <div
            key={tech.id}
            onClick={() => onOpenPassport(tech)}
            className="p-4 sm:p-5 rounded-2xl bg-[#14171e] border-2 border-gray-800/80 hover:border-[#FFC400] transition-all cursor-pointer flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-lg group"
          >
            {/* Tech details */}
            <div className="flex items-center gap-4">
              <div className="relative flex-shrink-0">
                <img
                  src={tech.avatar}
                  alt={tech.name[language]}
                  className="w-16 h-16 sm:w-18 sm:h-18 rounded-2xl object-cover border-2 border-gray-700 group-hover:border-[#FFC400] transition-colors"
                />
                <div className="absolute -bottom-1 -right-1 bg-emerald-500 rounded-full p-0.5 border border-black">
                  <CheckCircle className="w-4 h-4 text-black fill-emerald-500" />
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-extrabold text-base sm:text-lg text-white group-hover:text-[#FFC400] transition-colors">
                    {tech.name[language]}
                  </h3>
                  {tech.isDemo && (
                    <span className="text-[9px] bg-amber-500/20 text-[#FFC400] px-1.5 py-0.5 rounded font-mono font-bold border border-[#FFC400]/40">
                      DEMO
                    </span>
                  )}
                </div>

                <p className="text-xs text-amber-300/90 font-medium">
                  {tech.trade[language]}
                </p>

                <p className="text-xs text-gray-400 mt-1">
                  📍 {tech.city[language]} • ⚡ {tech.experienceYears} yrs experience
                </p>

                {/* Skill Badges Preview */}
                <div className="flex flex-wrap gap-1 mt-2">
                  {tech.badges.slice(0, 4).map(bId => {
                    const b = sampleBadges[bId];
                    return (
                      <span
                        key={bId}
                        className="text-[10px] font-bold bg-[#1d222c] text-gray-300 px-2 py-0.5 rounded border border-gray-700"
                      >
                        {b ? b[language] : bId}
                      </span>
                    );
                  })}
                  {tech.badges.length > 4 && (
                    <span className="text-[10px] font-bold text-amber-400 bg-amber-500/10 px-1.5 py-0.5 rounded">
                      +{tech.badges.length - 4} more
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Score & Action */}
            <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-3 pt-3 sm:pt-0 border-t sm:border-t-0 border-gray-800">
              <div className="text-left sm:text-right">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs text-gray-400">{t.trustScore}:</span>
                  <span className="text-xl font-black text-[#FFC400]">{tech.trustScore}</span>
                </div>
                <span className="text-[11px] text-emerald-400 font-semibold block">
                  {tech.verifiedJobsCount} Verified Jobs
                </span>
              </div>

              <button className="px-3.5 py-2 rounded-xl bg-amber-500/20 text-[#FFC400] group-hover:bg-[#FFC400] group-hover:text-black font-extrabold text-xs transition-colors flex items-center gap-1.5 touch-target-huge sm:min-h-0 sm:min-w-0">
                <span>{t.viewFullPassport}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
