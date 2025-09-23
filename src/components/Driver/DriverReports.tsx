import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { 
  CheckCircle, 
  Clock, 
  MapPin,
  Calendar,
  Plus,
  Camera,
  Upload,
  User,
  Car,
  Fuel,
  FileText
} from 'lucide-react';

export const DriverReports = () => {
  const [reportDialogOpen, setReportDialogOpen] = useState(false);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [successDialogOpen, setSuccessDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    time: new Date().toTimeString().split(' ')[0].slice(0, 5),
    plateNumber: '',
    fuelQuantity: '',
    location: '',
    notes: ''
  });

  // Mock data
  const todayStatus = {
    status: 'Aktif',
    lastReport: '14:30',
    gpsStatus: 'Aktif'
  };

  const reports = [
    {
      id: 1,
      date: '2024-01-15',
      plateNumber: 'B 1234 XY',
      location: 'Jakarta Selatan',
      fuelQuantity: 45,
      cost: 675000,
      status: 'approved',
      submitTime: '10:30'
    },
    {
      id: 2,
      date: '2024-01-14',
      plateNumber: 'B 1234 XY',
      location: 'Jakarta Utara',
      fuelQuantity: 50,
      cost: 750000,
      status: 'pending',
      submitTime: '14:20'
    },
    {
      id: 3,
      date: '2024-01-13',
      plateNumber: 'B 1234 XY',
      location: 'Jakarta Timur',
      fuelQuantity: 42,
      cost: 630000,
      status: 'approved',
      submitTime: '09:15'
    }
  ];

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

  const handleSubmitReport = () => {
    setReportDialogOpen(false);
    setConfirmDialogOpen(true);
  };

  const handleConfirmSubmit = () => {
    setConfirmDialogOpen(false);
    setSuccessDialogOpen(true);
  };

  const handleSuccessClose = () => {
    setSuccessDialogOpen(false);
    // Navigate to report detail page would happen here
  };

  return (
    <div className="p-4 pb-20 space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold text-foreground">Report</h1>
        <p className="text-muted-foreground">Buat dan kelola laporan kerja</p>
      </div>

      {/* Status Container */}
      <Card>
        <CardContent className="p-4">
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <CheckCircle className="h-6 w-6 text-success mx-auto mb-1" />
              <p className="text-sm font-medium">{todayStatus.status}</p>
              <p className="text-xs text-muted-foreground">Status Hari Ini</p>
            </div>
            <div className="text-center">
              <Clock className="h-6 w-6 text-primary mx-auto mb-1" />
              <p className="text-sm font-medium">{todayStatus.lastReport}</p>
              <p className="text-xs text-muted-foreground">Laporan Terakhir</p>
            </div>
            <div className="text-center">
              <MapPin className="h-6 w-6 text-success mx-auto mb-1" />
              <p className="text-sm font-medium">{todayStatus.gpsStatus}</p>
              <p className="text-xs text-muted-foreground">Status GPS</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Reports Table */}
      <Card>
        <CardHeader>
          <CardTitle>Riwayat Laporan</CardTitle>
          <CardDescription>Laporan yang telah Anda submit</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {reports.map((report) => (
              <div key={report.id} className="p-3 bg-muted rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="font-medium text-sm">{report.date}</p>
                    <p className="text-xs text-muted-foreground">{report.submitTime}</p>
                  </div>
                  <StatusBadge status={report.status} />
                </div>
                
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="flex items-center gap-1">
                    <Car className="h-3 w-3" />
                    <span>{report.plateNumber}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    <span>{report.location}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Fuel className="h-3 w-3" />
                    <span>{report.fuelQuantity}L</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span>Rp {report.cost.toLocaleString('id-ID')}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Create Report Section */}
      <Card>
        <CardHeader>
          <CardTitle>Laporan Kerja Hari Ini</CardTitle>
          <CardDescription>Buat laporan untuk kegiatan kerja hari ini</CardDescription>
        </CardHeader>
        <CardContent>
          <Dialog open={reportDialogOpen} onOpenChange={setReportDialogOpen}>
            <DialogTrigger asChild>
              <Button className="w-full">
                <Plus className="h-4 w-4 mr-2" />
                Buat Laporan
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-sm mx-auto">
              <DialogHeader>
                <DialogTitle>Buat Laporan Baru</DialogTitle>
                <DialogDescription>
                  Isi form berikut untuk membuat laporan kerja
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-4">
                {/* Auto Date Time */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <Label htmlFor="date">Tanggal</Label>
                    <Input 
                      id="date" 
                      type="date" 
                      value={formData.date}
                      readOnly
                      className="bg-muted"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="time">Waktu</Label>
                    <Input 
                      id="time" 
                      type="time" 
                      value={formData.time}
                      readOnly
                      className="bg-muted"
                    />
                  </div>
                </div>

                {/* Driver Info */}
                <div className="space-y-2">
                  <Label>Informasi Driver</Label>
                  <div className="p-3 bg-muted rounded-lg">
                    <p className="text-sm font-medium">Driver LogiTrack</p>
                    <p className="text-xs text-muted-foreground">SIM: 1234567890123</p>
                  </div>
                </div>

                {/* Vehicle Info */}
                <div className="space-y-2">
                  <Label htmlFor="plateNumber">Nomor Polisi</Label>
                  <Input 
                    id="plateNumber" 
                    placeholder="B 1234 XY"
                    value={formData.plateNumber}
                    onChange={(e) => setFormData({...formData, plateNumber: e.target.value})}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="fuelQuantity">Quantity BBM (Liter)</Label>
                  <Input 
                    id="fuelQuantity" 
                    type="number"
                    placeholder="45"
                    value={formData.fuelQuantity}
                    onChange={(e) => setFormData({...formData, fuelQuantity: e.target.value})}
                  />
                </div>

                {/* Auto GPS Location */}
                <div className="space-y-2">
                  <Label>Lokasi GPS</Label>
                  <div className="p-3 bg-muted rounded-lg">
                    <p className="text-sm">📍 Jakarta Selatan, DKI Jakarta</p>
                    <p className="text-xs text-muted-foreground">-6.2088, 106.8456</p>
                  </div>
                </div>

                {/* Documentation */}
                <div className="space-y-2">
                  <Label>Dokumentasi</Label>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="border-2 border-dashed border-border rounded-lg p-3 text-center">
                      <Camera className="h-6 w-6 mx-auto mb-1 text-muted-foreground" />
                      <p className="text-xs text-muted-foreground">Foto Surat Jalan</p>
                    </div>
                    <div className="border-2 border-dashed border-border rounded-lg p-3 text-center">
                      <User className="h-6 w-6 mx-auto mb-1 text-muted-foreground" />
                      <p className="text-xs text-muted-foreground">Foto Selfie</p>
                    </div>
                  </div>
                </div>

                <Button onClick={handleSubmitReport} className="w-full">
                  Submit Laporan
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </CardContent>
      </Card>

      {/* Confirmation Dialog */}
      <AlertDialog open={confirmDialogOpen} onOpenChange={setConfirmDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Konfirmasi Data</AlertDialogTitle>
            <AlertDialogDescription>
              Apakah data yang Anda isi sudah benar? Setelah disubmit, data tidak dapat diubah.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setReportDialogOpen(true)}>
              Kembali ke Form
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmSubmit}>
              Ya, Submit
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Success Dialog */}
      <AlertDialog open={successDialogOpen} onOpenChange={setSuccessDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-center">
              <CheckCircle className="h-12 w-12 text-success mx-auto mb-2" />
              Laporan Berhasil Dikirim!
            </AlertDialogTitle>
            <AlertDialogDescription className="text-center">
              Laporan Anda telah berhasil dikirim dan sedang menunggu review dari admin.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={handleSuccessClose} className="w-full">
              OK
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};