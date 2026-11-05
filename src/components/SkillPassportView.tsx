import React, { useState, useEffect } from 'react';
import { Language, Technician, JobRecord } from '../types';
import { translations, sampleBadges } from '../utils/i18n';
import QRCode from 'qrcode';
import {
  ShieldCheck,
  Award,
  Zap,
  Share2,
  QrCode as QrIcon,
  CheckCircle,
  AlertTriangle,
  Calendar,
  Layers,
  ExternalLink,
  ChevronRight,
  Info,
  X,
  Copy,
  Check,
} from 'lucide-react';

interface SkillPassportViewProps {
  language: Language;
  technician: Technician;
  onSelectJob?: (job: JobRecord) => void;
  onOpenSkillTests?: () => void;
  isReadOnly?: boolean;
}

export const SkillPassportView: React.FC<SkillPassportViewProps> = ({
  language,
  technician,
  onSelectJob,
  onOpenSkillTests,
  isReadOnly = false,
}) => {
  const t = translations[language];
  const [qrModalOpen, setQrModalOpen] = useState(false);
  const [qrDataUrl, setQrDataUrl] = useState<string>('');
  const [copiedLink, setCopiedLink] = useState(false);

  // Generate QR code for public passport link
  useEffect(() => {
    const passportUrl = `${window.location.origin}?passport=${technician.id}`;
    QRCode.toDataURL(passportUrl, {
      width: 280,
      margin: 2,
      color: {
        dark: '#000000',
        light: '#ffffff',
      },
    })
      .then(url => setQrDataUrl(url))
      .catch(err => console.error('QR code error:', err));
  }, [technician.id]);

  const copyShareLink = () => {
    const passportUrl = `${window.location.origin}?passport=${technician.id}`;
    navigator.clipboard.writeText(passportUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-6 space-y-6 animate-fade-in pb-20">
      {/* Read-only notification if accessed publicly */}
      {isReadOnly && (
        <div className="bg-[#1a221a] border border-emerald-500/50 p-3 rounded-xl flex items-center justify-between text-xs text-emerald-300">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span className="font-semibold">{t.publicViewNote}</span>
          </div>
          <span className="font-mono bg-emerald-950 px-2 py-0.5 rounded border border-emerald-600/40 text-[10px]">
            OFFICIAL USTAAD RECORD
          </span>
        </div>
      )}

      {/* Main Technician Profile Card */}
      <div className="bg-[#14171e] border-2 border-[#FFC400]/40 rounded-3xl p-5 sm:p-7 shadow-2xl relative overflow-hidden">
        {/* Background circuit motif */}
        <div className="absolute -right-12 -top-12 w-48 h-48 bg-[#FFC400]/5 rounded-full pointer-events-none" />

        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
          {/* Avatar with verified badge */}
          <div className="relative flex-shrink-0">
            <img
              src={technician.avatar}
              alt={technician.name[language]}
              className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover border-4 border-[#FFC400] shadow-xl"
            />
            <div className="absolute -bottom-2 -right-2 bg-emerald-500 text-black rounded-full p-1 border-2 border-[#14171e] shadow-md">
              <CheckCircle className="w-5 h-5 stroke-[3] fill-emerald-500 text-black" />
            </div>
          </div>

          {/* Details */}
          <div className="flex-1 text-center sm:text-left">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-1">
              <h1 className="text-xl sm:text-2xl font-black text-white">
                {technician.name[language]}
              </h1>
              {technician.isDemo && (
                <span className="px-2 py-0.5 bg-amber-500/20 text-[#FFC400] text-[10px] font-mono font-bold rounded border border-[#FFC400]/40">
                  DEMO DATA
                </span>
              )}
            </div>

            <p className="text-sm font-bold text-amber-400 mb-2">
              {technician.trade[language]}
            </p>

            <p className="text-xs text-gray-400 flex flex-wrap items-center justify-center sm:justify-start gap-3">
              <span>📍 {technician.city[language]}</span>
              <span>•</span>
              <span>⚡ {technician.experienceYears} సంవత్సరాల అనుభవం</span>
            </p>

            {/* Share and QR Buttons */}
            <div className="mt-4 flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <button
                onClick={copyShareLink}
                className="px-3.5 py-2 rounded-xl bg-[#202530] hover:bg-[#2c3342] text-xs font-bold text-gray-200 border border-gray-700 flex items-center gap-2 touch-target-huge sm:min-h-0 sm:min-w-0"
              >
                {copiedLink ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
                <span>{copiedLink ? 'లింక్ కాపీ అయింది!' : t.sharePassport}</span>
              </button>

              <button
                onClick={() => setQrModalOpen(true)}
                className="px-3.5 py-2 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-xs font-bold text-[#FFC400] border border-[#FFC400]/40 flex items-center gap-2 touch-target-huge sm:min-h-0 sm:min-w-0"
              >
                <QrIcon className="w-4 h-4" />
                <span>{t.qrCode}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Explainable Trust Score Breakdown */}
        <div className="mt-6 pt-5 border-t border-gray-800/80">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-3">
            <div>
              <span className="text-xs font-extrabold text-[#FFC400] uppercase tracking-wider block">
                {t.trustScoreExplained}
              </span>
              <p className="text-[11px] text-gray-400">{t.howCalculated}</p>
            </div>
            <div className="flex items-center gap-2 bg-[#1c212c] px-4 py-2 rounded-xl border border-amber-500/30">
              <span className="text-xs font-bold text-gray-400">{t.trustScore}:</span>
              <span className="text-2xl font-black text-[#FFC400]">{technician.trustScore}</span>
              <span className="text-xs font-bold text-gray-500">/ 100</span>
            </div>
          </div>

          {/* Breakdown bars */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="bg-black/40 p-3 rounded-xl border border-gray-800">
              <div className="flex justify-between text-[11px] mb-1 font-bold">
                <span className="text-gray-300">ధృవీకరించిన పనులు ({technician.verifiedJobsCount})</span>
                <span className="text-emerald-400">+{technician.trustBreakdown.verifiedJobsPoints} pts</span>
              </div>
              <div className="w-full bg-gray-800 h-2 rounded-full overflow-hidden">
                <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${(technician.trustBreakdown.verifiedJobsPoints / 50) * 100}%` }} />
              </div>
            </div>

            <div className="bg-black/40 p-3 rounded-xl border border-gray-800">
              <div className="flex justify-between text-[11px] mb-1 font-bold">
                <span className="text-gray-300">సేఫ్టీ చెక్ 100% ఉత్తీర్ణత</span>
                <span className="text-blue-400">+{technician.trustBreakdown.safetyCompliancePoints} pts</span>
              </div>
              <div className="w-full bg-gray-800 h-2 rounded-full overflow-hidden">
                <div className="bg-blue-500 h-full rounded-full" style={{ width: `${(technician.trustBreakdown.safetyCompliancePoints / 40) * 100}%` }} />
              </div>
            </div>

            <div className="bg-black/40 p-3 rounded-xl border border-gray-800">
              <div className="flex justify-between text-[11px] mb-1 font-bold">
                <span className="text-gray-300">నివారించిన పొరపాట్లు ({technician.criticalMistakesPrevented})</span>
                <span className="text-amber-400">+{technician.trustBreakdown.mistakesResolvedPoints} pts</span>
              </div>
              <div className="w-full bg-gray-800 h-2 rounded-full overflow-hidden">
                <div className="bg-[#FFC400] h-full rounded-full" style={{ width: `${(technician.trustBreakdown.mistakesResolvedPoints / 15) * 100}%` }} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Skill Tests Section Trigger Card */}
      {!isReadOnly && onOpenSkillTests && (
        <div
          onClick={onOpenSkillTests}
          className="p-5 rounded-3xl bg-gradient-to-r from-[#1c1825] to-[#14171e] border-2 border-amber-500/50 hover:border-[#FFC400] transition-all cursor-pointer shadow-xl flex items-center justify-between gap-4 group touch-target-huge"
        >
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-[#FFC400] text-black flex items-center justify-center font-black flex-shrink-0 group-hover:scale-110 transition-transform ustaad-glow">
              <Award className="w-7 h-7 stroke-[2.5]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-black text-white group-hover:text-[#FFC400] transition-colors">
                  {t.skillTestsTab}
                </h3>
                <span className="text-[10px] font-mono font-bold bg-amber-500/20 text-[#FFC400] px-2 py-0.5 rounded border border-[#FFC400]/40">
                  NEW
                </span>
              </div>
              <p className="text-xs text-gray-300 mt-0.5">
                {t.skillTestsSubtitle}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs font-bold text-[#FFC400] flex-shrink-0">
            <span className="hidden sm:inline">పరీక్ష రాయండి</span>
            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      )}

      {/* Earned Skill Badges (Earned from verified jobs & skill tests) */}
      <div className="bg-[#14171e] border border-gray-800 rounded-3xl p-5 sm:p-6">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-base font-extrabold text-white flex items-center gap-2">
            <Award className="w-5 h-5 text-[#FFC400]" />
            <span>{t.earnedBadges}</span>
          </h2>
          <span className="text-xs font-mono font-bold text-amber-400 bg-amber-500/15 px-2.5 py-1 rounded-lg border border-amber-500/30">
            {technician.badges.length} Badges Earned
          </span>
        </div>
        <p className="text-xs text-gray-400 mb-4">{t.verifiedOnlyNote}</p>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {technician.badges.map(badgeId => {
            const badge = sampleBadges[badgeId] || {
              te: badgeId,
              hi: badgeId,
              en: badgeId,
              icon: 'Zap',
            };
            return (
              <div
                key={badgeId}
                className="p-3.5 rounded-2xl bg-[#1b1f28] border border-amber-500/30 flex flex-col items-center text-center gap-2 shadow-md hover:border-[#FFC400] transition-colors"
              >
                <div className="w-11 h-11 rounded-2xl bg-[#FFC400]/20 text-[#FFC400] border border-[#FFC400]/50 flex items-center justify-center">
                  <Zap className="w-6 h-6 fill-[#FFC400]" />
                </div>
                <span className="font-extrabold text-xs text-white leading-tight">
                  {badge[language]}
                </span>
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded">
                  ✓ VERIFIED
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Verified Jobs Timeline */}
      <div className="bg-[#14171e] border border-gray-800 rounded-3xl p-5 sm:p-6">
        <h2 className="text-base font-extrabold text-white mb-4 flex items-center gap-2">
          <Calendar className="w-5 h-5 text-[#FFC400]" />
          <span>{t.recentVerifiedJobs} ({technician.jobs.length})</span>
        </h2>

        {technician.jobs.length > 0 ? (
          <div className="space-y-4">
            {technician.jobs.map(job => (
              <div
                key={job.id}
                onClick={() => onSelectJob?.(job)}
                className="p-4 rounded-2xl bg-[#1b1f28] border border-gray-800 hover:border-amber-500/50 transition-all cursor-pointer flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              >
                {/* Thumbnails */}
                <div className="flex items-center gap-3">
                  <div className="relative w-24 h-16 bg-black rounded-xl overflow-hidden border border-gray-700 flex-shrink-0">
                    <img
                      src={job.afterPhoto || job.beforePhoto}
                      alt={job.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-0 right-0 bg-[#FFC400] text-black text-[9px] font-black px-1.5 py-0.5 rounded-tl">
                      {job.qualityScore}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-extrabold text-sm sm:text-base text-white leading-tight">
                      {job.title}
                    </h3>
                    <p className="text-xs text-gray-400 mt-1 flex items-center gap-2">
                      <span>{job.date}</span>
                      <span>•</span>
                      <span className="text-emerald-400 font-semibold">{job.trade}</span>
                    </p>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {job.skillTags.slice(0, 3).map((tag, i) => (
                        <span key={i} className="text-[10px] bg-gray-800 text-gray-300 px-2 py-0.5 rounded font-medium">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Arrow */}
                <div className="flex items-center gap-1 text-xs text-amber-400 font-bold self-end sm:self-center">
                  <span>వివరాలు</span>
                  <ChevronRight className="w-4 h-4" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500 text-xs">
            ఇంకా ధృవీకరించిన పనులు లేవు. కొత్త పనిని ప్రారంభించండి!
          </div>
        )}
      </div>

      {/* QR Code Modal */}
      {qrModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="bg-[#181b22] border-2 border-[#FFC400] rounded-3xl p-6 max-w-sm w-full text-center shadow-2xl relative">
            <button
              onClick={() => setQrModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white rounded-full bg-gray-800 touch-target-huge"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-black text-white mb-1">{t.qrCode}</h3>
            <p className="text-xs text-gray-400 mb-4">{t.scanToVerify}</p>

            <div className="bg-white p-3 rounded-2xl mx-auto inline-block shadow-inner mb-4">
              {qrDataUrl && <img src={qrDataUrl} alt="Passport QR" className="w-56 h-56" />}
            </div>

            <p className="text-xs font-bold text-amber-300 mb-3">{technician.name[language]}</p>
            <p className="text-[11px] text-gray-400 font-mono">
              ID: {technician.id} • Trust: {technician.trustScore}/100
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
