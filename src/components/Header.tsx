import React from 'react';
import { Language, Technician } from '../types';
import { translations } from '../utils/i18n';
import { Zap, Wifi, WifiOff, Globe, Database } from 'lucide-react';

interface HeaderProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
  isDemoData: boolean;
  onToggleDemoData: () => void;
  isLowBandwidth: boolean;
  onToggleLowBandwidth: () => void;
  currentTechnician: Technician;
  onGoHome: () => void;
  activeScreen: string;
  isOnline: boolean;
  onToggleSimulateOffline: () => void;
  pendingSyncCount: number;
  onTriggerSync: () => void;
  onOpenOfflinePackets: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  language,
  onLanguageChange,
  isDemoData,
  onToggleDemoData,
  isLowBandwidth,
  onToggleLowBandwidth,
  currentTechnician,
  onGoHome,
  isOnline,
  onToggleSimulateOffline,
  pendingSyncCount,
  onTriggerSync,
  onOpenOfflinePackets,
}) => {
  const t = translations[language];

  return (
    <header className="sticky top-0 z-40 bg-[#121418] border-b border-[#262a33] px-3 py-2.5 sm:px-4">
      <div className="max-w-4xl mx-auto flex items-center justify-between gap-2">
        {/* Logo and Brand */}
        <button
          onClick={onGoHome}
          className="flex items-center gap-2.5 text-left focus:outline-none group touch-target-huge"
          aria-label="Ustaad Home"
        >
          <div className="w-10 h-10 rounded-xl bg-[#FFC400] text-black font-black flex items-center justify-center text-xl shadow-md group-hover:scale-105 transition-transform flex-shrink-0">
            <Zap className="w-6 h-6 fill-black text-black stroke-2" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-xl sm:text-2xl tracking-tight text-white flex items-center gap-1.5">
                {t.appName}
                <span className="text-xs px-1.5 py-0.5 rounded bg-[#FFC400]/20 text-[#FFC400] font-semibold border border-[#FFC400]/40">
                  AI
                </span>
              </span>
            </div>
            <p className="text-[11px] text-gray-400 hidden xs:block truncate max-w-[190px]">
              {t.roleTag}
            </p>
          </div>
        </button>

        {/* Action Controls & Settings */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Sync Queue Button (Shows if pending items exist) */}
          {pendingSyncCount > 0 && (
            <button
              onClick={onTriggerSync}
              title={t.syncNowButton}
              className="px-2.5 py-1.5 rounded-xl text-xs font-black bg-gradient-to-r from-amber-500 to-emerald-500 text-black shadow-lg animate-pulse flex items-center gap-1.5 touch-target-huge sm:min-h-0 sm:min-w-0 cursor-pointer"
            >
              <Zap className="w-3.5 h-3.5 fill-black" />
              <span>సింక్ ({pendingSyncCount})</span>
            </button>
          )}

          {/* Network Status / Offline Mode Button */}
          <button
            onClick={onOpenOfflinePackets}
            title={isOnline ? 'Online (Tap for Offline Mode)' : 'Offline Mode Active'}
            className={`px-2.5 py-1.5 rounded-xl text-xs font-extrabold transition-all flex items-center gap-1.5 touch-target-huge sm:min-h-0 sm:min-w-0 ${
              !isOnline
                ? 'bg-amber-500 text-black border border-amber-400 shadow-md font-black'
                : 'bg-[#1b1e24] text-gray-300 hover:text-white border border-gray-700/60'
            }`}
          >
            {isOnline ? (
              <>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="hidden sm:inline">ఆఫ్‌లైన్ గైడ్</span>
                <span className="sm:hidden">OFFLINE</span>
              </>
            ) : (
              <>
                <WifiOff className="w-3.5 h-3.5 text-black" />
                <span>ఆఫ్‌లైన్</span>
              </>
            )}
          </button>

          {/* Demo Data Tag / Toggle */}
          <button
            onClick={onToggleDemoData}
            title="Toggle Stage Demo Data"
            className={`px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 touch-target-huge sm:min-h-0 sm:min-w-0 ${
              isDemoData
                ? 'bg-amber-500/20 text-[#FFC400] border border-[#FFC400]/50 shadow-sm'
                : 'bg-[#1b1e24] text-gray-400 hover:text-gray-200 border border-gray-700/50'
            }`}
          >
            <Database className="w-3.5 h-3.5 text-[#FFC400]" />
            <span className="hidden sm:inline">
              {isDemoData ? 'DEMO DATA ON' : 'DEMO OFF'}
            </span>
            <span className="sm:hidden font-mono text-[10px]">
              {isDemoData ? 'DEMO' : 'LIVE'}
            </span>
          </button>

          {/* Low Bandwidth Mode Toggle */}
          <button
            onClick={onToggleLowBandwidth}
            title={t.lowBandwidth}
            className={`p-2 rounded-lg text-xs font-medium transition-all touch-target-huge sm:min-h-0 sm:min-w-0 flex items-center justify-center ${
              isLowBandwidth
                ? 'bg-blue-900/40 text-blue-400 border border-blue-600/50'
                : 'bg-[#1b1e24] text-gray-400 hover:text-gray-200 border border-gray-700/50'
            }`}
            aria-label="Toggle low bandwidth mode"
          >
            {isLowBandwidth ? (
              <WifiOff className="w-4 h-4 text-blue-400" />
            ) : (
              <Wifi className="w-4 h-4 text-gray-400" />
            )}
          </button>

          {/* Language Switcher: Telugu (Default), Hindi, English */}
          <div className="flex items-center bg-[#1b1e24] p-0.5 rounded-xl border border-gray-700/60">
            <button
              onClick={() => onLanguageChange('te')}
              className={`px-2 py-1 text-xs font-bold rounded-lg transition-all touch-target-huge sm:min-h-0 sm:min-w-0 ${
                language === 'te'
                  ? 'bg-[#FFC400] text-black shadow-sm font-black'
                  : 'text-gray-400 hover:text-gray-200'
              }`}
            >
              తెలుగు
            </button>
            <button
              onClick={() => onLanguageChange('hi')}
              className={`px-2 py-1 text-xs font-bold rounded-lg transition-all touch-target-huge sm:min-h-0 sm:min-w-0 ${
                language === 'hi'
                  ? 'bg-[#FFC400] text-black shadow-sm font-black'
                  : 'text-gray-400 hover:text-gray-200'
              }`}
            >
              हिंदी
            </button>
            <button
              onClick={() => onLanguageChange('en')}
              className={`px-2 py-1 text-xs font-bold rounded-lg transition-all touch-target-huge sm:min-h-0 sm:min-w-0 ${
                language === 'en'
                  ? 'bg-[#FFC400] text-black shadow-sm font-black'
                  : 'text-gray-400 hover:text-gray-200'
              }`}
            >
              EN
            </button>
          </div>
        </div>
      </div>

      {/* Visible DEMO DATA alert bar if active */}
      {isDemoData && (
        <div className="mt-1.5 py-0.5 px-3 bg-amber-950/60 border border-amber-600/40 rounded-md text-center">
          <p className="text-[10px] font-mono font-bold tracking-wider text-[#FFC400] flex items-center justify-center gap-1.5 uppercase">
            <span className="w-2 h-2 rounded-full bg-[#FFC400] animate-pulse"></span>
            STAGE DEMO DATA LOADED — 6 Real Technicians & Verified Job Credentials
          </p>
        </div>
      )}
    </header>
  );
};
