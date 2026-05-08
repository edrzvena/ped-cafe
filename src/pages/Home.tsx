import React from 'react';
import Hero from '../sections/home/Hero';
import CategoryBar from '../sections/home/CategoryBar';
import FeaturedMenu from '../sections/home/FeaturedMenu';
import InfoBanner from '../sections/home/InfoBanner';
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
      <CategoryBar />
      <FeaturedMenu />
      <InfoBanner />
      <Footer />
    </motion.main>
  );
};

export default Home;
