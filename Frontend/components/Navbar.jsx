import { View, Text, Image, Animated, Easing } from 'react-native';
import React, { useEffect, useRef } from 'react';
import { useAuthContext } from '@/context/AuthContext';

export default function Navbar() {
  const { user } = useAuthContext();

  // Animation Refs
  const fadeAnim = useRef(new Animated.Value(0)).current; // For fade-in effect
  const slideAnim = useRef(new Animated.Value(-50)).current; // For sliding text
  const bounceAnim = useRef(new Animated.Value(1)).current; // For bounce effect

  useEffect(() => {
    // Fade-in and Slide-in animation
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        easing: Easing.out(Easing.exp),
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <Animated.View
      style={[
        {
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }],
        },
        styles.navbar,
      ]}
    >
      {/* Column for User Name and Clean-Campus */}
      <View>
        {/* Clean Campus (Animated Slide-in) */}
        <Animated.Text
          style={[
            styles.text,
            {
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          Clean-Campus
        </Animated.Text>

        {/* User Name */}
        <Text className="text-lg text-white">Hii {user?.name}</Text>
      </View>

      {/* Notification Button with Bounce Effect */}
      <Animated.View
        style={{
          backgroundColor: '#f0f0f0',
          padding: 5,
          borderRadius: 10,
          transform: [{ scale: bounceAnim }],
        }}
      >
        <Image
          source={require("../assets/images/navbaricons.jpg")}
          style={{ width: 60, height: 58 }}
        />
      </Animated.View>
    </Animated.View>
  );
}

const styles = {
  navbar: {
    backgroundColor: '#0080ff', // Adjust the background color
    height: 80,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  text: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
  },
};
