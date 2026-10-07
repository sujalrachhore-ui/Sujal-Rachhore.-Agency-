import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Notice } from '../../types';
import { Bell, Calendar, Tag, FileText, AlertCircle, ArrowRight } from 'lucide-react';
import { Modal } from '../common/Modal';

export const StudentNotices: React.FC = () => {
  const { notices, currentStudentProfile } = useApp();
  const student = currentStudentProfile;
  const [activeNotice, setActiveNotice] = useState<Notice | null>(null);

  // Student sees targetRole == 'ALL' or 'STUDENT', and batchId matches or is unset
  const studentNotices = notices.filter(
    (n) =>
      (n.targetRole === 'ALL' || n.targetRole === 'STUDENT') &&
      (!n.batchId || n.batchId === student?.batchId)
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">Official Notices & Circulars</h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Exam declarations, PTM alerts, and batch announcements for your academic cohort.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {studentNotices.map((notice) => (
          <div
            key={notice.id}
            onClick={() => setActiveNotice(notice)}
            className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-blue-400 shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group"
          >
            <div className="space-y-2.5">
              <div className="flex items-center justify-between text-xs">
                <span className="px-2.5 py-0.5 rounded-full font-bold uppercase text-[10px] bg-blue-100 text-blue-800">
                  {notice.category}
                </span>
                <span className="flex items-center gap-1 text-slate-400 font-medium">
                  <Calendar className="w-3.5 h-3.5" />
                  {notice.date}
                </span>
              </div>

              <h3 className="font-bold text-slate-900 text-base leading-snug group-hover:text-blue-600 transition-colors">
                {notice.title}
              </h3>

              <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                {notice.content}
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-slate-400 text-[11px]">By {notice.publishedByName}</span>
              <span className="font-semibold text-blue-600 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                <span>View circular</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>
        ))}
      </div>

      {activeNotice && (
        <Modal
          isOpen={!!activeNotice}
          onClose={() => setActiveNotice(null)}
          title={activeNotice.title}
          subtitle={`Published on ${activeNotice.date} by ${activeNotice.publishedByName}`}
          maxWidth="lg"
        >
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase bg-blue-100 text-blue-800">
                {activeNotice.category}
              </span>
              {activeNotice.priority === 'HIGH' && (
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase bg-amber-100 text-amber-800 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> High Priority
                </span>
              )}
            </div>

            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-sm leading-relaxed whitespace-pre-line">
              {activeNotice.content}
            </div>

            {activeNotice.attachmentName && (
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-blue-600" />
                  <div>
                    <div className="text-xs font-bold text-slate-900">{activeNotice.attachmentName}</div>
                    <div className="text-[10px] text-slate-500">Official Document Attachment</div>
                  </div>
                </div>
                <a
                  href="https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold"
                >
                  Download PDF
                </a>
              </div>
            )}
          </div>
        </Modal>
      )}
    </div>
  );
};
