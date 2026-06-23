import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Check, Zap, Crown, Star } from 'lucide-react';

const plans = [
  {
    name: 'Basic',
    icon: Zap,
    monthly: 49,
    yearly: 39,
    color: '#00D4FF',
    gradient: 'from-cyan-500/10 to-blue-600/10',
    popular: false,
    features: [
      'Access to gym floor',
      'Basic cardio equipment',
      'Locker room access',
      'Fitness assessment',
      '2 group classes/month',
      'Mobile app access',
    ],
    excluded: ['Personal training', 'Nutrition coaching', 'Recovery lounge', 'VIP events'],
  },
  {
    name: 'Premium',
    icon: Star,
    monthly: 99,
    yearly: 79,
    color: '#FF3B30',
    gradient: 'from-red-500/10 to-orange-600/10',
    popular: true,
    features: [
      'Full gym access (24/7)',
      'All cardio & strength equipment',
      'Unlimited group classes',
      'Monthly trainer check-in',
      'Nutrition consultation',
      'Mobile app + progress tracking',
      'Recovery lounge access',
      'Guest passes (2/month)',
    ],
    excluded: ['Unlimited PT sessions', 'VIP priority booking'],
  },
  {
    name: 'Elite',
    icon: Crown,
    monthly: 199,
    yearly: 159,
    color: '#F39C12',
    gradient: 'from-yellow-500/10 to-orange-600/10',
    popular: false,
    features: [
      'All Premium benefits',
      'Unlimited personal training',
      'Weekly nutrition coaching',
      'Custom meal planning',
      'VIP priority booking',
      'Transformation photography',
      'Recovery & spa access',
      'Unlimited guest passes',
      'Annual body scan',
      'Exclusive member events',
    ],
    excluded: [],
  },
];

export default function MembershipSection() {
  const [yearly, setYearly] = useState(false);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="membership" className="relative py-24 md:py-32 bg-[#0A0A0A] overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-30" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-cyan-500/5 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 md:px-6" ref={ref}>
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <span className="text-cyan-400 text-sm font-semibold tracking-widest uppercase mb-3 block">Pricing Plans</span>
          <h2 className="text-4xl md:text-6xl font-black uppercase mb-4" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>
            Choose Your <span className="gradient-text">Membership</span>
          </h2>
          <p className="text-white/50 max-w-xl mx-auto mb-8">
            Flexible pricing designed for every commitment level. Cancel anytime.
          </p>

          {/* Toggle */}
          <div className="inline-flex items-center gap-4 glass rounded-full p-1.5">
            <button
              onClick={() => setYearly(false)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${!yearly ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white' : 'text-white/50'}`}
            >
              Monthly
            </button>
            <button
              onClick={() => setYearly(true)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all flex items-center gap-2 ${yearly ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white' : 'text-white/50'}`}
            >
              Yearly
              <span className="bg-green-500 text-white text-xs px-2 py-0.5 rounded-full">-20%</span>
            </button>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              className={`relative rounded-2xl overflow-hidden transition-all duration-300 ${
                plan.popular ? 'scale-105 z-10' : 'hover:scale-102'
              }`}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              whileHover={!plan.popular ? { y: -4 } : {}}
            >
              {plan.popular && (
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-500 via-orange-500 to-red-500" />
              )}

              <div className={`bg-gradient-to-br ${plan.gradient} border ${plan.popular ? 'border-red-500/30' : 'border-white/10'} rounded-2xl p-6 h-full`}>
                {/* Popular badge */}
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="bg-gradient-to-r from-red-500 to-orange-500 text-white text-xs font-bold px-4 py-1 rounded-full">
                      MOST POPULAR
                    </span>
                  </div>
                )}

                {/* Header */}
                <div className="flex items-center gap-3 mb-6 mt-2">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: plan.color + '20' }}>
                    <plan.icon size={20} style={{ color: plan.color }} />
                  </div>
                  <h3 className="text-xl font-bold text-white">{plan.name}</h3>
                </div>

                {/* Price */}
                <div className="mb-6">
                  <div className="flex items-end gap-1">
                    <span className="text-5xl font-black text-white">
                      ${yearly ? plan.yearly : plan.monthly}
                    </span>
                    <span className="text-white/40 text-sm mb-2">/month</span>
                  </div>
                  {yearly && (
                    <div className="text-green-400 text-sm">
                      Save ${(plan.monthly - plan.yearly) * 12}/year
                    </div>
                  )}
                </div>

                {/* Features */}
                <ul className="space-y-2.5 mb-6">
                  {plan.features.map((f, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm text-white/70">
                      <div className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: plan.color + '20' }}>
                        <Check size={10} style={{ color: plan.color }} />
                      </div>
                      {f}
                    </li>
                  ))}
                  {plan.excluded.map((f, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm text-white/25 line-through">
                      <div className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 bg-white/5">
                        <Check size={10} className="text-white/20" />
                      </div>
                      {f}
                    </li>
                  ))}
                </ul>

                <motion.button
                  className="w-full py-3 rounded-xl font-bold text-sm transition-all"
                  style={
                    plan.popular
                      ? { background: 'linear-gradient(135deg, #FF3B30, #FF6B30)', color: 'white' }
                      : { background: plan.color + '15', color: plan.color, border: `1px solid ${plan.color}30` }
                  }
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  {plan.popular ? '🔥 Get Premium' : `Start ${plan.name}`}
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.p
          className="text-center text-white/30 text-sm mt-8"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
        >
          All plans include a 7-day free trial • No contract required • Cancel anytime
        </motion.p>
      </div>
    </section>
  );
}
