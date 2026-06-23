import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CustomCursor from './components/CustomCursor';
import Loader from './components/Loader';
import Navbar from './components/Navbar';
import ScrollToTop from './components/ScrollToTop';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import ServicesSection from './components/ServicesSection';
import ProgramsSection from './components/ProgramsSection';
import TrainersSection from './components/TrainersSection';
import LegacySection from './components/LegacySection';
import TransformationSection from './components/TransformationSection';
import TestimonialsSection from './components/TestimonialsSection';
import GallerySection from './components/GallerySection';
import MembershipSection from './components/MembershipSection';
import BMICalculator from './components/BMICalculator';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import MarqueeBand from './components/MarqueeBand';
import WhyChooseUs from './components/WhyChooseUs';

export default function App() {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      <CustomCursor />

      <Loader onComplete={() => setLoaded(true)} />

      <AnimatePresence>
        {loaded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <Navbar />
            <main>
              <HeroSection />
              <MarqueeBand />
              <AboutSection />
              <ServicesSection />
              <ProgramsSection />
              <WhyChooseUs />
              <TrainersSection />
              <LegacySection />
              <TransformationSection />
              <TestimonialsSection />
              <GallerySection />
              <MembershipSection />
              <MarqueeBand />
              <BMICalculator />
              <ContactSection />
            </main>
            <Footer />
            <ScrollToTop />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
