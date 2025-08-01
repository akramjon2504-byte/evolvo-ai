import { MessageCircle, Send } from "lucide-react";
import { Button } from "@/components/ui/button";

export function FloatingContact() {
  const handleWhatsApp = () => {
    const message = encodeURIComponent("Salom! Evolvo AI xizmatlari haqida ma'lumot olishni xohlayman.");
    window.open(`https://wa.me/998901234567?text=${message}`, '_blank');
  };

  const handleTelegram = () => {
    window.open('https://t.me/evolvo_ai', '_blank');
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
      <Button
        onClick={handleTelegram}
        className="w-14 h-14 rounded-full bg-blue-500 hover:bg-blue-600 shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group"
        size="icon"
      >
        <Send className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
      </Button>
      
      <Button
        onClick={handleWhatsApp}
        className="w-14 h-14 rounded-full bg-green-500 hover:bg-green-600 shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group animate-pulse"
        size="icon"
      >
        <MessageCircle className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
      </Button>
    </div>
  );
}