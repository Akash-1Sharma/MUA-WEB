import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronDown, Volume2, VolumeX, Play } from "lucide-react";

const Hero = () => {
  const videoRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      // Listen for progress events
      const handleProgress = () => {
        if (video.buffered.length > 0) {
          const bufferedEnd = video.buffered.end(video.buffered.length - 1);
          const duration = video.duration;
          if (duration > 0) {
            setLoadProgress(Math.round((bufferedEnd / duration) * 100));
          }
        }
      };

      const handleCanPlay = () => {
        setIsLoaded(true);
        video.play().then(() => {
          setIsPlaying(true);
        }).catch(err => {
          console.log("Autoplay blocked");
        });
      };

      const handlePlaying = () => {
        setIsPlaying(true);
      };

      video.addEventListener('progress', handleProgress);
      video.addEventListener('canplay', handleCanPlay);
      video.addEventListener('playing', handlePlaying);

      return () => {
        video.removeEventListener('progress', handleProgress);
        video.removeEventListener('canplay', handleCanPlay);
        video.removeEventListener('playing', handlePlaying);
      };
    }
  }, []);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handlePlayClick = () => {
    if (videoRef.current) {
      videoRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(err => console.log(err));
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
      className="relative h-screen w-full overflow-hidden bg-black"
      data-testid="hero-section"
    >
      {/* Video Background */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className={`absolute inset-0 w-full h-full object-cover scale-105 transition-opacity duration-1000 ${isPlaying ? 'opacity-100' : 'opacity-0'}`}
        style={{ minHeight: '100vh', minWidth: '100vw' }}
        data-testid="hero-video"
      >
        <source
          src="https://customer-assets.emergentagent.com/job_luxury-artistry/artifacts/kna3dsec_Palak%20Intro%2002.mp4"
          type="video/mp4"
        />
      </video>

      {/* Loading State */}
      {!isPlaying && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black z-10">
          <div className="relative w-20 h-20 mb-6">
            <div className="absolute inset-0 border-2 border-pink/20 rounded-full" />
            <div 
              className="absolute inset-0 border-2 border-pink border-t-transparent rounded-full animate-spin"
              style={{ animationDuration: '1s' }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-pink text-sm font-medium">{loadProgress}%</span>
            </div>
          </div>
          <p className="text-white/60 text-sm tracking-widest uppercase">Loading Video...</p>
          <p className="text-white/40 text-xs mt-2">Please wait, video is loading</p>
          
          {/* Manual Play Button */}
          {isLoaded && !isPlaying && (
            <button
              onClick={handlePlayClick}
              className="mt-6 flex items-center gap-2 px-6 py-3 bg-pink text-white text-xs tracking-widest uppercase hover:bg-pink-dark transition-colors"
            >
              <Play size={16} /> Play Video
            </button>
          )}
        </div>
      )}

      {/* Subtle Overlay for button visibility */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/50 pointer-events-none" />

      {/* Sound Toggle Button */}
      {isPlaying && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          onClick={toggleMute}
          className="absolute top-24 right-6 z-20 w-12 h-12 flex items-center justify-center bg-black/50 backdrop-blur-sm border border-white/20 text-white hover:bg-pink hover:border-pink transition-all"
          data-testid="sound-toggle"
        >
          {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
        </motion.button>
      )}

      {/* Content - Only Buttons */}
      <div className="relative z-10 h-full flex flex-col items-center justify-end pb-32 text-center px-6 pointer-events-none">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="flex flex-col sm:flex-row gap-4 pointer-events-auto"
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
