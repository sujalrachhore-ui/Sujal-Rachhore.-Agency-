import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Batch } from '../../types';
import { Layers, Plus, Edit2, Users, Clock, MapPin, Sparkles } from 'lucide-react';
import { Modal } from '../common/Modal';

export const BatchManagement: React.FC = () => {
  const { batches, courses, teachers, addBatch, updateBatch } = useApp();

  const [modalOpen, setModalOpen] = useState(false);
  const [editingBatch, setEditingBatch] = useState<Batch | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    code: '',
    courseId: courses[0]?.id || 'course-jee',
    timing: '07:30 AM – 12:30 PM',
    classroom: 'Auditorium Hall A (2nd Floor)',
    maxCapacity: 45,
    currentStrength: 0,
    startDate: new Date().toISOString().split('T')[0],
    status: 'ACTIVE' as Batch['status'],
    teacherIds: [] as string[],
  });

  const handleOpenAdd = () => {
    setEditingBatch(null);
    setFormData({
      name: '',
      code: '',
      courseId: courses[0]?.id || 'course-jee',
      timing: '07:30 AM – 12:30 PM',
      classroom: 'Auditorium Hall A (2nd Floor)',
      maxCapacity: 45,
      currentStrength: 0,
      startDate: new Date().toISOString().split('T')[0],
      status: 'ACTIVE',
      teacherIds: [teachers[0]?.userId || ''],
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (b: Batch) => {
    setEditingBatch(b);
    setFormData({
      name: b.name,
      code: b.code,
      courseId: b.courseId,
      timing: b.timing,
      classroom: b.classroom,
      maxCapacity: b.maxCapacity,
      currentStrength: b.currentStrength,
      startDate: b.startDate,
      status: b.status,
      teacherIds: b.teacherIds,
    });
    setModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.code) return;

    if (editingBatch) {
      updateBatch(editingBatch.id, formData);
    } else {
      addBatch(formData);
    }
    setModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">Classroom & Batch Management</h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Allocate student cohorts, schedule timings, assign senior educators, and designate halls.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-xs rounded-xl shadow-md flex items-center gap-1.5 transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Launch New Batch</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {batches.map((b) => {
          const course = courses.find((c) => c.id === b.courseId);
          return (
            <div
              key={b.id}
              className="p-6 bg-white rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-purple-600 bg-purple-50 px-2.5 py-0.5 rounded border border-purple-200">
                    {b.code}
                  </span>
                  <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full">
                    {b.status}
                  </span>
                </div>

                <h3 className="font-bold text-slate-900 text-base">{b.name}</h3>
                <span className="text-xs text-blue-600 font-semibold block">{course?.name}</span>

                <div className="space-y-1.5 text-xs text-slate-600 pt-2 border-t border-slate-100">
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>{b.timing}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    <span>{b.classroom}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-3.5 h-3.5 text-slate-400" />
                    <span>Strength: {b.currentStrength} / {b.maxCapacity} Enrolled</span>
                  </div>
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs text-slate-400">Starts: {b.startDate}</span>
                <button
                  onClick={() => handleOpenEdit(b)}
                  className="p-1.5 hover:bg-blue-50 text-blue-600 rounded-lg transition-colors"
                  title="Edit Batch"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {modalOpen && (
        <Modal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          title={editingBatch ? 'Edit Batch Details' : 'Launch New Batch'}
          subtitle="Configure classroom, timings, and capacity limits"
          maxWidth="md"
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Batch Name *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. JEE 2026 Bravo (Evening)"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-semibold text-slate-900"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Batch Code *
                </label>
                <input
                  type="text"
                  required
                  value={formData.code}
                  onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                  placeholder="JEE-26-B"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-mono text-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Program Course
                </label>
                <select
                  value={formData.courseId}
                  onChange={(e) => setFormData({ ...formData, courseId: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900"
                >
                  {courses.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Daily Timing
                </label>
                <input
                  type="text"
                  required
                  value={formData.timing}
                  onChange={(e) => setFormData({ ...formData, timing: e.target.value })}
                  placeholder="08:00 AM - 01:00 PM"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Max Capacity
                </label>
                <input
                  type="number"
                  required
                  value={formData.maxCapacity}
                  onChange={(e) => setFormData({ ...formData, maxCapacity: Number(e.target.value) })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Classroom Venue
              </label>
              <input
                type="text"
                required
                value={formData.classroom}
                onChange={(e) => setFormData({ ...formData, classroom: e.target.value })}
                placeholder="Auditorium Hall B (3rd Floor)"
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
                {editingBatch ? 'Save Changes' : 'Confirm Batch Launch'}
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};
