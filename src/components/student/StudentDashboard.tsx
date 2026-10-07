import React from 'react';
import { useApp } from '../../context/AppContext';
import { formatINR } from '../../utils/helpers';
import {
  BookOpen,
  CalendarCheck,
  Award,
  CreditCard,
  Bell,
  Clock,
  ArrowRight,
  TrendingUp,
  FileText,
  AlertCircle,
  Play,
  CheckCircle2,
  Calendar,
  Copy,
  GraduationCap,
} from 'lucide-react';

export const StudentDashboard: React.FC = () => {
  const {
    currentUser,
    currentStudentProfile,
    courses,
    batches,
    attendance,
    tests,
    testAttempts,
    results,
    fees,
    notices,
    setActiveTab,
    setShowOnboardingModal,
    addToast,
  } = useApp();

  const [copiedId, setCopiedId] = React.useState(false);
  const student = currentStudentProfile;
  const loginId = currentUser?.loginId || student?.admissionId || 'MI-2026-0101';

  const handleCopyId = () => {
    navigator.clipboard?.writeText(loginId);
    setCopiedId(true);
    addToast(`Login ID ${loginId} copied to clipboard!`, 'success');
    setTimeout(() => setCopiedId(false), 2000);
  };
  const course = courses.find((c) => c.id === student?.courseId) || courses[0];
  const batch = batches.find((b) => b.id === student?.batchId) || batches[0];

  // Calculate attendance % for this student
  const studentAtt = attendance.filter((a) => a.studentId === student?.id);
  const totalDays = studentAtt.length;
  const presentDays = studentAtt.filter((a) => a.status === 'PRESENT' || a.status === 'LATE').length;
  const attendancePct = totalDays > 0 ? Math.round((presentDays / totalDays) * 100) : 92;

  // Pending tests for this course
  const studentAttempts = testAttempts.filter((a) => a.studentId === student?.id);
  const attemptedTestIds = new Set(studentAttempts.map((a) => a.testId));
  const upcomingTests = tests.filter((t) => t.courseId === course.id && !attemptedTestIds.has(t.id));

  // Latest Result
  const studentResults = results.filter((r) => r.studentId === student?.id);
  const latestResult = studentResults[0];

  // Fee Status
  const studentFee = fees.find((f) => f.studentId === student?.id);

  // Recent Notices
  const recentNotices = notices.slice(0, 3);

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-violet-800 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />
        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-xs font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Academic Year 2026-27 Active</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/20 border border-amber-300/30 text-amber-200 text-xs font-bold font-mono">
                <span>Login ID: {loginId}</span>
                <button
                  type="button"
                  onClick={handleCopyId}
                  title="Copy Login ID"
                  className="hover:text-white transition-colors"
                >
                  {copiedId ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Welcome back, {student?.name || 'Student'}! 👋
            </h1>
            <p className="text-xs sm:text-sm text-blue-100 max-w-xl">
              Enrolled in <strong className="text-white">{course.name}</strong> • Batch:{' '}
              <strong className="text-white">{batch.name}</strong>
            </p>
          </div>

          <div className="flex flex-wrap gap-2.5">
            <button
              onClick={() => setShowOnboardingModal(true)}
              className="px-4 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-900 font-extrabold text-xs rounded-xl shadow-md transition-all flex items-center gap-1.5"
            >
              <GraduationCap className="w-3.5 h-3.5" />
              <span>Student ID Card & Dossier</span>
            </button>
            <button
              onClick={() => setActiveTab('tests')}
              className="px-4 py-2.5 bg-white text-blue-700 hover:bg-blue-50 font-bold text-xs rounded-xl shadow-md transition-all flex items-center gap-1.5"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Launch Online Test</span>
            </button>
            <button
              onClick={() => setActiveTab('timetable')}
              className="px-4 py-2.5 bg-white/20 hover:bg-white/30 backdrop-blur-md text-white font-semibold text-xs rounded-xl transition-all flex items-center gap-1.5"
            >
              <Clock className="w-3.5 h-3.5" />
              <span>View Timetable</span>
            </button>
          </div>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Attendance Card */}
        <div
          onClick={() => setActiveTab('attendance')}
          className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between text-slate-500 mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Attendance</span>
            <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:scale-105 transition-transform">
              <CalendarCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-slate-900">{attendancePct}%</span>
            <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
              Good Status
            </span>
          </div>
          <div className="w-full bg-slate-100 h-1.5 rounded-full mt-3 overflow-hidden">
            <div
              className={`h-full rounded-full ${
                attendancePct >= 85 ? 'bg-emerald-500' : 'bg-amber-500'
              }`}
              style={{ width: `${attendancePct}%` }}
            />
          </div>
          <span className="text-[11px] text-slate-400 mt-2 block">
            {presentDays} / {totalDays} sessions attended
          </span>
        </div>

        {/* Upcoming Tests Card */}
        <div
          onClick={() => setActiveTab('tests')}
          className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between text-slate-500 mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Tests Due</span>
            <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center group-hover:scale-105 transition-transform">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-slate-900">{upcomingTests.length} Active</span>
            <span className="text-xs font-semibold text-purple-600 bg-purple-50 px-2 py-0.5 rounded">
              CBT Ready
            </span>
          </div>
          <span className="text-xs text-slate-500 mt-3 block truncate">
            {upcomingTests[0]?.title || 'All scheduled tests completed'}
          </span>
          <span className="text-[11px] text-blue-600 font-semibold mt-1 inline-flex items-center gap-1">
            Attempt now <ArrowRight className="w-3 h-3" />
          </span>
        </div>

        {/* Latest Result Card */}
        <div
          onClick={() => setActiveTab('results')}
          className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between text-slate-500 mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Latest Result</span>
            <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center group-hover:scale-105 transition-transform">
              <Award className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-slate-900">
              {latestResult ? `${latestResult.score}/${latestResult.totalMarks}` : 'N/A'}
            </span>
            {latestResult && (
              <span className="text-xs font-semibold text-amber-600 bg-amber-50 px-2 py-0.5 rounded">
                Rank #{latestResult.rank}
              </span>
            )}
          </div>
          <span className="text-xs text-slate-500 mt-3 block truncate">
            {latestResult?.examName || 'Mock Diagnostic'}
          </span>
          <span className="text-[11px] text-slate-400 mt-1 block">
            {latestResult?.percentage}% score attained
          </span>
        </div>

        {/* Fee Due Card */}
        <div
          onClick={() => setActiveTab('fees')}
          className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between text-slate-500 mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Fees Balance</span>
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:scale-105 transition-transform">
              <CreditCard className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-slate-900">
              {studentFee ? formatINR(studentFee.dueAmount) : '₹0'}
            </span>
            <span
              className={`text-xs font-semibold px-2 py-0.5 rounded ${
                studentFee?.dueAmount === 0
                  ? 'bg-emerald-50 text-emerald-600'
                  : 'bg-amber-50 text-amber-600'
              }`}
            >
              {studentFee?.status || 'PAID'}
            </span>
          </div>
          <span className="text-xs text-slate-500 mt-3 block">
            Paid: {studentFee ? formatINR(studentFee.paidAmount) : '₹0'}
          </span>
          <span className="text-[11px] text-blue-600 font-semibold mt-1 inline-flex items-center gap-1">
            View Ledger & Pay <ArrowRight className="w-3 h-3" />
          </span>
        </div>
      </div>

      {/* Main 2-Column Split: Active Tests & Notices */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Scheduled Online Tests */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Clock className="w-4 h-4 text-blue-600" />
              <span>Available Computer-Based Mock Tests</span>
            </h3>
            <button
              onClick={() => setActiveTab('tests')}
              className="text-xs font-semibold text-blue-600 hover:text-blue-700"
            >
              View All Tests &rarr;
            </button>
          </div>

          <div className="space-y-3">
            {tests.slice(0, 3).map((test) => {
              const hasAttempted = attemptedTestIds.has(test.id);
              const pastAttempt = studentAttempts.find((a) => a.testId === test.id);

              return (
                <div
                  key={test.id}
                  className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:border-blue-300 transition-colors"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded border border-blue-200">
                        {test.subject}
                      </span>
                      <span className="text-xs text-slate-400 font-medium">
                        {test.questions.length} MCQs • {test.durationMinutes} Mins
                      </span>
                    </div>
                    <h4 className="font-bold text-slate-900 text-sm">{test.title}</h4>
                    <p className="text-[11px] text-slate-500">
                      Total Marks: {test.totalMarks} • Passing: {test.passingMarks}{' '}
                      {test.negativeMarking && '• Negative Marking Active'}
                    </p>
                  </div>

                  <div>
                    {hasAttempted ? (
                      <div className="text-right">
                        <div className="text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-lg border border-emerald-200 inline-block mb-1">
                          Score: {pastAttempt?.score} / {test.totalMarks}
                        </div>
                        <button
                          onClick={() => setActiveTab('results')}
                          className="block text-[11px] font-semibold text-blue-600 hover:underline"
                        >
                          View Scorecard & Review
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => setActiveTab('tests')}
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs rounded-xl shadow-xs flex items-center gap-1.5 transition-colors whitespace-nowrap"
                      >
                        <Play className="w-3.5 h-3.5 fill-current" />
                        <span>Start Test</span>
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Circulars & Study Material Shortcuts */}
        <div className="lg:col-span-5 space-y-6">
          {/* Circulars */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                <Bell className="w-4 h-4 text-amber-500" />
                <span>Notice Board</span>
              </h3>
              <button
                onClick={() => setActiveTab('notices')}
                className="text-xs text-blue-600 hover:text-blue-700 font-semibold"
              >
                All Notices
              </button>
            </div>

            <div className="space-y-3">
              {recentNotices.map((n) => (
                <div
                  key={n.id}
                  onClick={() => setActiveTab('notices')}
                  className="p-3 rounded-xl bg-slate-50 hover:bg-blue-50/50 transition-colors cursor-pointer border border-slate-200/60"
                >
                  <div className="flex items-center justify-between text-[10px] text-slate-400 mb-1">
                    <span className="font-bold uppercase text-blue-700">{n.category}</span>
                    <span>{n.date}</span>
                  </div>
                  <h4 className="text-xs font-bold text-slate-800 line-clamp-1">{n.title}</h4>
                  <p className="text-[11px] text-slate-500 line-clamp-2 mt-0.5">{n.content}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Quick study material prompt */}
          <div className="p-4 bg-gradient-to-br from-indigo-50 to-blue-50 rounded-2xl border border-indigo-100 flex items-center justify-between">
            <div className="space-y-1">
              <h4 className="font-bold text-slate-900 text-xs">Need Class Notes & PYQs?</h4>
              <p className="text-[11px] text-slate-600">
                Formula sheets, handwritten notes, and solved questions are ready.
              </p>
            </div>
            <button
              onClick={() => setActiveTab('notes')}
              className="px-3 py-1.5 bg-indigo-600 text-white rounded-lg text-xs font-semibold hover:bg-indigo-700 shrink-0 shadow-xs"
            >
              Browse Notes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
