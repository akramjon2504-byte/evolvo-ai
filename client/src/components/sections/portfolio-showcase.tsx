import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Github, Play, Star } from "lucide-react";
import { useLanguage } from "@/hooks/use-language";
import { FadeIn } from "@/components/ui/fade-in";

interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  technologies: string[];
  image: string;
  demoUrl?: string;
  githubUrl?: string;
  rating: number;
  completionTime: string;
  client: string;
}

export function PortfolioShowcaseSection() {
  const { t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState("all");

  const projects: Project[] = [
    {
      id: "1",
      title: "TashMedCenter CRM",
      description: "Tibbiyot markazlari uchun to'liq CRM tizimi. Bemor ma'lumotlari, navbat boshqaruvi, hisobot.",
      category: "crm",
      technologies: ["React", "Node.js", "PostgreSQL", "AI Chatbot"],
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=500&h=300&fit=crop",
      demoUrl: "https://demo.tashmedcenter.uz",
      rating: 4.9,
      completionTime: "6 hafta",
      client: "TashMedCenter"
    },
    {
      id: "2", 
      title: "UzbekTrade E-commerce",
      description: "Mahalliy ishlab chiqaruvchilar uchun onlayn savdo platformasi. To'lov tizimi, logistika.",
      category: "ecommerce",
      technologies: ["Next.js", "Stripe", "MongoDB", "AI Recommendations"],
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=500&h=300&fit=crop",
      demoUrl: "https://uzbektrade.uz",
      rating: 4.8,
      completionTime: "8 hafta",
      client: "UzbekTrade LLC"
    },
    {
      id: "3",
      title: "EduBot AI Assistant",
      description: "Ta'lim muassasalari uchun AI yordamchi. Talabalar uchun 24/7 maslahat va savol-javob.",
      category: "ai",
      technologies: ["OpenAI GPT-4", "Telegram Bot", "Python", "Vector DB"],
      image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=500&h=300&fit=crop",
      rating: 4.7,
      completionTime: "4 hafta",
      client: "TUIT"
    },
    {
      id: "4",
      title: "FoodDelivery Mobile App",
      description: "Toshkent uchun yetkazib berish ilovasi. Real-time tracking, to'lov, rating tizimi.",
      category: "mobile",
      technologies: ["React Native", "Firebase", "Google Maps", "Push Notifications"],
      image: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=500&h=300&fit=crop",
      rating: 4.6,
      completionTime: "10 hafta", 
      client: "FoodExpress"
    },
    {
      id: "5",
      title: "SmartFactory Dashboard",
      description: "Zavod uchun IoT monitoring tizimi. Sensorlar ma'lumotlari, analytics, avtomatik ogohlantirishlar.",
      category: "iot",
      technologies: ["Vue.js", "InfluxDB", "Grafana", "MQTT", "AI Analytics"],
      image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=500&h=300&fit=crop",
      rating: 4.9,
      completionTime: "12 hafta",
      client: "UzbekSteel"
    },
    {
      id: "6",
      title: "BankingSecure API",
      description: "Bank uchun xavfsiz API platformasi. Blockchain integratsiya, fraud detection.",
      category: "fintech",
      technologies: ["Node.js", "Blockchain", "AI Security", "Microservices"],
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&h=300&fit=crop",
      rating: 5.0,
      completionTime: "16 hafta",
      client: "AsiaAlliance Bank"
    }
  ];

  const categories = [
    { id: "all", name: "Barchasi", count: projects.length },
    { id: "crm", name: "CRM Tizimlar", count: projects.filter(p => p.category === "crm").length },
    { id: "ecommerce", name: "E-commerce", count: projects.filter(p => p.category === "ecommerce").length },
    { id: "ai", name: "AI Yechimlar", count: projects.filter(p => p.category === "ai").length },
    { id: "mobile", name: "Mobile Ilovalar", count: projects.filter(p => p.category === "mobile").length },
    { id: "iot", name: "IoT Dashboard", count: projects.filter(p => p.category === "iot").length },
    { id: "fintech", name: "FinTech", count: projects.filter(p => p.category === "fintech").length }
  ];

  const filteredProjects = selectedCategory === "all" 
    ? projects 
    : projects.filter(project => project.category === selectedCategory);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              🏆 Muvaffaqiyatli Loyihalar Portfeli
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              O'zbekistondagi yirik kompaniyalar uchun yaratgan zamonaviy IT yechimlarimiz. 
              Har bir loyiha mijozimizning muvaffaqiyati.
            </p>
          </div>
        </FadeIn>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              onClick={() => setSelectedCategory(category.id)}
              className="text-sm"
            >
              {category.name} ({category.count})
            </Button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <FadeIn key={project.id}>
              <Card className="group hover:shadow-xl transition-all duration-300 overflow-hidden">
                <div className="relative overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex gap-3">
                      {project.demoUrl && (
                        <Button size="sm" className="bg-white text-black hover:bg-gray-200">
                          <Play className="w-4 h-4 mr-1" />
                          Demo
                        </Button>
                      )}
                      {project.githubUrl && (
                        <Button size="sm" variant="outline" className="bg-white/90">
                          <Github className="w-4 h-4 mr-1" />
                          Code
                        </Button>
                      )}
                    </div>
                  </div>
                  <Badge className="absolute top-3 left-3 bg-evolvo-blue">
                    {project.category.toUpperCase()}
                  </Badge>
                </div>

                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xl font-bold text-gray-900">{project.title}</h3>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="text-sm font-semibold">{project.rating}</span>
                    </div>
                  </div>

                  <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech) => (
                      <Badge key={tech} variant="secondary" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <span>👤 {project.client}</span>
                    <span>⏱️ {project.completionTime}</span>
                  </div>

                  <div className="flex gap-2">
                    <Button size="sm" className="flex-1">
                      <ExternalLink className="w-4 h-4 mr-1" />
                      Batafsil
                    </Button>
                    <Button size="sm" variant="outline">
                      📞 Konsultatsiya
                    </Button>
                  </div>
                </div>
              </Card>
            </FadeIn>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-20 bg-evolvo-blue rounded-2xl p-8 text-white">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4">Bizning Muvaffaqiyat Raqamlari</h3>
            <p className="text-blue-100">Real loyihalar, real natijalar</p>
          </div>

          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">50+</div>
              <div className="text-blue-200">Muvaffaqiyatli Loyihalar</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">25+</div>
              <div className="text-blue-200">Xursand Mijozlar</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">4.8</div>
              <div className="text-blue-200">O'rtacha Reyting</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">98%</div>
              <div className="text-blue-200">Muddat Ichida Topshirish</div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Sizning loyihangiz ham bunday bo'lishini xohlaysizmi?
          </h3>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Professional jamoa, zamonaviy texnologiyalar va 5+ yillik tajriba bilan 
            sizning biznesingizni raqamlashtirish uchun tayyormiz!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="px-8">
              🚀 Loyiha Boshlash
            </Button>
            <Button size="lg" variant="outline" className="px-8">
              📁 Portfolio Ko'rish
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}