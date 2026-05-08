import React from 'react';
import { Coffee, Pizza, IceCream, CupSoda as Drink, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const CategoryBar: React.FC = () => {
  const categories = [
    { name: 'Coffee', icon: <Coffee />, path: '/menu?category=coffee' },
    { name: 'Non-Coffee', icon: <Drink />, path: '/menu?category=non-coffee' },
    { name: 'Food', icon: <Pizza />, path: '/menu?category=food' },
    { name: 'Dessert', icon: <IceCream />, path: '/menu?category=dessert' },
  ];

  return (
    <div className="bg-white py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full md:w-auto">
            {categories.map((cat, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -5 }}
                className="group"
              >
                <Link 
                  to={cat.path}
                  className="flex flex-col items-center justify-center p-6 bg-accent/30 rounded-3xl border-2 border-transparent hover:border-secondary hover:bg-white transition-all duration-300 min-w-[120px]"
                >
                  <div className="w-12 h-12 flex items-center justify-center bg-white rounded-2xl text-secondary shadow-sm group-hover:bg-secondary group-hover:text-white transition-colors duration-300 mb-3">
                    {cat.icon}
                  </div>
                  <span className="text-sm font-bold text-primary">{cat.name}</span>
                </Link>
              </motion.div>
            ))}
          </div>

          <Link to="/menu" className="flex items-center gap-3 text-primary font-black group">
            <span className="text-lg">See Full Menu</span>
            <div className="w-10 h-10 rounded-full bg-primary text-accent flex items-center justify-center group-hover:translate-x-2 transition-transform">
              <ArrowRight size={20} />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CategoryBar;
