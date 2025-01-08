import { Stack, Redirect } from 'expo-router';
//import { useAuth } from '../../context/AuthContext';

export default function AdminLayout() {
  const { user } = useAuth();

  if (user?.role !== 'admin') {
    return <Redirect href="/" />;
  }

  return <Stack />;
}
