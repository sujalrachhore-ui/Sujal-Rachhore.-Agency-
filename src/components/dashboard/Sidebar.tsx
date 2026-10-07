import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  GraduationCap,
  LayoutDashboard,
  User,
  BookOpen,
  Users,
  CalendarCheck,
  FileCheck2,
  FileText,
  Clock,
  CreditCard,
  Bell,
  HelpCircle,
  LogOut,
  Layers,
  Award,
  Settings,
  Image,
  MessageSquare,
  Sparkles,
  ChevronRight,
  TrendingUp,
  Inbox,
  Shield,
  Home,
  UserCheck,
} from 'lucide-react';

interface SidebarProps {
  mobileOpen: boolean;
  setMobileOpen: (open: boolean) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ mobileOpen, setMobileOpen }) => {
  const { currentRole, currentUser, activeTab, setActiveTab, logout, setCurrentView, instituteInfo } = useApp();

  const getNavItems = () => {
    if (currentRole === 'STUDENT') {
      return [
        { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
        { id: 'profile', label: 'My Profile', icon: <User className="w-4 h-4" /> },
        { id: 'course', label: 'My Course', icon: <BookOpen className="w-4 h-4" /> },
        { id: 'batch', label: 'Batch Details', icon: <Layers className="w-4 h-4" /> },
        { id: 'attendance', label: 'Attendance', icon: <CalendarCheck className="w-4 h-4" /> },
        { id: 'tests', label: 'Online Tests', icon: <Clock className="w-4 h-4" /> },
        { id: 'results', label: 'Results & Ranks', icon: <Award className="w-4 h-4" /> },
        { id: 'notes', label: 'Study Material', icon: <FileText className="w-4 h-4" /> },
        { id: 'fees', label: 'Fees & Receipts', icon: <CreditCard className="w-4 h-4" /> },
        { id: 'timetable', label: 'Timetable', icon: <Clock className="w-4 h-4" /> },
        { id: 'notices', label: 'Notices', icon: <Bell className="w-4 h-4" /> },
        { id: 'support', label: 'Support & Help', icon: <HelpCircle className="w-4 h-4" /> },
      ];
    }

    if (currentRole === 'TEACHER') {
      return [
        { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
        { id: 'batches', label: 'My Batches', icon: <Layers className="w-4 h-4" /> },
        { id: 'students', label: 'Students Roster', icon: <Users className="w-4 h-4" /> },
        { id: 'attendance', label: 'Mark Attendance', icon: <CalendarCheck className="w-4 h-4" /> },
        { id: 'tests', label: 'Create & Manage Tests', icon: <FileCheck2 className="w-4 h-4" /> },
        { id: 'notes', label: 'Upload Materials', icon: <FileText className="w-4 h-4" /> },
        { id: 'results', label: 'Student Results', icon: <Award className="w-4 h-4" /> },
        { id: 'notices', label: 'Batch Notices', icon: <Bell className="w-4 h-4" /> },
        { id: 'timetable', label: 'My Timetable', icon: <Clock className="w-4 h-4" /> },
        { id: 'profile', label: 'Faculty Profile', icon: <User className="w-4 h-4" /> },
      ];
    }

    // ADMIN
    return [
      { id: 'dashboard', label: 'Overview & KPIs', icon: <LayoutDashboard className="w-4 h-4" /> },
      { id: 'login-logs', label: 'Logged-In Users & Audit', icon: <UserCheck className="w-4 h-4 text-emerald-600" /> },
      { id: 'students', label: 'Student Directory', icon: <Users className="w-4 h-4" /> },
      { id: 'teachers', label: 'Faculty Directory', icon: <GraduationCap className="w-4 h-4" /> },
      { id: 'courses', label: 'Course Catalog', icon: <BookOpen className="w-4 h-4" /> },
      { id: 'batches', label: 'Batch Allocations', icon: <Layers className="w-4 h-4" /> },
      { id: 'attendance', label: 'Attendance Ledger', icon: <CalendarCheck className="w-4 h-4" /> },
      { id: 'fees', label: 'Fees & Accounting', icon: <CreditCard className="w-4 h-4" /> },
      { id: 'tests', label: 'Online Tests Bank', icon: <FileCheck2 className="w-4 h-4" /> },
      { id: 'notes', label: 'Study Material Repo', icon: <FileText className="w-4 h-4" /> },
      { id: 'results', label: 'Results & Top Ranks', icon: <Award className="w-4 h-4" /> },
      { id: 'timetable', label: 'Master Timetable', icon: <Clock className="w-4 h-4" /> },
      { id: 'enquiries', label: 'Admission Enquiries', icon: <Inbox className="w-4 h-4" /> },
      { id: 'notices', label: 'Circulars & Notices', icon: <Bell className="w-4 h-4" /> },
      { id: 'gallery', label: 'Campus Gallery', icon: <Image className="w-4 h-4" /> },
      { id: 'testimonials', label: 'Testimonials', icon: <MessageSquare className="w-4 h-4" /> },
      { id: 'settings', label: 'Institute Settings', icon: <Settings className="w-4 h-4" /> },
    ];
  };

  const navItems = getNavItems();

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
    setMobileOpen(false);
  };

  return (
    <>
      {/* Mobile backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs z-40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Main Sidebar Element */}
      <aside
        className={`fixed top-0 bottom-0 left-0 w-64 bg-slate-900 text-slate-300 z-50 flex flex-col justify-between border-r border-slate-800 transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div>
          {/* Institute Branding Header */}
          <div className="p-5 border-b border-slate-800 flex items-center justify-between">
            <div
              onClick={() => setCurrentView('public')}
              className="flex items-center gap-3 cursor-pointer group select-none"
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md">
                <GraduationCap className="w-5 h-5" />
              </div>
              <div>
                <div className="text-sm font-extrabold text-white tracking-tight leading-none group-hover:text-blue-400 transition-colors">
                  MENTORA
                </div>
                <div className="text-[10px] text-slate-400 font-medium tracking-wide mt-1">
                  {currentRole} PORTAL
                </div>
              </div>
            </div>

            <button
              onClick={() => setCurrentView('public')}
              className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
              title="Return to public website"
            >
              <Home className="w-4 h-4" />
            </button>
          </div>

          {/* User profile snippet */}
          <div className="p-3.5 mx-3 my-3 bg-slate-800/70 border border-slate-700/60 rounded-xl flex items-center gap-3">
            {currentUser?.avatar ? (
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-9 h-9 rounded-full object-cover border border-slate-600"
              />
            ) : (
              <div className="w-9 h-9 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center">
                {currentUser?.name.slice(0, 2).toUpperCase() || 'MI'}
              </div>
            )}
            <div className="flex-1 min-w-0">
              <div className="text-xs font-bold text-white truncate">{currentUser?.name}</div>
              <div className="text-[10px] font-mono text-slate-400 truncate">{currentUser?.email}</div>
            </div>
            <span
              className={`text-[9px] font-bold px-1.5 py-0.5 rounded uppercase ${
                currentRole === 'ADMIN'
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                  : currentRole === 'TEACHER'
                  ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                  : 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
              }`}
            >
              {currentRole}
            </span>
          </div>

          {/* Navigation Items List */}
          <div className="px-3 space-y-1 max-h-[calc(100vh-270px)] overflow-y-auto">
            <span className="text-[10px] uppercase font-bold text-slate-500 px-3 tracking-wider block mb-1">
              Navigation Menu
            </span>
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleTabClick(item.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/30'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                  }`}
                >
                  <span className={isActive ? 'text-white' : 'text-slate-400'}>{item.icon}</span>
                  <span className="flex-1 text-left">{item.label}</span>
                  {isActive && <ChevronRight className="w-3.5 h-3.5 text-blue-200" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-3 border-t border-slate-800 space-y-1 bg-slate-950/40">
          <button
            onClick={() => setCurrentView('public')}
            className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-colors"
          >
            <Home className="w-4 h-4 text-slate-400" />
            <span>Public Website</span>
          </button>

          <button
            onClick={logout}
            className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-rose-400 hover:text-rose-300 hover:bg-rose-950/40 rounded-xl transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out Session</span>
          </button>
        </div>
      </aside>
    </>
  );
};
