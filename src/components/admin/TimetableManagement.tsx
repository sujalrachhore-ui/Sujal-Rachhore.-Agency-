import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { TimetableEntry } from '../../types';
import { Clock, Plus, Trash2, MapPin, User, Layers } from 'lucide-react';
import { Modal } from '../common/Modal';

export const TimetableManagement: React.FC = () => {
  const { timetable, batches, teachers, addTimetableEntry, deleteTimetableEntry } = useApp();

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedBatchId, setSelectedBatchId] = useState(batches[0]?.id || '');

  const [formData, setFormData] = useState({
    batchId: batches[0]?.id || '',
    day: 'Monday' as TimetableEntry['day'],
    startTime: '07:30 AM',
    endTime: '09:45 AM',
    subject: 'Physics',
    teacherId: teachers[0]?.id || '',
    classroom: 'Auditorium Hall A',
  });

  const days: TimetableEntry['day'][] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  const batchSlots = timetable.filter((t) => !selectedBatchId || t.batchId === selectedBatchId);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addTimetableEntry(formData);
    setModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">Master Weekly Timetable Scheduler</h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Define daily class slots, assign educators, and avoid room conflicts.
          </p>
        </div>

        <button
          onClick={() => {
            setFormData({ ...formData, batchId: selectedBatchId || batches[0]?.id || '' });
            setModalOpen(true);
          }}
          className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-xs rounded-xl shadow-md flex items-center gap-1.5 transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add Timetable Slot</span>
        </button>
      </div>

      {/* Batch Filter Bar */}
      <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs flex items-center gap-3">
        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Select Batch:</span>
        <select
          value={selectedBatchId}
          onChange={(e) => setSelectedBatchId(e.target.value)}
          className="bg-slate-50 border border-slate-200 text-slate-800 text-xs font-semibold rounded-xl px-3 py-2 focus:ring-1 focus:ring-blue-500"
        >
          {batches.map((b) => (
            <option key={b.id} value={b.id}>
              {b.name} ({b.timing})
            </option>
          ))}
        </select>
      </div>

      {/* Grid of Days */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {days.map((day) => {
          const slots = batchSlots.filter((s) => s.day === day);
          return (
            <div key={day} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs flex flex-col justify-between">
              <div>
                <div className="p-4 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
                  <h4 className="font-bold text-sm text-slate-900">{day}</h4>
                  <span className="text-xs font-mono text-slate-400">{slots.length} Lectures</span>
                </div>

                <div className="p-4 space-y-3">
                  {slots.length === 0 ? (
                    <div className="p-6 text-center text-xs text-slate-400 italic">No lectures allocated</div>
                  ) : (
                    slots.map((slot) => {
                      const t = teachers.find((x) => x.id === slot.teacherId);
                      return (
                        <div key={slot.id} className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 space-y-1">
                          <div className="flex items-center justify-between text-xs">
                            <span className="font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                              {slot.subject}
                            </span>
                            <button
                              onClick={() => deleteTimetableEntry(slot.id)}
                              className="text-slate-400 hover:text-rose-600 p-0.5"
                              title="Delete slot"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          <div className="font-mono text-slate-600 text-xs font-medium pt-1">
                            {slot.startTime} - {slot.endTime}
                          </div>

                          <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
                            <span>{t?.name || 'Faculty Member'}</span>
                            <span>{slot.classroom}</span>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal */}
      {modalOpen && (
        <Modal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          title="Schedule Timetable Lecture Slot"
          subtitle="Assign time, teacher, and classroom venue"
          maxWidth="md"
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Target Batch
                </label>
                <select
                  value={formData.batchId}
                  onChange={(e) => setFormData({ ...formData, batchId: e.target.value })}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900"
                >
                  {batches.map((b) => (
                    <option key={b.id} value={b.id}>
                      {b.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Day of Week
                </label>
                <select
                  value={formData.day}
                  onChange={(e) => setFormData({ ...formData, day: e.target.value as any })}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900"
                >
                  {days.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Subject *
                </label>
                <input
                  type="text"
                  required
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Faculty Member
                </label>
                <select
                  value={formData.teacherId}
                  onChange={(e) => setFormData({ ...formData, teacherId: e.target.value })}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900"
                >
                  {teachers.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Start Time
                </label>
                <input
                  type="text"
                  required
                  value={formData.startTime}
                  onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                  placeholder="07:30 AM"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-mono text-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  End Time
                </label>
                <input
                  type="text"
                  required
                  value={formData.endTime}
                  onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                  placeholder="09:45 AM"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-mono text-slate-900"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Classroom Room / Lab
              </label>
              <input
                type="text"
                required
                value={formData.classroom}
                onChange={(e) => setFormData({ ...formData, classroom: e.target.value })}
                placeholder="Hall A"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900"
              />
            </div>

            <div className="pt-2 flex justify-end gap-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-xs"
              >
                Confirm Slot
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};
