import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Coffee, ShoppingBag, User, Menu as MenuIcon, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '../../lib/utils';
import { Button } from '../ui/Button';
import { useCart } from '../../lib/CartContext';
import { useAuth } from '../../lib/AuthContext';

const Navbar: React.FC = () => {
  const { totalItems } = useCart();
  const { user } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMobileMenuOpen]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Menu', path: '/menu' },
    { name: 'Dashboard', path: '/dashboard' },
  ];

  return (
    <>
      <nav
        className={cn(
          'fixed top-0 left-0 right-0 z-[60] transition-all duration-500 px-6 py-4',
          (isScrolled && !isMobileMenuOpen) ? 'bg-white/80 backdrop-blur-md shadow-lg py-3' : 'bg-transparent'
        )}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="bg-primary p-2 rounded-xl group-hover:rotate-12 transition-transform duration-300">
              <Coffee className="w-6 h-6 text-accent" />
            </div>
            <span className="text-2xl font-black tracking-tight text-primary font-serif">
              PED'S<span className="text-secondary">CAFE</span>
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  'text-sm font-bold uppercase tracking-widest transition-colors hover:text-secondary',
                  location.pathname === link.path ? 'text-secondary' : 'text-primary'
                )}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-4">
            <Link to="/cart">
              <Button variant="ghost" size="sm" className="relative">
                <ShoppingBag className="w-5 h-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-secondary text-primary text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                    {totalItems}
                  </span>
                )}
              </Button>
            </Link>
            
            {user ? (
              <Link to="/profile">
                <Button variant="outline" size="sm" className="gap-2">
                  <User className="w-4 h-4" />
                  Profile
                </Button>
              </Link>
            ) : (
              <Link to="/auth">
                <Button variant="primary" size="sm">
                  Sign In
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile Toggle */}
          <button
            className="md:hidden text-primary p-2 bg-white/10 rounded-xl"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X /> : <MenuIcon />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-primary/40 backdrop-blur-sm z-[70] md:hidden"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-[280px] bg-white z-[80] shadow-2xl md:hidden flex flex-col"
            >
              <div className="p-8 pt-24 flex flex-col h-full">
                <div className="flex flex-col gap-8">
                  {navLinks.map((link, i) => (
                    <motion.div
                      key={link.path}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <Link
                        to={link.path}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={cn(
                          "text-3xl font-black transition-colors block",
                          location.pathname === link.path ? "text-secondary" : "text-primary/20"
                        )}
                      >
                        {link.name}
                      </Link>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-auto space-y-4">
                  <hr className="border-primary/5 mb-8" />
                  <Link to="/cart" onClick={() => setIsMobileMenuOpen(false)} className="block">
                    <Button variant="outline" className="w-full justify-between py-6 rounded-2xl">
                      <span className="flex items-center gap-3 font-bold text-primary">
                        <ShoppingBag className="w-5 h-5" /> My Cart
                      </span>
                      <span className="bg-secondary text-primary px-3 py-1 rounded-xl text-xs font-black">
                        {totalItems}
                      </span>
                    </Button>
                  </Link>
                  {user ? (
                    <Link to="/profile" onClick={() => setIsMobileMenuOpen(false)} className="block">
                      <Button variant="primary" className="w-full gap-3 py-6 rounded-2xl">
                        <User className="w-5 h-5" /> My Profile
                      </Button>
                    </Link>
                  ) : (
                    <Link to="/auth" onClick={() => setIsMobileMenuOpen(false)} className="block">
                      <Button variant="primary" className="w-full py-6 rounded-2xl">Sign In</Button>
                    </Link>
                  )}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
