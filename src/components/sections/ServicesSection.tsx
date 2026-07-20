import { motion } from "framer-motion";
import { Wrench, Settings, Battery, Droplet, Disc, Activity, Wind, Car } from "lucide-react";
import { Button } from "@/src/components/ui/button";

const services = [
  {
    title: "Engine Repair",
    description: "Comprehensive engine diagnostics, repair, and rebuilding for optimal performance.",
    icon: Settings,
  },
  {
    title: "Car Servicing",
    description: "Full-scale periodic maintenance to keep your car running smoothly and safely.",
    icon: Car,
  },
  {
    title: "Bike Servicing",
    description: "Expert two-wheeler maintenance, from oil changes to complete overhauls.",
    icon: Wrench,
  },
  {
    title: "Oil Change",
    description: "Premium synthetic and conventional oil changes to protect your engine.",
    icon: Droplet,
  },
  {
    title: "Brake Repair",
    description: "Brake pad replacement, rotor resurfacing, and fluid flushes for safety.",
    icon: Disc,
  },
  {
    title: "Diagnostics",
    description: "Advanced computer diagnostics to accurately identify and resolve vehicle issues.",
    icon: Activity,
  },
  {
    title: "Battery Replacement",
    description: "Testing, charging, and replacement of vehicle batteries with top brands.",
    icon: Battery,
  },
  {
    title: "AC Repair",
    description: "Air conditioning inspection, recharge, and repair for maximum comfort.",
    icon: Wind,
  },
];

export function ServicesSection() {
  return (
    <section className="py-24 bg-light relative" id="services">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-secondary font-medium tracking-wider uppercase text-sm mb-3">Our Expertise</h2>
            <h3 className="text-4xl md:text-5xl font-display font-bold text-darker mb-6">
              Comprehensive Automotive Solutions.
            </h3>
            <p className="text-dark text-lg leading-relaxed">
              From routine maintenance to complex engine repairs, our certified mechanics use state-of-the-art equipment to ensure your vehicle performs at its best.
            </p>
          </div>
          <Button variant="outline" className="hidden md:inline-flex border-steel text-darker hover:bg-darker hover:text-lighter bg-transparent">View All Services</Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group p-8 rounded-2xl bg-white border border-steel/20 hover:border-secondary/50 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1"
              >
                <div className="w-14 h-14 rounded-xl bg-light flex items-center justify-center mb-6 group-hover:bg-secondary/10 transition-colors">
                  <Icon className="w-7 h-7 text-secondary" />
                </div>
                <h4 className="text-xl font-display font-semibold text-darker mb-3">
                  {service.title}
                </h4>
                <p className="text-dark text-sm leading-relaxed mb-6">
                  {service.description}
                </p>
                <button onClick={() => window.dispatchEvent(new Event('open-booking'))} className="text-secondary text-sm font-medium flex items-center gap-2 group-hover:gap-3 transition-all">
                  Book Now <span className="text-lg leading-none">&rarr;</span>
                </button>
              </motion.div>
            );
          })}
        </div>
        
        <div className="mt-12 text-center md:hidden">
          <Button variant="outline" className="w-full border-steel text-darker hover:bg-darker hover:text-lighter bg-transparent">View All Services</Button>
        </div>
      </div>
    </section>
  );
}
