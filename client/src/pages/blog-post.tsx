import { useQuery } from "@tanstack/react-query";
import { useRoute } from "wouter";
import { Calendar, User, Tag, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SEOHead } from "@/components/seo/head";
import type { BlogPost } from "@shared/schema";

export default function BlogPostPage() {
  const [match, params] = useRoute("/blog/:id");
  
  const { data: blogPost, isLoading } = useQuery<{ success: boolean; data: BlogPost }>({
    queryKey: [`/api/blog/${params?.id}`],
    enabled: !!params?.id,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-20">
        <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded mb-4 w-24"></div>
            <div className="h-12 bg-gray-200 rounded mb-6"></div>
            <div className="h-64 bg-gray-200 rounded mb-8"></div>
            <div className="space-y-4">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="h-4 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!blogPost?.data) {
    return (
      <div className="min-h-screen bg-gray-50 py-20">
        <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Maqola topilmadi</h1>
            <p className="text-gray-600 mb-8">Kechirasiz, siz qidirayotgan maqola mavjud emas.</p>
            <Button onClick={() => window.history.back()}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Orqaga
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const post = blogPost.data;

  return (
    <>
      <SEOHead blogPost={post} />
      <div className="min-h-screen bg-gray-50 py-20">
      <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
        <Button 
          variant="ghost" 
          onClick={() => window.history.back()}
          className="mb-8"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Orqaga
        </Button>

        <article className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {post.image && (
            <img 
              src={post.image} 
              alt={post.title}
              className="w-full h-64 md:h-96 object-cover"
            />
          )}
          
          <div className="p-8 md:p-12">
            <div className="flex flex-wrap gap-2 mb-6">
              <Badge variant="outline" className="flex items-center gap-1">
                <Tag className="w-3 h-3" />
                {post.category}
              </Badge>
              <Badge variant="secondary">
                {post.language === 'uz' ? "O'zbek" : post.language === 'ru' ? "Русский" : "English"}
              </Badge>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-6 text-gray-600 mb-8 pb-8 border-b">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span className="font-medium">{post.author}</span>
              </div>
              {post.createdAt && (
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>
                    {new Date(post.createdAt).toLocaleDateString('uz-UZ', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </span>
                </div>
              )}
            </div>

            {post.excerpt && (
              <div className="text-xl text-gray-700 mb-8 p-6 bg-gray-50 rounded-lg border-l-4 border-evolvo-blue">
                {post.excerpt}
              </div>
            )}

            <div className="prose prose-lg max-w-none">
              <div 
                className="text-gray-800 leading-relaxed"
                style={{ whiteSpace: 'pre-wrap' }}
              >
                {post.content}
              </div>
            </div>

            <div className="mt-12 pt-8 border-t">
              <div className="flex flex-wrap justify-between items-center gap-4">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <span>Maqola muallifi:</span>
                  <span className="font-semibold text-evolvo-blue">{post.author}</span>
                </div>
                
                <Button 
                  variant="outline" 
                  onClick={() => window.history.back()}
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Orqaga
                </Button>
              </div>
            </div>
          </div>
        </article>

        <div className="mt-12 text-center">
          <Button 
            onClick={() => {
              const blogSection = document.getElementById('blog');
              if (blogSection) {
                window.scrollTo({ top: blogSection.offsetTop - 100, behavior: 'smooth' });
              }
              window.history.back();
            }}
            className="bg-evolvo-blue hover:bg-evolvo-blue/90"
          >
            Boshqa maqolalarni ko'rish
          </Button>
        </div>
      </div>
    </div>
    </>
  );
}