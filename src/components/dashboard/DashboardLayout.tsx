import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Sidebar } from './Sidebar';
import { Header } from './Header';

// Student components
import { StudentDashboard } from '../student/StudentDashboard';
import { StudentProfile } from '../student/StudentProfile';
import { StudentCourses } from '../student/StudentCourses';
import { StudentAttendance } from '../student/StudentAttendance';
import { StudentTests } from '../student/StudentTests';
import { StudentResults } from '../student/StudentResults';
import { StudentMaterials } from '../student/StudentMaterials';
import { StudentFees } from '../student/StudentFees';
import { StudentTimetable } from '../student/StudentTimetable';
import { StudentNotices } from '../student/StudentNotices';
import { StudentSupport } from '../student/StudentSupport';

// Teacher components
import { TeacherDashboard } from '../teacher/TeacherDashboard';
import { TeacherBatches } from '../teacher/TeacherBatches';
import { TeacherAttendance } from '../teacher/TeacherAttendance';
import { TeacherTests } from '../teacher/TeacherTests';
import { TeacherMaterials } from '../teacher/TeacherMaterials';
import { TeacherResults } from '../teacher/TeacherResults';
import { TeacherNotices } from '../teacher/TeacherNotices';
import { TeacherProfile } from '../teacher/TeacherProfile';

// Admin components
import { AdminDashboard } from '../admin/AdminDashboard';
import { LoggedInUsersManagement } from '../admin/LoggedInUsersManagement';
import { StudentManagement } from '../admin/StudentManagement';
import { TeacherManagement } from '../admin/TeacherManagement';
import { CourseManagement } from '../admin/CourseManagement';
import { BatchManagement } from '../admin/BatchManagement';
import { FeeManagement } from '../admin/FeeManagement';
import { EnquiryManagement } from '../admin/EnquiryManagement';
import { TimetableManagement } from '../admin/TimetableManagement';
import { SystemSettings } from '../admin/SystemSettings';

export const DashboardLayout: React.FC = () => {
  const { currentRole, activeTab } = useApp();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const renderContent = () => {
    // STUDENT ROLE
    if (currentRole === 'STUDENT') {
      switch (activeTab) {
        case 'dashboard':
          return <StudentDashboard />;
        case 'profile':
          return <StudentProfile />;
        case 'course':
        case 'batch':
          return <StudentCourses />;
        case 'attendance':
          return <StudentAttendance />;
        case 'tests':
          return <StudentTests />;
        case 'results':
          return <StudentResults />;
        case 'notes':
          return <StudentMaterials />;
        case 'fees':
          return <StudentFees />;
        case 'timetable':
          return <StudentTimetable />;
        case 'notices':
          return <StudentNotices />;
        case 'support':
          return <StudentSupport />;
        default:
          return <StudentDashboard />;
      }
    }

    // TEACHER ROLE
    if (currentRole === 'TEACHER') {
      switch (activeTab) {
        case 'dashboard':
          return <TeacherDashboard />;
        case 'batches':
        case 'students':
          return <TeacherBatches />;
        case 'attendance':
          return <TeacherAttendance />;
        case 'tests':
          return <TeacherTests />;
        case 'notes':
          return <TeacherMaterials />;
        case 'results':
          return <TeacherResults />;
        case 'notices':
          return <TeacherNotices />;
        case 'timetable':
          return <StudentTimetable />;
        case 'profile':
          return <TeacherProfile />;
        default:
          return <TeacherDashboard />;
      }
    }

    // ADMIN ROLE
    switch (activeTab) {
      case 'dashboard':
        return <AdminDashboard />;
      case 'login-logs':
        return <LoggedInUsersManagement />;
      case 'students':
        return <StudentManagement />;
      case 'teachers':
        return <TeacherManagement />;
      case 'courses':
        return <CourseManagement />;
      case 'batches':
        return <BatchManagement />;
      case 'attendance':
        return <TeacherAttendance />;
      case 'fees':
        return <FeeManagement />;
      case 'tests':
        return <TeacherTests />;
      case 'notes':
        return <TeacherMaterials />;
      case 'results':
        return <TeacherResults />;
      case 'timetable':
        return <TimetableManagement />;
      case 'enquiries':
        return <EnquiryManagement />;
      case 'notices':
        return <TeacherNotices />;
      case 'settings':
        return <SystemSettings />;
      default:
        return <AdminDashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <Sidebar mobileOpen={mobileSidebarOpen} setMobileOpen={setMobileSidebarOpen} />

      {/* Main Area */}
      <div className="flex-1 flex flex-col min-w-0 lg:pl-64">
        <Header onToggleSidebar={() => setMobileSidebarOpen(!mobileSidebarOpen)} />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto animate-fade-in">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};
