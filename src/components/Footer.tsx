import { useState } from 'react';
import { motion } from 'framer-motion';
import { Zap, ArrowRight, Check } from 'lucide-react';

const navGroups = [
  {
    title: 'Company',
    links: ['About Us', 'Our Mission', 'Careers', 'Press', 'Blog'],
  },
  {
    title: 'Services',
    links: ['Personal Training', 'Group Classes', 'Nutrition', 'Online Training', 'Corporate Wellness'],
  },
  {
    title: 'Programs',
    links: ['Beginner Fitness', 'Weight Loss', 'Muscle Building', 'Athletic Performance', "Women's Fitness"],
  },
  {
    title: 'Support',
    links: ['FAQ', 'Contact Us', 'Privacy Policy', 'Terms of Service', 'Accessibility'],
  },
];

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id.toLowerCase().replace(/\s+/g, ''));
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    else document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#080808] border-t border-white/5 overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-20" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[200px] bg-cyan-500/4 rounded-full blur-3xl" />

      {/* Newsletter Banner */}
      <div className="relative border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl font-black text-white mb-1" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>
                JOIN THE <span className="gradient-text">FITNESS PRO</span> NEWSLETTER
              </h3>
              <p className="text-white/50 text-sm">Workout tips, nutrition guides, member spotlights & exclusive offers.</p>
            </div>
            {!subscribed ? (
              <form
                onSubmit={e => { e.preventDefault(); if (email.includes('@')) setSubscribed(true); }}
                className="flex gap-2 w-full md:w-auto"
              >
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="custom-input flex-1 md:w-64 px-4 py-3 rounded-full text-sm"
                />
                <motion.button
                  type="submit"
                  className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full text-white font-semibold flex items-center gap-2 whitespace-nowrap"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Subscribe <ArrowRight size={16} />
                </motion.button>
              </form>
            ) : (
              <motion.div
                className="flex items-center gap-2 text-green-400"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <Check size={20} /> <span className="font-semibold">You're in! Welcome to the family. 💪</span>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="relative max-w-7xl mx-auto px-4 md:px-6 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-6 gap-8 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <button onClick={() => scrollTo('home')} className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
                <Zap size={18} className="text-white fill-white" />
              </div>
              <span className="text-xl font-black tracking-wider" style={{ fontFamily: 'Bebas Neue, sans-serif', letterSpacing: '0.12em' }}>
                <span className="text-white">FITNESS</span>
                <span className="gradient-text"> PRO</span>
              </span>
            </button>
            <p className="text-white/40 text-sm leading-relaxed mb-6 max-w-xs">
              Premium fitness center dedicated to transforming lives through expert training, nutrition, and community support.
            </p>

            {/* Social icons */}
            <div className="flex gap-3">
              {['FB', 'IG', 'TW', 'YT', 'TK'].map((s) => (
                <motion.button
                  key={s}
                  className="w-9 h-9 rounded-lg glass flex items-center justify-center text-white/40 hover:text-cyan-400 hover:border-cyan-500/30 text-xs font-bold transition-all"
                  whileHover={{ y: -2, scale: 1.1 }}
                >
                  {s}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Nav groups */}
          {navGroups.map((group) => (
            <div key={group.title}>
              <h4 className="text-white font-bold text-sm mb-4 uppercase tracking-wider">{group.title}</h4>
              <ul className="space-y-2">
                {group.links.map((link) => (
                  <li key={link}>
                    <button
                      onClick={() => scrollTo(link)}
                      className="text-white/40 hover:text-cyan-400 text-sm transition-colors text-left"
                    >
                      {link}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/30 text-sm text-center">
            © {new Date().getFullYear()} Fitness Pro. All rights reserved. Built with 💪 for champions.
          </p>
          <div className="flex gap-6">
            {['Privacy', 'Terms', 'Cookies'].map(link => (
              <button key={link} className="text-white/30 hover:text-white text-xs transition-colors">{link}</button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
