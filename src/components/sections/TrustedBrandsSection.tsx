import { motion } from "framer-motion";

const trustedBrands = [
  {
    name: "Maruti Suzuki",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5DzG3-gRH3R5wEkt_oxF9e40ZaaNYj4-iSw&s"
  },
  {
    name: "Bosch",
    logo: "https://images.seeklogo.com/logo-png/29/2/bosch-logo-png_seeklogo-298084.png"
  },
  {
    name: "Mobil",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgbqlUUNE0dZC36Gknxa6bmqWad_D3mIlFog&s"
  },
  {
    name: "Exide Batteries",
    logo: "https://img.etimg.com/thumb/msid-62382908,width-300,height-225,imgsize-20846,resizemode-75/exide.jpg"
  },
  {
    name: "Blue Point Tools",
    logo: "https://logodix.com/logo/1183754.png",
    fallbackText: "Blue Point"
  },
  {
    name: "Hofmann",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJTEUcW-E4w1t8JakR6eqedkLCSQRs1GjCxw&s",
    fallbackText: "HOFMANN"
  },
  {
    name: "Express Car Services",
    logo: "https://images.jdmagicbox.com/v2/comp/hyderabad/s1/040pxx40.xx40.090529141259.y9s1/catalogue/express-car-service-habsiguda-hyderabad-car-repair-and-services-yyfwfmio2z-250.jpg",
    fallbackText: "Express Car Services"
  }
];

// Helper to bypass hotlinking/CORS issues using an image proxy
const getProxiedImageUrl = (url: string) => {
  if (!url) return "";
  return `https://wsrv.nl/?url=${encodeURIComponent(url)}&output=webp&we`;
};

export function TrustedBrandsSection() {
  // Duplicate the array for infinite scroll effect
  const duplicatedBrands = [...trustedBrands, ...trustedBrands, ...trustedBrands];

  return (
    <section className="py-16 bg-white border-y border-steel/10 overflow-hidden relative">
      <div className="container mx-auto px-4 md:px-6 mb-10 text-center">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-2xl md:text-3xl font-display font-bold text-darker tracking-tight"
        >
          Trusted By Leading Automotive Brands
        </motion.h2>
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="w-24 h-1 bg-secondary mx-auto mt-4 rounded-full"
        />
      </div>

      <div className="relative w-full max-w-7xl mx-auto">
        {/* Gradient Masks for smooth fading on edges */}
        <div className="absolute left-0 top-0 bottom-0 w-24 md:w-40 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-24 md:w-40 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>

        <div className="flex overflow-hidden group py-8">
          <motion.div
            animate={{ x: ["0%", "-33.33%"] }}
            transition={{
              repeat: Infinity,
              ease: "linear",
              duration: 30,
            }}
            className="flex items-center gap-12 md:gap-24 whitespace-nowrap px-12"
          >
            {duplicatedBrands.map((brand, index) => (
              <div 
                key={`${brand.name}-${index}`} 
                className="flex items-center justify-center w-28 h-28 md:w-36 md:h-36 flex-shrink-0 transition-all duration-500 hover:scale-110 cursor-pointer bg-white rounded-2xl p-3 md:p-5 shadow-sm border border-steel/5 hover:shadow-md"
              >
                {brand.logo ? (
                  <img 
                    src={getProxiedImageUrl(brand.logo)} 
                    alt={brand.name} 
                    className="w-full h-full object-contain"
                    crossOrigin="anonymous"
                    onError={(e) => {
                      // Fallback to original URL if proxy fails
                      if (e.currentTarget.src.includes('wsrv.nl')) {
                        e.currentTarget.src = brand.logo;
                      } else {
                        e.currentTarget.style.display = 'none';
                        if (e.currentTarget.nextElementSibling) {
                          (e.currentTarget.nextElementSibling as HTMLElement).style.display = 'block';
                        }
                      }
                    }}
                  />
                ) : null}
                <span 
                  className={`font-display font-bold text-sm md:text-base tracking-tight text-steel text-center whitespace-normal leading-tight ${brand.logo ? 'hidden' : 'block'}`}
                >
                  {brand.fallbackText || brand.name}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
