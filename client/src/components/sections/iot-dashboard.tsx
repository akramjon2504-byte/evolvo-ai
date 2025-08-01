import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Thermometer, 
  Droplet, 
  Zap, 
  Wifi, 
  AlertTriangle, 
  CheckCircle,
  Activity,
  Database,
  Smartphone
} from "lucide-react";
import { useLanguage } from "@/hooks/use-language";
import { FadeIn } from "@/components/ui/fade-in";

interface IoTDevice {
  id: string;
  name: string;
  type: string;
  status: 'online' | 'offline' | 'warning';
  value: number;
  unit: string;
  location: string;
  lastUpdate: string;
}

export function IoTDashboardSection() {
  const { t } = useLanguage();
  const [devices, setDevices] = useState<IoTDevice[]>([
    {
      id: '1',
      name: 'Harorat Sensori',
      type: 'temperature',
      status: 'online',
      value: 24.5,
      unit: '°C',
      location: 'Asosiy ofis',
      lastUpdate: '2 daqiqa oldin'
    },
    {
      id: '2', 
      name: 'Namlik Sensori',
      type: 'humidity',
      status: 'online',
      value: 65,
      unit: '%',
      location: 'Server xonasi',
      lastUpdate: '1 daqiqa oldin'
    },
    {
      id: '3',
      name: 'Energiya O\'lchagich',
      type: 'energy',
      status: 'warning',
      value: 850,
      unit: 'kW',
      location: 'Zavod binosi',
      lastUpdate: '5 daqiqa oldin'
    },
    {
      id: '4',
      name: 'WiFi Router',
      type: 'network',
      status: 'offline',
      value: 0,
      unit: 'Mbps',
      location: '2-qavat',
      lastUpdate: '15 daqiqa oldin'
    }
  ]);

  // Simulate real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setDevices(prev => prev.map(device => ({
        ...device,
        value: device.type === 'temperature' 
          ? Math.round((Math.random() * 5 + 22) * 10) / 10
          : device.type === 'humidity'
          ? Math.round(Math.random() * 20 + 55)
          : device.type === 'energy'
          ? Math.round(Math.random() * 200 + 800)
          : device.value,
        lastUpdate: 'hozir'
      })));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const getDeviceIcon = (type: string) => {
    switch (type) {
      case 'temperature': return Thermometer;
      case 'humidity': return Droplet;
      case 'energy': return Zap;
      case 'network': return Wifi;
      default: return Activity;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'text-green-500';
      case 'warning': return 'text-yellow-500';
      case 'offline': return 'text-red-500';
      default: return 'text-gray-500';
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'online': return <Badge className="bg-green-100 text-green-800">Faol</Badge>;
      case 'warning': return <Badge className="bg-yellow-100 text-yellow-800">Ogohlantirish</Badge>;
      case 'offline': return <Badge className="bg-red-100 text-red-800">Oflayn</Badge>;
      default: return <Badge>Noma'lum</Badge>;
    }
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              📊 IoT Dashboard va Monitoring
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Internet of Things (IoT) qurilmalarini real vaqtda kuzating. 
              Sensorlar, hisobotlar va avtomatik ogohlantirishlar.
            </p>
          </div>
        </FadeIn>

        {/* Live Statistics */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          <Card className="p-6 text-center">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900">12</div>
            <div className="text-gray-600">Faol Qurilmalar</div>
          </Card>

          <Card className="p-6 text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Database className="w-6 h-6 text-blue-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900">2.5GB</div>
            <div className="text-gray-600">Kunlik Ma'lumot</div>
          </Card>

          <Card className="p-6 text-center">
            <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertTriangle className="w-6 h-6 text-yellow-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900">3</div>
            <div className="text-gray-600">Ogohlantirishlar</div>
          </Card>

          <Card className="p-6 text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Activity className="w-6 h-6 text-purple-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900">98.5%</div>
            <div className="text-gray-600">Uptime</div>
          </Card>
        </div>

        {/* Device Grid */}
        <div className="grid lg:grid-cols-2 xl:grid-cols-4 gap-6 mb-12">
          {devices.map((device) => {
            const IconComponent = getDeviceIcon(device.type);
            return (
              <Card key={device.id} className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center`}>
                    <IconComponent className={`w-5 h-5 ${getStatusColor(device.status)}`} />
                  </div>
                  {getStatusBadge(device.status)}
                </div>

                <h3 className="font-semibold text-gray-900 mb-2">{device.name}</h3>
                
                <div className="text-3xl font-bold text-gray-900 mb-1">
                  {device.value}{device.unit}
                </div>

                <div className="text-sm text-gray-600 mb-3">
                  📍 {device.location}
                </div>

                <div className="text-xs text-gray-500 mb-4">
                  Oxirgi yangilanish: {device.lastUpdate}
                </div>

                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${
                      device.status === 'online' ? 'bg-green-500' :
                      device.status === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
                    }`}
                    style={{ 
                      width: device.status === 'online' ? '85%' : 
                             device.status === 'warning' ? '60%' : '20%' 
                    }}
                  ></div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Real-time Chart Simulation */}
        <Card className="p-8 mb-12">
          <h3 className="text-xl font-bold mb-6">Real Vaqt Ma'lumotlar</h3>
          
          <div className="grid lg:grid-cols-2 gap-8">
            <div>
              <h4 className="font-semibold mb-4">Harorat Trendi (24 soat)</h4>
              <div className="h-48 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg flex items-end justify-between p-4">
                {[22, 23, 24, 25, 24, 23, 24, 25, 26, 25, 24, 23].map((temp, index) => (
                  <div
                    key={index}
                    className="bg-blue-500 rounded-t w-6 transition-all duration-300"
                    style={{ height: `${(temp - 20) * 8}px` }}
                    title={`${temp}°C`}
                  ></div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Energiya Iste'moli (Haftalik)</h4>
              <div className="h-48 bg-gradient-to-r from-green-50 to-green-100 rounded-lg flex items-end justify-between p-4">
                {[800, 850, 900, 750, 820, 880, 920].map((energy, index) => (
                  <div
                    key={index}
                    className="bg-green-500 rounded-t w-8 transition-all duration-300"
                    style={{ height: `${(energy - 700) / 10}px` }}
                    title={`${energy}kW`}
                  ></div>
                ))}
              </div>
            </div>
          </div>
        </Card>

        {/* Features and Benefits */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          <div>
            <h3 className="text-2xl font-bold mb-6">IoT Platform Imkoniyatlari</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-evolvo-blue rounded-full flex items-center justify-center">
                  <Smartphone className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Mobile Monitoring</h4>
                  <p className="text-gray-600 text-sm">Har qanday joydan qurilmalarni kuzating</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-evolvo-blue rounded-full flex items-center justify-center">
                  <AlertTriangle className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Avtomatik Ogohlantirishlar</h4>
                  <p className="text-gray-600 text-sm">SMS, email va push bildirishnomalar</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-evolvo-blue rounded-full flex items-center justify-center">
                  <Database className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Ma'lumotlar Tahlili</h4>
                  <p className="text-gray-600 text-sm">AI-powered analytics va bashoratlar</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-evolvo-blue rounded-full flex items-center justify-center">
                  <Activity className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Real-time Dashboard</h4>
                  <p className="text-gray-600 text-sm">Jonli ma'lumotlar va grafiklar</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <Card className="bg-gradient-to-br from-evolvo-blue to-blue-600 text-white p-8">
              <h3 className="text-2xl font-bold mb-6">IoT Yechimlar Narxlari</h3>
              
              <div className="space-y-6">
                <div className="border-b border-blue-300 pb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold">Asosiy IoT Package</span>
                    <span className="text-2xl font-bold">$2,000</span>
                  </div>
                  <ul className="text-sm text-blue-100 space-y-1">
                    <li>• 10 tagacha sensor</li>
                    <li>• Real-time dashboard</li>
                    <li>• Mobile app</li>
                    <li>• 6 oylik qo'llab-quvvatlash</li>
                  </ul>
                </div>

                <div className="border-b border-blue-300 pb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold">Professional IoT</span>
                    <span className="text-2xl font-bold">$4,500</span>
                  </div>
                  <ul className="text-sm text-blue-100 space-y-1">
                    <li>• 50 tagacha sensor</li>
                    <li>• AI analytics</li>
                    <li>• Custom alerts</li>
                    <li>• API integratsiya</li>
                  </ul>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold">Enterprise IoT</span>
                    <span className="text-2xl font-bold">$8,000+</span>
                  </div>
                  <ul className="text-sm text-blue-100 space-y-1">
                    <li>• Cheksiz sensorlar</li>
                    <li>• Custom development</li>
                    <li>• 24/7 monitoring</li>
                    <li>• White-label yechim</li>
                  </ul>
                </div>
              </div>

              <Button className="w-full mt-6 bg-white text-evolvo-blue hover:bg-gray-100">
                Bepul Konsultatsiya
              </Button>
            </Card>
          </div>
        </div>

        {/* Success Stories */}
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-8">Muvaffaqiyatli IoT Loyihalar</h3>
          
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="p-6">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Thermometer className="w-6 h-6 text-green-600" />
              </div>
              <h4 className="font-semibold mb-2">Smart Greenhouse</h4>
              <p className="text-gray-600 text-sm mb-4">
                Issiqxona uchun avtomatik harorat va namlik nazorati. 40% energiya tejash.
              </p>
              <Badge variant="secondary">Qishloq xo'jaligi</Badge>
            </Card>

            <Card className="p-6">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-6 h-6 text-blue-600" />
              </div>
              <h4 className="font-semibold mb-2">Factory Monitoring</h4>
              <p className="text-gray-600 text-sm mb-4">
                Zavodda mashina holati va energiya iste'molini kuzatish. 25% samaradorlik oshishi.
              </p>
              <Badge variant="secondary">Sanoat</Badge>
            </Card>

            <Card className="p-6">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Wifi className="w-6 h-6 text-purple-600" />
              </div>
              <h4 className="font-semibold mb-2">Smart Office</h4>
              <p className="text-gray-600 text-sm mb-4">
                Ofis muhitini avtomatik boshqarish. Yorug'lik, havo va xavfsizlik.
              </p>
              <Badge variant="secondary">Ofis</Badge>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}