import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  GraduationCap,
  MapPin,
  Phone,
  Mail,
  Instagram,
  Youtube,
  Clock,
  ArrowUp,
  RotateCcw,
  ShieldCheck,
} from 'lucide-react';

interface FooterProps {
  onOpenLogin: () => void;
  onOpenEnquiry: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenLogin, onOpenEnquiry }) => {
  const { instituteInfo, resetToDemoData } = useApp();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-800">
      {/* Upper Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Col 1 & 2: Brand & Overview */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-violet-600 flex items-center justify-center text-white shadow-md">
                <GraduationCap className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xl font-extrabold text-white tracking-tight">MENTORA</span>{' '}
                <span className="text-xs font-bold uppercase tracking-wider text-blue-400 bg-blue-950/80 border border-blue-800 px-1.5 py-0.5 rounded">
                  INSTITUTE
                </span>
                <p className="text-[11px] text-slate-400">Learn Better. Achieve More.</p>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm">
              Premier competitive coaching institute for JEE (Main & Advanced), NEET-UG, MHT-CET, and Class 11th & 12th Science in Nagpur, Maharashtra.
            </p>

            <div className="pt-2 text-xs space-y-1.5 text-slate-400">
              <div>
                <span className="text-slate-500 font-semibold">Director:</span>{' '}
                <strong className="text-slate-200">{instituteInfo.director}</strong>
              </div>
              <div>
                <span className="text-slate-500 font-semibold">Academic Head:</span>{' '}
                <strong className="text-slate-200">{instituteInfo.academicHead}</strong>
              </div>
            </div>

            {/* Social handles */}
            <div className="flex items-center gap-3 pt-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-slate-900 hover:bg-pink-600 hover:text-white flex items-center justify-center text-slate-300 border border-slate-800 transition-colors"
                title={instituteInfo.instagram}
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-slate-900 hover:bg-red-600 hover:text-white flex items-center justify-center text-slate-300 border border-slate-800 transition-colors"
                title={instituteInfo.youtube}
              >
                <Youtube className="w-4 h-4" />
              </a>
              <button
                type="button"
                onClick={resetToDemoData}
                title="Reset application to original initial seed demo state"
                className="flex items-center gap-1.5 text-[11px] text-slate-400 hover:text-amber-400 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-xl transition-colors ml-2"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Demo Data</span>
              </button>
            </div>
          </div>

          {/* Col 3: Programs */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Programs
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#courses" className="hover:text-blue-400 transition-colors">
                  JEE (Main + Advanced)
                </a>
              </li>
              <li>
                <a href="#courses" className="hover:text-blue-400 transition-colors">
                  NEET Medical UG Pinnacle
                </a>
              </li>
              <li>
                <a href="#courses" className="hover:text-blue-400 transition-colors">
                  MHT-CET Top Ranker Batch
                </a>
              </li>
              <li>
                <a href="#courses" className="hover:text-blue-400 transition-colors">
                  11th & 12th Science Board
                </a>
              </li>
              <li>
                <a href="#courses" className="hover:text-blue-400 transition-colors">
                  Junior Foundation (8th-10th)
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Quick Portals & Features */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Portals & System
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={onOpenLogin} className="hover:text-blue-400 transition-colors text-left">
                  Student CBT Login
                </button>
              </li>
              <li>
                <button onClick={onOpenLogin} className="hover:text-blue-400 transition-colors text-left">
                  Teacher Faculty Panel
                </button>
              </li>
              <li>
                <button onClick={onOpenLogin} className="hover:text-blue-400 transition-colors text-left">
                  Administration Dashboard
                </button>
              </li>
              <li>
                <a href="#results" className="hover:text-blue-400 transition-colors">
                  Topper Scorecards
                </a>
              </li>
              <li>
                <a href="#notices" className="hover:text-blue-400 transition-colors">
                  Official Circulars
                </a>
              </li>
            </ul>
          </div>

          {/* Col 5: Contact Summary */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Nagpur Campus
            </h4>
            <div className="space-y-2.5 text-xs text-slate-400">
              <p className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
                <span>Plot 42, WHC Road, Dharampeth, Nagpur - 440010</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span className="font-mono">{instituteInfo.phone}</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                <span>{instituteInfo.email}</span>
              </p>
              <p className="flex items-start gap-2">
                <Clock className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                <span>Mon – Sat: 08:00 AM – 07:00 PM</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Lower Footer */}
      <div className="border-t border-slate-900 bg-slate-950 py-6 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span>
              © {new Date().getFullYear()} MENTORA INSTITUTE. All rights reserved. Registered under Maharashtra Coaching Institutions Act.
            </span>
          </div>

          <div className="flex items-center gap-6">
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1 hover:text-white transition-colors"
            >
              <span>Back to top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
