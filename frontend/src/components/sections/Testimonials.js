import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { toast } from "sonner";
import axios from "axios";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

// Default testimonials to show initially
const defaultTestimonials = [
  {
    id: "1",
    client_name: "Priya Sharma",
    rating: 5,
    review: "Palak is absolutely amazing! She did my bridal makeup and I couldn't have asked for anything better. Her attention to detail is impeccable and she made me feel like the most beautiful bride. Highly recommend her services!",
    event_type: "Bridal",
  },
  {
    id: "2",
    client_name: "Ananya Gupta",
    rating: 5,
    review: "I've worked with many makeup artists for my photoshoots, but Palak's work is on another level. She understands exactly what look works best for the camera. A true professional!",
    event_type: "Editorial",
  },
  {
    id: "3",
    client_name: "Meera Kapoor",
    rating: 5,
    review: "Had my engagement makeup done by Palak and received so many compliments! The makeup lasted all day and looked flawless in photos. She's incredibly talented and so pleasant to work with.",
    event_type: "Engagement",
  },
  {
    id: "4",
    client_name: "Riya Patel",
    rating: 5,
    review: "Palak transformed me for my sister's wedding. I felt like a celebrity! Her use of airbrush techniques gave me the most natural yet glamorous look. Will definitely book her again.",
    event_type: "Party",
  },
];

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState(defaultTestimonials);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    client_name: "",
    rating: 5,
    review: "",
    event_type: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const response = await axios.get(`${API}/testimonials/approved`);
      if (response.data.length > 0) {
        setTestimonials([...defaultTestimonials, ...response.data]);
      }
    } catch (error) {
      console.log("Using default testimonials");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.client_name || !formData.review) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    setIsSubmitting(true);
    try {
      await axios.post(`${API}/testimonials`, formData);
      toast.success("Thank you for your review! It will be displayed after approval.");
      setFormData({ client_name: "", rating: 5, review: "", event_type: "" });
      setShowForm(false);
    } catch (error) {
      toast.error("Failed to submit review. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const renderStars = (rating, interactive = false, onRate = null) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={interactive ? 24 : 18}
            className={`${star <= rating ? 'star-filled fill-gold' : 'star-empty'} ${interactive ? 'cursor-pointer hover:scale-110 transition-transform' : ''}`}
            strokeWidth={1.5}
            onClick={interactive ? () => onRate(star) : undefined}
          />
        ))}
      </div>
    );
  };

  return (
    <section
      id="testimonials"
      className="section-padding bg-blush/30 relative overflow-hidden"
      data-testid="testimonials-section"
      ref={ref}
    >
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-gold/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/50 rounded-full blur-3xl" />
      
      <div className="max-w-6xl mx-auto relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-gold text-xs tracking-[0.3em] uppercase font-medium">Client Love</span>
          <h2 className="font-serif text-4xl md:text-5xl text-warm-dark mt-4 mb-4" data-testid="testimonials-title">
            Testimonials
          </h2>
          <div className="luxury-divider" />
        </motion.div>

        {/* Testimonial Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          <div className="testimonial-card max-w-3xl mx-auto p-8 md:p-12 text-center" data-testid="testimonial-card">
            <Quote className="w-12 h-12 text-gold/30 mx-auto mb-6" />
            
            <div className="flex justify-center mb-6">
              {renderStars(testimonials[currentIndex]?.rating || 5)}
            </div>
            
            <p className="font-serif text-lg md:text-xl text-warm-dark leading-relaxed italic mb-8">
              "{testimonials[currentIndex]?.review}"
            </p>
            
            <div>
              <p className="font-serif text-xl text-warm-dark">{testimonials[currentIndex]?.client_name}</p>
              {testimonials[currentIndex]?.event_type && (
                <span className="text-xs tracking-widest uppercase text-gold">{testimonials[currentIndex]?.event_type}</span>
              )}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-center items-center gap-6 mt-8">
            <button
              onClick={prevTestimonial}
              className="w-12 h-12 flex items-center justify-center border border-gold/30 text-gold hover:bg-gold hover:text-white transition-all"
              data-testid="testimonial-prev"
            >
              <ChevronLeft size={20} />
            </button>
            
            <div className="flex gap-2">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`w-2 h-2 rounded-full transition-all ${idx === currentIndex ? 'bg-gold w-6' : 'bg-gold/30'}`}
                  data-testid={`testimonial-dot-${idx}`}
                />
              ))}
            </div>
            
            <button
              onClick={nextTestimonial}
              className="w-12 h-12 flex items-center justify-center border border-gold/30 text-gold hover:bg-gold hover:text-white transition-all"
              data-testid="testimonial-next"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </motion.div>

        {/* Submit Review Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <button
            onClick={() => setShowForm(!showForm)}
            className="btn-outline-gold"
            data-testid="submit-review-btn"
          >
            {showForm ? 'Close Form' : 'Share Your Experience'}
          </button>
        </motion.div>

        {/* Review Form */}
        {showForm && (
          <motion.form
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="max-w-xl mx-auto mt-8 p-8 bg-white border border-gold/20"
            onSubmit={handleSubmit}
            data-testid="review-form"
          >
            <h3 className="font-serif text-xl text-center mb-6">Leave a Review</h3>
            
            <div className="space-y-4">
              <div>
                <label className="text-xs tracking-widest uppercase text-warm-stone mb-2 block">Your Name *</label>
                <input
                  type="text"
                  value={formData.client_name}
                  onChange={(e) => setFormData({...formData, client_name: e.target.value})}
                  className="form-input w-full"
                  placeholder="Enter your name"
                  data-testid="review-name-input"
                />
              </div>
              
              <div>
                <label className="text-xs tracking-widest uppercase text-warm-stone mb-2 block">Event Type</label>
                <select
                  value={formData.event_type}
                  onChange={(e) => setFormData({...formData, event_type: e.target.value})}
                  className="form-input w-full"
                  data-testid="review-event-select"
                >
                  <option value="">Select event type</option>
                  <option value="Bridal">Bridal</option>
                  <option value="Engagement">Engagement</option>
                  <option value="Party">Party</option>
                  <option value="Editorial">Editorial</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              
              <div>
                <label className="text-xs tracking-widest uppercase text-warm-stone mb-2 block">Rating *</label>
                {renderStars(formData.rating, true, (rating) => setFormData({...formData, rating}))}
              </div>
              
              <div>
                <label className="text-xs tracking-widest uppercase text-warm-stone mb-2 block">Your Review *</label>
                <textarea
                  value={formData.review}
                  onChange={(e) => setFormData({...formData, review: e.target.value})}
                  className="form-input w-full h-32 resize-none"
                  placeholder="Share your experience..."
                  data-testid="review-text-input"
                />
              </div>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-gold w-full"
                data-testid="review-submit-btn"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Review'}
              </button>
            </div>
          </motion.form>
        )}
      </div>
    </section>
  );
};

export default Testimonials;
