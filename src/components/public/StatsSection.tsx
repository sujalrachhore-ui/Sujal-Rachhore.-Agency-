import React from 'react';
import { useApp } from '../../context/AppContext';
import { Users, GraduationCap, Award, Calendar, CheckCircle2, TrendingUp, Sparkles } from 'lucide-react';

export const StatsSection: React.FC = () => {
  const { instituteInfo } = useApp();

  const stats = [
    {
      value: '5,000+',
      label: 'Students Mentored',
      subtext: 'Across Maharashtra & Central India',
      icon: <Users className="w-6 h-6 text-blue-600" />,
      bg: 'bg-blue-50/70 border-blue-200/80',
    },
    {
      value: '25+',
      label: 'Expert Educators',
      subtext: 'Kota & IIT Alumni Faculty',
      icon: <GraduationCap className="w-6 h-6 text-purple-600" />,
      bg: 'bg-purple-50/70 border-purple-200/80',
    },
    {
      value: '92%+',
      label: 'Success Rate',
      subtext: 'Consistent Merit Qualifying Ratio',
      icon: <Award className="w-6 h-6 text-emerald-600" />,
      bg: 'bg-emerald-50/70 border-emerald-200/80',
    },
    {
      value: '10+',
      label: 'Years of Excellence',
      subtext: 'Trusted Academic Legacy in Nagpur',
      icon: <Calendar className="w-6 h-6 text-amber-600" />,
      bg: 'bg-amber-50/70 border-amber-200/80',
    },
  ];

  return (
    <section className="py-12 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((s, idx) => (
            <div
              key={idx}
              className={`p-6 rounded-2xl border ${s.bg} shadow-xs hover:shadow-md transition-all flex items-start gap-4`}
            >
              <div className="w-12 h-12 rounded-xl bg-white shadow-xs flex items-center justify-center shrink-0 border border-slate-100">
                {s.icon}
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-none">
                  {s.value}
                </div>
                <div className="text-sm font-bold text-slate-800 mt-1">{s.label}</div>
                <div className="text-xs text-slate-500 mt-0.5">{s.subtext}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
