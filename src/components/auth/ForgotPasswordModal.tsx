import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { useApp } from '../../context/AppContext';
import { Mail, CheckCircle, ArrowLeft } from 'lucide-react';

interface ForgotPasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBackToLogin: () => void;
}

export const ForgotPasswordModal: React.FC<ForgotPasswordModalProps> = ({
  isOpen,
  onClose,
  onBackToLogin,
}) => {
  const { addToast } = useApp();
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
    addToast(`Password reset link sent to ${email}`, 'info');
  };

  const resetState = () => {
    setSubmitted(false);
    setEmail('');
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={resetState}
      title="Reset Account Password"
      subtitle="We will send you a secure one-time verification link"
      maxWidth="md"
    >
      {submitted ? (
        <div className="text-center py-4 space-y-3">
          <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle className="w-6 h-6" />
          </div>
          <h4 className="text-base font-bold text-slate-900">Check Your Inbox</h4>
          <p className="text-xs text-slate-500 leading-relaxed max-w-xs mx-auto">
            We sent instructions to <strong className="text-slate-700">{email}</strong>. If you do not see it within 2 minutes, check your spam folder.
          </p>
          <div className="pt-3">
            <button
              onClick={() => {
                resetState();
                onBackToLogin();
              }}
              className="text-xs font-semibold text-blue-600 hover:text-blue-700 inline-flex items-center gap-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Sign In
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              Registered Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <Mail className="w-4 h-4" />
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="e.g. rohan@mentora.com"
                required
                className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white text-slate-900 transition-all"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-md shadow-blue-500/25 transition-all"
          >
            Send Reset Instructions
          </button>

          <div className="text-center pt-2">
            <button
              type="button"
              onClick={() => {
                onClose();
                onBackToLogin();
              }}
              className="text-xs text-slate-500 hover:text-slate-800 font-medium inline-flex items-center gap-1"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Cancel and return to Login
            </button>
          </div>
        </form>
      )}
    </Modal>
  );
};
