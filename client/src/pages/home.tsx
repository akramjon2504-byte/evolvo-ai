import { HeroSection } from "@/components/sections/hero";
import { ServicesSection } from "@/components/sections/services";
import { SolutionsSection } from "@/components/sections/solutions";
import { TestimonialsSection } from "@/components/sections/testimonials";
import { AboutSection } from "@/components/sections/about";
import { BlogSection } from "@/components/sections/blog";
import { ContactSection } from "@/components/sections/contact";
import { SEOHead } from "@/components/seo/head";

export default function Home() {
  return (
    <>
      <SEOHead />
      <main>
      <HeroSection />
      <ServicesSection />
      <SolutionsSection />
      <TestimonialsSection />
      <AboutSection />
      <BlogSection />
      <ContactSection />
    </main>
    </>
  );
}
