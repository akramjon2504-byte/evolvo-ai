import { useQuery } from "@tanstack/react-query";
import { useLanguage } from "@/hooks/use-language";
import { BlogPost } from "@shared/schema";
import { Button } from "@/components/ui/button";

export function BlogSection() {
  const { language } = useLanguage();

  const { data: blogPosts, isLoading } = useQuery<{ success: boolean; data: BlogPost[] }>({
    queryKey: [`/api/blog?lang=${language}`],
  });

  if (isLoading) {
    return (
      <section id="blog" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">Blog va Yangiliklar</h2>
            <p className="text-xl text-gray-600">
              AI texnologiyalari va biznes raqamlashtirish bo'yicha so'nggi yangiliklar
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(3)].map((_, i) => (
              <article key={i} className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 animate-pulse">
                <div className="w-full h-48 bg-gray-200"></div>
                <div className="p-6">
                  <div className="h-4 bg-gray-200 rounded mb-2 w-24"></div>
                  <div className="h-6 bg-gray-200 rounded mb-3"></div>
                  <div className="h-20 bg-gray-200 rounded mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-32"></div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="blog" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">Blog va Yangiliklar</h2>
          <p className="text-xl text-gray-600">
            AI texnologiyalari va biznes raqamlashtirish bo'yicha so'nggi yangiliklar
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts?.data?.map((post) => (
            <article key={post.id} className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow">
              <img 
                src={post.image || "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400"} 
                alt={post.title} 
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <div className="text-sm text-evolvo-blue font-semibold mb-2">
                  {new Date(post.createdAt!).toLocaleDateString('uz-UZ', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {post.title}
                </h3>
                <p className="text-gray-600 mb-4">
                  {post.excerpt}
                </p>
                <a href="#" className="text-evolvo-blue font-semibold hover:underline">
                  O'qishda davom etish →
                </a>
              </div>
            </article>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="outline" className="border-2 border-evolvo-blue text-evolvo-blue hover:bg-evolvo-blue hover:text-white">
            Barcha maqolalarni ko'rish
          </Button>
        </div>
      </div>
    </section>
  );
}
