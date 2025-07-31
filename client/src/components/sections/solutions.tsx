import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

export function SolutionsSection() {
  return (
    <section id="solutions" className="py-20 bg-white">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">AI Yechimlarimiz</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Turli sohalarda muvaffaqiyatli amalga oshirilgan loyihalar va yechimlari
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          <div>
            <img 
              src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&h=800" 
              alt="Retail business automation with AI technology" 
              className="rounded-2xl shadow-lg w-full"
            />
          </div>
          <div>
            <div className="bg-evolvo-blue text-white px-4 py-2 rounded-full text-sm font-semibold inline-block mb-4">
              Savdo sohasi
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-6">Savdo Markazlari uchun AI Yechimi</h3>
            <p className="text-gray-600 mb-6">
              Yirik savdo markazida mijozlar oqimini tahlil qilish, inventar boshqaruvi va shaxsiylashtirilgan tavsiyalar berish tizimini joriy etdik.
            </p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-evolvo-success" />
                <span>45% savdo hajmi oshishi</span>
              </li>
              <li className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-evolvo-success" />
                <span>30% operatsion xarajatlar kamayishi</span>
              </li>
              <li className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-evolvo-success" />
                <span>Real-time analytics va hisobotlar</span>
              </li>
            </ul>
            <Button className="bg-evolvo-blue text-white hover:bg-evolvo-blue/90">
              Case Study ko'rish
            </Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1">
            <div className="bg-evolvo-success text-white px-4 py-2 rounded-full text-sm font-semibold inline-block mb-4">
              Logistika
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-6">Logistika Optimizatsiyasi</h3>
            <p className="text-gray-600 mb-6">
              Transport kompaniyasi uchun AI yordamida marshrutni optimallashtirish va yoqilg'i sarfini kamaytirish tizimi.
            </p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-evolvo-success" />
                <span>25% yoqilg'i tejamkorlik</span>
              </li>
              <li className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-evolvo-success" />
                <span>40% yetkazib berish vaqti qisqarishi</span>
              </li>
              <li className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-evolvo-success" />
                <span>Real-time tracking va monitoring</span>
              </li>
            </ul>
            <Button className="bg-evolvo-blue text-white hover:bg-evolvo-blue/90">
              Batafsil ma'lumot
            </Button>
          </div>
          <div className="order-1 lg:order-2">
            <img 
              src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&h=800" 
              alt="Logistics warehouse with modern automation technology" 
              className="rounded-2xl shadow-lg w-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
