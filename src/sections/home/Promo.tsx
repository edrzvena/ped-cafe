import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { Sparkles, Gift, Coffee } from 'lucide-react';

const Promo: React.FC = () => {
  const promos = [
    {
      title: "Loyalty Program",
      description: "Earn 1 point for every Rp 10.000 spent. Collect points automatically with every order through our web app.",
      icon: <Sparkles className="w-8 h-8" />,
      color: "bg-secondary/20 text-secondary",
    },
    {
      title: "Free Coffee Reward",
      description: "Redeem 500 points to get a free signature coffee of your choice. It's our way of saying thanks!",
      icon: <Gift className="w-8 h-8" />,
      color: "bg-primary/10 text-primary",
    },
    {
      title: "Dine In or Take Away",
      description: "Enjoy your favorites anywhere. Whether you want to chill at our place or grab a quick bite to go.",
      icon: <Coffee className="w-8 h-8" />,
      color: "bg-secondary/20 text-secondary",
    }
  ];

  return (
    <section className="py-32 px-6 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center space-y-4 mb-20">
          <h2 className="text-4xl md:text-5xl font-black text-primary">Special Offers</h2>
          <p className="text-primary/60 max-w-2xl mx-auto text-lg">
            Don't miss out on our exclusive deals. Crafted specifically for our loyal coffee community.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {promos.map((promo, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
            >
              <Card className="h-full flex flex-col items-start p-10 space-y-6 group">
                <div className={`${promo.color} p-4 rounded-2xl group-hover:scale-110 transition-transform duration-500`}>
                  {promo.icon}
                </div>
                <h3 className="text-2xl font-bold text-primary">{promo.title}</h3>
                <p className="text-primary/60 leading-relaxed flex-grow">
                  {promo.description}
                </p>
                <Button variant="ghost" className="p-0 hover:bg-transparent group/btn">
                  Check Details <span className="ml-2 group-hover/btn:translate-x-1 transition-transform">→</span>
                </Button>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Promo;
