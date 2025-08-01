import { PortfolioShowcaseSection } from "@/components/sections/portfolio-showcase";
import { TestimonialsSection } from "@/components/sections/testimonials";
import { AboutSection } from "@/components/sections/about";
import { Navbar } from "@/components/layout/navbar";
import { SEOHead } from "@/components/seo/head";
import { ContactSection } from "@/components/sections/contact";
import { FloatingContact } from "@/components/sections/floating-contact";

export default function PortfolioPage() {
  return (
    <>
      <SEOHead 
        page="portfolio"
        title="Evolvo AI - Portfolio | Bizning Loyihalarimiz va Muvaffaqiyatlar"
        description="Evolvo AI tomonidan amalga oshirilgan loyihalar portfoliosi. Mijozlar fikrlari, kompaniya haqida ma'lumotlar va muvaffaqiyatli yechimlar."
        url="https://evolvo-ai.replit.app/portfolio"
      />
      <Navbar />
      <main className="pt-20">
        <div className="bg-gradient-to-br from-purple-50 to-pink-100 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Bizning Portfolio
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Evolvo AI bilan muvaffaqiyatli amalga oshirilgan loyihalar, mijozlar fikrlari 
              va kompaniyamizning professional faoliyati haqida batafsil ma'lumot.
            </p>
          </div>
        </div>
        
        <PortfolioShowcaseSection />
        <TestimonialsSection />
        <AboutSection />
        <ContactSection />
      </main>
      <FloatingContact />
    </>
  );
}