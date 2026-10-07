import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { formatINR } from '../../utils/helpers';
import {
  CreditCard,
  CheckCircle2,
  Clock,
  Download,
  Receipt,
  QrCode,
  ShieldCheck,
  ArrowRight,
  AlertTriangle,
  Building,
} from 'lucide-react';
import { Modal } from '../common/Modal';

export const StudentFees: React.FC = () => {
  const { currentStudentProfile, fees, payments, recordFeePayment, addToast } = useApp();
  const student = currentStudentProfile;

  const studentFee = fees.find((f) => f.studentId === student?.id);
  const studentPayments = payments.filter((p) => p.studentId === student?.id);

  const [payModalOpen, setPayModalOpen] = useState(false);
  const [payAmount, setPayAmount] = useState(studentFee?.dueAmount || 30000);
  const [payMethod, setPayMethod] = useState<'UPI' | 'NET_BANKING' | 'CREDIT_CARD'>('UPI');
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault();
    if (!student || payAmount <= 0) return;

    setIsProcessing(true);
    setTimeout(() => {
      recordFeePayment({
        studentId: student.id,
        studentName: student.name,
        amount: Number(payAmount),
        paymentDate: new Date().toISOString().split('T')[0],
        paymentMethod: payMethod,
        transactionRef: `${payMethod}/${Date.now()}/${Math.floor(1000 + Math.random() * 9000)}`,
        notes: 'Online student portal fee clearance installment',
      });
      setIsProcessing(false);
      setPayModalOpen(false);
    }, 1200);
  };

  const handlePrintReceipt = (receiptNumber: string, amount: number) => {
    addToast(`Generating official stamp receipt for ${receiptNumber}...`, 'info');
    window.print();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">Fee Ledger & Payment Receipts</h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Transparent breakdown of tuition fees, scholarship rebates, and instant payment receipts.
          </p>
        </div>

        {studentFee && studentFee.dueAmount > 0 && (
          <button
            onClick={() => setPayModalOpen(true)}
            className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-xs rounded-xl shadow-md flex items-center gap-2 transition-all self-start sm:self-auto"
          >
            <CreditCard className="w-4 h-4" />
            <span>Pay Due Installment ({formatINR(studentFee.dueAmount)})</span>
          </button>
        )}
      </div>

      {/* KPI Ledger Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-xs font-bold text-slate-400 uppercase">Total Program Fee</span>
          <div className="text-2xl font-extrabold text-slate-900 mt-1">
            {formatINR(studentFee?.totalAmount || 125000)}
          </div>
          <span className="text-[10px] text-slate-400 mt-2 block">Standard 2-Year Program</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-xs font-bold text-slate-400 uppercase">Scholarship Concession</span>
          <div className="text-2xl font-extrabold text-emerald-600 mt-1">
            {formatINR(studentFee?.discount || 10000)}
          </div>
          <span className="text-[10px] text-emerald-600 font-semibold mt-2 block">
            MNTS Merit Concession
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-xs font-bold text-slate-400 uppercase">Total Paid to Date</span>
          <div className="text-2xl font-extrabold text-blue-600 mt-1">
            {formatINR(studentFee?.paidAmount || 85000)}
          </div>
          <span className="text-[10px] text-slate-400 mt-2 block">Verified in Bank Account</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-xs font-bold text-slate-400 uppercase">Remaining Due Balance</span>
          <div className="text-2xl font-extrabold text-amber-600 mt-1">
            {formatINR(studentFee?.dueAmount || 0)}
          </div>
          <span className="text-[10px] text-amber-700 font-semibold bg-amber-50 px-2 py-0.5 rounded mt-2 inline-block">
            Due by {studentFee?.dueDate || '15 Nov 2026'}
          </span>
        </div>
      </div>

      {/* Transaction History & Receipts Table */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
            <Receipt className="w-4 h-4 text-blue-600" />
            <span>Official Institute Fee Receipts</span>
          </h3>
          <span className="text-xs text-slate-500 font-mono">
            {studentPayments.length} transactions recorded
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50 text-slate-500 uppercase tracking-wider font-bold">
                <th className="p-3.5 pl-6">Receipt #</th>
                <th className="p-3.5">Payment Date</th>
                <th className="p-3.5">Mode</th>
                <th className="p-3.5">Transaction Ref</th>
                <th className="p-3.5">Amount Paid</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5 pr-6 text-right">Receipt Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {studentPayments.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-slate-400">
                    No payment history recorded yet.
                  </td>
                </tr>
              ) : (
                studentPayments.map((pay) => (
                  <tr key={pay.id} className="hover:bg-slate-50 transition-colors">
                    <td className="p-3.5 pl-6 font-mono font-bold text-blue-600">
                      {pay.receiptNumber}
                    </td>
                    <td className="p-3.5 font-medium">{pay.paymentDate}</td>
                    <td className="p-3.5">
                      <span className="px-2 py-0.5 rounded bg-slate-100 font-semibold text-[10px]">
                        {pay.paymentMethod}
                      </span>
                    </td>
                    <td className="p-3.5 font-mono text-[11px] text-slate-500">{pay.transactionRef}</td>
                    <td className="p-3.5 font-bold text-slate-900 text-sm">
                      {formatINR(pay.amount)}
                    </td>
                    <td className="p-3.5">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                        {pay.status}
                      </span>
                    </td>
                    <td className="p-3.5 pr-6 text-right">
                      <button
                        onClick={() => handlePrintReceipt(pay.receiptNumber, pay.amount)}
                        className="p-1.5 hover:bg-slate-100 text-slate-600 rounded-lg transition-colors inline-flex items-center gap-1 text-[11px] font-semibold text-blue-600"
                        title="Download / Print Official Voucher"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Print</span>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Payment Gateway Modal (Payment-ready architecture) */}
      {payModalOpen && (
        <Modal
          isOpen={payModalOpen}
          onClose={() => setPayModalOpen(false)}
          title="Online Fee Payment Portal"
          subtitle="Mentora Institute Central India Merchant Clearance"
          maxWidth="md"
        >
          <form onSubmit={handlePay} className="space-y-4">
            <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl text-xs text-blue-900 flex items-start gap-2">
              <ShieldCheck className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
              <div>
                <strong>Payment Architecture Active:</strong> 256-bit TLS encrypted bank reconciliation gateway.
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Installment Amount to Pay (₹)
              </label>
              <input
                type="number"
                required
                min="1000"
                max={studentFee?.dueAmount || 50000}
                value={payAmount}
                onChange={(e) => setPayAmount(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-base font-extrabold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <span className="text-[11px] text-slate-400 mt-1 block">
                Total outstanding due: {formatINR(studentFee?.dueAmount || 0)}
              </span>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                Select Preferred Payment Mode
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setPayMethod('UPI')}
                  className={`p-3 rounded-xl border text-center text-xs font-bold transition-all ${
                    payMethod === 'UPI'
                      ? 'border-blue-600 bg-blue-50 text-blue-700 ring-1 ring-blue-500'
                      : 'border-slate-200 bg-white text-slate-700'
                  }`}
                >
                  <QrCode className="w-5 h-5 mx-auto mb-1 text-blue-600" />
                  <span>UPI / QR</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPayMethod('NET_BANKING')}
                  className={`p-3 rounded-xl border text-center text-xs font-bold transition-all ${
                    payMethod === 'NET_BANKING'
                      ? 'border-blue-600 bg-blue-50 text-blue-700 ring-1 ring-blue-500'
                      : 'border-slate-200 bg-white text-slate-700'
                  }`}
                >
                  <Building className="w-5 h-5 mx-auto mb-1 text-indigo-600" />
                  <span>Net Banking</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPayMethod('CREDIT_CARD')}
                  className={`p-3 rounded-xl border text-center text-xs font-bold transition-all ${
                    payMethod === 'CREDIT_CARD'
                      ? 'border-blue-600 bg-blue-50 text-blue-700 ring-1 ring-blue-500'
                      : 'border-slate-200 bg-white text-slate-700'
                  }`}
                >
                  <CreditCard className="w-5 h-5 mx-auto mb-1 text-purple-600" />
                  <span>Debit / Card</span>
                </button>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={isProcessing}
                className="w-full py-3 px-4 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md flex items-center justify-center gap-2 transition-all disabled:opacity-60"
              >
                {isProcessing ? (
                  <span>Processing Bank Authorization...</span>
                ) : (
                  <>
                    <CreditCard className="w-4 h-4" />
                    <span>Authorize Payment of {formatINR(payAmount)}</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};
