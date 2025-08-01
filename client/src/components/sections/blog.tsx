import { useQuery } from "@tanstack/react-query";
import { useLanguage } from "@/hooks/use-language";
import { BlogPost } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

// AI texnologiyalar uchun turli rasmlar
const aiImages = [
  "https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400", // AI brain
  "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400", // AI technology
  "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400", // Robot hand
  "https://images.unsplash.com/photo-1555255707-c07966088b7b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400", // Digital brain
  "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400", // AI neural network
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400", // Data visualization
  "https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400", // Machine learning
  "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400", // Technology network
  "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400", // Digital innovation
  "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400"  // AI circuit
];

function getRandomAIImage(postId: string): string {
  // Post ID asosida doimiy rasm tanlash (har safar bir xil bo'ladi)
  const hash = postId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const imageIndex = hash % aiImages.length;
  return aiImages[imageIndex];
}

interface BlogSectionProps {
  showAll?: boolean;
  limitPosts?: number;
}

export function BlogSection({ showAll = false, limitPosts = 3 }: BlogSectionProps) {
  const { language } = useLanguage();

  // Post ID asosida doimiy rasm tanlash
  const getRandomAIImage = (postId: string): string => {
    const hash = postId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const imageIndex = hash % aiImages.length;
    return aiImages[imageIndex];
  };

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
          {(showAll ? blogPosts?.data : blogPosts?.data?.slice(0, limitPosts))?.map((post) => (
            <article key={post.id} className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow">
              <Link href={`/blog/${post.id}`}>
                <img 
                  src={post.image || getRandomAIImage(post.id)} 
                  alt={post.title} 
                  className="w-full h-48 object-cover cursor-pointer hover:scale-105 transition-transform"
                />
              </Link>
              <div className="p-6">
                <div className="text-sm text-evolvo-blue font-semibold mb-2">
                  {new Date(post.createdAt!).toLocaleDateString('uz-UZ', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </div>
                <Link href={`/blog/${post.id}`}>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 hover:text-evolvo-blue transition-colors cursor-pointer">
                    {post.title}
                  </h3>
                </Link>
                <p className="text-gray-600 mb-4">
                  {post.excerpt}
                </p>
                <Link href={`/blog/${post.id}`} className="text-evolvo-blue font-semibold hover:underline">
                  O'qishda davom etish →
                </Link>
              </div>
            </article>
          ))}
        </div>

        {!showAll && (
          <div className="text-center mt-12">
            <Link href="/blog">
              <Button variant="outline" className="border-2 border-evolvo-blue text-evolvo-blue hover:bg-evolvo-blue hover:text-white">
                Barcha maqolalarni ko'rish
              </Button>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
