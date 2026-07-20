import { motion } from "framer-motion";
import { CheckCircle2, ShieldCheck, Clock, Wrench, IndianRupee } from "lucide-react";

const reasons = [
  {
    title: "Professional Tools",
    description: "We use advanced diagnostic equipment and modern tools for precise repairs.",
    icon: Wrench,
  },
  {
    title: "Trained Mechanics",
    description: "Our team consists of certified experts with years of hands-on experience.",
    icon: ShieldCheck,
  },
  {
    title: "Transparent Pricing",
    description: "No hidden costs. We provide clear estimates before starting any work.",
    icon: IndianRupee,
  },
  {
    title: "Genuine Spare Parts",
    description: "We source and use only OEM and high-quality aftermarket parts.",
    icon: CheckCircle2,
  },
  {
    title: "Fast Service",
    description: "Efficient turnaround times without compromising on repair quality.",
    icon: Clock,
  },
];

export function WhyChooseUsSection() {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Image Side */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="aspect-[4/5] rounded-3xl overflow-hidden relative z-10">
              <img 
                src="https://imageio.forbes.com/specials-images/imageserve/674392ed33eaf21980fb5b91/0x0.jpg?format=jpg&height=900&width=1600&fit=bounds" 
                alt="Mechanic working on car" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent opacity-80" />
            </div>
            
            {/* Floating Badge */}
            <div className="absolute -bottom-8 -right-8 bg-primary text-white p-8 rounded-2xl shadow-2xl z-20 hidden md:block border border-white/10">
              <div className="text-5xl font-display font-bold mb-2">30+</div>
              <div className="text-sm font-medium uppercase tracking-wider opacity-90">Years of<br/>Excellence</div>
            </div>
            
            {/* Decorative Elements */}
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-primary/20 blur-[60px] rounded-full z-0" />
            <div className="absolute -bottom-10 -right-10 w-60 h-60 bg-secondary/30 blur-[80px] rounded-full z-0" />
          </motion.div>

          {/* Content Side */}
          <div>
            <h2 className="text-secondary font-medium tracking-wider uppercase text-sm mb-3">Why Choose Us</h2>
            <h3 className="text-4xl md:text-5xl font-display font-bold text-darker mb-8 leading-tight">
              Setting the Standard in Automotive Care.
            </h3>
            <p className="text-dark text-lg leading-relaxed mb-12">
              Since 1994, Omkar Automotive Workshop has been the trusted choice for vehicle owners across Maharashtra. Our commitment to quality, honesty, and technical excellence sets us apart.
            </p>

            <div className="space-y-8">
              {reasons.map((reason, index) => {
                const Icon = reason.icon;
                return (
                  <motion.div 
                    key={reason.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex gap-5"
                  >
                    <div className="shrink-0 mt-1">
                      <div className="w-12 h-12 rounded-full bg-light border border-steel/30 flex items-center justify-center">
                        <Icon className="w-5 h-5 text-secondary" />
                      </div>
                    </div>
                    <div>
                      <h4 className="text-xl font-display font-semibold text-darker mb-2">{reason.title}</h4>
                      <p className="text-dark leading-relaxed text-sm md:text-base">{reason.description}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
