import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Mail, Send, BarChart3, Users, Clock, CheckCircle, AlertCircle, TrendingUp } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

export function EmailMarketing() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Email statistikasini olish
  const { data: emailStats, isLoading: statsLoading } = useQuery({
    queryKey: ['/api/admin/email-stats'],
    enabled: true
  });

  // Marketing emaillarni yuborish
  const sendMarketingEmails = useMutation({
    mutationFn: () => apiRequest('/api/admin/send-marketing-emails', 'POST'),
    onSuccess: () => {
      toast({
        title: "Muvaffaqiyat",
        description: "Marketing emaillar yuborildi!"
      });
      queryClient.invalidateQueries({ queryKey: ['/api/admin/email-stats'] });
    },
    onError: () => {
      toast({
        title: "Xatolik",
        description: "Marketing emaillarni yuborishda xatolik yuz berdi",
        variant: "destructive"
      });
    }
  });

  const stats = emailStats?.data;

  return (
    <div className="space-y-6">
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Jami yuborilgan</CardTitle>
            <Mail className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {statsLoading ? (
                <div className="h-8 bg-gray-200 rounded w-16 animate-pulse"></div>
              ) : (
                stats?.totalSent || 0
              )}
            </div>
            <p className="text-xs text-muted-foreground">email yuborildi</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Xush kelibsiz</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {statsLoading ? (
                <div className="h-8 bg-gray-200 rounded w-16 animate-pulse"></div>
              ) : (
                stats?.welcomeEmails || 0
              )}
            </div>
            <p className="text-xs text-muted-foreground">xush kelibsiz email</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Marketing</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {statsLoading ? (
                <div className="h-8 bg-gray-200 rounded w-16 animate-pulse"></div>
              ) : (
                stats?.marketingEmails || 0
              )}
            </div>
            <p className="text-xs text-muted-foreground">marketing email</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Faollik darajasi</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">98.5%</div>
            <p className="text-xs text-muted-foreground">muvaffaqiyatli yetkazilgan</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Umumiy ko'rinish</TabsTrigger>
          <TabsTrigger value="templates">Shablonlar</TabsTrigger>
          <TabsTrigger value="history">Tarix</TabsTrigger>
          <TabsTrigger value="settings">Sozlamalar</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Campaign Management */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Send className="w-5 h-5" />
                  Marketing kampaniyalari
                </CardTitle>
                <CardDescription>
                  Avtomatik marketing emaillarni boshqarish
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 border rounded-lg bg-blue-50 dark:bg-blue-950">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">30 kunlik marketing seriyasi</h4>
                    <Badge variant="outline" className="bg-green-100 text-green-800">Faol</Badge>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">
                    Yangi mijozlar uchun 30 kunlik avtomatik email seriyasi. Har 2 kunda yuboriladi.
                  </p>
                  <Button 
                    onClick={() => sendMarketingEmails.mutate()}
                    disabled={sendMarketingEmails.isPending}
                    className="w-full"
                  >
                    {sendMarketingEmails.isPending ? "Yuborilmoqda..." : "Hozir yuborish"}
                  </Button>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between p-3 border rounded">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm">Xush kelibsiz email</span>
                    </div>
                    <Badge variant="secondary">Avtomatik</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded">
                    <div className="flex items-center gap-3">
                      <Clock className="w-4 h-4 text-blue-500" />
                      <span className="text-sm">Har 2 kunda marketing</span>
                    </div>
                    <Badge variant="secondary">Avtomatik</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>So'nggi faollik</CardTitle>
                <CardDescription>
                  Oxirgi yuborilgan emaillar
                </CardDescription>
              </CardHeader>
              <CardContent>
                {statsLoading ? (
                  <div className="space-y-3">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse"></div>
                        <div className="flex-1 space-y-1">
                          <div className="h-4 bg-gray-200 rounded w-24 animate-pulse"></div>
                          <div className="h-3 bg-gray-200 rounded w-32 animate-pulse"></div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-3">
                    {stats?.recentEmails?.slice(0, 5).map((email: any) => (
                      <div key={email.id} className="flex items-center space-x-3">
                        <div className="flex items-center justify-center w-8 h-8 bg-blue-100 rounded-full">
                          <Mail className="w-4 h-4 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">{email.subject}</p>
                          <p className="text-xs text-gray-500">
                            {email.email} • {new Date(email.sentAt).toLocaleDateString('uz-UZ')}
                          </p>
                        </div>
                        <Badge 
                          variant={email.status === 'sent' ? 'default' : 'destructive'}
                          className="text-xs"
                        >
                          {email.status === 'sent' ? 'Yuborildi' : 'Xatolik'}
                        </Badge>
                      </div>
                    )) || (
                      <div className="text-center py-6 text-gray-500">
                        <Mail className="w-8 h-8 mx-auto mb-2 opacity-50" />
                        <p className="text-sm">Hozircha email yuborilmagan</p>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="templates" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Email shablonlari</CardTitle>
              <CardDescription>
                30 kunlik marketing email shablonlari ro'yxati
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Marketing Templates */}
                {[
                  { day: 1, title: "Xush kelibsiz! - Evolvo AI jamoasiga qo'shiling", type: "welcome" },
                  { day: 3, title: "AI yechimlar bilan biznesingizni kuchaytiring", type: "educational" },
                  { day: 7, title: "O'zbekistonda AI - Kelajak bugun boshlandi", type: "trend" },
                  { day: 10, title: "Muvaffaqiyat tarixi - Mijozlarimiz bilan", type: "case_study" },
                  { day: 14, title: "Bepul konsultatsiya - AI strategiyangizni yarating", type: "offer" },
                  { day: 17, title: "AI avtomatlashtirish - Vaqtingizni tejang", type: "solution" },
                  { day: 21, title: "Yangi AI xizmatlar - 2025 yil imkoniyatlari", type: "product" },
                  { day: 24, title: "Ma'lumotlar xavfsizligi va AI", type: "security" },
                  { day: 27, title: "Hamkorlik taklifimiz - Birga kuchliroqmiz", type: "partnership" },
                  { day: 30, title: "Kelajakka qadam - AI bilan yangi imkoniyatlar", type: "future" }
                ].map((template) => (
                  <div key={template.day} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center justify-center w-8 h-8 bg-blue-100 rounded-full text-blue-600 font-medium text-sm">
                        {template.day}
                      </div>
                      <div>
                        <h4 className="font-medium">{template.title}</h4>
                        <p className="text-sm text-gray-500">
                          {template.day} kun • {template.type}
                        </p>
                      </div>
                    </div>
                    <Badge variant="outline">
                      {template.type === 'welcome' ? 'Xush kelibsiz' : 
                       template.type === 'educational' ? 'Ta\'limiy' :
                       template.type === 'offer' ? 'Taklif' : 'Marketing'}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Email tarixi</CardTitle>
              <CardDescription>
                Yuborilgan barcha emaillarning batafsil tarixi
              </CardDescription>
            </CardHeader>
            <CardContent>
              {statsLoading ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                  <p className="mt-2 text-sm text-gray-500">Yuklanmoqda...</p>
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Email</TableHead>
                      <TableHead>Mavzu</TableHead>
                      <TableHead>Turi</TableHead>
                      <TableHead>Sana</TableHead>
                      <TableHead>Holati</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {stats?.recentEmails?.map((email: any) => (
                      <TableRow key={email.id}>
                        <TableCell className="font-medium">{email.email}</TableCell>
                        <TableCell>{email.subject}</TableCell>
                        <TableCell>
                          <Badge variant="outline">
                            {email.type === 'welcome' ? 'Xush kelibsiz' : 'Marketing'}
                          </Badge>
                        </TableCell>
                        <TableCell>{new Date(email.sentAt).toLocaleDateString('uz-UZ')}</TableCell>
                        <TableCell>
                          <Badge variant={email.status === 'sent' ? 'default' : 'destructive'}>
                            {email.status === 'sent' ? 'Yuborildi' : 'Xatolik'}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    )) || (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center py-6 text-gray-500">
                          Email tarixi topilmadi
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Email sozlamalari</CardTitle>
              <CardDescription>
                Email marketing tizimi sozlamalari
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="p-4 border rounded-lg bg-yellow-50 dark:bg-yellow-950">
                <div className="flex items-center gap-2 mb-2">
                  <AlertCircle className="w-5 h-5 text-yellow-600" />
                  <h4 className="font-medium">Haqiqiy email xizmati</h4>
                </div>
                <p className="text-sm text-gray-600 mb-3">
                  Hozirda tizim demo rejimida ishlaydi. Haqiqiy emaillar yuborish uchun SendGrid API kaliti kerak.
                </p>
                <p className="text-xs text-gray-500">
                  Barcha emaillar log sifatida saqlanadi va admin panelda ko'rsatiladi.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Avtomatik yuborish</h4>
                    <p className="text-sm text-gray-500">Har 2 kunda soat 09:00 da</p>
                  </div>
                  <Badge variant="default">Faol</Badge>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Xush kelibsiz email</h4>
                    <p className="text-sm text-gray-500">Yangi kontakt qo'shilganda</p>
                  </div>
                  <Badge variant="default">Faol</Badge>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">OpenAI personalizatsiya</h4>
                    <p className="text-sm text-gray-500">AI yordamida moslashtirilgan mazmun</p>
                  </div>
                  <Badge variant="default">Faol</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}