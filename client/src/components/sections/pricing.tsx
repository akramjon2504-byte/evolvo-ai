import { Check, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FadeIn } from "@/components/ui/fade-in";

const pricingPlans = [
  {
    name: "Boshlang'ich",
    price: "2,000,000",
    period: "oyiga",
    description: "Kichik bizneslar uchun asosiy AI yechimlar",
    features: [
      "Oddiy chatbot integratsiyasi",
      "Asosiy ma'lumotlar tahlili", 
      "Email orqali qo'llab-quvvatlash",
      "Oylik hisobot",
      "1 ta loyiha"
    ],
    popular: false,
    buttonText: "Boshlash",
    color: "border-gray-200"
  },
  {
    name: "Professional",
    price: "5,000,000", 
    period: "oyiga",
    description: "O'rta bizneslar uchun kengaytirilgan xususiyatlar",
    features: [
      "Murakkab AI chatbot",
      "Kengaytirilgan analytics",
      "API integratsiyasi", 
      "24/7 telefon qo'llab-quvvatlash",
      "5 ta loyiha",
      "Shaxsiy konsultant",
      "Haftalik hisobotlar"
    ],
    popular: true,
    buttonText: "Mashhur tanlov",
    color: "border-evolvo-blue ring-2 ring-evolvo-blue"
  },
  {
    name: "Korporativ",
    price: "Kelishilgan",
    period: "narx",
    description: "Yirik korxonalar uchun to'liq yechimlar",
    features: [
      "Maxsus AI modellar",
      "To'liq avtomatlashtirish",
      "Dedikatsiya qilingan server",
      "24/7 texnik yordam",
      "Cheksiz loyihalar",
      "On-site o'qitish",
      "Kundalik monitoring",
      "SLA kafolati"
    ],
    popular: false,
    buttonText: "Aloqaga chiqish",
    color: "border-gray-200"
  }
];

export function PricingSection() {
  const handleContactClick = (planName: string) => {
    const message = encodeURIComponent(`Salom! ${planName} rejasi haqida batafsil ma'lumot olishni xohlayman.`);
    window.open(`https://wa.me/998901234567?text=${message}`, '_blank');
  };

  return (
    <section id="pricing" className="py-20 bg-white">
      <div className="container mx-auto px-4 lg:px-8">
        <FadeIn className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Narxlar va Tariflar
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Har qanday biznes hajmi uchun mos yechimlar. Professional AI xizmatlari bilan o'z kompaniyangizni rivojlantiring.
          </p>
        </FadeIn>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {pricingPlans.map((plan, index) => (
            <FadeIn 
              key={plan.name}
              delay={index * 100}
              direction="up"
            >
              <Card 
                className={`relative transition-all duration-300 hover:shadow-xl ${plan.color} ${plan.popular ? 'scale-105' : 'hover:scale-105'}`}
              >
              {plan.popular && (
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-evolvo-blue text-white px-4 py-1">
                  <Star className="w-3 h-3 mr-1" />
                  Mashhur
                </Badge>
              )}
              
              <CardHeader className="text-center pb-6">
                <CardTitle className="text-2xl font-bold text-gray-900 mb-2">
                  {plan.name}
                </CardTitle>
                <CardDescription className="text-gray-600 mb-4">
                  {plan.description}
                </CardDescription>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-4xl font-bold text-gray-900">
                    {plan.price}
                  </span>
                  {plan.price !== "Kelishilgan" && (
                    <span className="text-sm text-gray-500 ml-1">so'm</span>
                  )}
                  <span className="text-sm text-gray-500">/{plan.period}</span>
                </div>
              </CardHeader>

              <CardContent>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  onClick={() => handleContactClick(plan.name)}
                  className={`w-full py-3 ${
                    plan.popular 
                      ? 'bg-evolvo-blue hover:bg-evolvo-blue/90 text-white' 
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
                  }`}
                >
                  {plan.buttonText}
                </Button>
              </CardContent>
              </Card>
            </FadeIn>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">
            Barcha tariflar 14 kunlik bepul sinov muddati bilan keladi
          </p>
          <p className="text-sm text-gray-500">
            Narxlar O'zbekiston so'mida ko'rsatilgan. VAT qo'shilmagan.
          </p>
        </div>
      </div>
    </section>
  );
}