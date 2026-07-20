import { motion } from "framer-motion";

export function About() {
  return (
    <main className="pt-24 pb-16 min-h-screen bg-light">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-4xl md:text-6xl font-display font-bold text-darker mb-6">About Omkar Automotive</h1>
          <p className="text-xl text-dark mb-12">30 Years of Trust. Over 1 Lakh+ Happy Customers.</p>
          
          <div className="aspect-video rounded-2xl overflow-hidden mb-12">
            <img 
              src="https://lh3.googleusercontent.com/p/AF1QipMnk9wbH_ZftNApUK0lPm-6BwNsl6oHidQV9Jgr=s1360-w1360-h1020-rw" 
              alt="Workshop" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>

          <div className="prose max-w-none">
            <h2 className="text-2xl font-display font-bold text-darker mb-4">Our Legacy</h2>
            <p className="text-dark leading-relaxed mb-8">
              Founded in 1994 by Baban Narade, Omkar Automotive Workshop started with a simple mission: to provide honest, reliable, and high-quality automotive repair services to the people of Sangli and across Maharashtra. Over the past three decades, we have grown from a small garage into a state-of-the-art service center, trusted by over 100,000 vehicle owners.
            </p>
            
            <h2 className="text-2xl font-display font-bold text-darker mb-4">Our Mission</h2>
            <p className="text-dark leading-relaxed mb-8">
              We strive to redefine the automotive service experience by combining traditional mechanical expertise with modern diagnostic technology. Our goal is to ensure every vehicle that leaves our workshop is safe, reliable, and performing at its absolute best.
            </p>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
