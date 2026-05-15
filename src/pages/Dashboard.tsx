import React from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import OrderStatus from '../sections/dashboard/OrderStatus';
import OrderHistory from '../sections/dashboard/OrderHistory';
import PointsCard from '../sections/dashboard/PointsCard';
import { motion } from 'framer-motion';

const Dashboard: React.FC = () => {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-background"
    >
      <Navbar />
      
      <div className="pt-24 md:pt-40 pb-12 md:pb-20 px-6">
        <div className="max-w-7xl mx-auto space-y-8 md:space-y-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
            <div className="space-y-1 md:space-y-2">
              <h1 className="text-4xl md:text-5xl font-black text-primary">Dashboard</h1>
              <p className="text-primary/50 text-sm md:text-base">Welcome back, Coffee Lover!</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1 space-y-6 md:space-y-8">
              <PointsCard />
              <OrderStatus />
            </div>
            <div className="lg:col-span-2">
              <OrderHistory />
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </motion.main>
  );
};

export default Dashboard;
