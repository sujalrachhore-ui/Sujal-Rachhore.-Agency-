import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { TeacherProfile } from '../../types';
import { GraduationCap, Plus, Search, Edit2, Trash2, ShieldCheck, Mail, Phone, BookOpen, Layers } from 'lucide-react';
import { Modal } from '../common/Modal';

export const TeacherManagement: React.FC = () => {
  const { teachers, addTeacher, updateTeacher, deleteTeacher, batches } = useApp();

  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editingTeacher, setEditingTeacher] = useState<TeacherProfile | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    qualification: '',
    experienceYears: 10,
    specialization: '',
    subjects: ['Physics'],
    batchIds: [] as string[],
    bio: '',
    status: 'ACTIVE' as TeacherProfile['status'],
  });

  const handleOpenAdd = () => {
    setEditingTeacher(null);
    setFormData({
      name: '',
      email: '',
      mobile: '',
      qualification: '',
      experienceYears: 10,
      specialization: '',
      subjects: ['Physics'],
      batchIds: [batches[0]?.id || ''],
      bio: '',
      status: 'ACTIVE',
    });
    setAddModalOpen(true);
  };

  const handleOpenEdit = (t: TeacherProfile) => {
    setEditingTeacher(t);
    setFormData({
      name: t.name,
      email: t.email,
      mobile: t.mobile,
      qualification: t.qualification,
      experienceYears: t.experienceYears,
      specialization: t.specialization,
      subjects: t.subjects,
      batchIds: t.batchIds,
      bio: t.bio,
      status: t.status,
    });
    setAddModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.qualification) return;

    if (editingTeacher) {
      updateTeacher(editingTeacher.id, formData);
    } else {
      addTeacher({
        ...formData,
        userId: 'user-' + Date.now(),
      });
    }

    setAddModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">Faculty Council & Educator Directory</h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Onboard new faculty members, assign academic subjects, and manage batch teaching loads.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-xs rounded-xl shadow-md flex items-center gap-1.5 transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Onboard Faculty Member</span>
        </button>
      </div>

      {/* Faculty Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {teachers.map((t) => (
          <div
            key={t.id}
            className="p-6 bg-white rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-purple-700 bg-purple-50 px-2.5 py-0.5 rounded border border-purple-200">
                  {t.subjects.join(', ')}
                </span>
                <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                  {t.status}
                </span>
              </div>

              <div>
                <h3 className="font-bold text-slate-900 text-base">{t.name}</h3>
                <p className="text-xs text-indigo-600 font-semibold">{t.qualification}</p>
              </div>

              <div className="text-xs text-slate-600 space-y-1 pt-2 border-t border-slate-100">
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-slate-400" />
                  <span className="truncate">{t.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-slate-400" />
                  <span className="font-mono">{t.mobile}</span>
                </div>
              </div>

              <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed pt-1">
                {t.bio}
              </p>
            </div>

            <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500">
                {t.batchIds.length} Assigned Batches
              </span>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => handleOpenEdit(t)}
                  className="p-1.5 hover:bg-blue-50 text-blue-600 rounded-lg transition-colors"
                  title="Edit Faculty Record"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => deleteTeacher(t.id)}
                  className="p-1.5 hover:bg-rose-50 text-rose-600 rounded-lg transition-colors"
                  title="Deactivate Faculty"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add / Edit Modal */}
      {addModalOpen && (
        <Modal
          isOpen={addModalOpen}
          onClose={() => setAddModalOpen(false)}
          title={editingTeacher ? 'Update Faculty Details' : 'Onboard Faculty Member'}
          subtitle="Configure teaching subjects and batch assignments"
          maxWidth="lg"
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Prof. Rajesh Verma"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-semibold text-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Teaching Tenure (Years)
                </label>
                <input
                  type="number"
                  required
                  value={formData.experienceYears}
                  onChange={(e) => setFormData({ ...formData, experienceYears: Number(e.target.value) })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Email
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="rajesh@mentora.com"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Mobile Contact
                </label>
                <input
                  type="tel"
                  required
                  value={formData.mobile}
                  onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                  placeholder="9876543214"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Qualification *
                </label>
                <input
                  type="text"
                  required
                  value={formData.qualification}
                  onChange={(e) => setFormData({ ...formData, qualification: e.target.value })}
                  placeholder="M.Sc. Mathematics (IIT Kanpur)"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Specialization Field
                </label>
                <input
                  type="text"
                  required
                  value={formData.specialization}
                  onChange={(e) => setFormData({ ...formData, specialization: e.target.value })}
                  placeholder="Integral Calculus, Coordinate Geometry & Vectors"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Faculty Bio
                </label>
                <textarea
                  rows={3}
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  placeholder="Teaching background and mentorship accomplishments..."
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900"
                />
              </div>
            </div>

            <div className="pt-2 flex justify-end gap-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setAddModalOpen(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-xs"
              >
                {editingTeacher ? 'Save Changes' : 'Confirm Onboarding'}
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};
