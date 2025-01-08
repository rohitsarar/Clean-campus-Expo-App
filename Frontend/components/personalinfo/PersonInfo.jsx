import { View, Text, Image, TouchableOpacity } from 'react-native';
import React from 'react';

export default function PersonInfo() {
  return (
    <View className="m-4 flex bg-white w-full p-4 rounded-lg shadow-md ">
      {/* Header Section */}
      <View className="flex-row items-center mb-4">
        {/* Profile Image */}
        <View className="w-12 h-12 rounded-full bg-green-700 flex items-center justify-center">
          <Text className="text-white text-lg font-semibold">R</Text>
        </View>

        {/* Name and Email */}
        <View className="ml-3">
          <Text className="text-lg font-semibold">Rohit Gupta</Text>
          <Text className="text-gray-500 text-sm">rohitgupta280504@gmail.com</Text>
        </View>
      </View>

      {/* Action Buttons */}
      <TouchableOpacity className="bg-gray-200 py-2 px-4 rounded-md mb-2">
        <Text className="text-gray-700">Class Name:</Text>
      </TouchableOpacity>

      <TouchableOpacity className="bg-gray-200 py-2 px-4 rounded-md mb-2">
        <Text className="text-gray-700">College Name:</Text>
      </TouchableOpacity>

      <TouchableOpacity className="bg-gray-200 py-2 px-4 rounded-md">
        <Text className="text-gray-700">Roll No:</Text>
      </TouchableOpacity>

      <TouchableOpacity className="bg-gray-200 py-2 px-4 rounded-md mt-2">
        <Text className="text-gray-700">Role:</Text>
      </TouchableOpacity>

      <TouchableOpacity className="bg-gray-200 py-2 px-4 rounded-md mt-2">
        <Text className="text-gray-700 text-center p-2">Logout</Text>
      </TouchableOpacity>
      <TouchableOpacity className="bg-white py-2 px-4 rounded-md mt-2">
        <Text className="text-white text-center">.</Text>
      </TouchableOpacity>
      <TouchableOpacity className="bg-white py-2 px-4 rounded-md mt-2">
        <Text className="text-white text-center">.</Text>
      </TouchableOpacity>
      <TouchableOpacity className="bg-white py-2 px-4 rounded-md mt-2">
        <Text className="text-white text-center">.</Text>
      </TouchableOpacity>
      <TouchableOpacity className="bg-white py-2 px-4 rounded-md mt-2">
        <Text className="text-white text-center">.</Text>
      </TouchableOpacity>
      <TouchableOpacity className="bg-white py-2 px-4 rounded-md mt-2">
        <Text className="text-white text-center">.</Text>
      </TouchableOpacity>

    </View>
  );
}
