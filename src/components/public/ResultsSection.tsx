import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Trophy, Award, Search, Filter, Sparkles, Star } from 'lucide-react';

export const ResultsSection: React.FC = () => {
  const { results } = useApp();
  const [selectedExam, setSelectedExam] = useState<string>('ALL');
  const [selectedYear, setSelectedYear] = useState<string>('ALL');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const exams = ['ALL', 'JEE', 'NEET', 'MHT-CET'];
  const years = ['ALL', '2026', '2025'];

  const filteredResults = results.filter((r) => {
    const matchesExam =
      selectedExam === 'ALL' ||
      r.examName.toLowerCase().includes(selectedExam.toLowerCase()) ||
      r.courseName.toLowerCase().includes(selectedExam.toLowerCase());

    const matchesYear = selectedYear === 'ALL' || r.year.toString() === selectedYear;

    const matchesSearch =
      r.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.examName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (r.remarks && r.remarks.toLowerCase().includes(searchTerm.toLowerCase()));

    return matchesExam && matchesYear && matchesSearch;
  });

  return (
    <section id="results" className="py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-bold uppercase tracking-wider">
            <Trophy className="w-3.5 h-3.5 text-amber-600" />
            <span>Proven Track Record</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Hall of Fame & Top Rankers
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Consistent selections in AIIMS New Delhi, IIT Bombay, COEP, and Government Medical Colleges year after year.
          </p>
        </div>

        {/* Filters and Search Bar */}
        <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
          {/* Exam Filter tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider mr-2 hidden sm:inline">Exam:</span>
            {exams.map((exam) => (
              <button
                key={exam}
                onClick={() => setSelectedExam(exam)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                  selectedExam === exam
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-white text-slate-700 hover:bg-slate-200 border border-slate-200'
                }`}
              >
                {exam === 'ALL' ? 'All Exams' : exam}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            {/* Year selector */}
            <div className="flex items-center gap-1">
              <span className="text-xs font-bold text-slate-500 hidden sm:inline">Year:</span>
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="bg-white border border-slate-200 text-slate-800 text-xs font-medium rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                {years.map((y) => (
                  <option key={y} value={y}>
                    {y === 'ALL' ? 'All Years' : `Class of ${y}`}
                  </option>
                ))}
              </select>
            </div>

            {/* Search Input */}
            <div className="relative flex-1 sm:w-60">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search student or rank..."
                className="w-full pl-8 pr-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Results Cards Grid */}
        {filteredResults.length === 0 ? (
          <div className="p-12 text-center bg-slate-50 rounded-2xl border border-slate-200 text-slate-500">
            <Trophy className="w-8 h-8 text-slate-300 mx-auto mb-2" />
            <p className="text-sm font-semibold">No topper records match the selected filter criteria.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResults.map((record) => (
              <div
                key={record.id}
                className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs hover:shadow-xl transition-all duration-300 relative overflow-hidden group hover:-translate-y-1"
              >
                {/* Gold ribbon for single/double digit rank */}
                {record.rank <= 100 && (
                  <div className="absolute top-0 right-0 bg-gradient-to-l from-amber-400 to-amber-500 text-slate-900 font-bold text-[10px] px-3 py-1 rounded-bl-xl shadow-xs flex items-center gap-1 uppercase tracking-wider">
                    <Sparkles className="w-3 h-3 text-amber-900" />
                    <span>All-India Topper</span>
                  </div>
                )}

                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-violet-600 flex items-center justify-center text-white font-extrabold text-lg shadow-md shrink-0">
                    {record.studentName.slice(0, 2).toUpperCase()}
                  </div>

                  <div className="flex-1 pr-6">
                    <h3 className="font-bold text-slate-900 text-base leading-snug group-hover:text-blue-600 transition-colors">
                      {record.studentName}
                    </h3>
                    <p className="text-xs text-slate-500 font-medium">{record.examName}</p>
                    <span className="inline-block mt-1 text-[11px] font-mono text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                      Year {record.year}
                    </span>
                  </div>
                </div>

                {/* Score and Rank stats */}
                <div className="mt-5 grid grid-cols-3 gap-2 p-3 bg-slate-50 rounded-xl border border-slate-200/80 text-center">
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase">Score</span>
                    <div className="text-sm font-extrabold text-slate-900">
                      {record.score}
                      <span className="text-[10px] text-slate-400 font-normal">/{record.totalMarks}</span>
                    </div>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase">Percentile</span>
                    <div className="text-sm font-extrabold text-emerald-600">
                      {record.percentage}%
                    </div>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase">Rank</span>
                    <div className="text-sm font-extrabold text-amber-600">
                      #{record.rank}
                    </div>
                  </div>
                </div>

                {record.remarks && (
                  <p className="mt-4 text-xs text-slate-600 italic leading-relaxed border-l-2 border-amber-400 pl-3">
                    "{record.remarks}"
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
