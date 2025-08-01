import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { Settings, Database, Globe, Shield, Bell, Palette, Server, Activity } from "lucide-react";

interface SystemSettings {
  general: {
    siteName: string;
    siteDescription: string;
    adminEmail: string;
    timezone: string;
    language: string;
    maintenanceMode: boolean;
  };
  seo: {
    googleAnalyticsId: string;
    googleTagManagerId: string;
    yandexMetrikaId: string;
    sitemapEnabled: boolean;
    robotsContent: string;
  };
  security: {
    maxLoginAttempts: number;
    sessionTimeout: number;
    twoFactorAuth: boolean;
    ipWhitelist: string[];
    sslForced: boolean;
  };
  notifications: {
    emailNotifications: boolean;
    smsNotifications: boolean;
    adminAlerts: boolean;
    userRegistration: boolean;
    commentModeration: boolean;
  };
  performance: {
    cacheEnabled: boolean;
    cacheTimeout: number;
    imageCaching: boolean;
    gzipCompression: boolean;
    cdnEnabled: boolean;
    cdnUrl: string;
  };
}

export function SystemSettings() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("general");

  const { data: settings, isLoading } = useQuery<SystemSettings>({
    queryKey: ['/api/admin/settings'],
  });

  const updateSettingsMutation = useMutation({
    mutationFn: ({ section, data }: { section: string; data: any }) => 
      apiRequest(`/api/admin/settings/${section}`, "PATCH", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/settings"] });
      toast({
        title: "Saqlandi",
        description: "Sozlamalar muvaffaqiyatli yangilandi"
      });
    }
  });

  const systemHealthMutation = useMutation({
    mutationFn: () => apiRequest("/api/admin/system/health", "GET"),
    onSuccess: (data) => {
      toast({
        title: "Tizim holatini tekshirish",
        description: `Tizim ishlash ko'rsatkichi: ${data.status}`,
        variant: data.status === "healthy" ? "default" : "destructive"
      });
    }
  });

  const clearCacheMutation = useMutation({
    mutationFn: () => apiRequest("/api/admin/system/cache/clear", "POST"),
    onSuccess: () => {
      toast({
        title: "Kesh tozalandi",
        description: "Barcha kesh ma'lumotlar o'chirildi"
      });
    }
  });

  const handleSubmit = (section: string) => (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    
    // Convert checkboxes and arrays
    Object.keys(data).forEach(key => {
      if (key.includes('[]')) {
        const baseKey = key.replace('[]', '');
        if (!data[baseKey]) data[baseKey] = [];
        (data[baseKey] as any).push(data[key]);
        delete data[key];
      }
    });

    updateSettingsMutation.mutate({ section, data });
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
      {/* Tizim holatini tekshirish */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Tizim holatini tekshirish
            </span>
            <div className="flex gap-2">
              <Button size="sm" variant="outline" onClick={() => systemHealthMutation.mutate()}>
                Tekshirish
              </Button>
              <Button size="sm" variant="outline" onClick={() => clearCacheMutation.mutate()}>
                Keshni tozalash
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">99.9%</div>
              <div className="text-sm text-gray-500">Uptime</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">1.2s</div>
              <div className="text-sm text-gray-500">Javob vaqti</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">45GB</div>
              <div className="text-sm text-gray-500">Disk maydoni</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">2.1GB</div>
              <div className="text-sm text-gray-500">RAM ishlatilgan</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Sozlamalar */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Tizim sozlamalari
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-6">
              <TabsTrigger value="general">Umumiy</TabsTrigger>
              <TabsTrigger value="seo">SEO</TabsTrigger>
              <TabsTrigger value="security">Xavfsizlik</TabsTrigger>
              <TabsTrigger value="notifications">Bildirishnomalar</TabsTrigger>
              <TabsTrigger value="performance">Ishlash</TabsTrigger>
              <TabsTrigger value="backup">Zaxira</TabsTrigger>
            </TabsList>

            {/* Umumiy sozlamalar */}
            <TabsContent value="general" className="space-y-4">
              <form onSubmit={handleSubmit("general")} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="siteName">Sayt nomi</Label>
                    <Input 
                      id="siteName" 
                      name="siteName" 
                      defaultValue={settings?.general?.siteName}
                    />
                  </div>
                  <div>
                    <Label htmlFor="adminEmail">Admin email</Label>
                    <Input 
                      id="adminEmail" 
                      name="adminEmail" 
                      type="email"
                      defaultValue={settings?.general?.adminEmail}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="siteDescription">Sayt tavsifi</Label>
                  <Textarea 
                    id="siteDescription" 
                    name="siteDescription"
                    defaultValue={settings?.general?.siteDescription}
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="timezone">Vaqt zonasi</Label>
                    <Select name="timezone" defaultValue={settings?.general?.timezone}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Asia/Tashkent">Asia/Tashkent</SelectItem>
                        <SelectItem value="UTC">UTC</SelectItem>
                        <SelectItem value="Europe/Moscow">Europe/Moscow</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="language">Asosiy til</Label>
                    <Select name="language" defaultValue={settings?.general?.language}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="uz">O'zbekcha</SelectItem>
                        <SelectItem value="ru">Русский</SelectItem>
                        <SelectItem value="en">English</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="maintenanceMode">Texnik ishlar rejimi</Label>
                  <Switch 
                    id="maintenanceMode"
                    name="maintenanceMode"
                    defaultChecked={settings?.general?.maintenanceMode}
                  />
                </div>

                <Button type="submit" className="w-full">
                  Umumiy sozlamalarni saqlash
                </Button>
              </form>
            </TabsContent>

            {/* SEO sozlamalar */}
            <TabsContent value="seo" className="space-y-4">
              <form onSubmit={handleSubmit("seo")} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="googleAnalyticsId">Google Analytics ID</Label>
                    <Input 
                      id="googleAnalyticsId" 
                      name="googleAnalyticsId"
                      placeholder="G-XXXXXXXXXX"
                      defaultValue={settings?.seo?.googleAnalyticsId}
                    />
                  </div>
                  <div>
                    <Label htmlFor="yandexMetrikaId">Yandex Metrika ID</Label>
                    <Input 
                      id="yandexMetrikaId" 
                      name="yandexMetrikaId"
                      placeholder="12345678"
                      defaultValue={settings?.seo?.yandexMetrikaId}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="googleTagManagerId">Google Tag Manager ID</Label>
                  <Input 
                    id="googleTagManagerId" 
                    name="googleTagManagerId"
                    placeholder="GTM-XXXXXXX"
                    defaultValue={settings?.seo?.googleTagManagerId}
                  />
                </div>

                <div>
                  <Label htmlFor="robotsContent">Robots.txt mazmuni</Label>
                  <Textarea 
                    id="robotsContent" 
                    name="robotsContent"
                    defaultValue={settings?.seo?.robotsContent}
                    rows={8}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="sitemapEnabled">Sitemap avtomatik yaratish</Label>
                  <Switch 
                    id="sitemapEnabled"
                    name="sitemapEnabled"
                    defaultChecked={settings?.seo?.sitemapEnabled}
                  />
                </div>

                <Button type="submit" className="w-full">
                  SEO sozlamalarni saqlash
                </Button>
              </form>
            </TabsContent>

            {/* Xavfsizlik sozlamalari */}
            <TabsContent value="security" className="space-y-4">
              <form onSubmit={handleSubmit("security")} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="maxLoginAttempts">Maksimal kirish urinishlar</Label>
                    <Input 
                      id="maxLoginAttempts" 
                      name="maxLoginAttempts"
                      type="number"
                      defaultValue={settings?.security?.maxLoginAttempts}
                    />
                  </div>
                  <div>
                    <Label htmlFor="sessionTimeout">Sessiya muddati (daqiqa)</Label>
                    <Input 
                      id="sessionTimeout" 
                      name="sessionTimeout"
                      type="number"
                      defaultValue={settings?.security?.sessionTimeout}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="twoFactorAuth">Ikki bosqichli autentifikatsiya</Label>
                  <Switch 
                    id="twoFactorAuth"
                    name="twoFactorAuth"
                    defaultChecked={settings?.security?.twoFactorAuth}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="sslForced">SSL majburiy</Label>
                  <Switch 
                    id="sslForced"
                    name="sslForced"
                    defaultChecked={settings?.security?.sslForced}
                  />
                </div>

                <Button type="submit" className="w-full">
                  Xavfsizlik sozlamalarni saqlash
                </Button>
              </form>
            </TabsContent>

            {/* Ishlash sozlamalari */}
            <TabsContent value="performance" className="space-y-4">
              <form onSubmit={handleSubmit("performance")} className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="cacheEnabled">Kesh yoqilgan</Label>
                  <Switch 
                    id="cacheEnabled"
                    name="cacheEnabled"
                    defaultChecked={settings?.performance?.cacheEnabled}
                  />
                </div>

                <div>
                  <Label htmlFor="cacheTimeout">Kesh muddati (soniya)</Label>
                  <Input 
                    id="cacheTimeout" 
                    name="cacheTimeout"
                    type="number"
                    defaultValue={settings?.performance?.cacheTimeout}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="gzipCompression">Gzip siqish</Label>
                  <Switch 
                    id="gzipCompression"
                    name="gzipCompression"
                    defaultChecked={settings?.performance?.gzipCompression}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="cdnEnabled">CDN yoqilgan</Label>
                  <Switch 
                    id="cdnEnabled"
                    name="cdnEnabled"
                    defaultChecked={settings?.performance?.cdnEnabled}
                  />
                </div>

                <div>
                  <Label htmlFor="cdnUrl">CDN URL</Label>
                  <Input 
                    id="cdnUrl" 
                    name="cdnUrl"
                    placeholder="https://cdn.example.com"
                    defaultValue={settings?.performance?.cdnUrl}
                  />
                </div>

                <Button type="submit" className="w-full">
                  Ishlash sozlamalarni saqlash
                </Button>
              </form>
            </TabsContent>

            {/* Zaxira nusxa */}
            <TabsContent value="backup" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Database className="h-5 w-5" />
                    Zaxira nusxa boshqaruvi
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <Button variant="outline" className="w-full">
                      <Database className="h-4 w-4 mr-2" />
                      Bazani zaxiralash
                    </Button>
                    <Button variant="outline" className="w-full">
                      <Server className="h-4 w-4 mr-2" />
                      Fayllarni zaxiralash
                    </Button>
                  </div>

                  <div className="border rounded-lg p-4">
                    <h4 className="font-medium mb-2">Oxirgi zaxira nusxalar</h4>
                    <div className="space-y-2">
                      {[
                        { name: "database_backup_2025-01-08.sql", size: "12.5 MB", date: "2025-01-08 15:30" },
                        { name: "files_backup_2025-01-07.zip", size: "45.2 MB", date: "2025-01-07 15:30" },
                        { name: "full_backup_2025-01-06.tar.gz", size: "58.7 MB", date: "2025-01-06 15:30" }
                      ].map((backup, index) => (
                        <div key={index} className="flex items-center justify-between p-2 border rounded">
                          <div>
                            <div className="font-medium text-sm">{backup.name}</div>
                            <div className="text-xs text-gray-500">{backup.size} • {backup.date}</div>
                          </div>
                          <div className="flex gap-1">
                            <Button size="sm" variant="outline">Yuklab olish</Button>
                            <Button size="sm" variant="outline" className="text-red-600">O'chirish</Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}