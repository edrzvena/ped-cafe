import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '../../components/ui/Button';
import { Coffee, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-background">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-secondary/5 -skew-x-12 transform origin-top-right -z-10" />
      <motion.div
        animate={{
          y: [0, -20, 0],
          rotate: [0, 5, 0]
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-1/4 right-10 md:right-40 opacity-10 -z-10"
      >
        <Coffee size={400} className="text-primary" />
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 border border-secondary/20 text-primary font-bold text-sm tracking-widest uppercase">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-secondary"></span>
            </span>
            Premium Coffee Shop
          </div>

          <h1 className="text-6xl md:text-8xl font-black leading-tight text-primary">
            Authentic <br />
            <span className="text-secondary italic">Coffee</span> Vibes
          </h1>

          <p className="text-xl text-primary/70 leading-relaxed max-w-lg">
            Experience the real taste of premium beans and local favorites.
            From our signature lattes to our beloved Chicken Katsu,
            we serve nothing but the best for your daily journey.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Link to="/menu">
              <Button size="lg" className="gap-2 w-full sm:w-auto">
                Explore Menu <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
            <Link to="/auth">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                Join Membership
              </Button>
            </Link>
          </div>

          <div className="flex items-center gap-8 pt-8">
            <div>
              <p className="text-3xl font-black text-primary font-serif">15k+</p>
              <p className="text-sm text-primary/50 uppercase tracking-widest">Happy Clients</p>
            </div>
            <div className="w-px h-10 bg-primary/10" />
            <div>
              <p className="text-3xl font-black text-primary font-serif">20+</p>
              <p className="text-sm text-primary/50 uppercase tracking-widest">Coffee Blends</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative"
        >
          <div className="relative z-10 rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white">
            <img
              src="https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&q=80&w=800"
              alt="Premium Coffee"
              className="w-full h-[600px] object-cover hover:scale-110 transition-transform duration-700"
            />
          </div>

          {/* Floating Card */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="absolute -bottom-10 -left-10 z-20 bg-white p-8 rounded-3xl shadow-2xl max-w-xs border border-primary/5"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-secondary/20 p-3 rounded-2xl">
                <Coffee className="text-secondary w-8 h-8" />
              </div>
              <div>
                <p className="font-bold text-primary">Best Latte 1950</p>
                <p className="text-xs text-primary/50">Awarded by Coffee Weekly</p>
              </div>
            </div>
            <p className="text-sm text-primary/70 italic">
              "The smoothest crema I've ever tasted. Absolutely divine experience!"
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
