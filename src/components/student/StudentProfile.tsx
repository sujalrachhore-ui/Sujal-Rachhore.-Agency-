import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { User, Phone, Mail, MapPin, Calendar, BookOpen, Layers, ShieldCheck, Save, GraduationCap } from 'lucide-react';

export const StudentProfile: React.FC = () => {
  const { currentStudentProfile, currentUser, setShowOnboardingModal, updateStudent, courses, batches, addToast } = useApp();
  const student = currentStudentProfile;

  const [formData, setFormData] = useState({
    name: student?.name || '',
    email: student?.email || '',
    mobile: student?.mobile || '',
    parentName: student?.parentName || '',
    parentMobile: student?.parentMobile || '',
    address: student?.address || '',
  });

  const course = courses.find((c) => c.id === student?.courseId);
  const batch = batches.find((b) => b.id === student?.batchId);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!student) return;
    updateStudent(student.id, formData);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">Student Identity & Dossier</h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Official academic enrollment record and registered guardian contact details.
          </p>
        </div>
      </div>

      {/* Main Profile Card */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
        {/* Banner */}
        <div className="h-32 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 relative">
          <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold text-white flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-300" />
            <span>Verified Admission Record</span>
          </div>
        </div>

        {/* Header with Avatar and Basic Info */}
        <div className="px-6 pb-6 pt-0 relative flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 border-b border-slate-100">
          <div className="flex items-end gap-4 -mt-12">
            <img
              src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=300&q=80"
              alt="Student Avatar"
              className="w-24 h-24 rounded-2xl object-cover border-4 border-white shadow-md bg-slate-100"
            />
            <div className="space-y-1">
              <h3 className="text-xl font-bold text-slate-900">{student?.name}</h3>
              <p className="text-xs font-mono text-slate-500">
                Admission ID: <strong className="text-blue-600">{student?.admissionId}</strong>
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => setShowOnboardingModal(true)}
              className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-all shadow-xs flex items-center gap-1.5"
            >
              <GraduationCap className="w-4 h-4" />
              <span>View ID Card & Dossier</span>
            </button>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-xl">
              Status: {student?.status || 'ACTIVE'}
            </span>
          </div>
        </div>

        {/* Read-Only Academic Enrollment Details */}
        <div className="p-6 bg-slate-50/60 border-b border-slate-200">
          <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
            Academic Program Allocations
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-xs space-y-1">
              <span className="text-slate-400 font-semibold block">Enrolled Course</span>
              <strong className="text-slate-900 block text-sm">{course?.name || 'JEE Comprehensive'}</strong>
              <span className="text-[11px] text-blue-600 font-medium">{course?.duration}</span>
            </div>

            <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-xs space-y-1">
              <span className="text-slate-400 font-semibold block">Allocated Batch</span>
              <strong className="text-slate-900 block text-sm">{batch?.name || 'Alpha Morning'}</strong>
              <span className="text-[11px] text-purple-600 font-medium">{batch?.timing}</span>
            </div>

            <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-xs space-y-1">
              <span className="text-slate-400 font-semibold block">Date of Admission</span>
              <strong className="text-slate-900 block text-sm">{student?.dateOfJoining || '10 Apr 2024'}</strong>
              <span className="text-[11px] text-slate-400 font-mono">Academic Session 2026-27</span>
            </div>
          </div>
        </div>

        {/* Editable Personal and Guardian Details Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            Contact & Guardian Information
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Student Full Name
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white text-slate-900"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Registered Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white text-slate-900"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Student Contact Mobile
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="tel"
                  required
                  value={formData.mobile}
                  onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                  className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white text-slate-900"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Parent / Guardian Name
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  required
                  value={formData.parentName}
                  onChange={(e) => setFormData({ ...formData, parentName: e.target.value })}
                  className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white text-slate-900"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Parent Contact Mobile (For SMS Attendance & Alerts)
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="tel"
                  required
                  value={formData.parentMobile}
                  onChange={(e) => setFormData({ ...formData, parentMobile: e.target.value })}
                  className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white text-slate-900"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Residential Address (Nagpur Region)
              </label>
              <div className="relative">
                <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  required
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white text-slate-900"
                />
              </div>
            </div>
          </div>

          <div className="pt-4 flex justify-end">
            <button
              type="submit"
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs sm:text-sm rounded-xl shadow-xs flex items-center gap-2 transition-colors"
            >
              <Save className="w-4 h-4" />
              <span>Save & Update Profile</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
