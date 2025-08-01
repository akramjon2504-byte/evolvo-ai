import { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Loader2, Send, MessageCircle, Users, TrendingUp } from "lucide-react";

export function TelegramBlogSection() {
  const { toast } = useToast();
  const [selectedPost, setSelectedPost] = useState<string>("");

  // Kanal statistikasini olish
  const { data: channelStats, refetch: refetchStats } = useQuery({
    queryKey: ['/api/admin/telegram-channel-stats'],
    queryFn: () => apiRequest('GET', '/api/admin/telegram-channel-stats')
  });

  // Blog postlarni olish
  const { data: blogPosts } = useQuery({
    queryKey: ['/api/blog'],
    queryFn: () => apiRequest('GET', '/api/blog')
  });

  // Test xabar yuborish
  const testMutation = useMutation({
    mutationFn: () => apiRequest('POST', '/api/admin/test-telegram-channel'),
    onSuccess: () => {
      toast({
        title: "Muvaffaqiyat!",
        description: "Test xabar Telegram kanalga yuborildi",
      });
      refetchStats();
    },
    onError: () => {
      toast({
        title: "Xatolik!",
        description: "Test xabar yuborishda muammo yuz berdi",
        variant: "destructive",
      });
    }
  });

  // Blog post yuborish
  const sendPostMutation = useMutation({
    mutationFn: (postId?: string) => apiRequest('POST', '/api/admin/send-blog-to-channel', { postId }),
    onSuccess: () => {
      toast({
        title: "Muvaffaqiyat!",
        description: "Blog post Telegram kanalga yuborildi",
      });
      refetchStats();
      setSelectedPost("");
    },
    onError: () => {
      toast({
        title: "Xatolik!",
        description: "Blog post yuborishda muammo yuz berdi",
        variant: "destructive",
      });
    }
  });

  const handleSendPost = () => {
    if (selectedPost) {
      sendPostMutation.mutate(selectedPost);
    } else {
      sendPostMutation.mutate();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Telegram Kanal Boshqaruvi</h2>
        <Badge variant="secondary" className="bg-blue-100 text-blue-800">
          @evolvo_ai
        </Badge>
      </div>

      {/* Kanal statistikasi */}
      <div className="grid md:grid-cols-3 gap-4">
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <MessageCircle className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <div className="text-sm text-gray-600">Kanal nomi</div>
              <div className="font-semibold">{channelStats?.data?.title || "Evolvo AI"}</div>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <Users className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <div className="text-sm text-gray-600">Obunachilar</div>
              <div className="font-semibold">{channelStats?.data?.membersCount || "0"}</div>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <div className="text-sm text-gray-600">Status</div>
              <div className="font-semibold">Faol</div>
            </div>
          </div>
        </Card>
      </div>

      {/* Blog post yuborish */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Blog Postlarni Kanalga Yuborish</h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Blog Post Tanlash</label>
            <select 
              value={selectedPost}
              onChange={(e) => setSelectedPost(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Barcha oxirgi postlar</option>
              {blogPosts?.data?.slice(0, 10).map((post: any) => (
                <option key={post.id} value={post.id}>
                  {post.title}
                </option>
              ))}
            </select>
          </div>

          <div className="flex gap-3">
            <Button 
              onClick={handleSendPost}
              disabled={sendPostMutation.isPending}
              className="flex-1"
            >
              {sendPostMutation.isPending ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <Send className="w-4 h-4 mr-2" />
              )}
              {selectedPost ? "Tanlangan Postni Yuborish" : "Oxirgi Postlarni Yuborish"}
            </Button>

            <Button 
              variant="outline" 
              onClick={() => testMutation.mutate()}
              disabled={testMutation.isPending}
            >
              {testMutation.isPending ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <MessageCircle className="w-4 h-4 mr-2" />
              )}
              Test Xabar
            </Button>
          </div>
        </div>
      </Card>

      {/* Yo'riqnoma */}
      <Card className="p-6 bg-blue-50 border-blue-200">
        <h4 className="font-semibold text-blue-900 mb-3">📱 Telegram Kanal Haqida</h4>
        <div className="text-sm text-blue-800 space-y-2">
          <p>• Kanal: <strong>@evolvo_ai</strong> - Evolvo AI rasmiy yangiliklar kanali</p>
          <p>• Blog postlar avtomatik ravishda formatlangan holda yuboriladi</p>
          <p>• Har bir post uchun hashtag va havolalar qo'shiladi</p>
          <p>• Test xabar orqali kanal ulanishini tekshirishingiz mumkin</p>
        </div>
      </Card>

      {/* So'ngi yuborilgan postlar */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">So'ngi Faol Blog Postlar</h3>
        <div className="space-y-3">
          {blogPosts?.data?.slice(0, 5).map((post: any) => (
            <div key={post.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <div className="font-medium">{post.title}</div>
                <div className="text-sm text-gray-600">
                  {new Date(post.createdAt).toLocaleDateString('uz-UZ')}
                </div>
              </div>
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => {
                  setSelectedPost(post.id);
                  sendPostMutation.mutate(post.id);
                }}
                disabled={sendPostMutation.isPending}
              >
                <Send className="w-4 h-4 mr-1" />
                Yuborish
              </Button>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}