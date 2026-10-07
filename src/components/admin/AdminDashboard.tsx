import React from 'react';
import { useApp } from '../../context/AppContext';
import { formatINR } from '../../utils/helpers';
import {
  Users,
  GraduationCap,
  BookOpen,
  Layers,
  CreditCard,
  CalendarCheck,
  Clock,
  Inbox,
  TrendingUp,
  Award,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  DollarSign,
  BarChart3,
  PieChart,
  UserCheck,
  Smartphone,
  Mail,
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const {
    students,
    teachers,
    courses,
    batches,
    fees,
    payments,
    attendance,
    tests,
    enquiries,
    loginLogs,
    setActiveTab,
  } = useApp();

  // Metrics
  const totalStudentsCount = students.length;
  const totalTeachersCount = teachers.length;
  const totalCoursesCount = courses.length;
  const totalBatchesCount = batches.length;
  const totalLoginSessions = loginLogs.length;
  const onlineUsersCount = loginLogs.filter((l) => l.status === 'ONLINE').length;

  const totalCollectedFees = payments.reduce((acc, curr) => acc + curr.amount, 0);
  const totalPendingFees = fees.reduce((acc, curr) => acc + curr.dueAmount, 0);

  const newEnquiriesCount = enquiries.filter((e) => e.status === 'NEW').length;

  // Recent payments
  const recentPayments = payments.slice(0, 4);

  // Recent enquiries
  const recentEnquiries = enquiries.slice(0, 4);

  // Recent logged-in user sessions
  const recentLoginLogs = loginLogs.slice(0, 4);

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-blue-950 text-white p-6 sm:p-8 rounded-3xl shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 border border-slate-800">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-semibold">
            <ShieldCheck className="w-4 h-4 text-amber-400" />
            <span>Master Administration Console</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Mentora Institute Executive Overview
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
            Real-time monitoring across student enrollment, fee collections, faculty allocations, and CBT performance.
          </p>
        </div>

        <div className="flex flex-wrap gap-2.5">
          <button
            onClick={() => setActiveTab('login-logs')}
            className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center gap-1.5"
          >
            <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
            <span>{onlineUsersCount} Online • {totalLoginSessions} Logged Users</span>
          </button>
          <button
            onClick={() => setActiveTab('students')}
            className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center gap-1.5"
          >
            <Users className="w-4 h-4" />
            <span>Enroll New Student</span>
          </button>
          <button
            onClick={() => setActiveTab('enquiries')}
            className="px-4 py-2.5 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white font-semibold text-xs rounded-xl transition-all flex items-center gap-1.5"
          >
            <Inbox className="w-4 h-4 text-amber-400" />
            <span>{newEnquiriesCount} New Leads</span>
          </button>
        </div>
      </div>

      {/* Primary KPI Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Students */}
        <div
          onClick={() => setActiveTab('students')}
          className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between text-slate-500 mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Total Enrolled</span>
            <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:scale-105 transition-transform">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-slate-900">{totalStudentsCount} Students</div>
          <span className="text-[11px] text-emerald-600 font-semibold mt-2 block flex items-center gap-1">
            <TrendingUp className="w-3 h-3" /> +18% admissions growth this term
          </span>
        </div>

        {/* Total Teachers */}
        <div
          onClick={() => setActiveTab('teachers')}
          className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between text-slate-500 mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Faculty Council</span>
            <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center group-hover:scale-105 transition-transform">
              <GraduationCap className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-slate-900">{totalTeachersCount} Faculty</div>
          <span className="text-[11px] text-slate-400 mt-2 block">
            100% active teaching tenure
          </span>
        </div>

        {/* Revenue Collected */}
        <div
          onClick={() => setActiveTab('fees')}
          className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between text-slate-500 mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Fees Collected</span>
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:scale-105 transition-transform">
              <CreditCard className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-emerald-600">
            {formatINR(totalCollectedFees)}
          </div>
          <span className="text-[11px] text-slate-400 mt-2 block">
            {payments.length} verified transactions
          </span>
        </div>

        {/* Pending Fees */}
        <div
          onClick={() => setActiveTab('fees')}
          className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between text-slate-500 mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Receivables Due</span>
            <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center group-hover:scale-105 transition-transform">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-amber-600">
            {formatINR(totalPendingFees)}
          </div>
          <span className="text-[11px] text-amber-700 font-semibold mt-2 block">
            Installments due Nov 2026
          </span>
        </div>
      </div>

      {/* Visual Analytics / Charts Simulation */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Financial & Enrollment Bar Graph */}
        <div className="lg:col-span-8 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-blue-600" />
              <span>Program Enrollment Distribution & Fee Recovery</span>
            </h3>
            <span className="text-xs text-slate-400 font-mono">Academic Year 2026</span>
          </div>

          <div className="space-y-4 pt-2">
            {courses.map((course, idx) => {
              const courseStudents = students.filter((s) => s.courseId === course.id);
              const pct = Math.min(100, Math.round((courseStudents.length / 5) * 100)) || (idx === 0 ? 85 : 60);

              return (
                <div key={course.id} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-800">{course.name}</span>
                    <span className="font-mono text-slate-500">
                      {courseStudents.length} Students • {formatINR(course.totalFees)}
                    </span>
                  </div>
                  <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden flex">
                    <div
                      className={`h-full rounded-full ${
                        idx === 0
                          ? 'bg-blue-600'
                          : idx === 1
                          ? 'bg-purple-600'
                          : idx === 2
                          ? 'bg-emerald-600'
                          : 'bg-amber-500'
                      }`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Quick Batch Roster KPI */}
        <div className="lg:col-span-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <Layers className="w-4 h-4 text-purple-600" />
              <span>Active Batch Capacity</span>
            </h3>
            <button
              onClick={() => setActiveTab('batches')}
              className="text-xs text-blue-600 hover:text-blue-700 font-semibold"
            >
              All Batches
            </button>
          </div>

          <div className="space-y-3">
            {batches.map((b) => (
              <div
                key={b.id}
                className="p-3 bg-slate-50 rounded-xl border border-slate-200/70 flex items-center justify-between text-xs"
              >
                <div>
                  <h5 className="font-bold text-slate-900">{b.name}</h5>
                  <span className="text-[10px] text-slate-500">{b.timing}</span>
                </div>
                <div className="text-right">
                  <span className="font-bold text-blue-600">
                    {b.currentStrength} / {b.maxCapacity}
                  </span>
                  <span className="text-[10px] text-slate-400 block">Occupied</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Real-Time Logged-In Users & Session Audit (Owner Visibility) */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-100 gap-2">
          <div>
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <UserCheck className="w-4 h-4 text-emerald-600" />
              <span>Real-Time Logged-In Users & Session Audit (Owner Access)</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Live directory of students, teachers & aspirants authenticated via Google, Mobile OTP, or Email with allocated Login IDs.
            </p>
          </div>
          <button
            onClick={() => setActiveTab('login-logs')}
            className="text-xs text-blue-600 hover:text-blue-700 font-bold flex items-center gap-1 self-start sm:self-auto"
          >
            <span>View All Logged Users ({totalLoginSessions})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {recentLoginLogs.map((log) => (
            <div
              key={log.id}
              onClick={() => setActiveTab('login-logs')}
              className="p-3.5 bg-slate-50 hover:bg-blue-50/40 rounded-xl border border-slate-200/80 transition-all cursor-pointer group space-y-2"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-extrabold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                  {log.loginId}
                </span>
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded-full flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  {log.status}
                </span>
              </div>

              <div>
                <h5 className="font-bold text-slate-900 text-xs truncate group-hover:text-blue-600 transition-colors">
                  {log.userName}
                </h5>
                <span className="text-[11px] text-slate-500 block truncate">
                  {log.mobile}
                </span>
              </div>

              <div className="pt-1 border-t border-slate-200/60 flex items-center justify-between text-[10px] text-slate-400">
                <span className="font-semibold text-slate-600">
                  {log.loginProvider === 'GOOGLE' ? 'Google' : log.loginProvider === 'MOBILE' ? 'Mobile OTP' : 'Email'}
                </span>
                <span className="truncate max-w-[100px]">{log.targetExam || 'Aspirant'}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom 2-Column: Recent Payments Ledger & Admission Enquiries */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Recent Transactions */}
        <div className="lg:col-span-6 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-emerald-600" />
              <span>Recent Payments Received</span>
            </h3>
            <button
              onClick={() => setActiveTab('fees')}
              className="text-xs text-blue-600 hover:text-blue-700 font-semibold"
            >
              Fee Ledger &rarr;
            </button>
          </div>

          <div className="space-y-3">
            {recentPayments.map((p) => (
              <div
                key={p.id}
                className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/70 flex items-center justify-between text-xs"
              >
                <div>
                  <div className="font-bold text-slate-900">{p.studentName}</div>
                  <div className="text-[10px] text-slate-400 font-mono">{p.receiptNumber} • {p.paymentMethod}</div>
                </div>

                <div className="text-right">
                  <div className="text-sm font-extrabold text-emerald-600">{formatINR(p.amount)}</div>
                  <span className="text-[10px] text-slate-400">{p.paymentDate}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Admission Enquiries CRM Leads */}
        <div className="lg:col-span-6 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <Inbox className="w-4 h-4 text-blue-600" />
              <span>Latest Prospective Admission Leads</span>
            </h3>
            <button
              onClick={() => setActiveTab('enquiries')}
              className="text-xs text-blue-600 hover:text-blue-700 font-semibold"
            >
              CRM Pipeline &rarr;
            </button>
          </div>

          <div className="space-y-3">
            {recentEnquiries.map((enq) => (
              <div
                key={enq.id}
                className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/70 flex items-center justify-between text-xs"
              >
                <div className="space-y-0.5">
                  <div className="font-bold text-slate-900">{enq.studentName}</div>
                  <div className="text-[11px] text-blue-600">{enq.courseInterested}</div>
                  <div className="text-[10px] text-slate-400 font-mono">{enq.mobile}</div>
                </div>

                <div className="text-right space-y-1">
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                      enq.status === 'NEW'
                        ? 'bg-blue-100 text-blue-800'
                        : enq.status === 'CONVERTED'
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}
                  >
                    {enq.status}
                  </span>
                  <span className="text-[10px] text-slate-400 block">{enq.date.split('T')[0]}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
