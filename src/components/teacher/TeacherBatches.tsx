import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Layers, Users, Clock, MapPin, Search, Mail, Phone, CalendarCheck } from 'lucide-react';

export const TeacherBatches: React.FC = () => {
  const { currentTeacherProfile, batches, students, courses, setActiveTab } = useApp();
  const teacher = currentTeacherProfile;

  const assignedBatches = batches.filter(
    (b) => teacher?.batchIds.includes(b.id) || b.teacherIds.includes(teacher?.userId || '')
  );

  const [selectedBatchId, setSelectedBatchId] = useState<string>(assignedBatches[0]?.id || '');
  const [searchTerm, setSearchTerm] = useState('');

  const activeBatch = assignedBatches.find((b) => b.id === selectedBatchId) || assignedBatches[0];
  const activeCourse = courses.find((c) => c.id === activeBatch?.courseId);

  const batchStudents = students.filter(
    (s) =>
      s.batchId === activeBatch?.id &&
      (s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.admissionId.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">Assigned Batches & Student Rosters</h2>
          <p className="text-xs sm:text-sm text-slate-500">
            View allocated student strength, classroom venues, and attendance histories.
          </p>
        </div>
      </div>

      {/* Batch Selectors Tabs */}
      <div className="flex items-center gap-3 overflow-x-auto pb-1">
        {assignedBatches.map((b) => (
          <button
            key={b.id}
            onClick={() => setSelectedBatchId(b.id)}
            className={`p-4 rounded-2xl border text-left min-w-[240px] transition-all flex flex-col justify-between ${
              activeBatch?.id === b.id
                ? 'bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-500/20'
                : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
            }`}
          >
            <div>
              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider mb-2 inline-block ${
                  activeBatch?.id === b.id ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'
                }`}
              >
                {b.code}
              </span>
              <h4 className="font-bold text-sm leading-snug">{b.name}</h4>
              <p className={`text-xs mt-1 ${activeBatch?.id === b.id ? 'text-blue-100' : 'text-slate-500'}`}>
                {b.timing}
              </p>
            </div>

            <div
              className={`mt-4 pt-2 border-t text-xs flex items-center justify-between font-medium ${
                activeBatch?.id === b.id ? 'border-blue-500 text-blue-100' : 'border-slate-100 text-slate-500'
              }`}
            >
              <span>{b.currentStrength} / {b.maxCapacity} Students</span>
              <span>{b.classroom.split(' ')[0]}</span>
            </div>
          </button>
        ))}
      </div>

      {/* Selected Batch Dossier */}
      {activeBatch && (
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs space-y-4">
          <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-50/50">
            <div>
              <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                <Users className="w-4 h-4 text-blue-600" />
                <span>Class Roster for {activeBatch.name}</span>
              </h3>
              <span className="text-xs text-slate-500">
                Program: {activeCourse?.name} • Room: {activeBatch.classroom}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <div className="relative w-64">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Filter student by name or ID..."
                  className="w-full pl-8 pr-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <button
                onClick={() => setActiveTab('attendance')}
                className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs rounded-xl shadow-xs flex items-center gap-1.5 whitespace-nowrap"
              >
                <CalendarCheck className="w-3.5 h-3.5" />
                <span>Take Roll Call</span>
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50 text-slate-500 uppercase tracking-wider font-bold">
                  <th className="p-3.5 pl-6">Student Name</th>
                  <th className="p-3.5">Admission ID</th>
                  <th className="p-3.5">Mobile Contact</th>
                  <th className="p-3.5">Guardian Details</th>
                  <th className="p-3.5 pr-6 text-right">Academic Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {batchStudents.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="p-8 text-center text-slate-400">
                      No matching students found in this batch roster.
                    </td>
                  </tr>
                ) : (
                  batchStudents.map((s) => (
                    <tr key={s.id} className="hover:bg-slate-50 transition-colors">
                      <td className="p-3.5 pl-6 font-bold text-slate-900">{s.name}</td>
                      <td className="p-3.5 font-mono text-blue-600 font-semibold">{s.admissionId}</td>
                      <td className="p-3.5 font-mono text-slate-600">{s.mobile}</td>
                      <td className="p-3.5">
                        <span className="font-medium text-slate-900 block">{s.parentName}</span>
                        <span className="text-[10px] text-slate-400 font-mono">{s.parentMobile}</span>
                      </td>
                      <td className="p-3.5 pr-6 text-right">
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                          {s.status}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
