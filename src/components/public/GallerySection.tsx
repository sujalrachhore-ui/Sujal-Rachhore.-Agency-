import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { GalleryItem } from '../../types';
import { Camera, Calendar, Image as ImageIcon } from 'lucide-react';
import { Modal } from '../common/Modal';

export const GallerySection: React.FC = () => {
  const { gallery } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [activePhoto, setActivePhoto] = useState<GalleryItem | null>(null);

  const categories = ['ALL', 'Classrooms', 'Campus', 'Achievements', 'Seminars', 'Events'];

  const filteredItems = gallery.filter(
    (item) => selectedCategory === 'ALL' || item.category === selectedCategory
  );

  return (
    <section id="gallery" className="py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-bold uppercase tracking-wider">
            <Camera className="w-3.5 h-3.5" />
            <span>Campus & Life</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            World-Class Infrastructure & Vibrant Campus
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Take a virtual tour through our air-conditioned tier-1 classrooms, NTA CBT computer labs, silent reading libraries, and annual felicitation ceremonies.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex items-center justify-center gap-2 flex-wrap mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                selectedCategory === cat
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                  : 'bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {cat === 'ALL' ? 'All Spaces' : cat}
            </button>
          ))}
        </div>

        {/* Photo Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setActivePhoto(item)}
              className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-xs hover:shadow-xl transition-all duration-300 group cursor-pointer hover:-translate-y-1 flex flex-col justify-between"
            >
              <div className="relative h-56 bg-slate-900 overflow-hidden">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-md text-white text-[11px] font-semibold px-2.5 py-0.5 rounded-full border border-white/20">
                  {item.category}
                </div>
              </div>

              <div className="p-5 space-y-2">
                <h3 className="font-bold text-slate-900 text-base group-hover:text-blue-600 transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed font-normal">
                  {item.caption}
                </p>
                <div className="flex items-center gap-1.5 text-[11px] text-slate-400 pt-2 border-t border-slate-100">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{item.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Enlarged Photo Modal */}
      {activePhoto && (
        <Modal
          isOpen={!!activePhoto}
          onClose={() => setActivePhoto(null)}
          title={activePhoto.title}
          subtitle={`Category: ${activePhoto.category} • Date: ${activePhoto.date}`}
          maxWidth="2xl"
        >
          <div className="space-y-4">
            <div className="rounded-xl overflow-hidden bg-slate-900 max-h-[70vh] flex items-center justify-center">
              <img
                src={activePhoto.imageUrl}
                alt={activePhoto.title}
                className="w-full h-auto object-cover max-h-[60vh] rounded-lg"
              />
            </div>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-200">
              {activePhoto.caption}
            </p>
          </div>
        </Modal>
      )}
    </section>
  );
};
