import React, { useState, useEffect, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { AttendanceRecord } from '../../types';
import {
  CalendarCheck,
  CheckCircle2,
  XCircle,
  Clock,
  Save,
  Users,
  Calendar,
  Sparkles,
  Layers,
} from 'lucide-react';

export const TeacherAttendance: React.FC = () => {
  const {
    currentRole,
    currentTeacherProfile,
    batches,
    students,
    attendance,
    markAttendanceBatch,
    addToast,
  } = useApp();

  const teacher = currentTeacherProfile;

  // Filter batches assigned to this teacher, with fallback to all institute batches for Admin / General review
  const availableBatches = useMemo(() => {
    if (currentRole === 'TEACHER' && teacher) {
      const assigned = batches.filter(
        (b) => teacher.batchIds?.includes(b.id) || b.teacherIds?.includes(teacher.userId)
      );
      if (assigned.length > 0) return assigned;
    }
    return batches.length > 0 ? batches : [];
  }, [batches, currentRole, teacher]);

  const [selectedBatchId, setSelectedBatchId] = useState<string>(
    availableBatches[0]?.id || batches[0]?.id || ''
  );
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toISOString().split('T')[0]
  );

  // Synchronize selected batch if availableBatches change or current selection is invalid
  useEffect(() => {
    if (!selectedBatchId && availableBatches.length > 0) {
      setSelectedBatchId(availableBatches[0].id);
    } else if (availableBatches.length > 0 && !availableBatches.some((b) => b.id === selectedBatchId)) {
      setSelectedBatchId(availableBatches[0].id);
    }
  }, [availableBatches, selectedBatchId]);

  // Students in selected batch
  const batchStudents = students.filter((s) => s.batchId === selectedBatchId);

  // Local state for roll call
  const [studentStatusMap, setStudentStatusMap] = useState<
    Record<string, { status: AttendanceRecord['status']; remark: string }>
  >({});

  // Synchronize student status map whenever batch, date, students, or attendance changes
  useEffect(() => {
    const map: Record<string, { status: AttendanceRecord['status']; remark: string }> = {};
    const currBatchStudents = students.filter((s) => s.batchId === selectedBatchId);
    currBatchStudents.forEach((s) => {
      const existing = attendance.find((a) => a.studentId === s.id && a.date === selectedDate);
      map[s.id] = {
        status: existing?.status || 'PRESENT',
        remark: existing?.remark || '',
      };
    });
    setStudentStatusMap(map);
  }, [selectedBatchId, selectedDate, students, attendance]);

  const handleStatusChange = (studentId: string, status: AttendanceRecord['status']) => {
    setStudentStatusMap((prev) => ({
      ...prev,
      [studentId]: {
        ...prev[studentId],
        status,
      },
    }));
  };

  const handleRemarkChange = (studentId: string, remark: string) => {
    setStudentStatusMap((prev) => ({
      ...prev,
      [studentId]: {
        ...prev[studentId],
        remark,
      },
    }));
  };

  const handleMarkAll = (status: AttendanceRecord['status']) => {
    setStudentStatusMap((prev) => {
      const next = { ...prev };
      batchStudents.forEach((s) => {
        next[s.id] = { ...next[s.id], status };
      });
      return next;
    });
    addToast(`All ${batchStudents.length} students marked as ${status}`, 'info');
  };

  const handleSave = () => {
    const recordsToSave = batchStudents.map((s) => ({
      studentId: s.id,
      batchId: selectedBatchId,
      date: selectedDate,
      status: studentStatusMap[s.id]?.status || 'PRESENT',
      remark: studentStatusMap[s.id]?.remark || '',
      markedBy: teacher?.name || 'Prof. Priya Sharma',
    }));

    markAttendanceBatch(recordsToSave);
  };

  const presentCount = Object.values(studentStatusMap).filter((v) => v.status === 'PRESENT').length;
  const lateCount = Object.values(studentStatusMap).filter((v) => v.status === 'LATE').length;
  const absentCount = Object.values(studentStatusMap).filter((v) => v.status === 'ABSENT').length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">Biometric & Classroom Roll Call</h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Record lecture attendance. Absenteeism triggers automatic SMS alerts to guardians.
          </p>
        </div>

        <button
          onClick={handleSave}
          className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-xs rounded-xl shadow-md flex items-center gap-2 transition-all self-start sm:self-auto"
        >
          <Save className="w-4 h-4" />
          <span>Save & Submit Attendance</span>
        </button>
      </div>

      {/* Filter and Quick Action Strip */}
      <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          {/* Batch Selector */}
          <div>
            <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-blue-600" />
              <span>Select Coaching Batch:</span>
            </label>
            <select
              value={selectedBatchId}
              onChange={(e) => setSelectedBatchId(e.target.value)}
              className="bg-white border-2 border-blue-500/40 hover:border-blue-500 text-slate-900 text-xs font-bold rounded-xl px-3.5 py-2 shadow-xs focus:ring-2 focus:ring-blue-600 focus:outline-none min-w-[240px] transition-all cursor-pointer"
            >
              {availableBatches.length === 0 ? (
                <option value="">No batches available</option>
              ) : (
                availableBatches.map((b) => (
                  <option key={b.id} value={b.id} className="text-slate-900 font-semibold py-1">
                    {b.name} ({b.timing})
                  </option>
                ))
              )}
            </select>
          </div>

          {/* Date Selector */}
          <div>
            <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-blue-600" />
              <span>Attendance Date:</span>
            </label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="bg-white border border-slate-300 hover:border-slate-400 text-slate-900 text-xs font-bold rounded-xl px-3.5 py-2 shadow-xs focus:ring-2 focus:ring-blue-600 focus:outline-none transition-all cursor-pointer"
            />
          </div>
        </div>

        {/* Quick Batch Actions & Counters */}
        <div className="flex items-center gap-2 w-full md:w-auto justify-end">
          <div className="flex items-center gap-2 text-xs font-semibold mr-2">
            <span className="text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
              {presentCount} Present
            </span>
            <span className="text-amber-700 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200">
              {lateCount} Late
            </span>
            <span className="text-rose-700 bg-rose-50 px-2.5 py-1 rounded-lg border border-rose-200">
              {absentCount} Absent
            </span>
          </div>

          <button
            type="button"
            onClick={() => handleMarkAll('PRESENT')}
            className="px-3 py-2 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 rounded-xl text-xs font-bold border border-emerald-200 transition-colors"
          >
            Mark All Present
          </button>
        </div>
      </div>

      {/* Attendance Roster Table */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50 text-slate-500 uppercase tracking-wider font-bold">
                <th className="p-3.5 pl-6">Student Name & ID</th>
                <th className="p-3.5">Contact</th>
                <th className="p-3.5">Roll Call Status</th>
                <th className="p-3.5 pr-6">Teacher Notes / Remarks</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {batchStudents.length === 0 ? (
                <tr>
                  <td colSpan={4} className="p-8 text-center text-slate-400">
                    No students currently allocated to this batch.
                  </td>
                </tr>
              ) : (
                batchStudents.map((s) => {
                  const currentStatus = studentStatusMap[s.id]?.status || 'PRESENT';
                  const currentRemark = studentStatusMap[s.id]?.remark || '';

                  return (
                    <tr key={s.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="p-3.5 pl-6">
                        <div className="font-bold text-slate-900 text-sm">{s.name}</div>
                        <div className="text-[10px] text-slate-400 font-mono">Admission ID: {s.admissionId}</div>
                      </td>

                      <td className="p-3.5">
                        <span className="font-mono text-slate-600 block">{s.mobile}</span>
                        <span className="text-[10px] text-slate-400">Guardian: {s.parentName}</span>
                      </td>

                      {/* Status Selector Radio Pills */}
                      <td className="p-3.5">
                        <div className="flex items-center gap-1.5">
                          <button
                            type="button"
                            onClick={() => handleStatusChange(s.id, 'PRESENT')}
                            className={`px-3 py-1.5 rounded-lg font-bold text-xs transition-all flex items-center gap-1 ${
                              currentStatus === 'PRESENT'
                                ? 'bg-emerald-600 text-white shadow-xs'
                                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                            }`}
                          >
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>Present</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => handleStatusChange(s.id, 'LATE')}
                            className={`px-3 py-1.5 rounded-lg font-bold text-xs transition-all flex items-center gap-1 ${
                              currentStatus === 'LATE'
                                ? 'bg-amber-500 text-white shadow-xs'
                                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                            }`}
                          >
                            <Clock className="w-3.5 h-3.5" />
                            <span>Late</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => handleStatusChange(s.id, 'ABSENT')}
                            className={`px-3 py-1.5 rounded-lg font-bold text-xs transition-all flex items-center gap-1 ${
                              currentStatus === 'ABSENT'
                                ? 'bg-rose-600 text-white shadow-xs'
                                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                            }`}
                          >
                            <XCircle className="w-3.5 h-3.5" />
                            <span>Absent</span>
                          </button>
                        </div>
                      </td>

                      {/* Remark Input */}
                      <td className="p-3.5 pr-6">
                        <input
                          type="text"
                          value={currentRemark}
                          onChange={(e) => handleRemarkChange(s.id, e.target.value)}
                          placeholder="Optional remark (e.g. sick leave, informed via parent call)..."
                          className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:ring-1 focus:ring-blue-500 text-slate-800"
                        />
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
