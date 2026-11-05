import React, { useState } from 'react';
import { Language, SafetyChecklist } from '../types';
import { translations } from '../utils/i18n';
import { ShieldCheck, AlertTriangle, CheckSquare, Square, Zap, X } from 'lucide-react';

interface SafetyGateModalProps {
  language: Language;
  isOpen: boolean;
  onClose: () => void;
  onConfirmedStart: () => void;
}

export const SafetyGateModal: React.FC<SafetyGateModalProps> = ({
  language,
  isOpen,
  onClose,
  onConfirmedStart,
}) => {
  const t = translations[language];

  const [checklist, setChecklist] = useState<SafetyChecklist>({
    mcbOff: false,
    testerUsed: false,
    notWorkingLive: false,
  });

  if (!isOpen) return null;

  const allChecked = checklist.mcbOff && checklist.testerUsed && checklist.notWorkingLive;

  const toggleCheck = (key: keyof SafetyChecklist) => {
    setChecklist(prev => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleStart = () => {
    if (allChecked) {
      onConfirmedStart();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/85 backdrop-blur-md animate-fade-in">
      <div className="w-full sm:max-w-lg bg-[#14171d] border-t-4 sm:border-2 border-[#FFC400] rounded-t-3xl sm:rounded-2xl p-5 sm:p-6 shadow-2xl flex flex-col max-h-[92vh] overflow-y-auto">
        {/* Top Header */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#FFC400] text-black flex items-center justify-center flex-shrink-0 ustaad-glow">
              <ShieldCheck className="w-7 h-7 stroke-[2.5]" />
            </div>
            <div>
              <h2 className="text-xl font-extrabold text-white">
                {t.safetyGateTitle}
              </h2>
              <p className="text-xs text-amber-300/90 font-medium">
                {t.safetyGateSubtitle}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-white rounded-full bg-[#1e222b] touch-target-huge flex items-center justify-center"
            aria-label="Close safety gate"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Hazard Warning Banner */}
        <div className="bg-red-950/50 border border-red-600/40 rounded-xl p-3 mb-5 flex items-start gap-2.5">
          <AlertTriangle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
          <p className="text-xs font-semibold text-red-200">
            {t.safetyWarning}
          </p>
        </div>

        {/* 3 Big Mandatory Checkboxes (min 56px touch target each) */}
        <div className="space-y-3 mb-6">
          {/* Check 1: MCB is OFF */}
          <button
            type="button"
            onClick={() => toggleCheck('mcbOff')}
            className={`w-full p-4 rounded-xl text-left border-2 transition-all flex items-center justify-between gap-3 touch-target-huge cursor-pointer ${
              checklist.mcbOff
                ? 'bg-amber-500/15 border-[#FFC400] text-white shadow-md'
                : 'bg-[#1b1f28] border-gray-700/70 text-gray-300 hover:border-gray-500'
            }`}
          >
            <div className="flex items-center gap-3.5">
              <span className="w-7 h-7 rounded-full bg-[#242935] text-[#FFC400] font-black text-xs flex items-center justify-center flex-shrink-0 border border-gray-600">
                1
              </span>
              <span className="font-bold text-sm sm:text-base leading-snug">
                {t.safetyCheck1}
              </span>
            </div>
            <div className="flex-shrink-0">
              {checklist.mcbOff ? (
                <CheckSquare className="w-7 h-7 text-[#FFC400] fill-[#FFC400]/20" />
              ) : (
                <Square className="w-7 h-7 text-gray-500" />
              )}
            </div>
          </button>

          {/* Check 2: Neon tester confirmed zero power */}
          <button
            type="button"
            onClick={() => toggleCheck('testerUsed')}
            className={`w-full p-4 rounded-xl text-left border-2 transition-all flex items-center justify-between gap-3 touch-target-huge cursor-pointer ${
              checklist.testerUsed
                ? 'bg-amber-500/15 border-[#FFC400] text-white shadow-md'
                : 'bg-[#1b1f28] border-gray-700/70 text-gray-300 hover:border-gray-500'
            }`}
          >
            <div className="flex items-center gap-3.5">
              <span className="w-7 h-7 rounded-full bg-[#242935] text-[#FFC400] font-black text-xs flex items-center justify-center flex-shrink-0 border border-gray-600">
                2
              </span>
              <span className="font-bold text-sm sm:text-base leading-snug">
                {t.safetyCheck2}
              </span>
            </div>
            <div className="flex-shrink-0">
              {checklist.testerUsed ? (
                <CheckSquare className="w-7 h-7 text-[#FFC400] fill-[#FFC400]/20" />
              ) : (
                <Square className="w-7 h-7 text-gray-500" />
              )}
            </div>
          </button>

          {/* Check 3: Not working on live wires */}
          <button
            type="button"
            onClick={() => toggleCheck('notWorkingLive')}
            className={`w-full p-4 rounded-xl text-left border-2 transition-all flex items-center justify-between gap-3 touch-target-huge cursor-pointer ${
              checklist.notWorkingLive
                ? 'bg-amber-500/15 border-[#FFC400] text-white shadow-md'
                : 'bg-[#1b1f28] border-gray-700/70 text-gray-300 hover:border-gray-500'
            }`}
          >
            <div className="flex items-center gap-3.5">
              <span className="w-7 h-7 rounded-full bg-[#242935] text-[#FFC400] font-black text-xs flex items-center justify-center flex-shrink-0 border border-gray-600">
                3
              </span>
              <span className="font-bold text-sm sm:text-base leading-snug">
                {t.safetyCheck3}
              </span>
            </div>
            <div className="flex-shrink-0">
              {checklist.notWorkingLive ? (
                <CheckSquare className="w-7 h-7 text-[#FFC400] fill-[#FFC400]/20" />
              ) : (
                <Square className="w-7 h-7 text-gray-500" />
              )}
            </div>
          </button>
        </div>

        {/* Enter Live Job Button (Mandatory activation condition) */}
        <div className="mt-auto pt-2">
          <button
            onClick={handleStart}
            disabled={!allChecked}
            className={`w-full py-4 px-6 rounded-2xl font-black text-lg transition-all flex items-center justify-center gap-3 touch-target-huge ${
              allChecked
                ? 'bg-[#FFC400] hover:bg-[#e0ad00] text-black shadow-lg ustaad-glow cursor-pointer transform active:scale-95'
                : 'bg-gray-800 text-gray-500 cursor-not-allowed border border-gray-700'
            }`}
          >
            <Zap className={`w-6 h-6 ${allChecked ? 'fill-black' : ''}`} />
            <span>{t.enterLiveJob}</span>
          </button>
          {!allChecked && (
            <p className="text-center text-xs text-amber-400/80 mt-2 font-medium">
              ⚠️ {t.pleaseConfirmAll}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
