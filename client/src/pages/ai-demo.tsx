import { AIDemoSection } from "@/components/sections/ai-demo";
import { VoiceSearchSection } from "@/components/sections/voice-search";
import { PricingSection } from "@/components/sections/pricing";
import { Navbar } from "@/components/layout/navbar";
import { SEOHead } from "@/components/seo/head";
import { ContactSection } from "@/components/sections/contact";
import { FloatingContact } from "@/components/sections/floating-contact";

export default function AIDemoPage() {
  return (
    <>
      <SEOHead 
        page="ai-demo"
        title="Evolvo AI - AI Demo | Sun'iy Intellekt Namoyishlari va Ovozli Qidiruv"
        description="Evolvo AI'ning interaktiv AI demo va ovozli qidiruv texnologiyalarini sinab ko'ring. O'zbek tilida AI chatbot va zamonaviy ovozli interfeys imkoniyatlari."
        url="https://evolvo-ai.replit.app/ai-demo"
      />
      <Navbar />
      <main className="pt-20">
        <div className="bg-gradient-to-br from-green-50 to-teal-100 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              AI Texnologiyalar Demo
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Evolvo AI'ning eng zamonaviy sun'iy intellekt texnologiyalarini o'zingiz sinab ko'ring. 
              Interaktiv chatbot, ovozli qidiruv va boshqa innovatsion yechimlar.
            </p>
          </div>
        </div>
        
        <AIDemoSection />
        <VoiceSearchSection />
        <PricingSection />
        <ContactSection />
      </main>
      <FloatingContact />
    </>
  );
}