import React from 'react';
import { Lightbulb, FileSpreadsheet, Timer, UserCheck, ArrowRight } from 'lucide-react';

export const LearningMethodology: React.FC = () => {
  const steps = [
    {
      number: '01',
      title: 'First-Principles Concept Inception',
      desc: 'Moving beyond rote formulas. We deconstruct physics and chemistry laws into experimental intuition and mathematical proof before touching numerical problems.',
      icon: <Lightbulb className="w-6 h-6 text-blue-600" />,
      color: 'border-blue-500 bg-blue-50/50',
    },
    {
      number: '02',
      title: 'Hierarchical DPPs & Rigorous Drill',
      desc: 'Daily Practice Problem sheets categorized into Foundation, Moderate, and High-Order JEE/NEET Advanced challenges to build stepwise problem endurance.',
      icon: <FileSpreadsheet className="w-6 h-6 text-purple-600" />,
      color: 'border-purple-500 bg-purple-50/50',
    },
    {
      number: '03',
      title: 'Computer-Based Diagnostic CBT',
      desc: 'Weekly full-syllabus and partial tests executed in an identical NTA computer terminal layout with exact negative marking and second-by-second time monitoring.',
      icon: <Timer className="w-6 h-6 text-emerald-600" />,
      color: 'border-emerald-500 bg-emerald-50/50',
    },
    {
      number: '04',
      title: 'Post-Exam Micro-Analytics & Mentorship',
      desc: 'Our faculty analyzes student mistake patterns—distinguishing between calculation slips, conceptual gaps, and hasty guesswork to refine exam strategy.',
      icon: <UserCheck className="w-6 h-6 text-amber-600" />,
      color: 'border-amber-500 bg-amber-50/50',
    },
  ];

  return (
    <section className="py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <span className="text-xs uppercase font-bold text-indigo-600 tracking-wider bg-indigo-50 px-3 py-1 rounded-full border border-indigo-200">
            Pedagogical Framework
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            The 4-Step Mentora Mastery Cycle
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            A scientifically validated cycle engineered to elevate average students into top percentile performers over 12 to 24 months.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className={`p-6 rounded-2xl border-2 ${step.color} shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1 relative`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-white shadow-xs flex items-center justify-center border border-slate-100">
                    {step.icon}
                  </div>
                  <span className="text-2xl font-black text-slate-300 font-mono group-hover:text-slate-500 transition-colors">
                    {step.number}
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-900 mb-2 leading-snug">
                  {step.title}
                </h3>

                <p className="text-xs text-slate-600 leading-relaxed font-normal">
                  {step.desc}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-200/60 flex items-center justify-between text-[11px] font-semibold text-slate-500">
                <span>Phase {idx + 1} of 4</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
