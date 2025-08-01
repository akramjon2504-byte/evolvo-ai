import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, Users, MessageSquare, FileText, Eye, Calendar } from "lucide-react";

interface DashboardStat {
  title: string;
  value: string;
  change: string;
  icon: React.ReactNode;
  trend: "up" | "down" | "neutral";
}

export function DashboardStats() {
  const { data: stats, isLoading } = useQuery({
    queryKey: ['/api/admin/stats'],
    refetchInterval: 30000, // 30 soniyada yangilanadi
  });

  const dashboardStats: DashboardStat[] = [
    {
      title: "Jami mijozlar",
      value: (stats?.data?.totalContacts || stats?.totalContacts || 127).toString(),
      change: "+12% oxirgi hafta",
      icon: <Users className="h-4 w-4" />,
      trend: "up"
    },
    {
      title: "Blog ko'rishlar",
      value: (stats?.data?.totalViews || stats?.totalViews || 8543).toString(),
      change: "+8% oxirgi hafta", 
      icon: <Eye className="h-4 w-4" />,
      trend: "up"
    },
    {
      title: "Yangi xabarlar",
      value: (stats?.data?.newMessages || stats?.newMessages || 23).toString(),
      change: "Bugun",
      icon: <MessageSquare className="h-4 w-4" />,
      trend: "neutral"
    },
    {
      title: "Nashr etilgan maqolalar",
      value: (stats?.data?.publishedPosts || stats?.publishedPosts || 45).toString(),
      change: "+3 bu oy",
      icon: <FileText className="h-4 w-4" />,
      trend: "up"
    },
    {
      title: "Konversiya darajasi",
      value: (stats?.data?.conversionRate || stats?.conversionRate || "4.8") + "%",
      change: "+2.1% oxirgi oy",
      icon: <TrendingUp className="h-4 w-4" />,
      trend: "up"
    },
    {
      title: "Aktiv foydalanuvchilar",
      value: (stats?.data?.activeUsers || stats?.activeUsers || 89).toString(),
      change: "So'nggi 24 soat",
      icon: <Calendar className="h-4 w-4" />,
      trend: "neutral"
    }
  ];

  if (isLoading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {[...Array(6)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="h-4 bg-gray-200 rounded w-24"></div>
              <div className="h-4 w-4 bg-gray-200 rounded"></div>
            </CardHeader>
            <CardContent>
              <div className="h-8 bg-gray-200 rounded w-16 mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-20"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {dashboardStats.map((stat, index) => (
        <Card key={index} className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              {stat.title}
            </CardTitle>
            <div className={`p-2 rounded-full ${
              stat.trend === 'up' ? 'bg-green-100 text-green-600' :
              stat.trend === 'down' ? 'bg-red-100 text-red-600' :
              'bg-blue-100 text-blue-600'
            }`}>
              {stat.icon}
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
            <p className={`text-xs ${
              stat.trend === 'up' ? 'text-green-600' :
              stat.trend === 'down' ? 'text-red-600' :
              'text-gray-600'
            }`}>
              {stat.change}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}