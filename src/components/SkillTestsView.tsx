import React, { useState } from 'react';
import { Language, SkillTest, Technician } from '../types';
import { translations, sampleBadges } from '../utils/i18n';
import { skillTests } from '../utils/skillTestsData';
import confetti from 'canvas-confetti';
import {
  Award,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  Sparkles,
  ShieldCheck,
  Check,
  X,
  Zap,
} from 'lucide-react';

interface SkillTestsViewProps {
  language: Language;
  technician: Technician;
  onPassTest: (testId: string, badgeId: string) => void;
  onBackToPassport: () => void;
}

export const SkillTestsView: React.FC<SkillTestsViewProps> = ({
  language,
  technician,
  onPassTest,
  onBackToPassport,
}) => {
  const t = translations[language];

  // Active quiz state
  const [activeTest, setActiveTest] = useState<SkillTest | null>(null);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [questionId: string]: number }>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [examScore, setExamScore] = useState<number>(0);
  const [passed, setPassed] = useState<boolean>(false);

  const startTest = (test: SkillTest) => {
    setActiveTest(test);
    setSelectedAnswers({});
    setIsSubmitted(false);
    setExamScore(0);
    setPassed(false);
  };

  const handleSelectOption = (questionId: string, optionIndex: number) => {
    if (isSubmitted) return;
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: optionIndex,
    }));
  };

  const handleSubmitQuiz = () => {
    if (!activeTest) return;

    let correctCount = 0;
    activeTest.questions.forEach(q => {
      if (selectedAnswers[q.id] === q.correctIndex) {
        correctCount++;
      }
    });

    const score = Math.round((correctCount / activeTest.questions.length) * 100);
    setExamScore(score);
    setIsSubmitted(true);

    const isPass = score >= activeTest.passingScore;
    setPassed(isPass);

    if (isPass) {
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.55 },
        colors: ['#FFC400', '#22c55e', '#3b82f6'],
      });
      onPassTest(activeTest.id, activeTest.badgeId);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-6 space-y-6 animate-fade-in pb-20">
      {/* Top Header */}
      <div className="bg-[#14171e] border-2 border-[#FFC400]/40 rounded-3xl p-5 sm:p-6 shadow-xl flex items-center justify-between gap-4">
        <div>
          <button
            onClick={onBackToPassport}
            className="text-xs font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1.5 mb-2 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>పాస్‌పోర్ట్‌కు తిరిగి వెళ్లండి</span>
          </button>
          <h1 className="text-2xl sm:text-3xl font-black text-white flex items-center gap-2">
            <Award className="w-7 h-7 text-[#FFC400]" />
            <span>{t.skillTestsTab}</span>
          </h1>
          <p className="text-xs sm:text-sm text-gray-400 mt-1">
            {t.skillTestsSubtitle}
          </p>
        </div>

        <div className="bg-[#1c212c] px-3.5 py-2 rounded-xl border border-amber-500/30 text-right flex-shrink-0">
          <span className="text-[10px] text-gray-400 uppercase font-mono block">TESTS PASSED</span>
          <span className="text-xl font-black text-[#FFC400]">
            {(technician.passedTests || []).length} / {skillTests.length}
          </span>
        </div>
      </div>

      {/* Main Content: Either Test Catalog OR Active Quiz */}
      {!activeTest ? (
        /* Test Catalog Grid */
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {skillTests.map(test => {
            const isAlreadyPassed = (technician.passedTests || []).includes(test.id);
            const badge = sampleBadges[test.badgeId];

            return (
              <div
                key={test.id}
                className="bg-[#14171e] border-2 border-gray-800 hover:border-[#FFC400] transition-all rounded-3xl p-5 flex flex-col justify-between shadow-xl group"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-12 h-12 rounded-2xl bg-[#FFC400]/20 text-[#FFC400] flex items-center justify-center border border-[#FFC400]/40 group-hover:scale-105 transition-transform">
                      <Zap className="w-6 h-6" />
                    </div>
                    {isAlreadyPassed ? (
                      <span className="text-[11px] font-bold text-emerald-400 bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-600/50 flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>ఉత్తీర్ణులు (PASSED)</span>
                      </span>
                    ) : (
                      <span className="text-[10px] font-mono font-bold text-amber-300 bg-amber-500/10 px-2 py-0.5 rounded">
                        5 QUESTIONS • 80% TO PASS
                      </span>
                    )}
                  </div>

                  <h3 className="text-base sm:text-lg font-black text-white group-hover:text-[#FFC400] transition-colors leading-tight">
                    {test.title[language]}
                  </h3>
                  <p className="text-xs text-gray-400 mt-2 leading-relaxed">
                    {test.description[language]}
                  </p>

                  <div className="mt-3 pt-3 border-t border-gray-800/80 flex items-center gap-2">
                    <span className="text-[11px] text-gray-400">లభించే బ్యాడ్జ్:</span>
                    <span className="text-xs font-bold text-amber-300">
                      🏆 {badge ? badge[language] : test.badgeId}
                    </span>
                  </div>
                </div>

                <div className="mt-5">
                  <button
                    onClick={() => startTest(test)}
                    className="w-full py-3 px-4 rounded-xl bg-[#FFC400] hover:bg-[#e0ad00] text-black font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-md touch-target-huge cursor-pointer"
                  >
                    <span>{isAlreadyPassed ? 'మళ్లీ ప్రాక్టీస్ చేయండి' : t.takeTest}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Active Quiz Screen */
        <div className="space-y-5">
          {/* Quiz Header Bar */}
          <div className="bg-[#1b1f28] p-4 rounded-2xl border border-gray-700 flex items-center justify-between">
            <div>
              <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider block">
                ACTIVE EXAM
              </span>
              <h2 className="text-base sm:text-lg font-black text-white">
                {activeTest.title[language]}
              </h2>
            </div>
            <button
              onClick={() => setActiveTest(null)}
              className="text-xs font-bold text-gray-400 hover:text-white px-3 py-1.5 rounded-lg bg-gray-800 touch-target-huge sm:min-h-0 sm:min-w-0"
            >
              రద్దు చేయండి
            </button>
          </div>

          {/* Result Banner if submitted */}
          {isSubmitted && (
            <div
              className={`p-5 rounded-3xl border-2 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-4 animate-fade-in ${
                passed
                  ? 'bg-[#122215] border-emerald-500 text-emerald-200'
                  : 'bg-[#221312] border-red-500 text-red-200'
              }`}
            >
              <div className="flex items-center gap-4">
                <div
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center font-black text-xl flex-shrink-0 ${
                    passed
                      ? 'bg-emerald-500 text-black shadow-lg'
                      : 'bg-red-500 text-white'
                  }`}
                >
                  {examScore}%
                </div>
                <div>
                  <h3 className="text-lg font-black text-white">
                    {passed ? t.congratsPassed : t.tryAgainNotice}
                  </h3>
                  <p className="text-xs text-gray-300 mt-1">
                    {passed
                      ? t.badgeAwardedAnnouncement
                      : 'కనీసం 80% స్కోరు సాధించాలి. సరిదిద్దిన సమాధానాలను కింద చూడండి.'}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => startTest(activeTest)}
                  className="px-4 py-2.5 rounded-xl bg-gray-800 hover:bg-gray-700 text-white font-bold text-xs flex items-center gap-1.5 touch-target-huge sm:min-h-0 sm:min-w-0"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>మళ్లీ రాయండి</span>
                </button>
                {passed && (
                  <button
                    onClick={onBackToPassport}
                    className="px-4 py-2.5 rounded-xl bg-[#FFC400] text-black font-extrabold text-xs shadow-md touch-target-huge sm:min-h-0 sm:min-w-0"
                  >
                    పాస్‌పోర్ట్‌లో చూడండి ➔
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Questions List */}
          <div className="space-y-4">
            {activeTest.questions.map((q, qIndex) => {
              const selectedIdx = selectedAnswers[q.id];
              const isCorrect = selectedIdx === q.correctIndex;

              return (
                <div
                  key={q.id}
                  className={`bg-[#14171e] rounded-3xl p-5 border-2 transition-all ${
                    isSubmitted
                      ? isCorrect
                        ? 'border-emerald-600/70 bg-emerald-950/15'
                        : 'border-red-600/70 bg-red-950/15'
                      : 'border-gray-800'
                  }`}
                >
                  {/* Question header */}
                  <div className="flex items-start gap-3 mb-3">
                    <span className="w-7 h-7 rounded-full bg-[#1e232d] text-[#FFC400] font-black text-xs flex items-center justify-center flex-shrink-0 border border-gray-700 mt-0.5">
                      {qIndex + 1}
                    </span>
                    <h3 className="font-extrabold text-sm sm:text-base text-white leading-snug">
                      {q.question[language]}
                    </h3>
                  </div>

                  {/* Options */}
                  <div className="space-y-2 mt-3">
                    {q.options[language].map((optText, optIdx) => {
                      const isOptionSelected = selectedIdx === optIdx;
                      const isOptionCorrect = q.correctIndex === optIdx;

                      let btnStyle = 'bg-[#1b1f28] border-gray-700 text-gray-300 hover:border-gray-500';

                      if (isSubmitted) {
                        if (isOptionCorrect) {
                          btnStyle = 'bg-emerald-950/70 border-emerald-500 text-emerald-200 font-bold';
                        } else if (isOptionSelected && !isOptionCorrect) {
                          btnStyle = 'bg-red-950/70 border-red-500 text-red-200';
                        }
                      } else if (isOptionSelected) {
                        btnStyle = 'bg-amber-500/15 border-[#FFC400] text-white font-bold shadow-md';
                      }

                      return (
                        <button
                          key={optIdx}
                          type="button"
                          disabled={isSubmitted}
                          onClick={() => handleSelectOption(q.id, optIdx)}
                          className={`w-full p-3.5 rounded-2xl text-left border-2 text-xs sm:text-sm transition-all flex items-center justify-between gap-3 touch-target-huge cursor-pointer ${btnStyle}`}
                        >
                          <div className="flex items-center gap-3">
                            <span className="w-5 h-5 rounded-full bg-black/40 text-gray-300 text-xs font-mono font-bold flex items-center justify-center flex-shrink-0">
                              {String.fromCharCode(65 + optIdx)}
                            </span>
                            <span className="leading-snug">{optText}</span>
                          </div>

                          {isSubmitted && isOptionCorrect && (
                            <Check className="w-5 h-5 text-emerald-400 flex-shrink-0 stroke-[3]" />
                          )}
                          {isSubmitted && isOptionSelected && !isOptionCorrect && (
                            <X className="w-5 h-5 text-red-400 flex-shrink-0 stroke-[3]" />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {/* Explanation box after submission */}
                  {isSubmitted && (
                    <div className="mt-3 pt-3 border-t border-gray-800 text-xs text-gray-300 bg-black/40 p-3 rounded-xl">
                      <span className="font-extrabold text-[#FFC400] block mb-1">
                        💡 {t.explanationTitle}:
                      </span>
                      <p className="leading-relaxed">{q.explanation[language]}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Submit Exam Button */}
          {!isSubmitted && (
            <div className="sticky bottom-4 z-20 pt-2">
              <button
                onClick={handleSubmitQuiz}
                disabled={Object.keys(selectedAnswers).length < activeTest.questions.length}
                className={`w-full py-4 px-6 rounded-2xl font-black text-lg transition-all flex items-center justify-center gap-3 touch-target-huge ${
                  Object.keys(selectedAnswers).length === activeTest.questions.length
                    ? 'bg-[#FFC400] hover:bg-[#e0ad00] text-black shadow-xl ustaad-glow cursor-pointer'
                    : 'bg-gray-800 text-gray-500 cursor-not-allowed border border-gray-700'
                }`}
              >
                <CheckCircle2 className="w-6 h-6" />
                <span>{t.submitExam}</span>
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
