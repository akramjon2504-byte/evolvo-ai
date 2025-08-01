import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Mic, MicOff, Search, Volume2 } from "lucide-react";
import { useLanguage } from "@/hooks/use-language";
import { FadeIn } from "@/components/ui/fade-in";

export function VoiceSearchSection() {
  const { t } = useLanguage();
  const [isListening, setIsListening] = useState(false);
  const [searchResult, setSearchResult] = useState("");
  const [voiceQuery, setVoiceQuery] = useState("");

  const handleVoiceSearch = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert("Ovozli qidiruv brauzergingizda qo'llab-quvvatlanmaydi");
      return;
    }

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    
    recognition.lang = 'uz-UZ';
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => {
      setIsListening(true);
      setVoiceQuery("");
      setSearchResult("");
    };

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript.toLowerCase();
      setVoiceQuery(transcript);
      
      // Voice search logic
      const searchResponses: { [key: string]: string } = {
        'crm': 'CRM tizimi - mijozlar bilan munosabatlarni boshqarish uchun zamonaviy yechim. Narxi $1500 dan boshlanadi.',
        'veb sayt': 'Professional veb-sayt yaratish xizmati. Responsive dizayn, SEO optimizatsiya. Narxi $800 dan.',
        'chatbot': 'AI chatbot yaratish xizmati. 24/7 mijoz xizmati, ovozli qo\'llab-quvvatlash. Narxi $1200 dan.',
        'mobile ilova': 'iOS va Android uchun mobile ilovalar. Native va hybrid yechimlar. Narxi $2500 dan.',
        'narx': 'Bizning xizmatlar narxi: Veb-sayt $800+, CRM $1500+, Chatbot $1200+, Mobile ilova $2500+',
        'kontakt': 'Telefon: +998974771229, Manzil: Toshkent shahri, Olmazor tumani, Nurafshon 12',
        'hizmat': 'Bizning asosiy xizmatlar: Veb-sayt yaratish, CRM tizimlar, AI chatbot, Mobile ilovalar, Konsalting'
      };

      let response = "Afsuski, bu mavzu bo'yicha ma'lumot topilmadi. Batafsil ma'lumot uchun +998974771229 ga qo'ng'iroq qiling.";
      
      for (const [key, value] of Object.entries(searchResponses)) {
        if (transcript.includes(key)) {
          response = value;
          break;
        }
      }

      setSearchResult(response);
      
      // Text-to-speech response
      if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(response);
        utterance.lang = 'uz-UZ';
        utterance.rate = 0.8;
        speechSynthesis.speak(utterance);
      }
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.onerror = () => {
      setIsListening(false);
      alert("Ovoz tanishda xatolik yuz berdi");
    };

    recognition.start();
  };

  const demoQueries = [
    "CRM tizimi haqida",
    "Veb sayt narxi",
    "Chatbot yaratish",
    "Mobile ilova",
    "Kontakt ma'lumotlari"
  ];

  return (
    <section className="py-20 bg-gradient-to-r from-purple-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              🎤 Ovozli Qidiruv Texnologiyasi
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              2025-yilning eng zamonaviy texnologiyasi - ovoz bilan qidiruv va javob olish. 
              Savol bering, AI javob bersin!
            </p>
          </div>
        </FadeIn>

        <div className="max-w-4xl mx-auto">
          <Card className="p-8 text-center">
            <div className="mb-8">
              <Button
                onClick={handleVoiceSearch}
                className={`w-32 h-32 rounded-full text-2xl ${
                  isListening 
                    ? 'bg-red-500 hover:bg-red-600 animate-pulse' 
                    : 'bg-evolvo-blue hover:bg-blue-600'
                } shadow-2xl transition-all duration-300`}
                disabled={isListening}
              >
                {isListening ? (
                  <MicOff className="w-12 h-12" />
                ) : (
                  <Mic className="w-12 h-12" />
                )}
              </Button>
            </div>

            <div className="mb-6">
              <p className="text-lg font-semibold mb-2">
                {isListening ? "🎤 Tinglamoqda..." : "Mikrofon tugmasini bosib savol bering"}
              </p>
              {voiceQuery && (
                <div className="bg-blue-50 p-4 rounded-lg mb-4">
                  <p className="text-sm text-gray-600 mb-1">Sizning savolingiz:</p>
                  <p className="font-semibold text-gray-800">"{voiceQuery}"</p>
                </div>
              )}
            </div>

            {searchResult && (
              <div className="bg-green-50 border border-green-200 p-6 rounded-lg mb-6">
                <div className="flex items-start gap-3">
                  <Volume2 className="w-6 h-6 text-green-600 mt-1" />
                  <div className="text-left">
                    <p className="text-sm text-green-700 font-semibold mb-2">AI Javob:</p>
                    <p className="text-gray-800">{searchResult}</p>
                  </div>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
              <div className="text-center">
                <Search className="w-8 h-8 text-evolvo-blue mx-auto mb-2" />
                <h4 className="font-semibold mb-1">Tez Qidiruv</h4>
                <p className="text-sm text-gray-600">Ovoz bilan bir soniyada javob</p>
              </div>
              <div className="text-center">
                <Mic className="w-8 h-8 text-evolvo-blue mx-auto mb-2" />
                <h4 className="font-semibold mb-1">Ovozli Kirish</h4>
                <p className="text-sm text-gray-600">Uzbek tilida savol bering</p>
              </div>
              <div className="text-center">
                <Volume2 className="w-8 h-8 text-evolvo-blue mx-auto mb-2" />
                <h4 className="font-semibold mb-1">Ovozli Javob</h4>
                <p className="text-sm text-gray-600">AI javobni ovoz bilan aytadi</p>
              </div>
            </div>
          </Card>

          <div className="mt-12">
            <h3 className="text-xl font-bold text-center mb-6">Demo Savollar:</h3>
            <div className="flex flex-wrap justify-center gap-3">
              {demoQueries.map((query, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="text-sm"
                  onClick={() => {
                    setVoiceQuery(query);
                    // Simulate processing
                    setTimeout(() => {
                      setSearchResult("Bu demo rejim. Haqiqiy ovozli qidiruv uchun mikrofon tugmasini ishlating!");
                    }, 500);
                  }}
                >
                  "{query}"
                </Button>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-16 text-center">
          <div className="bg-white p-8 rounded-lg shadow-sm">
            <h4 className="text-2xl font-bold mb-4">Sizning saytingizda ham bunday texnologiya!</h4>
            <p className="text-gray-600 mb-6">
              Ovozli qidiruv, AI chatbot va zamonaviy texnologiyalar bilan saytingizni yangilang
            </p>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="text-left">
                <h5 className="font-semibold mb-3">✨ Zamonaviy Imkoniyatlar:</h5>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Ovozli qidiruv va javob</li>
                  <li>• AI chatbot integratsiya</li>
                  <li>• Multi-til qo'llab-quvvatlash</li>
                  <li>• Real-time ma'lumot qayta ishlash</li>
                </ul>
              </div>
              <div className="text-left">
                <h5 className="font-semibold mb-3">🎯 Biznes Foydalari:</h5>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• 70% tez mijoz xizmati</li>
                  <li>• 24/7 avtomatik qo'llab-quvvatlash</li>
                  <li>• 50% kam qo'ng'iroqlar</li>
                  <li>• Zamonaviy brend imizi</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}