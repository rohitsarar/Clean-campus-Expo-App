import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react'
import Navbar from '../../components/Navbar'
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useRouter } from 'expo-router';



export default function Home() {
  

  const router=useRouter()

  return (
    <View className='bg-mint h-full'>

     <Navbar/>
     
     <View>

      <View className="mt-8 mx-2 p-3 bg-white rounded-2xl border">
        <Text className="text-base text-gray-700 mb-2 ">
          If you see any trash or dust, click a photo and submit it by tapping the button below.
        </Text>
      </View>

      <TouchableOpacity
        onPress={() => router.push('/camera/PhotoClick')} // Navigate to PhotoClick
        style={{ alignItems: 'center', margin: 10,padding:30 }}
      >
        <FontAwesome name="camera" size={40} color="black" />
        <Text className="bg-green-600 text-white font-semibold px-4 py-2 rounded-lg mt-2">
          Take Photo
        </Text>
      </TouchableOpacity>
    </View>

     
    </View>
  )
} 