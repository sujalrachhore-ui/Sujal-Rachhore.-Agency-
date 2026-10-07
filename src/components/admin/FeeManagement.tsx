import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { formatINR, exportToCSV } from '../../utils/helpers';
import { CreditCard, Plus, Search, Download, DollarSign, Clock, CheckCircle2, ShieldCheck } from 'lucide-react';
import { Modal } from '../common/Modal';

export const FeeManagement: React.FC = () => {
  const { fees, payments, students, courses, recordFeePayment, addToast } = useApp();

  const [searchTerm, setSearchTerm] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [paymentForm, setPaymentForm] = useState({
    studentId: students[0]?.id || '',
    amount: 25000,
    paymentMethod: 'UPI' as 'UPI' | 'NET_BANKING' | 'CREDIT_CARD' | 'CASH',
    notes: 'Direct office cashier clearance',
  });

  const totalCollected = payments.reduce((acc, curr) => acc + curr.amount, 0);
  const totalReceivables = fees.reduce((acc, curr) => acc + curr.dueAmount, 0);

  const filteredFees = fees.filter((f) => {
    const s = students.find((x) => x.id === f.studentId);
    return (
      s?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s?.admissionId.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const handleRecordPayment = (e: React.FormEvent) => {
    e.preventDefault();
    const targetStudent = students.find((s) => s.id === paymentForm.studentId);
    if (!targetStudent) return;

    recordFeePayment({
      studentId: targetStudent.id,
      studentName: targetStudent.name,
      amount: Number(paymentForm.amount),
      paymentDate: new Date().toISOString().split('T')[0],
      paymentMethod: paymentForm.paymentMethod,
      transactionRef: `${paymentForm.paymentMethod}/ADMIN/${Date.now().toString().slice(-6)}`,
      notes: paymentForm.notes,
    });

    setModalOpen(false);
  };

  const handleExport = () => {
    exportToCSV(
      'Mentora_Fee_Ledger_' + new Date().toISOString().split('T')[0],
      fees.map((f) => {
        const s = students.find((x) => x.id === f.studentId);
        const c = courses.find((x) => x.id === f.courseId);
        return {
          AdmissionID: s?.admissionId,
          StudentName: s?.name,
          Course: c?.name,
          TotalFees: f.totalAmount,
          Discount: f.discount,
          PaidAmount: f.paidAmount,
          DueAmount: f.dueAmount,
          DueDate: f.dueDate,
          Status: f.status,
        };
      })
    );
    addToast('Fee ledger exported to CSV', 'success');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">Fee Accounting & Ledger Management</h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Track tuition receivables, discounts, cashier payment entries, and generate vouchers.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleExport}
            className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-xl transition-colors flex items-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Ledger CSV</span>
          </button>

          <button
            onClick={() => setModalOpen(true)}
            className="px-4 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold text-xs rounded-xl shadow-md flex items-center gap-1.5 transition-all self-start sm:self-auto"
          >
            <Plus className="w-4 h-4" />
            <span>Record Cashier Payment</span>
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-xs font-bold text-slate-400 uppercase">Total Revenue Collected</span>
          <div className="text-2xl font-extrabold text-emerald-600 mt-1">{formatINR(totalCollected)}</div>
          <span className="text-[10px] text-slate-400 mt-2 block">{payments.length} transactions completed</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-xs font-bold text-slate-400 uppercase">Total Receivables Outstanding</span>
          <div className="text-2xl font-extrabold text-amber-600 mt-1">{formatINR(totalReceivables)}</div>
          <span className="text-[10px] text-amber-700 font-semibold mt-2 block">Scheduled installments active</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-xs font-bold text-slate-400 uppercase">Total Program Value</span>
          <div className="text-2xl font-extrabold text-slate-900 mt-1">{formatINR(totalCollected + totalReceivables)}</div>
          <span className="text-[10px] text-slate-400 mt-2 block">Academic year gross booking</span>
        </div>
      </div>

      {/* Filter and Table */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs space-y-4">
        <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-50/50">
          <h3 className="font-bold text-slate-900 text-sm">Student Fee Accounts ({filteredFees.length})</h3>

          <div className="relative w-64">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Filter student or admission ID..."
              className="w-full pl-8 pr-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs focus:ring-1 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50 text-slate-500 uppercase tracking-wider font-bold">
                <th className="p-3.5 pl-6">Student & ID</th>
                <th className="p-3.5">Course Program</th>
                <th className="p-3.5">Total Fee</th>
                <th className="p-3.5">Concession</th>
                <th className="p-3.5">Amount Paid</th>
                <th className="p-3.5">Outstanding Balance</th>
                <th className="p-3.5 pr-6 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filteredFees.map((fee) => {
                const s = students.find((x) => x.id === fee.studentId);
                const c = courses.find((x) => x.id === fee.courseId);

                return (
                  <tr key={fee.id} className="hover:bg-slate-50 transition-colors">
                    <td className="p-3.5 pl-6">
                      <div className="font-bold text-slate-900 text-sm">{s?.name}</div>
                      <div className="text-[10px] text-blue-600 font-mono font-semibold">{s?.admissionId}</div>
                    </td>

                    <td className="p-3.5 font-medium">{c?.name}</td>
                    <td className="p-3.5 font-bold text-slate-900">{formatINR(fee.totalAmount)}</td>
                    <td className="p-3.5 text-emerald-600 font-semibold">{formatINR(fee.discount)}</td>
                    <td className="p-3.5 font-bold text-blue-600">{formatINR(fee.paidAmount)}</td>
                    <td className="p-3.5 font-extrabold text-amber-600">{formatINR(fee.dueAmount)}</td>
                    <td className="p-3.5 pr-6 text-right">
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                          fee.status === 'PAID'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {fee.status}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Record Payment Modal */}
      {modalOpen && (
        <Modal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          title="Record Counter Fee Payment"
          subtitle="Generate instant voucher receipt for cash, cheque or POS payments"
          maxWidth="md"
        >
          <form onSubmit={handleRecordPayment} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Select Student Account *
              </label>
              <select
                value={paymentForm.studentId}
                onChange={(e) => setPaymentForm({ ...paymentForm, studentId: e.target.value })}
                className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-semibold text-slate-900"
              >
                {students.map((s) => {
                  const f = fees.find((fee) => fee.studentId === s.id);
                  return (
                    <option key={s.id} value={s.id}>
                      {s.name} ({s.admissionId}) — Due: {formatINR(f?.dueAmount || 0)}
                    </option>
                  );
                })}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Payment Amount (₹) *
              </label>
              <input
                type="number"
                required
                min="500"
                value={paymentForm.amount}
                onChange={(e) => setPaymentForm({ ...paymentForm, amount: Number(e.target.value) })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-900"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Payment Channel
              </label>
              <select
                value={paymentForm.paymentMethod}
                onChange={(e) => setPaymentForm({ ...paymentForm, paymentMethod: e.target.value as any })}
                className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900"
              >
                <option value="UPI">UPI / PhonePe / Google Pay</option>
                <option value="NET_BANKING">Direct Bank Transfer / NEFT</option>
                <option value="CREDIT_CARD">POS Debit / Credit Card</option>
                <option value="CASH">Cash Counter</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Cashier Remarks / Transaction Note
              </label>
              <input
                type="text"
                value={paymentForm.notes}
                onChange={(e) => setPaymentForm({ ...paymentForm, notes: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900"
              />
            </div>

            <div className="pt-2 flex justify-end gap-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-xs"
              >
                Confirm Payment & Generate Voucher
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};
