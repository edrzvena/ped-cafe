import React from 'react';
import Hero from '../sections/home/Hero';
import Promo from '../sections/home/Promo';
import Features from '../sections/home/Features';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { motion } from 'framer-motion';

const Home: React.FC = () => {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-background"
    >
      <Navbar />
      <Hero />
      <Promo />
      <Features />
      <Footer />
    </motion.main>
  );
};

export default Home;
