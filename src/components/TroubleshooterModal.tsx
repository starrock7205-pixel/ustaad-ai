import React, { useState } from 'react';
import { Language } from '../types';
import { translations } from '../utils/i18n';
import { Brain, Cpu, Send, Sparkles, X, ShieldAlert, CheckCircle2, RefreshCw } from 'lucide-react';

interface TroubleshooterModalProps {
  language: Language;
  isOpen: boolean;
  onClose: () => void;
}

export const TroubleshooterModal: React.FC<TroubleshooterModalProps> = ({
  language,
  isOpen,
  onClose,
}) => {
  const t = translations[language];
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  if (!isOpen) return null;

  const sampleQuestions = [
    'ఇన్వర్టర్ ఆన్ చేయగానే RCCB ఎందుకు ట్రిప్ అవుతోంది? (Inverter RCCB trip)',
    'న్యూట్రల్ వైరులో 60V కరెంట్ వస్తోంది. కారణం ఏమిటి? (Floating Neutral 60V)',
    '3-ఫేజ్ మోటార్ స్టార్టర్ కాంటాక్టర్ కాలిపోతోంది. ఎలా చెక్ చేయాలి? (Starter Burnout)',
  ];

  const handleDiagnose = async (questionText?: string) => {
    const q = questionText || query;
    if (!q.trim()) return;

    setIsLoading(true);
    setResult(null);

    try {
      const response = await fetch('/api/complex-troubleshoot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: q, language }),
      });
      const data = await response.json();
      setResult(data.result || data.diagnosis || JSON.stringify(data));
    } catch (err: any) {
      setResult('సమస్య విశ్లేషణలో లోపం ఏర్పడింది. దయచేసి నెట్‌వర్క్ తనిఖీ చేయండి.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/85 backdrop-blur-md animate-fade-in">
      <div className="bg-[#14171e] border-2 border-[#FFC400] rounded-3xl p-5 sm:p-7 max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-start justify-between gap-3 mb-4 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#FFC400] text-black flex items-center justify-center flex-shrink-0 ustaad-glow font-black">
              <Brain className="w-7 h-7 stroke-[2.5]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg sm:text-xl font-extrabold text-white">
                  {t.thinkingModeTitle}
                </h2>
                <span className="text-[10px] font-mono bg-purple-900/50 text-purple-300 px-2 py-0.5 rounded border border-purple-500/40">
                  gemini-4-argon
                </span>
              </div>
              <p className="text-xs text-amber-300 font-medium">
                High Thinking Deep Diagnostic Engine
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-white rounded-full bg-[#1e222b] touch-target-huge flex items-center justify-center"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Input box */}
        <div className="space-y-3 mb-4 flex-shrink-0">
          <div className="relative">
            <textarea
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder={t.askProblem}
              rows={3}
              className="w-full p-3.5 rounded-2xl bg-[#1b1f28] text-white text-sm border-2 border-gray-700 focus:border-[#FFC400] focus:outline-none"
            />
          </div>

          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex flex-wrap gap-1.5 text-xs">
              <span className="text-[11px] text-gray-400 font-semibold">త్వరిత ప్రశ్నలు:</span>
              {sampleQuestions.map((sq, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => {
                    setQuery(sq);
                    handleDiagnose(sq);
                  }}
                  className="text-[11px] bg-[#1d222c] hover:bg-gray-700 text-gray-300 px-2.5 py-1 rounded-lg border border-gray-700/80 transition-colors"
                >
                  {sq.split('?')[0]}?
                </button>
              ))}
            </div>

            <button
              onClick={() => handleDiagnose()}
              disabled={isLoading || !query.trim()}
              className={`px-5 py-2.5 rounded-xl font-black text-sm transition-all flex items-center gap-2 touch-target-huge sm:min-h-0 sm:min-w-0 ${
                isLoading || !query.trim()
                  ? 'bg-gray-800 text-gray-500 cursor-not-allowed'
                  : 'bg-[#FFC400] text-black shadow-lg hover:bg-[#e0ad00] cursor-pointer'
              }`}
            >
              {isLoading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>ఆలోచిస్తున్నాడు...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>{t.askButton}</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Results Area */}
        <div className="flex-1 overflow-y-auto bg-black/40 rounded-2xl p-4 border border-gray-800">
          {isLoading ? (
            <div className="py-12 flex flex-col items-center justify-center text-center gap-3">
              <div className="relative w-12 h-12">
                <div className="absolute inset-0 rounded-full border-4 border-[#FFC400]/20 animate-ping" />
                <div className="w-12 h-12 rounded-full border-4 border-[#FFC400] border-t-transparent animate-spin" />
              </div>
              <p className="text-xs sm:text-sm font-bold text-amber-300">
                {t.thinkingInProgress}
              </p>
              <p className="text-[11px] text-gray-500 font-mono">
                Tracing voltage loops, shared neutral imbalances & thermal ratings...
              </p>
            </div>
          ) : result ? (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 bg-emerald-950/60 px-3 py-1.5 rounded-xl border border-emerald-600/40">
                <CheckCircle2 className="w-4 h-4" />
                <span>విశ్లేషణ పూర్తయింది (High Thinking Verified)</span>
              </div>

              <div className="prose prose-invert max-w-none text-xs sm:text-sm text-gray-200 leading-relaxed whitespace-pre-wrap font-sans">
                {result}
              </div>

              <div className="p-3 bg-red-950/60 rounded-xl border border-red-700/50 text-[11px] text-red-200 flex items-start gap-2">
                <ShieldAlert className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                <span>
                  హెచ్చరిక: ఏదైనా బస్‌బార్ లేదా మెయిన్ ఫీడర్‌ను తాకే ముందు మెయిన్ ఐసోలేటర్ లేదా MCB ని ఆఫ్ చేశారని నియాన్ టెస్టర్‌తో నిర్ధారించుకోండి.
                </span>
              </div>
            </div>
          ) : (
            <div className="py-10 text-center text-gray-500 text-xs">
              క్లిష్టమైన వైరింగ్, లీకేజ్ లేదా ట్రిప్పింగ్ సమస్యను పైన అడగండి.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
