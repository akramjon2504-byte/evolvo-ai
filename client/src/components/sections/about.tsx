import { Lightbulb, Users, Handshake } from "lucide-react";

export function AboutSection() {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">Evolvo AI Haqida</h2>
            <p className="text-xl text-gray-600 mb-8">
              Biz O'zbekiston bozorida bizneslarni raqamlashtirish va sun'iy intellekt yechimlarini joriy etishda etakchi kompaniyamiz.
            </p>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-evolvo-blue rounded-lg flex items-center justify-center flex-shrink-0">
                  <Lightbulb className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Innovatsion Yondashuv</h3>
                  <p className="text-gray-600">Eng so'nggi AI texnologiyalari va zamonaviy yechimlardan foydalanamiz.</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-evolvo-success rounded-lg flex items-center justify-center flex-shrink-0">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Tajribali Jamoa</h3>
                  <p className="text-gray-600">AI va raqamli transformatsiya bo'yicha 5+ yillik tajribaga ega mutaxassislar.</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-evolvo-warning rounded-lg flex items-center justify-center flex-shrink-0">
                  <Handshake className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Mijoz Markazlashgan</h3>
                  <p className="text-gray-600">Har bir mijozning ehtiyojiga moslashtirilgan individual yechimlar.</p>
                </div>
              </div>
            </div>
          </div>
          <div>
            <img 
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&h=800" 
              alt="Professional team working on AI technology solutions" 
              className="rounded-2xl shadow-lg w-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
