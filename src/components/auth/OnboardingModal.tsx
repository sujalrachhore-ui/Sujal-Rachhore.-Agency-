import React, { useState, useEffect } from 'react';
import { useApp, AcademicOnboardingData } from '../../context/AppContext';
import { Modal } from '../common/Modal';
import {
  GraduationCap,
  Sparkles,
  User,
  Phone,
  Mail,
  MapPin,
  School,
  Award,
  Clock,
  Users,
  CheckCircle2,
  Copy,
  Printer,
  ArrowRight,
  ShieldCheck,
  BookOpen,
  Calendar,
} from 'lucide-react';

export const OnboardingModal: React.FC = () => {
  const {
    currentUser,
    showOnboardingModal,
    setShowOnboardingModal,
    completeOnboarding,
    addToast,
    instituteInfo,
  } = useApp();

  const [copiedId, setCopiedId] = useState(false);
  const [step, setStep] = useState<'form' | 'card'>('form');

  const [formData, setFormData] = useState<AcademicOnboardingData>({
    name: '',
    email: '',
    mobile: '',
    targetExam: 'JEE (Main + Advanced)',
    currentClass: 'Class 12th Pursuing',
    targetYear: '2026',
    city: 'Nagpur, Maharashtra',
    schoolCollege: '',
    previousPercentage: 90,
    parentName: '',
    parentMobile: '',
    preferredTiming: 'Morning 07:30 AM – 12:30 PM',
  });

  // Pre-fill from current user when modal opens
  useEffect(() => {
    if (currentUser) {
      setFormData({
        name: currentUser.name || '',
        email: currentUser.email || '',
        mobile: currentUser.mobile || '',
        targetExam: currentUser.targetExam || 'JEE (Main + Advanced)',
        currentClass: currentUser.currentClass || 'Class 12th Pursuing',
        targetYear: currentUser.targetYear || '2026',
        city: currentUser.city || 'Nagpur, Maharashtra',
        schoolCollege: currentUser.schoolCollege || '',
        previousPercentage: currentUser.previousPercentage || 88,
        parentName: currentUser.parentName || '',
        parentMobile: currentUser.parentMobile || '',
        preferredTiming: currentUser.preferredTiming || 'Morning 07:30 AM – 12:30 PM',
      });
      // Reset to form view on open
      setStep('form');
    }
  }, [currentUser, showOnboardingModal]);

  if (!showOnboardingModal || !currentUser) {
    return null;
  }

  const assignedLoginId = currentUser.loginId || `MI-2026-${Math.floor(1000 + Math.random() * 9000)}`;

  const handleCopyId = () => {
    navigator.clipboard?.writeText(assignedLoginId);
    setCopiedId(true);
    addToast(`Login ID ${assignedLoginId} copied to clipboard!`, 'success');
    setTimeout(() => setCopiedId(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      addToast('Please enter your full name', 'error');
      return;
    }
    if (!formData.mobile.trim()) {
      addToast('Please enter your contact mobile number', 'error');
      return;
    }

    completeOnboarding(formData);
    setStep('card');
  };

  const handlePrintCard = () => {
    window.print();
  };

  return (
    <Modal
      isOpen={showOnboardingModal}
      onClose={() => {
        // Allow close but warn if not completed
        if (!currentUser.profileCompleted && step === 'form') {
          if (confirm('Are you sure you want to skip? You can complete your student registration anytime from your profile.')) {
            setShowOnboardingModal(false);
          }
        } else {
          setShowOnboardingModal(false);
        }
      }}
      title={step === 'form' ? 'Student Registration & Academic Dossier' : 'Official Mentora Student Identity Card'}
      subtitle={
        step === 'form'
          ? 'Complete your coaching admission profile for batch allocation, attendance & test access'
          : 'Your Mentora Institute admission dossier has been generated successfully'
      }
      maxWidth={step === 'form' ? '2xl' : 'lg'}
    >
      {step === 'form' ? (
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Highlighted Login ID Banner */}
          <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white p-4 sm:p-5 rounded-2xl shadow-md border border-blue-700/40 relative overflow-hidden">
            <div className="absolute right-0 top-0 bottom-0 opacity-10 flex items-center pr-4 pointer-events-none">
              <GraduationCap className="w-36 h-36" />
            </div>

            <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold uppercase tracking-wider border border-emerald-400/30">
                    Account Verified
                  </span>
                  <span className="text-[11px] text-blue-200">
                    Signed in via {currentUser.loginProvider || 'Online Portal'}
                  </span>
                </div>
                <h3 className="text-base sm:text-lg font-bold text-white">
                  Welcome to {instituteInfo.name}!
                </h3>
                <p className="text-xs text-blue-200">
                  Your official unique Login ID has been provisioned:
                </p>
              </div>

              {/* Login ID Badge with Copy */}
              <div className="bg-white/10 backdrop-blur-md px-3.5 py-2 rounded-xl border border-white/20 flex items-center gap-2.5">
                <div>
                  <span className="block text-[10px] uppercase font-bold text-blue-200 tracking-wider">
                    Assigned Login ID
                  </span>
                  <span className="font-mono text-base font-extrabold text-amber-300 tracking-wider">
                    {assignedLoginId}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={handleCopyId}
                  title="Copy Login ID"
                  className="p-1.5 rounded-lg bg-white/15 hover:bg-white/25 text-white transition-colors"
                >
                  {copiedId ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>
          </div>

          <div className="bg-blue-50/70 border border-blue-200/80 rounded-xl p-3 text-xs text-blue-900 flex items-start gap-2.5">
            <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
            <p>
              <strong>Why this data is required:</strong> The institute administration and faculty council use these details to assign you to the correct batch schedule, configure computer-based mock tests, and send automated attendance reports to parents.
            </p>
          </div>

          {/* Section 1: Basic Personal Info */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-2">
              <User className="w-3.5 h-3.5 text-blue-600" />
              <span>1. Student Identity Information</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Full Student Name <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Aryan Deshmukh"
                    className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white text-slate-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Mobile / WhatsApp Number <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="tel"
                    required
                    value={formData.mobile}
                    onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                    placeholder="e.g. 9876543210"
                    className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white text-slate-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="e.g. student@gmail.com"
                    className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white text-slate-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  City & State <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    placeholder="e.g. Nagpur, Maharashtra"
                    className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white text-slate-900"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Academic Goals */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-2">
              <BookOpen className="w-3.5 h-3.5 text-blue-600" />
              <span>2. Academic Target & Stream</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Target Competitive / Board Exam <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.targetExam}
                  onChange={(e) => setFormData({ ...formData, targetExam: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white text-slate-900"
                >
                  <option value="JEE (Main + Advanced)">JEE (Main + Advanced) - Engineering</option>
                  <option value="NEET Medical UG">NEET Medical UG - MBBS / BDS</option>
                  <option value="MHT-CET Top Ranker">MHT-CET - State Engineering & Pharmacy</option>
                  <option value="11th & 12th Science Boards">11th & 12th Science (PCM / PCB Boards)</option>
                  <option value="Foundation & Olympiad (9th-10th)">Foundation (Class 9th & 10th NTSE / Olympiad)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Current Academic Standard / Class <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.currentClass}
                  onChange={(e) => setFormData({ ...formData, currentClass: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white text-slate-900"
                >
                  <option value="Class 10th Passed / Moving to 11th">Class 10th Passed / Moving to 11th</option>
                  <option value="Class 11th Science Pursuing">Class 11th Science Pursuing</option>
                  <option value="Class 12th Pursuing">Class 12th Pursuing / Board Appearing</option>
                  <option value="Class 12th Passed (Dropper / Repeater)">Class 12th Passed (Dropper / Repeater)</option>
                  <option value="Class 8th / 9th Foundation">Class 8th / 9th Foundation</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Target Exam Year
                </label>
                <div className="relative">
                  <Calendar className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <select
                    value={formData.targetYear}
                    onChange={(e) => setFormData({ ...formData, targetYear: e.target.value })}
                    className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white text-slate-900"
                  >
                    <option value="2026">2026 (Immediate Target)</option>
                    <option value="2027">2027 (2-Year Integrated)</option>
                    <option value="2028">2028 (Foundation Stream)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  School / Junior College Name
                </label>
                <div className="relative">
                  <School className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    value={formData.schoolCollege}
                    onChange={(e) => setFormData({ ...formData, schoolCollege: e.target.value })}
                    placeholder="e.g. Bhavan's Vidya Mandir / Shivaji Science"
                    className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white text-slate-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Previous Class / 10th Board Score (%)
                </label>
                <div className="relative">
                  <Award className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="number"
                    min="40"
                    max="100"
                    step="0.1"
                    value={formData.previousPercentage}
                    onChange={(e) => setFormData({ ...formData, previousPercentage: parseFloat(e.target.value) || 0 })}
                    placeholder="e.g. 92.4"
                    className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white text-slate-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Preferred Batch Timing
                </label>
                <div className="relative">
                  <Clock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <select
                    value={formData.preferredTiming}
                    onChange={(e) => setFormData({ ...formData, preferredTiming: e.target.value })}
                    className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white text-slate-900"
                  >
                    <option value="Morning 07:30 AM – 12:30 PM">Morning: 07:30 AM – 12:30 PM</option>
                    <option value="Afternoon 01:30 PM – 06:30 PM">Afternoon: 01:30 PM – 06:30 PM</option>
                    <option value="Evening 04:00 PM – 08:30 PM">Evening: 04:00 PM – 08:30 PM</option>
                    <option value="Weekend Intensive Batch">Weekend Saturday-Sunday Special</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Section 3: Parent / Guardian Info */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-2">
              <Users className="w-3.5 h-3.5 text-blue-600" />
              <span>3. Parent / Guardian Information (For Attendance & Progress SMS)</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Parent / Guardian Name
                </label>
                <input
                  type="text"
                  value={formData.parentName}
                  onChange={(e) => setFormData({ ...formData, parentName: e.target.value })}
                  placeholder="e.g. Ramesh Deshmukh"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white text-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Parent Emergency Contact Number
                </label>
                <input
                  type="tel"
                  value={formData.parentMobile}
                  onChange={(e) => setFormData({ ...formData, parentMobile: e.target.value })}
                  placeholder="e.g. 9876543299"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white text-slate-900"
                />
              </div>
            </div>
          </div>

          {/* Submission button */}
          <div className="pt-2 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="text-xs text-slate-500">
              Assigned ID: <span className="font-mono font-bold text-blue-600">{assignedLoginId}</span>
            </div>

            <button
              type="submit"
              className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-sm rounded-xl shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2 transition-all"
            >
              <span>Submit & Generate Institute Student ID Card</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>
      ) : (
        /* Celebratory Student ID Card View */
        <div className="space-y-6">
          <div className="text-center">
            <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-2">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-extrabold text-slate-900">
              Admission Registration Complete!
            </h3>
            <p className="text-xs text-slate-500 max-w-md mx-auto mt-1">
              Your details have been successfully synced with the institute administration database. The owner and faculty can now access your profile.
            </p>
          </div>

          {/* Visual Student ID Card */}
          <div className="max-w-md mx-auto bg-gradient-to-br from-slate-900 via-indigo-950 to-blue-950 text-white rounded-3xl p-6 shadow-2xl border border-blue-500/30 relative overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold shadow-md">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-extrabold tracking-tight leading-none text-white">
                    {instituteInfo.name}
                  </h4>
                  <span className="text-[10px] text-blue-300 font-medium">
                    {instituteInfo.tagline}
                  </span>
                </div>
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30">
                OFFICIAL ID
              </span>
            </div>

            {/* Profile Row */}
            <div className="flex items-start gap-4 mb-4">
              <img
                src={
                  currentUser.avatar ||
                  'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=300&q=80'
                }
                alt={formData.name}
                className="w-16 h-16 rounded-2xl object-cover border-2 border-white/20 shadow-md"
              />

              <div className="space-y-1 min-w-0 flex-1">
                <h5 className="text-base font-extrabold text-white truncate">
                  {formData.name}
                </h5>
                <div className="inline-block px-2 py-0.5 rounded-md bg-blue-500/20 text-blue-300 text-[11px] font-semibold border border-blue-400/30">
                  {formData.targetExam}
                </div>
                <div className="text-[11px] text-slate-300">
                  Class: <span className="text-white font-medium">{formData.currentClass}</span>
                </div>
              </div>
            </div>

            {/* Credentials Grid */}
            <div className="bg-white/5 backdrop-blur-md rounded-2xl p-3 border border-white/10 grid grid-cols-2 gap-2 text-xs mb-4">
              <div>
                <span className="block text-[10px] text-slate-400 uppercase font-bold">
                  Official Login ID
                </span>
                <span className="font-mono text-sm font-black text-amber-400 tracking-wider">
                  {assignedLoginId}
                </span>
              </div>
              <div>
                <span className="block text-[10px] text-slate-400 uppercase font-bold">
                  Mobile Contact
                </span>
                <span className="font-medium text-white">{formData.mobile}</span>
              </div>
              <div>
                <span className="block text-[10px] text-slate-400 uppercase font-bold">
                  Campus City
                </span>
                <span className="font-medium text-white truncate block">{formData.city}</span>
              </div>
              <div>
                <span className="block text-[10px] text-slate-400 uppercase font-bold">
                  Batch Timing
                </span>
                <span className="font-medium text-white truncate block">{formData.preferredTiming.split(' ')[0]}</span>
              </div>
            </div>

            {/* Barcode simulation */}
            <div className="flex items-center justify-between border-t border-white/10 pt-3">
              <div className="space-y-1">
                <div className="h-5 flex items-center gap-0.5">
                  {[3, 1, 2, 4, 1, 3, 2, 1, 4, 2, 3, 1, 2, 1, 3, 4, 1, 2, 3, 1, 2].map((w, idx) => (
                    <div
                      key={idx}
                      className="bg-white/80 h-full"
                      style={{ width: `${w * 1.5}px` }}
                    />
                  ))}
                </div>
                <span className="font-mono text-[9px] text-slate-400 block tracking-widest">
                  *{assignedLoginId}*
                </span>
              </div>

              <div className="text-right">
                <span className="text-[9px] text-slate-400 block">Authorized Signature</span>
                <span className="text-[10px] font-bold text-blue-300">
                  {instituteInfo.director}
                </span>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              type="button"
              onClick={handlePrintCard}
              className="w-full sm:w-auto px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-xl transition-all flex items-center justify-center gap-2 border border-slate-300"
            >
              <Printer className="w-4 h-4" />
              <span>Print / Download ID Card</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setShowOnboardingModal(false);
              }}
              className="w-full sm:w-auto px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
            >
              <span>Proceed to Student Portal</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </Modal>
  );
};
