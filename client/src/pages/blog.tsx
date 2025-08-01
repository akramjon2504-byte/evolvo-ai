import { BlogSection } from "@/components/sections/blog";
import { Navbar } from "@/components/layout/navbar";
import { SEOHead } from "@/components/seo/head";
import { ContactSection } from "@/components/sections/contact";
import { FloatingContact } from "@/components/sections/floating-contact";

export default function BlogPage() {
  return (
    <>
      <SEOHead 
        page="blog"
        title="Evolvo AI Blog - Sun'iy Intellekt Yangiliklari va Maqolalar"
        description="Evolvo AI blogida sun'iy intellekt sohasidagi eng so'nggi yangiliklar, maslahatlar va tendentsiyalar. AI texnologiyalari, mashina o'rganish va raqamli transformatsiya haqida ekspert maqolalar."
        url="https://evolvo-ai.replit.app/blog"
      />
      <Navbar />
      <main className="pt-20">
        <div className="bg-gradient-to-br from-indigo-50 to-blue-100 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Evolvo AI Blog
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Sun'iy intellekt dunyosidagi eng so'nggi yangiliklar, ekspert maqolalar va 
              innovatsion yechimlar haqida o'qing. AI texnologiyalar va biznes transformatsiyasi bo'yicha 
              professional maslahatlar.
            </p>
          </div>
        </div>
        
        <BlogSection showAll={true} />
        <ContactSection />
      </main>
      <FloatingContact />
    </>
  );
}