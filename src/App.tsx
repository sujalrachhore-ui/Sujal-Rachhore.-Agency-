import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { ToastContainer } from './components/common/Toast';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { HeroSection } from './components/public/HeroSection';
import { StatsSection } from './components/public/StatsSection';
import { AboutSection } from './components/public/AboutSection';
import { CoursesSection } from './components/public/CoursesSection';
import { WhyChooseUs } from './components/public/WhyChooseUs';
import { ResultsSection } from './components/public/ResultsSection';
import { FacultySection } from './components/public/FacultySection';
import { LearningMethodology } from './components/public/LearningMethodology';
import { GallerySection } from './components/public/GallerySection';
import { TestimonialsSection } from './components/public/TestimonialsSection';
import { NoticesSection } from './components/public/NoticesSection';
import { FaqSection } from './components/public/FaqSection';
import { ContactSection } from './components/public/ContactSection';
import { LoginModal } from './components/auth/LoginModal';
import { ForgotPasswordModal } from './components/auth/ForgotPasswordModal';
import { EnquiryModal } from './components/public/EnquiryModal';
import { OnboardingModal } from './components/auth/OnboardingModal';
import { DashboardLayout } from './components/dashboard/DashboardLayout';

const MainApp: React.FC = () => {
  const { currentView } = useApp();

  const [activeSection, setActiveSection] = useState('home');
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [forgotPasswordOpen, setForgotPasswordOpen] = useState(false);
  const [enquiryModalOpen, setEnquiryModalOpen] = useState(false);
  const [selectedCourseForEnquiry, setSelectedCourseForEnquiry] = useState<string | undefined>(undefined);

  const handleOpenEnquiry = (courseName?: string) => {
    setSelectedCourseForEnquiry(courseName);
    setEnquiryModalOpen(true);
  };

  // If in dashboard view, render full Management System console
  if (currentView === 'dashboard') {
    return (
      <>
        <DashboardLayout />
        <OnboardingModal />
        <ToastContainer />
      </>
    );
  }

  // Otherwise, render Public Website
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between selection:bg-blue-600 selection:text-white">
      {/* Top Navigation Bar */}
      <Navbar
        onOpenLogin={() => setLoginModalOpen(true)}
        onOpenEnquiry={() => handleOpenEnquiry()}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />

      <main className="flex-1">
        <HeroSection
          onOpenLogin={() => setLoginModalOpen(true)}
          onOpenEnquiry={() => handleOpenEnquiry()}
        />

        <StatsSection />

        <AboutSection />

        <CoursesSection onOpenEnquiry={handleOpenEnquiry} />

        <WhyChooseUs />

        <ResultsSection />

        <FacultySection />

        <LearningMethodology />

        <GallerySection />

        <TestimonialsSection />

        <NoticesSection />

        <FaqSection />

        <ContactSection />
      </main>

      <Footer
        onOpenLogin={() => setLoginModalOpen(true)}
        onOpenEnquiry={() => handleOpenEnquiry()}
      />

      {/* Interactive Modals */}
      <LoginModal
        isOpen={loginModalOpen}
        onClose={() => setLoginModalOpen(false)}
        onForgotPassword={() => {
          setLoginModalOpen(false);
          setForgotPasswordOpen(true);
        }}
      />

      <ForgotPasswordModal
        isOpen={forgotPasswordOpen}
        onClose={() => setForgotPasswordOpen(false)}
        onBackToLogin={() => {
          setForgotPasswordOpen(false);
          setLoginModalOpen(true);
        }}
      />

      <EnquiryModal
        isOpen={enquiryModalOpen}
        onClose={() => setEnquiryModalOpen(false)}
        preselectedCourse={selectedCourseForEnquiry}
      />

      <OnboardingModal />

      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainApp />
    </AppProvider>
  );
}
