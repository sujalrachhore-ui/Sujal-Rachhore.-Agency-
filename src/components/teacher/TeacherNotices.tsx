import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Notice } from '../../types';
import { Bell, Plus, Calendar, Tag, Trash2, Send } from 'lucide-react';
import { Modal } from '../common/Modal';

export const TeacherNotices: React.FC = () => {
  const { notices, createNotice, deleteNotice, currentTeacherProfile, batches } = useApp();
  const teacher = currentTeacherProfile;

  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: 'SCHEDULE' as Notice['category'],
    priority: 'MEDIUM' as Notice['priority'],
    batchId: batches[0]?.id || '',
  });

  const teacherNotices = notices.filter(
    (n) => n.publishedBy === teacher?.id || n.publishedByName === teacher?.name
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.content) return;

    createNotice({
      title: formData.title,
      content: formData.content,
      category: formData.category,
      priority: formData.priority,
      targetRole: 'STUDENT',
      batchId: formData.batchId || undefined,
      publishedBy: teacher?.id || 'teacher-1',
      publishedByName: teacher?.name || 'Prof. Priya Sharma',
    });

    setCreateModalOpen(false);
    setFormData({
      title: '',
      content: '',
      category: 'SCHEDULE',
      priority: 'MEDIUM',
      batchId: batches[0]?.id || '',
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">Class & Batch Notices</h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Publish circulars regarding extra doubt clinics, homework assignments, and mock test dates.
          </p>
        </div>

        <button
          onClick={() => setCreateModalOpen(true)}
          className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-xs rounded-xl shadow-md flex items-center gap-2 transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Publish Batch Notice</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {teacherNotices.map((n) => (
          <div
            key={n.id}
            className="p-5 bg-white rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="px-2.5 py-0.5 rounded-full font-bold uppercase text-[10px] bg-purple-100 text-purple-800">
                  {n.category}
                </span>
                <span className="text-slate-400 font-mono text-[11px]">{n.date}</span>
              </div>

              <h4 className="font-bold text-slate-900 text-base">{n.title}</h4>
              <p className="text-xs text-slate-600 leading-relaxed whitespace-pre-line">{n.content}</p>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[11px] text-slate-400">Target: Enrolled Batch</span>
              <button
                onClick={() => deleteNotice(n.id)}
                className="text-slate-400 hover:text-rose-600 p-1 rounded transition-colors"
                title="Delete Notice"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {createModalOpen && (
        <Modal
          isOpen={createModalOpen}
          onClose={() => setCreateModalOpen(false)}
          title="Publish Batch Circular"
          subtitle="Alert enrolled students on their dashboard notification feed"
          maxWidth="md"
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Notice Title *
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g. Extra Sunday Doubt Clearance Session"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-semibold text-slate-900"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Category
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value as Notice['category'] })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900"
                >
                  <option value="SCHEDULE">Class Schedule</option>
                  <option value="EXAM">Exam / Test Announcement</option>
                  <option value="ANNOUNCEMENT">General Announcement</option>
                  <option value="HOLIDAY">Holiday</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Target Batch
                </label>
                <select
                  value={formData.batchId}
                  onChange={(e) => setFormData({ ...formData, batchId: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900"
                >
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
                Notice Content *
              </label>
              <textarea
                rows={4}
                required
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                placeholder="Write circular description, classroom instructions, materials to bring..."
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900"
              />
            </div>

            <div className="pt-2 flex justify-end gap-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setCreateModalOpen(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-xs flex items-center gap-1.5"
              >
                <Send className="w-4 h-4" />
                <span>Broadcast to Students</span>
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};
