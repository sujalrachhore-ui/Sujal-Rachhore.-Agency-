import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { exportToCSV } from '../../utils/helpers';
import { Award, Download, Search, Trophy, CheckCircle2, TrendingUp } from 'lucide-react';

export const TeacherResults: React.FC = () => {
  const { results, testAttempts, tests, addToast } = useApp();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredResults = results.filter(
    (r) =>
      r.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.examName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleExport = () => {
    exportToCSV(
      'Mentora_Batch_Scorecards_' + new Date().toISOString().split('T')[0],
      filteredResults.map((r) => ({
        Student: r.studentName,
        Exam: r.examName,
        Course: r.courseName,
        Date: r.examDate,
        Score: `${r.score}/${r.totalMarks}`,
        Percentage: `${r.percentage}%`,
        Rank: `#${r.rank}`,
        Remarks: r.remarks || '',
      }))
    );
    addToast('Results exported to CSV successfully', 'success');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">Student Test Performance & Scorecards</h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Monitor class averages, individual percentile trajectories, and negative marking flags.
          </p>
        </div>

        <button
          onClick={handleExport}
          className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs rounded-xl shadow-xs flex items-center gap-1.5 transition-colors self-start sm:self-auto"
        >
          <Download className="w-4 h-4" />
          <span>Export Scorecards to CSV</span>
        </button>
      </div>

      {/* Results Table */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs space-y-4">
        <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-50/50">
          <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
            <Trophy className="w-4 h-4 text-amber-500" />
            <span>Master Diagnostic Records ({filteredResults.length})</span>
          </h3>

          <div className="relative w-64">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search student or assessment..."
              className="w-full pl-8 pr-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs focus:ring-1 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50 text-slate-500 uppercase tracking-wider font-bold">
                <th className="p-3.5 pl-6">Student Name</th>
                <th className="p-3.5">Examination Title</th>
                <th className="p-3.5">Exam Date</th>
                <th className="p-3.5">Score Secured</th>
                <th className="p-3.5">Percentage</th>
                <th className="p-3.5">Rank</th>
                <th className="p-3.5 pr-6">Diagnostic Faculty Note</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filteredResults.map((r) => (
                <tr key={r.id} className="hover:bg-slate-50 transition-colors">
                  <td className="p-3.5 pl-6 font-bold text-slate-900">{r.studentName}</td>
                  <td className="p-3.5 font-medium">{r.examName}</td>
                  <td className="p-3.5 font-mono text-slate-500">{r.examDate}</td>
                  <td className="p-3.5 font-bold text-slate-900">
                    {r.score} <span className="text-slate-400 font-normal">/{r.totalMarks}</span>
                  </td>
                  <td className="p-3.5 font-bold text-emerald-600">{r.percentage}%</td>
                  <td className="p-3.5">
                    <span className="font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                      #{r.rank}
                    </span>
                  </td>
                  <td className="p-3.5 pr-6 text-slate-500 italic max-w-xs truncate">
                    {r.remarks || 'Standard submission verified'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
