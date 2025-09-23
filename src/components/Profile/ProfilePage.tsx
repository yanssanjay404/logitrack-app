import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { useAuth } from '@/contexts/AuthContext';
import { 
  User,
  Edit,
  LogOut,
  HelpCircle,
  Phone,
  Mail,
  MapPin,
  Calendar
} from 'lucide-react';

export const ProfilePage = () => {
  const { user, logout } = useAuth();
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  const handleLogout = () => {
    logout();
  };

  const EditProfileForm = () => (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="editName">Nama Lengkap</Label>
        <Input id="editName" defaultValue={user?.name} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="editEmail">Email</Label>
        <Input id="editEmail" type="email" defaultValue={user?.email} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="editPhone">No. Telepon</Label>
        <Input id="editPhone" placeholder="08123456789" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="editAddress">Alamat</Label>
        <Input id="editAddress" placeholder="Alamat lengkap" />
      </div>
      <Button className="w-full" onClick={() => setEditDialogOpen(false)}>
        Simpan Perubahan
      </Button>
    </div>
  );

  const faqData = [
    {
      question: "Bagaimana cara membuat laporan?",
      answer: "Untuk membuat laporan, buka tab Report dan klik tombol 'Buat Laporan'. Isi semua field yang diperlukan dan upload dokumentasi yang diminta."
    },
    {
      question: "Mengapa laporan saya ditolak?",
      answer: "Laporan bisa ditolak karena data tidak lengkap, dokumentasi tidak jelas, atau tidak sesuai dengan kebijakan perusahaan. Hubungi admin untuk informasi lebih detail."
    },
    {
      question: "Bagaimana cara mengubah password?",
      answer: "Anda bisa mengubah password melalui halaman profile dengan klik tombol 'Edit Profile' dan pilih opsi ubah password."
    },
    {
      question: "Siapa yang bisa dihubungi jika ada masalah?",
      answer: "Anda bisa menghubungi admin LogiTrack melalui email admin@logitrack.com atau telepon +62-21-1234567."
    }
  ];

  return (
    <div className="p-4 pb-20 space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold text-foreground">Profile</h1>
        <p className="text-muted-foreground">Kelola informasi akun Anda</p>
      </div>

      {/* Profile Card */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
              <User className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-semibold">{user?.name}</h2>
              <p className="text-muted-foreground">{user?.email}</p>
              <p className="text-sm text-primary capitalize">{user?.role}</p>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">{user?.email}</span>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">+62 812 3456 7890</span>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">Jakarta, Indonesia</span>
            </div>
            <div className="flex items-center gap-3">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">Bergabung sejak Januari 2024</span>
            </div>
          </div>

          <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
            <DialogTrigger asChild>
              <Button className="w-full mt-6">
                <Edit className="h-4 w-4 mr-2" />
                Edit Profile
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit Profile</DialogTitle>
                <DialogDescription>
                  Perbarui informasi profile Anda
                </DialogDescription>
              </DialogHeader>
              <EditProfileForm />
            </DialogContent>
          </Dialog>
        </CardContent>
      </Card>

      {/* FAQ Section (for Driver role) */}
      {user?.role === 'driver' && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HelpCircle className="h-5 w-5" />
              FAQ
            </CardTitle>
            <CardDescription>
              Pertanyaan yang sering ditanyakan
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              {faqData.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent>
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>
      )}

      {/* Account Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Pengaturan Akun</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <Button variant="outline" className="w-full justify-start">
              <User className="h-4 w-4 mr-2" />
              Ubah Password
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <HelpCircle className="h-4 w-4 mr-2" />
              Bantuan & Dukungan
            </Button>
            <Button 
              variant="destructive" 
              className="w-full justify-start"
              onClick={handleLogout}
            >
              <LogOut className="h-4 w-4 mr-2" />
              Log Out
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};