import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from "recharts";
import { TrendingUp, Users, Globe, Clock, Activity, MousePointer } from "lucide-react";

interface AnalyticsData {
  pageViews: Array<{ date: string; views: number; uniqueVisitors: number }>;
  topPages: Array<{ page: string; views: number; bounceRate: number }>;
  trafficSources: Array<{ source: string; visitors: number; percentage: number }>;
  userBehavior: {
    avgSessionDuration: string;
    bounceRate: number;
    pagesPerSession: number;
    newVsReturning: { new: number; returning: number };
  };
  deviceStats: Array<{ device: string; count: number; percentage: number }>;
  geographics: Array<{ country: string; city: string; visitors: number }>;
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

export function AnalyticsDashboard() {
  const { data: analytics, isLoading } = useQuery<AnalyticsData>({
    queryKey: ['/api/admin/analytics'],
    refetchInterval: 300000, // 5 daqiqada yangilanadi
  });

  if (isLoading) {
    return (
      <div className="grid gap-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader>
                <div className="h-4 bg-gray-200 rounded w-24"></div>
              </CardHeader>
              <CardContent>
                <div className="h-8 bg-gray-200 rounded w-16"></div>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          <Card className="animate-pulse">
            <CardHeader>
              <div className="h-6 bg-gray-200 rounded w-32"></div>
            </CardHeader>
            <CardContent>
              <div className="h-64 bg-gray-200 rounded"></div>
            </CardContent>
          </Card>
          <Card className="animate-pulse">
            <CardHeader>
              <div className="h-6 bg-gray-200 rounded w-32"></div>
            </CardHeader>
            <CardContent>
              <div className="h-64 bg-gray-200 rounded"></div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (!analytics) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center h-64">
          <div className="text-center">
            <Activity className="h-8 w-8 mx-auto text-gray-400 mb-2" />
            <p className="text-gray-500">Analitika ma'lumotlar yuklanmadi</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Asosiy metrikalar */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">O'rtacha sessiya davomiyligi</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.userBehavior.avgSessionDuration}</div>
            <p className="text-xs text-muted-foreground">
              Foydalanuvchilar saytda o'tkazgan vaqt
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Bounce Rate</CardTitle>
            <MousePointer className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.userBehavior.bounceRate}%</div>
            <p className="text-xs text-muted-foreground">
              Bitta sahifa ko'rib ketgan foydalanuvchilar
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sahifalar/Sessiya</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.userBehavior.pagesPerSession}</div>
            <p className="text-xs text-muted-foreground">
              Har bir sessiyada ko'rilgan sahifalar soni
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Yangi foydalanuvchilar</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.userBehavior.newVsReturning.new}%</div>
            <p className="text-xs text-muted-foreground">
              Jami foydalanuvchilardan yangilari nisbati
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Grafiklar */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Ko'rishlar trend */}
        <Card>
          <CardHeader>
            <CardTitle>Sahifa ko'rishlar trendi</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={analytics.pageViews}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="views" 
                  stroke="#8884d8" 
                  strokeWidth={2}
                  name="Ko'rishlar"
                />
                <Line 
                  type="monotone" 
                  dataKey="uniqueVisitors" 
                  stroke="#82ca9d" 
                  strokeWidth={2}
                  name="Noyob tashrifchilar"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Trafik manbalari */}
        <Card>
          <CardHeader>
            <CardTitle>Trafik manbalari</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={analytics.trafficSources}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ source, percentage }) => `${source} ${percentage}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="visitors"
                >
                  {analytics.trafficSources.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Jadvallar */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Eng mashhur sahifalar */}
        <Card>
          <CardHeader>
            <CardTitle>Eng mashhur sahifalar</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Sahifa</TableHead>
                  <TableHead>Ko'rishlar</TableHead>
                  <TableHead>Bounce Rate</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {analytics.topPages.map((page, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{page.page}</TableCell>
                    <TableCell>{page.views.toLocaleString()}</TableCell>
                    <TableCell>
                      <Badge variant={page.bounceRate > 70 ? "destructive" : "secondary"}>
                        {page.bounceRate}%
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Geografik ma'lumotlar */}
        <Card>
          <CardHeader>
            <CardTitle>Geografik taqsimot</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Mamlakat</TableHead>
                  <TableHead>Shahar</TableHead>
                  <TableHead>Tashrifchilar</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {analytics.geographics.map((geo, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        <Globe className="h-4 w-4 text-gray-400" />
                        {geo.country}
                      </div>
                    </TableCell>
                    <TableCell>{geo.city}</TableCell>
                    <TableCell>{geo.visitors.toLocaleString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {/* Qurilma statistikasi */}
      <Card>
        <CardHeader>
          <CardTitle>Qurilma statistikasi</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={analytics.deviceStats} layout="horizontal">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis dataKey="device" type="category" width={80} />
              <Tooltip />
              <Bar dataKey="count" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}