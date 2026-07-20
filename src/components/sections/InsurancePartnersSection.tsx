import { motion } from "framer-motion";

const insurancePartners = [
  { 
    name: "New India Assurance", 
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2lYntINHPedLoy6bZ1bfItXT5TUWOZI6tUw&s" 
  },
  { 
    name: "United India Insurance", 
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFVZh5iclFIP3JBy4dXJQ8P8VxlcY6LSfaMg&s" 
  },
  { 
    name: "Oriental Insurance", 
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIDR9wZR8owVxDB4BFjBVVJbEJIrHtCbE5sw&s" 
  },
  { 
    name: "National Insurance", 
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbsuM8ndNttkH2nQFOh5bL4noSuRzNgC-K1w&s" 
  },
  { 
    name: "Agriculture Insurance Company of India", 
    logo: "https://pbs.twimg.com/profile_images/1790625634449793025/Swu1ngTN_400x400.jpg" 
  },
  { 
    name: "ECGC Limited", 
    logo: "https://media.licdn.com/dms/image/v2/C4D0BAQH5JIRQ4SDPrA/company-logo_200_200/company-logo_200_200/0/1634009265602?e=2147483647&v=beta&t=RnxrwZYi24AC1V_o6MN3Ich92dDvat4XFOogh4TRZfA" 
  },
  { 
    name: "ICICI Lombard", 
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRWUIxNytsPAyUzmLDKxq6nOwo3cnmcFJMAQ&s" 
  },
  { 
    name: "Bajaj Allianz", 
    logo: "https://mepiks.com/files/preview/900x675/11801747049200n9yditc8romt6362w5mvegybkcyaqfuyh7khyjiwcbjodb9j5rlqapqto0hoe0kvjj1qoxropqzx7ibqdskaehbwjkihvtl8dnez.jpg" 
  },
  { 
    name: "HDFC ERGO", 
    logo: "https://img.autocarpro.in/autocarpro/8c4c7a88-49eb-4788-a82a-35e240eff34f_WhatsApp-Image-20230413-at-19.01.53.jpeg?w=750&h=490&q=75&c=1" 
  },
  { 
    name: "Tata AIG", 
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzB6OH7vBI48F9meUQEBKPQ57MAcUV_pim5Q&s" 
  },
  { 
    name: "SBI General Insurance", 
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZl1EciKantm8NLsh-U-iA14YIJZCIEYFW4Q&s" 
  },
  { 
    name: "Reliance General Insurance", 
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVr8NK5b9R1TnF49et6zZW3tDx-U7zyy1N9w&s" 
  },
  { 
    name: "IFFCO TOKIO", 
    logo: "https://play-lh.googleusercontent.com/pam4hTpQ410mbd8VzZQLznENyxAI7WUf6LU5eMIcd-9TSrYP43V4-gPWqE35MHJjCg" 
  },
  { 
    name: "Cholamandalam MS", 
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUA7Ur0Turi441GiVfuBGNch260XZrdEHSHA&s" 
  },
  { 
    name: "Royal Sundaram", 
    logo: "https://cms-img.coverfox.com/royal-sundaram-general-insurance.jpg" 
  },
  { 
    name: "Kotak Mahindra General Insurance", 
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcdeXv3QFaKx-SM0qwNFKPmbacCy-v3AX7DA&s" 
  },
  { 
    name: "Digit Insurance", 
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2jgmdqi67JzlI5IbAXrkist3R2Z3TLcleSQ&s" 
  },
  { 
    name: "Acko General Insurance", 
    logo: "https://img-cdn.publive.online/fit-in/1200x675/filters:format(webp)/afaqs/media/media_files/2025/01/29/rRiabUi9u35MaYubTl5r.png" 
  },
];

// Helper to bypass hotlinking/CORS issues using an image proxy
const getProxiedImageUrl = (url: string) => {
  if (!url) return "";
  return `https://wsrv.nl/?url=${encodeURIComponent(url)}&output=webp&we`;
};

export function InsurancePartnersSection() {
  // Duplicate the array for infinite scroll effect
  const duplicatedPartners = [...insurancePartners, ...insurancePartners];

  return (
    <section className="py-20 bg-light border-y border-steel/10 overflow-hidden relative">
      <div className="container mx-auto px-4 md:px-6 mb-12 text-center max-w-4xl">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-display font-bold text-darker tracking-tight mb-6"
        >
          Insurance Partners
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-lg text-steel leading-relaxed"
        >
          End-to-end insurance claim management from claim registration to survey coordination. We handle everything to ensure a smooth and stress-free claim process and a hassle-free experience for our customers.
        </motion.p>
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="w-24 h-1 bg-primary mx-auto mt-8 rounded-full"
        />
      </div>

      <div className="relative w-full max-w-7xl mx-auto">
        {/* Gradient Masks for smooth fading on edges */}
        <div className="absolute left-0 top-0 bottom-0 w-24 md:w-40 bg-gradient-to-r from-light to-transparent z-10 pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-24 md:w-40 bg-gradient-to-l from-light to-transparent z-10 pointer-events-none"></div>

        <div className="flex overflow-hidden group py-8">
          <motion.div
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              repeat: Infinity,
              ease: "linear",
              duration: 50,
            }}
            className="flex items-center gap-8 md:gap-16 whitespace-nowrap px-8"
          >
            {duplicatedPartners.map((partner, index) => (
              <div 
                key={`${partner.name}-${index}`} 
                className="flex items-center justify-center w-32 h-32 md:w-40 md:h-40 flex-shrink-0 transition-all duration-500 hover:scale-105 cursor-pointer bg-white rounded-2xl p-4 md:p-6 shadow-sm border border-steel/5 hover:shadow-md"
              >
                {partner.logo ? (
                  <img 
                    src={getProxiedImageUrl(partner.logo)} 
                    alt={partner.name} 
                    className="w-full h-full object-contain"
                    crossOrigin="anonymous"
                    onError={(e) => {
                      // Fallback to original URL if proxy fails
                      if (e.currentTarget.src.includes('wsrv.nl')) {
                        e.currentTarget.src = partner.logo;
                      } else {
                        e.currentTarget.style.display = 'none';
                        if (e.currentTarget.nextElementSibling) {
                          (e.currentTarget.nextElementSibling as HTMLElement).style.display = 'flex';
                        }
                      }
                    }}
                  />
                ) : null}
                <span 
                  className="font-display font-bold text-sm md:text-base tracking-tight text-steel text-center whitespace-normal leading-tight items-center justify-center h-full w-full"
                  style={{ display: partner.logo ? 'none' : 'flex' }}
                >
                  {partner.name}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
