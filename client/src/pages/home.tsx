import { HeroSection } from "@/components/sections/hero";
import { ServicesSection } from "@/components/sections/services";
import { SolutionsSection } from "@/components/sections/solutions";
import { TestimonialsSection } from "@/components/sections/testimonials";
import { AboutSection } from "@/components/sections/about";
import { BlogSection } from "@/components/sections/blog";
import { PricingSection } from "@/components/sections/pricing";
import { ContactSection } from "@/components/sections/contact";
import { FloatingContact } from "@/components/sections/floating-contact";
import { AIDemoSection } from "@/components/sections/ai-demo";
import { ProjectCalculatorSection } from "@/components/sections/calculator";
import { VoiceSearchSection } from "@/components/sections/voice-search";
import { PortfolioShowcaseSection } from "@/components/sections/portfolio-showcase";
import { ARShowcaseSection } from "@/components/sections/ar-showcase";
import { BlockchainIntegrationSection } from "@/components/sections/blockchain-integration";
import { IoTDashboardSection } from "@/components/sections/iot-dashboard";
import { Navbar } from "@/components/layout/navbar";
import { SEOHead } from "@/components/seo/head";
import { SchemaData } from "@/components/seo/schema-data";

export default function Home() {
  return (
    <>
      <SEOHead page="home" />
      <SchemaData type="organization" />
      <Navbar />
      <main>
      <HeroSection />
      <ServicesSection />
      <AIDemoSection />
      <VoiceSearchSection />
      <SolutionsSection />
      <ProjectCalculatorSection />
      <ARShowcaseSection />
      <IoTDashboardSection />
      <BlockchainIntegrationSection />
      <PortfolioShowcaseSection />
      <TestimonialsSection />
      <AboutSection />
      <BlogSection />
      <PricingSection />
      <ContactSection />
    </main>
    <FloatingContact />
    </>
  );
}
