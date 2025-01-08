import { View, Text, ScrollView } from 'react-native';
import React from 'react'
import Posts from '../posts/Posts';

export default function Messages() {
  return (
    <View className="bg-mint h-full">
      <View>
      <Text className="h-10 p-2 text-lg font-semibold bg-white">Clean Campus</Text>
      </View>
      {/* Add ScrollView here */}
      <ScrollView>
        <Posts />
        <Posts />
        <Posts />
        {/* Add as many Posts as needed */}
      </ScrollView>
    </View>
  );
}
