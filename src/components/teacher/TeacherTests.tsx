import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { OnlineTest, Question } from '../../types';
import { Plus, Clock, FileCheck2, Trash2, Edit3, CheckCircle2, AlertCircle, Save, Sparkles } from 'lucide-react';
import { Modal } from '../common/Modal';

export const TeacherTests: React.FC = () => {
  const { tests, createTest, deleteTest, currentTeacherProfile, courses, batches, addToast } = useApp();
  const teacher = currentTeacherProfile;

  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    courseId: courses[0]?.id || 'course-jee',
    batchId: batches[0]?.id || 'batch-jee-alpha',
    subject: 'Physics',
    durationMinutes: 45,
    passingMarks: 20,
    negativeMarking: true,
  });

  const [questions, setQuestions] = useState<Question[]>([
    {
      id: 'q-new-1',
      text: 'What is the SI unit of magnetic flux density?',
      options: ['Tesla (T)', 'Weber (Wb)', 'Henry (H)', 'Gauss (G)'],
      correctOptionIndex: 0,
      explanation: 'Magnetic flux density B is measured in Tesla (T), where 1 T = 1 Wb/m².',
      marks: 10,
      negativeMarks: 2,
      subject: 'Physics',
    },
    {
      id: 'q-new-2',
      text: 'Which law describes the induced electromotive force proportional to rate of change of magnetic flux?',
      options: ['Faraday Law', 'Ampere Circuital Law', 'Lenz Law', 'Coulomb Law'],
      correctOptionIndex: 0,
      explanation: 'Faraday’s Law of Electromagnetic Induction states EMF = -dΦ/dt.',
      marks: 10,
      negativeMarks: 2,
      subject: 'Physics',
    },
  ]);

  const handleAddEmptyQuestion = () => {
    const newQ: Question = {
      id: 'q-custom-' + Date.now(),
      text: 'Sample new question question prompt...',
      options: ['Option A', 'Option B', 'Option C', 'Option D'],
      correctOptionIndex: 0,
      explanation: 'Explanation rationale...',
      marks: 10,
      negativeMarks: 2,
      subject: formData.subject,
    };
    setQuestions((prev) => [...prev, newQ]);
  };

  const handleQuestionChange = (idx: number, updates: Partial<Question>) => {
    setQuestions((prev) =>
      prev.map((q, i) => (i === idx ? { ...q, ...updates } : q))
    );
  };

  const handleOptionTextChange = (qIdx: number, optIdx: number, val: string) => {
    setQuestions((prev) =>
      prev.map((q, i) => {
        if (i === qIdx) {
          const newOpts = [...q.options];
          newOpts[optIdx] = val;
          return { ...q, options: newOpts };
        }
        return q;
      })
    );
  };

  const handleSaveTest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || questions.length === 0) {
      addToast('Please enter test title and at least one question', 'error');
      return;
    }

    const totalMarks = questions.reduce((sum, q) => sum + q.marks, 0);

    createTest({
      title: formData.title,
      courseId: formData.courseId,
      batchId: formData.batchId,
      subject: formData.subject,
      durationMinutes: Number(formData.durationMinutes),
      totalMarks,
      passingMarks: Number(formData.passingMarks),
      negativeMarking: formData.negativeMarking,
      questions,
      status: 'PUBLISHED',
      createdBy: teacher?.id || 'teacher-1',
      createdByName: teacher?.name || 'Prof. Priya Sharma',
      dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
    });

    setCreateModalOpen(false);
    setFormData({
      title: '',
      courseId: courses[0]?.id || 'course-jee',
      batchId: batches[0]?.id || 'batch-jee-alpha',
      subject: 'Physics',
      durationMinutes: 45,
      passingMarks: 20,
      negativeMarking: true,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">Test Bank & Assessment Architecture</h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Publish computer-based mock exams with customizable MCQ options, timer, and negative marks.
          </p>
        </div>

        <button
          onClick={() => setCreateModalOpen(true)}
          className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-xs rounded-xl shadow-md flex items-center gap-2 transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Create New Assessment</span>
        </button>
      </div>

      {/* Existing Tests Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tests.map((test) => (
          <div
            key={test.id}
            className="p-6 bg-white rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-purple-700 bg-purple-50 px-2.5 py-0.5 rounded border border-purple-200">
                  {test.subject}
                </span>
                <span className="text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  {test.status}
                </span>
              </div>

              <h3 className="font-bold text-slate-900 text-base leading-snug">{test.title}</h3>

              <div className="grid grid-cols-2 gap-2 text-xs text-slate-600 pt-2 border-t border-slate-100">
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span>{test.durationMinutes} Mins</span>
                </div>
                <div>
                  <span className="font-semibold text-slate-900">{test.questions.length}</span> Questions
                </div>
                <div>
                  <span className="font-semibold text-slate-900">{test.totalMarks}</span> Total Marks
                </div>
                <div>
                  {test.negativeMarking ? (
                    <span className="text-rose-500 font-semibold">Negative Marking</span>
                  ) : (
                    <span className="text-slate-400">No Negative</span>
                  )}
                </div>
              </div>

              <div className="text-[11px] text-slate-400 pt-2 border-t border-slate-100 flex items-center justify-between">
                <span>By {test.createdByName}</span>
                <span>Due: {test.dueDate.split('T')[0]}</span>
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs text-slate-500 font-medium">CBT Engine Live</span>
              <button
                onClick={() => deleteTest(test.id)}
                className="text-slate-400 hover:text-rose-600 p-1.5 rounded-lg transition-colors"
                title="Archive / Delete Test"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Create Test Modal */}
      {createModalOpen && (
        <Modal
          isOpen={createModalOpen}
          onClose={() => setCreateModalOpen(false)}
          title="Create Computer-Based Test (CBT)"
          subtitle="Configure duration, passing thresholds, and question pool"
          maxWidth="2xl"
        >
          <form onSubmit={handleSaveTest} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Assessment Title *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. JEE Advanced Mock Test #05: Electrodynamics & Optics"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-semibold text-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Subject *
                </label>
                <select
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-semibold text-slate-900"
                >
                  <option>Physics</option>
                  <option>Chemistry</option>
                  <option>Mathematics</option>
                  <option>Biology</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Target Course
                </label>
                <select
                  value={formData.courseId}
                  onChange={(e) => setFormData({ ...formData, courseId: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-semibold text-slate-900"
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
                  Duration (Minutes)
                </label>
                <input
                  type="number"
                  required
                  min="5"
                  max="180"
                  value={formData.durationMinutes}
                  onChange={(e) => setFormData({ ...formData, durationMinutes: Number(e.target.value) })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Passing Marks
                </label>
                <input
                  type="number"
                  required
                  value={formData.passingMarks}
                  onChange={(e) => setFormData({ ...formData, passingMarks: Number(e.target.value) })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900"
                />
              </div>
            </div>

            <div className="flex items-center gap-2 p-3 bg-slate-50 border border-slate-200 rounded-xl">
              <input
                type="checkbox"
                id="negMark"
                checked={formData.negativeMarking}
                onChange={(e) => setFormData({ ...formData, negativeMarking: e.target.checked })}
                className="w-4 h-4 text-blue-600 rounded"
              />
              <label htmlFor="negMark" className="text-xs font-semibold text-slate-800 cursor-pointer">
                Enforce Negative Marking (-2 marks per incorrect MCQ attempt)
              </label>
            </div>

            {/* Questions Builder */}
            <div className="space-y-4 pt-2 border-t border-slate-100">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-slate-900 text-sm">
                  Questions Pool ({questions.length} Items)
                </h4>
                <button
                  type="button"
                  onClick={handleAddEmptyQuestion}
                  className="px-3 py-1.5 bg-blue-50 text-blue-700 hover:bg-blue-100 rounded-lg text-xs font-bold transition-colors flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add MCQ Question</span>
                </button>
              </div>

              <div className="max-h-72 overflow-y-auto space-y-4 pr-1">
                {questions.map((q, qIdx) => (
                  <div key={q.id} className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs text-blue-600 font-mono">
                        Question #{qIdx + 1}
                      </span>
                      {questions.length > 1 && (
                        <button
                          type="button"
                          onClick={() => setQuestions((prev) => prev.filter((_, i) => i !== qIdx))}
                          className="text-rose-500 hover:text-rose-700 text-xs font-semibold"
                        >
                          Remove
                        </button>
                      )}
                    </div>

                    <textarea
                      rows={2}
                      value={q.text}
                      onChange={(e) => handleQuestionChange(qIdx, { text: e.target.value })}
                      placeholder="Type question stem..."
                      className="w-full p-2 bg-white border border-slate-200 rounded-lg text-xs"
                    />

                    {/* Options */}
                    <div className="space-y-1.5">
                      <span className="text-[10px] font-bold text-slate-400 uppercase">
                        Select Correct Answer Radio:
                      </span>
                      {q.options.map((opt, optIdx) => (
                        <div key={optIdx} className="flex items-center gap-2">
                          <input
                            type="radio"
                            name={`correct-${q.id}`}
                            checked={q.correctOptionIndex === optIdx}
                            onChange={() => handleQuestionChange(qIdx, { correctOptionIndex: optIdx })}
                            className="w-4 h-4 text-emerald-600"
                          />
                          <input
                            type="text"
                            value={opt}
                            onChange={(e) => handleOptionTextChange(qIdx, optIdx, e.target.value)}
                            className="flex-1 px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-xs"
                          />
                        </div>
                      ))}
                    </div>

                    <input
                      type="text"
                      value={q.explanation || ''}
                      onChange={(e) => handleQuestionChange(qIdx, { explanation: e.target.value })}
                      placeholder="Derivation or solution explanation..."
                      className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-xs text-slate-600"
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-slate-200 flex justify-end gap-2">
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
                <Save className="w-4 h-4" />
                <span>Publish Assessment to Batches</span>
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};
