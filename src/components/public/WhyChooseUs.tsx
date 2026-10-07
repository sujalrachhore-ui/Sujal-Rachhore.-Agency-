import React from 'react';
import {
  Users,
  MonitorCheck,
  HelpCircle,
  BarChart3,
  BookOpenCheck,
  ShieldCheck,
} from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const pillars = [
    {
      icon: <Users className="w-6 h-6 text-blue-600" />,
      title: 'Top-Tier Kota & IIT Faculty',
      desc: 'Learn directly from educators with 12+ years average classroom tenure who have authored national competitive guidebooks.',
      badge: 'Expert Led',
    },
    {
      icon: <MonitorCheck className="w-6 h-6 text-purple-600" />,
      title: 'Simulated NTA Testing Engine',
      desc: 'Practice in the exact UI layout used in JEE Main, Advanced, and NEET computer-based tests to eliminate exam-day anxiety.',
      badge: 'CBT Tested',
    },
    {
      icon: <HelpCircle className="w-6 h-6 text-emerald-600" />,
      title: 'Zero-Wait Doubt Counters',
      desc: 'Physical doubt desks open Monday through Saturday with dedicated subject teachers ensuring no query goes home unanswered.',
      badge: 'Personal Care',
    },
    {
      icon: <BarChart3 className="w-6 h-6 text-amber-600" />,
      title: 'Micro-Granular Analytics',
      desc: 'Track accuracy, time taken per question, topic-wise negative marks, and percentile trajectories in your student dashboard.',
      badge: 'Data Driven',
    },
    {
      icon: <BookOpenCheck className="w-6 h-6 text-indigo-600" />,
      title: 'Comprehensive Study Modules',
      desc: 'Handcrafted theory notes, 15 years solved papers, daily practice problem sheets (DPPs), and curated formula cheat sheets.',
      badge: 'Exhaustive',
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-rose-600" />,
      title: 'Active Parent Synchronization',
      desc: 'Automated attendance notifications, real-time fee ledgers, and bi-monthly face-to-face academic diagnosis reviews.',
      badge: '100% Transparent',
    },
  ];

  return (
    <section className="py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
          <span className="text-xs uppercase font-bold text-blue-600 tracking-wider bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
            The Mentora Advantage
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Why Mentora Institute Outperforms Mass Coaching
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            We reject one-size-fits-all factory teaching. Every single student at Mentora receives custom feedback loops and strategic roadmap adjustments.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pillars.map((item, idx) => (
            <div
              key={idx}
              className="p-6 bg-white rounded-2xl border border-slate-200 shadow-xs hover:shadow-lg transition-all duration-300 group hover:-translate-y-1 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-slate-50 group-hover:bg-slate-100 flex items-center justify-center transition-colors">
                    {item.icon}
                  </div>
                  <span className="text-[11px] font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-full">
                    {item.badge}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                  {item.desc}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 text-xs font-semibold text-blue-600 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                <span>Learn more about this method</span>
                <span>&rarr;</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
