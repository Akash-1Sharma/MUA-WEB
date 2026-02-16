import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronDown, Volume2, VolumeX } from "lucide-react";

const Hero = () => {
  const videoRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true);
  const [videoLoaded, setVideoLoaded] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      const handleCanPlay = () => {
        setVideoLoaded(true);
        video.play().catch(err => console.log("Autoplay blocked"));
      };
      
      video.addEventListener('canplay', handleCanPlay);
      video.addEventListener('loadeddata', handleCanPlay);
      
      return () => {
        video.removeEventListener('canplay', handleCanPlay);
        video.removeEventListener('loadeddata', handleCanPlay);
      };
    }
  }, []);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const scrollToSection = (href) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      className="relative w-full overflow-hidden"
      style={{ height: '100vh', minHeight: '100vh' }}
      data-testid="hero-section"
    >
      {/* Video Container - Absolute Full Coverage */}
      <div className="absolute inset-0 w-full h-full overflow-hidden bg-black">
        {/* Decorative Background Pattern while video loads */}
        {!videoLoaded && (
          <>
            <div 
              className="absolute inset-0 opacity-40"
              style={{
                backgroundImage: `url('https://customer-assets.emergentagent.com/job_luxury-artistry/artifacts/txuguayx_Pink%20leopard%20texture%20background.jpeg')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                filter: 'grayscale(30%)'
              }} 
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/70" />
            
            {/* Loading Indicator */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 text-center">
              <div className="w-16 h-16 border-2 border-pink border-t-transparent rounded-full animate-spin mx-auto mb-4" />
              <p className="text-white/70 text-sm tracking-widest uppercase">Loading Video</p>
            </div>
          </>
        )}

        {/* Video - Full Screen Coverage */}
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className={`absolute inset-0 transition-opacity duration-1000 ${videoLoaded ? 'opacity-100' : 'opacity-0'}`}
          style={{ 
            width: '100vw',
            height: '100vh',
            objectFit: 'cover',
            objectPosition: 'center center',
          }}
          data-testid="hero-video"
        >
          <source
            src="https://customer-assets.emergentagent.com/job_luxury-artistry/artifacts/kna3dsec_Palak%20Intro%2002.mp4"
            type="video/mp4"
          />
        </video>
      </div>

      {/* Subtle Overlay for button visibility */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60 pointer-events-none z-[1]" />

      {/* Sound Toggle Button */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        onClick={toggleMute}
        className="absolute top-24 right-6 z-20 w-12 h-12 flex items-center justify-center bg-black/50 backdrop-blur-sm border border-white/20 text-white hover:bg-pink hover:border-pink transition-all"
        data-testid="sound-toggle"
      >
        {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
      </motion.button>

      {/* Content - Only Buttons */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-end pb-32 text-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <button
            onClick={() => scrollToSection("#contact")}
            className="px-8 py-4 bg-pink text-white font-medium text-xs tracking-[0.15em] uppercase hover:bg-pink-dark transition-all duration-300 shadow-lg hover:shadow-pink/30"
            data-testid="hero-book-btn"
          >
            Book an Appointment
          </button>
          <button
            onClick={() => scrollToSection("#portfolio")}
            className="px-8 py-4 bg-white/20 backdrop-blur-sm border border-white/40 text-white font-medium text-xs tracking-[0.15em] uppercase hover:bg-white/30 hover:border-white/60 transition-all duration-300"
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
        transition={{ delay: 1.5 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 cursor-pointer"
        onClick={() => scrollToSection("#about")}
        data-testid="scroll-indicator"
      >
        <div className="flex flex-col items-center text-white/80 hover:text-pink-light transition-colors">
          <span className="text-[10px] tracking-[0.3em] uppercase mb-2 drop-shadow-md">Scroll</span>
          <div className="w-[1px] h-6 bg-gradient-to-b from-pink to-transparent mb-1" />
          <ChevronDown size={20} className="scroll-indicator drop-shadow-md" />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
