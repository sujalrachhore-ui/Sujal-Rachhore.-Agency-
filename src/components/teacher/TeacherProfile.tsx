import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { User, Phone, Mail, Award, BookOpen, Clock, ShieldCheck, Save } from 'lucide-react';

export const TeacherProfile: React.FC = () => {
  const { currentTeacherProfile, updateTeacher, addToast } = useApp();
  const teacher = currentTeacherProfile;

  const [formData, setFormData] = useState({
    name: teacher?.name || '',
    qualification: teacher?.qualification || '',
    experienceYears: teacher?.experienceYears || 12,
    specialization: teacher?.specialization || '',
    bio: teacher?.bio || '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!teacher) return;
    updateTeacher(teacher.id, formData);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">Faculty Academic Dossier</h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Professional credentials, qualifications, and pedagogical tenure.
          </p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="h-32 bg-gradient-to-r from-purple-700 via-indigo-700 to-blue-800 relative">
          <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold text-white flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-300" />
            <span>Senior Faculty Council</span>
          </div>
        </div>

        <div className="px-6 pb-6 pt-0 relative flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 border-b border-slate-100">
          <div className="flex items-end gap-4 -mt-12">
            <img
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80"
              alt="Faculty Avatar"
              className="w-24 h-24 rounded-2xl object-cover border-4 border-white shadow-md bg-slate-100"
            />
            <div className="space-y-1">
              <h3 className="text-xl font-bold text-slate-900">{teacher?.name}</h3>
              <p className="text-xs text-indigo-600 font-semibold">{teacher?.qualification}</p>
            </div>
          </div>

          <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-lg">
            Active Educator
          </span>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Faculty Member Name
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-semibold text-slate-900"
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
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Academic Qualifications & Honors
              </label>
              <input
                type="text"
                required
                value={formData.qualification}
                onChange={(e) => setFormData({ ...formData, qualification: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Key Specialization Topics
              </label>
              <input
                type="text"
                required
                value={formData.specialization}
                onChange={(e) => setFormData({ ...formData, specialization: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Faculty Bio & Teaching Philosophy
              </label>
              <textarea
                rows={4}
                required
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900"
              />
            </div>
          </div>

          <div className="pt-2 flex justify-end">
            <button
              type="submit"
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs sm:text-sm rounded-xl shadow-xs flex items-center gap-2 transition-colors"
            >
              <Save className="w-4 h-4" />
              <span>Save Faculty Credentials</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
