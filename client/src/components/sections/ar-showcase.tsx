import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Camera, Smartphone, Eye, Zap } from "lucide-react";
import { useLanguage } from "@/hooks/use-language";
import { FadeIn } from "@/components/ui/fade-in";

export function ARShowcaseSection() {
  const { t } = useLanguage();
  const [selectedDemo, setSelectedDemo] = useState("furniture");

  const arDemos = {
    furniture: {
      title: "Mebel AR Demo",
      description: "Uyingizda mebellar qanday ko'rinishini ko'ring",
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop",
      features: ["3D mebel modellar", "Real vaqtda joylashtirish", "O'lcham aniqlash"]
    },
    products: {
      title: "Mahsulot AR Ko'rish",
      description: "Mahsulotlarni AR orqali sinab ko'ring",
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop",
      features: ["360° ko'rish", "Rangli variantlar", "Interaktiv boshqaruv"]
    },
    education: {
      title: "Ta'lim AR Modullari",
      description: "3D modellar bilan o'rganish",
      image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&h=300&fit=crop",
      features: ["Interaktiv darslar", "3D animatsiyalar", "Virtual laboratoriya"]
    }
  };

  return (
    <section className="py-20 bg-gradient-to-br from-indigo-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              🥽 Augmented Reality (AR) Texnologiyasi
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Haqiqiy dunyo bilan raqamli elementlarni birlashtiring. 
              AR texnologiyasi orqali mijozlaringizga noyob tajriba bering.
            </p>
          </div>
        </FadeIn>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="space-y-4 mb-8">
              {Object.entries(arDemos).map(([key, demo]) => (
                <Button
                  key={key}
                  variant={selectedDemo === key ? "default" : "outline"}
                  onClick={() => setSelectedDemo(key)}
                  className="w-full justify-start text-left h-auto p-4"
                >
                  <div>
                    <div className="font-semibold">{demo.title}</div>
                    <div className="text-sm opacity-70">{demo.description}</div>
                  </div>
                </Button>
              ))}
            </div>

            <Card className="p-6">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Eye className="w-5 h-5 text-evolvo-blue" />
                {arDemos[selectedDemo as keyof typeof arDemos].title}
              </h3>
              <p className="text-gray-600 mb-4">
                {arDemos[selectedDemo as keyof typeof arDemos].description}
              </p>
              <ul className="space-y-2">
                {arDemos[selectedDemo as keyof typeof arDemos].features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2 text-sm">
                    <Zap className="w-4 h-4 text-green-500" />
                    {feature}
                  </li>
                ))}
              </ul>
            </Card>
          </div>

          <div className="relative">
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-600 to-blue-600 p-8">
              <img 
                src={arDemos[selectedDemo as keyof typeof arDemos].image}
                alt="AR Demo"
                className="w-full h-64 object-cover rounded-lg mb-6"
              />
              
              <div className="absolute inset-0 bg-black bg-opacity-20 rounded-2xl"></div>
              
              <div className="relative z-10 text-white">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                    <Camera className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="font-semibold">AR Demo Rejimi</div>
                    <div className="text-sm opacity-90">Telefoningizdan foydalaning</div>
                  </div>
                </div>
                
                <div className="space-y-2 mb-6">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-sm">Kamera faol</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                    <span className="text-sm">AR ob'ekt yuklandi</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                    <span className="text-sm">3D model tayyor</span>
                  </div>
                </div>

                <Button className="w-full bg-white bg-opacity-20 hover:bg-opacity-30 border border-white border-opacity-30">
                  <Smartphone className="w-4 h-4 mr-2" />
                  AR Demo Boshlash
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16">
          <h3 className="text-2xl font-bold text-center mb-12">AR Texnologiyasining Afzalliklari</h3>
          
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Eye className="w-8 h-8 text-white" />
              </div>
              <h4 className="font-semibold mb-2">Vizual Tajriba</h4>
              <p className="text-gray-600 text-sm">Mahsulotlarni real muhitda ko'rish</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h4 className="font-semibold mb-2">Tez Qaror Qabul Qilish</h4>
              <p className="text-gray-600 text-sm">Xarid qilishdan oldin sinab ko'rish</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Smartphone className="w-8 h-8 text-white" />
              </div>
              <h4 className="font-semibold mb-2">Mobil Integratsiya</h4>
              <p className="text-gray-600 text-sm">Har qanday telefonda ishlaydi</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Camera className="w-8 h-8 text-white" />
              </div>
              <h4 className="font-semibold mb-2">Real Vaqt</h4>
              <p className="text-gray-600 text-sm">Darhol natija va o'zgarishlar</p>
            </div>
          </div>
        </div>

        <div className="mt-16 bg-white p-8 rounded-2xl shadow-sm">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold mb-4">AR Yechimlar Narxlari</h3>
            <p className="text-gray-600">Professional AR ilovalar yaratish xizmatlari</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <Card className="p-6 text-center border-2 border-gray-200">
              <h4 className="text-lg font-bold mb-2">AR Asoslari</h4>
              <div className="text-3xl font-bold text-evolvo-blue mb-4">$2,500</div>
              <ul className="text-sm text-gray-600 space-y-2 mb-6">
                <li>• Oddiy 3D modellar</li>
                <li>• Asosiy AR funksiyalar</li>
                <li>• iOS/Android qo'llab-quvvatlash</li>
                <li>• 3 oylik qo'llab-quvvatlash</li>
              </ul>
              <Button className="w-full">Tanlash</Button>
            </Card>

            <Card className="p-6 text-center border-2 border-evolvo-blue bg-blue-50">
              <div className="bg-evolvo-blue text-white text-xs px-3 py-1 rounded-full inline-block mb-2">
                MASHHUR
              </div>
              <h4 className="text-lg font-bold mb-2">AR Professional</h4>
              <div className="text-3xl font-bold text-evolvo-blue mb-4">$5,000</div>
              <ul className="text-sm text-gray-600 space-y-2 mb-6">
                <li>• Murakkab 3D animatsiyalar</li>
                <li>• Interaktiv boshqaruv</li>
                <li>• Cloud integratsiya</li>
                <li>• Analytics va hisobotlar</li>
                <li>• 6 oylik qo'llab-quvvatlash</li>
              </ul>
              <Button className="w-full">Tanlash</Button>
            </Card>

            <Card className="p-6 text-center border-2 border-gray-200">
              <h4 className="text-lg font-bold mb-2">AR Enterprise</h4>
              <div className="text-3xl font-bold text-evolvo-blue mb-4">$10,000+</div>
              <ul className="text-sm text-gray-600 space-y-2 mb-6">
                <li>• To'liq moslashtirilgan yechim</li>
                <li>• AI integratsiya</li>
                <li>• Multi-platform qo'llab-quvvatlash</li>
                <li>• 24/7 texnik yordam</li>
                <li>• 1 yillik kafolat</li>
              </ul>
              <Button className="w-full">Konsultatsiya</Button>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}