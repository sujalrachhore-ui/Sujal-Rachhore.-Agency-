import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Layers,
  Users,
  CalendarCheck,
  FileCheck2,
  FileText,
  Clock,
  ArrowRight,
  Plus,
  Play,
  Sparkles,
  MapPin,
} from 'lucide-react';

export const TeacherDashboard: React.FC = () => {
  const {
    currentTeacherProfile,
    batches,
    students,
    tests,
    timetable,
    setActiveTab,
  } = useApp();

  const teacher = currentTeacherProfile;

  // Filter batches assigned to this teacher
  const assignedBatches = batches.filter(
    (b) => teacher?.batchIds.includes(b.id) || b.teacherIds.includes(teacher?.userId || '')
  );

  const assignedBatchIds = new Set(assignedBatches.map((b) => b.id));
  const assignedStudents = students.filter((s) => assignedBatchIds.has(s.batchId));

  // Today's classes
  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const todayName = dayNames[new Date().getDay()];
  const todaySlots = timetable.filter(
    (t) => t.day === todayName && (t.teacherId === teacher?.id || assignedBatchIds.has(t.batchId))
  );

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-purple-800 via-indigo-800 to-blue-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-xs font-semibold">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Senior Faculty Console Active</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Welcome, {teacher?.name || 'Faculty Member'}! 📚
          </h1>
          <p className="text-xs sm:text-sm text-purple-200 max-w-xl">
            {teacher?.qualification} • Specialization: <strong>{teacher?.specialization}</strong>
          </p>
        </div>

        <div className="flex flex-wrap gap-2.5">
          <button
            onClick={() => setActiveTab('attendance')}
            className="px-4 py-2.5 bg-white text-purple-900 hover:bg-purple-50 font-bold text-xs rounded-xl shadow-md transition-all flex items-center gap-1.5"
          >
            <CalendarCheck className="w-4 h-4 text-purple-700" />
            <span>Mark Today's Attendance</span>
          </button>
          <button
            onClick={() => setActiveTab('tests')}
            className="px-4 py-2.5 bg-white/20 hover:bg-white/30 backdrop-blur-md text-white font-semibold text-xs rounded-xl transition-all flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>Create New Test</span>
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div
          onClick={() => setActiveTab('batches')}
          className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between text-slate-500 mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">My Batches</span>
            <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center group-hover:scale-105 transition-transform">
              <Layers className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-slate-900">{assignedBatches.length} Batches</div>
          <span className="text-xs text-slate-500 mt-2 block">
            {assignedBatches.map((b) => b.name.split(' ')[0]).join(', ')}
          </span>
        </div>

        <div
          onClick={() => setActiveTab('students')}
          className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between text-slate-500 mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Total Students</span>
            <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:scale-105 transition-transform">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-slate-900">{assignedStudents.length} Enrolled</div>
          <span className="text-xs text-emerald-600 font-semibold mt-2 block">
            All active & biometric verified
          </span>
        </div>

        <div
          onClick={() => setActiveTab('tests')}
          className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between text-slate-500 mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Scheduled Tests</span>
            <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center group-hover:scale-105 transition-transform">
              <FileCheck2 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-slate-900">{tests.length} Active</div>
          <span className="text-xs text-blue-600 font-semibold mt-2 block flex items-center gap-1">
            Build Question Bank <ArrowRight className="w-3 h-3" />
          </span>
        </div>

        <div
          onClick={() => setActiveTab('notes')}
          className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between text-slate-500 mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Repository</span>
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:scale-105 transition-transform">
              <FileText className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-slate-900">Upload Notes</div>
          <span className="text-xs text-slate-500 mt-2 block">
            Share PDFs & video lecture links
          </span>
        </div>
      </div>

      {/* Today's Schedule & Quick Action Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Today's Classroom Schedule */}
        <div className="lg:col-span-7 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <Clock className="w-4 h-4 text-purple-600" />
              <span>Today's Lecture Timetable ({todayName})</span>
            </h3>
            <button
              onClick={() => setActiveTab('timetable')}
              className="text-xs text-blue-600 hover:text-blue-700 font-semibold"
            >
              Full Schedule &rarr;
            </button>
          </div>

          <div className="space-y-3">
            {todaySlots.length === 0 ? (
              <div className="p-8 text-center bg-slate-50 rounded-xl text-xs text-slate-500">
                No physical lectures scheduled for {todayName}. Dedicated doubt-clearing desk active at reception.
              </div>
            ) : (
              todaySlots.map((slot) => {
                const b = batches.find((x) => x.id === slot.batchId);
                return (
                  <div
                    key={slot.id}
                    className="p-4 bg-slate-50 rounded-xl border border-slate-200/80 flex items-center justify-between"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded border border-purple-200">
                          {slot.subject}
                        </span>
                        <span className="text-xs font-bold text-slate-700">{b?.name}</span>
                      </div>
                      <div className="text-xs text-slate-500 flex items-center gap-2 font-mono">
                        <span>{slot.startTime} - {slot.endTime}</span>
                        <span>•</span>
                        <span className="flex items-center gap-1 font-sans">
                          <MapPin className="w-3 h-3 text-slate-400" /> {slot.classroom}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => setActiveTab('attendance')}
                      className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold shadow-xs"
                    >
                      Roll Call
                    </button>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Right: Quick Action Cards */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-5 bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl border border-purple-100 space-y-3">
            <h4 className="font-bold text-slate-900 text-sm">Faculty Quick Actions</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Use these shortcuts to record roll call, upload DPP answer keys, or schedule a diagnostic assessment.
            </p>

            <div className="grid grid-cols-2 gap-2 pt-2">
              <button
                onClick={() => setActiveTab('attendance')}
                className="p-3 bg-white hover:bg-purple-50 rounded-xl border border-purple-200 text-left transition-colors shadow-xs"
              >
                <CalendarCheck className="w-5 h-5 text-purple-600 mb-1" />
                <span className="text-xs font-bold text-slate-900 block">Take Attendance</span>
                <span className="text-[10px] text-slate-500">Fast one-click grid</span>
              </button>

              <button
                onClick={() => setActiveTab('tests')}
                className="p-3 bg-white hover:bg-purple-50 rounded-xl border border-purple-200 text-left transition-colors shadow-xs"
              >
                <FileCheck2 className="w-5 h-5 text-blue-600 mb-1" />
                <span className="text-xs font-bold text-slate-900 block">Build Test</span>
                <span className="text-[10px] text-slate-500">MCQ & negative marks</span>
              </button>

              <button
                onClick={() => setActiveTab('notes')}
                className="p-3 bg-white hover:bg-purple-50 rounded-xl border border-purple-200 text-left transition-colors shadow-xs"
              >
                <FileText className="w-5 h-5 text-emerald-600 mb-1" />
                <span className="text-xs font-bold text-slate-900 block">Share Material</span>
                <span className="text-[10px] text-slate-500">PDF & video links</span>
              </button>

              <button
                onClick={() => setActiveTab('notices')}
                className="p-3 bg-white hover:bg-purple-50 rounded-xl border border-purple-200 text-left transition-colors shadow-xs"
              >
                <Clock className="w-5 h-5 text-amber-600 mb-1" />
                <span className="text-xs font-bold text-slate-900 block">Batch Notice</span>
                <span className="text-[10px] text-slate-500">Alert your students</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
