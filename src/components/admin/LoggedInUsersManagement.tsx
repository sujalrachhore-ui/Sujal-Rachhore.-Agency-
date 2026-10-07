import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { UserLoginLog, LoginProvider } from '../../types';
import { exportToCSV, formatDate } from '../../utils/helpers';
import { Modal } from '../common/Modal';
import {
  Users,
  Search,
  Filter,
  Download,
  CheckCircle2,
  Clock,
  Smartphone,
  Mail,
  ShieldCheck,
  MapPin,
  Laptop,
  GraduationCap,
  Eye,
  Copy,
  PlusCircle,
  Sparkles,
  Phone,
  School,
  Award,
  RefreshCw,
} from 'lucide-react';

export const LoggedInUsersManagement: React.FC = () => {
  const { loginLogs, addToast, loginWithGoogle, loginWithMobile } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [providerFilter, setProviderFilter] = useState<'ALL' | LoginProvider>('ALL');
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'ONLINE' | 'OFFLINE'>('ALL');
  const [selectedLog, setSelectedLog] = useState<UserLoginLog | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Statistics
  const totalLogs = loginLogs.length;
  const onlineCount = loginLogs.filter((l) => l.status === 'ONLINE').length;
  const googleCount = loginLogs.filter((l) => l.loginProvider === 'GOOGLE').length;
  const mobileCount = loginLogs.filter((l) => l.loginProvider === 'MOBILE').length;
  const emailCount = loginLogs.filter((l) => l.loginProvider === 'EMAIL').length;
  const completedProfiles = loginLogs.filter((l) => l.profileCompleted).length;

  // Filtered logs
  const filteredLogs = loginLogs.filter((log) => {
    const matchesSearch =
      log.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.loginId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.mobile.includes(searchQuery) ||
      (log.targetExam && log.targetExam.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (log.city && log.city.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesProvider = providerFilter === 'ALL' || log.loginProvider === providerFilter;
    const matchesStatus = statusFilter === 'ALL' || log.status === statusFilter;

    return matchesSearch && matchesProvider && matchesStatus;
  });

  const handleCopy = (id: string) => {
    navigator.clipboard?.writeText(id);
    setCopiedId(id);
    addToast(`Copied Login ID ${id} to clipboard`, 'info');
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleExportCSV = () => {
    const dataToExport = filteredLogs.map((log) => ({
      'Login ID': log.loginId,
      'Full Name': log.userName,
      'Email': log.email,
      'Mobile': log.mobile,
      'Login Provider': log.loginProvider,
      'Timestamp': log.loginTimestamp,
      'Device': log.device,
      'Location': log.location,
      'Status': log.status,
      'Profile Completed': log.profileCompleted ? 'YES' : 'NO',
      'Target Exam': log.targetExam || 'N/A',
      'Current Class': log.currentClass || 'N/A',
      'City': log.city || 'N/A',
      'School / College': log.schoolCollege || 'N/A',
      'Parent Name': log.parentName || 'N/A',
      'Parent Mobile': log.parentMobile || 'N/A',
      'Previous %': log.previousPercentage || 'N/A',
    }));

    exportToCSV(`mentora_logged_in_users_${Date.now()}`, dataToExport);
    addToast(`Exported ${filteredLogs.length} login audit records`, 'success');
  };

  const handleSimulateNewLogin = () => {
    const sampleNames = ['Saurabh Wankhede', 'Pooja Tiwari', 'Kunal Bhoyar', 'Tanvi Mahajan'];
    const randomName = sampleNames[Math.floor(Math.random() * sampleNames.length)];
    const randomMobile = '98' + Math.floor(10000000 + Math.random() * 90000000);
    loginWithMobile(randomMobile, randomName);
    addToast(`Simulated live student login for ${randomName} (${randomMobile})`, 'info');
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-blue-950 text-white p-6 sm:p-7 rounded-3xl shadow-xl border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-semibold border border-blue-400/30">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>Live Institute Access Tracker • Owner Console</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Logged-In Users & Session Audit
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl">
            Real-time directory of every student, teacher, and aspirant who logs in via Google, Mobile OTP, or Email. Track their allocated Login ID and submitted admission dossiers.
          </p>
        </div>

        <div className="flex flex-wrap gap-2.5">
          <button
            type="button"
            onClick={handleExportCSV}
            className="px-3.5 py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 border border-white/15"
          >
            <Download className="w-4 h-4 text-amber-300" />
            <span>Export CSV</span>
          </button>

          <button
            type="button"
            onClick={handleSimulateNewLogin}
            className="px-3.5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-all shadow-md flex items-center gap-1.5"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Test New Login</span>
          </button>
        </div>
      </div>

      {/* KPI Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
            Total Logins
          </div>
          <div className="text-xl sm:text-2xl font-extrabold text-slate-900">{totalLogs}</div>
          <span className="text-[10px] text-slate-400 block mt-1">Logged sessions</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-emerald-200 bg-emerald-50/20 shadow-xs">
          <div className="text-[11px] font-bold uppercase tracking-wider text-emerald-600 mb-1 flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>Online Now</span>
          </div>
          <div className="text-xl sm:text-2xl font-extrabold text-emerald-700">{onlineCount}</div>
          <span className="text-[10px] text-emerald-600 block mt-1">Active users</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1 flex items-center gap-1">
            <span className="text-red-500 font-bold">G</span>
            <span>Google</span>
          </div>
          <div className="text-xl sm:text-2xl font-extrabold text-slate-900">{googleCount}</div>
          <span className="text-[10px] text-slate-400 block mt-1">Google OAuth</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1 flex items-center gap-1">
            <Smartphone className="w-3 h-3 text-purple-600" />
            <span>Mobile OTP</span>
          </div>
          <div className="text-xl sm:text-2xl font-extrabold text-slate-900">{mobileCount}</div>
          <span className="text-[10px] text-slate-400 block mt-1">SMS verified</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1 flex items-center gap-1">
            <Mail className="w-3 h-3 text-blue-600" />
            <span>Email</span>
          </div>
          <div className="text-xl sm:text-2xl font-extrabold text-slate-900">{emailCount}</div>
          <span className="text-[10px] text-slate-400 block mt-1">Direct email</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1 flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
            <span>Completed</span>
          </div>
          <div className="text-xl sm:text-2xl font-extrabold text-slate-900">{completedProfiles}</div>
          <span className="text-[10px] text-slate-400 block mt-1">Full dossiers</span>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by student name, login ID, mobile, exam, city..."
            className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white text-slate-900"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Provider Filter */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
            {(['ALL', 'GOOGLE', 'MOBILE', 'EMAIL'] as const).map((prov) => (
              <button
                key={prov}
                onClick={() => setProviderFilter(prov)}
                className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-colors ${
                  providerFilter === prov
                    ? 'bg-white text-blue-600 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {prov === 'ALL' ? 'All Providers' : prov}
              </button>
            ))}
          </div>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as any)}
            className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="ALL">All Status</option>
            <option value="ONLINE">Online Only</option>
            <option value="OFFLINE">Offline Only</option>
          </select>
        </div>
      </div>

      {/* Logged-In Users Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                <th className="py-3 px-4">User & Identity</th>
                <th className="py-3 px-4">Assigned Login ID</th>
                <th className="py-3 px-4">Login Method</th>
                <th className="py-3 px-4">Login Time</th>
                <th className="py-3 px-4">Academic Target & Class</th>
                <th className="py-3 px-4">Status & Dossier</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
              {filteredLogs.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-12 text-slate-400">
                    <Users className="w-10 h-10 mx-auto text-slate-300 mb-2" />
                    <p className="font-semibold">No logged-in user records found.</p>
                    <p className="text-[11px]">Try clearing search filters or simulate a test login.</p>
                  </td>
                </tr>
              ) : (
                filteredLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-slate-50/80 transition-colors">
                    {/* User & Identity */}
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-blue-100 text-blue-700 font-bold flex items-center justify-center shrink-0 border border-blue-200">
                          {log.userName.charAt(0)}
                        </div>
                        <div className="min-w-0">
                          <div className="font-bold text-slate-900 truncate">
                            {log.userName}
                          </div>
                          <div className="text-[11px] text-slate-400 flex items-center gap-2">
                            <span>{log.mobile}</span>
                            <span>•</span>
                            <span className="truncate max-w-[120px]">{log.email}</span>
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Assigned Login ID */}
                    <td className="py-3 px-4">
                      <div className="inline-flex items-center gap-1.5 bg-amber-50 border border-amber-200/80 px-2.5 py-1 rounded-lg">
                        <span className="font-mono font-extrabold text-amber-800 text-xs">
                          {log.loginId}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleCopy(log.loginId)}
                          title="Copy Login ID"
                          className="text-amber-600 hover:text-amber-800 transition-colors"
                        >
                          {copiedId === log.loginId ? (
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </div>
                    </td>

                    {/* Login Method */}
                    <td className="py-3 px-4">
                      {log.loginProvider === 'GOOGLE' && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-red-50 text-red-600 border border-red-200">
                          <span className="font-black text-xs">G</span> Google Sign-in
                        </span>
                      )}
                      {log.loginProvider === 'MOBILE' && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-purple-50 text-purple-700 border border-purple-200">
                          <Smartphone className="w-3 h-3" /> Mobile OTP
                        </span>
                      )}
                      {log.loginProvider === 'EMAIL' && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-blue-50 text-blue-700 border border-blue-200">
                          <Mail className="w-3 h-3" /> Email & Pass
                        </span>
                      )}
                    </td>

                    {/* Login Time */}
                    <td className="py-3 px-4">
                      <div className="font-medium text-slate-800">
                        {formatDate(log.loginTimestamp)}
                      </div>
                      <div className="text-[10px] text-slate-400 flex items-center gap-1">
                        <Laptop className="w-3 h-3" />
                        <span className="truncate max-w-[130px]">{log.device}</span>
                      </div>
                    </td>

                    {/* Academic Target */}
                    <td className="py-3 px-4">
                      {log.targetExam ? (
                        <div>
                          <div className="font-bold text-slate-900">{log.targetExam}</div>
                          <div className="text-[11px] text-slate-500">
                            {log.currentClass || 'Class 12th'} • {log.city || 'Nagpur'}
                          </div>
                        </div>
                      ) : (
                        <span className="text-[11px] text-slate-400 italic">Not yet submitted</span>
                      )}
                    </td>

                    {/* Status & Dossier */}
                    <td className="py-3 px-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-1.5">
                          <span
                            className={`w-2 h-2 rounded-full ${
                              log.status === 'ONLINE'
                                ? 'bg-emerald-500 animate-pulse'
                                : 'bg-slate-400'
                            }`}
                          ></span>
                          <span
                            className={`text-[11px] font-bold ${
                              log.status === 'ONLINE' ? 'text-emerald-700' : 'text-slate-500'
                            }`}
                          >
                            {log.status}
                          </span>
                        </div>

                        {log.profileCompleted ? (
                          <span className="inline-block text-[10px] font-semibold text-emerald-700 bg-emerald-100/70 px-2 py-0.5 rounded-md">
                            Dossier Complete
                          </span>
                        ) : (
                          <span className="inline-block text-[10px] font-semibold text-amber-700 bg-amber-100/70 px-2 py-0.5 rounded-md">
                            Dossier Pending
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Action */}
                    <td className="py-3 px-4 text-right">
                      <button
                        type="button"
                        onClick={() => setSelectedLog(log)}
                        className="px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-blue-50 text-slate-700 hover:text-blue-600 font-semibold text-xs transition-colors flex items-center gap-1 ml-auto"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>View Dossier</span>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detailed Student Dossier Modal */}
      {selectedLog && (
        <Modal
          isOpen={!!selectedLog}
          onClose={() => setSelectedLog(null)}
          title={`Student Admission Dossier: ${selectedLog.userName}`}
          subtitle={`Official Login ID: ${selectedLog.loginId} • Logged in via ${selectedLog.loginProvider}`}
          maxWidth="lg"
        >
          <div className="space-y-5">
            {/* Top Identity Card */}
            <div className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white p-4 rounded-2xl flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-lg font-black border border-white/20">
                  {selectedLog.userName.charAt(0)}
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-white">{selectedLog.userName}</h3>
                  <p className="text-xs text-blue-200">{selectedLog.email} • {selectedLog.mobile}</p>
                </div>
              </div>

              <div className="text-right">
                <span className="block text-[10px] text-blue-300 font-bold uppercase">Login ID</span>
                <span className="font-mono text-base font-black text-amber-300">
                  {selectedLog.loginId}
                </span>
              </div>
            </div>

            {/* Collected Academic Details Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                <span className="block text-[10px] uppercase font-bold text-slate-400 mb-0.5">
                  Target Examination
                </span>
                <span className="font-bold text-slate-800 text-sm">
                  {selectedLog.targetExam || 'Not specified'}
                </span>
              </div>

              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                <span className="block text-[10px] uppercase font-bold text-slate-400 mb-0.5">
                  Current Standard / Class
                </span>
                <span className="font-bold text-slate-800 text-sm">
                  {selectedLog.currentClass || 'Not specified'}
                </span>
              </div>

              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                <span className="block text-[10px] uppercase font-bold text-slate-400 mb-0.5">
                  City / Domicile
                </span>
                <span className="font-semibold text-slate-800">
                  {selectedLog.city || 'Nagpur, Maharashtra'}
                </span>
              </div>

              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                <span className="block text-[10px] uppercase font-bold text-slate-400 mb-0.5">
                  School / Junior College
                </span>
                <span className="font-semibold text-slate-800">
                  {selectedLog.schoolCollege || 'Not specified'}
                </span>
              </div>

              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                <span className="block text-[10px] uppercase font-bold text-slate-400 mb-0.5">
                  Previous Class Score / %
                </span>
                <span className="font-bold text-blue-600">
                  {selectedLog.previousPercentage ? `${selectedLog.previousPercentage}%` : 'N/A'}
                </span>
              </div>

              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                <span className="block text-[10px] uppercase font-bold text-slate-400 mb-0.5">
                  Preferred Batch Timing
                </span>
                <span className="font-semibold text-slate-800">
                  {selectedLog.preferredTiming || 'Morning Batch'}
                </span>
              </div>

              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                <span className="block text-[10px] uppercase font-bold text-slate-400 mb-0.5">
                  Parent / Guardian Name
                </span>
                <span className="font-semibold text-slate-800">
                  {selectedLog.parentName || 'N/A'}
                </span>
              </div>

              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                <span className="block text-[10px] uppercase font-bold text-slate-400 mb-0.5">
                  Parent Emergency Mobile
                </span>
                <span className="font-semibold text-slate-800">
                  {selectedLog.parentMobile || 'N/A'}
                </span>
              </div>
            </div>

            {/* Technical Session Metadata */}
            <div className="bg-slate-100/70 p-3.5 rounded-xl border border-slate-200/80 text-xs space-y-1.5">
              <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                Access Audit & Session Security
              </span>
              <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-600">
                <div>
                  <strong>Session Timestamp:</strong> {formatDate(selectedLog.loginTimestamp)}
                </div>
                <div>
                  <strong>Authentication Provider:</strong> {selectedLog.loginProvider}
                </div>
                <div>
                  <strong>Device Platform:</strong> {selectedLog.device}
                </div>
                <div>
                  <strong>Geo Location:</strong> {selectedLog.location}
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setSelectedLog(null)}
                className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold text-xs rounded-xl transition-colors"
              >
                Close Dossier
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
