import React from 'react';
import { useApp } from '../../context/AppContext';
import { Star, MessageSquareQuote, CheckCircle2 } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  const { testimonials } = useApp();
  const publishedTestimonials = testimonials.filter((t) => t.published);

  return (
    <section id="testimonials" className="py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider">
            <Star className="w-3.5 h-3.5 fill-current text-emerald-600" />
            <span>Real Student Stories</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Trusted by 5,000+ Students & Parents
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Read unfiltered reflections from toppers admitted into IITs, AIIMS, and NITs alongside feedback from caring parents.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {publishedTestimonials.map((item) => (
            <div
              key={item.id}
              className="p-6 bg-slate-50/70 rounded-2xl border border-slate-200 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1"
            >
              <div className="space-y-4">
                {/* Stars & Quote Icon */}
                <div className="flex items-center justify-between">
                  <div className="flex gap-1">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <MessageSquareQuote className="w-6 h-6 text-slate-300" />
                </div>

                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic font-normal">
                  "{item.content}"
                </p>

                <div className="p-2.5 bg-blue-50/80 rounded-xl border border-blue-100/80 text-[11px] font-semibold text-blue-800 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                  <span>{item.achievement}</span>
                </div>
              </div>

              {/* Author Info */}
              <div className="mt-6 pt-4 border-t border-slate-200/80 flex items-center gap-3">
                <img
                  src={item.avatar}
                  alt={item.name}
                  className="w-10 h-10 rounded-full object-cover border border-slate-200"
                />
                <div>
                  <h4 className="text-sm font-bold text-slate-900">{item.name}</h4>
                  <p className="text-[11px] text-slate-500 font-medium">
                    {item.role} • {item.course}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
