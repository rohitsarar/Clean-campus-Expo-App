import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import Navbar from '../../components/Navbar';
import FontAwesome from '@expo/vector-icons/FontAwesome';

import { useRouter } from 'expo-router';

export default function UserHome() {
  const router=useRouter()

  return (
    <View>
      <Navbar />

      <View className="mt-6 mx-2 p-2 bg-white rounded-2xl border">
        <Text className="text-base text-gray-700">
          If you see any trash or dust, click a photo and submit it by tapping the button below.
        </Text>
      </View>

      <TouchableOpacity
        onPress={() => router.push('/components/camera/PhotoClick')} // Navigate to PhotoClick
        style={{ alignItems: 'center', marginTop: 16 }}
      >
        <FontAwesome name="camera" size={30} color="black" />
        <Text className="bg-green-400 text-white font-semibold px-4 py-2 rounded-lg mt-2">
          Take Photo
        </Text>
      </TouchableOpacity>
    </View>
  );
}
