import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar } from "@/src/components/layout/Navbar";
import { Footer } from "@/src/components/layout/Footer";
import { Home } from "@/src/pages/Home";
import { About } from "@/src/pages/About";
import { ServicesPage } from "@/src/pages/ServicesPage";
import { Gallery } from "@/src/pages/Gallery";
import { TestimonialsPage } from "@/src/pages/TestimonialsPage";
import { Contact } from "@/src/pages/Contact";
import { Estimator } from "@/src/pages/Estimator";
import { Chatbot } from "@/src/components/Chatbot";
import { BookingModal } from "@/src/components/BookingModal";
import { useState, useEffect } from "react";

export default function App() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  useEffect(() => {
    const handleOpenBooking = () => setIsBookingOpen(true);
    window.addEventListener("open-booking", handleOpenBooking);
    return () => window.removeEventListener("open-booking", handleOpenBooking);
  }, []);

  return (
    <Router>
      <div className="min-h-screen bg-light text-darker flex flex-col font-sans">
        <Navbar />
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/testimonials" element={<TestimonialsPage />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/estimator" element={<Estimator />} />
          </Routes>
        </div>
        <Footer />
        <Chatbot />
        <BookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />
      </div>
    </Router>
  );
}
