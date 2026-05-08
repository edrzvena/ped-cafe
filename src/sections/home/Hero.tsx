import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '../../components/ui/Button';
import { Search, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero: React.FC = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center pt-20 overflow-hidden bg-background">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-secondary/5 -skew-x-12 transform origin-top-right -z-10" />
      
      <div className="max-w-7xl mx-auto px-6 w-full">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 border border-primary/10 text-primary font-bold text-xs tracking-widest uppercase">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-secondary"></span>
              </span>
              Now Serving: Freshly Brewed Joy
            </div>

            <h1 className="text-6xl md:text-8xl font-black leading-[0.9] text-primary">
              Ready for <br />
              <span className="text-secondary">Your Daily</span> <br />
              Caffeine?
            </h1>

            <p className="text-lg md:text-xl text-primary/70 leading-relaxed max-w-lg">
              Skip the line and order your favorites directly from your phone. 
              Freshly brewed, expertly crafted, and ready when you are.
            </p>

            {/* Transactional Search/CTA */}
            <div className="relative max-w-md group">
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-primary/30 group-focus-within:text-secondary transition-colors">
                <Search size={20} />
              </div>
              <input 
                type="text" 
                placeholder="Search your favorite coffee..."
                className="w-full pl-12 pr-32 py-5 bg-white border-2 border-primary/10 rounded-2xl focus:outline-none focus:border-secondary shadow-xl shadow-primary/5 transition-all text-primary font-medium"
              />
              <div className="absolute inset-y-2 right-2">
                <Link to="/menu">
                  <Button className="h-full px-6 rounded-xl shadow-lg shadow-primary/20">
                    Order Now
                  </Button>
                </Link>
              </div>
            </div>

            <div className="flex items-center gap-4 pt-4 text-primary/50 font-bold text-sm">
              <div className="flex -space-x-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-accent flex items-center justify-center overflow-hidden">
                    <img src={`https://i.pravatar.cc/100?u=${i}`} alt="user" />
                  </div>
                ))}
              </div>
              <p>Join 2,000+ others ordering today</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative hidden md:block"
          >
            <div className="relative z-10 rounded-[3rem] overflow-hidden shadow-2xl border-[12px] border-white rotate-3">
              <img
                src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=800"
                alt="Premium Coffee"
                className="w-full h-[600px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-12 text-white">
                <p className="text-secondary font-black uppercase tracking-[0.2em] mb-2 text-sm">Best Seller</p>
                <h3 className="text-4xl font-black mb-4">Creamy Iced Latte</h3>
                <Link to="/menu">
                  <Button variant="outline" className="text-white border-white hover:bg-white hover:text-primary gap-2 rounded-full backdrop-blur-md">
                    Add to Cart <ShoppingBag size={18} />
                  </Button>
                </Link>
              </div>
            </div>

            {/* Decorative element */}
            <div className="absolute -top-10 -right-10 w-64 h-64 bg-secondary/10 rounded-full blur-3xl -z-10" />
            <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
