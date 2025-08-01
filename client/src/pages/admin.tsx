import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { Trash2, Edit, Plus, Eye, EyeOff, Calendar, User, Mail, MessageSquare, LogOut, Home } from "lucide-react";
import { BlogForm } from "@/components/admin/blog-form";
import { SEOHead } from "@/components/seo/head";
import { DashboardStats } from "@/components/admin/dashboard-stats";
import { UserManagement } from "@/components/admin/user-management";
import { AnalyticsDashboard } from "@/components/admin/analytics-dashboard";
import { ContentManagement } from "@/components/admin/content-management";
import { SystemSettings } from "@/components/admin/system-settings";
import { EmailMarketing } from "@/components/admin/email-marketing";
import { TelegramMarketing } from "@/components/admin/telegram-marketing";
import type { Contact, BlogPost, Service, Testimonial } from "@shared/schema";

export default function AdminPage() {
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [showBlogForm, setShowBlogForm] = useState(false);
  const [isRSSLoading, setIsRSSLoading] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("admin_authenticated");
    toast({
      title: "Chiqish",
      description: "Admin paneldan chiqildi"
    });
    setLocation("/");
  };

  const handleRSSSync = async () => {
    setIsRSSLoading(true);
    try {
      const response = await apiRequest("POST", "/api/rss/sync");
      toast({
        title: "RSS Yuklandi",
        description: "Yangi maqolalar avtomatik tarjima qilinib qo'shildi"
      });
      queryClient.invalidateQueries({ queryKey: ["/api/blog"] });
    } catch (error) {
      toast({
        title: "Xatolik",
        description: "RSS yuklashda xatolik yuz berdi",
        variant: "destructive"
      });
    } finally {
      setIsRSSLoading(false);
    }
  };

  // Contacts data
  const { data: contacts, isLoading: contactsLoading } = useQuery({
    queryKey: ["/api/contacts"],
  });

  // Blog posts data
  const { data: blogPosts, isLoading: blogLoading } = useQuery({
    queryKey: ["/api/blog"],
  });

  // Services data
  const { data: services, isLoading: servicesLoading } = useQuery({
    queryKey: ["/api/services"],
  });

  // Testimonials data
  const { data: testimonials, isLoading: testimonialsLoading } = useQuery({
    queryKey: ["/api/testimonials"],
  });

  const deleteContactMutation = useMutation({
    mutationFn: (id: string) => apiRequest(`/api/contacts/${id}`, "DELETE"),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/contacts"] });
      toast({ title: "Kontakt o'chirildi", description: "Kontakt muvaffaqiyatli o'chirildi" });
    },
    onError: () => {
      toast({ title: "Xatolik", description: "Kontaktni o'chirishda xatolik yuz berdi", variant: "destructive" });
    },
  });

  const toggleBlogPostMutation = useMutation({
    mutationFn: ({ id, published }: { id: string; published: boolean }) =>
      apiRequest(`/api/blog/${id}`, "PATCH", { published }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/blog"] });
      toast({ title: "Maqola yangilandi", description: "Maqola holati o'zgartirildi" });
    },
    onError: () => {
      toast({ title: "Xatolik", description: "Maqolani yangilashda xatolik", variant: "destructive" });
    },
  });

  return (
    <>
      <SEOHead 
        title="Evolvo AI - Admin Panel"
        description="Evolvo AI platformasi uchun administrator paneliga kirish. Tizim boshqaruvi va kontentni yangilash."
        url="https://evolvo-ai.replit.app/admin"
      />
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Admin Panel</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Evolvo AI platformasini boshqarish paneli
            </p>
          </div>
          <div className="flex gap-3">
            <Button 
              variant="outline" 
              onClick={() => setLocation("/")}
              className="flex items-center gap-2"
            >
              <Home className="w-4 h-4" />
              Bosh sahifa
            </Button>
            <Button 
              variant="destructive" 
              onClick={handleLogout}
              className="flex items-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              Chiqish
            </Button>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-9">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="contacts">Mijozlar</TabsTrigger>
            <TabsTrigger value="blog">Blog</TabsTrigger>
            <TabsTrigger value="content">Kontent</TabsTrigger>
            <TabsTrigger value="users">Foydalanuvchilar</TabsTrigger>
            <TabsTrigger value="analytics">Analitika</TabsTrigger>
            <TabsTrigger value="email">Email</TabsTrigger>
            <TabsTrigger value="telegram">Telegram</TabsTrigger>
            <TabsTrigger value="settings">Sozlamalar</TabsTrigger>
          </TabsList>

          {/* Dashboard Tab */}
          <TabsContent value="dashboard">
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Dashboard ko'rinishi</h2>
                <p className="text-gray-600">Platformaning umumiy statistikasi va asosiy ko'rsatkichlar</p>
              </div>
              <DashboardStats />
            </div>
          </TabsContent>

          {/* Contacts Tab */}
          <TabsContent value="contacts">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="w-5 h-5" />
                  Kontakt So'rovlari
                </CardTitle>
                <CardDescription>
                  Mijozlardan kelgan barcha kontakt so'rovlari
                </CardDescription>
              </CardHeader>
              <CardContent>
                {contactsLoading ? (
                  <div className="text-center py-8">Yuklanmoqda...</div>
                ) : (
                  <div className="space-y-4">
                    {(contacts as any)?.data?.map((contact: Contact) => (
                      <div
                        key={contact.id}
                        className="border rounded-lg p-4 bg-white dark:bg-gray-800 shadow-sm"
                      >
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="font-semibold text-gray-900 dark:text-white">
                                {contact.name}
                              </h3>
                              <Badge variant="outline">{contact.language}</Badge>
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                              📧 {contact.email}
                            </p>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                              📞 {contact.phone}
                            </p>
                            <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                              {contact.message}
                            </p>
                            <div className="flex items-center gap-2 text-xs text-gray-500">
                              <Calendar className="w-3 h-3" />
                              {contact.createdAt ? new Date(contact.createdAt).toLocaleString("uz-UZ") : "Noma'lum"}
                            </div>
                          </div>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => deleteContactMutation.mutate(contact.id)}
                            disabled={deleteContactMutation.isPending}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                    {(contacts as any)?.data?.length === 0 && (
                      <div className="text-center py-8 text-gray-500">
                        Hozircha kontakt so'rovlari yo'q
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Blog Tab */}
          <TabsContent value="blog">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquare className="w-5 h-5" />
                    Blog Maqolalari
                  </CardTitle>
                  <CardDescription>
                    Blog maqolalarini boshqarish va nashr qilish
                  </CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button 
                    onClick={() => setShowBlogForm(true)}
                    className="flex items-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    Yangi Maqola
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => handleRSSSync()}
                    disabled={isRSSLoading}
                    className="flex items-center gap-2"
                  >
                    <MessageSquare className="w-4 h-4" />
                    {isRSSLoading ? "RSS Yuklanmoqda..." : "RSS Yukla"}
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {blogLoading ? (
                  <div className="text-center py-8">Yuklanmoqda...</div>
                ) : (
                  <div className="space-y-4">
                    {(blogPosts as any)?.data?.map((post: BlogPost) => (
                      <div
                        key={post.id}
                        className="border rounded-lg p-4 bg-white dark:bg-gray-800 shadow-sm"
                      >
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="font-semibold text-gray-900 dark:text-white">
                                {post.title}
                              </h3>
                              <Badge variant="outline">{post.language}</Badge>
                              <Badge variant={post.published ? "default" : "secondary"}>
                                {post.published ? "Nashr qilingan" : "Qoralama"}
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                              {post.excerpt}
                            </p>
                            <div className="flex items-center gap-4 text-xs text-gray-500">
                              <span>📝 {post.author}</span>
                              <span>🏷️ {post.category}</span>
                              <div className="flex items-center gap-1">
                                <Calendar className="w-3 h-3" />
                                {post.createdAt ? new Date(post.createdAt).toLocaleString("uz-UZ") : "Noma'lum"}
                              </div>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() =>
                                toggleBlogPostMutation.mutate({
                                  id: post.id,
                                  published: !post.published,
                                })
                              }
                              disabled={toggleBlogPostMutation.isPending}
                            >
                              {post.published ? (
                                <EyeOff className="w-4 h-4" />
                              ) : (
                                <Eye className="w-4 h-4" />
                              )}
                            </Button>
                            <Button variant="outline" size="sm">
                              <Edit className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                    {(blogPosts as any)?.data?.length === 0 && (
                      <div className="text-center py-8 text-gray-500">
                        Hozircha blog maqolalari yo'q
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Services Tab */}
          <TabsContent value="services">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plus className="w-5 h-5" />
                  Xizmatlar
                </CardTitle>
                <CardDescription>
                  Kompaniya xizmatlarini boshqarish
                </CardDescription>
              </CardHeader>
              <CardContent>
                {servicesLoading ? (
                  <div className="text-center py-8">Yuklanmoqda...</div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {(services as any)?.data?.map((service: Service) => (
                      <div
                        key={service.id}
                        className="border rounded-lg p-4 bg-white dark:bg-gray-800 shadow-sm"
                      >
                        <div className="flex items-center gap-3 mb-3">
                          <div className={`w-10 h-10 rounded-lg bg-${service.color} bg-opacity-10 flex items-center justify-center`}>
                            <i className={`${service.icon} text-${service.color}`}></i>
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900 dark:text-white">
                              {service.title}
                            </h3>
                            <Badge variant="outline" className="text-xs">
                              {service.language}
                            </Badge>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                          {service.description}
                        </p>
                        <div className="space-y-1">
                          {service.features?.map((feature, index) => (
                            <div key={index} className="text-xs text-gray-500 flex items-center gap-1">
                              <span className="w-1 h-1 bg-current rounded-full"></span>
                              {feature}
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Testimonials Tab */}
          <TabsContent value="testimonials">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Mijozlar Fikrlari
                </CardTitle>
                <CardDescription>
                  Mijozlardan kelgan testimoniallar
                </CardDescription>
              </CardHeader>
              <CardContent>
                {testimonialsLoading ? (
                  <div className="text-center py-8">Yuklanmoqda...</div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {(testimonials as any)?.data?.map((testimonial: Testimonial) => (
                      <div
                        key={testimonial.id}
                        className="border rounded-lg p-4 bg-white dark:bg-gray-800 shadow-sm"
                      >
                        <div className="flex items-start gap-3 mb-3">
                          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                            {testimonial.name.charAt(0)}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-semibold text-gray-900 dark:text-white">
                                {testimonial.name}
                              </h3>
                              <Badge variant="outline" className="text-xs">
                                {testimonial.language}
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {testimonial.position} • {testimonial.company}
                            </p>
                          </div>
                        </div>
                        <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
                          "{testimonial.content}"
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="flex">
                            {[...Array(testimonial.rating)].map((_, i) => (
                              <span key={i} className="text-yellow-400">⭐</span>
                            ))}
                          </div>
                          <span className="text-xs text-gray-500">
                            Bugun
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Content Management Tab */}
          <TabsContent value="content">
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Kontent boshqaruvi</h2>
                <p className="text-gray-600">Sayt kontent va sahifalarini boshqarish</p>
              </div>
              <ContentManagement />
            </div>
          </TabsContent>

          {/* User Management Tab */}
          <TabsContent value="users">
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Foydalanuvchi boshqaruvi</h2>
                <p className="text-gray-600">Admin foydalanuvchilarni boshqarish va rollar</p>
              </div>
              <UserManagement />
            </div>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics">
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Analitika va hisobotlar</h2>
                <p className="text-gray-600">Sayt statistikasi, foydalanuvchi harakatlari va ko'rsatkichlar</p>
              </div>
              <AnalyticsDashboard />
            </div>
          </TabsContent>

          {/* Email Marketing Tab */}
          <TabsContent value="email">
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Email Marketing</h2>
                <p className="text-gray-600">Avtomatik email kampaniyalari va mijozlar bilan aloqa</p>
              </div>
              <EmailMarketing />
            </div>
          </TabsContent>

          {/* Telegram Marketing Tab */}
          <TabsContent value="telegram">
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Telegram Marketing</h2>
                <p className="text-gray-600">Telegram bot va avtomatik xabar yuborish tizimi</p>
              </div>
              <TelegramMarketing />
            </div>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings">
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Tizim sozlamalari</h2>
                <p className="text-gray-600">Platform sozlamalari, xavfsizlik va tizim konfiguratsiyasi</p>
              </div>
              <SystemSettings />
            </div>
          </TabsContent>
        </Tabs>
      </div>
      
      {showBlogForm && <BlogForm onClose={() => setShowBlogForm(false)} />}
    </div>
    </>
  );
}