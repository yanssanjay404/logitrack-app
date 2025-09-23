import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  FileText,
  CheckCircle,
  XCircle,
  Clock,
  Car,
  MapPin,
  Fuel,
  DollarSign,
  User
} from 'lucide-react';

export const AdminReports = () => {
  const [selectedStatus, setSelectedStatus] = useState('all');

  // Mock data
  const reports = [
    {
      id: 1,
      no: 'RPT001',
      driver: 'Ahmad Susanto',
      transportation: 'B 1234 XY - Sedan',
      location: 'Jakarta Selatan',
      fuelQuantity: 45,
      cost: 675000,
      status: 'approved',
      submitTime: '2024-01-15 10:30'
    },
    {
      id: 2,
      no: 'RPT002',
      driver: 'Budi Prakoso',
      transportation: 'B 5678 AB - Truck',
      location: 'Jakarta Utara',
      fuelQuantity: 120,
      cost: 1800000,
      status: 'pending',
      submitTime: '2024-01-15 09:15'
    },
    {
      id: 3,
      no: 'RPT003',
      driver: 'Chandra Wijaya',
      transportation: 'B 9012 CD - Van',
      location: 'Jakarta Timur',
      fuelQuantity: 65,
      cost: 975000,
      status: 'rejected',
      submitTime: '2024-01-15 08:45'
    },
    {
      id: 4,
      no: 'RPT004',
      driver: 'Dedi Kurniawan',
      transportation: 'B 3456 EF - Sedan',
      location: 'Jakarta Barat',
      fuelQuantity: 50,
      cost: 750000,
      status: 'approved',
      submitTime: '2024-01-14 16:20'
    },
    {
      id: 5,
      no: 'RPT005',
      driver: 'Eko Prasetyo',
      transportation: 'B 7890 GH - Truck',
      location: 'Jakarta Pusat',
      fuelQuantity: 110,
      cost: 1650000,
      status: 'pending',
      submitTime: '2024-01-14 14:10'
    }
  ];

  const approvedReports = reports.filter(r => r.status === 'approved');
  const rejectedReports = reports.filter(r => r.status === 'rejected');
  const pendingReports = reports.filter(r => r.status === 'pending');

  const StatusBadge = ({ status }: { status: string }) => {
    const variants = {
      approved: 'bg-success text-success-foreground',
      pending: 'bg-warning text-warning-foreground',
      rejected: 'bg-destructive text-destructive-foreground'
    };
    
    const labels = {
      approved: 'Disetujui',
      pending: 'Menunggu',
      rejected: 'Ditolak'
    };
    
    return (
      <Badge className={variants[status as keyof typeof variants]}>
        {labels[status as keyof typeof labels]}
      </Badge>
    );
  };

  const ReportCard = ({ report }: { report: any }) => (
    <Card className="mb-4">
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-3">
          <div>
            <p className="font-semibold text-sm">{report.no}</p>
            <p className="text-xs text-muted-foreground">{report.submitTime}</p>
          </div>
          <StatusBadge status={report.status} />
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <User className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">{report.driver}</span>
          </div>
          
          <div className="flex items-center gap-2">
            <Car className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">{report.transportation}</span>
          </div>
          
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">{report.location}</span>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mt-3">
            <div className="flex items-center gap-2">
              <Fuel className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">{report.fuelQuantity}L</span>
            </div>
            <div className="flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">Rp {report.cost.toLocaleString('id-ID')}</span>
            </div>
          </div>
        </div>

        {report.status === 'pending' && (
          <div className="flex gap-2 mt-4">
            <Button size="sm" className="flex-1">
              <CheckCircle className="h-4 w-4 mr-1" />
              Setujui
            </Button>
            <Button size="sm" variant="destructive" className="flex-1">
              <XCircle className="h-4 w-4 mr-1" />
              Tolak
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );

  return (
    <div className="p-4 pb-20 space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold text-foreground">Reports</h1>
        <p className="text-muted-foreground">Kelola laporan dari driver</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-3 gap-3">
        <Card>
          <CardContent className="p-3 text-center">
            <CheckCircle className="h-6 w-6 text-success mx-auto mb-1" />
            <p className="text-lg font-bold">{approvedReports.length}</p>
            <p className="text-xs text-muted-foreground">Disetujui</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-3 text-center">
            <Clock className="h-6 w-6 text-warning mx-auto mb-1" />
            <p className="text-lg font-bold">{pendingReports.length}</p>
            <p className="text-xs text-muted-foreground">Pending</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-3 text-center">
            <XCircle className="h-6 w-6 text-destructive mx-auto mb-1" />
            <p className="text-lg font-bold">{rejectedReports.length}</p>
            <p className="text-xs text-muted-foreground">Ditolak</p>
          </CardContent>
        </Card>
      </div>

      {/* Reports Tabs */}
      <Tabs defaultValue="all" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">Semua</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="approved">Disetujui</TabsTrigger>
          <TabsTrigger value="rejected">Ditolak</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <div className="space-y-3">
            {reports.map((report) => (
              <ReportCard key={report.id} report={report} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="pending" className="space-y-4">
          <div className="space-y-3">
            {pendingReports.map((report) => (
              <ReportCard key={report.id} report={report} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="approved" className="space-y-4">
          <div className="space-y-3">
            {approvedReports.map((report) => (
              <ReportCard key={report.id} report={report} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="rejected" className="space-y-4">
          <div className="space-y-3">
            {rejectedReports.map((report) => (
              <ReportCard key={report.id} report={report} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};