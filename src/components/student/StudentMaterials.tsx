import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { StudyMaterial } from '../../types';
import {
  FileText,
  Search,
  Download,
  ExternalLink,
  Video,
  FileCheck,
  Layers,
  Sparkles,
  Calendar,
  X,
  Eye,
} from 'lucide-react';
import { Modal } from '../common/Modal';

export const StudentMaterials: React.FC = () => {
  const { studyMaterials, currentStudentProfile, addToast } = useApp();
  const [selectedSubject, setSelectedSubject] = useState('ALL');
  const [selectedType, setSelectedType] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewingMaterial, setViewingMaterial] = useState<StudyMaterial | null>(null);

  const subjects = ['ALL', 'Physics', 'Chemistry', 'Mathematics', 'Biology'];
  const types = ['ALL', 'PDF', 'VIDEO', 'PYQ', 'NOTES'];

  const filtered = studyMaterials.filter((m) => {
    const matchSub = selectedSubject === 'ALL' || m.subject.toLowerCase() === selectedSubject.toLowerCase();
    const matchType = selectedType === 'ALL' || m.type === selectedType;
    const matchSearch =
      m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchSub && matchType && matchSearch;
  });

  const handleDownload = (item: StudyMaterial) => {
    addToast(`Downloading "${item.title}" (${item.fileSize || 'PDF Document'})...`, 'info');
    // Open dummy or standard sample pdf
    window.open(item.fileUrl, '_blank');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">Study Material & Digital Repository</h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Handwritten class notes, formula maps, solved PYQs, and video seminars curated by faculty.
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mr-1 hidden sm:inline">
            Subject:
          </span>
          {subjects.map((sub) => (
            <button
              key={sub}
              onClick={() => setSelectedSubject(sub)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                selectedSubject === sub
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {sub === 'ALL' ? 'All Subjects' : sub}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          {/* Format Type */}
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="bg-slate-50 border border-slate-200 text-slate-800 text-xs font-medium rounded-xl px-3 py-2 focus:ring-1 focus:ring-blue-500"
          >
            {types.map((t) => (
              <option key={t} value={t}>
                {t === 'ALL' ? 'All Formats' : t}
              </option>
            ))}
          </select>

          {/* Search */}
          <div className="relative flex-1 sm:w-64">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search notes, chapters, formulas..."
              className="w-full pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-1 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Materials Cards List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((item) => {
          const isVideo = item.type === 'VIDEO';
          return (
            <div
              key={item.id}
              className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span
                    className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider ${
                      isVideo
                        ? 'bg-rose-100 text-rose-800'
                        : item.type === 'PYQ'
                        ? 'bg-purple-100 text-purple-800'
                        : 'bg-blue-100 text-blue-800'
                    }`}
                  >
                    {item.type}
                  </span>
                  <span className="text-xs font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                    {item.subject}
                  </span>
                </div>

                <h3 className="font-bold text-slate-900 text-base leading-snug group-hover:text-blue-600 transition-colors">
                  {item.title}
                </h3>

                <p className="text-xs text-slate-500 leading-relaxed line-clamp-3">
                  {item.description}
                </p>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                  <span>By {item.uploadedByName}</span>
                  {item.fileSize && <span>{item.fileSize}</span>}
                </div>
              </div>

              <div className="mt-6 pt-3 border-t border-slate-100 grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setViewingMaterial(item)}
                  className="py-2 px-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-xl transition-colors flex items-center justify-center gap-1.5"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Preview</span>
                </button>

                {isVideo ? (
                  <a
                    href={item.fileUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="py-2 px-3 bg-rose-600 hover:bg-rose-700 text-white font-semibold text-xs rounded-xl shadow-xs transition-colors flex items-center justify-center gap-1.5"
                  >
                    <Video className="w-3.5 h-3.5" />
                    <span>Watch Video</span>
                  </a>
                ) : (
                  <button
                    type="button"
                    onClick={() => handleDownload(item)}
                    className="py-2 px-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs rounded-xl shadow-xs transition-colors flex items-center justify-center gap-1.5"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download</span>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* PDF / Document Viewer Modal */}
      {viewingMaterial && (
        <Modal
          isOpen={!!viewingMaterial}
          onClose={() => setViewingMaterial(null)}
          title={viewingMaterial.title}
          subtitle={`Uploaded by ${viewingMaterial.uploadedByName} • Subject: ${viewingMaterial.subject}`}
          maxWidth="2xl"
        >
          <div className="space-y-4">
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-700 leading-relaxed">
              <strong className="block font-bold text-slate-900 mb-1">Curator Summary:</strong>
              {viewingMaterial.description}
            </div>

            {/* Embedded PDF Viewer preview simulation */}
            <div className="border border-slate-200 rounded-xl overflow-hidden bg-slate-900 h-96 flex flex-col items-center justify-center text-white p-6 text-center space-y-3">
              <FileText className="w-12 h-12 text-blue-400 mx-auto" />
              <div className="text-sm font-bold">{viewingMaterial.title}</div>
              <p className="text-xs text-slate-400 max-w-sm">
                Full high-resolution vector PDF is ready for offline reading and local annotation.
              </p>
              <div className="flex gap-2 pt-2">
                <button
                  onClick={() => handleDownload(viewingMaterial)}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-sm flex items-center gap-1.5"
                >
                  <Download className="w-4 h-4" />
                  <span>Download File ({viewingMaterial.fileSize || 'PDF'})</span>
                </button>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
