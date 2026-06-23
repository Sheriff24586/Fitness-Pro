import { motion } from 'framer-motion';

const items = [
  '🔥 Personal Training',
  '⚡ Strength & Conditioning',
  '🏆 Championship Programs',
  '💪 Body Transformation',
  '🎯 Nutrition Coaching',
  '🌟 Group Classes',
  '🧬 Athletic Performance',
  '🥊 HIIT Training',
  '🏋️ Olympic Lifting',
  '❤️ Recovery & Wellness',
];

export default function MarqueeBand() {
  const repeated = [...items, ...items, ...items];

  return (
    <div className="relative bg-gradient-to-r from-cyan-600 via-blue-600 to-cyan-600 py-3 overflow-hidden border-y border-cyan-500/30">
      <motion.div
        className="flex gap-8 whitespace-nowrap"
        animate={{ x: [0, -((items.length) * 200)] }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
      >
        {repeated.map((item, i) => (
          <span key={i} className="text-white font-bold text-sm tracking-wide flex-shrink-0">
            {item}
            <span className="mx-4 text-white/40">|</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}
