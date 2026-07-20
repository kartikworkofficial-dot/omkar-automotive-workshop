import { Link } from "react-router-dom";
import { Wrench, MapPin, Phone, Mail, Clock, Facebook, Instagram, Twitter } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-darker pt-16 pb-8 border-t border-metallic/20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-3 group">
              <img 
                src="https://bsmedia.business-standard.com/_media/bs/img/article/2021-01/15/full/20210115172232.jpg" 
                className="w-10 h-10 object-contain drop-shadow-sm" 
                alt="Omkar Automotive Logo" 
              />
              <div className="flex flex-col">
                <span className="font-display font-bold text-lg leading-none tracking-tight text-white">OMKAR</span>
                <span className="text-[9px] text-secondary font-bold tracking-widest uppercase">Automotive Workshop</span>
              </div>
            </Link>
            <p className="text-steel text-sm leading-relaxed">
              Omkar Automotive Workshop Since 1994 
              • 30+ Years of Trust Delivering reliable automotive repair and servicing for over three decades. 
            </p>
            <div className="flex gap-4 pt-2">
              <a href="#" className="text-steel hover:text-secondary transition-colors"><Facebook className="w-5 h-5" /></a>
              <a href="#" className="text-steel hover:text-secondary transition-colors"><Instagram className="w-5 h-5" /></a>
              <a href="#" className="text-steel hover:text-secondary transition-colors"><Twitter className="w-5 h-5" /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-semibold text-lg mb-6 text-white">Quick Links</h4>
            <ul className="space-y-3">
              <li><Link to="/about" className="text-steel hover:text-secondary transition-colors text-sm">About Us</Link></li>
              <li><Link to="/services" className="text-steel hover:text-secondary transition-colors text-sm">Our Services</Link></li>
              <li><Link to="/gallery" className="text-steel hover:text-secondary transition-colors text-sm">Workshop Gallery</Link></li>
              <li><Link to="/testimonials" className="text-steel hover:text-secondary transition-colors text-sm">Testimonials</Link></li>
              <li><Link to="/contact" className="text-steel hover:text-secondary transition-colors text-sm">Contact Us</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-display font-semibold text-lg mb-6 text-white">Our Services</h4>
            <ul className="space-y-3">
              <li className="text-steel text-sm">Engine Repair & Diagnostics</li>
              <li className="text-steel text-sm">Car & Bike Servicing</li>
              <li className="text-steel text-sm">Oil & Filter Change</li>
              <li className="text-steel text-sm">Brake Repair</li>
              <li className="text-steel text-sm">Battery Replacement</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-display font-semibold text-lg mb-6 text-white">Contact Info</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
                <span className="text-steel text-sm">100 Feet Rd, Ekta Chowk, Sangli, Sangli Miraj Kupwad, Maharashtra 416416</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-secondary shrink-0" />
                <a href="tel:+919422410051" className="text-steel text-sm hover:text-secondary transition-colors">+91 94224 10051</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-secondary shrink-0" />
                <span className="text-steel text-sm">omkarautomotive@gmail.com</span>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
                <div className="flex flex-col">
                  <span className="text-steel text-sm">Mon - Sat: 9:00 AM - 8:00 PM</span>
                  <span className="text-steel text-sm">Sunday: Closed</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-steel text-xs">
            &copy; {new Date().getFullYear()} Omkar Automotive Workshop. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link to="#" className="text-steel hover:text-white text-xs transition-colors">Privacy Policy</Link>
            <Link to="#" className="text-steel hover:text-white text-xs transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
