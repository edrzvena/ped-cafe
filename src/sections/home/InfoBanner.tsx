import React from 'react';
import { Clock, Calendar, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

const InfoBanner: React.FC = () => {
  return (
    <section className="bg-background py-20 px-6 relative overflow-hidden">
      {/* Decorative Blur */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/5 blur-[100px] -z-0" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/5 blur-[100px] -z-0" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 bg-white border border-primary/5 p-8 md:p-12 rounded-[3rem] shadow-2xl shadow-primary/5">

          <div className="flex items-center gap-6">
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-3xl bg-secondary flex items-center justify-center text-primary shadow-xl shadow-secondary/20">
              <Clock size={32} className="md:w-10 md:h-10" />
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <p className="text-secondary font-black uppercase tracking-[0.2em] text-xs md:text-sm">We are Open Now</p>
              </div>
              <h2 className="text-3xl md:text-5xl font-black text-primary leading-tight">
                Everyday: <span className="text-secondary italic">08:00 — 22:00</span>
              </h2>
            </div>
          </div>

          <div className="hidden lg:flex items-center gap-4 text-primary/10">
            <Calendar size={40} />
            <div className="h-12 w-px bg-primary/10" />
            <Sparkles size={40} />
          </div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-primary/5 border border-primary/10 px-8 py-4 rounded-2xl flex flex-col items-center md:items-start"
          >
            <p className="text-primary/40 text-[10px] font-bold uppercase tracking-widest mb-1">Current Vibe</p>
            <p className="text-primary font-bold">Freshly Brewed & Ready ☕</p>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default InfoBanner;
