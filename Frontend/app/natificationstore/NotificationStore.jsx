import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import React from 'react';
import { useNavigation } from 'expo-router';


export default function NotificationStore() {
  const navigation = useNavigation();

  // Set the header title
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: 'Notification',
      headerStyle: {
        backgroundColor: 'white',
      },
      headerTintColor: 'green',
    });
  }, [navigation]);

  return (
    <View className='flex-1 bg-mint'> {/* Container */}
      {/* Tabs */}
      <View className='flex-row bg-mint p-2 justify-center'>
        <TouchableOpacity className='px-4 py-2 bg-black rounded-full mr-2'>
          <Text className='text-white font-bold'>All</Text>
        </TouchableOpacity>
        <TouchableOpacity className='px-4 py-2 bg-gray-200 rounded-full'>
          <Text className='text-gray-500'>Mentions</Text>
        </TouchableOpacity>
      </View>

      {/* Section Title */}
      <View className='p-3'>
        <Text className='text-gray-500 text-sm'>This Week</Text>
      </View>

      {/* Notifications List */}
      <ScrollView>
        {notifications.map((item, index) => (
          <View key={index} className='flex-row items-center bg-white my-1 p-2 rounded-lg mx-2 shadow-md'>
            {/* Profile Icon */}
            <View className='w-10 h-10 rounded-full bg-green-500 justify-center items-center mr-3'>
              <Text className='text-white font-bold'>{item.initial}</Text>
            </View>

            {/* Notification Content */}
            <View className='flex-1'>
              <Text className='text-sm font-bold mb-1'>{item.title}</Text>
              <Text className='text-xs text-gray-500'>{item.time}</Text>
            </View>

            {/* Thumbnail */}
            <Image source={{ uri: item.image }} className='w-15 h-10 rounded' />
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const notifications = [
  {
    initial: 'Z',
    title: 'Recommended: Fateh - Official Trailer | Sonu Sood | Jacqueline Fernandez',
    time: '1 day ago',
    image: '', // Replace with actual image URL
  },
  {
    initial: 'O',
    title: 'Recommended: Tech Placement & Internship preparation',
    time: '2 days ago',
    image: 'https://via.placeholder.com/100x60',
  },
  {
    initial: 'S',
    title: 'Recommended: Superman | Official Teaser Trailer',
    time: '2 days ago',
    image: 'https://via.placeholder.com/100x60',
  },
  {
    initial: 'S',
    title: 'Recommended: Sikandar - New Movie Trailer | Salman Khan',
    time: '2 days ago',
    image: 'https://via.placeholder.com/100x60',
  },
];
