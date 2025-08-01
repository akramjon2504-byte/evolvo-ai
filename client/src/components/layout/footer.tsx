import { useLanguage } from "@/hooks/use-language";

export function Footer() {
  const { t } = useLanguage();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-evolvo-blue rounded-lg flex items-center justify-center">
                <i className="fas fa-brain text-white text-lg"></i>
              </div>
              <span className="text-2xl font-bold">Evolvo AI</span>
            </div>
            <p className="text-gray-400 mb-6">
              O'zbekistonda biznes raqamlashtirish va AI yechimlarida yetakchi kompaniya.
            </p>
            <div className="flex space-x-4">
              <a href="https://t.me/vertextestai_bot" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <i className="fab fa-telegram text-xl"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <i className="fab fa-linkedin text-xl"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <i className="fab fa-facebook text-xl"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <i className="fab fa-instagram text-xl"></i>
              </a>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-6">{t("nav.services")}</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">AI Avtomatlashtiruv</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Raqamli Transformatsiya</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Machine Learning</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">AI Chatbot</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Business Analytics</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-6">Kompaniya</h3>
            <ul className="space-y-3">
              <li>
                <button 
                  onClick={() => scrollToSection('about')}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  {t("nav.about")}
                </button>
              </li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Jamoa</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Karyera</a></li>
              <li>
                <button 
                  onClick={() => scrollToSection('blog')}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  {t("nav.blog")}
                </button>
              </li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Yangiliklar</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-6">{t("contact.info")}</h3>
            <ul className="space-y-3">
              <li className="text-gray-400">+998 97 477 12 29</li>
              <li className="text-gray-400">info@evolvo-ai.uz</li>
              <li className="text-gray-400">Toshkent shahri, Olmazor tumani<br/>Nurafshon 12</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400">© 2024 Evolvo AI. Barcha huquqlar himoyalangan.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-white transition-colors">Maxfiylik siyosati</a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">Foydalanish shartlari</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
