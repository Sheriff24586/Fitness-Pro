import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import CountUp from 'react-countup';
import { Target, Eye, Heart, Shield, Zap, Trophy } from 'lucide-react';

const values = [
  { icon: Target, title: 'Excellence', desc: 'We push boundaries and demand the best from ourselves and our members.' },
  { icon: Shield, title: 'Integrity', desc: 'Honest guidance, transparent results, and genuine commitment.' },
  { icon: Heart, title: 'Community', desc: 'A family that lifts each other — literally and figuratively.' },
  { icon: Zap, title: 'Innovation', desc: 'Cutting-edge methods, science-backed programs, and modern facilities.' },
  { icon: Trophy, title: 'Results', desc: 'We measure our success by your transformation.' },
  { icon: Eye, title: 'Vision', desc: 'Building a healthier world, one member at a time.' },
];

const counters = [
  { end: 15000, label: 'Members', suffix: '+' },
  { end: 12, label: 'Years', suffix: '+' },
  { end: 48, label: 'Trainers', suffix: '' },
  { end: 97, label: '% Satisfaction', suffix: '' },
];

export default function AboutSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });
  const { ref: counterRef, inView: counterInView } = useInView({ triggerOnce: true, threshold: 0.3 });

  return (
    <section id="about" className="relative py-24 md:py-32 bg-[#0A0A0A] overflow-hidden">
      <div className="absolute inset-0 hex-pattern opacity-50" />
      {/* Glow orbs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-600/5 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 md:px-6" ref={ref}>
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <span className="text-cyan-400 text-sm font-semibold tracking-widest uppercase mb-3 block">Our Story</span>
          <h2 className="text-4xl md:text-6xl font-black uppercase mb-4" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>
            About <span className="gradient-text">Fitness Pro</span>
          </h2>
          <div className="section-divider w-24 mx-auto" />
        </motion.div>

        {/* Main content grid */}
        <div className="grid lg:grid-cols-2 gap-12 md:gap-20 items-center mb-20">
          {/* Left — Image collage */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="rounded-2xl overflow-hidden h-56 md:h-72">
                  <img
                    src="https://images.pexels.com/photos/28320723/pexels-photo-28320723.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=600&w=500"
                    alt="Gym interior"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="rounded-2xl overflow-hidden h-40 md:h-48">
                  <img
                    src="https://images.pexels.com/photos/4164766/pexels-photo-4164766.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=400&w=500"
                    alt="Weights"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="rounded-2xl overflow-hidden h-40 md:h-48">
                  <img
                    src="https://images.pexels.com/photos/8874364/pexels-photo-8874364.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=400&w=500"
                    alt="Training"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="rounded-2xl overflow-hidden h-56 md:h-72">
                  <img
                    src="https://images.pexels.com/photos/31028213/pexels-photo-31028213.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=600&w=500"
                    alt="Fitness"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>
            </div>
            {/* Badge overlay */}
            <motion.div
              className="absolute -bottom-6 -right-4 glass rounded-2xl p-4 text-center neon-blue"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              <div className="text-2xl font-black gradient-text">12+</div>
              <div className="text-white/60 text-xs">Years of<br/>Excellence</div>
            </motion.div>
          </motion.div>

          {/* Right — Text */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <p className="text-white/70 text-lg leading-relaxed mb-6">
              Founded in 2012, <span className="text-cyan-400 font-semibold">Fitness Pro</span> was born from a simple belief: 
              everyone deserves access to world-class fitness. From a single studio, we've grown into a 
              premier fitness destination with state-of-the-art facilities, expert trainers, and a 
              thriving community of over 15,000 members.
            </p>
            <p className="text-white/60 text-base leading-relaxed mb-8">
              We combine evidence-based training methodologies with personalized coaching to deliver 
              real, lasting results. Our philosophy is simple — push limits, celebrate progress, and 
              transform lives.
            </p>

            {/* Mission & Vision cards */}
            <div className="space-y-4 mb-8">
              <div className="glass rounded-xl p-5 border-l-2 border-cyan-500">
                <h3 className="text-cyan-400 font-bold mb-2 flex items-center gap-2">
                  <Target size={18} /> Our Mission
                </h3>
                <p className="text-white/60 text-sm">
                  To empower individuals through fitness, building strength, confidence, and resilience 
                  that extends far beyond the gym.
                </p>
              </div>
              <div className="glass rounded-xl p-5 border-l-2 border-blue-500">
                <h3 className="text-blue-400 font-bold mb-2 flex items-center gap-2">
                  <Eye size={18} /> Our Vision
                </h3>
                <p className="text-white/60 text-sm">
                  To be the world's most impactful fitness brand — where transformation is not just 
                  physical, but mental and emotional.
                </p>
              </div>
            </div>

            <motion.button
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full text-white font-semibold hover:shadow-lg hover:shadow-cyan-500/30 transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Start Your Journey
            </motion.button>
          </motion.div>
        </div>

        {/* Core Values */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <h3 className="text-center text-2xl md:text-3xl font-black uppercase mb-8" style={{ fontFamily: 'Oswald, sans-serif' }}>
            Our Core <span className="gradient-text">Values</span>
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {values.map((v, i) => (
              <motion.div
                key={i}
                className="glass rounded-xl p-5 group hover:border-cyan-500/30 transition-all duration-300 card-hover"
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.5 + i * 0.1 }}
                whileHover={{ borderColor: 'rgba(0, 212, 255, 0.3)' }}
              >
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500/20 to-blue-600/20 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  <v.icon size={20} className="text-cyan-400" />
                </div>
                <h4 className="font-bold text-white mb-1">{v.title}</h4>
                <p className="text-white/50 text-xs leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Animated Counters */}
        <motion.div
          ref={counterRef}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
        >
          {counters.map((c, i) => (
            <div key={i} className="text-center">
              <div className="text-4xl md:text-5xl font-black gradient-text mb-2 counter-value">
                {counterInView ? <CountUp end={c.end} duration={2.5} separator="," suffix={c.suffix} /> : '0'}
              </div>
              <div className="text-white/50 text-sm">{c.label}</div>
              <div className="mt-2 h-0.5 bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
