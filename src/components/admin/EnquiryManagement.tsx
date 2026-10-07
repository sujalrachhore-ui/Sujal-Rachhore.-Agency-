import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Enquiry } from '../../types';
import { exportToCSV } from '../../utils/helpers';
import { Inbox, Search, Download, Phone, Mail, MessageSquare, CheckCircle2, Clock } from 'lucide-react';
import { Modal } from '../common/Modal';

export const EnquiryManagement: React.FC = () => {
  const { enquiries, updateEnquiryStatus, addToast, instituteInfo } = useApp();

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [activeEnquiry, setActiveEnquiry] = useState<Enquiry | null>(null);
  const [editNotes, setEditNotes] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<Enquiry['status']>('NEW');

  const filtered = enquiries.filter((e) => {
    const matchSearch =
      e.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      e.mobile.includes(searchTerm) ||
      e.courseInterested.toLowerCase().includes(searchTerm.toLowerCase());
    const matchStatus = statusFilter === 'ALL' || e.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const handleOpenStatusModal = (enq: Enquiry) => {
    setActiveEnquiry(enq);
    setEditNotes(enq.notes || '');
    setSelectedStatus(enq.status);
  };

  const handleSaveStatus = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeEnquiry) return;

    updateEnquiryStatus(activeEnquiry.id, selectedStatus, editNotes);
    setActiveEnquiry(null);
  };

  const handleExport = () => {
    exportToCSV(
      'Mentora_Leads_CRM_' + new Date().toISOString().split('T')[0],
      filtered.map((e) => ({
        Name: e.studentName,
        Mobile: e.mobile,
        Email: e.email,
        Course: e.courseInterested,
        Class: e.currentClass,
        Date: e.date,
        Status: e.status,
        CounselorNotes: e.notes || '',
      }))
    );
    addToast('Enquiries exported to CSV', 'success');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">Admission Leads & CRM Pipeline</h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Track inquiries from website visitors, WhatsApp inquiries, and walk-in applicants.
          </p>
        </div>

        <button
          onClick={handleExport}
          className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-xl transition-colors flex items-center gap-1.5 self-start sm:self-auto"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Export Leads CSV</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          <div className="relative w-full sm:w-64">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search candidate or phone..."
              className="w-full pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div className="flex items-center gap-1.5">
            {['ALL', 'NEW', 'CONTACTED', 'FOLLOW_UP', 'CONVERTED', 'CLOSED'].map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                  statusFilter === st
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {st === 'ALL' ? 'All Leads' : st}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Enquiries Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((enq) => (
          <div
            key={enq.id}
            className="p-6 bg-white rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                  #{enq.id.slice(-5)}
                </span>
                <span
                  className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full uppercase ${
                    enq.status === 'NEW'
                      ? 'bg-blue-100 text-blue-800'
                      : enq.status === 'CONVERTED'
                      ? 'bg-emerald-100 text-emerald-800'
                      : enq.status === 'CONTACTED'
                      ? 'bg-purple-100 text-purple-800'
                      : 'bg-amber-100 text-amber-800'
                  }`}
                >
                  {enq.status}
                </span>
              </div>

              <div>
                <h3 className="font-bold text-slate-900 text-base">{enq.studentName}</h3>
                <span className="text-xs text-blue-600 font-semibold block">{enq.courseInterested}</span>
                <span className="text-[11px] text-slate-400">{enq.currentClass}</span>
              </div>

              <div className="space-y-1 text-xs text-slate-600 pt-2 border-t border-slate-100">
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-slate-400" />
                  <a href={`tel:${enq.mobile}`} className="font-mono font-bold text-slate-800 hover:text-blue-600">
                    {enq.mobile}
                  </a>
                </div>
                {enq.email && (
                  <div className="flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5 text-slate-400" />
                    <span className="truncate">{enq.email}</span>
                  </div>
                )}
              </div>

              {enq.message && (
                <p className="text-xs text-slate-500 italic bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                  "{enq.message}"
                </p>
              )}

              {enq.notes && (
                <div className="text-[11px] text-amber-900 bg-amber-50 p-2 rounded-lg border border-amber-200">
                  <strong>Counselor Note:</strong> {enq.notes}
                </div>
              )}
            </div>

            <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[10px] text-slate-400">{enq.date.split('T')[0]}</span>
              <button
                onClick={() => handleOpenStatusModal(enq)}
                className="px-3 py-1.5 bg-blue-50 text-blue-700 hover:bg-blue-100 rounded-lg text-xs font-bold transition-colors"
              >
                Update Pipeline
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Status Modal */}
      {activeEnquiry && (
        <Modal
          isOpen={!!activeEnquiry}
          onClose={() => setActiveEnquiry(null)}
          title={`Update Status: ${activeEnquiry.studentName}`}
          subtitle={`Interested in ${activeEnquiry.courseInterested}`}
          maxWidth="sm"
        >
          <form onSubmit={handleSaveStatus} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                CRM Pipeline Stage
              </label>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value as any)}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-semibold text-slate-900"
              >
                <option value="NEW">NEW - Uncontacted Lead</option>
                <option value="CONTACTED">CONTACTED - Call Completed</option>
                <option value="FOLLOW_UP">FOLLOW_UP - Demo Scheduled / Pending</option>
                <option value="CONVERTED">CONVERTED - Admission Enrolled</option>
                <option value="CLOSED">CLOSED - Not Interested</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Follow-up Counselor Notes
              </label>
              <textarea
                rows={3}
                value={editNotes}
                onChange={(e) => setEditNotes(e.target.value)}
                placeholder="Log discussion points, demo lecture attendance, fee concessions offered..."
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900"
              />
            </div>

            <div className="pt-2 flex justify-end gap-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setActiveEnquiry(null)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-xs"
              >
                Update Lead
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};
