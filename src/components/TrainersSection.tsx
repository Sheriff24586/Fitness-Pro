import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Award, Star } from 'lucide-react';

const trainers = [
  {
    name: 'Marcus Rodriguez',
    role: 'Head Strength Coach',
    exp: '10+ Years',
    specialties: ['Powerlifting', 'Olympic Lifting', 'Strength & Conditioning'],
    certifications: ['NSCA-CSCS', 'USAW L2', 'FMS Certified'],
    rating: 4.9,
    bio: 'Former competitive powerlifter with a passion for unlocking human potential. Marcus has trained over 500 athletes from beginners to national competitors.',
    image: 'https://images.pexels.com/photos/8612491/pexels-photo-8612491.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=500&w=400',
    color: '#00D4FF',
  },
  {
    name: 'Sofia Martinez',
    role: 'Performance Coach',
    exp: '8+ Years',
    specialties: ["Women's Fitness", 'HIIT', 'Body Transformation'],
    certifications: ['ACE-CPT', 'NASM-CNC', 'CrossFit L2'],
    rating: 4.8,
    bio: "Certified performance coach and transformation specialist. Sofia's evidence-based approach has helped hundreds of women achieve their dream physique.",
    image: 'https://images.pexels.com/photos/6455895/pexels-photo-6455895.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=500&w=400',
    color: '#E91E8C',
  },
  {
    name: 'James Chen',
    role: 'Athletic Performance Specialist',
    exp: '12+ Years',
    specialties: ['Sports Performance', 'Plyometrics', 'Speed & Agility'],
    certifications: ['NASM-PES', 'CSCS', 'TRX Certified'],
    rating: 4.9,
    bio: 'Former D1 athlete and sports performance specialist. James brings elite-level training methodology to everyday gym members.',
    image: 'https://images.pexels.com/photos/17956264/pexels-photo-17956264.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=500&w=400',
    color: '#FF3B30',
  },
  {
    name: 'Aisha Johnson',
    role: 'Nutrition & Wellness Coach',
    exp: '7+ Years',
    specialties: ['Nutrition', 'Mindfulness', 'Functional Training'],
    certifications: ['ISSN-SNS', 'NASM-CPT', 'Precision Nutrition L2'],
    rating: 4.7,
    bio: 'Holistic wellness expert who bridges the gap between fitness and nutrition. Aisha helps clients build sustainable, healthy lifestyles.',
    image: 'https://images.pexels.com/photos/6539842/pexels-photo-6539842.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=500&w=400',
    color: '#27AE60',
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map(i => (
        <Star
          key={i}
          size={12}
          className={i <= Math.floor(rating) ? 'text-yellow-400 fill-yellow-400' : 'text-white/20'}
        />
      ))}
      <span className="text-white/60 text-xs ml-1">{rating}</span>
    </div>
  );
}

export default function TrainersSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="trainers" className="relative py-24 md:py-32 bg-[#111111] overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-50" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-cyan-500/4 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 md:px-6" ref={ref}>
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <span className="text-cyan-400 text-sm font-semibold tracking-widest uppercase mb-3 block">Expert Team</span>
          <h2 className="text-4xl md:text-6xl font-black uppercase mb-4" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>
            Meet Our <span className="gradient-text">Trainers</span>
          </h2>
          <p className="text-white/50 max-w-xl mx-auto">
            World-class coaches with decades of combined experience dedicated to your success.
          </p>
          <div className="section-divider w-24 mx-auto mt-4" />
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {trainers.map((trainer, i) => (
            <motion.div
              key={i}
              className="flip-card h-[480px]"
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.15 }}
            >
              <div className="flip-card-inner w-full h-full">
                {/* Front */}
                <div className="flip-card-front absolute inset-0 rounded-2xl overflow-hidden">
                  <img
                    src={trainer.image}
                    alt={trainer.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <div className="mb-2">
                      <StarRating rating={trainer.rating} />
                    </div>
                    <h3 className="text-xl font-bold text-white">{trainer.name}</h3>
                    <p className="text-sm font-medium mb-1" style={{ color: trainer.color }}>{trainer.role}</p>
                    <p className="text-white/50 text-xs">{trainer.exp} Experience</p>

                    <div className="mt-3 flex gap-2">
                      {trainer.specialties.slice(0, 2).map((s, j) => (
                        <span key={j} className="px-2 py-0.5 rounded-full text-xs glass" style={{ color: trainer.color, borderColor: trainer.color + '30' }}>
                          {s}
                        </span>
                      ))}
                    </div>

                    <p className="text-white/40 text-xs mt-3 text-center italic">Hover to learn more</p>
                  </div>
                </div>

                {/* Back */}
                <div
                  className="flip-card-back absolute inset-0 rounded-2xl p-5 flex flex-col"
                  style={{ background: `linear-gradient(135deg, #1A1A1A, #0d1520)`, border: `1px solid ${trainer.color}30` }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-full overflow-hidden border-2" style={{ borderColor: trainer.color }}>
                      <img src={trainer.image} alt={trainer.name} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <h3 className="font-bold text-white text-sm">{trainer.name}</h3>
                      <p className="text-xs" style={{ color: trainer.color }}>{trainer.role}</p>
                    </div>
                  </div>

                  <p className="text-white/60 text-xs leading-relaxed mb-4">{trainer.bio}</p>

                  <div className="mb-4">
                    <h4 className="text-white/40 text-xs uppercase tracking-wider mb-2">Specialties</h4>
                    <div className="flex flex-wrap gap-1">
                      {trainer.specialties.map((s, j) => (
                        <span key={j} className="px-2 py-0.5 rounded text-xs" style={{ background: trainer.color + '15', color: trainer.color }}>
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mb-4">
                    <h4 className="text-white/40 text-xs uppercase tracking-wider mb-2">Certifications</h4>
                    {trainer.certifications.map((c, j) => (
                      <div key={j} className="flex items-center gap-1.5 text-xs text-white/60 mb-1">
                        <Award size={10} style={{ color: trainer.color }} />
                        {c}
                      </div>
                    ))}
                  </div>

                  <div className="mt-auto">
                    <div className="flex gap-3 mb-3">
                      {(['IG', 'TW', 'YT'] as const).map((s, j) => (
                        <button key={j} className="w-8 h-8 rounded-full glass flex items-center justify-center hover:scale-110 transition-transform text-xs font-bold" style={{ color: trainer.color }}>
                          {s}
                        </button>
                      ))}
                    </div>
                    <button
                      className="w-full py-2 rounded-xl text-sm font-semibold transition-all"
                      style={{ background: trainer.color, color: '#0A0A0A' }}
                      onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                    >
                      Book Session
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
