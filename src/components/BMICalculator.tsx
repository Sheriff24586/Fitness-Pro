import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Activity, RotateCcw } from 'lucide-react';

type Unit = 'metric' | 'imperial';

interface BMIResult {
  value: number;
  category: string;
  color: string;
  recommendation: string;
  icon: string;
  angle: number;
}

function getBMIResult(bmi: number): BMIResult {
  if (bmi < 18.5) return {
    value: bmi, category: 'Underweight', color: '#3B82F6',
    recommendation: 'Focus on caloric surplus, strength training, and lean muscle building with our Muscle Building Program.',
    icon: '📉', angle: -75,
  };
  if (bmi < 25) return {
    value: bmi, category: 'Normal Weight', color: '#22C55E',
    recommendation: 'Great foundation! Maintain your health and improve performance with our Athletic Performance or Fitness programs.',
    icon: '✅', angle: -15,
  };
  if (bmi < 30) return {
    value: bmi, category: 'Overweight', color: '#F59E0B',
    recommendation: 'Our Weight Loss Program with HIIT and nutrition coaching is perfect to help you reach your healthy weight goal.',
    icon: '⚠️', angle: 35,
  };
  return {
    value: bmi, category: 'Obese', color: '#EF4444',
    recommendation: 'Start with our Beginner Fitness or Senior Fitness program with guided nutrition support for safe, sustainable progress.',
    icon: '🚨', angle: 75,
  };
}

const bmiCategories = [
  { label: 'Underweight', range: '< 18.5', color: '#3B82F6', width: '22%' },
  { label: 'Normal', range: '18.5–24.9', color: '#22C55E', width: '30%' },
  { label: 'Overweight', range: '25–29.9', color: '#F59E0B', width: '26%' },
  { label: 'Obese', range: '≥ 30', color: '#EF4444', width: '22%' },
];

