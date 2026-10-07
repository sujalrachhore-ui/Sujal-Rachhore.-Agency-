import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { HelpCircle, Send, MessageCircle, Phone, Mail, Clock, CheckCircle2 } from 'lucide-react';

export const StudentSupport: React.FC = () => {
  const { currentStudentProfile, instituteInfo, addToast } = useApp();
  const student = currentStudentProfile;

  const [ticketSubject, setTicketSubject] = useState('Academic Doubts & Revision Clinic');
  const [ticketMessage, setTicketMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ticketMessage) return;
    setSubmitted(true);
    addToast('Support ticket #TK-' + Math.floor(1000 + Math.random() * 9000) + ' opened. Counselor assigned.', 'success');
    setTimeout(() => {
      setSubmitted(false);
      setTicketMessage('');
    }, 4000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">Student Support & Grievance Cell</h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Submit a query to your batch mentor or connect directly with student counseling.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Support Channels */}
        <div className="md:col-span-5 space-y-4">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            <h3 className="font-bold text-slate-900 text-sm border-b border-slate-100 pb-3">
              Direct Contact Lines
            </h3>

            <div className="space-y-3 text-xs text-slate-600">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <strong className="text-slate-900 block font-semibold">Nagpur Student Helpline</strong>
                  <a href={`tel:${instituteInfo.phone}`} className="font-mono text-blue-600 font-bold">
                    {instituteInfo.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <strong className="text-slate-900 block font-semibold">Academic Helpdesk Email</strong>
                  <span>support@mentoraacademy.demo</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <strong className="text-slate-900 block font-semibold">Active Desk Hours</strong>
                  <span>Mon – Sat: 08:00 AM – 07:00 PM</span>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <a
                href={`https://wa.me/${instituteInfo.whatsapp}?text=Hello%20Mentor,%20I%20am%20student%20${student?.name}%20(ID:%20${student?.admissionId})%20and%20need%20academic%20assistance.`}
                target="_blank"
                rel="noreferrer"
                className="w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs rounded-xl flex items-center justify-center gap-2 shadow-xs transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat with Mentor on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>

        {/* Ticket Submission Form */}
        <div className="md:col-span-7">
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs">
            <h3 className="font-bold text-slate-900 text-base mb-1">Log an Academic Ticket</h3>
            <p className="text-xs text-slate-500 mb-5">
              Submit your request directly to Dr. Arjun Mehta’s academic monitoring cell.
            </p>

            {submitted ? (
              <div className="p-6 bg-emerald-50 rounded-xl border border-emerald-200 text-center space-y-2">
                <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
                <h4 className="font-bold text-slate-900 text-sm">Ticket Logged Successfully</h4>
                <p className="text-xs text-slate-600">
                  Your academic coordinator will call or email you with resolution within 4 working hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                    Query Category
                  </label>
                  <select
                    value={ticketSubject}
                    onChange={(e) => setTicketSubject(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-medium focus:ring-1 focus:ring-blue-500 text-slate-900"
                  >
                    <option>Academic Doubts & Revision Clinic</option>
                    <option>Batch Shift Request</option>
                    <option>CBT Portal Technical Issue</option>
                    <option>Fee Receipt / Payment Clarification</option>
                    <option>Library Card & Study Material Reissue</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                    Describe your Query / Challenge
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={ticketMessage}
                    onChange={(e) => setTicketMessage(e.target.value)}
                    placeholder="Provide details about the chapter or issue you are experiencing..."
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:ring-1 focus:ring-blue-500 text-slate-900"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs sm:text-sm rounded-xl shadow-xs flex items-center justify-center gap-2 transition-colors"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit Ticket</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
