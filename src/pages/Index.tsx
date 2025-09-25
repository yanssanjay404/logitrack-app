import { useAuth } from '@/contexts/AuthContext';
import { LoginForm } from '@/components/Auth/LoginForm';
import { MobileDashboard } from '@/components/Mobile/MobileDashboard';

//index
const Index = () => {
  const { user } = useAuth();

  if (!user) {
    return <LoginForm />;
  }

  return <MobileDashboard />;
};

export default Index;
