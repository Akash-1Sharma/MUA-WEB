import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Phone, Mail, MapPin, Instagram, Send } from "lucide-react";
import { toast } from "sonner";
import axios from "axios";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const contactInfo = [
  { icon: Phone, label: "Phone", value: "+91 91428 71157", href: "tel:+919142871157" },
  { icon: Mail, label: "Email", value: "hello@palaksingh.com", href: "mailto:hello@palaksingh.com" },
  { icon: Instagram, label: "Instagram", value: "@palaksinghmakeup", href: "https://instagram.com/palaksinghmakeup" },
  { icon: MapPin, label: "Location", value: "Mumbai, India", href: "#" },
];

const eventTypes = [
  "Bridal Makeup",
  "Engagement Makeup",
  "Reception Makeup",
  "Party Makeup",
  "Editorial / Photoshoot",
  "Celebrity / Red Carpet",
  "Other",
];

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    event_type: "",
    event_date: "",
    city: "",
    message: "",
  });
  const [date, setDate] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const handleDateSelect = (selectedDate) => {
    setDate(selectedDate);
    if (selectedDate) {
      setFormData({...formData, event_date: format(selectedDate, "yyyy-MM-dd")});
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.phone || !formData.email || !formData.event_type || !formData.event_date || !formData.city) {
      toast.error("Please fill in all required fields");
      return;
    }

    setIsSubmitting(true);
    try {
      await axios.post(`${API}/bookings`, formData);
      toast.success("Thank you for your enquiry! We'll get back to you within 24 hours.");
      setFormData({
        name: "",
        phone: "",
        email: "",
        event_type: "",
        event_date: "",
        city: "",
        message: "",
      });
      setDate(null);
    } catch (error) {
      toast.error("Failed to submit enquiry. Please try again or contact us directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className="section-padding bg-ivory relative overflow-hidden"
      data-testid="contact-section"
      ref={ref}
    >
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blush/20 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
      
      <div className="max-w-7xl mx-auto relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-gold text-xs tracking-[0.3em] uppercase font-medium">Get In Touch</span>
          <h2 className="font-serif text-4xl md:text-5xl text-warm-dark mt-4 mb-4" data-testid="contact-title">
            Book Your Appointment
          </h2>
          <div className="luxury-divider" />
          <p className="text-warm-stone font-light max-w-2xl mx-auto mt-6">
            Ready to experience luxury beauty? Fill out the form below and let's create 
            your perfect look together.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <div className="bg-warm-dark p-8 md:p-10 h-full">
              <h3 className="font-serif text-2xl text-white mb-8">Contact Information</h3>
              
              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <a
                    key={index}
                    href={info.href}
                    target={info.href.startsWith('http') ? '_blank' : undefined}
                    rel={info.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="flex items-start gap-4 group"
                    data-testid={`contact-info-${info.label.toLowerCase()}`}
                  >
                    <div className="w-10 h-10 flex items-center justify-center border border-gold/30 text-gold group-hover:bg-gold group-hover:text-white transition-all">
                      <info.icon size={18} strokeWidth={1.5} />
                    </div>
                    <div>
                      <span className="text-xs tracking-widest uppercase text-white/50 block">{info.label}</span>
                      <span className="text-white font-light group-hover:text-gold transition-colors">{info.value}</span>
                    </div>
                  </a>
                ))}
              </div>

              {/* WhatsApp Button */}
              <a
                href="https://wa.me/919142871157"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-10 flex items-center justify-center gap-3 w-full py-4 bg-[#25D366] text-white font-medium text-sm tracking-wide hover:bg-[#20BD5A] transition-colors"
                data-testid="whatsapp-contact-btn"
              >
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Chat on WhatsApp
              </a>

              {/* Decorative Quote */}
              <div className="mt-10 pt-8 border-t border-white/10">
                <p className="font-accent text-white/70 text-lg italic">
                  "Every face tells a story. Let me help you tell yours beautifully."
                </p>
              </div>
            </div>
          </motion.div>

          {/* Booking Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="lg:col-span-3"
          >
            <form onSubmit={handleSubmit} className="space-y-6" data-testid="booking-form">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="text-xs tracking-widest uppercase text-warm-stone mb-2 block">Name *</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="form-input w-full"
                    placeholder="Your full name"
                    data-testid="booking-name-input"
                  />
                </div>
                <div>
                  <label className="text-xs tracking-widest uppercase text-warm-stone mb-2 block">Phone *</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="form-input w-full"
                    placeholder="+91 XXXXX XXXXX"
                    data-testid="booking-phone-input"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs tracking-widest uppercase text-warm-stone mb-2 block">Email *</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="form-input w-full"
                  placeholder="your@email.com"
                  data-testid="booking-email-input"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="text-xs tracking-widest uppercase text-warm-stone mb-2 block">Event Type *</label>
                  <select
                    value={formData.event_type}
                    onChange={(e) => setFormData({...formData, event_type: e.target.value})}
                    className="form-input w-full"
                    data-testid="booking-event-select"
                  >
                    <option value="">Select event type</option>
                    {eventTypes.map((type) => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-xs tracking-widest uppercase text-warm-stone mb-2 block">Event Date *</label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <button
                        type="button"
                        className="form-input w-full text-left flex items-center justify-between"
                        data-testid="booking-date-trigger"
                      >
                        {date ? format(date, "PPP") : <span className="text-warm-muted">Select date</span>}
                        <CalendarIcon className="w-4 h-4 text-warm-muted" />
                      </button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0 bg-white" align="start">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={handleDateSelect}
                        disabled={(date) => date < new Date()}
                        initialFocus
                        data-testid="booking-calendar"
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              <div>
                <label className="text-xs tracking-widest uppercase text-warm-stone mb-2 block">City *</label>
                <input
                  type="text"
                  value={formData.city}
                  onChange={(e) => setFormData({...formData, city: e.target.value})}
                  className="form-input w-full"
                  placeholder="Event city / location"
                  data-testid="booking-city-input"
                />
              </div>

              <div>
                <label className="text-xs tracking-widest uppercase text-warm-stone mb-2 block">Message</label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className="form-input w-full h-32 resize-none"
                  placeholder="Tell us about your vision, any specific requirements, or questions..."
                  data-testid="booking-message-input"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-gold w-full flex items-center justify-center gap-2"
                data-testid="booking-submit-btn"
              >
                {isSubmitting ? (
                  'Sending...'
                ) : (
                  <>
                    <Send size={16} />
                    Send Enquiry
                  </>
                )}
              </button>

              <p className="text-xs text-warm-muted text-center">
                By submitting this form, you agree to be contacted regarding your enquiry. 
                We typically respond within 24 hours.
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
