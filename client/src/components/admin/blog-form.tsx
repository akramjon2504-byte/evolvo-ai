import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { Plus, X } from "lucide-react";
import type { InsertBlogPost } from "@shared/schema";

interface BlogFormProps {
  onClose: () => void;
}

export function BlogForm({ onClose }: BlogFormProps) {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    excerpt: "",
    image: "",
    author: "Evolvo AI Team",
    category: "",
    language: "uz",
    published: false
  });

  const createBlogMutation = useMutation({
    mutationFn: (data: InsertBlogPost) => apiRequest("/api/blog", "POST", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/blog"] });
      toast({
        title: "Maqola yaratildi",
        description: "Yangi blog maqolasi muvaffaqiyatli yaratildi"
      });
      onClose();
    },
    onError: () => {
      toast({
        title: "Xatolik",
        description: "Maqola yaratishda xatolik yuz berdi",
        variant: "destructive"
      });
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createBlogMutation.mutate(formData as InsertBlogPost);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Plus className="w-5 h-5" />
              Yangi Blog Maqolasi
            </CardTitle>
            <CardDescription>
              Yangi blog maqolasi yaratish
            </CardDescription>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="language">Til</Label>
                <Select
                  value={formData.language}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, language: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Tilni tanlang" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="uz">O'zbek</SelectItem>
                    <SelectItem value="ru">Русский</SelectItem>
                    <SelectItem value="en">English</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Kategoriya</Label>
                <Input
                  id="category"
                  value={formData.category}
                  onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                  placeholder="AI Trends, Digital Transformation..."
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="title">Sarlavha</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                placeholder="Maqola sarlavhasi"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="excerpt">Qisqacha ma'lumot</Label>
              <Textarea
                id="excerpt"
                value={formData.excerpt}
                onChange={(e) => setFormData(prev => ({ ...prev, excerpt: e.target.value }))}
                placeholder="Maqola haqida qisqacha..."
                rows={2}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="content">Maqola matni</Label>
              <Textarea
                id="content"
                value={formData.content}
                onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                placeholder="Maqolaning to'liq matni..."
                rows={8}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="image">Rasm URL</Label>
              <Input
                id="image"
                value={formData.image}
                onChange={(e) => setFormData(prev => ({ ...prev, image: e.target.value }))}
                placeholder="https://images.unsplash.com/..."
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="author">Muallif</Label>
              <Input
                id="author"
                value={formData.author}
                onChange={(e) => setFormData(prev => ({ ...prev, author: e.target.value }))}
                placeholder="Muallif nomi"
                required
              />
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="published"
                checked={formData.published}
                onCheckedChange={(checked) => setFormData(prev => ({ ...prev, published: checked }))}
              />
              <Label htmlFor="published">Darhol nashr qilish</Label>
            </div>

            <div className="flex gap-3 pt-4">
              <Button type="submit" disabled={createBlogMutation.isPending}>
                {createBlogMutation.isPending ? "Yaratilmoqda..." : "Yaratish"}
              </Button>
              <Button type="button" variant="outline" onClick={onClose}>
                Bekor qilish
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}