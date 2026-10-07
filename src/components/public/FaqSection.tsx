import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';

export const FaqSection: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    {
      q: 'How does Mentora Institute conduct scholarship tests?',
      a: 'We conduct the Mentora National Talent Search (MNTS) both online and offline at our Dharampeth campus every Sunday. Students can secure up to a 75% tuition fee waiver based on their percentile score in Mathematics/Science.',
    },
    {
      q: 'What is the maximum student capacity per batch?',
      a: 'To guarantee individual attention, our batches are strictly capped at 45 students. This ensures that every student can actively participate and have their doubts resolved directly by senior faculty.',
    },
    {
      q: 'How does the Computer-Based Test (CBT) portal work?',
      a: 'Enrolled students receive personalized login credentials to our student portal. They can attempt scheduled full-length mock exams replicating the exact NTA interface, complete with countdown timers, question palettes, and instant diagnostic scorecards.',
    },
    {
      q: 'Are hostel and transport facilities available for outstation students?',
      a: 'Yes, Mentora Institute partners with verified student hostels and PG accommodations located within 500 meters of the campus, featuring 24/7 security and hygienic dining. Dedicated AC transport routes operate across all major hubs in Nagpur.',
    },
    {
      q: 'Can parents monitor attendance and test performance?',
      a: 'Absolutely. Parents receive automated SMS alerts if a student is absent or late. Additionally, parents can log into the student portal anytime to review monthly attendance calendars, fee receipts, and test ranking trajectories.',
    },
  ];

  return (
    <section className="py-20 bg-white border-b border-slate-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-bold uppercase tracking-wider">
            <HelpCircle className="w-3.5 h-3.5 text-blue-600" />
            <span>Got Questions?</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Everything you need to know about our admissions, batch schedules, testing system, and scholarships.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="border border-slate-200 rounded-2xl overflow-hidden transition-all bg-slate-50/50"
              >
                <button
                  type="button"
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-slate-900 hover:text-blue-600 transition-colors"
                >
                  <span className="text-sm sm:text-base">{faq.q}</span>
                  {isOpen ? (
                    <ChevronUp className="w-5 h-5 text-blue-600 shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-slate-400 shrink-0" />
                  )}
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
