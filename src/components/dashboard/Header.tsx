import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Role } from '../../types';
import {
  Menu,
  Bell,
  Search,
  ChevronDown,
  User,
  Shield,
  GraduationCap,
  UserCheck,
  Home,
  RefreshCw,
} from 'lucide-react';
import { NotificationDropdown } from './NotificationDropdown';

interface HeaderProps {
  onToggleSidebar: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onToggleSidebar }) => {
  const {
    currentUser,
    currentRole,
    switchDemoUser,
    setCurrentView,
    activeTab,
    notifications,
  } = useApp();

  const [notifOpen, setNotifOpen] = useState(false);
  const [roleMenuOpen, setRoleMenuOpen] = useState(false);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const getPageTitle = () => {
    const titles: Record<string, string> = {
      dashboard: 'Dashboard Overview',
      'login-logs': 'Logged-In Users & Session Audit',
      profile: 'User Profile & Identity',
      course: 'Academic Course Details',
      batch: 'Batch & Schedule',
      batches: 'Assigned Batches',
      students: 'Students Directory & Dossier',
      teachers: 'Faculty Council',
      courses: 'Course Management',
      attendance: 'Attendance Ledger',
      fees: 'Fee Ledger & Payments',
      tests: 'Online Computer-Based Tests',
      notes: 'Study Material & Lecture Notes',
      results: 'Examination Results & Rankings',
      timetable: 'Weekly Timetable Schedule',
      notices: 'Notices & Circulars',
      support: 'Helpdesk & Grievance Cell',
      enquiries: 'Admission Leads & CRM',
      gallery: 'Campus Infrastructure Gallery',
      testimonials: 'Testimonial Moderation',
      settings: 'Institute Configuration',
    };
    return titles[activeTab] || 'Portal Management';
  };

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200 h-16 flex items-center justify-between px-4 sm:px-6">
      {/* Left: Mobile Toggle & Page Title */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleSidebar}
          className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg lg:hidden"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div>
          <h2 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight leading-none">
            {getPageTitle()}
          </h2>
          <span className="text-[11px] text-slate-400 font-medium">
            Mentora Institute CIMS • {currentRole} Session
          </span>
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Switch Persona Fast Dropdown */}
        <div className="relative">
          <button
            onClick={() => setRoleMenuOpen(!roleMenuOpen)}
            className="flex items-center gap-1.5 px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold transition-colors border border-slate-200/80"
          >
            <RefreshCw className="w-3 h-3 text-slate-500" />
            <span className="hidden sm:inline">Switch Role:</span>
            <span className="text-blue-600 font-bold uppercase">{currentRole}</span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>

          {roleMenuOpen && (
            <div className="absolute right-0 top-10 w-52 bg-white rounded-xl shadow-xl border border-slate-200 py-1.5 z-50 animate-slide-up text-left">
              <div className="px-3 py-1 text-[10px] uppercase font-bold text-slate-400">
                1-Click Role Switcher
              </div>
              <button
                onClick={() => {
                  switchDemoUser('STUDENT');
                  setRoleMenuOpen(false);
                }}
                className={`w-full px-3 py-2 text-xs flex items-center gap-2 hover:bg-blue-50 text-left ${
                  currentRole === 'STUDENT' ? 'font-bold text-blue-600 bg-blue-50/50' : 'text-slate-700'
                }`}
              >
                <GraduationCap className="w-3.5 h-3.5 text-blue-500" />
                <span>Student (Rohan Deshmukh)</span>
              </button>

              <button
                onClick={() => {
                  switchDemoUser('TEACHER');
                  setRoleMenuOpen(false);
                }}
                className={`w-full px-3 py-2 text-xs flex items-center gap-2 hover:bg-purple-50 text-left ${
                  currentRole === 'TEACHER' ? 'font-bold text-purple-600 bg-purple-50/50' : 'text-slate-700'
                }`}
              >
                <UserCheck className="w-3.5 h-3.5 text-purple-500" />
                <span>Teacher (Prof. Priya)</span>
              </button>

              <button
                onClick={() => {
                  switchDemoUser('ADMIN');
                  setRoleMenuOpen(false);
                }}
                className={`w-full px-3 py-2 text-xs flex items-center gap-2 hover:bg-amber-50 text-left ${
                  currentRole === 'ADMIN' ? 'font-bold text-amber-600 bg-amber-50/50' : 'text-slate-700'
                }`}
              >
                <Shield className="w-3.5 h-3.5 text-amber-500" />
                <span>Admin (Dr. Arjun Mehta)</span>
              </button>
            </div>
          )}
        </div>

        {/* Public Website button */}
        <button
          onClick={() => setCurrentView('public')}
          className="hidden md:flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:text-blue-600 hover:bg-slate-100 rounded-xl transition-colors"
        >
          <Home className="w-3.5 h-3.5" />
          <span>Public Site</span>
        </button>

        {/* Notification Bell */}
        <div className="relative">
          <button
            onClick={() => setNotifOpen(!notifOpen)}
            className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl relative transition-colors"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full ring-2 ring-white" />
            )}
          </button>

          <NotificationDropdown isOpen={notifOpen} onClose={() => setNotifOpen(false)} />
        </div>

        {/* User Avatar */}
        <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
          {currentUser?.avatar ? (
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-8 h-8 rounded-full object-cover border border-slate-200"
            />
          ) : (
            <div className="w-8 h-8 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center">
              {currentUser?.name.slice(0, 2).toUpperCase() || 'MI'}
            </div>
          )}
          <div className="hidden lg:block text-left">
            <div className="text-xs font-bold text-slate-800 leading-none flex items-center gap-1.5">
              <span>{currentUser?.name}</span>
              {currentUser?.loginId && (
                <span className="font-mono text-[10px] font-extrabold text-blue-700 bg-blue-50 px-1.5 py-0.2 rounded border border-blue-200">
                  {currentUser.loginId}
                </span>
              )}
            </div>
            <div className="text-[10px] text-slate-400 font-medium">{currentRole} • Mentora CIMS</div>
          </div>
        </div>
      </div>
    </header>
  );
};
