import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Calculator, Clock, Users, Zap } from 'lucide-react';
import { useLanguage } from '@/hooks/use-language';

interface ProjectType {
  id: string;
  name: string;
  basePrice: number;
  complexity: 'simple' | 'medium' | 'complex';
}

interface Feature {
  id: string;
  name: string;
  price: number;
  category: 'basic' | 'advanced' | 'premium';
}

interface TimelineOption {
  id: string;
  name: string;
  multiplier: number;
}

const PriceCalculator = () => {
  const { language, t } = useLanguage();
  const [selectedProject, setSelectedProject] = useState<string>('');
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [selectedTimeline, setSelectedTimeline] = useState<string>('standard');
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [discountedPrice, setDiscountedPrice] = useState<number>(0);

  // Loyiha turlari - 80% chegirma bilan
  const projectTypes: ProjectType[] = [
    {
      id: 'chatbot',
      name: 'AI Chatbot',
      basePrice: 600, // $3000 dan 80% chegirma
      complexity: 'medium'
    },
    {
      id: 'website',
      name: 'Korporativ Veb-sayt',
      basePrice: 400, // $2000 dan 80% chegirma
      complexity: 'simple'
    },
    {
      id: 'ecommerce',
      name: 'E-commerce Platforma',
      basePrice: 1000, // $5000 dan 80% chegirma
      complexity: 'complex'
    },
    {
      id: 'mobile_app',
      name: 'Mobil Ilova',
      basePrice: 800, // $4000 dan 80% chegirma
      complexity: 'complex'
    },
    {
      id: 'automation',
      name: 'Biznes Avtomatlashtiruvi',
      basePrice: 1200, // $6000 dan 80% chegirma
      complexity: 'complex'
    },
    {
      id: 'ai_integration',
      name: 'AI Integratsiya',
      basePrice: 1400, // $7000 dan 80% chegirma
      complexity: 'complex'
    }
  ];

  // Qo'shimcha xususiyatlar - 80% chegirma bilan
  const features: Feature[] = [
    {
      id: 'admin_panel',
      name: 'Admin Panel',
      price: 120, // $600 dan 80% chegirma
      category: 'basic'
    },
    {
      id: 'sms_integration',
      name: 'SMS Integratsiya',
      price: 80, // $400 dan 80% chegirma
      category: 'basic'
    },
    {
      id: 'mobile_responsive',
      name: 'Mobile Ilova',
      price: 160, // $800 dan 80% chegirma
      category: 'basic'
    },
    {
      id: 'api_integration',
      name: 'API Integratsiya',
      price: 170, // $850 dan 80% chegirma
      category: 'basic'
    },
    {
      id: 'analytics',
      name: 'Analytics',
      price: 160, // $800 dan 80% chegirma
      category: 'advanced'
    },
    {
      id: 'ai_features',
      name: 'AI Xususiyatlari',
      price: 320, // $1600 dan 80% chegirma
      category: 'advanced'
    },
    {
      id: 'advanced_security',
      name: 'Ko\'p Tillik',
      price: 100, // $500 dan 80% chegirma
      category: 'advanced'
    }
  ];

  // Murakkalik darajasi
  const complexityOptions: TimelineOption[] = [
    {
      id: 'simple',
      name: 'Oddiy (x1)',
      multiplier: 1
    },
    {
      id: 'standard',
      name: 'Standart (x1.5)',
      multiplier: 1.5
    },
    {
      id: 'complex',
      name: 'Murakkab (x2)',
      multiplier: 2
    }
  ];

  // Narxni hisoblash
  useEffect(() => {
    let basePrice = 0;
    const project = projectTypes.find(p => p.id === selectedProject);
    if (project) {
      basePrice = project.basePrice;
    }

    const featuresPrice = selectedFeatures.reduce((sum, featureId) => {
      const feature = features.find(f => f.id === featureId);
      return sum + (feature?.price || 0);
    }, 0);

    const timelineMultiplier = complexityOptions.find(t => t.id === selectedTimeline)?.multiplier || 1;
    
    const total = (basePrice + featuresPrice) * timelineMultiplier;
    setTotalPrice(total);
    
    // 20% qo'shimcha chegirma
    const finalDiscount = total * 0.8; // 20% chegirma qo'llash
    setDiscountedPrice(finalDiscount);
  }, [selectedProject, selectedFeatures, selectedTimeline]);

  const handleFeatureToggle = (featureId: string) => {
    setSelectedFeatures(prev => 
      prev.includes(featureId) 
        ? prev.filter(id => id !== featureId)
        : [...prev, featureId]
    );
  };

  const getTimeEstimate = () => {
    const project = projectTypes.find(p => p.id === selectedProject);
    if (!project) return '—';

    const baseWeeks = project.complexity === 'simple' ? 4 : 
                     project.complexity === 'medium' ? 6 : 8;
    const additionalWeeks = Math.floor(selectedFeatures.length / 2);
    const timelineMultiplier = complexityOptions.find(t => t.id === selectedTimeline)?.multiplier || 1;
    
    const totalWeeks = Math.ceil((baseWeeks + additionalWeeks) * timelineMultiplier);
    return `${totalWeeks-2}-${totalWeeks} hafta`;
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Loyiha Narx Kalkulatori
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Loyihangizni tanlab, narxni hisoblang
        </p>
        <Badge variant="secondary" className="mt-2 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
          🎉 Maxsus taklifimiz: 80% chegirma!
        </Badge>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Loyiha Parametrlari */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="h-5 w-5" />
                Loyiha Parametrlari
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Loyiha turi */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Loyiha turi
                </label>
                <Select value={selectedProject} onValueChange={setSelectedProject}>
                  <SelectTrigger>
                    <SelectValue placeholder="Loyiha turini tanlang" />
                  </SelectTrigger>
                  <SelectContent>
                    {projectTypes.map(project => (
                      <SelectItem key={project.id} value={project.id}>
                        {project.name} - ${project.basePrice}+
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Murakkalik darajasi */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Murakkalik darajasi
                </label>
                <Select value={selectedTimeline} onValueChange={setSelectedTimeline}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {complexityOptions.map(option => (
                      <SelectItem key={option.id} value={option.id}>
                        {option.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Qo'shimcha xususiyatlar */}
              <div>
                <label className="block text-sm font-medium mb-3">
                  Qo'shimcha xususiyatlar
                </label>
                <div className="grid md:grid-cols-2 gap-3">
                  {features.map(feature => (
                    <div key={feature.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={feature.id}
                        checked={selectedFeatures.includes(feature.id)}
                        onCheckedChange={() => handleFeatureToggle(feature.id)}
                      />
                      <label 
                        htmlFor={feature.id}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                      >
                        {feature.name} (+${feature.price})
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Hisob-Kitob Natijalari */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-600 dark:text-green-400">
                <Zap className="h-5 w-5" />
                Hisob-Kitob Natijalari
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Loyiha muddati */}
              <div className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-blue-600" />
                  <span className="text-sm text-blue-600 dark:text-blue-400">
                    Loyiha muddati
                  </span>
                </div>
                <span className="font-semibold text-blue-800 dark:text-blue-200">
                  {getTimeEstimate()}
                </span>
              </div>

              {/* Jamoa a'zolari */}
              <div className="flex items-center justify-between p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-purple-600" />
                  <span className="text-sm text-purple-600 dark:text-purple-400">
                    Jamoa a'zolari
                  </span>
                </div>
                <span className="font-semibold text-purple-800 dark:text-purple-200">
                  3-7 kishi
                </span>
              </div>

              {/* Oylik to'lov */}
              <div className="text-center py-4">
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                  Oylik to'lov-quvvatlash
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  ${Math.round(discountedPrice / 12)}/oy
                </p>
              </div>

              {/* Chegirmadan keyingi narx */}
              <div className="border-t pt-4">
                <div className="text-center">
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                    Maxsus taklifimiz: Hozir buyurtma bersangiz 20% chegirma!
                  </p>
                  <div className="space-y-1">
                    <p className="text-lg text-red-500 line-through">
                      ${Math.round(totalPrice * 5)} {/* Asl narx (80% chegirmadan oldin) */}
                    </p>
                    <p className="text-3xl font-bold text-green-600 dark:text-green-400">
                      ${Math.round(discountedPrice)}
                    </p>
                  </div>
                  <p className="text-xs text-orange-600 dark:text-orange-400 mt-2">
                    Tejovingiz: ${Math.round(totalPrice * 5 - discountedPrice)}
                  </p>
                </div>
              </div>

              {/* CTA Tugmalar */}
              <div className="space-y-2 pt-4">
                <Button 
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white" 
                  size="lg"
                  disabled={!selectedProject}
                >
                  Bepul Konsultatsiya Olish
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full" 
                  size="sm"
                  disabled={!selectedProject}
                >
                  Batafsil Taklif So'rash
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PriceCalculator;