export default function BMICalculator() {
  const [unit, setUnit] = useState<Unit>('metric');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [heightFt, setHeightFt] = useState('');
  const [heightIn, setHeightIn] = useState('');
  const [result, setResult] = useState<BMIResult | null>(null);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  const calculate = () => {
    let bmi = 0;
    if (unit === 'metric') {
      const h = parseFloat(height) / 100;
      const w = parseFloat(weight);
      if (h > 0 && w > 0) bmi = w / (h * h);
    } else {
      const h = parseFloat(heightFt) * 12 + parseFloat(heightIn || '0');
      const w = parseFloat(weight);
      if (h > 0 && w > 0) bmi = (w / (h * h)) * 703;
    }
    if (bmi > 0) setResult(getBMIResult(parseFloat(bmi.toFixed(1))));
  };

  const reset = () => {
    setHeight(''); setWeight(''); setHeightFt(''); setHeightIn(''); setResult(null);
  };

  return (
    <section className="relative py-24 bg-[#111111] overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-30" />
      <div className="absolute top-1/2 right-0 w-[400px] h-[400px] bg-blue-600/5 rounded-full blur-3xl" />

      <div className="relative max-w-4xl mx-auto px-4 md:px-6" ref={ref}>
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <span className="text-cyan-400 text-sm font-semibold tracking-widest uppercase mb-3 block">Health Check</span>
          <h2 className="text-4xl md:text-5xl font-black uppercase mb-4" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>
            BMI <span className="gradient-text">Calculator</span>
          </h2>
          <p className="text-white/50">Quickly assess your body mass index and get personalized fitness recommendations.</p>
        </motion.div>

        <motion.div
          className="glass rounded-3xl p-6 md:p-10"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <div className="grid md:grid-cols-2 gap-8">
            {/* Inputs */}
            <div>
              {/* Unit Toggle */}
              <div className="inline-flex bg-white/5 rounded-xl p-1 mb-6">
                {(['metric', 'imperial'] as Unit[]).map(u => (
                  <button
                    key={u}
                    onClick={() => { setUnit(u); reset(); }}
                    className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-all ${unit === u ? 'bg-cyan-500 text-white' : 'text-white/50 hover:text-white'}`}
                  >
                    {u} {u === 'metric' ? '(kg/cm)' : '(lbs/ft)'}
                  </button>
                ))}
              </div>

              <div className="space-y-4">
                {/* Height */}
                {unit === 'metric' ? (
                  <div>
                    <label className="text-white/60 text-sm block mb-1.5">Height (cm)</label>
                    <input
                      type="number"
                      value={height}
                      onChange={e => setHeight(e.target.value)}
                      placeholder="e.g. 175"
                      className="custom-input w-full px-4 py-3 rounded-xl text-white"
                    />
                  </div>
                ) : (
                  <div>
                    <label className="text-white/60 text-sm block mb-1.5">Height</label>
                    <div className="flex gap-3">
                      <input type="number" value={heightFt} onChange={e => setHeightFt(e.target.value)} placeholder="ft" className="custom-input flex-1 px-4 py-3 rounded-xl text-white" />
                      <input type="number" value={heightIn} onChange={e => setHeightIn(e.target.value)} placeholder="in" className="custom-input flex-1 px-4 py-3 rounded-xl text-white" />
                    </div>
                  </div>
                )}

                {/* Weight */}
                <div>
                  <label className="text-white/60 text-sm block mb-1.5">Weight ({unit === 'metric' ? 'kg' : 'lbs'})</label>
                  <input
                    type="number"
                    value={weight}
                    onChange={e => setWeight(e.target.value)}
                    placeholder={unit === 'metric' ? 'e.g. 70' : 'e.g. 154'}
                    className="custom-input w-full px-4 py-3 rounded-xl text-white"
                  />
                </div>

                <div className="flex gap-3">
                  <motion.button
                    onClick={calculate}
                    className="flex-1 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl text-white font-bold flex items-center justify-center gap-2"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <Activity size={18} /> Calculate BMI
                  </motion.button>
                  <motion.button
                    onClick={reset}
                    className="py-3 px-4 glass rounded-xl text-white/60 hover:text-white transition-colors"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <RotateCcw size={18} />
                  </motion.button>
                </div>
              </div>

              {/* BMI Scale */}
              <div className="mt-6">
                <div className="flex gap-1 rounded-lg overflow-hidden mb-2">
                  {bmiCategories.map((cat) => (
                    <div key={cat.label} style={{ width: cat.width, background: cat.color + '80' }} className="h-3" />
                  ))}
                </div>
                <div className="flex justify-between text-xs text-white/40">
                  <span>Underweight</span>
                  <span>Normal</span>
                  <span>Overweight</span>
                  <span>Obese</span>
                </div>
              </div>
            </div>

            {/* Result */}
            <div className="flex flex-col items-center justify-center">
              <AnimatePresence mode="wait">
                {result ? (
                  <motion.div
                    className="text-center w-full"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ type: 'spring', damping: 20 }}
                  >
                    {/* BMI Gauge */}
                    <div className="relative w-48 h-24 mx-auto mb-4">
                      <svg viewBox="0 0 200 110" className="w-full">
                        {/* Background arc */}
                        <path d="M 10 100 A 90 90 0 0 1 190 100" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="16" strokeLinecap="round" />
                        {/* Color segments */}
                        <path d="M 10 100 A 90 90 0 0 1 58 27" fill="none" stroke="#3B82F6" strokeWidth="14" strokeLinecap="round" opacity="0.7" />
                        <path d="M 58 27 A 90 90 0 0 1 120 10" fill="none" stroke="#22C55E" strokeWidth="14" opacity="0.7" />
                        <path d="M 120 10 A 90 90 0 0 1 165 34" fill="none" stroke="#F59E0B" strokeWidth="14" opacity="0.7" />
                        <path d="M 165 34 A 90 90 0 0 1 190 100" fill="none" stroke="#EF4444" strokeWidth="14" strokeLinecap="round" opacity="0.7" />
                        {/* Needle */}
                        <g transform={`translate(100, 100) rotate(${result.angle})`}>
                          <line x1="0" y1="0" x2="0" y2="-70" stroke={result.color} strokeWidth="3" strokeLinecap="round" />
                          <circle cx="0" cy="0" r="6" fill={result.color} />
                        </g>
                      </svg>
                    </div>

                    <motion.div
                      className="text-6xl font-black mb-2"
                      style={{ color: result.color }}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', delay: 0.2 }}
                    >
                      {result.value}
                    </motion.div>
                    <div className="text-xl font-bold text-white mb-1">{result.icon} {result.category}</div>
                    <p className="text-white/50 text-sm leading-relaxed mt-3 text-left bg-white/5 rounded-xl p-4">
                      <span className="text-cyan-400 font-semibold block mb-1">Our Recommendation:</span>
                      {result.recommendation}
                    </p>
                    <motion.button
                      className="mt-4 px-6 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full text-white text-sm font-semibold"
                      whileHover={{ scale: 1.05 }}
                      onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                    >
                      Get Personalized Plan →
                    </motion.button>
                  </motion.div>
                ) : (
                  <motion.div
                    className="text-center text-white/20"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <Activity size={64} className="mx-auto mb-4 opacity-20" />
                    <p className="text-sm">Enter your measurements<br />to calculate your BMI</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
