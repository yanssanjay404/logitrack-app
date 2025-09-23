import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { BottomNavigation } from '@/components/Layout/BottomNavigation';
import { AdminDashboard } from '@/components/Admin/AdminDashboard';
import { DriverDashboard } from '@/components/Driver/DriverDashboard';
import { AdminReports } from '@/components/Admin/AdminReports';
import { AdminManage } from '@/components/Admin/AdminManage';
import { DriverReports } from '@/components/Driver/DriverReports';
import { ProfilePage } from '@/components/Profile/ProfilePage';

export const MobileDashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');

  if (!user) return null;

  const renderContent = () => {
    if (user.role === 'admin') {
      switch (activeTab) {
        case 'dashboard':
          return <AdminDashboard />;
        case 'report':
          return <AdminReports />;
        case 'manage':
          return <AdminManage />;
        case 'profile':
          return <ProfilePage />;
        default:
          return <AdminDashboard />;
      }
    } else {
      switch (activeTab) {
        case 'dashboard':
          return <DriverDashboard />;
        case 'report':
          return <DriverReports />;
        case 'profile':
          return <ProfilePage />;
        default:
          return <DriverDashboard />;
      }
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {renderContent()}
      <BottomNavigation 
        role={user.role}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />
    </div>
  );
};