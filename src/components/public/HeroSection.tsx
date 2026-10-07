import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Sparkles,
  ArrowRight,
  UserCheck,
  CheckCircle2,
  Award,
  BookOpen,
  TrendingUp,
  Play,
} from 'lucide-react';

interface HeroSectionProps {
  onOpenLogin: () => void;
  onOpenEnquiry: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenLogin,
  onOpenEnquiry,
}) => {
  const { instituteInfo } = useApp();

  return (
    <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28 bg-gradient-to-b from-blue-50/60 via-white to-slate-50 border-b border-slate-200">
      {/* Decorative background grid and blur blobs */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f015_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f015_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-72 h-72 bg-purple-400/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Headlines & CTAs */}
          <div className="lg:col-span-7 text-center lg:text-left space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100/80 border border-blue-200 text-blue-800 text-xs font-semibold shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span>Central India's Premier Competitive EdTech Hub</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.12]">
              Learn Better.{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600">
                Achieve More.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
              Empowering students for <strong>JEE, NEET, MHT-CET, and Class 11-12th Science</strong> with unmatched faculty mentorship, computer-based diagnostic testing, and comprehensive analytics.
            </p>

            {/* CTA Button Group */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3.5 pt-2">
              <a
                href="#courses"
                className="px-6 py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold text-sm rounded-xl shadow-lg shadow-blue-500/25 flex items-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>Explore Courses</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <button
                type="button"
                onClick={onOpenLogin}
                className="px-6 py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm rounded-xl shadow-sm flex items-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <UserCheck className="w-4 h-4 text-emerald-400" />
                <span>Student / Portal Login</span>
              </button>

              <button
                type="button"
                onClick={onOpenEnquiry}
                className="px-6 py-3.5 bg-white hover:bg-slate-50 text-slate-700 font-semibold text-sm rounded-xl border border-slate-300 shadow-xs flex items-center gap-2 transition-all"
              >
                <span>Enquire Now</span>
              </button>
            </div>

            {/* Quick Proof Pillars */}
            <div className="pt-4 grid grid-cols-2 sm:grid-cols-4 gap-4 border-t border-slate-200/80 text-left">
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-slate-900">5,000+</div>
                <div className="text-xs font-medium text-slate-500 mt-0.5">Students Mentored</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-blue-600">25+</div>
                <div className="text-xs font-medium text-slate-500 mt-0.5">Expert Educators</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-emerald-600">92%+</div>
                <div className="text-xs font-medium text-slate-500 mt-0.5">Selection Rate</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-violet-600">10+</div>
                <div className="text-xs font-medium text-slate-500 mt-0.5">Years of Excellence</div>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Dashboard Interactive Preview Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none bg-slate-900 rounded-3xl p-5 shadow-2xl border border-slate-800 text-white">
              {/* Card Header */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div className="flex items-center gap-2.5">
                  <div className="w-3 h-3 rounded-full bg-rose-500" />
                  <div className="w-3 h-3 rounded-full bg-amber-500" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500" />
                  <span className="text-xs font-mono text-slate-400 ml-2">mentora-cims.live</span>
                </div>
                <span className="text-[11px] font-semibold text-emerald-400 bg-emerald-950/80 border border-emerald-800 px-2 py-0.5 rounded-full">
                  Live Portal Online
                </span>
              </div>

              {/* Student KPI Snapshot simulation */}
              <div className="mt-4 space-y-3.5">
                <div className="p-3.5 bg-slate-800/80 rounded-2xl border border-slate-700/60 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-500 to-indigo-600 flex items-center justify-center font-bold text-white shadow-sm">
                      RD
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-100">Rohan Deshmukh</h4>
                      <p className="text-[11px] text-slate-400">JEE Advanced Batch Alpha • ID: MI-2026-0101</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-emerald-400 bg-emerald-900/40 px-2.5 py-1 rounded-lg border border-emerald-700/50">
                    92% Attd
                  </span>
                </div>

                {/* Scorecard Widget */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 bg-slate-800/60 rounded-xl border border-slate-700/50">
                    <div className="flex items-center justify-between text-slate-400 text-xs">
                      <span>Latest Mock CBT</span>
                      <TrendingUp className="w-3.5 h-3.5 text-blue-400" />
                    </div>
                    <div className="text-xl font-bold text-white mt-1">284 / 360</div>
                    <div className="text-[10px] text-emerald-400 font-medium mt-0.5 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> Top 1% Percentile
                    </div>
                  </div>

                  <div className="p-3 bg-slate-800/60 rounded-xl border border-slate-700/50">
                    <div className="flex items-center justify-between text-slate-400 text-xs">
                      <span>All-India Rank</span>
                      <Award className="w-3.5 h-3.5 text-amber-400" />
                    </div>
                    <div className="text-xl font-bold text-amber-400 mt-1">Rank #14</div>
                    <div className="text-[10px] text-slate-400 mt-0.5">850 Candidates</div>
                  </div>
                </div>

                {/* Live Question Palette Indicator */}
                <div className="p-3.5 bg-gradient-to-r from-blue-950/70 to-indigo-950/70 rounded-2xl border border-blue-800/40">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-blue-200">Active Test Engine</span>
                    <span className="text-[11px] font-mono text-amber-300 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-800/50">
                      Timer: 42:15 remaining
                    </span>
                  </div>
                  <div className="flex gap-1.5 flex-wrap">
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((q, idx) => (
                      <div
                        key={q}
                        className={`w-7 h-7 rounded-lg text-xs font-bold flex items-center justify-center ${
                          idx < 4
                            ? 'bg-emerald-600 text-white'
                            : idx === 4
                            ? 'bg-amber-500 text-white animate-pulse'
                            : 'bg-slate-800 text-slate-400 border border-slate-700'
                        }`}
                      >
                        {q}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Fast Access trigger */}
                <button
                  type="button"
                  onClick={onOpenLogin}
                  className="w-full py-2.5 px-3 bg-blue-600 hover:bg-blue-500 text-white font-medium text-xs rounded-xl flex items-center justify-center gap-2 transition-colors"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Launch Live Interactive Student Portal</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
