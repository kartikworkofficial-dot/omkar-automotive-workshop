import { ServicesSection } from "@/src/components/sections/ServicesSection";
import { CTASection } from "@/src/components/sections/CTASection";

export function ServicesPage() {
  return (
    <main className="pt-24 bg-light">
      <div className="container mx-auto px-4 md:px-6 py-12">
        <h1 className="text-4xl md:text-6xl font-display font-bold text-darker mb-6 text-center">Our Services</h1>
        <p className="text-xl text-dark text-center max-w-2xl mx-auto mb-12">
          From routine maintenance to complex engine overhauls, we offer a complete range of automotive services for all makes and models.
        </p>
      </div>
      <ServicesSection />
      <CTASection />
    </main>
  );
}
