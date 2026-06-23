import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Dumbbell, Heart, Users, Apple, Zap, Target, ChevronDown } from 'lucide-react';

const services = [
  {
    icon: Target,
    title: 'Personal Training',
    color: '#00D4FF',
    gradient: 'from-cyan-500/20 to-blue-600/20',
    border: 'border-cyan-500/30',
    short: 'Customized 1-on-1 coaching for maximum results.',
    features: ['Personalized fitness assessment', 'Custom workout plans', 'One-on-one coaching sessions', 'Progress tracking & reporting', 'Nutritional guidance integration'],
  },
  {
    icon: Dumbbell,
    title: 'Strength Training',
    color: '#FF3B30',
    gradient: 'from-red-500/20 to-orange-600/20',
    border: 'border-red-500/30',
    short: 'Build raw power and muscular endurance.',
    features: ['Progressive overload programs', 'Powerlifting techniques', 'Olympic weightlifting', 'Mobility & flexibility work', 'Injury prevention protocols'],
  },
  {
    icon: Heart,
    title: 'Cardio Fitness',
    color: '#FF6B30',
    gradient: 'from-orange-500/20 to-red-600/20',
    border: 'border-orange-500/30',
    short: 'Boost endurance and accelerate fat loss.',
    features: ['VO2 Max improvement', 'HIIT & interval training', 'Steady-state cardio plans', 'Heart rate zone training', 'Metabolic conditioning'],
  },
  {
    icon: Users,
    title: 'Group Classes',
    color: '#9B59B6',
    gradient: 'from-purple-500/20 to-pink-600/20',
    border: 'border-purple-500/30',
    short: 'High-energy classes in a motivating community.',
    features: ['HIIT classes (5x/week)', 'Functional fitness circuits', 'Yoga & recovery sessions', 'Boxing & kickboxing', 'Dance fitness & Zumba'],
  },
  {
    icon: Apple,
    title: 'Nutrition Guidance',
    color: '#27AE60',
    gradient: 'from-green-500/20 to-teal-600/20',
    border: 'border-green-500/30',
    short: 'Fuel your performance with expert dietary support.',
    features: ['Macro & calorie planning', 'Personalized meal plans', 'Supplement consultation', 'Regular nutrition check-ins', 'Body composition analysis'],
  },
  {
    icon: Zap,
    title: 'Body Transformation',
    color: '#F39C12',
    gradient: 'from-yellow-500/20 to-orange-600/20',
    border: 'border-yellow-500/30',
    short: '360° transformation programs for every goal.',
    features: ['12-week transformation programs', 'Weight loss & fat burning', 'Muscle gain protocols', 'Athletic performance training', 'Before & after progress tracking'],
  },
];

export default function ServicesSection() {
  const [expanded, setExpanded] = useState<number | null>(null);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="services" className="relative py-24 md:py-32 bg-[#111111] overflow-hidden">
      <div className="absolute inset-0 grid-pattern" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-500/3 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 md:px-6" ref={ref}>
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <span className="text-cyan-400 text-sm font-semibold tracking-widest uppercase mb-3 block">What We Offer</span>
          <h2 className="text-4xl md:text-6xl font-black uppercase mb-4" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>
            Our <span className="gradient-text">Services</span>
          </h2>
          <p className="text-white/50 max-w-xl mx-auto">
            Everything you need to transform your physique and elevate your performance — under one roof.
          </p>
          <div className="section-divider w-24 mx-auto mt-4" />
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((svc, i) => {
            const isOpen = expanded === i;
            return (
              <motion.div
                key={i}
                className={`glass rounded-2xl overflow-hidden border transition-all duration-500 ${isOpen ? svc.border : 'border-white/5'} card-hover cursor-pointer`}
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                onClick={() => setExpanded(isOpen ? null : i)}
                whileHover={{ borderColor: svc.color + '40' }}
              >
                {/* Top gradient bar */}
                <div className="h-1 w-full" style={{ background: `linear-gradient(90deg, ${svc.color}, transparent)` }} />

                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${svc.gradient} flex items-center justify-center`}>
                      <svc.icon size={24} style={{ color: svc.color }} />
                    </div>
                    <motion.div
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ChevronDown size={18} className="text-white/40" />
                    </motion.div>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-2">{svc.title}</h3>
                  <p className="text-white/50 text-sm mb-4">{svc.short}</p>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="pt-4 border-t border-white/5">
                          <ul className="space-y-2">
                            {svc.features.map((f, j) => (
                              <motion.li
                                key={j}
                                className="flex items-center gap-2 text-sm text-white/70"
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: j * 0.05 }}
                              >
                                <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: svc.color }} />
                                {f}
                              </motion.li>
                            ))}
                          </ul>
                          <motion.button
                            className="mt-4 w-full py-2.5 rounded-lg text-sm font-semibold transition-all"
                            style={{ background: `${svc.color}20`, color: svc.color, border: `1px solid ${svc.color}30` }}
                            whileHover={{ background: `${svc.color}30` }}
                            onClick={e => { e.stopPropagation(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }}
                          >
                            Learn More →
                          </motion.button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
