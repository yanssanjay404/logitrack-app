import React from 'react';
import { cn } from '@/lib/utils';
import { 
  Home, 
  FileText, 
  Settings, 
  User,
  BarChart3
} from 'lucide-react';
import { UserRole } from '@/contexts/AuthContext';

interface NavigationItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  path: string;
}

const adminNavItems: NavigationItem[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: <Home className="h-5 w-5" />,
    path: '/admin/dashboard'
  },
  {
    id: 'report',
    label: 'Report',
    icon: <FileText className="h-5 w-5" />,
    path: '/admin/report'
  },
  {
    id: 'manage',
    label: 'Manage',
    icon: <Settings className="h-5 w-5" />,
    path: '/admin/manage'
  },
  {
    id: 'profile',
    label: 'Profile',
    icon: <User className="h-5 w-5" />,
    path: '/admin/profile'
  }
];

const driverNavItems: NavigationItem[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: <Home className="h-5 w-5" />,
    path: '/driver/dashboard'
  },
  {
    id: 'report',
    label: 'Report',
    icon: <FileText className="h-5 w-5" />,
    path: '/driver/report'
  },
  {
    id: 'profile',
    label: 'Profile',
    icon: <User className="h-5 w-5" />,
    path: '/driver/profile'
  }
];

interface BottomNavigationProps {
  role: UserRole;
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

export const BottomNavigation: React.FC<BottomNavigationProps> = ({
  role,
  activeTab,
  onTabChange
}) => {
  const navItems = role === 'admin' ? adminNavItems : driverNavItems;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border z-50">
      <div className="flex justify-around items-center h-16 px-2">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onTabChange(item.id)}
            className={cn(
              "flex flex-col items-center justify-center p-2 rounded-lg transition-colors min-w-[60px]",
              activeTab === item.id
                ? "text-primary bg-primary/10"
                : "text-muted-foreground hover:text-foreground hover:bg-muted"
            )}
          >
            {item.icon}
            <span className="text-xs mt-1 font-medium">{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};