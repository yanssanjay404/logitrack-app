import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  CheckCircle, 
  Clock, 
  Car,
  MapPin,
  Calendar,
  Fuel,
  DollarSign
} from 'lucide-react';

export const DriverDashboard = () => {
  // Mock data
  const todayStatus = {
    reportsSubmitted: 2,
    status: 'active',
    lastReport: '14:30'
  };

  const recentReports = [
    {
      id: 1,
      plateNumber: 'B 1234 XY',
      vehicleType: 'Sedan',
      location: 'Jakarta Selatan',
      lastSubmitted: '2 jam lalu',
      fuelQuantity: 45,
      cost: 675000,
      status: 'approved'
    },
    {
      id: 2,
      plateNumber: 'B 5678 AB',
      vehicleType: 'Truck',
      location: 'Jakarta Utara',
      lastSubmitted: '4 jam lalu',
      fuelQuantity: 120,
      cost: 1800000,
      status: 'pending'
    },
    {
      id: 3,
      plateNumber: 'B 9012 CD',
      vehicleType: 'Van',
      location: 'Jakarta Timur',
      lastSubmitted: '1 hari lalu',
      fuelQuantity: 65,
      cost: 975000,
      status: 'approved'
    }
  ];

  const approvedReports = recentReports.filter(r => r.status === 'approved');
  const pendingReports = recentReports.filter(r => r.status === 'pending');

  const StatusBadge = ({ status }: { status: string }) => {
    const variants = {
      approved: 'bg-success text-success-foreground',
      pending: 'bg-warning text-warning-foreground',
      rejected: 'bg-destructive text-destructive-foreground'
    };
    
    return (
      <Badge className={variants[status as keyof typeof variants]}>
        {status === 'approved' ? 'Disetujui' : status === 'pending' ? 'Menunggu' : 'Ditolak'}
      </Badge>
    );
  };

  return (
    <div className="p-4 pb-20 space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold text-foreground">Dashboard Driver</h1>
        <p className="text-muted-foreground">Kelola laporan kerja Anda</p>
      </div>

      {/* Today Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-success" />
            Status Hari Ini
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-primary">{todayStatus.reportsSubmitted}</p>
              <p className="text-xs text-muted-foreground">Laporan Dikirim</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-success">Aktif</p>
              <p className="text-xs text-muted-foreground">Status Hari Ini</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-foreground">{todayStatus.lastReport}</p>
              <p className="text-xs text-muted-foreground">Laporan Terakhir</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Today Report & Pending/Approved */}
      <div className="grid grid-cols-2 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Clock className="h-6 w-6 text-warning" />
              <div>
                <p className="text-xl font-bold">{pendingReports.length}</p>
                <p className="text-xs text-muted-foreground">Laporan Pending</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-6 w-6 text-success" />
              <div>
                <p className="text-xl font-bold">{approvedReports.length}</p>
                <p className="text-xs text-muted-foreground">Laporan Approved</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Reports */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Reports</CardTitle>
          <CardDescription>Laporan kerja terbaru Anda</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentReports.map((report) => (
              <div key={report.id} className="p-4 bg-muted rounded-lg space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Car className="h-4 w-4 text-primary" />
                    <span className="font-medium text-sm">{report.plateNumber}</span>
                    <Badge variant="outline" className="text-xs">
                      {report.vehicleType}
                    </Badge>
                  </div>
                  <StatusBadge status={report.status} />
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    <span>{report.location}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    <span>{report.lastSubmitted}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Fuel className="h-3 w-3" />
                    <span>{report.fuelQuantity}L</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <DollarSign className="h-3 w-3" />
                    <span>Rp {report.cost.toLocaleString('id-ID')}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};