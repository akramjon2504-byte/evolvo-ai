import { Button } from "@/components/ui/button";
import { useLanguage } from "@/hooks/use-language";

export function HeroSection() {
  const { t } = useLanguage();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="relative bg-gradient-to-br from-blue-50 to-white py-20 lg:py-32 mt-16">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-cyan-500/5"></div>
      <div className="container mx-auto px-4 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="max-w-2xl">
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
              {t("hero.title")} <span className="text-evolvo-blue">{t("hero.titleHighlight")}</span> {t("hero.titleEnd")}
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              {t("hero.subtitle")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                onClick={() => scrollToSection('contact')}
                className="bg-evolvo-blue text-white px-8 py-4 text-lg font-semibold hover:bg-evolvo-blue/90"
              >
                {t("hero.getConsultation")}
              </Button>
              <Button 
                variant="outline"
                onClick={() => scrollToSection('solutions')}
                className="border-2 border-evolvo-blue text-evolvo-blue px-8 py-4 text-lg font-semibold hover:bg-evolvo-blue hover:text-white"
              >
                {t("hero.viewSolutions")}
              </Button>
            </div>
            <div className="mt-12 grid grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-evolvo-blue">500+</div>
                <div className="text-sm text-gray-600">{t("hero.stats.clients")}</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-evolvo-blue">99%</div>
                <div className="text-sm text-gray-600">{t("hero.stats.satisfaction")}</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-evolvo-blue">24/7</div>
                <div className="text-sm text-gray-600">{t("hero.stats.support")}</div>
              </div>
            </div>
          </div>
          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&h=800" 
              alt="AI and digital transformation technology" 
              className="rounded-2xl shadow-2xl w-full"
            />
            <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-lg border">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-evolvo-success rounded-lg flex items-center justify-center">
                  <i className="fas fa-chart-line text-white text-lg"></i>
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Samaradorlik</div>
                  <div className="text-sm text-gray-600">+85% o'sish</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
