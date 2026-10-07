import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { OnlineTest } from '../../types';
import { OnlineTestEngine } from './OnlineTestEngine';
import { Clock, Play, CheckCircle2, Award, Calendar, FileText, ArrowRight } from 'lucide-react';

export const StudentTests: React.FC = () => {
  const { tests, testAttempts, currentStudentProfile, courses } = useApp();
  const [activeTest, setActiveTest] = useState<OnlineTest | null>(null);

  const student = currentStudentProfile;
  const studentAttempts = testAttempts.filter((a) => a.studentId === student?.id);
  const attemptedTestIds = new Set(studentAttempts.map((a) => a.testId));

  // If a test is actively running, render the test engine
  if (activeTest) {
    return <OnlineTestEngine test={activeTest} onExit={() => setActiveTest(null)} />;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">Online Computer-Based Tests (CBT)</h2>
          <p className="text-xs sm:text-sm text-slate-500">
            NTA-modeled mock exams with negative marking, real-time timers, and instant diagnostics.
          </p>
        </div>
      </div>

      {/* Tests Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tests.map((test) => {
          const hasAttempted = attemptedTestIds.has(test.id);
          const pastAttempt = studentAttempts.find((a) => a.testId === test.id);

          return (
            <div
              key={test.id}
              className={`p-6 rounded-2xl border bg-white shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between ${
                hasAttempted ? 'border-emerald-200 bg-emerald-50/10' : 'border-slate-200'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-blue-600 bg-blue-50 border border-blue-200 px-2.5 py-0.5 rounded-lg">
                    {test.subject}
                  </span>
                  {hasAttempted ? (
                    <span className="text-[11px] font-bold text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> Attempted
                    </span>
                  ) : (
                    <span className="text-[11px] font-bold text-amber-700 bg-amber-100 px-2.5 py-0.5 rounded-full">
                      Pending Action
                    </span>
                  )}
                </div>

                <h3 className="font-bold text-slate-900 text-base leading-snug">{test.title}</h3>

                <div className="grid grid-cols-2 gap-2 text-xs text-slate-600 pt-2 border-t border-slate-100">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>{test.durationMinutes} Minutes</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-slate-400" />
                    <span>{test.questions.length} Questions</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Award className="w-3.5 h-3.5 text-slate-400" />
                    <span>{test.totalMarks} Total Marks</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    <span>Due: {test.dueDate.split('T')[0]}</span>
                  </div>
                </div>

                {hasAttempted && pastAttempt && (
                  <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-900 flex items-center justify-between">
                    <div>
                      <span className="font-bold block">Score: {pastAttempt.score} / {test.totalMarks}</span>
                      <span className="text-[10px] text-emerald-700">{pastAttempt.percentage}% • Rank #{pastAttempt.rank || 1}</span>
                    </div>
                    <span className="text-[10px] font-bold uppercase bg-emerald-200 text-emerald-900 px-2 py-0.5 rounded">
                      {pastAttempt.passed ? 'PASSED' : 'REVISION NEEDED'}
                    </span>
                  </div>
                )}
              </div>

              <div className="mt-6 pt-3 border-t border-slate-100">
                {hasAttempted ? (
                  <button
                    onClick={() => setActiveTest(test)}
                    className="w-full py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-xl transition-colors flex items-center justify-center gap-1.5"
                  >
                    <span>Review Past Scorecard</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <button
                    onClick={() => setActiveTest(test)}
                    className="w-full py-2.5 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-xs rounded-xl shadow-sm transition-all flex items-center justify-center gap-1.5"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>Start Test Now</span>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
