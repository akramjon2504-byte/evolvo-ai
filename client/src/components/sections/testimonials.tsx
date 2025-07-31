import { useQuery } from "@tanstack/react-query";
import { useLanguage } from "@/hooks/use-language";
import { Testimonial } from "@shared/schema";
import { Star } from "lucide-react";

export function TestimonialsSection() {
  const { language } = useLanguage();

  const { data: testimonials, isLoading } = useQuery<{ success: boolean; data: Testimonial[] }>({
    queryKey: ['/api/testimonials', language],
  });

  if (isLoading) {
    return (
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">Mijozlar Fikri</h2>
            <p className="text-xl text-gray-600">
              Bizning AI yechimlarimiz bilan muvaffaqiyat qozongan mijozlarimiz
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 animate-pulse">
                <div className="flex items-center mb-6">
                  <div className="flex space-x-1">
                    {[...Array(5)].map((_, j) => (
                      <div key={j} className="w-4 h-4 bg-gray-200 rounded"></div>
                    ))}
                  </div>
                </div>
                <div className="h-24 bg-gray-200 rounded mb-6"></div>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gray-200 rounded-full mr-4"></div>
                  <div>
                    <div className="h-4 bg-gray-200 rounded mb-2 w-24"></div>
                    <div className="h-3 bg-gray-200 rounded w-32"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">Mijozlar Fikri</h2>
          <p className="text-xl text-gray-600">
            Bizning AI yechimlarimiz bilan muvaffaqiyat qozongan mijozlarimiz
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials?.data?.map((testimonial) => (
            <div key={testimonial.id} className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
              <div className="flex items-center mb-6">
                <div className="flex text-evolvo-warning">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
              </div>
              <p className="text-gray-600 mb-6 italic">
                "{testimonial.content}"
              </p>
              <div className="flex items-center">
                <img 
                  src={testimonial.avatar || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&face"} 
                  alt={`${testimonial.name} testimonial`} 
                  className="w-12 h-12 rounded-full mr-4 object-cover"
                />
                <div>
                  <div className="font-semibold text-gray-900">{testimonial.name}</div>
                  <div className="text-sm text-gray-600">{testimonial.position}, {testimonial.company}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
