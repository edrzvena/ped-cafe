import React from 'react';
import { Coffee, Mail, Phone, MapPin, Globe, Share2, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  const [isLiked, setIsLiked] = React.useState(false);

  const handleShare = async () => {
    const shareUrl = 'https://ped-cafe-kappa.vercel.app';
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Ped's Cafe",
          text: "Crafting the perfect coffee experience since 1945.",
          url: shareUrl,
        });
      } catch (err) {
        console.error('Error sharing:', err);
      }
    } else {
      navigator.clipboard.writeText(shareUrl);
      alert('Link copied to clipboard!');
    }
  };

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
            <a 
              href="https://www.google.com/maps/search/?api=1&query=Jl.+Kisamaun+No.14,+Kota+Tangerang" 
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-white/10 rounded-full hover:bg-secondary hover:text-primary transition-all duration-300"
              title="Visit our location"
            >
              <Globe className="w-5 h-5" />
            </a>
            <button 
              onClick={handleShare}
              className="p-2 bg-white/10 rounded-full hover:bg-secondary hover:text-primary transition-all duration-300"
              title="Share Website"
            >
              <Share2 className="w-5 h-5" />
            </button>
            <button 
              onClick={() => setIsLiked(!isLiked)}
              className={`p-2 rounded-full transition-all duration-300 ${
                isLiked ? 'bg-red-500 text-white' : 'bg-white/10 hover:bg-red-500 hover:text-white'
              }`}
              title="Love us"
            >
              <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
            </button>
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
              <span>+62 813 8443 7767</span>
            </li>
            <li className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-secondary" />
              <span>pedcafe@gmail.com</span>
            </li>
            <li className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-secondary" />
              <span>Jl. Kisamaun No.14, Kota Tangerang</span>
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
        &copy; 1945 Ped's Cafe. All rights reserved. Made with love for coffee lovers.
      </div>
    </footer>
  );
};

export default Footer;
