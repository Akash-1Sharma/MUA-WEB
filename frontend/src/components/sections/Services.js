import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Crown, Heart, Sparkles, Camera, Droplets, Scissors } from "lucide-react";

const services = [
  {
    icon: Crown,
    title: "Bridal Makeup",
    description: "Timeless elegance for your special day. Custom bridal looks that photograph beautifully and last from ceremony to reception.",
    features: ["Pre-bridal consultation", "Trial session included", "Touch-up kit"],
  },
  {
    icon: Heart,
    title: "Engagement / Reception",
    description: "Stunning looks for your engagement and reception celebrations. Perfect balance of glamour and sophistication.",
    features: ["Personalized styling", "Long-lasting finish", "Photo-ready glow"],
  },
  {
    icon: Sparkles,
    title: "Party Makeup",
    description: "Make a statement at any event. From cocktail parties to red carpet galas, shine with confidence.",
    features: ["Trending styles", "Quick application", "Evening to night looks"],
  },
  {
    icon: Camera,
    title: "Editorial / Photoshoot",
    description: "High-fashion and editorial looks for magazines, campaigns, and creative projects.",
    features: ["Concept development", "Multiple look changes", "On-set assistance"],
  },
  {
    icon: Droplets,
    title: "HD / Airbrush Makeup",
    description: "Flawless, lightweight coverage using advanced airbrush techniques for a natural, camera-ready finish.",
    features: ["Water-resistant formula", "Even skin tone", "Ultra-smooth finish"],
  },
  {
    icon: Scissors,
    title: "Hairstyling",
    description: "Complete your look with professional hairstyling. From elegant updos to flowing waves.",
    features: ["All hair types", "Extensions available", "Heat styling included"],
  },
];

const Services = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const scrollToContact = () => {
    const element = document.querySelector("#contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="services"
      className="section-padding bg-white relative"
      data-testid="services-section"
      ref={ref}
    >
      {/* Background decoration */}
      <div className="absolute top-1/2 left-0 w-72 h-72 bg-pink/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      
      <div className="max-w-7xl mx-auto relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-pink text-xs tracking-[0.3em] uppercase font-medium">What I Offer</span>
          <h2 className="font-serif text-4xl md:text-5xl text-black mt-4 mb-4" data-testid="services-title">
            Luxury Services
          </h2>
          <div className="luxury-divider" />
          <p className="text-gray-600 font-light max-w-2xl mx-auto mt-6">
            Experience the art of transformation with our premium makeup and styling services, 
            tailored to bring out your unique beauty.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="service-card group p-8 bg-off-white border border-pink/10 hover:bg-white"
              data-testid={`service-card-${index}`}
            >
              <div className="w-14 h-14 flex items-center justify-center border border-pink/30 text-pink mb-6 group-hover:bg-pink group-hover:text-white transition-all duration-500">
                <service.icon size={24} strokeWidth={1.5} />
              </div>
              
              <h3 className="font-serif text-xl text-black mb-3">{service.title}</h3>
              <p className="text-gray-500 text-sm font-light leading-relaxed mb-4">
                {service.description}
              </p>
              
              <ul className="space-y-2 mb-6">
                {service.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center text-xs text-gray-400">
                    <span className="w-1 h-1 bg-pink rounded-full mr-2" />
                    {feature}
                  </li>
                ))}
              </ul>
              
              <button
                onClick={scrollToContact}
                className="text-xs tracking-widest uppercase text-pink font-medium hover:text-pink-dark transition-colors"
                data-testid={`service-enquire-${index}`}
              >
                Enquire Now →
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
