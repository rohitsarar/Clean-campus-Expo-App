// import { Stack, Redirect } from 'expo-router';
// //import { useAuth } from '../../context/AuthContext';

// export default function AdminLayout() {
//   const { user } = useAuth();

//   if (user?.role == 'admin') {
//     return <Redirect href="/" />;
//   }

//   return <Stack />;
// }

import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import AdminHome from '../admindesktop/AdminHome'
import useLogout from '../../hook/uselogout';
import { useRouter } from 'expo-router';
const AdminLayout = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const {logout}=useLogout();
const router=useRouter();


  // Toggle the menu visibility
  const toggleMenu = () => {
    setMenuVisible((prev) => !prev);
  };

  const handleLogout = async () => {
    await logout();

    // Navigate to /app/auth/sign-in after successful logout
   router.push('/auth/sign-in');
  };

  

  return (
    <View className="flex-1 bg-mint w-full">
      {/* Header Section */}
      <View className="flex-row items-center justify-between bg-back h-12 px-4 relative">
        <Text className="text-white font-bold text-lg">Admin Dashboard</Text>
        {/* Three-dot menu */}
        <TouchableOpacity onPress={toggleMenu}>
          <Text className="text-white font-bold text-xl">⋮</Text>
        </TouchableOpacity>
      </View>

      {/* Dropdown menu */}
      {menuVisible && (
        <View
          className="absolute bg-white shadow-lg rounded-md right-4 top-16 z-10 border border-gray-200"
          style={{ minWidth: 120 }}
        >
          <TouchableOpacity
            onPress={handleLogout}
            className="px-4 py-2"
          >
            <Text className="text-red-500">Logout</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Render the AdminHome component */}
     <AdminHome/>
    </View>
  );
};

export default AdminLayout;
