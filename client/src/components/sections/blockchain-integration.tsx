import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Shield, Link, Coins, Lock, CheckCircle } from "lucide-react";
import { useLanguage } from "@/hooks/use-language";
import { FadeIn } from "@/components/ui/fade-in";

export function BlockchainIntegrationSection() {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState("security");

  const blockchainFeatures = {
    security: {
      title: "Xavfsizlik va Shifrlash",
      icon: Shield,
      description: "Ma'lumotlaringiz blockchain texnologiyasi bilan himoyalangan",
      benefits: [
        "256-bit shifrlash",
        "Buzib bo'lmaydigan xavfsizlik",
        "Decentralizatsiya qilingan saqlash",
        "Hack qilishdan himoya"
      ],
      color: "text-green-600"
    },
    payments: {
      title: "Kripto To'lovlar",
      icon: Coins,
      description: "Bitcoin, Ethereum va boshqa kriptovalyutalar bilan to'lov qabul qiling",
      benefits: [
        "Instant to'lovlar",
        "Past komissiya",
        "Global qabul qilish",
        "Avtomatik konvertatsiya"
      ],
      color: "text-yellow-600"
    },
    contracts: {
      title: "Smart Kontraktlar",
      icon: Link,
      description: "Avtomatik bajariluvchi smart kontraktlar yaratish",
      benefits: [
        "Avtomatik to'lovlar",
        "Shartli bajarilish",
        "Vositachisiz kelishuvlar",
        "Transparent jarayonlar"
      ],
      color: "text-blue-600"
    },
    verification: {
      title: "Digital Tasdiqlash",
      icon: CheckCircle,
      description: "Hujjatlar va ma'lumotlarni blockchain da tasdiqlash",
      benefits: [
        "Soxtalashtirib bo'lmaydi",
        "Doimiy tasdiq",
        "Global tan olinish",
        "Tez tekshirish"
      ],
      color: "text-purple-600"
    }
  };

  const cryptoSupported = [
    { name: "Bitcoin", symbol: "BTC", logo: "₿" },
    { name: "Ethereum", symbol: "ETH", logo: "Ξ" },
    { name: "Tether", symbol: "USDT", logo: "₮" },
    { name: "Binance Coin", symbol: "BNB", logo: "B" }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-900 to-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">
              ⛓️ Blockchain Integratsiya
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Kelajak texnologiyasi - blockchain bilan biznesingizni himoyalang. 
              Kripto to'lovlar, smart kontraktlar va xavfsiz ma'lumot saqlash.
            </p>
          </div>
        </FadeIn>

        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          <div>
            <h3 className="text-xl font-bold mb-6">Blockchain Xususiyatlari</h3>
            <div className="space-y-3">
              {Object.entries(blockchainFeatures).map(([key, feature]) => {
                const IconComponent = feature.icon;
                return (
                  <Button
                    key={key}
                    variant={activeTab === key ? "default" : "ghost"}
                    onClick={() => setActiveTab(key)}
                    className={`w-full justify-start text-left h-auto p-4 ${
                      activeTab === key ? 'bg-white text-black' : 'text-white hover:bg-gray-800'
                    }`}
                  >
                    <IconComponent className={`w-5 h-5 mr-3 ${
                      activeTab === key ? 'text-black' : feature.color
                    }`} />
                    <div>
                      <div className="font-semibold">{feature.title}</div>
                      <div className="text-sm opacity-70">{feature.description}</div>
                    </div>
                  </Button>
                );
              })}
            </div>
          </div>

          <div className="lg:col-span-2">
            <Card className="bg-gray-800 border-gray-700 p-8">
              {(() => {
                const feature = blockchainFeatures[activeTab as keyof typeof blockchainFeatures];
                const IconComponent = feature.icon;
                return (
                  <>
                    <div className="flex items-center gap-4 mb-6">
                      <div className={`w-12 h-12 rounded-full bg-gray-700 flex items-center justify-center`}>
                        <IconComponent className={`w-6 h-6 ${feature.color}`} />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-white">{feature.title}</h3>
                        <p className="text-gray-300">{feature.description}</p>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6 mb-8">
                      {feature.benefits.map((benefit, index) => (
                        <div key={index} className="flex items-center gap-3 text-gray-200">
                          <CheckCircle className="w-5 h-5 text-green-500" />
                          <span>{benefit}</span>
                        </div>
                      ))}
                    </div>

                    <div className="bg-gray-900 rounded-lg p-6">
                      <h4 className="font-semibold text-white mb-3">Texnik Xususiyatlar:</h4>
                      <div className="grid md:grid-cols-3 gap-4 text-sm text-gray-300">
                        <div>
                          <span className="text-gray-400">Protocol:</span>
                          <div className="font-semibold">Ethereum 2.0</div>
                        </div>
                        <div>
                          <span className="text-gray-400">Tezlik:</span>
                          <div className="font-semibold">15,000 TPS</div>
                        </div>
                        <div>
                          <span className="text-gray-400">Komissiya:</span>
                          <div className="font-semibold">$0.01</div>
                        </div>
                      </div>
                    </div>
                  </>
                );
              })()}
            </Card>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-2xl font-bold mb-6">Qo'llab-quvvatlanadigan Kriptovalyutalar</h3>
            <div className="grid grid-cols-2 gap-4">
              {cryptoSupported.map((crypto) => (
                <Card key={crypto.symbol} className="bg-gray-800 border-gray-700 p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-black font-bold">
                      {crypto.logo}
                    </div>
                    <div>
                      <div className="font-semibold text-white">{crypto.name}</div>
                      <div className="text-gray-400 text-sm">{crypto.symbol}</div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
            
            <div className="mt-8 p-6 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg">
              <h4 className="font-bold text-lg mb-2">Real Vaqt Narxlar</h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-blue-200">Bitcoin:</span>
                  <div className="font-bold">$43,250 (+2.5%)</div>
                </div>
                <div>
                  <span className="text-blue-200">Ethereum:</span>
                  <div className="font-bold">$2,650 (+1.8%)</div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <Card className="bg-gradient-to-br from-purple-900 to-blue-900 border-0 p-8">
              <div className="text-center mb-6">
                <Lock className="w-16 h-16 text-purple-300 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-white mb-2">Blockchain Wallet</h3>
                <p className="text-purple-200">Xavfsiz va tez kripto to'lovlar</p>
              </div>

              <div className="space-y-4 mb-6">
                <div className="bg-black bg-opacity-30 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-purple-200 text-sm">Balans</span>
                    <span className="text-green-400 text-sm">+5.2%</span>
                  </div>
                  <div className="text-2xl font-bold text-white">1.2456 BTC</div>
                  <div className="text-purple-200 text-sm">≈ $53,891.50</div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <Button className="bg-green-600 hover:bg-green-700">
                    Yuborish
                  </Button>
                  <Button variant="outline" className="border-purple-400 text-purple-300 hover:bg-purple-800">
                    Qabul Qilish
                  </Button>
                </div>
              </div>

              <div className="bg-black bg-opacity-20 rounded-lg p-4">
                <h4 className="font-semibold text-white mb-3">So'ngi Tranzaksiyalar</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between text-purple-200">
                    <span>Qabul qilindi</span>
                    <span className="text-green-400">+0.05 BTC</span>
                  </div>
                  <div className="flex justify-between text-purple-200">
                    <span>Yuborildi</span>
                    <span className="text-red-400">-0.02 BTC</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>

        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold mb-8">Blockchain Xizmatlar Narxlari</h3>
          
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="bg-gray-800 border-gray-700 p-6">
              <h4 className="text-lg font-bold text-white mb-2">Kripto To'lovlar</h4>
              <div className="text-3xl font-bold text-yellow-500 mb-4">$1,200</div>
              <ul className="text-sm text-gray-300 space-y-2 mb-6 text-left">
                <li>• Bitcoin, Ethereum integratsiya</li>
                <li>• To'lov gateway</li>
                <li>• Avtomatik konvertatsiya</li>
                <li>• 3 oylik qo'llab-quvvatlash</li>
              </ul>
              <Button className="w-full">Buyurtma</Button>
            </Card>

            <Card className="bg-gradient-to-br from-blue-900 to-purple-900 border-0 p-6">
              <div className="bg-yellow-500 text-black text-xs px-3 py-1 rounded-full inline-block mb-2">
                ENG MASHHUR
              </div>
              <h4 className="text-lg font-bold text-white mb-2">Smart Kontraktlar</h4>
              <div className="text-3xl font-bold text-white mb-4">$3,500</div>
              <ul className="text-sm text-gray-200 space-y-2 mb-6 text-left">
                <li>• Custom smart kontraktlar</li>
                <li>• Avtomatik to'lovlar</li>
                <li>• Audit va xavfsizlik</li>
                <li>• 6 oylik qo'llab-quvvatlash</li>
              </ul>
              <Button className="w-full bg-white text-black hover:bg-gray-200">Buyurtma</Button>
            </Card>

            <Card className="bg-gray-800 border-gray-700 p-6">
              <h4 className="text-lg font-bold text-white mb-2">DeFi Platform</h4>
              <div className="text-3xl font-bold text-purple-500 mb-4">$8,000+</div>
              <ul className="text-sm text-gray-300 space-y-2 mb-6 text-left">
                <li>• To'liq DeFi yechim</li>
                <li>• Liquidity pools</li>
                <li>• Governance token</li>
                <li>• 1 yillik qo'llab-quvvatlash</li>
              </ul>
              <Button className="w-full">Konsultatsiya</Button>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}