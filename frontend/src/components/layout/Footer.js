import { motion } from "framer-motion";
import { Instagram, Facebook, Youtube, Mail, Phone, Heart } from "lucide-react";

const quickLinks = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Services", href: "#services" },
  { name: "Portfolio", href: "#portfolio" },
  { name: "Testimonials", href: "#testimonials" },
  { name: "Contact", href: "#contact" },
];

const socialLinks = [
  { icon: Instagram, href: "https://instagram.com/palaksinghmakeup", label: "Instagram" },
  { icon: Facebook, href: "https://facebook.com/palaksinghmakeup", label: "Facebook" },
  { icon: Youtube, href: "https://youtube.com/@palaksinghmakeup", label: "YouTube" },
];

const Footer = () => {
  const scrollToSection = (href) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-warm-dark text-white" data-testid="footer">
      <div className="max-w-7xl mx-auto px-6 py-16 md:py-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="lg:col-span-2">
            <h3 className="font-serif text-3xl md:text-4xl mb-2" data-testid="footer-logo">
              PALAK SINGH
            </h3>
            <span className="text-gold text-xs tracking-[0.3em] uppercase">Luxury Makeup Artist</span>
            <p className="text-white/60 font-light mt-6 max-w-md leading-relaxed">
              Transforming faces and celebrating beauty since 2014. Every look I create is a masterpiece, 
              designed to make you feel confident, beautiful, and truly yourself.
            </p>
            
            {/* Social Links */}
            <div className="flex gap-4 mt-8">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 flex items-center justify-center border border-white/20 text-white/70 hover:border-gold hover:text-gold transition-all"
                  aria-label={social.label}
                  data-testid={`footer-social-${social.label.toLowerCase()}`}
                >
                  <social.icon size={18} strokeWidth={1.5} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif text-lg mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(link.href);
                    }}
                    className="text-white/60 text-sm font-light hover:text-gold transition-colors"
                    data-testid={`footer-link-${link.name.toLowerCase()}`}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-serif text-lg mb-6">Get In Touch</h4>
            <div className="space-y-4">
              <a
                href="tel:+919876543210"
                className="flex items-center gap-3 text-white/60 text-sm font-light hover:text-gold transition-colors"
                data-testid="footer-phone"
              >
                <Phone size={16} strokeWidth={1.5} />
                +91 91428 71157
              </a>
              <a
                href="mailto:hello@palaksingh.com"
                className="flex items-center gap-3 text-white/60 text-sm font-light hover:text-gold transition-colors"
                data-testid="footer-email"
              >
                <Mail size={16} strokeWidth={1.5} />
                hello@palaksingh.com
              </a>
            </div>

            {/* CTA */}
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("#contact");
              }}
              className="inline-block mt-8 px-6 py-3 bg-gold text-white text-xs tracking-widest uppercase font-medium hover:bg-gold-hover transition-colors"
              data-testid="footer-book-btn"
            >
              Book Now
            </a>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-white/10 mb-8" />

        {/* Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/40 text-xs tracking-wide">
            © {currentYear} Palak Singh. All rights reserved.
          </p>
          <p className="text-white/40 text-xs flex items-center gap-1">
            Designed for <span className="text-gold">Luxury Beauty Experience</span>
          </p>
        </div>
      </div>

      {/* Decorative bottom bar */}
      <div className="h-1 bg-gradient-to-r from-transparent via-gold to-transparent" />
    </footer>
  );
};

export default Footer;
