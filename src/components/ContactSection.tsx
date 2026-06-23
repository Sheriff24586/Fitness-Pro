import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Phone, Mail, MapPin, Clock, Send, Check, MessageSquare, Calendar } from 'lucide-react';

const contactInfo = [
  { icon: Phone, label: 'Phone', value: '+1 (555) 123-4567', sub: 'Mon-Sat, 6am – 10pm', color: '#00D4FF' },
  { icon: Mail, label: 'Email', value: 'hello@fitnesspro.com', sub: 'We reply within 2 hours', color: '#27AE60' },
  { icon: MapPin, label: 'Location', value: '123 Fitness Ave, NYC 10001', sub: 'Main Branch', color: '#FF3B30' },
  { icon: Clock, label: 'Hours', value: 'Mon–Fri: 5am–11pm', sub: 'Sat–Sun: 6am–10pm', color: '#F39C12' },
];

const quickInquiries = ['Free Consultation', 'Membership Info', 'Personal Training', 'Class Schedule', 'Corporate Plans'];

export default function ContactSection() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!form.name.trim()) errs.name = 'Name is required';
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) errs.email = 'Valid email required';
    if (!form.message.trim()) errs.message = 'Message is required';
    return errs;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setSubmitted(true);
  };

  return (
    <section id="contact" className="relative py-24 md:py-32 bg-[#0A0A0A] overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-30" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-500/4 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-600/4 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 md:px-6" ref={ref}>
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <span className="text-cyan-400 text-sm font-semibold tracking-widest uppercase mb-3 block">Get In Touch</span>
          <h2 className="text-4xl md:text-6xl font-black uppercase mb-4" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>
            Contact <span className="gradient-text">Us</span>
          </h2>
          <p className="text-white/50 max-w-xl mx-auto">
            Ready to start your fitness journey? Reach out and we'll get you set up with everything you need.
          </p>
          <div className="section-divider w-24 mx-auto mt-4" />
        </motion.div>

        {/* Contact Info Cards */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          {contactInfo.map((info, i) => (
            <motion.div
              key={i}
              className="glass rounded-2xl p-4 group hover:border-white/20 transition-all"
              whileHover={{ y: -3 }}
            >
              <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform"
                style={{ background: info.color + '15' }}>
                <info.icon size={20} style={{ color: info.color }} />
              </div>
              <div className="text-white/40 text-xs mb-1">{info.label}</div>
              <div className="text-white font-semibold text-sm">{info.value}</div>
              <div className="text-white/30 text-xs mt-1">{info.sub}</div>
            </motion.div>
          ))}
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Form */}
          <motion.div
            className="glass rounded-2xl p-6 md:p-8"
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            {!submitted ? (
              <>
                <h3 className="text-xl font-bold text-white mb-2">Send us a message</h3>
                <p className="text-white/40 text-sm mb-6">We'll get back to you within 2 hours</p>

                {/* Quick inquiries */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {quickInquiries.map((q) => (
                    <button
                      key={q}
                      onClick={() => setForm(f => ({ ...f, subject: q }))}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                        form.subject === q ? 'bg-cyan-500 text-white' : 'glass text-white/50 hover:text-white'
                      }`}
                    >
                      {q}
                    </button>
                  ))}
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <input
                        type="text"
                        placeholder="Your Name*"
                        value={form.name}
                        onChange={e => { setForm(f => ({ ...f, name: e.target.value })); setErrors(er => ({ ...er, name: '' })); }}
                        className={`custom-input w-full px-4 py-3 rounded-xl text-sm ${errors.name ? 'border-red-500/50' : ''}`}
                      />
                      {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
                    </div>
                    <div>
                      <input
                        type="email"
                        placeholder="Email Address*"
                        value={form.email}
                        onChange={e => { setForm(f => ({ ...f, email: e.target.value })); setErrors(er => ({ ...er, email: '' })); }}
                        className={`custom-input w-full px-4 py-3 rounded-xl text-sm ${errors.email ? 'border-red-500/50' : ''}`}
                      />
                      {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
                    </div>
                  </div>
                  <input
                    type="tel"
                    placeholder="Phone (optional)"
                    value={form.phone}
                    onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                    className="custom-input w-full px-4 py-3 rounded-xl text-sm"
                  />
                  <input
                    type="text"
                    placeholder="Subject"
                    value={form.subject}
                    onChange={e => setForm(f => ({ ...f, subject: e.target.value }))}
                    className="custom-input w-full px-4 py-3 rounded-xl text-sm"
                  />
                  <div>
                    <textarea
                      placeholder="Your message..."
                      rows={4}
                      value={form.message}
                      onChange={e => { setForm(f => ({ ...f, message: e.target.value })); setErrors(er => ({ ...er, message: '' })); }}
                      className={`custom-input w-full px-4 py-3 rounded-xl text-sm resize-none ${errors.message ? 'border-red-500/50' : ''}`}
                    />
                    {errors.message && <p className="text-red-400 text-xs mt-1">{errors.message}</p>}
                  </div>
                  <motion.button
                    type="submit"
                    className="w-full py-3.5 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl text-white font-bold flex items-center justify-center gap-2"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Send size={18} /> Send Message
                  </motion.button>
                </form>
              </>
            ) : (
              <motion.div
                className="flex flex-col items-center justify-center text-center py-12"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <motion.div
                  className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mb-6"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 0.6 }}
                >
                  <Check size={40} className="text-green-400" />
                </motion.div>
                <h3 className="text-2xl font-bold text-white mb-2">Message Sent! 🎉</h3>
                <p className="text-white/50">We'll be in touch within 2 hours. Get ready to transform!</p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-6 px-6 py-2.5 glass rounded-full text-white/60 hover:text-white text-sm"
                >
                  Send Another
                </button>
              </motion.div>
            )}
          </motion.div>

          {/* Map & Quick Actions */}
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            {/* Map placeholder */}
            <div className="glass rounded-2xl overflow-hidden h-64">
              <div className="w-full h-full bg-gradient-to-br from-[#1a2a3a] to-[#0d1520] flex items-center justify-center relative">
                <div className="absolute inset-0 opacity-30">
                  <svg width="100%" height="100%" viewBox="0 0 400 250">
                    <defs>
                      <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                        <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(0,212,255,0.3)" strokeWidth="0.5" />
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#grid)" />
                    <line x1="0" y1="125" x2="400" y2="125" stroke="rgba(0,212,255,0.2)" strokeWidth="1" strokeDasharray="4,4" />
                    <line x1="200" y1="0" x2="200" y2="250" stroke="rgba(0,212,255,0.2)" strokeWidth="1" strokeDasharray="4,4" />
                  </svg>
                </div>
                <div className="relative z-10 text-center">
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-8 h-8 rounded-full bg-red-500 mx-auto mb-3 flex items-center justify-center"
                  >
                    <MapPin size={16} className="text-white" />
                  </motion.div>
                  <p className="text-white font-semibold">Fitness Pro HQ</p>
                  <p className="text-white/50 text-sm">123 Fitness Ave, New York City</p>
                  <motion.button
                    className="mt-3 px-4 py-1.5 bg-cyan-500/20 border border-cyan-500/30 rounded-full text-cyan-400 text-xs font-medium hover:bg-cyan-500/30 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    onClick={() => window.open('https://maps.google.com', '_blank')}
                  >
                    Open in Maps →
                  </motion.button>
                </div>
              </div>
            </div>

            {/* Quick action cards */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: MessageSquare, label: 'Live Chat', sub: 'Chat with us now', color: '#00D4FF', action: 'Live Support' },
                { icon: Calendar, label: 'Book Tour', sub: 'See our facilities', color: '#27AE60', action: 'Schedule Visit' },
                { icon: Phone, label: 'Call Now', sub: '+1 (555) 123-4567', color: '#FF3B30', action: 'Call' },
                { icon: Mail, label: 'WhatsApp', sub: 'Quick response', color: '#F39C12', action: 'Message' },
              ].map((item, i) => (
                <motion.button
                  key={i}
                  className="glass rounded-xl p-4 text-left group hover:border-white/20 transition-all"
                  whileHover={{ y: -2 }}
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  <item.icon size={20} className="mb-2" style={{ color: item.color }} />
                  <div className="text-white text-sm font-semibold">{item.label}</div>
                  <div className="text-white/40 text-xs">{item.sub}</div>
                </motion.button>
              ))}
            </div>

            {/* Business hours */}
            <div className="glass rounded-2xl p-5">
              <h4 className="text-white font-bold mb-3 flex items-center gap-2">
                <Clock size={16} className="text-cyan-400" /> Business Hours
              </h4>
              <div className="space-y-1.5">
                {[
                  { day: 'Monday – Friday', hours: '5:00 AM – 11:00 PM' },
                  { day: 'Saturday', hours: '6:00 AM – 10:00 PM' },
                  { day: 'Sunday', hours: '8:00 AM – 8:00 PM' },
                ].map((h, i) => (
                  <div key={i} className="flex justify-between text-sm">
                    <span className="text-white/50">{h.day}</span>
                    <span className="text-white font-medium">{h.hours}</span>
                  </div>
                ))}
                <div className="flex items-center gap-2 mt-2 pt-2 border-t border-white/5">
                  <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-green-400 text-xs font-medium">Open Now</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
