import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Clock, Target, Star } from 'lucide-react';

const filters = ['All', 'Beginner', 'Intermediate', 'Advanced'];

const programs = [
  {
    title: 'Beginner Fitness',
    category: 'Beginner',
    duration: '8 Weeks',
    difficulty: 1,
    goal: 'Foundation & Habit Building',
    emoji: '🌱',
    color: '#27AE60',
    desc: 'Perfect for those just starting out. Build a strong foundation with structured, progressive workouts designed for all fitness levels.',
    features: ['Basic movement patterns', 'Cardio fundamentals', 'Nutritional basics', 'Weekly check-ins'],
    image: 'https://images.pexels.com/photos/6539842/pexels-photo-6539842.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=300&w=500',
  },
  {
    title: 'Weight Loss Program',
    category: 'Intermediate',
    duration: '12 Weeks',
    difficulty: 2,
    goal: 'Fat Loss & Toning',
    emoji: '🔥',
    color: '#FF6B30',
    desc: 'A science-backed fat loss program combining HIIT, strength, and nutrition to maximize calorie burn and sculpt your physique.',
    features: ['HIIT 3x/week', 'Strength training 2x/week', 'Custom meal plan', 'Progress photos weekly'],
    image: 'https://images.pexels.com/photos/6455771/pexels-photo-6455771.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=300&w=500',
  },
  {
    title: 'Muscle Building',
    category: 'Intermediate',
    duration: '16 Weeks',
    difficulty: 3,
    goal: 'Mass Gain & Strength',
    emoji: '💪',
    color: '#00D4FF',
    desc: 'A hypertrophy-focused program engineered to pack on lean muscle mass with progressive overload and periodized training.',
    features: ['5-day split routine', 'Progressive overload', 'Protein & macro tracking', 'Recovery optimization'],
    image: 'https://images.pexels.com/photos/8874364/pexels-photo-8874364.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=300&w=500',
  },
  {
    title: 'Athletic Performance',
    category: 'Advanced',
    duration: '20 Weeks',
    difficulty: 4,
    goal: 'Speed, Power & Agility',
    emoji: '⚡',
    color: '#9B59B6',
    desc: 'Elite athletic conditioning for competitors and performance enthusiasts seeking peak physical capability.',
    features: ['Sport-specific drills', 'Plyometric training', 'Olympic lifts', 'Performance testing'],
    image: 'https://images.pexels.com/photos/15586393/pexels-photo-15586393.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=300&w=500',
  },
  {
    title: 'Senior Fitness',
    category: 'Beginner',
    duration: '10 Weeks',
    difficulty: 1,
    goal: 'Mobility & Vitality',
    emoji: '🌟',
    color: '#F39C12',
    desc: 'A gentle yet effective program designed for seniors to improve strength, balance, flexibility, and overall wellbeing.',
    features: ['Low-impact exercises', 'Balance & coordination', 'Joint mobility work', 'Supervised sessions'],
    image: 'https://images.pexels.com/photos/6922168/pexels-photo-6922168.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=300&w=500',
  },
  {
    title: "Women's Fitness",
    category: 'Intermediate',
    duration: '12 Weeks',
    difficulty: 2,
    goal: 'Tone, Shape & Confidence',
    emoji: '👑',
    color: '#E91E8C',
    desc: "Specifically designed for women — combining strength, cardio, and wellness to sculpt a strong, confident, and healthy body.",
    features: ['Glute & core focus', 'Hormonal cycle training', 'Body composition goals', 'Mindset coaching'],
    image: 'https://images.pexels.com/photos/29825216/pexels-photo-29825216.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=300&w=500',
  },
];

function DifficultyBar({ level, color }: { level: number; color: string }) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map(i => (
        <div
          key={i}
          className="h-1.5 flex-1 rounded-full transition-all"
          style={{ background: i <= level ? color : 'rgba(255,255,255,0.1)' }}
        />
      ))}
    </div>
  );
}

export default function ProgramsSection() {
  const [filter, setFilter] = useState('All');
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  const filtered = programs.filter(p => filter === 'All' || p.category === filter);

  return (
    <section id="programs" className="relative py-24 md:py-32 bg-[#0A0A0A] overflow-hidden">
      <div className="absolute inset-0 hex-pattern" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-blue-600/5 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 md:px-6" ref={ref}>
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <span className="text-cyan-400 text-sm font-semibold tracking-widest uppercase mb-3 block">Training Programs</span>
          <h2 className="text-4xl md:text-6xl font-black uppercase mb-4" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>
            Find Your <span className="gradient-text">Program</span>
          </h2>
          <p className="text-white/50 max-w-xl mx-auto mb-8">
            Science-backed programs designed for every goal, fitness level, and lifestyle.
          </p>

          {/* Filter Tabs */}
          <div className="flex flex-wrap justify-center gap-3">
            {filters.map(f => (
              <motion.button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all ${
                  filter === f
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white neon-blue'
                    : 'glass text-white/60 hover:text-white hover:border-cyan-500/30'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {f}
              </motion.button>
            ))}
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={filter}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            {filtered.map((prog, i) => (
              <motion.div
                key={prog.title}
                className="glass rounded-2xl overflow-hidden group hover:border-white/20 transition-all duration-300 card-hover"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ borderColor: prog.color + '40' }}
              >
                {/* Image */}
                <div className="relative h-44 overflow-hidden">
                  <img
                    src={prog.image}
                    alt={prog.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                  <div className="absolute top-3 right-3">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold glass"
                      style={{ color: prog.color, borderColor: prog.color + '30' }}>
                      {prog.category}
                    </span>
                  </div>
                  <div className="absolute bottom-3 left-3 text-3xl">{prog.emoji}</div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="text-xl font-bold text-white mb-1">{prog.title}</h3>
                  <p className="text-white/50 text-sm mb-4 leading-relaxed">{prog.desc}</p>

                  {/* Difficulty */}
                  <div className="mb-3">
                    <div className="flex justify-between text-xs text-white/40 mb-1">
                      <span>Difficulty</span>
                      <span>{['', 'Beginner', 'Easy', 'Moderate', 'Hard', 'Expert'][prog.difficulty]}</span>
                    </div>
                    <DifficultyBar level={prog.difficulty} color={prog.color} />
                  </div>

                  {/* Meta */}
                  <div className="flex gap-4 text-sm text-white/50 mb-4">
                    <span className="flex items-center gap-1.5">
                      <Clock size={14} style={{ color: prog.color }} />
                      {prog.duration}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Target size={14} style={{ color: prog.color }} />
                      {prog.goal}
                    </span>
                  </div>

                  {/* Features */}
                  <ul className="space-y-1.5 mb-5">
                    {prog.features.map((f, j) => (
                      <li key={j} className="flex items-center gap-2 text-xs text-white/60">
                        <Star size={10} style={{ color: prog.color }} className="fill-current flex-shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>

                  <motion.button
                    className="w-full py-2.5 rounded-xl text-sm font-bold transition-all"
                    style={{ background: `${prog.color}15`, color: prog.color, border: `1px solid ${prog.color}25` }}
                    whileHover={{ background: `${prog.color}25`, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                  >
                    Enroll Now →
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
