import React from 'react';
import { useApp } from '../../context/AppContext';
import { Clock, MapPin, Calendar, CheckCircle2, User } from 'lucide-react';

export const StudentTimetable: React.FC = () => {
  const { currentStudentProfile, timetable, teachers, batches } = useApp();
  const student = currentStudentProfile;

  const studentBatchId = student?.batchId || 'batch-jee-alpha';
  const batch = batches.find((b) => b.id === studentBatchId);
  const batchSlots = timetable.filter((t) => t.batchId === studentBatchId);

  const days: ('Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday')[] = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];

  // Current day calculation
  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const todayName = dayNames[new Date().getDay()];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">Batch Weekly Timetable</h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Official class schedule for {batch?.name || 'Your Batch'} • {batch?.classroom || 'Auditorium Hall A'}.
          </p>
        </div>
      </div>

      {/* Timetable Grid Day by Day */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {days.map((day) => {
          const daySlots = batchSlots.filter((s) => s.day === day);
          const isToday = day === todayName;

          return (
            <div
              key={day}
              className={`rounded-2xl border overflow-hidden shadow-xs transition-all flex flex-col justify-between ${
                isToday
                  ? 'border-blue-500 bg-white ring-2 ring-blue-400/20'
                  : 'border-slate-200 bg-white'
              }`}
            >
              <div>
                {/* Day Header */}
                <div
                  className={`p-4 border-b flex items-center justify-between ${
                    isToday ? 'bg-blue-600 text-white' : 'bg-slate-50 text-slate-900 border-slate-100'
                  }`}
                >
                  <span className="font-bold text-sm">{day}</span>
                  {isToday ? (
                    <span className="text-[10px] uppercase font-bold tracking-wider bg-white/20 px-2 py-0.5 rounded-full">
                      Today's Schedule
                    </span>
                  ) : (
                    <span className="text-xs text-slate-400 font-mono">{daySlots.length} Slots</span>
                  )}
                </div>

                {/* Slots */}
                <div className="p-4 space-y-3">
                  {daySlots.length === 0 ? (
                    <div className="p-6 text-center text-xs text-slate-400 italic">
                      Self-study / Library revision day
                    </div>
                  ) : (
                    daySlots.map((slot) => {
                      const teacher = teachers.find((t) => t.id === slot.teacherId);
                      return (
                        <div
                          key={slot.id}
                          className="p-3 bg-slate-50 rounded-xl border border-slate-200/70 space-y-1.5"
                        >
                          <div className="flex items-center justify-between text-xs">
                            <span className="font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200 text-[11px]">
                              {slot.subject}
                            </span>
                            <span className="font-mono text-slate-500 font-medium text-[11px]">
                              {slot.startTime} - {slot.endTime}
                            </span>
                          </div>

                          <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
                            <span className="flex items-center gap-1">
                              <User className="w-3 h-3 text-slate-400" />
                              <span>{teacher?.name || 'Faculty Member'}</span>
                            </span>
                            <span className="flex items-center gap-1 text-slate-400">
                              <MapPin className="w-3 h-3" />
                              <span>{slot.classroom}</span>
                            </span>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>

              <div className="p-3 bg-slate-50/50 border-t border-slate-100 text-[11px] text-slate-400 text-center">
                Reporting time: 10 mins before first bell
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
