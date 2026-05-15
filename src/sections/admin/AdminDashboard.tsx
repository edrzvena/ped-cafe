import React from 'react';
import { FiCoffee, FiStar, FiTag, FiTrendingUp } from 'react-icons/fi';
import { motion } from 'framer-motion';
import type { MenuItem } from '../../types';

interface AdminDashboardProps {
  menuItems: MenuItem[];
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ menuItems }) => {
  const stats = [
    { label: 'Total Menu', value: menuItems.length, icon: <FiCoffee />, color: 'bg-blue-500' },
    { label: 'Popular Items', value: menuItems.filter(i => i.isPopular).length, icon: <FiStar />, color: 'bg-yellow-500' },
    { label: 'Categories', value: new Set(menuItems.map(i => i.category)).size, icon: <FiTag />, color: 'bg-purple-500' },
    { label: 'Active Status', value: menuItems.filter(i => i.is_available !== false).length, icon: <FiTrendingUp />, color: 'bg-green-500' },
  ];

  return (
    <div className="space-y-6 md:space-y-10">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {stats.map((stat, idx) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-white p-4 md:p-6 rounded-[1.5rem] md:rounded-[2.5rem] border border-primary/5 shadow-xl shadow-primary/5 flex items-center gap-3 md:gap-5"
          >
            <div className={`w-10 h-10 md:w-14 md:h-14 rounded-xl md:rounded-2xl ${stat.color} bg-opacity-10 flex items-center justify-center text-xl md:text-2xl text-${stat.color.split('-')[1]}-600`}>
              {stat.icon}
            </div>
            <div>
              <p className="text-[8px] md:text-xs font-black text-primary/30 uppercase tracking-widest">{stat.label}</p>
              <p className="text-xl md:text-3xl font-black text-primary">{stat.value}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-[3rem] border border-primary/5 shadow-xl shadow-primary/5">
          <h3 className="text-xl font-black text-primary mb-6">Menu Composition</h3>
          <div className="space-y-4">
            {Array.from(new Set(menuItems.map(i => i.category))).map(cat => {
              const count = menuItems.filter(i => i.category === cat).length;
              const percentage = (count / menuItems.length) * 100;
              return (
                <div key={cat} className="space-y-2">
                  <div className="flex justify-between text-xs font-bold uppercase tracking-wider">
                    <span className="text-primary/60">{cat}</span>
                    <span className="text-primary">{count} items</span>
                  </div>
                  <div className="h-2 bg-primary/5 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${percentage}%` }}
                      className="h-full bg-secondary rounded-full"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-primary text-white p-8 rounded-[3rem] shadow-2xl shadow-primary/20 flex flex-col justify-center relative overflow-hidden">
          <div className="relative z-10">
            <h3 className="text-3xl font-black mb-2 italic">Quick Tip</h3>
            <p className="text-white/60 font-medium leading-relaxed">
              Maintain your menu regularly. Popular items should have high-quality images to attract more customers. Don't forget to update stock availability!
            </p>
          </div>
          <FiStar className="absolute right-[-20px] bottom-[-20px] text-white/5 w-40 h-40" />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
