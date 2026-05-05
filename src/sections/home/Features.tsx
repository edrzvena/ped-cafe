import React from 'react';
import { motion } from 'framer-motion';
import { Leaf, Award, Clock, Heart } from 'lucide-react';

const Features: React.FC = () => {
  const features = [
    {
      title: "100% Organic Beans",
      description: "Directly sourced from sustainable farms around the world.",
      icon: <Leaf />,
    },
    {
      title: "Certified Roasters",
      description: "Our team has over 10 years of experience in specialty coffee.",
      icon: <Award />,
    },
    {
      title: "Freshly Brewed",
      description: "Every cup is made to order to ensure maximum flavor profile.",
      icon: <Clock />,
    },
    {
      title: "Love in Every Cup",
      description: "We care about the details, from latte art to perfect temperature.",
      icon: <Heart />,
    }
  ];

  return (
    <section className="py-32 px-6 bg-accent/30">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="rounded-[4rem] overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=800" 
                alt="Process" 
                className="w-full h-[500px] object-cover"
              />
            </div>
            <div className="absolute -bottom-10 -right-10 bg-primary p-12 rounded-full border-8 border-white">
              <div className="text-secondary text-5xl font-black font-serif">100%</div>
              <div className="text-accent/60 text-xs uppercase tracking-widest font-bold">Purity</div>
            </div>
          </motion.div>

          <div className="space-y-12">
            <div className="space-y-4">
              <h2 className="text-4xl md:text-5xl font-black text-primary">Why Choose Ped's?</h2>
              <p className="text-primary/60 text-lg">
                We believe coffee is more than just a drink—it's a ritual that connects people and sparks creativity.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="space-y-4"
                >
                  <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-secondary shadow-lg shadow-secondary/10">
                    {feature.icon}
                  </div>
                  <h4 className="text-xl font-bold text-primary">{feature.title}</h4>
                  <p className="text-primary/60 text-sm leading-relaxed">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
