import { Stack, Redirect } from 'expo-router';
//import { useAuth } from '../../context/AuthContext';

export default function UserLayout() {
  const { user } = useAuth();

  if (user?.role !== 'peon') {
    return <Redirect href="/" />;
  }

  return <Stack />;
}
