import { motion } from "framer-motion";

const brands = [
  {
    name: "Maruti Suzuki",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5DzG3-gRH3R5wEkt_oxF9e40ZaaNYj4-iSw&s",
  },
  {
    name: "Exide Batteries",
    logo: "https://img.etimg.com/thumb/msid-62382908,width-300,height-225,imgsize-20846,resizemode-75/exide.jpg",
  },
  {
    name: "Bosch",
    logo: "https://images.seeklogo.com/logo-png/29/2/bosch-logo-png_seeklogo-298084.png",
  },
  {
    name: "Blue Point",
    logo: "https://logodix.com/logo/1183754.png",
  },
  {
    name: "Hofmann",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJTEUcW-E4w1t8JakR6eqedkLCSQRs1GjCxw&s",
  },
  {
    name: "Mobil",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgbqlUUNE0dZC36Gknxa6bmqWad_D3mIlFog&s",
  },
  {
    name: "Express Car Service",
    logo: "https://images.jdmagicbox.com/v2/comp/hyderabad/s1/040pxx40.xx40.090529141259.y9s1/catalogue/express-car-service-habsiguda-hyderabad-car-repair-and-services-yyfwfmio2z-250.jpg",
  },
];

export function BrandsSection() {
  return (
    <section className="py-16 bg-white border-b border-steel/10 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-secondary font-medium tracking-wider uppercase text-sm mb-3"
          >
            Trusted By Leading Automotive Brands
          </motion.h2>
          <motion.div 
            initial={{ opacity: 0, width: 0 }}
            whileInView={{ opacity: 1, width: 80 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="h-1 bg-secondary mx-auto rounded-full"
          />
        </div>

        {/* Infinite Scroll Carousel */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
          className="relative group"
        >
          <div className="flex overflow-hidden space-x-16 group">
            <motion.div 
              className="flex space-x-16 whitespace-nowrap py-4"
              animate={{ x: [0, -1920] }}
              transition={{ 
                repeat: Infinity, 
                duration: 40, 
                ease: "linear" 
              }}
            >
              {[...brands, ...brands, ...brands].map((brand, index) => (
                <motion.div 
                  key={`${brand.name}-${index}`}
                  whileHover={{ scale: 1.1 }}
                  className="flex items-center justify-center w-40 h-20 opacity-100 transition-all duration-500 cursor-pointer"
                >
                  <img 
                    src={brand.logo} 
                    alt={brand.name} 
                    className="max-w-full max-h-full object-contain"
                    referrerPolicy="no-referrer"
                  />
                </motion.div>
              ))}
            </motion.div>
          </div>
          
          {/* Gradient Overlays for smooth edges */}
          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white to-transparent z-10" />
          <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white to-transparent z-10" />
        </motion.div>
      </div>
    </section>
  );
}
