import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Shield, Zap, Users, Award, TrendingUp, Clock } from 'lucide-react';

const reasons = [
  { icon: Shield, title: 'Certified Experts', desc: 'All trainers hold internationally recognized certifications with verified track records.' },
  { icon: Zap, title: 'World-Class Equipment', desc: 'State-of-the-art machinery from the world\'s leading fitness brands, maintained daily.' },
  { icon: Users, title: 'Supportive Community', desc: '15,000+ members who motivate, inspire, and lift each other to new heights.' },
  { icon: Award, title: 'Proven Results', desc: '9,800+ documented transformations with measurable, real-world results.' },
  { icon: TrendingUp, title: 'Science-Backed Programs', desc: 'Evidence-based methodologies combining sports science, nutrition, and psychology.' },
  { icon: Clock, title: '24/7 Access', desc: 'Premium members enjoy round-the-clock access to our world-class facilities.' },
];

export default function WhyChooseUs() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section className="relative py-20 bg-gradient-to-b from-[#111111] to-[#0A0A0A] overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-20" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-blue-900/10 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 md:px-6" ref={ref}>
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="text-cyan-400 text-sm font-semibold tracking-widest uppercase mb-3 block">Why Fitness Pro?</span>
          <h2 className="text-3xl md:text-5xl font-black uppercase" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>
            The <span className="gradient-text">Fitness Pro</span> Difference
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {reasons.map((r, i) => (
            <motion.div
              key={i}
              className="group flex gap-4 glass rounded-xl p-5 hover:border-cyan-500/20 transition-all duration-300"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ x: 4 }}
            >
              <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-600/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                <r.icon size={20} className="text-cyan-400" />
              </div>
              <div>
                <h3 className="font-bold text-white mb-1">{r.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{r.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA strip */}
        <motion.div
          className="mt-12 rounded-2xl overflow-hidden relative"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          <div className="bg-gradient-to-r from-cyan-600/20 via-blue-700/20 to-cyan-600/20 border border-cyan-500/20 rounded-2xl p-8 md:p-10 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent" />
            <div className="relative">
              <h3 className="text-2xl md:text-4xl font-black text-white mb-3" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>
                READY TO ELEVATE YOUR FITNESS JOURNEY?
              </h3>
              <p className="text-white/50 mb-6 max-w-xl mx-auto">Start with a free 7-day trial — no credit card required. Experience the Fitness Pro difference today.</p>
              <div className="flex gap-3 justify-center flex-wrap">
                <motion.button
                  className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full text-white font-bold"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Start Free Trial
                </motion.button>
                <motion.button
                  className="px-8 py-3 border border-white/20 rounded-full text-white font-bold hover:bg-white/5 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => document.getElementById('membership')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  View Plans
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
