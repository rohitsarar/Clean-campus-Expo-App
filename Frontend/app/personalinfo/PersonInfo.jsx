import { View, Text, TouchableOpacity, ActivityIndicator, useColorScheme } from 'react-native';
import React, { useState } from 'react';
import { useAuthContext } from '../../context/AuthContext';
import useLogout from '../../hook/uselogout';
import { useRouter } from 'expo-router';

export default function PersonInfo() {
  const { user } = useAuthContext();
  const { logout } = useLogout();
  const router = useRouter();
  const [loading, setLoading] = useState(false); // Loading state for logout
  const theme = useColorScheme(); // Detect system theme

  // Ensure user exists before rendering
  if (!user) {
    return null; // Optionally, render a loading spinner or placeholder
  }

  const handleLogout = async () => {
    setLoading(true); // Set loading state to true
    await logout();
    router.push('/auth/sign-in'); // Navigate to sign-in page
  };

  return (
    <View className={`m-4 flex w-full p-4 rounded-lg shadow-md ml-2 ${
      theme === 'dark' ? 'bg-gray-900' : 'bg-white'
    }`}>
      {/* Header Section */}
      <View className="flex-row items-center mb-4 m-2">
        {/* Profile Image */}
        <View className={`w-12 h-12 rounded-full flex items-center justify-center ${
          theme === 'dark' ? 'bg-gray-700' : 'bg-green-700'
        }`}>
          <Text className="text-white text-lg font-semibold"></Text>
        </View>

        {/* Name and Email */}
        <View className="ml-3">
          <Text className={`text-lg font-semibold ${
            theme === 'dark' ? 'text-white' : 'text-black'
          }`}>{user?.name}</Text>
          <Text className="text-gray-500 text-sm">{user.email}</Text>
        </View>
      </View>

      {/* Additional User Information */}
      <TouchableOpacity className={`py-2 px-4 rounded-md mb-2 ${
        theme === 'dark' ? 'bg-gray-800' : 'bg-gray-200'
      }`}>
        <Text className={`text-gray-700 ${theme === 'dark' ? 'text-white' : ''}`}>
          Class Name: {user.classname}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity className={`py-2 px-4 rounded-md mb-2 ${
        theme === 'dark' ? 'bg-gray-800' : 'bg-gray-200'
      }`}>
        <Text className={`text-gray-700 ${theme === 'dark' ? 'text-white' : ''}`}>
          College Name: L.s Raheja College
        </Text>
      </TouchableOpacity>

      <TouchableOpacity className={`py-2 px-4 rounded-md mb-2 ${
        theme === 'dark' ? 'bg-gray-800' : 'bg-gray-200'
      }`}>
        <Text className={`text-gray-700 ${theme === 'dark' ? 'text-white' : ''}`}>
          Role: {user.role}
        </Text>
      </TouchableOpacity>
      <Text className="text-white text-center text-semibold text-lg"></Text>
      <Text className="text-white text-center text-semibold text-lg"></Text>
      
      {/* Logout Button */}
      <TouchableOpacity onPress={handleLogout} className="bg-red-500 py-2 px-4 rounded-md mt-6">
        {loading ? (
          <ActivityIndicator size="small" color="white" /> // Show loading spinner when logging out
        ) : (
          <Text className="text-white text-center text-semibold text-lg">Logout</Text>
        )}
      </TouchableOpacity>
      <Text className="text-white text-center text-semibold text-lg"></Text>
      <Text className="text-white text-center text-semibold text-lg"></Text>
      <Text className="text-white text-center text-semibold text-lg"></Text>
      <Text className="text-white text-center text-semibold text-lg"></Text>
    </View>
  );
}
