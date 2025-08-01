import { CheckCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  message?: string;
}

export function SuccessModal({ 
  isOpen, 
  onClose, 
  title = "Muvaffaqiyatli!",
  message = "Sizning so'rovingiz muvaffaqiyatli yuborildi. Tez orada siz bilan bog'lanamiz."
}: SuccessModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md">
        <CardContent className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-8 h-8 text-green-500" />
              <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>
          
          <p className="text-gray-600 mb-6">{message}</p>
          
          <div className="flex gap-3">
            <Button onClick={onClose} className="flex-1 bg-evolvo-blue hover:bg-evolvo-blue/90">
              Yaxshi
            </Button>
            <Button 
              variant="outline" 
              onClick={() => {
                const message = encodeURIComponent("Salom! Evolvo AI xizmatlari haqida ma'lumot olishni xohlayman.");
                window.open(`https://wa.me/998901234567?text=${message}`, '_blank');
                onClose();
              }}
              className="flex-1"
            >
              WhatsApp orqali aloqa
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}