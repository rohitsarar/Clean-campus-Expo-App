import { View, Text, TouchableOpacity } from 'react-native';
import React, { useEffect } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';

export default function Navbar() {
  const router = useRouter();

  return (
    <View className="bg-white h-20 flex-row items-center justify-between px-4">
      {/* User Name */}
      <Text className="text-lg text-green-600 font-semibold shadow-sm">Clean-Campus</Text>

      {/* Notification Button */}
      <TouchableOpacity
  onPress={() => {
    console.log('Navigating to NotificationStore');
    router.push('/natificationstore/NotificationStore');
  }}
  className="border p-1"
>
        <Ionicons name="notifications-outline" size={25} color="black" />
      </TouchableOpacity>
    </View>
  );
}
