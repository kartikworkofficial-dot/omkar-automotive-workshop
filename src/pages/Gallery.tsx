import { motion } from "framer-motion";

const images = [
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgopMB3fwMLQ_wMj6yO9ld4bf6CO8Hu2EFfw&s",
  "https://images.stockcake.com/public/a/9/e/a9e4fdda-5b32-41f7-9831-2f65e0209772_large/busy-auto-workshop-stockcake.jpg",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAcC-7sXDwCI4-KRaeuIekNctRPIX_R4s1TQ&s",
  "https://images.unsplash.com/photo-1613214149922-f1809c99b414?q=80&w=2070&auto=format&fit=crop",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTuYIbQGC5EwuFBHj0wXBl8zHvj5ztK6v7BYA&s",
  "https://galaxyautoworks.com/wp-content/uploads/2025/06/Audi-service-gaw.jpg.webp",
];

export function Gallery() {
  return (
    <main className="pt-32 pb-24 min-h-screen bg-light">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl md:text-6xl font-display font-bold text-darker mb-6">Workshop Gallery</h1>
          <p className="text-xl text-dark">Take a look inside our state-of-the-art facility in Sangli.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((src, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="aspect-square rounded-2xl overflow-hidden group relative"
            >
              <img
                src={src}
                alt={`Gallery Image ${index + 1}`}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-darker/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="text-white font-medium tracking-wider uppercase text-sm">View Details</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
}
