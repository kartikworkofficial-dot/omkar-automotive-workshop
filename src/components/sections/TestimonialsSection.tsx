import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Rahul Deshmukh",
    role: "Car Owner",
    content: "I've been bringing my Honda City to Omkar Workshop for 5 years. Their transparency and expertise are unmatched in Sangli. Highly recommended!",
    rating: 5,
  },
  {
    id: 2,
    name: "Priya Sharma",
    role: "Two-Wheeler Owner",
    content: "Fast, reliable, and affordable. They fixed my scooter's engine issue in a day when other garages said it would take a week. Great service.",
    rating: 5,
  },
  {
    id: 3,
    name: "Amit Patil",
    role: "Fleet Manager",
    content: "Managing a fleet of 10 vehicles is tough, but Omkar Automotive makes it easy. Their AMC packages and priority service are a lifesaver.",
    rating: 5,
  },
];

export function TestimonialsSection() {
  return (
    <section className="py-24 bg-white relative">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-secondary font-medium tracking-wider uppercase text-sm mb-3">Testimonials</h2>
            <h3 className="text-4xl md:text-5xl font-display font-bold text-darker mb-6">
              What Our Clients Say.
            </h3>
            <p className="text-dark text-lg leading-relaxed">
              Don't just take our word for it. Read what our satisfied customers have to say about their experience with Omkar Automotive Workshop.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="p-8 rounded-2xl bg-light border border-steel/20 relative group hover:border-secondary/30 shadow-sm transition-colors"
            >
              <Quote className="absolute top-6 right-6 w-10 h-10 text-steel/20 group-hover:text-secondary/10 transition-colors" />
              
              <div className="flex gap-1 mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-secondary text-secondary" />
                ))}
              </div>
              
              <p className="text-darker/90 text-base leading-relaxed mb-8 italic">
                "{testimonial.content}"
              </p>
              
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center text-secondary font-display font-bold text-lg">
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <h4 className="text-darker font-display font-semibold">{testimonial.name}</h4>
                  <p className="text-dark text-sm">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
