import { View, Text, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import AntDesign from '@expo/vector-icons/AntDesign';
export default function Posts() {
  return (
    <View className="mb-4 bg-mint rounded-xl overflow-hidden shadow-lg">
      {/* Profile Section */}
      <View className="flex-row items-center p-4">
        <Image 
          source={require('../../assets/images/profile.jpeg')} 
          className="rounded-full" 
          style={{ width: 40, height: 40 }} // Profile image size adjusted
        />
        <View className="ml-4">
          <Text className="text-lg font-semibold">UserName</Text>
          <Text className="text-sm text-gray-500">ClassName</Text>
        </View>
      </View>

      {/* Post Image Section */}
      <View style={{ width: '100%', height: 300 }}> {/* Adjusted height for post image */}
        <Image 
          source={require('../../assets/images/posting.png')} 
          style={{ width: '100%', height: '100%', resizeMode: 'cover' }} // Properly sized and cropped post image
        />
      </View>
      <View>
        <Text className='m-2 p-2 text-black'>Description</Text>
      </View>
      <TouchableOpacity className='m-2'>
      <AntDesign name="like2" size={35} color="black" />
      </TouchableOpacity>
    </View>
  );
}
