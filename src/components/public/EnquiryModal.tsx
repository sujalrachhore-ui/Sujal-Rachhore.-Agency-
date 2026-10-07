import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { useApp } from '../../context/AppContext';
import { Send, CheckCircle2, User, Mail, Phone, BookOpen, GraduationCap, MessageSquare } from 'lucide-react';

interface EnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedCourse?: string;
}

export const EnquiryModal: React.FC<EnquiryModalProps> = ({
  isOpen,
  onClose,
  preselectedCourse,
}) => {
  const { createEnquiry, courses, instituteInfo } = useApp();
  const [formData, setFormData] = useState({
    studentName: '',
    email: '',
    mobile: '',
    courseInterested: preselectedCourse || 'JEE (Main + Advanced) Comprehensive',
    currentClass: 'Class 10th Passed / Moving to 11th',
    message: '',
  });
  const [submittedId, setSubmittedId] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.studentName || !formData.mobile) return;
    const newEnq = createEnquiry(formData);
    setSubmittedId(newEnq.id);
  };

  const handleReset = () => {
    setSubmittedId(null);
    setFormData({
      studentName: '',
      email: '',
      mobile: '',
      courseInterested: 'JEE (Main + Advanced) Comprehensive',
      currentClass: 'Class 10th Passed / Moving to 11th',
      message: '',
    });
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleReset}
      title="Admission & Scholarship Enquiry"
      subtitle="Speak with our Senior Academic Counselors & Faculty"
      maxWidth="lg"
    >
      {submittedId ? (
        <div className="py-6 text-center space-y-4">
          <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h4 className="text-xl font-bold text-slate-900">Enquiry Registered!</h4>
          <p className="text-sm text-slate-600 max-w-sm mx-auto leading-relaxed">
            Thank you, <strong className="text-slate-800">{formData.studentName}</strong>. Your enquiry ticket ID is{' '}
            <span className="font-mono font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
              #{submittedId.slice(-6).toUpperCase()}
            </span>
            .
          </p>
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl max-w-md mx-auto text-xs text-slate-600 text-left">
            <p className="font-semibold text-slate-800 mb-1">What happens next?</p>
            <ul className="list-disc pl-4 space-y-1">
              <li>Our academic counselor will call on {formData.mobile} within 2 hours.</li>
              <li>You will receive the complete syllabus breakdown and fee concession structure.</li>
              <li>Free demo lecture slot booked at our Dharampeth, Nagpur center.</li>
            </ul>
          </div>
          <div className="pt-2 flex justify-center gap-3">
            <a
              href={`https://wa.me/${instituteInfo.whatsapp}?text=Hello%20Mentora%20Institute,%20I%20have%20submitted%20admission%20enquiry%20ticket%20${submittedId.slice(-6)}`}
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-xs rounded-lg transition-colors flex items-center gap-1.5 shadow-sm"
            >
              Direct WhatsApp Follow-up
            </a>
            <button
              onClick={handleReset}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium text-xs rounded-lg transition-colors"
            >
              Close Window
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-3.5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Student Full Name *
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  required
                  value={formData.studentName}
                  onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
                  placeholder="e.g. Aryan Deshmukh"
                  className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white text-slate-900"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Mobile Number *
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
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Email Address (Optional)
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
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Current Class / Standard
              </label>
              <div className="relative">
                <GraduationCap className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <select
                  value={formData.currentClass}
                  onChange={(e) => setFormData({ ...formData, currentClass: e.target.value })}
                  className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white text-slate-900 appearance-none"
                >
                  <option>Class 8th / 9th Foundation</option>
                  <option>Class 10th Appearing</option>
                  <option>Class 10th Passed / Moving to 11th</option>
                  <option>Class 11th Pursuing</option>
                  <option>Class 12th Board Appearing</option>
                  <option>Class 12th Passed (Dropper / Repeater)</option>
                </select>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
              Program / Course of Interest
            </label>
            <div className="relative">
              <BookOpen className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <select
                value={formData.courseInterested}
                onChange={(e) => setFormData({ ...formData, courseInterested: e.target.value })}
                className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white text-slate-900 appearance-none"
              >
                {courses.map((c) => (
                  <option key={c.id} value={c.name}>
                    {c.name} ({c.duration})
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
              Specific Query / Target Goal
            </label>
            <div className="relative">
              <MessageSquare className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <textarea
                rows={2}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Mention previous board percentage, scholarship test interest, or hostel accommodation requirements..."
                className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white text-slate-900"
              />
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-2.5 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-xl shadow-md shadow-blue-500/25 flex items-center justify-center gap-2 transition-all"
            >
              <Send className="w-4 h-4" />
              <span>Submit Enquiry & Get Free Counseling Call</span>
            </button>
          </div>
        </form>
      )}
    </Modal>
  );
};
