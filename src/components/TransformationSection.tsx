import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ArrowLeftRight } from 'lucide-react';

const stories = [
  {
    name: 'Alex Thompson',
    duration: '6 months',
    loss: '-42 lbs',
    program: 'Weight Loss Program',
    before: 'https://images.pexels.com/photos/6922168/pexels-photo-6922168.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=400&w=400',
    after: 'https://images.pexels.com/photos/8874364/pexels-photo-8874364.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=400&w=400',
    quote: "I never believed a gym could change my life this much. The coaches at Fitness Pro are truly exceptional.",
  },
  {
    name: 'Maria Santos',
    duration: '4 months',
    loss: '-28 lbs & +15 lbs muscle',
    program: 'Body Transformation',
    before: 'https://images.pexels.com/photos/6539842/pexels-photo-6539842.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=400&w=400',
    after: 'https://images.pexels.com/photos/29825216/pexels-photo-29825216.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=400&w=400',
    quote: "My body composition completely changed. The nutrition coaching combined with training was the secret.",
  },
  {
    name: 'Kevin Lee',
    duration: '8 months',
    loss: '+28 lbs muscle',
    program: 'Muscle Building',
    before: 'https://images.pexels.com/photos/12014609/pexels-photo-12014609.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=400&w=400',
    after: 'https://images.pexels.com/photos/17956264/pexels-photo-17956264.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=400&w=400',
    quote: "Gained more muscle in 8 months here than 3 years at other gyms. The programming is on another level.",
  },
];

function ComparisonSlider({ before, after }: { before: string; after: string }) {
  const [position, setPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging.current) return;
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    setPosition(Math.min(95, Math.max(5, x)));
  };

  return (
    <div
      ref={containerRef}
      className="relative h-64 md:h-80 rounded-2xl overflow-hidden select-none cursor-ew-resize"
      onPointerDown={() => { isDragging.current = true; }}
      onPointerUp={() => { isDragging.current = false; }}
      onPointerLeave={() => { isDragging.current = false; }}
      onPointerMove={handlePointerMove}
    >
      {/* After (full) */}
      <img src={after} alt="After" className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute bottom-3 right-3 bg-green-500/80 text-white text-xs font-bold px-2 py-1 rounded">AFTER</div>

      {/* Before (clipped) */}
      <div className="absolute inset-0 overflow-hidden" style={{ width: `${position}%` }}>
        <img src={before} alt="Before" className="absolute inset-0 w-full h-full object-cover" style={{ width: `${100 * 100 / position}%` }} />
        <div className="absolute bottom-3 left-3 bg-red-500/80 text-white text-xs font-bold px-2 py-1 rounded">BEFORE</div>
      </div>

      {/* Divider */}
      <div className="absolute top-0 bottom-0 w-0.5 bg-white z-10 flex items-center justify-center" style={{ left: `${position}%` }}>
        <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-lg">
          <ArrowLeftRight size={14} className="text-gray-800" />
        </div>
      </div>
    </div>
  );
}

export default function TransformationSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section className="relative py-24 bg-[#0A0A0A] overflow-hidden">
      <div className="absolute inset-0 hex-pattern opacity-30" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-red-500/4 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 md:px-6" ref={ref}>
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <span className="text-cyan-400 text-sm font-semibold tracking-widest uppercase mb-3 block">Real Transformations</span>
          <h2 className="text-4xl md:text-6xl font-black uppercase mb-4" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>
            Transformation <span className="gradient-text-red">Stories</span>
          </h2>
          <p className="text-white/50 max-w-xl mx-auto">
            Drag the slider to see incredible before & after transformations from our members.
          </p>
          <div className="section-divider w-24 mx-auto mt-4" />
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {stories.map((story, i) => (
            <motion.div
              key={i}
              className="glass rounded-2xl overflow-hidden"
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.15 }}
            >
              <ComparisonSlider before={story.before} after={story.after} />
              <div className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-bold text-white">{story.name}</h3>
                    <p className="text-cyan-400 text-sm">{story.program}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-green-400 font-bold text-sm">{story.loss}</div>
                    <div className="text-white/40 text-xs">{story.duration}</div>
                  </div>
                </div>
                <p className="text-white/50 text-sm italic">"{story.quote}"</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
