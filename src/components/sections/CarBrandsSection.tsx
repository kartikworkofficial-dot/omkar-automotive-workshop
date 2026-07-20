import { motion } from "framer-motion";

const carBrands = [
  { name: "Mercedes-Benz", logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ15Jqyr6PZvIymVpwyeqmJW8ztgUzCrDh3xw&s" },
  { name: "BMW", logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSuB7FFfg6XoxTOSU0Wpzqmq7cBrpHaN8wEyg&s" },
  { name: "Audi", logo: "https://thumbs.dreamstime.com/b/logo-audi-car-color-vector-format-aviable-ai-logo-audi-124368762.jpg" },
  { name: "Jaguar", logo: "https://thumbs.dreamstime.com/b/logo-jaguar-logo-jaguar-car-color-vector-format-aviable-ai-124808872.jpg" },
  { name: "Land Rover", logo: "https://static.vecteezy.com/system/resources/thumbnails/020/500/342/small/land-rover-brand-logo-car-symbol-green-design-british-automobile-illustration-free-vector.jpg" },
  { name: "Volvo", logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJGNIpF2xnLvyS624ZPoYQA2ytY4VKWLD-ZA&s" },
  { name: "Lexus", logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWWuje1CgrxR5z3ti1Ms0sqUyN_91AppS97w&s" },
  { name: "Porsche", logo: "https://images.seeklogo.com/logo-png/39/2/porsche-logo-png_seeklogo-399884.png" },
  { name: "MINI", logo: "https://www.motoringresearch.com/wp-content/uploads/2017/12/Mini_logo_2001.jpg" },
  { name: "Jeep", logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1xJ-ymqeSx1b7ClV_NC7wYtkiUbwjGw4YHg&s" },
  { name: "Isuzu", logo: "https://lezebre.lu/images/detailed/17/30319-Isuzu.png" },
  { name: "Maruti Suzuki", logo: "https://static.vecteezy.com/system/resources/previews/020/336/714/non_2x/maruti-suzuki-logo-maruiti-icon-free-free-vector.jpg" },
  { name: "Tata Motors", logo: "https://listcarbrands.com/wp-content/uploads/2017/10/2017-logo-Tata-Motors.jpg" },
  { name: "Mahindra", logo: "https://cdn.renderhub.com/3d-logoman/mahindra-new-logo/mahindra-new-logo-02.jpg" },
  { name: "Hyundai", logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJsHyryddOxazGlakWu7Dnl8bn4_hkGlSwGQ&s" },
  { name: "Toyota", logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKMuw8P5ou7TFq9c_wmrlzfRulKCR52I-msQ&s" },
  { name: "Kia", logo: "https://upload.wikimedia.org/wikipedia/commons/4/47/KIA_logo2.svg" },
  { name: "Honda", logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcUEnayoCCFZ9b_aXbiXab-bflko27HlFXmg&s" },
  { name: "MG Motor", logo: "https://static.wikia.nocookie.net/automobile/images/8/88/MG_logo_2011.png/revision/latest?cb=20111009092556" },
  { name: "Renault", logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROR30WPwmYZUWvQr8lUaA0A9aI4BxVa1yMiQ&s" },
  { name: "Nissan", logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0jCShBkrWc2yvl9C7yNVm7v8_DHdrv6HGow&s" },
  { name: "Škoda", logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRR0CU7AZZez2SSSuFsaFLY4rLkqAB2nGEg9Q&s" },
  { name: "Volkswagen", logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT30J3mRPw32noOKF1ADLxDqkR0xUBKwE3M-w&s" },
  { name: "Citroën", logo: "https://upload.wikimedia.org/wikipedia/commons/0/0b/Citroen-logo-2009.png" },
];

export function CarBrandsSection() {
  return (
    <section className="py-20 bg-white border-y border-steel/10 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 mb-12">
        <div className="text-center max-w-3xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-display font-bold text-darker mb-4"
          >
            Brands We Work With
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-steel text-lg"
          >
            We have the expertise, specialized tools, and experience to service and repair all major automobile manufacturers.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, width: 0 }}
            whileInView={{ opacity: 1, width: 80 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="h-1 bg-primary mx-auto mt-6 rounded-full"
          />
        </div>
      </div>

      {/* Infinite Scroll Carousel */}
      <div className="relative w-full overflow-hidden py-12 bg-light/50 border-y border-steel/10">
        <div className="flex w-max animate-marquee hover:pause-animation">
          {/* First set of logos */}
          <div className="flex items-center space-x-12 md:space-x-24 px-6 md:px-12">
            {carBrands.map((brand, index) => (
              <div 
                key={`first-${brand.name}-${index}`}
                className="flex-shrink-0 flex items-center justify-center w-28 h-28 md:w-36 md:h-36 bg-white rounded-2xl shadow-sm border border-steel/10 p-6 transition-all duration-300 hover:scale-110 hover:shadow-md hover:border-secondary/30 cursor-pointer group"
              >
                <img 
                  src={brand.logo} 
                  alt={`${brand.name} logo`} 
                  className="max-w-full max-h-full object-contain transition-all duration-300 group-hover:brightness-110"
                  referrerPolicy="no-referrer"
                />
              </div>
            ))}
          </div>
          
          {/* Second set of logos (duplicate for seamless loop) */}
          <div className="flex items-center space-x-12 md:space-x-24 px-6 md:px-12" aria-hidden="true">
            {carBrands.map((brand, index) => (
              <div 
                key={`second-${brand.name}-${index}`}
                className="flex-shrink-0 flex items-center justify-center w-28 h-28 md:w-36 md:h-36 bg-white rounded-2xl shadow-sm border border-steel/10 p-6 transition-all duration-300 hover:scale-110 hover:shadow-md hover:border-secondary/30 cursor-pointer group"
              >
                <img 
                  src={brand.logo} 
                  alt={`${brand.name} logo`} 
                  className="max-w-full max-h-full object-contain transition-all duration-300 group-hover:brightness-110"
                  referrerPolicy="no-referrer"
                />
              </div>
            ))}
          </div>
        </div>
        
        {/* Gradient Overlays for smooth fade effect at the edges */}
        <div className="absolute inset-y-0 left-0 w-20 md:w-48 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-20 md:w-48 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
      </div>
    </section>
  );
}
