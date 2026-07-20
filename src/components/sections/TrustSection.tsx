import { motion } from "framer-motion";
import { Users, Wrench, Award, ThumbsUp } from "lucide-react";

const stats = [
  {
    id: 1,
    name: "Years of Trust",
    value: "30+",
    icon: Award,
  },
  {
    id: 2,
    name: "Happy Customers",
    value: "1 Lakh+",
    icon: Users,
  },
  {
    id: 3,
    name: "Vehicles Serviced",
    value: "1.5L+",
    icon: Wrench,
  },
  {
    id: 4,
    name: "Satisfaction Rate",
    value: "99%",
    icon: ThumbsUp,
  },
];

export function TrustSection() {
  return (
    <section className="py-20 bg-white border-y border-steel/10 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-px bg-gradient-to-r from-transparent via-secondary/50 to-transparent opacity-50" />
      
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex flex-col items-center text-center group"
              >
                <div className="mb-4 p-4 rounded-2xl bg-light border border-steel/20 group-hover:border-secondary/50 transition-colors duration-300">
                  <Icon className="w-8 h-8 text-secondary" />
                </div>
                <div className="text-4xl md:text-5xl font-display font-bold text-darker mb-2 tracking-tight">
                  {stat.value}
                </div>
                <div className="text-sm md:text-base text-steel font-medium uppercase tracking-wider">
                  {stat.name}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
