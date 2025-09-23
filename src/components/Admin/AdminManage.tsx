import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Car,
  Users,
  Plus,
  Edit,
  Trash2,
  CheckCircle,
  XCircle,
  Upload
} from 'lucide-react';

export const AdminManage = () => {
  const [vehicleDialogOpen, setVehicleDialogOpen] = useState(false);
  const [employeeDialogOpen, setEmployeeDialogOpen] = useState(false);

  // Mock data
  const vehicles = [
    { id: 1, plateNumber: 'B 1234 XY', type: 'Sedan', status: 'active', driver: 'Ahmad Susanto' },
    { id: 2, plateNumber: 'B 5678 AB', type: 'Truck', status: 'active', driver: 'Budi Prakoso' },
    { id: 3, plateNumber: 'B 9012 CD', type: 'Van', status: 'inactive', driver: null },
    { id: 4, plateNumber: 'B 3456 EF', type: 'Sedan', status: 'active', driver: 'Dedi Kurniawan' },
  ];

  const employees = [
    { id: 1, name: 'Ahmad Susanto', email: 'ahmad@logitrack.com', status: 'active', vehicle: 'B 1234 XY' },
    { id: 2, name: 'Budi Prakoso', email: 'budi@logitrack.com', status: 'active', vehicle: 'B 5678 AB' },
    { id: 3, name: 'Chandra Wijaya', email: 'chandra@logitrack.com', status: 'inactive', vehicle: null },
    { id: 4, name: 'Dedi Kurniawan', email: 'dedi@logitrack.com', status: 'active', vehicle: 'B 3456 EF' },
  ];

  const activeVehicles = vehicles.filter(v => v.status === 'active');
  const inactiveVehicles = vehicles.filter(v => v.status === 'inactive');
  const activeEmployees = employees.filter(e => e.status === 'active');
  const inactiveEmployees = employees.filter(e => e.status === 'inactive');

  const StatusBadge = ({ status }: { status: string }) => (
    <Badge className={status === 'active' ? 'bg-success text-success-foreground' : 'bg-muted text-muted-foreground'}>
      {status === 'active' ? 'Aktif' : 'Tidak Aktif'}
    </Badge>
  );

  const VehicleForm = () => (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="plateNumber">Nomor Polisi</Label>
        <Input id="plateNumber" placeholder="B 1234 XY" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="vehicleType">Tipe Kendaraan</Label>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Pilih tipe kendaraan" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="sedan">Sedan</SelectItem>
            <SelectItem value="truck">Truck</SelectItem>
            <SelectItem value="van">Van</SelectItem>
            <SelectItem value="motorcycle">Motor</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="status">Status</Label>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Pilih status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="active">Aktif</SelectItem>
            <SelectItem value="inactive">Tidak Aktif</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Button className="w-full" onClick={() => setVehicleDialogOpen(false)}>
        Simpan Kendaraan
      </Button>
    </div>
  );

  const EmployeeForm = () => (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="employeeName">Nama Lengkap</Label>
        <Input id="employeeName" placeholder="Nama driver" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="employeeEmail">Email</Label>
        <Input id="employeeEmail" type="email" placeholder="email@domain.com" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="employeePhone">No. Telepon</Label>
        <Input id="employeePhone" placeholder="08123456789" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="employeeStatus">Status</Label>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Pilih status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="active">Aktif</SelectItem>
            <SelectItem value="inactive">Tidak Aktif</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label>Upload Dokumen Verifikasi</Label>
        <div className="border-2 border-dashed border-border rounded-lg p-4 text-center">
          <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
          <p className="text-sm text-muted-foreground">Klik untuk upload dokumen</p>
          <p className="text-xs text-muted-foreground">SIM, KTP, atau dokumen lainnya</p>
        </div>
      </div>
      <Button className="w-full" onClick={() => setEmployeeDialogOpen(false)}>
        Simpan Employee
      </Button>
    </div>
  );

  return (
    <div className="p-4 pb-20 space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold text-foreground">Manage</h1>
        <p className="text-muted-foreground">Kelola kendaraan dan employee</p>
      </div>

      <Tabs defaultValue="vehicles" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="vehicles">Kendaraan</TabsTrigger>
          <TabsTrigger value="employees">Employee</TabsTrigger>
        </TabsList>

        <TabsContent value="vehicles" className="space-y-4">
          {/* Vehicle Stats */}
          <div className="grid grid-cols-2 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <CheckCircle className="h-6 w-6 text-success mx-auto mb-1" />
                <p className="text-xl font-bold">{activeVehicles.length}</p>
                <p className="text-sm text-muted-foreground">Kendaraan Aktif</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <XCircle className="h-6 w-6 text-muted-foreground mx-auto mb-1" />
                <p className="text-xl font-bold">{inactiveVehicles.length}</p>
                <p className="text-sm text-muted-foreground">Tidak Aktif</p>
              </CardContent>
            </Card>
          </div>

          {/* Add Vehicle Button */}
          <Dialog open={vehicleDialogOpen} onOpenChange={setVehicleDialogOpen}>
            <DialogTrigger asChild>
              <Button className="w-full">
                <Plus className="h-4 w-4 mr-2" />
                Tambah Kendaraan
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Tambah Kendaraan Baru</DialogTitle>
                <DialogDescription>
                  Isi form berikut untuk menambah kendaraan baru
                </DialogDescription>
              </DialogHeader>
              <VehicleForm />
            </DialogContent>
          </Dialog>

          {/* Vehicles List */}
          <div className="space-y-3">
            {vehicles.map((vehicle) => (
              <Card key={vehicle.id}>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center gap-2">
                      <Car className="h-5 w-5 text-primary" />
                      <div>
                        <p className="font-semibold">{vehicle.plateNumber}</p>
                        <p className="text-sm text-muted-foreground">{vehicle.type}</p>
                      </div>
                    </div>
                    <StatusBadge status={vehicle.status} />
                  </div>
                  
                  {vehicle.driver && (
                    <p className="text-sm text-muted-foreground mb-3">
                      Driver: {vehicle.driver}
                    </p>
                  )}

                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="flex-1">
                      <Edit className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                    <Button size="sm" variant="destructive" className="flex-1">
                      <Trash2 className="h-4 w-4 mr-1" />
                      Hapus
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="employees" className="space-y-4">
          {/* Employee Stats */}
          <div className="grid grid-cols-2 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <CheckCircle className="h-6 w-6 text-success mx-auto mb-1" />
                <p className="text-xl font-bold">{activeEmployees.length}</p>
                <p className="text-sm text-muted-foreground">Employee Aktif</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <XCircle className="h-6 w-6 text-muted-foreground mx-auto mb-1" />
                <p className="text-xl font-bold">{inactiveEmployees.length}</p>
                <p className="text-sm text-muted-foreground">Tidak Aktif</p>
              </CardContent>
            </Card>
          </div>

          {/* Add Employee Button */}
          <Dialog open={employeeDialogOpen} onOpenChange={setEmployeeDialogOpen}>
            <DialogTrigger asChild>
              <Button className="w-full">
                <Plus className="h-4 w-4 mr-2" />
                Tambah Employee
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Tambah Employee Baru</DialogTitle>
                <DialogDescription>
                  Isi form berikut untuk menambah employee baru
                </DialogDescription>
              </DialogHeader>
              <EmployeeForm />
            </DialogContent>
          </Dialog>

          {/* Employees List */}
          <div className="space-y-3">
            {employees.map((employee) => (
              <Card key={employee.id}>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center gap-2">
                      <Users className="h-5 w-5 text-primary" />
                      <div>
                        <p className="font-semibold">{employee.name}</p>
                        <p className="text-sm text-muted-foreground">{employee.email}</p>
                      </div>
                    </div>
                    <StatusBadge status={employee.status} />
                  </div>
                  
                  {employee.vehicle && (
                    <p className="text-sm text-muted-foreground mb-3">
                      Kendaraan: {employee.vehicle}
                    </p>
                  )}

                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="flex-1">
                      <Edit className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                    <Button size="sm" variant="destructive" className="flex-1">
                      <Trash2 className="h-4 w-4 mr-1" />
                      Hapus
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};