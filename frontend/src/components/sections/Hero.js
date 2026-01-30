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
      <div className="absolute inset-0 bg-black">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover opacity-90"
          data-testid="hero-video"
        >
          <source
            src="https://cdn.pixabay.com/video/2020/05/25/40130-424930032_large.mp4"
            type="video/mp4"
          />
        </video>
      </div>

      {/* Cinematic Overlay - Darker gradient for better text contrast */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/70" />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <span className="text-champagne/90 text-xs md:text-sm tracking-[0.4em] uppercase font-sans mb-4 block drop-shadow-lg">
            Premium Artistry
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="font-serif text-5xl md:text-7xl lg:text-8xl text-white tracking-tight mb-4 drop-shadow-2xl"
          style={{ textShadow: '2px 4px 20px rgba(0,0,0,0.5)' }}
          data-testid="hero-title"
        >
          PALAK SINGH
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="w-24 h-[2px] bg-gradient-to-r from-transparent via-gold to-transparent mb-6"
        />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.9 }}
          className="text-white/95 text-base md:text-lg tracking-[0.25em] uppercase font-light mb-8 drop-shadow-lg"
          data-testid="hero-subtitle"
        >
          Luxury Makeup Artist
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.1 }}
          className="flex flex-wrap justify-center gap-4 text-white/80 text-xs md:text-sm tracking-[0.15em] uppercase mb-12 drop-shadow-md"
        >
          <span className="hover:text-gold transition-colors">Bridal</span>
          <span className="text-gold">✦</span>
          <span className="hover:text-gold transition-colors">Editorial</span>
          <span className="text-gold">✦</span>
          <span className="hover:text-gold transition-colors">Party</span>
          <span className="text-gold">✦</span>
          <span className="hover:text-gold transition-colors">Celebrity Looks</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.3 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <button
            onClick={() => scrollToSection("#contact")}
            className="px-8 py-4 bg-gold text-white font-medium text-xs tracking-[0.15em] uppercase hover:bg-gold-hover transition-all duration-300 shadow-lg hover:shadow-gold/30"
            data-testid="hero-book-btn"
          >
            Book an Appointment
          </button>
          <button
            onClick={() => scrollToSection("#portfolio")}
            className="px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/30 text-white font-medium text-xs tracking-[0.15em] uppercase hover:bg-white/20 hover:border-white/50 transition-all duration-300"
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
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 cursor-pointer"
        onClick={() => scrollToSection("#about")}
        data-testid="scroll-indicator"
      >
        <div className="flex flex-col items-center text-white/70 hover:text-gold transition-colors">
          <span className="text-[10px] tracking-[0.3em] uppercase mb-2 drop-shadow-md">Scroll</span>
          <div className="w-[1px] h-8 bg-gradient-to-b from-gold to-transparent mb-2" />
          <ChevronDown size={20} className="scroll-indicator drop-shadow-md" />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
