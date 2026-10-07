import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { StudentProfile } from '../../types';
import { exportToCSV, formatINR } from '../../utils/helpers';
import {
  Users,
  Plus,
  Search,
  Filter,
  Download,
  Edit2,
  Trash2,
  Eye,
  CheckCircle2,
  AlertTriangle,
  BookOpen,
  Layers,
  Phone,
  Mail,
  MapPin,
  Calendar,
} from 'lucide-react';
import { Modal } from '../common/Modal';
import { ConfirmDialog } from '../common/ConfirmDialog';

export const StudentManagement: React.FC = () => {
  const { students, courses, batches, addStudent, updateStudent, deleteStudent, fees, addToast } = useApp();

  const [searchTerm, setSearchTerm] = useState('');
  const [courseFilter, setCourseFilter] = useState('ALL');
  const [batchFilter, setBatchFilter] = useState('ALL');

  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState<StudentProfile | null>(null);
  const [viewingStudent, setViewingStudent] = useState<StudentProfile | null>(null);
  const [deletingStudentId, setDeletingStudentId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    courseId: courses[0]?.id || 'course-jee',
    batchId: batches[0]?.id || 'batch-jee-alpha',
    admissionId: `MI-2026-0${Math.floor(100 + Math.random() * 900)}`,
    dateOfJoining: new Date().toISOString().split('T')[0],
    parentName: '',
    parentMobile: '',
    address: 'Nagpur, Maharashtra',
    status: 'ACTIVE' as StudentProfile['status'],
  });

  const filteredStudents = students.filter((s) => {
    const matchSearch =
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.admissionId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.mobile.includes(searchTerm);
    const matchCourse = courseFilter === 'ALL' || s.courseId === courseFilter;
    const matchBatch = batchFilter === 'ALL' || s.batchId === batchFilter;
    return matchSearch && matchCourse && matchBatch;
  });

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.mobile) return;

    if (editingStudent) {
      updateStudent(editingStudent.id, formData);
      setEditingStudent(null);
    } else {
      addStudent({
        ...formData,
        userId: 'user-' + Date.now(),
      });
    }

    setAddModalOpen(false);
    setFormData({
      name: '',
      email: '',
      mobile: '',
      courseId: courses[0]?.id || 'course-jee',
      batchId: batches[0]?.id || 'batch-jee-alpha',
      admissionId: `MI-2026-0${Math.floor(100 + Math.random() * 900)}`,
      dateOfJoining: new Date().toISOString().split('T')[0],
      parentName: '',
      parentMobile: '',
      address: 'Nagpur, Maharashtra',
      status: 'ACTIVE',
    });
  };

  const handleOpenEdit = (student: StudentProfile) => {
    setEditingStudent(student);
    setFormData({
      name: student.name,
      email: student.email,
      mobile: student.mobile,
      courseId: student.courseId,
      batchId: student.batchId,
      admissionId: student.admissionId,
      dateOfJoining: student.dateOfJoining,
      parentName: student.parentName,
      parentMobile: student.parentMobile,
      address: student.address,
      status: student.status,
    });
    setAddModalOpen(true);
  };

  const handleExport = () => {
    exportToCSV(
      'Mentora_Students_Directory_' + new Date().toISOString().split('T')[0],
      filteredStudents.map((s) => {
        const c = courses.find((course) => course.id === s.courseId);
        const b = batches.find((batch) => batch.id === s.batchId);
        const f = fees.find((fee) => fee.studentId === s.id);
        return {
          AdmissionID: s.admissionId,
          Name: s.name,
          Email: s.email,
          Mobile: s.mobile,
          Course: c?.name || '',
          Batch: b?.name || '',
          JoiningDate: s.dateOfJoining,
          GuardianName: s.parentName,
          GuardianPhone: s.parentMobile,
          TotalFees: f?.totalAmount || 0,
          PendingFees: f?.dueAmount || 0,
          Status: s.status,
        };
      })
    );
    addToast('Student directory exported to CSV', 'success');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">Student Admissions & Directory</h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Manage academic enrollments, admission IDs, batch assignments, and fee dossiers.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleExport}
            className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-xl transition-colors flex items-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>

          <button
            onClick={() => {
              setEditingStudent(null);
              setAddModalOpen(true);
            }}
            className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-xs rounded-xl shadow-md flex items-center gap-1.5 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Enroll New Student</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          {/* Search */}
          <div className="relative w-full sm:w-64">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search name, ID or mobile..."
              className="w-full pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-1 focus:ring-blue-500"
            />
          </div>

          {/* Course filter */}
          <select
            value={courseFilter}
            onChange={(e) => setCourseFilter(e.target.value)}
            className="bg-slate-50 border border-slate-200 text-slate-800 text-xs font-semibold rounded-xl px-3 py-2 focus:ring-1 focus:ring-blue-500"
          >
            <option value="ALL">All Courses</option>
            {courses.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>

          {/* Batch filter */}
          <select
            value={batchFilter}
            onChange={(e) => setBatchFilter(e.target.value)}
            className="bg-slate-50 border border-slate-200 text-slate-800 text-xs font-semibold rounded-xl px-3 py-2 focus:ring-1 focus:ring-blue-500"
          >
            <option value="ALL">All Batches</option>
            {batches.map((b) => (
              <option key={b.id} value={b.id}>
                {b.name}
              </option>
            ))}
          </select>
        </div>

        <span className="text-xs text-slate-500 font-mono">
          Showing {filteredStudents.length} of {students.length} students
        </span>
      </div>

      {/* Students Master Table */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50 text-slate-500 uppercase tracking-wider font-bold">
                <th className="p-3.5 pl-6">Student & ID</th>
                <th className="p-3.5">Course & Batch</th>
                <th className="p-3.5">Contact Details</th>
                <th className="p-3.5">Fee Status</th>
                <th className="p-3.5">Admission Status</th>
                <th className="p-3.5 pr-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filteredStudents.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-slate-400">
                    No student records match the search filter.
                  </td>
                </tr>
              ) : (
                filteredStudents.map((s) => {
                  const course = courses.find((c) => c.id === s.courseId);
                  const batch = batches.find((b) => b.id === s.batchId);
                  const fee = fees.find((f) => f.studentId === s.id);

                  return (
                    <tr key={s.id} className="hover:bg-slate-50 transition-colors">
                      <td className="p-3.5 pl-6">
                        <div className="font-bold text-slate-900 text-sm">{s.name}</div>
                        <div className="text-[10px] text-blue-600 font-mono font-semibold">
                          {s.admissionId}
                        </div>
                      </td>

                      <td className="p-3.5">
                        <span className="font-semibold text-slate-900 block truncate max-w-xs">
                          {course?.name}
                        </span>
                        <span className="text-[10px] text-purple-600 font-medium">
                          {batch?.name} ({batch?.timing})
                        </span>
                      </td>

                      <td className="p-3.5">
                        <div className="font-mono text-slate-800">{s.mobile}</div>
                        <div className="text-[10px] text-slate-400 truncate max-w-xs">{s.email}</div>
                      </td>

                      <td className="p-3.5">
                        {fee ? (
                          <div>
                            <span className="font-bold text-slate-900 block">
                              {fee.dueAmount === 0 ? 'Fully Paid' : formatINR(fee.dueAmount) + ' Due'}
                            </span>
                            <span
                              className={`text-[9px] font-bold px-1.5 py-0.2 rounded uppercase ${
                                fee.status === 'PAID'
                                  ? 'bg-emerald-100 text-emerald-800'
                                  : 'bg-amber-100 text-amber-800'
                              }`}
                            >
                              {fee.status}
                            </span>
                          </div>
                        ) : (
                          <span className="text-slate-400">N/A</span>
                        )}
                      </td>

                      <td className="p-3.5">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                          {s.status}
                        </span>
                      </td>

                      <td className="p-3.5 pr-6 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => setViewingStudent(s)}
                            className="p-1.5 hover:bg-slate-100 text-slate-600 rounded-lg transition-colors"
                            title="View Dossier"
                          >
                            <Eye className="w-4 h-4" />
                          </button>

                          <button
                            onClick={() => handleOpenEdit(s)}
                            className="p-1.5 hover:bg-blue-50 text-blue-600 rounded-lg transition-colors"
                            title="Edit Student"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>

                          <button
                            onClick={() => setDeletingStudentId(s.id)}
                            className="p-1.5 hover:bg-rose-50 text-rose-600 rounded-lg transition-colors"
                            title="Deactivate Student"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Student Modal */}
      {addModalOpen && (
        <Modal
          isOpen={addModalOpen}
          onClose={() => setAddModalOpen(false)}
          title={editingStudent ? 'Edit Student Record' : 'Enroll New Student'}
          subtitle="Generate admission ID and initial course ledger"
          maxWidth="xl"
        >
          <form onSubmit={handleCreateSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Student Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Aryan Deshmukh"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-semibold text-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Admission ID *
                </label>
                <input
                  type="text"
                  required
                  value={formData.admissionId}
                  onChange={(e) => setFormData({ ...formData, admissionId: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono font-bold text-blue-600"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="student@gmail.com"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Mobile Number *
                </label>
                <input
                  type="tel"
                  required
                  value={formData.mobile}
                  onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                  placeholder="9876543210"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Assigned Course
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

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Assigned Batch
                </label>
                <select
                  value={formData.batchId}
                  onChange={(e) => setFormData({ ...formData, batchId: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900"
                >
                  {batches.map((b) => (
                    <option key={b.id} value={b.id}>
                      {b.name} ({b.timing})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Parent / Guardian Name
                </label>
                <input
                  type="text"
                  value={formData.parentName}
                  onChange={(e) => setFormData({ ...formData, parentName: e.target.value })}
                  placeholder="e.g. Sanjay Deshmukh"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Parent Mobile (for SMS roll call)
                </label>
                <input
                  type="tel"
                  value={formData.parentMobile}
                  onChange={(e) => setFormData({ ...formData, parentMobile: e.target.value })}
                  placeholder="9876543288"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Residential Address (Nagpur)
                </label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900"
                />
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex justify-end gap-2">
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
                {editingStudent ? 'Update Student Record' : 'Enroll Student'}
              </button>
            </div>
          </form>
        </Modal>
      )}

      {/* View Dossier Modal */}
      {viewingStudent && (
        <Modal
          isOpen={!!viewingStudent}
          onClose={() => setViewingStudent(null)}
          title={`Student Dossier: ${viewingStudent.name}`}
          subtitle={`Admission ID: ${viewingStudent.admissionId}`}
          maxWidth="lg"
        >
          <div className="space-y-4 text-xs text-slate-700">
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl grid grid-cols-2 gap-3">
              <div>
                <span className="text-slate-400 block font-semibold">Contact Mobile</span>
                <strong className="text-slate-900">{viewingStudent.mobile}</strong>
              </div>
              <div>
                <span className="text-slate-400 block font-semibold">Email</span>
                <strong className="text-slate-900">{viewingStudent.email}</strong>
              </div>
              <div>
                <span className="text-slate-400 block font-semibold">Parent / Guardian</span>
                <strong className="text-slate-900">{viewingStudent.parentName} ({viewingStudent.parentMobile})</strong>
              </div>
              <div>
                <span className="text-slate-400 block font-semibold">Date of Joining</span>
                <strong className="text-slate-900">{viewingStudent.dateOfJoining}</strong>
              </div>
              <div className="col-span-2">
                <span className="text-slate-400 block font-semibold">Address</span>
                <span>{viewingStudent.address}</span>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setViewingStudent(null)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-xl"
              >
                Close
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* Delete Confirmation */}
      {deletingStudentId && (
        <ConfirmDialog
          isOpen={!!deletingStudentId}
          onClose={() => setDeletingStudentId(null)}
          onConfirm={() => {
            if (deletingStudentId) deleteStudent(deletingStudentId);
          }}
          title="Deactivate Student Account"
          message="Are you sure you want to deactivate this student? Their past test results and payment history will be retained in audit archives."
          confirmLabel="Deactivate Account"
        />
      )}
    </div>
  );
};
