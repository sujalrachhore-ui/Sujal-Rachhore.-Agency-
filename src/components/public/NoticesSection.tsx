import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Notice } from '../../types';
import { Bell, Calendar, Tag, ArrowRight, AlertCircle, FileText } from 'lucide-react';
import { Modal } from '../common/Modal';

export const NoticesSection: React.FC = () => {
  const { notices } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [activeNotice, setActiveNotice] = useState<Notice | null>(null);

  const categories = ['ALL', 'EXAM', 'ANNOUNCEMENT', 'SCHEDULE', 'HOLIDAY'];

  const filteredNotices = notices.filter(
    (n) => selectedCategory === 'ALL' || n.category === selectedCategory
  );

  return (
    <section id="notices" className="py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-bold uppercase tracking-wider">
            <Bell className="w-3.5 h-3.5" />
            <span>Campus Bulletin</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Latest Circulars & Examination Notices
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Real-time updates regarding upcoming NTA mock schedules, PTM reviews, holiday announcements, and academic clinics.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex items-center justify-center gap-2 flex-wrap mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                selectedCategory === cat
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {cat === 'ALL' ? 'All Notices' : cat}
            </button>
          ))}
        </div>

        {/* Notice Cards List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredNotices.map((notice) => {
            const isHighPriority = notice.priority === 'HIGH';
            return (
              <div
                key={notice.id}
                onClick={() => setActiveNotice(notice)}
                className={`p-5 rounded-2xl bg-white border cursor-pointer hover:shadow-md transition-all duration-200 flex flex-col justify-between group hover:border-blue-400 ${
                  isHighPriority ? 'border-amber-300 bg-amber-50/20' : 'border-slate-200'
                }`}
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between text-xs">
                    <span
                      className={`px-2.5 py-0.5 rounded-full font-bold uppercase text-[10px] tracking-wider ${
                        notice.category === 'EXAM'
                          ? 'bg-rose-100 text-rose-800'
                          : notice.category === 'ANNOUNCEMENT'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-emerald-100 text-emerald-800'
                      }`}
                    >
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
                  <span className="text-slate-400 text-[11px]">
                    By {notice.publishedByName}
                  </span>
                  <span className="font-semibold text-blue-600 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    <span>Read circular</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Notice Detail Modal */}
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
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase bg-slate-100 text-slate-700">
                Audience: {activeNotice.targetRole}
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
                    <div className="text-[10px] text-slate-500">Official Circular Circular PDF Attachment</div>
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
    </section>
  );
};
