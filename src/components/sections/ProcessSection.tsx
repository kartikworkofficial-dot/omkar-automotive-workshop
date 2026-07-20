import { motion } from "framer-motion";
import { CalendarCheck, Search, Wrench, CheckCircle } from "lucide-react";

const steps = [
  {
    id: "01",
    title: "Book Appointment",
    description: (
      <>
        Schedule your visit online or <a href="tel:+919422410051" className="text-secondary hover:underline font-medium">call us</a>. Choose a convenient time for your vehicle service.
      </>
    ),
    icon: CalendarCheck,
  },
  {
    id: "02",
    title: "Vehicle Inspection",
    description: "Our experts conduct a thorough diagnostic check to identify any underlying issues.",
    icon: Search,
  },
  {
    id: "03",
    title: "Repair & Service",
    description: "We perform the necessary repairs using genuine parts and advanced tools.",
    icon: Wrench,
  },
  {
    id: "04",
    title: "Quality Check & Delivery",
    description: "A final inspection ensures everything is perfect before we hand back your keys.",
    icon: CheckCircle,
  },
];

export function ProcessSection() {
  return (
    <section className="py-24 bg-light relative border-y border-steel/20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-secondary font-medium tracking-wider uppercase text-sm mb-3">How It Works</h2>
          <h3 className="text-4xl md:text-5xl font-display font-bold text-darker mb-6">
            Simple & Transparent Process.
          </h3>
          <p className="text-dark text-lg leading-relaxed">
            We've streamlined our service process to make it as hassle-free as possible for you. From booking to delivery, experience seamless automotive care.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {/* Connecting Line (Desktop) */}
          <div className="hidden lg:block absolute top-12 left-[10%] right-[10%] h-px bg-steel/30" />

          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative flex flex-col items-center text-center group"
              >
                <div className="w-24 h-24 rounded-full bg-white border-2 border-secondary/20 shadow-sm flex items-center justify-center mb-6 relative z-10 group-hover:border-secondary transition-colors duration-300">
                  <Icon className="w-10 h-10 text-secondary" />
                  <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-secondary text-white flex items-center justify-center text-sm font-bold font-display">
                    {step.id}
                  </div>
                </div>
                <h4 className="text-xl font-display font-semibold text-darker mb-3">{step.title}</h4>
                <p className="text-dark text-sm leading-relaxed">{step.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
