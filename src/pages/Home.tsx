import { Hero } from "@/src/components/sections/Hero";
import { TrustSection } from "@/src/components/sections/TrustSection";
import { TrustedBrandsSection } from "@/src/components/sections/TrustedBrandsSection";
import { ServicesSection } from "@/src/components/sections/ServicesSection";
import { CarBrandsSection } from "@/src/components/sections/CarBrandsSection";
import { WhyChooseUsSection } from "@/src/components/sections/WhyChooseUsSection";
import { ProcessSection } from "@/src/components/sections/ProcessSection";
import { InsurancePartnersSection } from "@/src/components/sections/InsurancePartnersSection";
import { TestimonialsSection } from "@/src/components/sections/TestimonialsSection";
import { CTASection } from "@/src/components/sections/CTASection";

export function Home() {
  return (
    <main>
      <Hero />
      <TrustSection />
      <TrustedBrandsSection />
      <ServicesSection />
      <CarBrandsSection />
      <WhyChooseUsSection />
      <ProcessSection />
      <InsurancePartnersSection />
      <TestimonialsSection />
      <CTASection />
    </main>
  );
}
