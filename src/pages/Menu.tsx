import React from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import MenuList from '../sections/menu/MenuList';
import { motion } from 'framer-motion';

const Menu: React.FC = () => {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-background"
    >
      <Navbar />

      <div className="pt-40 pb-20 px-6 bg-background text-center">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="max-w-3xl mx-auto space-y-6"
        >
          <h1 className="text-5xl md:text-7xl text-primary font-black">
            Our Menu
          </h1>
          <p className="text-primary/60 text-lg">
            Discover our carefully curated selection of premium coffee,
            refreshing beverages, and delicious bites.
          </p>
        </motion.div>
      </div>

      <MenuList />

      <Footer />
    </motion.main>
  );
};

export default Menu;
