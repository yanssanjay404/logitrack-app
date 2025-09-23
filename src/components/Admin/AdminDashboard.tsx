import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  FileText, 
  Clock, 
  Fuel,
  TrendingUp,
  AlertCircle,
  Download,
  FileSpreadsheet
} from 'lucide-react';

export const AdminDashboard = () => {
  // Mock data
  const stats = {
    totalDrivers: 24,
    totalReports: 156,
    pendingReviews: 8,
    totalFuel: 1250
  };

  const recentReports = [
    { id: 1, driver: 'Ahmad Susanto', vehicle: 'B 1234 XY', location: 'Jakarta Selatan', status: 'approved', time: '10:30' },
    { id: 2, driver: 'Budi Prakoso', vehicle: 'B 5678 AB', location: 'Jakarta Utara', status: 'pending', time: '09:15' },
    { id: 3, driver: 'Chandra Wijaya', vehicle: 'B 9012 CD', location: 'Jakarta Timur', status: 'rejected', time: '08:45' },
  ];

  const StatusBadge = ({ status }: { status: string }) => {
    const variants = {
      approved: 'bg-success text-success-foreground',
      pending: 'bg-warning text-warning-foreground',
      rejected: 'bg-destructive text-destructive-foreground'
    };
    
    return (
      <Badge className={variants[status as keyof typeof variants]}>
        {status}
      </Badge>
    );
  };

  return (
    <div className="p-4 pb-20 space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold text-foreground">Dashboard Admin</h1>
        <p className="text-muted-foreground">Kelola sistem LogiTrack dengan mudah</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Users className="h-8 w-8 text-primary" />
              <div>
                <p className="text-2xl font-bold">{stats.totalDrivers}</p>
                <p className="text-sm text-muted-foreground">Total Sopir</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <FileText className="h-8 w-8 text-primary" />
              <div>
                <p className="text-2xl font-bold">{stats.totalReports}</p>
                <p className="text-sm text-muted-foreground">Total Laporan</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Clock className="h-8 w-8 text-warning" />
              <div>
                <p className="text-2xl font-bold">{stats.pendingReviews}</p>
                <p className="text-sm text-muted-foreground">Pending Review</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Fuel className="h-8 w-8 text-primary" />
              <div>
                <p className="text-2xl font-bold">{stats.totalFuel}L</p>
                <p className="text-sm text-muted-foreground">Total Fuel</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Weekly Fuel Distribution Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Weekly Fuel Distribution
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-32 bg-muted rounded-lg flex items-center justify-center">
            <p className="text-muted-foreground">Chart Placeholder</p>
          </div>
        </CardContent>
      </Card>

      {/* Report Status Distribution */}
      <Card>
        <CardHeader>
          <CardTitle>Report Status Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm">Approved</span>
              <div className="flex items-center gap-2">
                <div className="w-20 h-2 bg-success rounded-full"></div>
                <span className="text-sm font-medium">72%</span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Pending</span>
              <div className="flex items-center gap-2">
                <div className="w-12 h-2 bg-warning rounded-full"></div>
                <span className="text-sm font-medium">20%</span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Rejected</span>
              <div className="flex items-center gap-2">
                <div className="w-4 h-2 bg-destructive rounded-full"></div>
                <span className="text-sm font-medium">8%</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Reports */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Reports</CardTitle>
          <CardDescription>Laporan terbaru dari driver</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentReports.map((report) => (
              <div key={report.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <div className="space-y-1">
                  <p className="font-medium text-sm">{report.driver}</p>
                  <p className="text-xs text-muted-foreground">{report.vehicle} • {report.location}</p>
                  <p className="text-xs text-muted-foreground">{report.time}</p>
                </div>
                <StatusBadge status={report.status} />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Performance Metrics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Performance Metrics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-success">94%</p>
              <p className="text-sm text-muted-foreground">On-time Rate</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-primary">8.2L</p>
              <p className="text-sm text-muted-foreground">Avg Fuel/Day</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Alerts & Notifications */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-warning" />
            Alerts & Notifications
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex items-center gap-3 p-2 bg-warning/10 rounded-lg">
              <AlertCircle className="h-4 w-4 text-warning" />
              <span className="text-sm">8 laporan menunggu review</span>
            </div>
            <div className="flex items-center gap-3 p-2 bg-success/10 rounded-lg">
              <AlertCircle className="h-4 w-4 text-success" />
              <span className="text-sm">Semua kendaraan dalam kondisi baik</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Export Reports */}
      <Card>
        <CardHeader>
          <CardTitle>Export Reports</CardTitle>
          <CardDescription>Download laporan dalam format pilihan Anda</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-3">
            <Button variant="outline" className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Export PDF
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <FileSpreadsheet className="h-4 w-4" />
              Export Excel
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};