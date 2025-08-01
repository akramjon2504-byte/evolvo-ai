import { HeroSection } from "@/components/sections/hero";
import { ServicesSection } from "@/components/sections/services";
import { TestimonialsSection } from "@/components/sections/testimonials";
import { BlogSection } from "@/components/sections/blog";
import { ContactSection } from "@/components/sections/contact";
import { FloatingContact } from "@/components/sections/floating-contact";
import { AIDemoSection } from "@/components/sections/ai-demo";
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
      <TestimonialsSection />
      <BlogSection />
      <ContactSection />
    </main>
    <FloatingContact />
    </>
  );
}
