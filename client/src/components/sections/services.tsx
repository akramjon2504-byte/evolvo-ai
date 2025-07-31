import { useQuery } from "@tanstack/react-query";
import { useLanguage } from "@/hooks/use-language";
import { Service } from "@shared/schema";

export function ServicesSection() {
  const { t, language } = useLanguage();

  const { data: services, isLoading } = useQuery<{ success: boolean; data: Service[] }>({
    queryKey: ['/api/services', language],
  });

  if (isLoading) {
    return (
      <section id="services" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">{t("services.title")}</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t("services.subtitle")}
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 animate-pulse">
                <div className="w-16 h-16 bg-gray-200 rounded-xl mb-6"></div>
                <div className="h-6 bg-gray-200 rounded mb-4"></div>
                <div className="h-20 bg-gray-200 rounded mb-6"></div>
                <div className="h-4 bg-gray-200 rounded w-24"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  const getColorClass = (color: string) => {
    switch (color) {
      case 'evolvo-blue': return 'bg-evolvo-blue';
      case 'evolvo-light-blue': return 'bg-evolvo-light-blue';
      case 'evolvo-success': return 'bg-evolvo-success';
      case 'evolvo-warning': return 'bg-evolvo-warning';
      case 'purple-600': return 'bg-purple-600';
      case 'red-600': return 'bg-red-600';
      default: return 'bg-evolvo-blue';
    }
  };

  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">{t("services.title")}</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t("services.subtitle")}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services?.data?.map((service) => (
            <div key={service.id} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
              <div className={`w-16 h-16 ${getColorClass(service.color || 'evolvo-blue')} rounded-xl flex items-center justify-center mb-6`}>
                <i className={`${service.icon} text-white text-2xl`}></i>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">{service.title}</h3>
              <p className="text-gray-600 mb-6">
                {service.description}
              </p>
              <a href="#" className="text-evolvo-blue font-semibold hover:underline">
                {t("services.readMore")} →
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
