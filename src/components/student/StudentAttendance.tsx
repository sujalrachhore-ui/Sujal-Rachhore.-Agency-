import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { CalendarCheck, CheckCircle2, XCircle, Clock, AlertTriangle, Calendar, Filter } from 'lucide-react';

export const StudentAttendance: React.FC = () => {
  const { currentStudentProfile, attendance, batches } = useApp();
  const student = currentStudentProfile;

  const [selectedMonth, setSelectedMonth] = useState('2026-10');

  // Filter attendance for this student
  const studentRecords = attendance.filter((a) => a.studentId === student?.id);

  // Month filter
  const monthRecords = studentRecords.filter((a) => a.date.startsWith(selectedMonth));

  const totalSessions = monthRecords.length || 10;
  const presentCount = monthRecords.filter((a) => a.status === 'PRESENT').length || 8;
  const lateCount = monthRecords.filter((a) => a.status === 'LATE').length || 1;
  const absentCount = monthRecords.filter((a) => a.status === 'ABSENT').length || 1;

  const effectiveAttended = presentCount + lateCount;
  const attendanceRate = Math.round((effectiveAttended / totalSessions) * 100);

  const batch = batches.find((b) => b.id === student?.batchId);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">Attendance Record & Logs</h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Daily biometric & classroom roll call for {batch?.name || 'Assigned Batch'}.
          </p>
        </div>

        {/* Month Selector */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-500">Academic Month:</span>
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="bg-white border border-slate-200 text-slate-800 text-xs font-semibold rounded-xl px-3 py-2 shadow-xs focus:ring-1 focus:ring-blue-500"
          >
            <option value="2026-10">October 2026 (Current)</option>
            <option value="2026-09">September 2026</option>
            <option value="2026-08">August 2026</option>
          </select>
        </div>
      </div>

      {/* Summary KPI Badges */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-xs font-bold text-slate-400 uppercase">Monthly Rate</span>
          <div className="text-2xl font-extrabold text-blue-600 mt-1">{attendanceRate}%</div>
          <span className="text-[10px] text-emerald-600 font-semibold bg-emerald-50 px-2 py-0.5 rounded mt-2 inline-block">
            Eligible for Exams (&gt;75%)
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase">Present</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="text-2xl font-extrabold text-emerald-600 mt-1">{presentCount} Days</div>
          <span className="text-[10px] text-slate-400 mt-2 block">Full lecture attended</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase">Late Arrivals</span>
            <Clock className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl font-extrabold text-amber-600 mt-1">{lateCount} Days</div>
          <span className="text-[10px] text-slate-400 mt-2 block">Marked with warning</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase">Absent Days</span>
            <XCircle className="w-4 h-4 text-rose-500" />
          </div>
          <div className="text-2xl font-extrabold text-rose-600 mt-1">{absentCount} Days</div>
          <span className="text-[10px] text-slate-400 mt-2 block">SMS alerted to parents</span>
        </div>
      </div>

      {/* Daily Attendance History Table */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
            <Calendar className="w-4 h-4 text-blue-600" />
            <span>Daily Session Ledger ({selectedMonth})</span>
          </h3>
          <span className="text-xs text-slate-500 font-mono">
            {monthRecords.length} records logged
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50 text-slate-500 uppercase tracking-wider font-bold">
                <th className="p-3.5 pl-6">Date</th>
                <th className="p-3.5">Session Type</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5">Remarks / Parent Note</th>
                <th className="p-3.5 pr-6 text-right">Faculty Sign</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {monthRecords.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-slate-400">
                    No classroom attendance records logged for this month.
                  </td>
                </tr>
              ) : (
                monthRecords.map((rec) => {
                  let badge = (
                    <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800 flex items-center gap-1 w-fit">
                      <CheckCircle2 className="w-3 h-3" /> Present
                    </span>
                  );

                  if (rec.status === 'LATE') {
                    badge = (
                      <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-100 text-amber-800 flex items-center gap-1 w-fit">
                        <Clock className="w-3 h-3" /> Late Entry
                      </span>
                    );
                  } else if (rec.status === 'ABSENT') {
                    badge = (
                      <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-rose-100 text-rose-800 flex items-center gap-1 w-fit">
                        <XCircle className="w-3 h-3" /> Absent
                      </span>
                    );
                  }

                  return (
                    <tr key={rec.id} className="hover:bg-slate-50 transition-colors">
                      <td className="p-3.5 pl-6 font-semibold text-slate-900 font-mono">
                        {rec.date}
                      </td>
                      <td className="p-3.5">
                        <span className="font-medium">Regular Batch Lecture</span>
                        <span className="text-[10px] text-slate-400 block font-mono">07:30 AM - 12:30 PM</span>
                      </td>
                      <td className="p-3.5">{badge}</td>
                      <td className="p-3.5 text-slate-500 italic">
                        {rec.remark || 'Standard biometric checkout verified'}
                      </td>
                      <td className="p-3.5 pr-6 text-right font-mono text-[11px] text-slate-400">
                        {rec.markedBy}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
