import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calculator, DollarSign, Clock, Users } from "lucide-react";
import { useLanguage } from "@/hooks/use-language";
import { FadeIn } from "@/components/ui/fade-in";

interface ProjectCalculation {
  projectType: string;
  complexity: string;
  features: string[];
  timeline: string;
  totalCost: number;
  monthlyCost: number;
}

export function ProjectCalculatorSection() {
  const { t } = useLanguage();
  const [calculation, setCalculation] = useState<ProjectCalculation>({
    projectType: '',
    complexity: '',
    features: [],
    timeline: '',
    totalCost: 0,
    monthlyCost: 0
  });

  const projectTypes = {
    'crm': { name: 'CRM tizimi', basePrice: 1500 },
    'website': { name: 'Veb-sayt', basePrice: 800 },
    'ecommerce': { name: 'E-commerce', basePrice: 2000 },
    'mobile': { name: 'Mobile ilova', basePrice: 2500 },
    'ai-chatbot': { name: 'AI Chatbot', basePrice: 1200 }
  };

  const complexityMultipliers = {
    'simple': { name: 'Oddiy', multiplier: 1 },
    'medium': { name: "O'rta", multiplier: 1.5 },
    'complex': { name: 'Murakkab', multiplier: 2.2 },
    'enterprise': { name: 'Korporativ', multiplier: 3 }
  };

  const features = {
    'admin-panel': { name: 'Admin panel', price: 300 },
    'payment-system': { name: "To'lov tizimi", price: 500 },
    'sms-integration': { name: 'SMS integratsiya', price: 200 },
    'analytics': { name: 'Analytics', price: 400 },
    'mobile-app': { name: 'Mobile ilova', price: 800 },
    'ai-features': { name: 'AI xususiyatlari', price: 600 },
    'api-integration': { name: 'API integratsiya', price: 350 },
    'multilang': { name: 'Ko\'p tillilik', price: 250 }
  };

  const calculateProject = () => {
    if (!calculation.projectType || !calculation.complexity) return;

    const basePrice = projectTypes[calculation.projectType as keyof typeof projectTypes].basePrice;
    const multiplier = complexityMultipliers[calculation.complexity as keyof typeof complexityMultipliers].multiplier;
    const featuresPrice = calculation.features.reduce((sum, feature) => 
      sum + features[feature as keyof typeof features].price, 0);

    const totalCost = (basePrice * multiplier) + featuresPrice;
    const monthlyCost = totalCost * 0.15; // 15% monthly maintenance

    setCalculation(prev => ({ ...prev, totalCost, monthlyCost }));
  };

  const handleFeatureToggle = (feature: string) => {
    setCalculation(prev => ({
      ...prev,
      features: prev.features.includes(feature)
        ? prev.features.filter(f => f !== feature)
        : [...prev.features, feature]
    }));
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              💰 Loyiha Narxi Kalkulyatori
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Loyihangizning taxminiy narxini bir necha soniyada hisoblang. 
              Professional baholash va maslahat uchun bizga murojaat qiling.
            </p>
          </div>
        </FadeIn>

        <div className="grid lg:grid-cols-2 gap-12">
          <Card className="p-8">
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <Calculator className="w-6 h-6 text-evolvo-blue" />
              Loyiha Parametrlari
            </h3>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Loyiha turi
                </label>
                <Select onValueChange={(value) => setCalculation(prev => ({ ...prev, projectType: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Loyiha turini tanlang" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(projectTypes).map(([key, value]) => (
                      <SelectItem key={key} value={key}>
                        {value.name} - ${value.basePrice}+
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Murakkablik darajasi
                </label>
                <Select onValueChange={(value) => setCalculation(prev => ({ ...prev, complexity: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Murakkablik darajasini tanlang" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(complexityMultipliers).map(([key, value]) => (
                      <SelectItem key={key} value={key}>
                        {value.name} (x{value.multiplier})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Qo'shimcha xususiyatlar
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {Object.entries(features).map(([key, value]) => (
                    <label key={key} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={calculation.features.includes(key)}
                        onChange={() => handleFeatureToggle(key)}
                        className="rounded border-gray-300 text-evolvo-blue focus:ring-evolvo-blue"
                      />
                      <span className="text-sm">{value.name} (+${value.price})</span>
                    </label>
                  ))}
                </div>
              </div>

              <Button onClick={calculateProject} className="w-full" size="lg">
                Narxni Hisoblash
              </Button>
            </div>
          </Card>

          <Card className="p-8">
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <DollarSign className="w-6 h-6 text-green-600" />
              Hisob-Kitob Natijalari
            </h3>

            {calculation.totalCost > 0 ? (
              <div className="space-y-6">
                <div className="bg-gradient-to-r from-evolvo-blue to-blue-600 text-white p-6 rounded-lg">
                  <div className="text-center">
                    <p className="text-lg opacity-90">Umumiy narx</p>
                    <p className="text-4xl font-bold">${calculation.totalCost.toLocaleString()}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-green-50 p-4 rounded-lg text-center">
                    <Clock className="w-6 h-6 text-green-600 mx-auto mb-2" />
                    <p className="text-sm text-green-700">Loyiha muddati</p>
                    <p className="font-bold text-green-800">4-12 hafta</p>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg text-center">
                    <Users className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                    <p className="text-sm text-blue-700">Jamoa a'zolari</p>
                    <p className="font-bold text-blue-800">3-7 kishi</p>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <p className="text-sm text-gray-600 mb-2">Oylik qo'llab-quvvatlash</p>
                  <p className="text-2xl font-bold text-gray-800">${calculation.monthlyCost.toLocaleString()}/oy</p>
                </div>

                <div className="bg-yellow-50 p-4 rounded-lg">
                  <p className="text-sm text-yellow-800">
                    ⚡ <strong>Maxsus taklif:</strong> Hozir buyurtma bersangiz 20% chegirma!
                  </p>
                  <p className="text-lg font-bold text-yellow-900 mt-1">
                    Chegirmadan keyin: ${Math.round(calculation.totalCost * 0.8).toLocaleString()}
                  </p>
                </div>

                <div className="space-y-3">
                  <Button className="w-full" size="lg">
                    📞 Bepul Konsultatsiya Olish
                  </Button>
                  <Button variant="outline" className="w-full" size="lg">
                    📧 Batafsil Taklif So'rash
                  </Button>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <Calculator className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">
                  Loyiha parametrlarini to'ldiring va narxni hisoblang
                </p>
              </div>
            )}
          </Card>
        </div>

        <div className="mt-16 text-center">
          <div className="bg-white p-8 rounded-lg shadow-sm">
            <h4 className="text-xl font-bold mb-4">Nega Evolvo AI ni tanlash kerak?</h4>
            <div className="grid md:grid-cols-4 gap-6 text-sm">
              <div>
                <div className="text-2xl font-bold text-evolvo-blue">5+</div>
                <p>Yillik tajriba</p>
              </div>
              <div>
                <div className="text-2xl font-bold text-evolvo-blue">100+</div>
                <p>Muvaffaqiyatli loyihalar</p>
              </div>
              <div>
                <div className="text-2xl font-bold text-evolvo-blue">24/7</div>
                <p>Qo'llab-quvvatlash</p>
              </div>
              <div>
                <div className="text-2xl font-bold text-evolvo-blue">98%</div>
                <p>Mijozlar mamnunligi</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}