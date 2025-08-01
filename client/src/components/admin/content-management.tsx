import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { Plus, Edit, Trash2, Eye, EyeOff, Calendar, FileText, Image, Video, Download, Upload } from "lucide-react";

interface ContentItem {
  id: string;
  title: string;
  type: "page" | "post" | "media" | "template";
  status: "published" | "draft" | "scheduled";
  author: string;
  lastModified: string;
  views: number;
  featured: boolean;
  seoScore: number;
}

export function ContentManagement() {
  const { toast } = useToast();
  const [selectedContent, setSelectedContent] = useState<ContentItem | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [contentType, setContentType] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const { data: content, isLoading } = useQuery({
    queryKey: ['/api/admin/content', contentType, statusFilter],
  });

  const bulkActionMutation = useMutation({
    mutationFn: ({ action, ids }: { action: string; ids: string[] }) => 
      apiRequest("/api/admin/content/bulk", "POST", { action, ids }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/content"] });
      toast({
        title: "Muvaffaqiyat",
        description: "Ommaviy harakat bajarildi"
      });
    }
  });

  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const handleBulkAction = (action: string) => {
    if (selectedItems.length === 0) {
      toast({
        title: "Xatolik",
        description: "Kamida bitta element tanlang",
        variant: "destructive"
      });
      return;
    }
    bulkActionMutation.mutate({ action, ids: selectedItems });
  };

  const toggleSelection = (id: string) => {
    setSelectedItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const selectAll = () => {
    if (selectedItems.length === (content?.data || []).length) {
      setSelectedItems([]);
    } else {
      setSelectedItems((content?.data || []).map((item: ContentItem) => item.id));
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'bg-green-100 text-green-800';
      case 'draft': return 'bg-yellow-100 text-yellow-800';
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'post': return <FileText className="h-4 w-4" />;
      case 'media': return <Image className="h-4 w-4" />;
      case 'template': return <Video className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <div className="h-6 bg-gray-200 rounded w-48 animate-pulse"></div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-12 bg-gray-200 rounded animate-pulse"></div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Boshqaruv paneli */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Kontent boshqaruvi</span>
            <div className="flex gap-2">
              <Button size="sm" variant="outline">
                <Upload className="h-4 w-4 mr-2" />
                Import
              </Button>
              <Button size="sm" variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Yangi kontent
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Yangi kontent yaratish</DialogTitle>
                  </DialogHeader>
                  <ContentForm onClose={() => setIsDialogOpen(false)} />
                </DialogContent>
              </Dialog>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Filtrlar */}
          <div className="flex gap-4 mb-6">
            <Select value={contentType} onValueChange={setContentType}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Kontent turi" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Barcha turlar</SelectItem>
                <SelectItem value="page">Sahifalar</SelectItem>
                <SelectItem value="post">Maqolalar</SelectItem>
                <SelectItem value="media">Media</SelectItem>
                <SelectItem value="template">Shablonlar</SelectItem>
              </SelectContent>
            </Select>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Holat" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Barcha holatlar</SelectItem>
                <SelectItem value="published">Nashr etilgan</SelectItem>
                <SelectItem value="draft">Qoralama</SelectItem>
                <SelectItem value="scheduled">Rejalashtirilgan</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Ommaviy harakatlar */}
          {selectedItems.length > 0 && (
            <div className="flex gap-2 mb-4 p-3 bg-blue-50 rounded-lg">
              <span className="text-sm text-blue-800">
                {selectedItems.length} ta element tanlandi
              </span>
              <div className="flex gap-2 ml-auto">
                <Button size="sm" variant="outline" onClick={() => handleBulkAction('publish')}>
                  Nashr etish
                </Button>
                <Button size="sm" variant="outline" onClick={() => handleBulkAction('draft')}>
                  Qoralama
                </Button>
                <Button size="sm" variant="outline" onClick={() => handleBulkAction('delete')}>
                  O'chirish
                </Button>
              </div>
            </div>
          )}

          {/* Kontent jadvali */}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">
                  <input
                    type="checkbox"
                    checked={selectedItems.length === content?.data?.length}
                    onChange={selectAll}
                    className="rounded"
                  />
                </TableHead>
                <TableHead>Sarlavha</TableHead>
                <TableHead>Turi</TableHead>
                <TableHead>Holat</TableHead>
                <TableHead>Muallif</TableHead>
                <TableHead>Ko'rishlar</TableHead>
                <TableHead>SEO</TableHead>
                <TableHead>Oxirgi o'zgarish</TableHead>
                <TableHead>Amallar</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {(content?.data || []).map((item: ContentItem) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <input
                      type="checkbox"
                      checked={selectedItems.includes(item.id)}
                      onChange={() => toggleSelection(item.id)}
                      className="rounded"
                    />
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {item.featured && (
                        <div className="w-2 h-2 bg-yellow-400 rounded-full" title="Tanlangan" />
                      )}
                      <span className="font-medium">{item.title}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getTypeIcon(item.type)}
                      <span className="capitalize">{item.type}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(item.status)}>
                      {item.status === 'published' ? 'Nashr etilgan' :
                       item.status === 'draft' ? 'Qoralama' : 'Rejalashtirilgan'}
                    </Badge>
                  </TableCell>
                  <TableCell>{item.author}</TableCell>
                  <TableCell>{item.views.toLocaleString()}</TableCell>
                  <TableCell>
                    <Badge variant={item.seoScore >= 80 ? "default" : "secondary"}>
                      {item.seoScore}/100
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <Calendar className="h-3 w-3" />
                      {new Date(item.lastModified).toLocaleDateString('uz-UZ')}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button size="sm" variant="outline">
                        <Eye className="h-3 w-3" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Edit className="h-3 w-3" />
                      </Button>
                      <Button size="sm" variant="outline" className="text-red-600">
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              )) || (
                <TableRow>
                  <TableCell colSpan={9} className="text-center py-8 text-gray-500">
                    Hech qanday kontent topilmadi
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

function ContentForm({ onClose }: { onClose: () => void }) {
  const { toast } = useToast();
  const [contentType, setContentType] = useState("post");

  const createContentMutation = useMutation({
    mutationFn: (contentData: any) => apiRequest("/api/admin/content", "POST", contentData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/content"] });
      onClose();
      toast({
        title: "Muvaffaqiyat",
        description: "Yangi kontent yaratildi"
      });
    }
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const contentData = {
      title: formData.get("title"),
      type: contentType,
      content: formData.get("content"),
      excerpt: formData.get("excerpt"),
      status: formData.get("status"),
      featured: formData.get("featured") === "on",
      seoTitle: formData.get("seoTitle"),
      seoDescription: formData.get("seoDescription"),
      tags: formData.get("tags")?.toString().split(",").map(tag => tag.trim()),
    };

    createContentMutation.mutate(contentData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="title">Sarlavha</Label>
          <Input id="title" name="title" required />
        </div>
        <div>
          <Label htmlFor="type">Turi</Label>
          <Select value={contentType} onValueChange={setContentType}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="post">Maqola</SelectItem>
              <SelectItem value="page">Sahifa</SelectItem>
              <SelectItem value="template">Shablon</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div>
        <Label htmlFor="excerpt">Qisqacha</Label>
        <Textarea id="excerpt" name="excerpt" rows={2} />
      </div>

      <div>
        <Label htmlFor="content">Kontent</Label>
        <Textarea id="content" name="content" rows={8} />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="seoTitle">SEO Sarlavha</Label>
          <Input id="seoTitle" name="seoTitle" />
        </div>
        <div>
          <Label htmlFor="tags">Teglar (vergul bilan ajrating)</Label>
          <Input id="tags" name="tags" placeholder="AI, teknologiya, innovatsiya" />
        </div>
      </div>

      <div>
        <Label htmlFor="seoDescription">SEO Tavsif</Label>
        <Textarea id="seoDescription" name="seoDescription" rows={2} />
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center space-x-2">
          <input type="checkbox" id="featured" name="featured" className="rounded" />
          <Label htmlFor="featured">Tanlangan kontent</Label>
        </div>
        <div>
          <Label htmlFor="status">Holat</Label>
          <Select name="status" defaultValue="draft">
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="draft">Qoralama</SelectItem>
              <SelectItem value="published">Nashr etish</SelectItem>
              <SelectItem value="scheduled">Rejalash</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={onClose}>
          Bekor qilish
        </Button>
        <Button type="submit">
          Yaratish
        </Button>
      </div>
    </form>
  );
}