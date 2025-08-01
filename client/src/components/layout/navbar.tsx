import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Rocket } from "lucide-react";
import { useLanguage } from "@/hooks/use-language";

const navItems = [
  { name: "Bosh sahifa", href: "#hero" },
  { name: "Xizmatlar", href: "#services" },
  { name: "Yechimlar", href: "#solutions" },
  { name: "Biz haqimizda", href: "#about" },
  { name: "Blog", href: "#blog" },
  { name: "Narxlar", href: "#pricing" },
  { name: "Aloqa", href: "#contact" }
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { language, setLanguage } = useLanguage();

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setIsOpen(false);
  };

  const handleContactClick = () => {
    const message = encodeURIComponent("Salom! Evolvo AI xizmatlari haqida ma'lumot olishni xohlayman.");
    window.open(`https://wa.me/998901234567?text=${message}`, '_blank');
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <Rocket className="w-8 h-8 text-evolvo-blue" />
            <span className="text-xl font-bold text-gray-900">Evolvo AI</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                className="text-gray-700 hover:text-evolvo-blue transition-colors duration-200 font-medium"
              >
                {item.name}
              </button>
            ))}
          </div>

          {/* Language & Contact */}
          <div className="hidden lg:flex items-center gap-4">
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value as any)}
              className="text-sm border border-gray-300 rounded-md px-2 py-1 bg-white"
            >
              <option value="uz">🇺🇿 O'zbek</option>
              <option value="ru">🇷🇺 Русский</option>
              <option value="en">🇺🇸 English</option>
            </select>
            
            <Button 
              onClick={handleContactClick}
              className="bg-evolvo-blue hover:bg-evolvo-blue/90 text-white"
            >
              Bepul konsultatsiya
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden absolute top-16 left-0 right-0 bg-white border-b border-gray-100 shadow-lg">
            <div className="px-4 py-4 space-y-3">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  className="block w-full text-left text-gray-700 hover:text-evolvo-blue py-2 transition-colors"
                >
                  {item.name}
                </button>
              ))}
              
              <div className="pt-4 border-t border-gray-100 space-y-3">
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value as any)}
                  className="w-full text-sm border border-gray-300 rounded-md px-3 py-2 bg-white"
                >
                  <option value="uz">🇺🇿 O'zbek</option>
                  <option value="ru">🇷🇺 Русский</option>
                  <option value="en">🇺🇸 English</option>
                </select>
                
                <Button 
                  onClick={handleContactClick}
                  className="w-full bg-evolvo-blue hover:bg-evolvo-blue/90 text-white"
                >
                  Bepul konsultatsiya
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}