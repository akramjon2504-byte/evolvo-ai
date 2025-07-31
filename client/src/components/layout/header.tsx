import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { LanguageSelector } from "@/components/ui/language-selector";
import { useLanguage } from "@/hooks/use-language";
import { Menu, X } from "lucide-react";

export function Header() {
  const { t } = useLanguage();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <nav className="container mx-auto px-4 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-evolvo-blue rounded-lg flex items-center justify-center">
              <i className="fas fa-brain text-white text-lg"></i>
            </div>
            <span className="text-2xl font-bold text-evolvo-blue">Evolvo AI</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            <button 
              onClick={() => scrollToSection('home')}
              className="text-gray-700 hover:text-evolvo-blue transition-colors"
            >
              {t("nav.home")}
            </button>
            <button 
              onClick={() => scrollToSection('services')}
              className="text-gray-700 hover:text-evolvo-blue transition-colors"
            >
              {t("nav.services")}
            </button>
            <button 
              onClick={() => scrollToSection('solutions')}
              className="text-gray-700 hover:text-evolvo-blue transition-colors"
            >
              {t("nav.solutions")}
            </button>
            <button 
              onClick={() => scrollToSection('about')}
              className="text-gray-700 hover:text-evolvo-blue transition-colors"
            >
              {t("nav.about")}
            </button>
            <button 
              onClick={() => scrollToSection('blog')}
              className="text-gray-700 hover:text-evolvo-blue transition-colors"
            >
              {t("nav.blog")}
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className="text-gray-700 hover:text-evolvo-blue transition-colors"
            >
              {t("nav.contact")}
            </button>
          </div>

          {/* Language Selector & CTA */}
          <div className="hidden lg:flex items-center space-x-4">
            <LanguageSelector />
            <Button 
              onClick={() => scrollToSection('contact')}
              className="bg-evolvo-blue text-white hover:bg-evolvo-blue/90"
            >
              {t("nav.consultation")}
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="lg:hidden text-gray-700"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 border-t border-gray-100">
            <div className="flex flex-col space-y-4 pt-4">
              <button 
                onClick={() => scrollToSection('home')}
                className="text-gray-700 hover:text-evolvo-blue transition-colors text-left"
              >
                {t("nav.home")}
              </button>
              <button 
                onClick={() => scrollToSection('services')}
                className="text-gray-700 hover:text-evolvo-blue transition-colors text-left"
              >
                {t("nav.services")}
              </button>
              <button 
                onClick={() => scrollToSection('solutions')}
                className="text-gray-700 hover:text-evolvo-blue transition-colors text-left"
              >
                {t("nav.solutions")}
              </button>
              <button 
                onClick={() => scrollToSection('about')}
                className="text-gray-700 hover:text-evolvo-blue transition-colors text-left"
              >
                {t("nav.about")}
              </button>
              <button 
                onClick={() => scrollToSection('blog')}
                className="text-gray-700 hover:text-evolvo-blue transition-colors text-left"
              >
                {t("nav.blog")}
              </button>
              <button 
                onClick={() => scrollToSection('contact')}
                className="text-gray-700 hover:text-evolvo-blue transition-colors text-left"
              >
                {t("nav.contact")}
              </button>
              <div className="flex items-center space-x-4 pt-2">
                <LanguageSelector />
                <Button 
                  onClick={() => scrollToSection('contact')}
                  className="bg-evolvo-blue text-white hover:bg-evolvo-blue/90"
                >
                  {t("nav.consultation")}
                </Button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
