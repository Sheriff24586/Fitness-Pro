import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import CountUp from 'react-countup';
import { Trophy, Users, Award, Star } from 'lucide-react';

const milestones = [
  {
    year: '2012',
    title: 'The Beginning',
    desc: 'Fitness Pro opens its doors with a 2,000 sq ft studio, 3 trainers, and a dream to change lives in the community.',
    icon: '🏗️',
    color: '#00D4FF',
  },
  {
    year: '2014',
    title: 'Community Roots',
    desc: 'Reached 1,000 members milestone. Launched our first group classes and nutrition program. Won "Best New Gym" local award.',
    icon: '🌱',
    color: '#27AE60',
  },
  {
    year: '2016',
    title: 'Championship Era',
    desc: 'Our athletes compete at regional and national levels. 5 members win state championships. The Fitness Pro name starts spreading.',
    icon: '🏆',
    color: '#F39C12',
  },
  {
    year: '2018',
    title: 'Major Expansion',
    desc: 'Expanded to 15,000 sq ft with world-class equipment. Hired 20+ certified trainers. Launched signature transformation programs.',
    icon: '🚀',
    color: '#9B59B6',
  },
  {
    year: '2020',
    title: 'Digital Evolution',
    desc: 'Launched virtual training during global challenges. Our online community grew to 5,000+ and we never stopped pushing forward.',
    icon: '💻',
    color: '#FF6B30',
  },
  {
    year: '2022',
    title: 'Elite Recognition',
    desc: 'Named #1 Premium Fitness Brand in the region. Celebrated 10 years with 10,000 members and expanded training academy.',
    icon: '⭐',
    color: '#00D4FF',
  },
  {
    year: '2024',
    title: 'Legacy Continues',
    desc: '15,000+ members strong. International training certifications. Multiple location expansion plans. The best is yet to come.',
    icon: '🌍',
    color: '#FF3B30',
  },
];

const legacyStats = [
  { icon: Trophy, value: 12, label: 'Years of Excellence', suffix: '+' },
  { icon: Users, value: 15000, label: 'Members Transformed', suffix: '+' },
  { icon: Award, value: 47, label: 'Awards Won', suffix: '' },
  { icon: Star, value: 9800, label: 'Success Stories', suffix: '+' },
];

export default function LegacySection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start end', 'end start'] });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <section id="legacy" className="relative py-24 md:py-32 bg-[#0d0d0d] overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-30" />
      <div className="absolute top-0 right-0 w-[500px] h-[600px] bg-cyan-500/4 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 md:px-6" ref={ref}>
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <span className="text-cyan-400 text-sm font-semibold tracking-widest uppercase mb-3 block">Our Journey</span>
          <h2 className="text-4xl md:text-6xl font-black uppercase mb-4" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>
            Our <span className="gradient-text">Legacy</span>
          </h2>
          <p className="text-white/50 max-w-xl mx-auto">
            Over a decade of shaping lives, breaking records, and building an unstoppable fitness community.
          </p>
          <div className="section-divider w-24 mx-auto mt-4" />
        </motion.div>

        {/* Legacy Stats */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          {legacyStats.map((stat, i) => (
            <motion.div
              key={i}
              className="glass rounded-2xl p-6 text-center group hover:border-cyan-500/30 transition-all"
              whileHover={{ y: -4 }}
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-600/20 flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                <stat.icon size={22} className="text-cyan-400" />
              </div>
              <div className="text-3xl font-black gradient-text mb-1">
                {inView ? <CountUp end={stat.value} duration={2.5} separator="," suffix={stat.suffix} /> : '0'}
              </div>
              <div className="text-white/50 text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Timeline */}
        <div className="relative" ref={containerRef}>
          {/* Center line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white/5 -translate-x-1/2 hidden md:block">
            <motion.div
              className="w-full bg-gradient-to-b from-cyan-500 to-blue-600 origin-top"
              style={{ height: lineHeight }}
            />
          </div>

          <div className="space-y-8 md:space-y-0">
            {milestones.map((m, i) => {
              const isLeft = i % 2 === 0;
              return (
                <motion.div
                  key={i}
                  className={`relative flex items-center gap-8 md:gap-0 ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                  initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                >
                  {/* Content */}
                  <div className={`md:w-[calc(50%-2rem)] ${isLeft ? 'md:text-right md:pr-8' : 'md:pl-8'}`}>
                    <motion.div
                      className="glass rounded-2xl p-5 group hover:border-white/20 transition-all"
                      whileHover={{ scale: 1.02, borderColor: m.color + '40' }}
                    >
                      <div className={`flex items-center gap-3 mb-3 ${isLeft ? 'md:flex-row-reverse md:justify-start' : ''}`}>
                        <span className="text-2xl">{m.icon}</span>
                        <div>
                          <span className="text-xs font-bold tracking-widest" style={{ color: m.color }}>{m.year}</span>
                          <h3 className="text-lg font-bold text-white">{m.title}</h3>
                        </div>
                      </div>
                      <p className="text-white/50 text-sm leading-relaxed">{m.desc}</p>
                    </motion.div>
                  </div>

                  {/* Center dot */}
                  <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-10 h-10 rounded-full border-2 items-center justify-center z-10"
                    style={{ borderColor: m.color, background: '#0A0A0A' }}>
                    <div className="w-3 h-3 rounded-full" style={{ background: m.color }} />
                  </div>

                  {/* Empty space */}
                  <div className="hidden md:block md:w-[calc(50%-2rem)]" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
