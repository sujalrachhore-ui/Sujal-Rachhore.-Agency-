import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Award, TrendingUp, Calendar, Trophy, BarChart3, CheckCircle2, Star } from 'lucide-react';

export const StudentResults: React.FC = () => {
  const { currentStudentProfile, results, testAttempts, tests } = useApp();
  const student = currentStudentProfile;

  // Student specific results
  const studentResults = results.filter((r) => r.studentId === student?.id);
  const studentAttempts = testAttempts.filter((a) => a.studentId === student?.id);

  const avgScore =
    studentResults.length > 0
      ? Math.round(
          studentResults.reduce((acc, curr) => acc + curr.percentage, 0) / studentResults.length
        )
      : 84;

  const topRank =
    studentResults.length > 0 ? Math.min(...studentResults.map((r) => r.rank)) : 3;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">Examination Results & Performance Scorecards</h2>
          <p className="text-xs sm:text-sm text-slate-500">
            All-India benchmark mocks, chapter diagnostics, and percentile trends.
          </p>
        </div>
      </div>

      {/* KPI Highlights */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase">Average Percentile</span>
            <TrendingUp className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="text-2xl font-extrabold text-slate-900 mt-1">{avgScore}%</div>
          <span className="text-[10px] text-emerald-600 font-semibold bg-emerald-50 px-2 py-0.5 rounded mt-2 inline-block">
            Top 5% Cohort
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase">Best All-India Rank</span>
            <Trophy className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl font-extrabold text-amber-600 mt-1">AIR #{topRank}</div>
          <span className="text-[10px] text-slate-400 mt-2 block">Achieved in Grand Benchmark #02</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase">Total Tests Taken</span>
            <Award className="w-4 h-4 text-blue-500" />
          </div>
          <div className="text-2xl font-extrabold text-blue-600 mt-1">
            {studentResults.length + studentAttempts.length} Assessments
          </div>
          <span className="text-[10px] text-slate-400 mt-2 block">100% Submission Accuracy</span>
        </div>
      </div>

      {/* Performance Trends Chart Visualizer */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
        <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
          <BarChart3 className="w-4 h-4 text-blue-600" />
          <span>Subject-Wise Mastery Breakdown</span>
        </h3>

        <div className="space-y-3 pt-2">
          <div>
            <div className="flex items-center justify-between text-xs font-semibold mb-1">
              <span className="text-slate-700">Physics (Mechanics, Electrodynamics)</span>
              <span className="text-blue-600 font-bold">88% Mastery</span>
            </div>
            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
              <div className="bg-blue-600 h-full rounded-full" style={{ width: '88%' }} />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between text-xs font-semibold mb-1">
              <span className="text-slate-700">Chemistry (Physical Thermodynamics, Organic)</span>
              <span className="text-purple-600 font-bold">78% Mastery</span>
            </div>
            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
              <div className="bg-purple-600 h-full rounded-full" style={{ width: '78%' }} />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between text-xs font-semibold mb-1">
              <span className="text-slate-700">Mathematics / Biology (Calculus & Physiology)</span>
              <span className="text-emerald-600 font-bold">86% Mastery</span>
            </div>
            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
              <div className="bg-emerald-600 h-full rounded-full" style={{ width: '86%' }} />
            </div>
          </div>
        </div>
      </div>

      {/* Official Scorecards List */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <h3 className="font-bold text-slate-900 text-sm">
            Diagnostic Exam History & Scorecards
          </h3>
          <span className="text-xs text-slate-500 font-mono">
            {studentResults.length} records available
          </span>
        </div>

        <div className="divide-y divide-slate-100">
          {studentResults.map((r) => (
            <div key={r.id} className="p-5 hover:bg-slate-50 transition-colors space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h4 className="font-bold text-slate-900 text-sm sm:text-base">{r.examName}</h4>
                  <div className="flex items-center gap-2 text-xs text-slate-400 mt-0.5">
                    <span>{r.courseName}</span>
                    <span>•</span>
                    <span>Exam Date: {r.examDate}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <span className="text-base font-extrabold text-slate-900 block leading-none">
                      {r.score} / {r.totalMarks}
                    </span>
                    <span className="text-xs text-emerald-600 font-semibold">{r.percentage}% Score</span>
                  </div>

                  <div className="p-2.5 bg-amber-50 border border-amber-200 rounded-xl text-center min-w-[70px]">
                    <span className="text-[10px] uppercase font-bold text-amber-700 block">Rank</span>
                    <span className="text-sm font-extrabold text-amber-800">#{r.rank}</span>
                  </div>
                </div>
              </div>

              {r.remarks && (
                <div className="p-3 bg-slate-50 rounded-xl text-xs text-slate-600 border border-slate-200/60 flex items-start gap-2">
                  <Award className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                  <span><strong>Faculty Feedback:</strong> {r.remarks}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
