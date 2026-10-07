import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { OnlineTest, TestAttempt, TestAnswer } from '../../types';
import { formatSecondsToTime } from '../../utils/helpers';
import {
  Clock,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  HelpCircle,
  ArrowLeft,
  ArrowRight,
  Bookmark,
  Send,
  Award,
  RotateCcw,
  Sparkles,
} from 'lucide-react';
import { Modal } from '../common/Modal';

interface OnlineTestEngineProps {
  test: OnlineTest;
  onExit: () => void;
}

export const OnlineTestEngine: React.FC<OnlineTestEngineProps> = ({ test, onExit }) => {
  const { currentStudentProfile, submitTestAttempt, testAttempts } = useApp();

  // Check if already attempted
  const pastAttempt = testAttempts.find(
    (a) => a.testId === test.id && a.studentId === currentStudentProfile?.id
  );

  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<string, { option: number | null; marked: boolean }>>(() => {
    const initial: Record<string, { option: number | null; marked: boolean }> = {};
    test.questions.forEach((q) => {
      initial[q.id] = { option: null, marked: false };
    });
    return initial;
  });

  const [secondsRemaining, setSecondsRemaining] = useState(test.durationMinutes * 60);
  const [isSubmitted, setIsSubmitted] = useState(!!pastAttempt);
  const [submittedAttempt, setSubmittedAttempt] = useState<TestAttempt | null>(pastAttempt || null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  // Countdown Timer
  useEffect(() => {
    if (isSubmitted) return;

    const timer = setInterval(() => {
      setSecondsRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleAutoSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isSubmitted]);

  const currentQ = test.questions[currentQuestionIdx];

  const handleSelectOption = (optionIdx: number) => {
    if (isSubmitted) return;
    setAnswers((prev) => ({
      ...prev,
      [currentQ.id]: {
        ...prev[currentQ.id],
        option: prev[currentQ.id]?.option === optionIdx ? null : optionIdx,
      },
    }));
  };

  const handleToggleMark = () => {
    if (isSubmitted) return;
    setAnswers((prev) => ({
      ...prev,
      [currentQ.id]: {
        ...prev[currentQ.id],
        marked: !prev[currentQ.id]?.marked,
      },
    }));
  };

  const handleClearResponse = () => {
    if (isSubmitted) return;
    setAnswers((prev) => ({
      ...prev,
      [currentQ.id]: {
        ...prev[currentQ.id],
        option: null,
      },
    }));
  };

  const calculateResults = (): Omit<TestAttempt, 'id' | 'submittedAt'> => {
    let attemptedCount = 0;
    let correctCount = 0;
    let incorrectCount = 0;
    let unansweredCount = 0;
    let totalScore = 0;

    const formattedAnswers: TestAnswer[] = test.questions.map((q) => {
      const studentAns = answers[q.id]?.option;
      const isMarked = answers[q.id]?.marked;

      if (studentAns === null || studentAns === undefined) {
        unansweredCount++;
        return {
          questionId: q.id,
          selectedOptionIndex: null,
          isMarkedForReview: isMarked,
        };
      }

      attemptedCount++;
      if (studentAns === q.correctOptionIndex) {
        correctCount++;
        totalScore += q.marks;
      } else {
        incorrectCount++;
        if (test.negativeMarking) {
          totalScore -= q.negativeMarks;
        }
      }

      return {
        questionId: q.id,
        selectedOptionIndex: studentAns,
        isMarkedForReview: isMarked,
      };
    });

    const finalScore = Math.max(0, totalScore);
    const percentage = Math.round((finalScore / test.totalMarks) * 100);
    const passed = finalScore >= test.passingMarks;

    return {
      testId: test.id,
      studentId: currentStudentProfile?.id || 'student-1',
      studentName: currentStudentProfile?.name || 'Rohan Deshmukh',
      timeTakenSeconds: test.durationMinutes * 60 - secondsRemaining,
      answers: formattedAnswers,
      totalQuestions: test.questions.length,
      attemptedCount,
      correctCount,
      incorrectCount,
      unansweredCount,
      score: finalScore,
      percentage,
      rank: Math.floor(Math.random() * 3) + 1, // Realistic mock rank in top 3
      passed,
    };
  };

  const handleConfirmSubmit = () => {
    const attemptData = calculateResults();
    const createdAttempt = submitTestAttempt(attemptData);
    setSubmittedAttempt(createdAttempt);
    setIsSubmitted(true);
    setShowConfirmModal(false);
  };

  const handleAutoSubmit = () => {
    const attemptData = calculateResults();
    const createdAttempt = submitTestAttempt(attemptData);
    setSubmittedAttempt(createdAttempt);
    setIsSubmitted(true);
  };

  // Stats for palette
  const answeredCount = Object.values(answers).filter((a) => a.option !== null).length;
  const markedCount = Object.values(answers).filter((a) => a.marked).length;
  const unattemptedCount = test.questions.length - answeredCount;

  // Render Post-Submission Scorecard & Review
  if (isSubmitted && submittedAttempt) {
    return (
      <div className="max-w-4xl mx-auto space-y-6 animate-fade-in pb-12">
        {/* Banner */}
        <div
          className={`p-6 sm:p-8 rounded-3xl text-white shadow-xl text-center space-y-3 ${
            submittedAttempt.passed
              ? 'bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-700'
              : 'bg-gradient-to-r from-amber-600 to-rose-600'
          }`}
        >
          <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center mx-auto shadow-inner">
            <Award className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            {submittedAttempt.passed ? 'Assessment Completed with Merit!' : 'Assessment Completed'}
          </h2>
          <p className="text-xs sm:text-sm text-white/90 max-w-md mx-auto">
            {test.title} • Scorecard recorded in your academic profile.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <div className="bg-white/15 backdrop-blur-md px-4 py-2 rounded-xl text-center">
              <span className="text-[10px] uppercase font-bold text-white/80 block">Final Score</span>
              <span className="text-2xl font-extrabold">
                {submittedAttempt.score} <span className="text-sm font-normal">/ {test.totalMarks}</span>
              </span>
            </div>
            <div className="bg-white/15 backdrop-blur-md px-4 py-2 rounded-xl text-center">
              <span className="text-[10px] uppercase font-bold text-white/80 block">Percentage</span>
              <span className="text-2xl font-extrabold">{submittedAttempt.percentage}%</span>
            </div>
            <div className="bg-white/15 backdrop-blur-md px-4 py-2 rounded-xl text-center">
              <span className="text-[10px] uppercase font-bold text-white/80 block">Batch Rank</span>
              <span className="text-2xl font-extrabold">#{submittedAttempt.rank || 1}</span>
            </div>
          </div>
        </div>

        {/* Detailed Metrics Breakdown */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-2xl border border-slate-200 text-center shadow-xs">
            <span className="text-xs font-bold text-slate-400 uppercase">Total Questions</span>
            <div className="text-2xl font-extrabold text-slate-800 mt-1">{submittedAttempt.totalQuestions}</div>
          </div>
          <div className="bg-white p-4 rounded-2xl border border-slate-200 text-center shadow-xs">
            <span className="text-xs font-bold text-emerald-500 uppercase">Correct Answers</span>
            <div className="text-2xl font-extrabold text-emerald-600 mt-1">{submittedAttempt.correctCount}</div>
          </div>
          <div className="bg-white p-4 rounded-2xl border border-slate-200 text-center shadow-xs">
            <span className="text-xs font-bold text-rose-500 uppercase">Incorrect Slips</span>
            <div className="text-2xl font-extrabold text-rose-600 mt-1">{submittedAttempt.incorrectCount}</div>
          </div>
          <div className="bg-white p-4 rounded-2xl border border-slate-200 text-center shadow-xs">
            <span className="text-xs font-bold text-slate-400 uppercase">Unanswered</span>
            <div className="text-2xl font-extrabold text-slate-500 mt-1">{submittedAttempt.unansweredCount}</div>
          </div>
        </div>

        {/* Question by Question Review Accordion */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <h3 className="font-bold text-slate-900 text-base">
              Question-by-Question Diagnostic Review
            </h3>
            <button
              onClick={onExit}
              className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs rounded-xl shadow-xs"
            >
              Back to Tests Catalog
            </button>
          </div>

          <div className="space-y-6">
            {test.questions.map((q, idx) => {
              const attemptAns = submittedAttempt.answers.find((a) => a.questionId === q.id);
              const selectedIdx = attemptAns?.selectedOptionIndex ?? null;
              const isCorrect = selectedIdx === q.correctOptionIndex;
              const isSkipped = selectedIdx === null;

              return (
                <div
                  key={q.id}
                  className={`p-5 rounded-2xl border ${
                    isSkipped
                      ? 'border-slate-200 bg-slate-50/50'
                      : isCorrect
                      ? 'border-emerald-300 bg-emerald-50/30'
                      : 'border-rose-300 bg-rose-50/30'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold font-mono text-slate-500">
                      Question {idx + 1} • {q.subject}
                    </span>
                    <span
                      className={`text-xs font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1 ${
                        isSkipped
                          ? 'bg-slate-200 text-slate-700'
                          : isCorrect
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-rose-100 text-rose-800'
                      }`}
                    >
                      {isSkipped && 'Skipped (0 pts)'}
                      {isCorrect && <><CheckCircle2 className="w-3.5 h-3.5" /> Correct (+{q.marks} pts)</>}
                      {!isSkipped && !isCorrect && (
                        <><XCircle className="w-3.5 h-3.5" /> Incorrect (-{test.negativeMarking ? q.negativeMarks : 0} pts)</>
                      )}
                    </span>
                  </div>

                  <p className="text-sm font-semibold text-slate-900 mb-4">{q.text}</p>

                  <div className="space-y-2 mb-4">
                    {q.options.map((opt, optIdx) => {
                      const isStudentChoice = selectedIdx === optIdx;
                      const isCorrectChoice = q.correctOptionIndex === optIdx;

                      let optClass = 'bg-white border-slate-200 text-slate-700';
                      if (isCorrectChoice) {
                        optClass = 'bg-emerald-100/80 border-emerald-400 text-emerald-950 font-bold';
                      } else if (isStudentChoice && !isCorrect) {
                        optClass = 'bg-rose-100/80 border-rose-400 text-rose-950 line-through';
                      }

                      return (
                        <div
                          key={optIdx}
                          className={`p-3 rounded-xl border text-xs flex items-center justify-between ${optClass}`}
                        >
                          <div className="flex items-center gap-2">
                            <span className="w-5 h-5 rounded-full bg-slate-100 border border-slate-300 text-slate-600 flex items-center justify-center font-bold text-[10px]">
                              {String.fromCharCode(65 + optIdx)}
                            </span>
                            <span>{opt}</span>
                          </div>
                          {isCorrectChoice && (
                            <span className="text-[11px] font-bold text-emerald-700">Correct Answer</span>
                          )}
                          {isStudentChoice && !isCorrect && (
                            <span className="text-[11px] font-bold text-rose-700">Your Selection</span>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {q.explanation && (
                    <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl text-xs text-blue-900">
                      <strong className="block font-bold mb-1">Faculty Solution & Derivation:</strong>
                      <span>{q.explanation}</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // Active Test CBT Layout
  return (
    <div className="max-w-7xl mx-auto space-y-4">
      {/* Top Examination Control Bar */}
      <div className="bg-slate-900 text-white p-4 rounded-2xl flex flex-wrap items-center justify-between gap-4 shadow-lg border border-slate-800">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-blue-400">
            NTA Simulated Interface
          </span>
          <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">{test.title}</h2>
          <span className="text-xs text-slate-400">
            Subject: {test.subject} • Total Marks: {test.totalMarks}
          </span>
        </div>

        {/* Countdown Timer Display */}
        <div className="flex items-center gap-3">
          <div
            className={`flex items-center gap-2 px-4 py-2 rounded-xl border font-mono font-bold text-sm ${
              secondsRemaining < 300
                ? 'bg-rose-950/80 border-rose-500 text-rose-300 animate-pulse'
                : 'bg-slate-800 border-slate-700 text-emerald-400'
            }`}
          >
            <Clock className="w-4 h-4" />
            <span>Time Left: {formatSecondsToTime(secondsRemaining)}</span>
          </div>

          <button
            onClick={() => setShowConfirmModal(true)}
            className="px-4 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold text-xs rounded-xl shadow-md flex items-center gap-1.5 transition-all"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Submit Test</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Left Question Sheet + Right Question Palette */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Question Box */}
        <div className="lg:col-span-8 bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between min-h-[520px]">
          <div>
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
              <span className="text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-lg border border-blue-200">
                Question {currentQuestionIdx + 1} of {test.questions.length}
              </span>

              <div className="flex items-center gap-3 text-xs text-slate-500">
                <span className="font-semibold text-emerald-600">+{currentQ.marks} Marks</span>
                {test.negativeMarking && (
                  <span className="font-semibold text-rose-500">-{currentQ.negativeMarks} Negative</span>
                )}
              </div>
            </div>

            {/* Question Text */}
            <div className="text-base sm:text-lg font-semibold text-slate-900 leading-relaxed mb-6">
              {currentQ.text}
            </div>

            {/* MCQ Options Radio List */}
            <div className="space-y-3">
              {currentQ.options.map((option, optIdx) => {
                const isSelected = answers[currentQ.id]?.option === optIdx;
                return (
                  <div
                    key={optIdx}
                    onClick={() => handleSelectOption(optIdx)}
                    className={`p-4 rounded-xl border-2 cursor-pointer transition-all flex items-center gap-3 ${
                      isSelected
                        ? 'border-blue-600 bg-blue-50/70 text-slate-900 shadow-xs'
                        : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <div
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center font-bold text-xs shrink-0 ${
                        isSelected
                          ? 'border-blue-600 bg-blue-600 text-white'
                          : 'border-slate-300 bg-white text-slate-600'
                      }`}
                    >
                      {String.fromCharCode(65 + optIdx)}
                    </div>
                    <span className="text-xs sm:text-sm font-medium">{option}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Action buttons at bottom */}
          <div className="pt-6 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 mt-6">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleToggleMark}
                className={`px-3.5 py-2 text-xs font-semibold rounded-xl border transition-colors flex items-center gap-1.5 ${
                  answers[currentQ.id]?.marked
                    ? 'bg-amber-100 border-amber-300 text-amber-800'
                    : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-100'
                }`}
              >
                <Bookmark className="w-3.5 h-3.5" />
                <span>{answers[currentQ.id]?.marked ? 'Marked for Review' : 'Mark for Review'}</span>
              </button>

              <button
                type="button"
                onClick={handleClearResponse}
                className="px-3.5 py-2 text-xs font-semibold rounded-xl text-slate-500 hover:bg-slate-100 transition-colors"
              >
                Clear Selection
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                disabled={currentQuestionIdx === 0}
                onClick={() => setCurrentQuestionIdx((prev) => Math.max(0, prev - 1))}
                className="px-4 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Previous</span>
              </button>

              <button
                type="button"
                disabled={currentQuestionIdx === test.questions.length - 1}
                onClick={() => setCurrentQuestionIdx((prev) => Math.min(test.questions.length - 1, prev + 1))}
                className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1"
              >
                <span>Save & Next</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Right: Question Navigation Palette */}
        <div className="lg:col-span-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-5">
          <h3 className="font-bold text-slate-900 text-sm pb-2 border-b border-slate-100">
            Question Palette & Status
          </h3>

          {/* Legend */}
          <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-600">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-emerald-600 text-white flex items-center justify-center font-bold text-[9px]">
                {answeredCount}
              </div>
              <span>Answered</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-slate-100 border border-slate-300 text-slate-500 flex items-center justify-center font-bold text-[9px]">
                {unattemptedCount}
              </div>
              <span>Unanswered</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-amber-500 text-white flex items-center justify-center font-bold text-[9px]">
                {markedCount}
              </div>
              <span>Marked for Review</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-blue-600 ring-2 ring-blue-300 text-white flex items-center justify-center font-bold text-[9px]">
                •
              </div>
              <span>Current Item</span>
            </div>
          </div>

          {/* Palette Numbers Grid */}
          <div className="grid grid-cols-5 gap-2 pt-2 border-t border-slate-100">
            {test.questions.map((q, idx) => {
              const isCurrent = idx === currentQuestionIdx;
              const isAnswered = answers[q.id]?.option !== null;
              const isMarked = answers[q.id]?.marked;

              let btnClass = 'bg-slate-100 text-slate-600 hover:bg-slate-200 border border-slate-200';
              if (isMarked) {
                btnClass = 'bg-amber-500 text-white border-amber-600';
              } else if (isAnswered) {
                btnClass = 'bg-emerald-600 text-white border-emerald-700';
              }

              if (isCurrent) {
                btnClass += ' ring-2 ring-blue-500 ring-offset-2';
              }

              return (
                <button
                  key={q.id}
                  onClick={() => setCurrentQuestionIdx(idx)}
                  className={`h-9 rounded-xl font-bold text-xs flex items-center justify-center transition-all ${btnClass}`}
                >
                  {idx + 1}
                </button>
              );
            })}
          </div>

          {/* Emergency early submit */}
          <div className="pt-4 border-t border-slate-100">
            <button
              onClick={() => setShowConfirmModal(true)}
              className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Submit & Generate Scorecard</span>
            </button>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <Modal
          isOpen={showConfirmModal}
          onClose={() => setShowConfirmModal(false)}
          title="Submit Assessment?"
          subtitle="Are you sure you want to finalize and submit this test?"
          maxWidth="sm"
        >
          <div className="space-y-4">
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-500">Total Questions:</span>
                <strong className="text-slate-800">{test.questions.length}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-emerald-600 font-medium">Questions Attempted:</span>
                <strong className="text-emerald-700">{answeredCount}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-rose-500 font-medium">Unanswered Remaining:</span>
                <strong className="text-rose-700">{unattemptedCount}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-amber-600 font-medium">Marked for Review:</span>
                <strong className="text-amber-700">{markedCount}</strong>
              </div>
            </div>

            <p className="text-xs text-slate-500 text-center">
              Once submitted, your responses cannot be altered. Your scorecard will be calculated instantly.
            </p>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setShowConfirmModal(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl"
              >
                Resume Test
              </button>
              <button
                onClick={handleConfirmSubmit}
                className="px-4 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-xs"
              >
                Confirm & Submit
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
