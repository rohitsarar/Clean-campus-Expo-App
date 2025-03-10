import { CameraView, useCameraPermissions } from 'expo-camera';
import { useEffect, useRef, useState } from 'react';
import { Button, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useNavigation, useRouter } from 'expo-router';
import io from 'socket.io-client';
import { useAuthContext } from '../../context/AuthContext';
import { EXPO_PUBLIC_SERVER_URL } from "@env";


const socket = io(`${EXPO_PUBLIC_SERVER_URL}`);

export default function Camera() {
  const [facing, setFacing] = useState('back');
  const [permission, requestPermission] = useCameraPermissions();
  const [photo, setPhoto] = useState(null);
  const [caption, setCaption] = useState('');
  const cameraRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const {user}=useAuthContext();
const router=useRouter();

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTransparent: true,
      headerTitle: '',
    });

    socket.on('newPost', (newPost) => {
      console.log('New post received via socket:', newPost);
      
    });

    return () => {
      socket.off('newPost');
    };
  }, [navigation]);









  const handleSubmitPhoto = async () => {
    if (!photo || !caption.trim()) {
      alert("Please add a caption before submitting.");
      return;
    }
  
    setLoading(true); // Start loading
  
  
    // const currentDate = new Date();
    // const formattedDate = currentDate.toLocaleDateString();
    // const formattedTime = currentDate.toLocaleTimeString();

    const formData = new FormData();
    formData.append("Post", {
      uri: photo.uri,
      type: photo.type || "image/jpeg",
      name: "photo.jpg",
    });
  
    formData.append("caption", caption);
    formData.append("name", user?.name);
    // formData.append("date", formattedDate);
    // formData.append("time", formattedTime);
  
    try {
      const response = await fetch(`${EXPO_PUBLIC_SERVER_URL}/api/post`, {
        method: "POST",
        body: formData,
      });
     
      if (response.ok) {
        const responseData = await response.json();
        const newPost = {
          uri: photo.uri,
          caption: caption,
          name: user?.name,
          date: responseData.newPost.date,
          time: responseData.newPost.time,
        };
        console.log("New Post Date",newPost.date)
        socket.emit('newPost', newPost);
  
        // Navigate to messages file before showing success alert
        router.push('/(tabs)/messages');
        alert("Post created successfully!");
      } else {
        const errorData = await response.json();
        alert("Error: " + errorData.message);
      }
    } catch (error) {
      console.error("Error uploading photo:", error);
      alert("Failed to create post. Please try again.");
    } finally {
      setLoading(false); // Stop loading
    }
  };
  
  

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTransparent: true,
      headerTitle: '',
    });
  }, []);

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="Grant Permission" />
      </View>
    );
  }
  function toggleCameraFacing() {
    setFacing((current) => (current === 'back' ? 'front' : 'back'));
  }
  
  const handleTakePhoto = async () => {
    if (cameraRef.current) {
      const options = {
        quality: 1,
        base64: true,
        exif: false,
      };
      const takenPhoto = await cameraRef.current.takePictureAsync(options);
      setPhoto(takenPhoto); // Save the photo to state
    }
  };

  const handleRetakePhoto = () => {
    setPhoto(null);
    setCaption(''); // Reset caption when retaking
  };

  if (photo) {
    return (
      <View style={styles.previewContainer}>
        <View style={styles.imagePreview}>
          <Image source={{ uri: 'data:image/jpg;base64,' + photo.base64 }} style={styles.photo} />
          <TextInput
            style={styles.captionInput}
            placeholder="Add a Report Location..."
            value={caption}
            onChangeText={setCaption}
            editable={!loading} // Disable input while loading
          />
        </View>
        <View style={styles.actions}>
          <Button title="Retake Photo" onPress={handleRetakePhoto} disabled={loading} />
          <Button title={loading ? "Submitting..." : "Submit"} onPress={handleSubmitPhoto} disabled={loading} />
        </View>
      </View>
    );
  }
  

  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} facing={facing} ref={cameraRef}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
            <Ionicons name="camera-reverse" size={40} color="green" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.button1} onPress={handleTakePhoto}>
            <MaterialIcons name="camera" size={70} color="black"/>
          </TouchableOpacity>
        </View>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  message: {
    textAlign: 'center',
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 64,
  },
  button: {
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  button1: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  previewContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  imagePreview: {
    marginBottom: 16,
    alignItems: 'center',
  },
  photo: {
    width: 300,
    height: 400,
    borderRadius: 10,
  },
  captionInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    width: '100%',
    paddingHorizontal: 8,
    marginTop: 16,
    borderRadius: 5,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
});
