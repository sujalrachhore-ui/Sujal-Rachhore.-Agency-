import React from 'react';
import { useApp } from '../../context/AppContext';
import { Award, Compass, Eye, ShieldCheck, HeartHandshake, CheckCircle2 } from 'lucide-react';

export const AboutSection: React.FC = () => {
  const { instituteInfo } = useApp();

  return (
    <section id="about" className="py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold uppercase tracking-wider">
            <Award className="w-3.5 h-3.5" />
            <span>Our Heritage & Values</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            10+ Years of Sculpting Academic Champions
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Founded with a vision to democratize elite coaching in Central India, Mentora Institute combines compassionate mentorship with scientific, data-driven test preparation.
          </p>
        </div>

        {/* Story Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <div className="space-y-6 text-slate-600 leading-relaxed text-sm sm:text-base">
            <h3 className="text-2xl font-bold text-slate-900">
              Transforming Aspirations into All-India Ranks
            </h3>
            <p>
              Headquartered in Dharampeth, Nagpur, <strong>MENTORA INSTITUTE</strong> has evolved from a boutique physics foundation into Maharashtra’s foremost multi-disciplinary coaching sanctuary.
            </p>
            <p>
              Over the last decade, our team has steered more than <strong>5,000 students</strong> through the rigorous gauntlets of JEE Main, JEE Advanced, NEET-UG, and MHT-CET, maintaining a relentless <strong>92%+ success rate</strong>.
            </p>
            <p>
              Unlike mass commercial factories where students become anonymous numbers, Mentora Institute enforces capped batch sizes of 45 students, daily doubt-clearing counters, and an in-house proprietary computer-based diagnostic testing engine.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
                <div className="font-bold text-slate-900 text-base">Capped Batch Sizes</div>
                <div className="text-xs text-slate-500 mt-1">Maximum 45 students per lecture hall for intimate teacher dialogue.</div>
              </div>
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
                <div className="font-bold text-slate-900 text-base">24/7 Doubt Counters</div>
                <div className="text-xs text-slate-500 mt-1">Senior faculty available on physical counters and digital chat.</div>
              </div>
            </div>
          </div>

          {/* Mission & Vision Cards */}
          <div className="space-y-5">
            <div className="p-6 bg-gradient-to-br from-blue-50/70 to-indigo-50/50 rounded-2xl border border-blue-100 shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-sm">
                <Compass className="w-5 h-5" />
              </div>
              <h4 className="text-lg font-bold text-slate-900">Our Mission</h4>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                To equip every ambitious student with first-principles scientific comprehension, unwavering mental grit, and test-taking acumen to secure top merit in India’s most competitive national entrances.
              </p>
            </div>

            <div className="p-6 bg-gradient-to-br from-purple-50/70 to-fuchsia-50/50 rounded-2xl border border-purple-100 shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-purple-600 text-white flex items-center justify-center shadow-sm">
                <Eye className="w-5 h-5" />
              </div>
              <h4 className="text-lg font-bold text-slate-900">Our Vision</h4>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                To stand as Central India’s most trustworthy, student-centric academic benchmark—where academic rigor meets genuine emotional empathy, transforming potential into pioneering doctors, engineers, and scientists.
              </p>
            </div>
          </div>
        </div>

        {/* Leadership Spotlight: Director & Academic Head */}
        <div className="bg-slate-900 rounded-3xl p-8 sm:p-10 text-white shadow-xl border border-slate-800">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs uppercase font-bold text-blue-400 tracking-wider">Academic Governance</span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">Meet Our Academic Leadership</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Director */}
            <div className="bg-slate-800/80 p-6 rounded-2xl border border-slate-700/80 flex flex-col sm:flex-row gap-5 items-center sm:items-start text-center sm:text-left">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80"
                alt="Dr. Arjun Mehta"
                className="w-24 h-24 rounded-2xl object-cover border-2 border-blue-400 shadow-md shrink-0"
              />
              <div className="space-y-2">
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                  <h4 className="text-lg font-bold text-white">{instituteInfo.director}</h4>
                  <span className="text-[11px] bg-blue-500/20 text-blue-300 border border-blue-500/30 px-2 py-0.5 rounded-full font-medium">
                    Director & Founder
                  </span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Ph.D. in Applied Physics with 20+ years of pedigree mentoring IIT-JEE toppers. A member of national curriculum advisory bodies and recipient of the Maharashtra Rashtriya Shikshak Gaurav Award.
                </p>
                <div className="text-xs text-blue-400 italic">"Teaching is not about delivering facts; it is about building the habit of analytical inquiry."</div>
              </div>
            </div>

            {/* Academic Head */}
            <div className="bg-slate-800/80 p-6 rounded-2xl border border-slate-700/80 flex flex-col sm:flex-row gap-5 items-center sm:items-start text-center sm:text-left">
              <img
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80"
                alt="Priya Sharma"
                className="w-24 h-24 rounded-2xl object-cover border-2 border-purple-400 shadow-md shrink-0"
              />
              <div className="space-y-2">
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                  <h4 className="text-lg font-bold text-white">{instituteInfo.academicHead}</h4>
                  <span className="text-[11px] bg-purple-500/20 text-purple-300 border border-purple-500/30 px-2 py-0.5 rounded-full font-medium">
                    Academic Head
                  </span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  M.Sc. Physics (Gold Medalist), Ex-National Head of Physics at top Kota institutes. Curates Mentora's diagnostic assessments, negative-marking speed drills, and individualized student roadmaps.
                </p>
                <div className="text-xs text-purple-300 italic">"Every child has an innate threshold of genius; our job is to dismantle the fear of numbers."</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
