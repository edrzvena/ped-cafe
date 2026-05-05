import React from 'react';
import { Coffee, Mail, Phone, MapPin, Globe, Share2, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-primary text-accent pt-20 pb-10 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="space-y-6">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="bg-secondary p-2 rounded-xl group-hover:rotate-12 transition-transform duration-300">
              <Coffee className="w-6 h-6 text-primary" />
            </div>
            <span className="text-2xl font-black tracking-tight text-white font-serif">
              PED'S<span className="text-secondary">CAFE</span>
            </span>
          </Link>
          <p className="text-accent/60 leading-relaxed">
            Crafting the perfect coffee experience since 1945. Your daily dose of premium beans and cozy vibes.
          </p>
          <div className="flex gap-4">
            <a href="#" className="p-2 bg-white/10 rounded-full hover:bg-secondary hover:text-primary transition-all duration-300">
              <Globe className="w-5 h-5" />
            </a>
            <a href="#" className="p-2 bg-white/10 rounded-full hover:bg-secondary hover:text-primary transition-all duration-300">
              <Share2 className="w-5 h-5" />
            </a>
            <a href="#" className="p-2 bg-white/10 rounded-full hover:bg-secondary hover:text-primary transition-all duration-300">
              <Heart className="w-5 h-5" />
            </a>
          </div>
        </div>

        <div>
          <h4 className="text-lg font-bold mb-6 font-serif">Quick Links</h4>
          <ul className="space-y-4 text-accent/60">
            <li><Link to="/" className="hover:text-secondary transition-colors">Home</Link></li>
            <li><Link to="/menu" className="hover:text-secondary transition-colors">Menu</Link></li>
            <li><Link to="/dashboard" className="hover:text-secondary transition-colors">My Orders</Link></li>
            <li><Link to="/profile" className="hover:text-secondary transition-colors">Membership</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-lg font-bold mb-6 font-serif">Contact Us</h4>
          <ul className="space-y-4 text-accent/60">
            <li className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-secondary" />
              <span>+62 812 3456 7890</span>
            </li>
            <li className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-secondary" />
              <span>hello@peds-cafe.com</span>
            </li>
            <li className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-secondary" />
              <span>123 Coffee Street, Jakarta</span>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-lg font-bold mb-6 font-serif">Newsletter</h4>
          <p className="text-accent/60 mb-6">Get updates on new blends and events.</p>
          <div className="flex gap-2">
            <input
              type="email"
              placeholder="Your email"
              className="bg-white/10 border-none rounded-full px-4 py-2 w-full focus:ring-2 focus:ring-secondary outline-none"
            />
            <button className="bg-secondary text-primary px-6 py-2 rounded-full font-bold hover:bg-secondary-light transition-colors">
              Join
            </button>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-white/5 text-center text-accent/40 text-sm">
        &copy; 2024 Ped's Cafe. All rights reserved. Made with love for coffee lovers.
      </div>
    </footer>
  );
};

export default Footer;
