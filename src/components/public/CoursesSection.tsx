import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Course } from '../../types';
import { formatINR } from '../../utils/helpers';
import {
  BookOpen,
  Clock,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Layers,
  GraduationCap,
} from 'lucide-react';
import { Modal } from '../common/Modal';

interface CoursesSectionProps {
  onOpenEnquiry: (courseName?: string) => void;
}

export const CoursesSection: React.FC<CoursesSectionProps> = ({ onOpenEnquiry }) => {
  const { courses } = useApp();
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  return (
    <section id="courses" className="py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-bold uppercase tracking-wider">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Academic Programs</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Targeted Programs for Top Rankers
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Meticulously architected curricula matching the latest NTA and State Board patterns, backed by Central India’s most veteran educator council.
          </p>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <div
              key={course.id}
              className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden group hover:-translate-y-1"
            >
              <div>
                {/* Header ribbon */}
                <div className="p-6 border-b border-slate-100 bg-gradient-to-br from-slate-50 to-white">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-mono font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-200">
                      {course.code}
                    </span>
                    {course.badge && (
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full">
                        <Sparkles className="w-3 h-3 text-amber-500" />
                        {course.badge}
                      </span>
                    )}
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                    {course.name}
                  </h3>

                  <p className="text-xs text-slate-500 mt-2 line-clamp-2 leading-relaxed font-normal">
                    {course.tagline}
                  </p>
                </div>

                {/* Body Details */}
                <div className="p-6 space-y-4">
                  <div className="flex items-center gap-4 text-xs text-slate-600">
                    <div className="flex items-center gap-1.5 font-medium">
                      <Clock className="w-4 h-4 text-blue-500" />
                      <span>{course.duration}</span>
                    </div>
                    <div className="flex items-center gap-1.5 font-medium">
                      <Layers className="w-4 h-4 text-purple-500" />
                      <span>{course.subjects.length} Core Subjects</span>
                    </div>
                  </div>

                  {/* Subjects pill wrap */}
                  <div className="flex flex-wrap gap-1.5">
                    {course.subjects.map((sub) => (
                      <span
                        key={sub}
                        className="text-[11px] font-medium text-slate-700 bg-slate-100 px-2.5 py-1 rounded-md"
                      >
                        {sub}
                      </span>
                    ))}
                  </div>

                  {/* Highlights checklist */}
                  <div className="space-y-2 pt-2 border-t border-slate-100">
                    {course.features.slice(0, 3).map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-slate-600">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                        <span className="leading-snug">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Footer & CTA */}
              <div className="p-6 pt-0 space-y-3">
                <div className="flex items-baseline justify-between pt-3 border-t border-slate-100">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400">Total Program Fee</span>
                    <div className="text-lg font-extrabold text-slate-900">{formatINR(course.totalFees)}</div>
                  </div>
                  <span className="text-[11px] text-emerald-600 font-semibold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    Scholarships Available
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedCourse(course)}
                    className="py-2.5 px-3 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors text-center"
                  >
                    View Curriculum
                  </button>
                  <button
                    type="button"
                    onClick={() => onOpenEnquiry(course.name)}
                    className="py-2.5 px-3 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-xs transition-colors flex items-center justify-center gap-1"
                  >
                    <span>Enquire</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Course Detail Modal */}
      {selectedCourse && (
        <Modal
          isOpen={!!selectedCourse}
          onClose={() => setSelectedCourse(null)}
          title={selectedCourse.name}
          subtitle={`Program Code: ${selectedCourse.code} • Duration: ${selectedCourse.duration}`}
          maxWidth="xl"
        >
          <div className="space-y-4 text-sm text-slate-700">
            <div>
              <h4 className="font-bold text-slate-900 mb-1">Course Overview</h4>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">{selectedCourse.description}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 bg-slate-50 rounded-xl border border-slate-200">
              <div>
                <span className="text-xs uppercase font-bold text-slate-500 block mb-1">Eligibility</span>
                <p className="text-xs font-semibold text-slate-900">{selectedCourse.eligibility}</p>
              </div>
              <div>
                <span className="text-xs uppercase font-bold text-slate-500 block mb-1">Total Course Fee</span>
                <p className="text-base font-extrabold text-blue-600">{formatINR(selectedCourse.totalFees)}</p>
                <span className="text-[10px] text-slate-400">Installments & Merit concession up to 75%</span>
              </div>
            </div>

            <div>
              <h4 className="font-bold text-slate-900 mb-2">Key Pedagogy Highlights</h4>
              <ul className="space-y-2">
                {selectedCourse.features.map((feat, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs text-slate-600">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-slate-900 mb-1.5">Covered Subjects</h4>
              <div className="flex flex-wrap gap-2">
                {selectedCourse.subjects.map((sub) => (
                  <span
                    key={sub}
                    className="px-3 py-1 bg-blue-50 text-blue-700 border border-blue-200 rounded-lg text-xs font-semibold"
                  >
                    {sub}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200 flex justify-end gap-3">
              <button
                onClick={() => setSelectedCourse(null)}
                className="px-4 py-2 text-xs font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl"
              >
                Close
              </button>
              <button
                onClick={() => {
                  const cName = selectedCourse.name;
                  setSelectedCourse(null);
                  onOpenEnquiry(cName);
                }}
                className="px-5 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-sm flex items-center gap-1.5"
              >
                <span>Apply for this Batch</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </Modal>
      )}
    </section>
  );
};
