import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { X, ZoomIn } from "lucide-react";

const portfolioImages = [
  { id: 1, category: "bridal", src: "https://images.unsplash.com/photo-1641699862936-be9f49b1c38d?w=800&q=80", alt: "Indian Bridal Makeup" },
  { id: 2, category: "editorial", src: "https://images.unsplash.com/photo-1581132285926-a4c91a76ef14?w=800&q=80", alt: "Editorial Beauty" },
  { id: 3, category: "party", src: "https://images.unsplash.com/photo-1736849816780-6ca0730061a6?w=800&q=80", alt: "Party Glam" },
  { id: 4, category: "bridal", src: "https://images.unsplash.com/photo-1760461805697-7aff3e93c5d9?w=800&q=80", alt: "Traditional Bridal" },
  { id: 5, category: "editorial", src: "https://images.unsplash.com/photo-1606158562001-5b5a8029a80b?w=800&q=80", alt: "High Fashion" },
  { id: 6, category: "party", src: "https://images.unsplash.com/photo-1656568757581-5beb95f29291?w=800&q=80", alt: "Evening Glamour" },
  { id: 7, category: "bridal", src: "https://images.unsplash.com/photo-1684868264466-4c4fcf0a5b37?w=800&q=80", alt: "Elegant Bridal" },
  { id: 8, category: "editorial", src: "https://images.unsplash.com/photo-1617807727464-b0f779ec68c1?w=800&q=80", alt: "Creative Editorial" },
  { id: 9, category: "party", src: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=800&q=80", alt: "Celebration Look" },
  { id: 10, category: "bridal", src: "https://images.unsplash.com/photo-1760461804494-c39017a52e6b?w=800&q=80", alt: "Modern Bridal" },
  { id: 11, category: "editorial", src: "https://images.unsplash.com/photo-1751619194419-800a16b539ef?w=800&q=80", alt: "Magazine Cover" },
  { id: 12, category: "party", src: "https://images.pexels.com/photos/3448813/pexels-photo-3448813.jpeg?w=800", alt: "Red Carpet Ready" },
];

const filters = [
  { id: "all", label: "All" },
  { id: "bridal", label: "Bridal" },
  { id: "editorial", label: "Editorial" },
  { id: "party", label: "Party" },
];

const Portfolio = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [selectedImage, setSelectedImage] = useState(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const filteredImages = activeFilter === "all" 
    ? portfolioImages 
    : portfolioImages.filter(img => img.category === activeFilter);

  return (
    <section
      id="portfolio"
      className="section-padding bg-ivory relative"
      data-testid="portfolio-section"
      ref={ref}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <span className="text-gold text-xs tracking-[0.3em] uppercase font-medium">My Work</span>
          <h2 className="font-serif text-4xl md:text-5xl text-warm-dark mt-4 mb-4" data-testid="portfolio-title">
            Portfolio
          </h2>
          <div className="luxury-divider" />
          <p className="text-warm-stone font-light max-w-2xl mx-auto mt-6">
            A curated collection of my finest work, showcasing the artistry and attention to detail 
            that defines every look I create.
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-center gap-2 md:gap-6 mb-12 flex-wrap"
          data-testid="portfolio-filters"
        >
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`filter-btn ${activeFilter === filter.id ? 'active' : 'text-warm-stone'}`}
              data-testid={`filter-${filter.id}`}
            >
              {filter.label}
            </button>
          ))}
        </motion.div>

        {/* Gallery Grid */}
        <motion.div
          layout
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
        >
          <AnimatePresence mode="popLayout">
            {filteredImages.map((image, index) => (
              <motion.div
                key={image.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className={`portfolio-item cursor-pointer ${index === 0 || index === 5 ? 'row-span-2' : ''}`}
                onClick={() => setSelectedImage(image)}
                data-testid={`portfolio-item-${image.id}`}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className={`w-full object-cover ${index === 0 || index === 5 ? 'h-[400px] md:h-full' : 'h-48 md:h-64'}`}
                  loading="lazy"
                />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity z-10">
                  <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center">
                    <ZoomIn size={20} className="text-warm-dark" />
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="lightbox-overlay"
            onClick={() => setSelectedImage(null)}
            data-testid="lightbox"
          >
            <button
              className="absolute top-6 right-6 text-white hover:text-gold transition-colors z-10"
              onClick={() => setSelectedImage(null)}
              data-testid="lightbox-close"
            >
              <X size={32} />
            </button>
            <motion.img
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              src={selectedImage.src}
              alt={selectedImage.alt}
              className="max-w-[90vw] max-h-[90vh] object-contain"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Portfolio;
