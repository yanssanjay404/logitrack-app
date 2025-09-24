import React, { useState } from 'react';
import { 
  Card, CardContent, CardDescription, CardHeader, CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger 
} from '@/components/ui/dialog';
import { 
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, 
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle 
} from '@/components/ui/alert-dialog';
import { 
  CheckCircle, Clock, MapPin, Plus, User, Car, Fuel, FileText 
} from 'lucide-react';

export const DriverReports = () => {
  const [reportDialogOpen, setReportDialogOpen] = useState(false);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [successDialogOpen, setSuccessDialogOpen] = useState(false);
  const [detailDialogOpen, setDetailDialogOpen] = useState(false);

  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    time: new Date().toTimeString().split(' ')[0].slice(0, 5),
    plateNumber: '',
    fuelQuantity: '',
    location: 'Jakarta Selatan',
    notes: '',
    driverName: 'Driver LogiTrack',
    driverSIM: '1234567890123',
    suratJalan: null as File | null,
    selfie: null as File | null,
  });

  // Mock status
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
    }
  ];

  const StatusBadge = ({ status }: { status: string }) => {
    const variants = {
      approved: 'bg-green-500 text-white',
      pending: 'bg-yellow-500 text-white',
      rejected: 'bg-red-500 text-white'
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
    setDetailDialogOpen(true);
  };

  return (
    <div className="p-4 pb-20 space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-2xl font-bold text-foreground">Report</h1>
        <p className="text-muted-foreground">Buat dan kelola laporan kerja</p>
      </div>

      {/* Status Hari Ini */}
      <Card>
        <CardContent className="p-4">
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <CheckCircle className="h-6 w-6 text-green-500 mx-auto mb-1" />
              <p className="text-sm font-medium">{todayStatus.status}</p>
              <p className="text-xs text-muted-foreground">Status Hari Ini</p>
            </div>
            <div className="text-center">
              <Clock className="h-6 w-6 text-blue-500 mx-auto mb-1" />
              <p className="text-sm font-medium">{todayStatus.lastReport}</p>
              <p className="text-xs text-muted-foreground">Laporan Terakhir</p>
            </div>
            <div className="text-center">
              <MapPin className="h-6 w-6 text-green-500 mx-auto mb-1" />
              <p className="text-sm font-medium">{todayStatus.gpsStatus}</p>
              <p className="text-xs text-muted-foreground">Status GPS</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Riwayat */}
      <Card>
        <CardHeader>
          <CardTitle>Riwayat Laporan</CardTitle>
          <CardDescription>Laporan yang telah Anda submit</CardDescription>
        </CardHeader>
        <CardContent>
          {reports.map((report) => (
            <div key={report.id} className="p-3 bg-muted rounded-lg mb-3">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <p className="font-medium text-sm">{report.date}</p>
                  <p className="text-xs text-muted-foreground">{report.submitTime}</p>
                </div>
                <StatusBadge status={report.status} />
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="flex items-center gap-1"><Car className="h-3 w-3" />{report.plateNumber}</div>
                <div className="flex items-center gap-1"><MapPin className="h-3 w-3" />{report.location}</div>
                <div className="flex items-center gap-1"><Fuel className="h-3 w-3" />{report.fuelQuantity} L</div>
                <div className="flex items-center gap-1">Rp {report.cost.toLocaleString('id-ID')}</div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Form Laporan */}
      <Card>
        <CardHeader>
          <CardTitle>Laporan Kerja Hari Ini</CardTitle>
          <CardDescription>Buat laporan untuk kegiatan kerja hari ini</CardDescription>
        </CardHeader>
        <CardContent>
          <Dialog open={reportDialogOpen} onOpenChange={setReportDialogOpen}>
            <DialogTrigger asChild>
              <Button className="w-full"><Plus className="h-4 w-4 mr-2" />Buat Laporan</Button>
            </DialogTrigger>
            <DialogContent className="max-w-sm mx-auto">
              <DialogHeader>
                <DialogTitle>Buat Laporan Baru</DialogTitle>
                <DialogDescription>Isi form berikut untuk membuat laporan kerja</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                {/* Tanggal & Waktu */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2"><Label>Tanggal</Label><Input type="date" value={formData.date} readOnly className="bg-muted" /></div>
                  <div className="space-y-2"><Label>Waktu</Label><Input type="time" value={formData.time} readOnly className="bg-muted" /></div>
                </div>
                {/* Driver */}
                <div className="space-y-2">
                  <Label>Informasi Driver</Label>
                  <div className="p-3 bg-muted rounded-lg text-sm">
                    {formData.driverName} <br />
                    <span className="text-xs text-muted-foreground">SIM: {formData.driverSIM}</span>
                  </div>
                </div>
                {/* Vehicle */}
                <div className="space-y-2"><Label>Nomor Polisi</Label><Input placeholder="B 1234 XY" value={formData.plateNumber} onChange={(e) => setFormData({...formData, plateNumber: e.target.value})} /></div>
                <div className="space-y-2"><Label>Quantity BBM (Liter)</Label><Input type="number" placeholder="45" value={formData.fuelQuantity} onChange={(e) => setFormData({...formData, fuelQuantity: e.target.value})} /></div>
                {/* GPS */}
                <div className="space-y-2">
                  <Label>Lokasi GPS</Label>
                  <div className="p-3 bg-muted rounded-lg text-sm">
                    {formData.location} <br /><span className="text-xs text-muted-foreground">-6.2088, 106.8456</span>
                  </div>
                </div>
                {/* Foto */}
                <div className="space-y-2"><Label>Foto Surat Jalan</Label><Input type="file" accept="image/*" onChange={(e) => setFormData({...formData, suratJalan: e.target.files?.[0] || null})} /></div>
                <div className="space-y-2"><Label>Foto Selfie</Label><Input type="file" accept="image/*" onChange={(e) => setFormData({...formData, selfie: e.target.files?.[0] || null})} /></div>
                <Button onClick={handleSubmitReport} className="w-full">Submit Laporan</Button>
              </div>
            </DialogContent>
          </Dialog>
        </CardContent>
      </Card>

      {/* Konfirmasi */}
      <AlertDialog open={confirmDialogOpen} onOpenChange={setConfirmDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Konfirmasi Data</AlertDialogTitle>
            <AlertDialogDescription>Apakah data sudah benar? Setelah submit, data tidak dapat diubah.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setReportDialogOpen(true)}>Kembali</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmSubmit}>Ya, Submit</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Success */}
      <AlertDialog open={successDialogOpen} onOpenChange={setSuccessDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-center">
              <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-2" />
              Laporan Berhasil Dikirim!
            </AlertDialogTitle>
            <AlertDialogDescription className="text-center">
              Laporan Anda telah berhasil dikirim dan sedang menunggu review admin.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={handleSuccessClose} className="w-full">OK</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Detail Laporan */}
      <Dialog open={detailDialogOpen} onOpenChange={setDetailDialogOpen}>
        <DialogContent className="max-w-lg mx-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2"><FileText className="h-5 w-5 text-primary" />Detail Laporan</DialogTitle>
            <DialogDescription>Berikut detail laporan yang baru saja Anda buat</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            {/* Info */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 bg-muted rounded-lg text-sm"><span className="text-xs text-muted-foreground">Tanggal</span><br />{formData.date}</div>
              <div className="p-3 bg-muted rounded-lg text-sm"><span className="text-xs text-muted-foreground">Waktu</span><br />{formData.time}</div>
              <div className="p-3 bg-muted rounded-lg text-sm"><span className="text-xs text-muted-foreground">Driver</span><br />{formData.driverName}</div>
              <div className="p-3 bg-muted rounded-lg text-sm"><span className="text-xs text-muted-foreground">SIM</span><br />{formData.driverSIM}</div>
              <div className="p-3 bg-muted rounded-lg text-sm"><span className="text-xs text-muted-foreground">Nomor Polisi</span><br />{formData.plateNumber}</div>
              <div className="p-3 bg-muted rounded-lg text-sm"><span className="text-xs text-muted-foreground">BBM</span><br />{formData.fuelQuantity} L</div>
              <div className="col-span-2 p-3 bg-muted rounded-lg text-sm">
                <span className="text-xs text-muted-foreground">Lokasi</span><br />
                📍 {formData.location}<br />
                <span className="text-xs text-muted-foreground">-6.2088, 106.8456</span>
              </div>
            </div>
            {/* Foto */}
            <div className="space-y-2">
              <p className="text-sm font-medium">Dokumentasi</p>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Surat Jalan</p>
                  {formData.suratJalan ? (
                    <img src={URL.createObjectURL(formData.suratJalan)} alt="Surat Jalan" className="w-full h-28 object-cover rounded-lg border" />
                  ) : <div className="w-full h-28 flex items-center justify-center border rounded-lg text-xs text-muted-foreground">Belum ada foto</div>}
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Selfie</p>
                  {formData.selfie ? (
                    <img src={URL.createObjectURL(formData.selfie)} alt="Selfie" className="w-full h-28 object-cover rounded-lg border" />
                  ) : <div className="w-full h-28 flex items-center justify-center border rounded-lg text-xs text-muted-foreground">Belum ada foto</div>}
                </div>
              </div>
            </div>
          </div>
          <div className="pt-4"><Button onClick={() => setDetailDialogOpen(false)} className="w-full">Tutup</Button></div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
