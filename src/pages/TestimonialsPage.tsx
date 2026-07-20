import { TestimonialsSection } from "@/src/components/sections/TestimonialsSection";
import { CTASection } from "@/src/components/sections/CTASection";

export function TestimonialsPage() {
  return (
    <main className="pt-24 bg-light">
      <div className="container mx-auto px-4 md:px-6 py-12 text-center">
        <h1 className="text-4xl md:text-6xl font-display font-bold text-darker mb-6">Customer Reviews</h1>
        <p className="text-xl text-dark max-w-2xl mx-auto mb-12">
          Read what over 1 Lakh+ satisfied customers have to say about our services.
        </p>
      </div>
      <TestimonialsSection />
      <CTASection />
    </main>
  );
}
