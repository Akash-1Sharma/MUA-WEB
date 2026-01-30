import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

const Hero = () => {
  const scrollToSection = (href) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      className="relative h-screen w-full overflow-hidden"
      data-testid="hero-section"
    >
      {/* Cinematic Video Background */}
      <div className="absolute inset-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
          poster="https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=1920&q=80"
          data-testid="hero-video"
        >
          <source
            src="https://videos.pexels.com/video-files/6724687/6724687-uhd_2732_1440_25fps.mp4"
            type="video/mp4"
          />
          {/* Fallback image if video fails */}
          <img
            src="https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=1920&q=80"
            alt="Luxury Makeup"
            className="w-full h-full object-cover"
          />
        </video>
      </div>

      {/* Cinematic Overlay - Darker gradient for better text contrast */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/60" />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <span className="text-gold-light text-xs md:text-sm tracking-[0.4em] uppercase font-sans mb-4 block">
            Premium Artistry
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="font-serif text-5xl md:text-7xl lg:text-8xl text-white tracking-tight mb-4"
          data-testid="hero-title"
        >
          PALAK SINGH
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="w-20 h-[1px] bg-gold mb-6"
        />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.9 }}
          className="text-white/90 text-sm md:text-base tracking-[0.2em] uppercase font-light mb-8"
          data-testid="hero-subtitle"
        >
          Luxury Makeup Artist
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.1 }}
          className="flex flex-wrap justify-center gap-4 text-white/70 text-xs tracking-[0.15em] uppercase mb-12"
        >
          <span>Bridal</span>
          <span className="text-gold">|</span>
          <span>Editorial</span>
          <span className="text-gold">|</span>
          <span>Party</span>
          <span className="text-gold">|</span>
          <span>Celebrity Looks</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.3 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <button
            onClick={() => scrollToSection("#contact")}
            className="btn-gold"
            data-testid="hero-book-btn"
          >
            Book an Appointment
          </button>
          <button
            onClick={() => scrollToSection("#portfolio")}
            className="btn-white"
            data-testid="hero-portfolio-btn"
          >
            View Portfolio
          </button>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 cursor-pointer"
        onClick={() => scrollToSection("#about")}
        data-testid="scroll-indicator"
      >
        <div className="flex flex-col items-center text-white/70">
          <span className="text-[10px] tracking-[0.3em] uppercase mb-2">Scroll</span>
          <ChevronDown size={20} className="scroll-indicator" />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
