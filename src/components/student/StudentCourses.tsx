import React from 'react';
import { useApp } from '../../context/AppContext';
import { BookOpen, Layers, Users, Clock, CheckCircle2, Award, Calendar, FileText } from 'lucide-react';

export const StudentCourses: React.FC = () => {
  const { currentStudentProfile, courses, batches, teachers } = useApp();
  const student = currentStudentProfile;

  const course = courses.find((c) => c.id === student?.courseId) || courses[0];
  const batch = batches.find((b) => b.id === student?.batchId) || batches[0];
  const batchTeachers = teachers.filter((t) => batch.teacherIds.includes(t.userId));

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">My Academic Course & Curriculum</h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Active syllabus progress, subjects, and assigned mentorship council.
          </p>
        </div>
      </div>

      {/* Main Course Banner */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="p-6 sm:p-8 bg-gradient-to-r from-blue-900 to-indigo-950 text-white">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
            <span className="text-xs font-mono font-bold text-blue-300 bg-blue-800/80 px-3 py-1 rounded-lg border border-blue-600">
              {course.code}
            </span>
            <span className="text-xs font-bold text-emerald-400 bg-emerald-950/80 px-3 py-1 rounded-full border border-emerald-800">
              Session 2026-27 Active
            </span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-2">
            {course.name}
          </h3>
          <p className="text-xs sm:text-sm text-blue-200 max-w-2xl leading-relaxed">
            {course.description}
          </p>

          <div className="mt-6 pt-4 border-t border-blue-800/60 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
            <div>
              <span className="text-blue-300 block">Duration</span>
              <strong className="text-white text-sm">{course.duration}</strong>
            </div>
            <div>
              <span className="text-blue-300 block">Classroom Venue</span>
              <strong className="text-white text-sm">{batch.classroom}</strong>
            </div>
            <div>
              <span className="text-blue-300 block">Batch Timing</span>
              <strong className="text-white text-sm">{batch.timing}</strong>
            </div>
            <div>
              <span className="text-blue-300 block">Curriculum Status</span>
              <strong className="text-emerald-400 text-sm">68% Syllabus Covered</strong>
            </div>
          </div>
        </div>

        {/* Subjects & Faculty Table */}
        <div className="p-6 space-y-6">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Curriculum Subjects & Assigned Senior Faculty
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {course.subjects.map((sub, idx) => {
              const faculty = batchTeachers[idx % batchTeachers.length];
              return (
                <div
                  key={sub}
                  className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded border border-blue-200">
                      Subject #{idx + 1}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">4 hrs / week</span>
                  </div>

                  <h5 className="font-bold text-slate-900 text-sm">{sub}</h5>

                  {faculty && (
                    <div className="pt-2 border-t border-slate-200 flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center shrink-0">
                        {faculty.name.slice(0, 2).toUpperCase()}
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs font-bold text-slate-800 truncate">{faculty.name}</div>
                        <div className="text-[10px] text-slate-400 truncate">{faculty.qualification.split(',')[0]}</div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Program Features Checklist */}
          <div className="pt-4 border-t border-slate-100">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
              Included Course Privileges
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {course.features.map((feat, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
