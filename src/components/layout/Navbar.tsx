import { Link, useLocation } from "react-router-dom";
import { Wrench, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/src/components/ui/button";
import { cn } from "@/src/lib/utils";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Gallery", path: "/gallery" },
    { name: "Testimonials", path: "/testimonials" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <header
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300",
        isScrolled ? "bg-white/95 backdrop-blur-md py-3 shadow-md" : "bg-white/90 backdrop-blur-sm py-5 border-b border-steel/10"
      )}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-4 md:gap-6 group">
          <div className="relative">
            {/* 3D Glow Effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-2xl blur-md opacity-0 group-hover:opacity-100 transition duration-500"></div>
            
            {/* Main Logo Container */}
            <div className="relative w-12 h-12 md:w-16 md:h-16 bg-white rounded-2xl overflow-hidden shadow-[0_10px_20px_-5px_rgba(0,0,0,0.1),0_8px_16px_-8px_rgba(0,0,0,0.1)] border border-steel/10 transform transition-all duration-500 group-hover:-translate-y-1 group-hover:shadow-[0_20px_25px_-5px_rgba(0,0,0,0.1),0_10px_10px_-5px_rgba(0,0,0,0.04)] group-hover:border-primary/20 p-0 md:p-1">
              <img 
                src="https://bsmedia.business-standard.com/_media/bs/img/article/2021-01/15/full/20210115172232.jpg" 
                className="w-full h-full object-contain transform transition-transform duration-700 group-hover:scale-110" 
                alt="Omkar Automotive Logo" 
              />
              {/* Glassy Overlay for 3D depth */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-black/10 pointer-events-none"></div>
              {/* Subtle Inner Shadow */}
              <div className="absolute inset-0 shadow-[inset_0_2px_4px_rgba(255,255,255,0.3),inset_0_-2px_4px_rgba(0,0,0,0.1)] pointer-events-none"></div>
            </div>
          </div>

          <div className="flex flex-col justify-center">
            <span className="font-display font-bold text-2xl md:text-3xl tracking-tighter text-darker leading-none">OMKAR</span>
            <div className="flex items-center mt-1">
              <span className="text-[10px] md:text-[11px] text-secondary font-bold tracking-[0.25em] uppercase">Automotive Workshop</span>
            </div>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={cn(
                "text-sm font-bold transition-colors hover:text-secondary",
                location.pathname === link.path ? "text-primary" : "text-dark"
              )}
            >
              {link.name}
            </Link>
          ))}

          <Button onClick={() => window.dispatchEvent(new Event('open-booking'))}>Book Service</Button>
        </nav>

        {/* Mobile Menu Toggle */}
        <div className="flex items-center md:hidden">
          <button
            className="text-darker p-2 hover:bg-steel/10 rounded-md transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white border-t border-steel/20 py-4 px-4 flex flex-col gap-2 shadow-xl">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => setIsMobileMenuOpen(false)}
              className={cn(
                "text-base font-bold py-3 px-4 rounded-md transition-colors",
                location.pathname === link.path ? "bg-primary/5 text-primary" : "text-dark hover:bg-steel/5"
              )}
            >
              {link.name}
            </Link>
          ))}
          <Button className="w-full mt-2" onClick={() => {
            setIsMobileMenuOpen(false);
            window.dispatchEvent(new Event('open-booking'));
          }}>Book Service</Button>
        </div>
      )}
    </header>
  );
}
