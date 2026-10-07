import React from 'react';
import { useApp } from '../../context/AppContext';
import { GraduationCap, Award, BookOpen, Clock, Sparkles } from 'lucide-react';

export const FacultySection: React.FC = () => {
  const { teachers, instituteInfo } = useApp();

  return (
    <section id="faculty" className="py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-100 text-purple-700 text-xs font-bold uppercase tracking-wider">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Master Educators</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Learn From Central India’s Most Celebrated Mentors
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            {instituteInfo.facultyCount} with an average teaching tenure exceeding a decade, bringing true pedagogical mastery and empathy to every lecture.
          </p>
        </div>

        {/* Faculty Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teachers.map((faculty) => (
            <div
              key={faculty.id}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 group hover:-translate-y-1 flex flex-col justify-between"
            >
              <div>
                {/* Photo banner */}
                <div className="relative h-56 bg-slate-800 overflow-hidden">
                  <img
                    src={
                      faculty.name.includes('Priya')
                        ? 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80'
                        : faculty.name.includes('Vikram')
                        ? 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80'
                        : 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&q=80'
                    }
                    alt={faculty.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-95"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />

                  {/* Subject badge floating */}
                  <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between">
                    <span className="text-xs font-bold text-white bg-blue-600/90 backdrop-blur-md px-3 py-1 rounded-lg border border-blue-400/30">
                      {faculty.subjects.join(' & ')}
                    </span>
                    <span className="text-[11px] font-semibold text-emerald-300 bg-emerald-950/80 backdrop-blur-md px-2.5 py-0.5 rounded-full border border-emerald-700/50 flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {faculty.experienceYears}+ Years Exp
                    </span>
                  </div>
                </div>

                {/* Faculty Details */}
                <div className="p-6 space-y-3">
                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                    {faculty.name}
                  </h3>

                  <p className="text-xs font-semibold text-indigo-600 leading-snug">
                    {faculty.qualification}
                  </p>

                  <div className="pt-2 border-t border-slate-100">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                      Key Specialization
                    </span>
                    <p className="text-xs font-medium text-slate-700 leading-relaxed">
                      {faculty.specialization}
                    </p>
                  </div>

                  <p className="text-xs text-slate-500 leading-relaxed font-normal pt-1">
                    {faculty.bio}
                  </p>
                </div>
              </div>

              {/* Bottom footer tag */}
              <div className="p-6 pt-0">
                <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between text-xs text-slate-600">
                  <span className="flex items-center gap-1 text-[11px] font-semibold text-slate-700">
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                    Batches Mentored
                  </span>
                  <span className="font-mono font-bold text-blue-600">{faculty.batchIds.length} Active Batches</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
