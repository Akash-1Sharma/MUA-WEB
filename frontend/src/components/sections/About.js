import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Award, Heart, Sparkles, Users } from "lucide-react";

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const stats = [
    { icon: Users, number: "500+", label: "Happy Brides" },
    { icon: Award, number: "10+", label: "Years Experience" },
    { icon: Sparkles, number: "100+", label: "Celebrity Looks" },
    { icon: Heart, number: "1000+", label: "Makeovers Done" },
  ];

  return (
    <section
      id="about"
      className="section-padding relative overflow-hidden"
      data-testid="about-section"
      ref={ref}
      style={{
        backgroundImage: `url('https://customer-assets.emergentagent.com/job_luxury-artistry/artifacts/txuguayx_Pink%20leopard%20texture%20background.jpeg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Overlay for opacity control */}
      <div className="absolute inset-0 bg-white/85" />
      
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-pink/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1606158562001-5b5a8029a80b?w=800&q=80"
                alt="Palak Singh - Luxury Makeup Artist"
                className="w-full h-[500px] md:h-[600px] object-cover object-top"
                data-testid="about-image"
              />
              {/* Decorative frame */}
              <div className="absolute -bottom-4 -right-4 w-full h-full border border-pink/30 -z-10" />
            </div>
            
            {/* Trust badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="absolute -bottom-6 -right-6 md:bottom-8 md:right-8 bg-black text-white shadow-xl p-4 md:p-6"
              data-testid="trust-badge"
            >
              <div className="text-center">
                <span className="text-3xl md:text-4xl font-serif text-pink">500+</span>
                <p className="text-xs tracking-widest uppercase text-white/70 mt-1">Happy Clients</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="text-pink text-xs tracking-[0.3em] uppercase font-medium">About Me</span>
            <h2 className="font-serif text-4xl md:text-5xl text-black mt-4 mb-6" data-testid="about-title">
              Where Artistry Meets Elegance
            </h2>
            <div className="w-16 h-[2px] bg-pink mb-8" />
            
            <div className="space-y-6 text-gray-600 font-light leading-relaxed">
              <p>
                With over a decade of experience in the beauty industry, I have dedicated my career to 
                transforming faces and celebrating the unique beauty of every individual. My journey 
                began with a passion for art and has evolved into a mission to make every client feel 
                like the most beautiful version of themselves.
              </p>
              <p>
                I believe that makeup is not just about enhancing features—it's about telling a story, 
                capturing emotions, and creating memories that last a lifetime. Whether it's your 
                wedding day, a special celebration, or a high-fashion editorial shoot, I bring the 
                same level of dedication, precision, and artistry to every look I create.
              </p>
              <p>
                Using only premium, international products and staying updated with global trends, 
                I ensure that every client receives a personalized experience that exceeds expectations.
              </p>
            </div>

            {/* Signature */}
            <div className="mt-8">
              <p className="font-script text-4xl text-pink">Palak Singh</p>
              <span className="text-xs tracking-widest uppercase text-gray-400">Celebrity Makeup Artist</span>
            </div>
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20"
          data-testid="about-stats"
        >
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center p-6 bg-white border border-pink/10 hover:border-pink/30 transition-colors"
            >
              <stat.icon className="w-8 h-8 text-pink mx-auto mb-3" strokeWidth={1.5} />
              <span className="block font-serif text-3xl text-black">{stat.number}</span>
              <span className="text-xs tracking-widest uppercase text-gray-400">{stat.label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default About;
