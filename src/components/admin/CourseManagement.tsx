import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Course } from '../../types';
import { formatINR } from '../../utils/helpers';
import { BookOpen, Plus, Edit2, Trash2, Clock, Layers, Sparkles, CheckCircle2 } from 'lucide-react';
import { Modal } from '../common/Modal';

export const CourseManagement: React.FC = () => {
  const { courses, addCourse, updateCourse, deleteCourse } = useApp();

  const [modalOpen, setModalOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    code: '',
    tagline: '',
    description: '',
    duration: '2 Years',
    subjects: ['Physics', 'Chemistry', 'Mathematics'],
    eligibility: 'Class 10th passed',
    totalFees: 120000,
    features: ['Weekly NTA Computer Based Test', 'Personal Doubt Clearing Desk', 'Study Modules & DPPs'],
    badge: '',
    status: 'ACTIVE' as Course['status'],
  });

  const handleOpenAdd = () => {
    setEditingCourse(null);
    setFormData({
      name: '',
      code: '',
      tagline: '',
      description: '',
      duration: '2 Years',
      subjects: ['Physics', 'Chemistry', 'Mathematics'],
      eligibility: 'Class 10th passed',
      totalFees: 120000,
      features: ['Weekly NTA Computer Based Test', 'Personal Doubt Clearing Desk', 'Study Modules & DPPs'],
      badge: '',
      status: 'ACTIVE',
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (c: Course) => {
    setEditingCourse(c);
    setFormData({
      name: c.name,
      code: c.code,
      tagline: c.tagline,
      description: c.description,
      duration: c.duration,
      subjects: c.subjects,
      eligibility: c.eligibility,
      totalFees: c.totalFees,
      features: c.features,
      badge: c.badge || '',
      status: c.status,
    });
    setModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.code) return;

    if (editingCourse) {
      updateCourse(editingCourse.id, formData);
    } else {
      addCourse(formData);
    }
    setModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">Academic Course Architecture</h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Define curriculum parameters, fee pricing, durations, and subject coverage.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-xs rounded-xl shadow-md flex items-center gap-1.5 transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Launch New Course</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <div
            key={course.id}
            className="p-6 bg-white rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded border border-blue-200">
                  {course.code}
                </span>
                {course.badge && (
                  <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                    {course.badge}
                  </span>
                )}
              </div>

              <h3 className="font-bold text-slate-900 text-base leading-snug">{course.name}</h3>
              <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">{course.tagline}</p>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-500 font-medium">{course.duration}</span>
                <span className="font-bold text-slate-900">{formatINR(course.totalFees)}</span>
              </div>

              <div className="flex flex-wrap gap-1 pt-1">
                {course.subjects.map((s) => (
                  <span key={s} className="text-[10px] font-medium bg-slate-100 text-slate-600 px-2 py-0.5 rounded">
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                {course.status}
              </span>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => handleOpenEdit(course)}
                  className="p-1.5 hover:bg-blue-50 text-blue-600 rounded-lg transition-colors"
                  title="Edit Course"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => deleteCourse(course.id)}
                  className="p-1.5 hover:bg-rose-50 text-rose-600 rounded-lg transition-colors"
                  title="Archive Course"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {modalOpen && (
        <Modal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          title={editingCourse ? 'Edit Course Specifications' : 'Launch New Course Program'}
          subtitle="Configure duration, subjects, and total fees"
          maxWidth="lg"
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Course Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. JEE (Main + Advanced) 2-Year Program"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-semibold text-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Course Code *
                </label>
                <input
                  type="text"
                  required
                  value={formData.code}
                  onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                  placeholder="JEE-ADV"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-mono text-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Total Program Fee (₹)
                </label>
                <input
                  type="number"
                  required
                  value={formData.totalFees}
                  onChange={(e) => setFormData({ ...formData, totalFees: Number(e.target.value) })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Duration
                </label>
                <input
                  type="text"
                  required
                  value={formData.duration}
                  onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                  placeholder="2 Years / 1 Year Intensive"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Promotional Tag / Badge
                </label>
                <input
                  type="text"
                  value={formData.badge}
                  onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                  placeholder="Flagship Program"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Tagline
                </label>
                <input
                  type="text"
                  required
                  value={formData.tagline}
                  onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                  placeholder="Premier IIT-JEE preparation with concept rigor..."
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Full Course Description
                </label>
                <textarea
                  rows={3}
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900"
                />
              </div>
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
                {editingCourse ? 'Save Changes' : 'Confirm Launch'}
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};
