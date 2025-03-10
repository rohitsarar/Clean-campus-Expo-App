import { View, Text, TouchableOpacity, useColorScheme } from 'react-native';
import React from 'react';
import Navbar from '../../components/Navbar';
import ImageSlider from '../../components/ImageSlider';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

export default function Home() {
  const router = useRouter();
  const theme = useColorScheme(); // Detect system theme (light/dark)

  // Define colors based on theme
  const gradientColors = theme === 'dark' ? ['black', 'black'] : ['black', 'white'];
  const textColor = theme === 'dark' ? '#FFFFFF' : '#000000';
  const cardBackground = theme === 'dark' ? '#1E1E1E' : '#FFFFFF';
  const borderColor = theme === 'dark' ? '#333' : '#ddd';
  const buttonBackground = theme === 'dark' ? '#007BFF' : '#28A745';

  return (
    <LinearGradient colors={gradientColors} style={{ flex: 1 }}>
      <Navbar />
      <ImageSlider />

      <View
        style={{
          margin: 8,
          padding: 12,
          backgroundColor: cardBackground,
          borderRadius: 10,
          borderWidth: 1,
          borderColor,
        }}
      >
        <Text style={{ fontSize: 18, color: textColor, fontWeight: '500' }}>
          If you see any trash or dust, click a photo and submit it by tapping the button below.
        </Text>
      </View>

      <TouchableOpacity
        onPress={() => router.push('/camera/PhotoClick')}
        style={{ alignItems: 'center', marginVertical: 10 }}
      >
        <FontAwesome name="camera" size={40} color={textColor} />
        <Text
          style={{
            backgroundColor: buttonBackground,
            color: 'white',
            fontWeight: 'bold',
            paddingHorizontal: 16,
            paddingVertical: 8,
            borderRadius: 8,
            marginTop: 10,
          }}
        >
          Take Photo
        </Text>
      </TouchableOpacity>
    </LinearGradient>
  );
}
