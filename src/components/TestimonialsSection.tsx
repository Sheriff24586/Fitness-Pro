import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'Lost 35 lbs in 4 months',
    rating: 5,
    text: "Fitness Pro completely changed my life. The trainers are world-class and the community is so supportive. I've tried dozens of gyms over the years — none come close to this level of professionalism and results.",
    image: 'https://images.pexels.com/photos/6539842/pexels-photo-6539842.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=100&w=100',
    program: 'Weight Loss Program',
  },
  {
    name: 'Marcus Williams',
    role: 'Gained 18 lbs of muscle',
    rating: 5,
    text: "Coach Rodriguez's muscle building program is unlike anything I've experienced. Scientific, progressive, and results-driven. I hit my first 315lb bench press last month. The programming here is elite.",
    image: 'https://images.pexels.com/photos/8612491/pexels-photo-8612491.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=100&w=100',
    program: 'Muscle Building Program',
  },
  {
    name: 'Elena Rodriguez',
    role: 'Athletic Performance Member',
    rating: 5,
    text: "From injury recovery to competing again — Fitness Pro made it possible. The holistic approach combining strength, mobility, and nutrition is exactly what I needed. My performance has improved 40% in six months.",
    image: 'https://images.pexels.com/photos/29825216/pexels-photo-29825216.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=100&w=100',
    program: 'Athletic Performance',
  },
  {
    name: 'David Chen',
    role: 'Senior Fitness Member',
    rating: 5,
    text: "At 62, I was skeptical about starting a fitness program. The senior program here has given me energy I haven't felt in decades. The trainers are patient, knowledgeable, and genuinely care about your wellbeing.",
    image: 'https://images.pexels.com/photos/6922168/pexels-photo-6922168.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=100&w=100',
    program: 'Senior Fitness',
  },
  {
    name: 'Priya Patel',
    role: 'Transformation Journey',
    rating: 5,
    text: "The nutrition coaching alone is worth the membership. Aisha helped me understand food like never before and the combination with strength training has been transformative — inside and out. 10/10 recommend!",
    image: 'https://images.pexels.com/photos/6455771/pexels-photo-6455771.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=100&w=100',
    program: "Women's Fitness",
  },
];

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} size={14} className="text-yellow-400 fill-yellow-400" />
      ))}
    </div>
  );
}

export default function TestimonialsSection() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrent(p => (p + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const goTo = (idx: number) => {
    setDirection(idx > current ? 1 : -1);
    setCurrent(idx);
  };

  const prev = () => { setDirection(-1); setCurrent(p => (p - 1 + testimonials.length) % testimonials.length); };
  const next = () => { setDirection(1); setCurrent(p => (p + 1) % testimonials.length); };

  const t = testimonials[current];

  return (
    <section id="testimonials" className="relative py-24 md:py-32 bg-[#0A0A0A] overflow-hidden">
      <div className="absolute inset-0 hex-pattern opacity-40" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/4 rounded-full blur-3xl" />

      <div className="relative max-w-5xl mx-auto px-4 md:px-6" ref={ref}>
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <span className="text-cyan-400 text-sm font-semibold tracking-widest uppercase mb-3 block">Real Results</span>
          <h2 className="text-4xl md:text-6xl font-black uppercase mb-4" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>
            Member <span className="gradient-text">Testimonials</span>
          </h2>
          <div className="section-divider w-24 mx-auto" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          {/* Main testimonial */}
          <div className="relative">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={current}
                custom={direction}
                initial={{ opacity: 0, x: direction * 60 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -direction * 60 }}
                transition={{ duration: 0.4 }}
                className="glass rounded-3xl p-8 md:p-12 text-center relative overflow-hidden"
              >
                {/* Decorative quote */}
                <div className="absolute top-6 left-6 text-cyan-500/10">
                  <Quote size={80} />
                </div>
                <div className="absolute bottom-6 right-6 text-cyan-500/5 rotate-180">
                  <Quote size={80} />
                </div>

                <div className="relative z-10">
                  <div className="flex justify-center mb-4">
                    <StarRating count={t.rating} />
                  </div>

                  <blockquote className="text-lg md:text-xl text-white/80 font-light leading-relaxed mb-8 max-w-3xl mx-auto italic">
                    "{t.text}"
                  </blockquote>

                  <div className="flex items-center justify-center gap-4">
                    <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-cyan-500/50">
                      <img src={t.image} alt={t.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="text-left">
                      <div className="font-bold text-white">{t.name}</div>
                      <div className="text-cyan-400 text-sm">{t.role}</div>
                      <div className="text-white/40 text-xs mt-0.5">Program: {t.program}</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Arrow controls */}
            <button
              onClick={prev}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-6 w-10 h-10 rounded-full glass flex items-center justify-center text-white/60 hover:text-cyan-400 hover:border-cyan-500/40 transition-all"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={next}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-6 w-10 h-10 rounded-full glass flex items-center justify-center text-white/60 hover:text-cyan-400 hover:border-cyan-500/40 transition-all"
            >
              <ChevronRight size={20} />
            </button>
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className={`rounded-full transition-all duration-300 ${
                  i === current ? 'w-6 h-2 bg-cyan-400' : 'w-2 h-2 bg-white/20 hover:bg-white/40'
                }`}
              />
            ))}
          </div>

          {/* Mini testimonial cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-10 hidden md:grid">
            {testimonials.filter((_, i) => i !== current).slice(0, 4).map((t2, i) => (
              <motion.button
                key={i}
                onClick={() => { const idx = testimonials.indexOf(t2); goTo(idx); }}
                className="glass rounded-xl p-3 text-left hover:border-cyan-500/30 transition-all"
                whileHover={{ y: -2 }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-full overflow-hidden">
                    <img src={t2.image} alt={t2.name} className="w-full h-full object-cover" />
                  </div>
                  <span className="text-white text-xs font-semibold truncate">{t2.name}</span>
                </div>
                <p className="text-white/40 text-xs line-clamp-2">{t2.text.substring(0, 60)}...</p>
              </motion.button>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
