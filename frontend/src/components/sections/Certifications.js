import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Award, GraduationCap, BadgeCheck, Globe } from "lucide-react";

const certifications = [
  {
    icon: GraduationCap,
    title: "International Makeup Academy",
    subtitle: "Certified Professional Makeup Artist",
    description: "Advanced training in bridal, fashion, and HD makeup techniques from internationally recognized academy.",
  },
  {
    icon: Award,
    title: "MAC Pro Certification",
    subtitle: "Professional Makeup Certification",
    description: "Specialized training in MAC cosmetics application techniques and color theory.",
  },
  {
    icon: Globe,
    title: "London School of Makeup",
    subtitle: "Fashion & Editorial Makeup",
    description: "Master class certification in high-fashion and editorial makeup for photography and film.",
  },
  {
    icon: BadgeCheck,
    title: "Airbrush Makeup Academy",
    subtitle: "HD & Airbrush Specialist",
    description: "Expert certification in airbrush makeup application for flawless, long-lasting results.",
  },
];

const brands = [
  "MAC", "Charlotte Tilbury", "Bobbi Brown", "NARS", "Laura Mercier", "Huda Beauty", "Anastasia Beverly Hills", "Urban Decay"
];

const Certifications = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="certifications"
      className="section-padding bg-white relative"
      data-testid="certifications-section"
      ref={ref}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-pink text-xs tracking-[0.3em] uppercase font-medium">Credentials</span>
          <h2 className="font-serif text-4xl md:text-5xl text-black mt-4 mb-4" data-testid="certifications-title">
            Certifications & Training
          </h2>
          <div className="luxury-divider" />
          <p className="text-gray-600 font-light max-w-2xl mx-auto mt-6">
            Continuously investing in professional development to bring you the latest techniques 
            and highest standards in makeup artistry.
          </p>
        </motion.div>

        {/* Certifications Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-20">
          {certifications.map((cert, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group flex gap-6 p-8 bg-off-white border border-pink/10 hover:border-pink/30 transition-all"
              data-testid={`certification-${index}`}
            >
              <div className="flex-shrink-0">
                <div className="w-16 h-16 flex items-center justify-center bg-pink/10 text-pink group-hover:bg-pink group-hover:text-white transition-all">
                  <cert.icon size={28} strokeWidth={1.5} />
                </div>
              </div>
              <div>
                <h3 className="font-serif text-xl text-black mb-1">{cert.title}</h3>
                <span className="text-xs tracking-widest uppercase text-pink">{cert.subtitle}</span>
                <p className="text-gray-500 text-sm font-light mt-3 leading-relaxed">
                  {cert.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trusted Brands */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center"
        >
          <span className="text-gray-400 text-xs tracking-[0.3em] uppercase block mb-8">Brands I Work With</span>
          <div className="flex flex-wrap justify-center gap-8 md:gap-12">
            {brands.map((brand, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.4, delay: 0.5 + index * 0.05 }}
                className="text-gray-400 font-serif text-lg md:text-xl hover:text-pink transition-colors cursor-default"
              >
                {brand}
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* Trust Message */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 text-center p-8 md:p-12 bg-black text-white"
        >
          <p className="font-serif text-xl md:text-2xl italic mb-4">
            "Quality products and continuous learning are the foundations of my artistry"
          </p>
          <span className="text-pink text-xs tracking-[0.3em] uppercase">— Palak Singh</span>
        </motion.div>
      </div>
    </section>
  );
};

export default Certifications;
