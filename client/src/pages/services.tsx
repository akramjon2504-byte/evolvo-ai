import { ServicesSection } from "@/components/sections/services";
import { SolutionsSection } from "@/components/sections/solutions";
import { ProjectCalculatorSection } from "@/components/sections/calculator";
import { ARShowcaseSection } from "@/components/sections/ar-showcase";
import { IoTDashboardSection } from "@/components/sections/iot-dashboard";
import { BlockchainIntegrationSection } from "@/components/sections/blockchain-integration";
import { Navbar } from "@/components/layout/navbar";
import { SEOHead } from "@/components/seo/head";
import { ContactSection } from "@/components/sections/contact";
import { FloatingContact } from "@/components/sections/floating-contact";

export default function ServicesPage() {
  return (
    <>
      <SEOHead 
        page="services"
        title="Evolvo AI - Xizmatlarimiz | AI Yechimlari va Raqamlashtirish"
        description="Evolvo AI kompaniyasining to'liq xizmatlar ro'yxati: AI yechimlari, raqamlashtirish, IoT, blockchain va AR/VR texnologiyalari. Professional konsalting va dasturlash xizmatlari."
        url="https://evolvo-ai.replit.app/services"
      />
      <Navbar />
      <main className="pt-20">
        <div className="bg-gradient-to-br from-blue-50 to-indigo-100 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Bizning Xizmatlarimiz
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Evolvo AI bilan biznesingizni raqamlashtiring. Professional AI yechimlari, 
              zamonaviy texnologiyalar va innovatsion yondashuvlar bilan muvaffaqiyatga erishing.
            </p>
          </div>
        </div>
        
        <ServicesSection />
        <SolutionsSection />
        <ProjectCalculatorSection />
        <ARShowcaseSection />
        <IoTDashboardSection />
        <BlockchainIntegrationSection />
        <ContactSection />
      </main>
      <FloatingContact />
    </>
  );
}