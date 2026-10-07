import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { StudyMaterial } from '../../types';
import { FileText, Plus, Trash2, Download, Video, Layers, Upload, Save, Sparkles } from 'lucide-react';
import { Modal } from '../common/Modal';

export const TeacherMaterials: React.FC = () => {
  const { studyMaterials, uploadStudyMaterial, deleteStudyMaterial, currentTeacherProfile, courses, batches } = useApp();
  const teacher = currentTeacherProfile;

  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    courseId: courses[0]?.id || 'course-jee',
    batchId: batches[0]?.id || '',
    subject: teacher?.subjects[0] || 'Physics',
    type: 'PDF' as StudyMaterial['type'],
    fileUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    fileSize: '3.5 MB',
  });

  const teacherMaterials = studyMaterials.filter(
    (m) => m.uploadedBy === teacher?.id || m.uploadedByName === teacher?.name
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.description) return;

    uploadStudyMaterial({
      title: formData.title,
      description: formData.description,
      courseId: formData.courseId,
      batchId: formData.batchId || undefined,
      subject: formData.subject,
      type: formData.type,
      fileUrl: formData.fileUrl,
      fileSize: formData.type === 'VIDEO' ? '45 Mins' : formData.fileSize,
      uploadedBy: teacher?.id || 'teacher-1',
      uploadedByName: teacher?.name || 'Prof. Priya Sharma',
    });

    setUploadModalOpen(false);
    setFormData({
      title: '',
      description: '',
      courseId: courses[0]?.id || 'course-jee',
      batchId: batches[0]?.id || '',
      subject: teacher?.subjects[0] || 'Physics',
      type: 'PDF',
      fileUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
      fileSize: '3.5 MB',
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">Study Material & Notes Management</h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Publish lecture hand-outs, formula sheets, solved PYQs, and video links to your assigned student batches.
          </p>
        </div>

        <button
          onClick={() => setUploadModalOpen(true)}
          className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-xs rounded-xl shadow-md flex items-center gap-2 transition-all self-start sm:self-auto"
        >
          <Upload className="w-4 h-4" />
          <span>Upload Study Material</span>
        </button>
      </div>

      {/* Materials List Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {teacherMaterials.map((item) => (
          <div
            key={item.id}
            className="p-6 bg-white rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded border border-blue-200">
                  {item.subject}
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                  {item.type}
                </span>
              </div>

              <h3 className="font-bold text-slate-900 text-base leading-snug">{item.title}</h3>
              <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed">{item.description}</p>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                <span>Downloads: {item.downloadCount}</span>
                <span>{item.fileSize || 'PDF'}</span>
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
              <a
                href={item.fileUrl}
                target="_blank"
                rel="noreferrer"
                className="text-xs font-semibold text-blue-600 hover:underline flex items-center gap-1"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Open File</span>
              </a>

              <button
                onClick={() => deleteStudyMaterial(item.id)}
                className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg transition-colors"
                title="Remove file"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Upload Modal */}
      {uploadModalOpen && (
        <Modal
          isOpen={uploadModalOpen}
          onClose={() => setUploadModalOpen(false)}
          title="Upload Study Material / Video Lecture"
          subtitle="Distribute learning documents to enrolled students"
          maxWidth="lg"
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Material Title *
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g. Electromagnetic Induction Formula Blueprint & DPP"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-semibold text-slate-900"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Subject *
                </label>
                <select
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900"
                >
                  <option>Physics</option>
                  <option>Chemistry</option>
                  <option>Mathematics</option>
                  <option>Biology</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Format Type
                </label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value as StudyMaterial['type'] })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900"
                >
                  <option value="PDF">PDF Document / Notes</option>
                  <option value="VIDEO">Video Lecture URL</option>
                  <option value="PYQ">Past Year Paper (PYQ)</option>
                  <option value="NOTES">Handwritten Notes</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Target Course
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
                  Batch Target (Optional)
                </label>
                <select
                  value={formData.batchId}
                  onChange={(e) => setFormData({ ...formData, batchId: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900"
                >
                  <option value="">All Batches in Course</option>
                  {batches.map((b) => (
                    <option key={b.id} value={b.id}>
                      {b.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Resource Link or Mock File URL
              </label>
              <input
                type="url"
                required
                value={formData.fileUrl}
                onChange={(e) => setFormData({ ...formData, fileUrl: e.target.value })}
                placeholder="https://..."
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono text-slate-900"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Brief Description & Study Directives *
              </label>
              <textarea
                rows={3}
                required
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Include key theorems, pages to solve, or homework instructions..."
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900"
              />
            </div>

            <div className="pt-2 flex justify-end gap-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setUploadModalOpen(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-xs flex items-center gap-1.5"
              >
                <Save className="w-4 h-4" />
                <span>Publish to Student Portal</span>
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};
