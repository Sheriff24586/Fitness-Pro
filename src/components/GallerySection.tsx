import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { X, ZoomIn } from 'lucide-react';

const categories = ['All', 'Facilities', 'Training', 'Classes', 'Equipment', 'Results'];

const images = [
  { src: 'https://images.pexels.com/photos/28320723/pexels-photo-28320723.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=600&w=800', cat: 'Facilities', title: 'Main Training Floor', span: 'col-span-2' },
  { src: 'https://images.pexels.com/photos/4164766/pexels-photo-4164766.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=400&w=400', cat: 'Equipment', title: 'Premium Dumbbells', span: '' },
  { src: 'https://images.pexels.com/photos/32695898/pexels-photo-32695898.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=400&w=400', cat: 'Classes', title: 'Group Session', span: '' },
  { src: 'https://images.pexels.com/photos/8874364/pexels-photo-8874364.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=500&w=400', cat: 'Training', title: 'Strength Training', span: '' },
  { src: 'https://images.pexels.com/photos/29825216/pexels-photo-29825216.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=500&w=400', cat: 'Results', title: 'Body Transformation', span: '' },
  { src: 'https://images.pexels.com/photos/32610333/pexels-photo-32610333.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=400&w=800', cat: 'Facilities', title: 'Kettlebell Zone', span: 'col-span-2' },
  { src: 'https://images.pexels.com/photos/6455895/pexels-photo-6455895.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=400&w=400', cat: 'Training', title: 'Personal Training', span: '' },
  { src: 'https://images.pexels.com/photos/6539842/pexels-photo-6539842.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=400&w=400', cat: 'Training', title: 'Machine Training', span: '' },
  { src: 'https://images.pexels.com/photos/17956264/pexels-photo-17956264.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=400&w=800', cat: 'Results', title: 'Athletic Performance', span: 'col-span-2' },
  { src: 'https://images.pexels.com/photos/14502821/pexels-photo-14502821.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=400&w=400', cat: 'Equipment', title: 'Kettlebell Collection', span: '' },
  { src: 'https://images.pexels.com/photos/31028213/pexels-photo-31028213.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=400&w=400', cat: 'Classes', title: 'Evening Training', span: '' },
  { src: 'https://images.pexels.com/photos/6455771/pexels-photo-6455771.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=400&w=400', cat: 'Classes', title: 'Battle Ropes', span: '' },
];

export default function GallerySection() {
  const [filter, setFilter] = useState('All');
  const [lightbox, setLightbox] = useState<null | typeof images[0]>(null);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  const filtered = filter === 'All' ? images : images.filter(img => img.cat === filter);

  return (
    <section id="gallery" className="relative py-24 md:py-32 bg-[#111111] overflow-hidden">
      <div className="absolute inset-0 hex-pattern opacity-30" />

      <div className="relative max-w-7xl mx-auto px-4 md:px-6" ref={ref}>
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <span className="text-cyan-400 text-sm font-semibold tracking-widest uppercase mb-3 block">Visual Story</span>
          <h2 className="text-4xl md:text-6xl font-black uppercase mb-4" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>
            Our <span className="gradient-text">Gallery</span>
          </h2>
          <p className="text-white/50 max-w-xl mx-auto mb-8">
            A glimpse into our world-class facilities, expert training sessions, and thriving community.
          </p>

          {/* Category filters */}
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map(cat => (
              <motion.button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                  filter === cat
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white'
                    : 'glass text-white/60 hover:text-white'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {cat}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Masonry-like grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={filter}
            className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 auto-rows-[200px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {filtered.map((img, i) => (
              <motion.div
                key={img.src}
                className={`relative group overflow-hidden rounded-xl cursor-pointer ${img.span || ''} ${i % 5 === 0 || i % 5 === 3 ? 'row-span-2' : ''}`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => setLightbox(img)}
                whileHover={{ scale: 1.01 }}
              >
                <img
                  src={img.src}
                  alt={img.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-12 h-12 rounded-full glass flex items-center justify-center">
                    <ZoomIn size={20} className="text-cyan-400" />
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <p className="text-white font-semibold text-sm">{img.title}</p>
                  <p className="text-cyan-400 text-xs">{img.cat}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            className="fixed inset-0 z-[200] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
          >
            <motion.div
              className="relative max-w-4xl max-h-[90vh] rounded-2xl overflow-hidden"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={e => e.stopPropagation()}
            >
              <img src={lightbox.src} alt={lightbox.title} className="w-full h-full object-contain max-h-[80vh]" />
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent">
                <p className="text-white font-semibold">{lightbox.title}</p>
                <p className="text-cyan-400 text-sm">{lightbox.cat}</p>
              </div>
              <button
                className="absolute top-3 right-3 w-9 h-9 rounded-full bg-black/60 flex items-center justify-center text-white hover:text-cyan-400 transition-colors"
                onClick={() => setLightbox(null)}
              >
                <X size={18} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
