import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { MessageCircle, Send, Users, Globe, BarChart3, Bot, Play, Settings, Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

export function TelegramMarketing() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [testChatId, setTestChatId] = useState("");
  const [testMessage, setTestMessage] = useState("");

  // Telegram statistikasini olish
  const { data: telegramStats, isLoading: statsLoading } = useQuery({
    queryKey: ['/api/admin/telegram-stats'],
    enabled: true
  });

  // Test xabar yuborish
  const sendTestMessage = useMutation({
    mutationFn: (data: { chatId: string, message: string }) => 
      apiRequest('/api/admin/send-telegram-test', 'POST', data),
    onSuccess: () => {
      toast({
        title: "Muvaffaqiyat",
        description: "Test xabar yuborildi!"
      });
      setTestMessage("");
    },
    onError: () => {
      toast({
        title: "Xatolik",
        description: "Test xabar yuborishda xatolik yuz berdi",
        variant: "destructive"
      });
    }
  });

  // Marketing xabarlarni yuborish
  const sendMarketingMessages = useMutation({
    mutationFn: (day: number) => 
      apiRequest('/api/admin/send-telegram-marketing', 'POST', { day }),
    onSuccess: () => {
      toast({
        title: "Muvaffaqiyat",
        description: "Telegram marketing xabarlari yuborildi!"
      });
      queryClient.invalidateQueries({ queryKey: ['/api/admin/telegram-stats'] });
    },
    onError: () => {
      toast({
        title: "Xatolik",
        description: "Marketing xabarlarni yuborishda xatolik yuz berdi",
        variant: "destructive"
      });
    }
  });

  const stats = telegramStats?.data;

  const copyBotInfo = () => {
    const botInfo = `Telegram Bot test yo'riqnomasi:

AGAR 404 XATOLIK CHIQSA:
1. BotFather ga /newbot yuboring
2. Bot nomini kiriting: Evolvo AI Bot
3. Username kiriting: evolvo_ai_bot (yoki boshqa)
4. Olingan yangi tokenni Replit Secrets ga qo'shing

HAQIQIY BOT TEST QILISH:
1. Telegram'da @vertextestai_bot ni toping
2. /start buyrug'ini yuboring  
3. Bot javob berishini va obuna bo'lishini tekshiring

BOT BUYRUQLARI:
/start - Botni boshlash va obuna bo'lish
/services - Xizmatlar haqida ma'lumot  
/contact - Bog'lanish ma'lumotlari
/language - Tilni o'zgartirish (O'zbek/Rus)
/unsubscribe - Obunani bekor qilish

ADMIN PANEL ORQALI TEST:
- Test xabar: Chat ID kiriting va xabar yuboring
- Chat ID topish: Botga /start yuborgan odamning ID si logda ko'rinadi`;

    navigator.clipboard.writeText(botInfo);
    toast({
      title: "Nusxalandi",
      description: "Bot test yo'riqnomasi clipboardga nusxalandi"
    });
  };

  return (
    <div className="space-y-6">
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Jami obunachi</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {statsLoading ? (
                <div className="h-8 bg-gray-200 rounded w-16 animate-pulse"></div>
              ) : (
                stats?.totalSubscribers || 0
              )}
            </div>
            <p className="text-xs text-muted-foreground">faol obunachi</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">O'zbek tili</CardTitle>
            <Globe className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {statsLoading ? (
                <div className="h-8 bg-gray-200 rounded w-16 animate-pulse"></div>
              ) : (
                stats?.uzbekSubscribers || 0
              )}
            </div>
            <p className="text-xs text-muted-foreground">o'zbek tilida</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Rus tili</CardTitle>
            <Globe className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {statsLoading ? (
                <div className="h-8 bg-gray-200 rounded w-16 animate-pulse"></div>
              ) : (
                stats?.russianSubscribers || 0
              )}
            </div>
            <p className="text-xs text-muted-foreground">rus tilida</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Bot holati</CardTitle>
            <Bot className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">Faol</div>
            <p className="text-xs text-muted-foreground">ishlamoqda</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Umumiy ko'rinish</TabsTrigger>
          <TabsTrigger value="campaigns">Kampaniyalar</TabsTrigger>
          <TabsTrigger value="subscribers">Obunachilar</TabsTrigger>
          <TabsTrigger value="settings">Sozlamalar</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Bot Setup */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bot className="w-5 h-5" />
                  Telegram Bot sozlamalari
                </CardTitle>
                <CardDescription>
                  Bot yaratish va sozlash yo'riqnomasi
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 border rounded-lg bg-green-50 dark:bg-green-950">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">Bot holati</h4>
                    <Badge variant="outline" className="bg-green-100 text-green-800">Faol</Badge>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">
                    Bot: @vertextestai_bot (vertextest) - muvaffaqiyatli ishga tushdi va buyruqlarni qabul qilyapti.
                  </p>
                  <Button onClick={copyBotInfo} variant="outline" className="w-full">
                    <Copy className="w-4 h-4 mr-2" />
                    Bot ma'lumotlarini nusxalash
                  </Button>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between p-3 border rounded">
                    <div className="flex items-center gap-3">
                      <MessageCircle className="w-4 h-4 text-blue-500" />
                      <span className="text-sm">Avtomatik javoblar</span>
                    </div>
                    <Badge variant="default">Faol</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded">
                    <div className="flex items-center gap-3">
                      <Send className="w-4 h-4 text-green-500" />
                      <span className="text-sm">Marketing xabarlari</span>
                    </div>
                    <Badge variant="default">Har 3 kunda</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded">
                    <div className="flex items-center gap-3">
                      <Globe className="w-4 h-4 text-purple-500" />
                      <span className="text-sm">Ko'p tilli qo'llab-quvvatlash</span>
                    </div>
                    <Badge variant="default">O'zbek, Rus</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Tezkor amallar</CardTitle>
                <CardDescription>
                  Bot boshqaruvi va test xabarlar
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Test Message */}
                <div className="space-y-3">
                  <Label htmlFor="testChatId">Test xabar yuborish</Label>
                  <Input
                    id="testChatId"
                    placeholder="Chat ID (masalan: 123456789)"
                    value={testChatId}
                    onChange={(e) => setTestChatId(e.target.value)}
                  />
                  <Textarea
                    placeholder="Test xabar matni..."
                    value={testMessage}
                    onChange={(e) => setTestMessage(e.target.value)}
                    rows={3}
                  />
                  <Button 
                    onClick={() => sendTestMessage.mutate({ chatId: testChatId, message: testMessage })}
                    disabled={sendTestMessage.isPending || !testChatId || !testMessage}
                    className="w-full"
                  >
                    {sendTestMessage.isPending ? "Yuborilmoqda..." : "Test xabar yuborish"}
                  </Button>
                </div>

                {/* Marketing Campaigns */}
                <div className="pt-4 border-t space-y-3">
                  <Label>Marketing kampaniyalar</Label>
                  <div className="grid grid-cols-3 gap-2">
                    {[1, 2, 3].map((day) => (
                      <Button
                        key={day}
                        variant="outline"
                        size="sm"
                        onClick={() => sendMarketingMessages.mutate(day)}
                        disabled={sendMarketingMessages.isPending}
                      >
                        {day}-kun
                      </Button>
                    ))}
                  </div>
                  <p className="text-xs text-gray-500">
                    Tanlangan kun uchun marketing xabarini barcha obunachilarga yuborish
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="campaigns" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Marketing kampaniyalari</CardTitle>
              <CardDescription>
                Telegram marketing xabarlari va shablonlar
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Campaign Templates */}
                {[
                  { 
                    day: 1, 
                    title: "Xush kelibsiz - Evolvo AI bilan tanishing", 
                    description: "Yangi obunachilarga xush kelibsiz xabari",
                    type: "welcome",
                    status: "active"
                  },
                  { 
                    day: 2, 
                    title: "AI yechimlar - Biznesingizni rivojlantiring", 
                    description: "AI texnologiyalari haqida ma'lumot",
                    type: "educational",
                    status: "active"
                  },
                  { 
                    day: 3, 
                    title: "Muvaffaqiyat tarixi - Mijozlarimiz tajribasi", 
                    description: "Real mijozlar tajribasi va natijalar",
                    type: "case_study",
                    status: "active"
                  }
                ].map((campaign) => (
                  <div key={campaign.day} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center justify-center w-8 h-8 bg-blue-100 rounded-full text-blue-600 font-medium text-sm">
                        {campaign.day}
                      </div>
                      <div>
                        <h4 className="font-medium">{campaign.title}</h4>
                        <p className="text-sm text-gray-500">{campaign.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={campaign.status === 'active' ? 'default' : 'secondary'}>
                        {campaign.status === 'active' ? 'Faol' : 'Nofaol'}
                      </Badge>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => sendMarketingMessages.mutate(campaign.day)}
                        disabled={sendMarketingMessages.isPending}
                      >
                        <Play className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="subscribers" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Obunachilar ro'yxati</CardTitle>
              <CardDescription>
                Telegram bot obunachilari va ularning ma'lumotlari
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
                      <TableHead>Chat ID</TableHead>
                      <TableHead>Username</TableHead>
                      <TableHead>Til</TableHead>
                      <TableHead>Obuna sanasi</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {stats?.recentSubscribers?.map((subscriber: any) => (
                      <TableRow key={subscriber.chatId}>
                        <TableCell className="font-mono text-sm">{subscriber.chatId}</TableCell>
                        <TableCell>
                          {subscriber.username ? `@${subscriber.username}` : 'Noma\'lum'}
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">
                            {subscriber.language === 'uz' ? '🇺🇿 O\'zbek' : '🇷🇺 Русский'}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {new Date(subscriber.subscribeDate).toLocaleDateString('uz-UZ')}
                        </TableCell>
                      </TableRow>
                    )) || (
                      <TableRow>
                        <TableCell colSpan={4} className="text-center py-6 text-gray-500">
                          <Bot className="w-8 h-8 mx-auto mb-2 opacity-50" />
                          <p className="text-sm">Hozircha obunachilar yo'q</p>
                          <p className="text-xs">Bot tokenini qo'shing va faollashtirishni boshlang</p>
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
              <CardTitle>Telegram Bot sozlamalari</CardTitle>
              <CardDescription>
                Bot konfiguratsiyasi va integratsiya sozlamalari
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="p-4 border rounded-lg bg-yellow-50 dark:bg-yellow-950">
                <div className="flex items-center gap-2 mb-2">
                  <Settings className="w-5 h-5 text-yellow-600" />
                  <h4 className="font-medium">Bot tokeni kerak</h4>
                </div>
                <p className="text-sm text-gray-600 mb-3">
                  Telegram botini faollashtirish uchun BotFather dan token oling va environment variable qo'shing.
                </p>
                <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded font-mono text-sm">
                  TELEGRAM_BOT_TOKEN=your_bot_token_here
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Avtomatik marketing</h4>
                    <p className="text-sm text-gray-500">Har 3 kunda soat 10:00 da</p>
                  </div>
                  <Badge variant="default">Faol</Badge>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Ko'p tilli qo'llab-quvvatlash</h4>
                    <p className="text-sm text-gray-500">O'zbek va Rus tillari</p>
                  </div>
                  <Badge variant="default">Faol</Badge>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">OpenAI personalizatsiya</h4>
                    <p className="text-sm text-gray-500">Username asosida xabarlarni moslash</p>
                  </div>
                  <Badge variant="default">Faol</Badge>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Statistika</h4>
                    <p className="text-sm text-gray-500">Har kuni soat 19:00 da</p>
                  </div>
                  <Badge variant="default">Faol</Badge>
                </div>
              </div>

              <div className="pt-4 border-t">
                <h4 className="font-medium mb-3">Bot buyruqlari</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <code>/start</code>
                    <span className="text-gray-500">Botni boshlash va obuna bo'lish</span>
                  </div>
                  <div className="flex justify-between">
                    <code>/services</code>
                    <span className="text-gray-500">Xizmatlar haqida ma'lumot</span>
                  </div>
                  <div className="flex justify-between">
                    <code>/contact</code>
                    <span className="text-gray-500">Bog'lanish ma'lumotlari</span>
                  </div>
                  <div className="flex justify-between">
                    <code>/language</code>
                    <span className="text-gray-500">Tilni o'zgartirish</span>
                  </div>
                  <div className="flex justify-between">
                    <code>/unsubscribe</code>
                    <span className="text-gray-500">Obunani bekor qilish</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}