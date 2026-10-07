import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { useApp } from '../../context/AppContext';
import { Role } from '../../types';
import {
  Lock,
  Mail,
  Smartphone,
  ShieldCheck,
  UserCheck,
  GraduationCap,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  KeyRound,
  RotateCcw,
} from 'lucide-react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onForgotPassword: () => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({
  isOpen,
  onClose,
  onForgotPassword,
}) => {
  const {
    login,
    loginWithGoogle,
    loginWithMobile,
    loginWithEmail,
    switchDemoUser,
    addToast,
    instituteInfo,
  } = useApp();

  const [activeTab, setActiveTab] = useState<'google' | 'mobile' | 'email'>('google');

  // Google flow states
  const [googleEmail, setGoogleEmail] = useState('sujalrachhore@gmail.com');
  const [googleName, setGoogleName] = useState('Sujal Rachhore');
  const [isGoogleCustom, setIsGoogleCustom] = useState(false);

  // Mobile flow states
  const [mobileNumber, setMobileNumber] = useState('');
  const [mobileStudentName, setMobileStudentName] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpCode, setOtpCode] = useState('123456');

  // Email flow states
  const [emailIdentifier, setEmailIdentifier] = useState('student@mentora.com');
  const [emailPassword, setEmailPassword] = useState('password123');
  const [isNewRegistration, setIsNewRegistration] = useState(false);
  const [registerName, setRegisterName] = useState('');

  // Handle Google Login
  const handleGoogleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!googleEmail.trim()) {
      addToast('Please enter your Google Email address', 'error');
      return;
    }
    const success = loginWithGoogle(
      googleEmail.trim(),
      googleName.trim() || googleEmail.split('@')[0],
      'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=300&q=80'
    );
    if (success) {
      onClose();
    }
  };

  // Handle Mobile OTP flow
  const handleSendMobileOtp = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanMobile = mobileNumber.replace(/\D/g, '');
    if (cleanMobile.length < 10) {
      addToast('Please enter a valid 10-digit mobile number', 'error');
      return;
    }
    setOtpSent(true);
    addToast(`OTP sent to +91 ${cleanMobile}! Demo code is 123456.`, 'info');
  };

  const handleVerifyMobileOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!otpCode || otpCode.trim() !== '123456') {
      addToast('Invalid OTP! Please enter demo code 123456.', 'error');
      return;
    }
    const cleanMobile = mobileNumber.replace(/\D/g, '');
    const success = loginWithMobile(cleanMobile, mobileStudentName || undefined);
    if (success) {
      onClose();
    }
  };

  // Handle Standard Email Login
  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailIdentifier.trim()) {
      addToast('Please enter your email', 'error');
      return;
    }

    if (isNewRegistration) {
      const success = loginWithEmail(
        emailIdentifier.trim(),
        emailPassword,
        registerName.trim() || undefined
      );
      if (success) {
        onClose();
      }
    } else {
      const success = login(emailIdentifier);
      if (success) {
        onClose();
      }
    }
  };

  const handleQuickDemo = (role: Role) => {
    switchDemoUser(role);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Mentora Student & Member Login"
      subtitle="Sign in via Google, Mobile OTP, or Email to access your classes, tests, & admit ID"
      maxWidth="md"
    >
      {/* 1-Click Demo Personas Strip for fast evaluation */}
      <div className="mb-4 p-3 bg-slate-50 border border-slate-200 rounded-2xl">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
            Instant 1-Click Demo Personas
          </span>
          <span className="text-[10px] font-medium text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full font-mono">
            Fast Preview
          </span>
        </div>
        <div className="grid grid-cols-3 gap-2">
          <button
            type="button"
            onClick={() => handleQuickDemo('STUDENT')}
            className="flex flex-col items-center justify-center p-2 rounded-xl bg-white border border-slate-200 hover:border-blue-500 hover:bg-blue-50/50 hover:shadow-xs transition-all group"
          >
            <div className="w-7 h-7 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mb-1 group-hover:scale-105 transition-transform">
              <GraduationCap className="w-3.5 h-3.5" />
            </div>
            <span className="text-xs font-bold text-slate-800">Student</span>
            <span className="text-[10px] text-slate-400">Rohan (JEE)</span>
          </button>

          <button
            type="button"
            onClick={() => handleQuickDemo('ADMIN')}
            className="flex flex-col items-center justify-center p-2 rounded-xl bg-white border border-slate-200 hover:border-amber-500 hover:bg-amber-50/50 hover:shadow-xs transition-all group"
          >
            <div className="w-7 h-7 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center mb-1 group-hover:scale-105 transition-transform">
              <ShieldCheck className="w-3.5 h-3.5" />
            </div>
            <span className="text-xs font-bold text-slate-800">Owner/Admin</span>
            <span className="text-[10px] text-slate-400">Dr. Arjun Mehta</span>
          </button>

          <button
            type="button"
            onClick={() => handleQuickDemo('TEACHER')}
            className="flex flex-col items-center justify-center p-2 rounded-xl bg-white border border-slate-200 hover:border-purple-500 hover:bg-purple-50/50 hover:shadow-xs transition-all group"
          >
            <div className="w-7 h-7 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center mb-1 group-hover:scale-105 transition-transform">
              <UserCheck className="w-3.5 h-3.5" />
            </div>
            <span className="text-xs font-bold text-slate-800">Faculty</span>
            <span className="text-[10px] text-slate-400">Prof. Priya</span>
          </button>
        </div>
      </div>

      {/* Login Methods Navigation Tabs */}
      <div className="grid grid-cols-3 gap-1 p-1 bg-slate-100 rounded-xl mb-5 text-xs font-bold">
        <button
          type="button"
          onClick={() => setActiveTab('google')}
          className={`py-2 px-1 rounded-lg flex items-center justify-center gap-1.5 transition-all ${
            activeTab === 'google'
              ? 'bg-white text-slate-900 shadow-xs'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <span className="text-red-500 font-extrabold text-sm">G</span>
          <span>Google</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('mobile')}
          className={`py-2 px-1 rounded-lg flex items-center justify-center gap-1.5 transition-all ${
            activeTab === 'mobile'
              ? 'bg-white text-slate-900 shadow-xs'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <Smartphone className="w-3.5 h-3.5 text-purple-600" />
          <span>Mobile OTP</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('email')}
          className={`py-2 px-1 rounded-lg flex items-center justify-center gap-1.5 transition-all ${
            activeTab === 'email'
              ? 'bg-white text-slate-900 shadow-xs'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <Mail className="w-3.5 h-3.5 text-blue-600" />
          <span>Email ID</span>
        </button>
      </div>

      {/* TAB 1: GOOGLE SIGN-IN */}
      {activeTab === 'google' && (
        <div className="space-y-4">
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-center">
            <div className="w-12 h-12 bg-white rounded-2xl border border-slate-200 shadow-xs flex items-center justify-center mx-auto mb-3">
              <svg className="w-6 h-6" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
                />
                <path
                  fill="#34A853"
                  d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 10.03 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
                />
                <path
                  fill="#EA4335"
                  d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                />
              </svg>
            </div>

            <h4 className="text-sm font-bold text-slate-800">
              One-Click Google Authentication
            </h4>
            <p className="text-xs text-slate-500 mt-1">
              Sign in with your Google account. We will immediately assign your unique Mentora Login ID!
            </p>

            {/* Account Quick Selectors */}
            <div className="mt-4 space-y-2 text-left">
              <button
                type="button"
                onClick={() => {
                  setGoogleEmail('sujalrachhore@gmail.com');
                  setGoogleName('Sujal Rachhore');
                  handleGoogleSubmit();
                }}
                className="w-full flex items-center justify-between p-2.5 rounded-xl bg-white border border-slate-200 hover:border-blue-500 hover:shadow-xs transition-all group"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-600 text-white font-bold text-xs flex items-center justify-center">
                    S
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-800 group-hover:text-blue-600">
                      Sujal Rachhore
                    </div>
                    <div className="text-[11px] text-slate-400">sujalrachhore@gmail.com</div>
                  </div>
                </div>
                <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md">
                  Sign in
                </span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setGoogleEmail('student.nagpur@gmail.com');
                  setGoogleName('Aditya Deshmukh');
                  handleGoogleSubmit();
                }}
                className="w-full flex items-center justify-between p-2.5 rounded-xl bg-white border border-slate-200 hover:border-blue-500 hover:shadow-xs transition-all group"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-500 to-pink-500 text-white font-bold text-xs flex items-center justify-center">
                    A
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-800 group-hover:text-blue-600">
                      Aditya Deshmukh (Aspirant)
                    </div>
                    <div className="text-[11px] text-slate-400">student.nagpur@gmail.com</div>
                  </div>
                </div>
                <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md">
                  Sign in
                </span>
              </button>
            </div>

            {/* Custom Google Email Toggle */}
            <div className="mt-3 pt-3 border-t border-slate-200/80">
              {!isGoogleCustom ? (
                <button
                  type="button"
                  onClick={() => setIsGoogleCustom(true)}
                  className="text-xs text-blue-600 hover:underline font-semibold"
                >
                  Or enter another Google account
                </button>
              ) : (
                <form onSubmit={handleGoogleSubmit} className="space-y-2 mt-2 text-left">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 mb-1">
                      Your Google Email:
                    </label>
                    <input
                      type="email"
                      required
                      value={googleEmail}
                      onChange={(e) => setGoogleEmail(e.target.value)}
                      placeholder="yourname@gmail.com"
                      className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 mb-1">
                      Your Full Name:
                    </label>
                    <input
                      type="text"
                      value={googleName}
                      onChange={(e) => setGoogleName(e.target.value)}
                      placeholder="e.g. Sujal"
                      className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-xs transition-all flex items-center justify-center gap-1.5"
                  >
                    <span>Authorize with Google</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: MOBILE NUMBER + OTP */}
      {activeTab === 'mobile' && (
        <div>
          {!otpSent ? (
            <form onSubmit={handleSendMobileOtp} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5 uppercase tracking-wider">
                  Student Name (Optional for new users)
                </label>
                <input
                  type="text"
                  value={mobileStudentName}
                  onChange={(e) => setMobileStudentName(e.target.value)}
                  placeholder="e.g. Yash Patil"
                  className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white text-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5 uppercase tracking-wider">
                  10-Digit Mobile Number <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 font-bold text-xs">
                    +91
                  </div>
                  <input
                    type="tel"
                    required
                    maxLength={10}
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value)}
                    placeholder="9876543210"
                    className="w-full pl-12 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white text-slate-900 tracking-wider font-semibold"
                  />
                </div>
                <span className="text-[11px] text-slate-400 mt-1 block">
                  You will receive a fast 6-digit OTP code to verify and provision your Login ID.
                </span>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 px-4 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
              >
                <span>Send Verification OTP</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          ) : (
            <form onSubmit={handleVerifyMobileOtp} className="space-y-4">
              <div className="p-3 bg-purple-50 border border-purple-200 rounded-xl text-xs text-purple-900 flex items-center justify-between">
                <div>
                  <span className="block font-bold">OTP code dispatched!</span>
                  <span className="text-[11px] text-purple-700">Sent to +91 {mobileNumber}</span>
                </div>
                <button
                  type="button"
                  onClick={() => setOtpSent(false)}
                  className="text-[11px] text-purple-700 underline font-semibold"
                >
                  Change
                </button>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5 uppercase tracking-wider">
                  Enter 6-Digit OTP Code
                </label>
                <div className="relative">
                  <KeyRound className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    maxLength={6}
                    required
                    value={otpCode}
                    onChange={(e) => setOtpCode(e.target.value)}
                    placeholder="123456"
                    className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-white text-slate-900 font-mono tracking-widest font-extrabold"
                  />
                </div>
                <span className="text-[11px] text-emerald-600 font-medium mt-1 block">
                  ✓ Demo test OTP code is <strong>123456</strong>
                </span>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 px-4 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
              >
                <span>Verify OTP & Access Portal</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}
        </div>
      )}

      {/* TAB 3: EMAIL + PASSWORD */}
      {activeTab === 'email' && (
        <form onSubmit={handleEmailSubmit} className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-700">
              {isNewRegistration ? 'Create Student Account' : 'Existing Account Login'}
            </span>
            <button
              type="button"
              onClick={() => setIsNewRegistration(!isNewRegistration)}
              className="text-xs text-blue-600 font-bold hover:underline"
            >
              {isNewRegistration ? 'Already registered? Login' : 'New student? Register'}
            </button>
          </div>

          {isNewRegistration && (
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Full Name
              </label>
              <input
                type="text"
                required
                value={registerName}
                onChange={(e) => setRegisterName(e.target.value)}
                placeholder="e.g. Rohit Sharma"
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white text-slate-900"
              />
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              Registered Email ID
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="email"
                required
                value={emailIdentifier}
                onChange={(e) => setEmailIdentifier(e.target.value)}
                placeholder="e.g. student@mentora.com"
                className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white text-slate-900"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">
                Password
              </label>
              {!isNewRegistration && (
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onForgotPassword();
                  }}
                  className="text-xs text-blue-600 hover:text-blue-700 font-medium"
                >
                  Forgot password?
                </button>
              )}
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="password"
                required
                value={emailPassword}
                onChange={(e) => setEmailPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white text-slate-900"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2.5 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
          >
            <span>{isNewRegistration ? 'Register & Generate Login ID' : 'Sign In to Portal'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      )}

      {/* Security Footer Notice */}
      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
        <span className="flex items-center gap-1">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
          <span>Encrypted Session • Role-Based RBAC</span>
        </span>
        <span>Mentora Institute CIMS</span>
      </div>
    </Modal>
  );
};
