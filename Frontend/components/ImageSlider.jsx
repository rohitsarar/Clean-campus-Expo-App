import { View, StyleSheet, FlatList, Image, Dimensions, Animated } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { BlurView } from 'expo-blur';

const { width } = Dimensions.get('window');

export default function ImageSlider() {
  const images = [
    { id: 1, url: require('../assets/images/SlideBar.png') },
    { id: 2, url: require('../assets/images/SlideBar.png') },
    { id: 3, url: require('../assets/images/SlideBar.png') },
  ];

  const flatListRef = useRef(null);
  const fadeAnim = useRef(new Animated.Value(1)).current; // Fade animation value
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-scroll every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      let nextIndex = currentIndex === images.length - 1 ? 0 : currentIndex + 1;

      Animated.timing(fadeAnim, {
        toValue: 0, // Start fade out
        duration: 300, 
        useNativeDriver: true,
      }).start(() => {
        setCurrentIndex(nextIndex);

        Animated.timing(fadeAnim, {
          toValue: 1, // Fade in
          duration: 500, 
          useNativeDriver: true,
        }).start();
      });

      if (flatListRef.current) {
        flatListRef.current.scrollToIndex({ animated: true, index: nextIndex });
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <View style={styles.container}>
      {/* Image Slider */}
      <FlatList
        ref={flatListRef}
        data={images}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        renderItem={({ item, index }) => (
          <Animated.View style={[styles.imageContainer, { opacity: fadeAnim }]}>
            <Image source={item.url} style={styles.image} />
            <BlurView intensity={50} style={styles.blurOverlay}>
              <View style={styles.dotsContainer}>
                {images.map((_, idx) => {
                  const scale = currentIndex === idx ? 1.5 : 1; // Scale effect for active dot
                  return (
                    <Animated.View
                      key={idx}
                      style={[
                        styles.dot,
                        currentIndex === idx && styles.activeDot,
                        { transform: [{ scale }] },
                      ]}
                    />
                  );
                })}
              </View>
            </BlurView>
          </Animated.View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    margin: 4,
    padding: 4,
    borderWidth: 4,
    borderColor: '#ccc',
    borderRadius: 8,
  },
  imageContainer: {
    width: width,
    height: 200,
    borderRadius: 8,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
    resizeMode: 'cover',
  },
  blurOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#ccc',
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: '#007BFF',
  },
});

















// import { View, Text, TouchableOpacity, Animated, Easing, useColorScheme } from 'react-native';
// import React, { useEffect, useRef } from 'react';
// import Navbar from '../../components/Navbar';
// import ImageSlider from '../../components/ImageSlider';
// import FontAwesome from '@expo/vector-icons/FontAwesome';
// import { useRouter } from 'expo-router';

// export default function Home() {
//   const router = useRouter();
//   const theme = useColorScheme(); // Detect system theme (light/dark)

//   // Animation Refs
//   const fadeAnim = useRef(new Animated.Value(0)).current; // Fade-in for ImageSlider
//   const slideAnim = useRef(new Animated.Value(50)).current; // Slide-in for text box
//   const bounceAnim = useRef(new Animated.Value(1)).current; // Bounce for Camera button

//   useEffect(() => {
//     // Parallel animation execution
//     Animated.parallel([
//       Animated.timing(fadeAnim, {
//         toValue: 1,
//         duration: 800,
//         useNativeDriver: true,
//       }),
//       Animated.timing(slideAnim, {
//         toValue: 0,
//         duration: 600,
//         easing: Easing.out(Easing.exp),
//         useNativeDriver: true,
//       }),
//     ]).start();
//   }, []);

//   // Bounce effect when button is pressed
//   const handlePressIn = () => {
//     Animated.spring(bounceAnim, {
//       toValue: 0.9,
//       useNativeDriver: true,
//     }).start();
//   };

//   const handlePressOut = () => {
//     Animated.spring(bounceAnim, {
//       toValue: 1,
//       friction: 3,
//       tension: 40,
//       useNativeDriver: true,
//     }).start(() => router.push('/camera/PhotoClick'));
//   };

//   // Define styles for Light and Dark modes
//   const backgroundColor = theme === 'dark' ? '#121212' : '#F2F2F2';
//   const textColor = theme === 'dark' ? '#ffffff' : '#000000';
//   const cardBackground = theme === 'dark' ? '#1E1E1E' : '#ffffff';
//   const borderColor = theme === 'dark' ? '#333' : '#ddd';

//   return (
//     <View style={{ flex: 1, backgroundColor }}>
//       <Navbar />

//       {/* Animated Image Slider */}
//       <Animated.View style={{ opacity: fadeAnim }}>
//         <ImageSlider />
//       </Animated.View>

//       {/* Animated Text Box */}
//       <Animated.View
//         style={{
//           margin: 8,
//           padding: 12,
//           backgroundColor: cardBackground,
//           borderRadius: 10,
//           borderWidth: 1,
//           borderColor,
//           transform: [{ translateY: slideAnim }],
//         }}
//       >
//         <Text style={{ fontSize: 18, color: textColor, fontWeight: '500' }}>
//           If you see any trash or dust, click a photo and submit it by tapping the button below.
//         </Text>
//       </Animated.View>

//       {/* Animated Camera Button */}
//       <TouchableOpacity
//         onPressIn={handlePressIn}
//         onPressOut={handlePressOut}
//         style={{ alignItems: 'center', marginVertical: 10 }}
//       >
//         <Animated.View style={{ transform: [{ scale: bounceAnim }] }}>
//           <FontAwesome name="camera" size={40} color={textColor} />
//         </Animated.View>
//         <Text
//           style={{
//             backgroundColor: theme === 'dark' ? '#007BFF' : '#28A745',
//             color: 'white',
//             fontWeight: 'bold',
//             paddingHorizontal: 16,
//             paddingVertical: 8,
//             borderRadius: 8,
//             marginTop: 10,
//           }}
//         >
//           Take Photo
//         </Text>
//       </TouchableOpacity>
//     </View>
//   );
// }
