import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Bot, Send, Mic, MicOff } from "lucide-react";
import { useLanguage } from "@/hooks/use-language";
import { FadeIn } from "@/components/ui/fade-in";

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

export function AIDemoSection() {
  const { t } = useLanguage();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Salom! Men Evolvo AI kompaniyasining demo chatbotiman. Sizga qanday yordam bera olaman?",
      isBot: true,
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState("");
  const [isListening, setIsListening] = useState(false);

  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText("");

    // Simulate AI response
    setTimeout(() => {
      const responses = [
        "Bu juda qiziq savol! Evolvo AI sifatida biz sizga CRM tizimlar, veb-sayt yaratish va AI yechimlar taklif qilamiz.",
        "Tabiiyki! Bizning xizmatlarimiz haqida ko'proq ma'lumot uchun +998974771229 raqamiga qo'ng'iroq qiling.",
        "AI chatbot yaratish bo'yicha biz professional yordim beramiz. Demo ko'rish uchun bog'laning!",
        "CRM tizimi sizning biznesingizni 60% samaraliroq qiladi. Batafsil ma'lumot olish uchun konsultatsiya oling."
      ];
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: responses[Math.floor(Math.random() * responses.length)],
        isBot: true,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
    }, 1000);
  };

  const handleVoiceInput = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert("Ovozli kiritish brauzergingizda qo'llab-quvvatlanmaydi");
      return;
    }

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    
    recognition.lang = 'uz-UZ';
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setInputText(transcript);
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

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              🤖 AI Chatbot Demo
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Bizning AI chatbot texnologiyasini bevosita sinab ko'ring. 
              Ovozli kiritish va real vaqtda javoblar.
            </p>
          </div>
        </FadeIn>

        <div className="max-w-4xl mx-auto">
          <Card className="h-96 flex flex-col">
            <div className="flex-1 p-6 overflow-y-auto bg-gray-50">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
                  >
                    <div
                      className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                        message.isBot
                          ? 'bg-white text-gray-800 border'
                          : 'bg-evolvo-blue text-white'
                      }`}
                    >
                      {message.isBot && (
                        <div className="flex items-center gap-2 mb-1">
                          <Bot className="w-4 h-4" />
                          <span className="text-xs font-semibold">Evolvo AI</span>
                        </div>
                      )}
                      <p className="text-sm">{message.text}</p>
                      <p className="text-xs opacity-70 mt-1">
                        {message.timestamp.toLocaleTimeString('uz-UZ', { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="p-4 border-t bg-white">
              <div className="flex gap-2">
                <Input
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Savolingizni yozing..."
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  className="flex-1"
                />
                <Button
                  onClick={handleVoiceInput}
                  variant="outline"
                  size="icon"
                  className={isListening ? "bg-red-500 text-white" : ""}
                >
                  {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                </Button>
                <Button onClick={handleSendMessage} size="icon">
                  <Send className="w-4 h-4" />
                </Button>
              </div>
              <p className="text-xs text-gray-500 mt-2 text-center">
                🎤 Ovozli kiritish uchun mikrofon tugmasini bosing
              </p>
            </div>
          </Card>
        </div>

        <div className="mt-12 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">
            Bunday chatbot sizning saytingizda!
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-evolvo-blue rounded-full flex items-center justify-center mx-auto mb-4">
                <Bot className="w-8 h-8 text-white" />
              </div>
              <h4 className="font-semibold mb-2">24/7 Mijoz Xizmati</h4>
              <p className="text-gray-600">Har doim mijozlaringiz bilan muloqot</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-evolvo-blue rounded-full flex items-center justify-center mx-auto mb-4">
                <Mic className="w-8 h-8 text-white" />
              </div>
              <h4 className="font-semibold mb-2">Ovozli Kiritish</h4>
              <p className="text-gray-600">Zamonaviy ovoz tanish texnologiyasi</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-evolvo-blue rounded-full flex items-center justify-center mx-auto mb-4">
                <Send className="w-8 h-8 text-white" />
              </div>
              <h4 className="font-semibold mb-2">Tez Javoblar</h4>
              <p className="text-gray-600">AI-powered avtomatik javoblar</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}