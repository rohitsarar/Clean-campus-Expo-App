import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, Image, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import useLogin from "../../../hook/uselogin";
import { LinearGradient } from 'expo-linear-gradient';
export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
 
  const [loading, setLoading] = useState(false); // Loading state
  const router = useRouter();
  const { login } = useLogin();

  const handleLogin = async () => {
    setLoading(true); // Start loading
    try {
      const success = await login({ email, password });
      if (success) {
        const userDataString = await AsyncStorage.getItem("clean-campus");
        const userData = userDataString ? JSON.parse(userDataString) : null;

        if (userData && userData.role) {
          switch (userData.role) {
            case "admin":
              router.push("/admindesktop");
              break;
            case "peon":
              router.push("/peondesktop");
              break;
            case "user":
              router.push("(tabs)/home");
              break;
            default:
              Alert.alert("Login Error", "Invalid user role.");
          }
        } else {
          Alert.alert("Login Error", "User data is missing. Please try again.");
        }
      } else {
        Alert.alert("Login Error", "Invalid email or password.");
      }
    } catch (error) {
      console.error("Error during login:", error);
      Alert.alert("Login Error", "Something went wrong. Please try again.");
    } finally {
      setLoading(false); // Stop loading
    }
  };


  const getInputStyle = (inputValue) => {
    return inputValue ? styles.inputActive : styles.input;
  };


  return (
   
     
    <LinearGradient
    colors={['#0080ff', '#000000']} // Linear gradient colors
    style={styles.container} // Gradient style for the container
  >
    <View style={styles.iconContainer}>
    <Image style={styles.icon}
            source={require("../../../assets/images/homelogo.png")} // Replace with your actual image path
            
          />
          <Text className="text-white text-xl font-semibold mt-4">Clean Campus</Text>
    </View>
        
        
  

    <View style={styles.form}>
        <TextInput
          style={getInputStyle(email)}
          placeholder="Email"
          placeholderTextColor="#A0AEC0" // Placeholder text color
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
        <TextInput
          style={getInputStyle(password)}
          placeholder="Password"
          placeholderTextColor="#A0AEC0" // Placeholder text color
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <TouchableOpacity
          style={[styles.button, loading && styles.buttonDisabled]}
          onPress={handleLogin}
          disabled={loading}
        >
          <Text style={styles.buttonText}>
            {loading ? 'Login...' : 'Login'}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.signInContainer}>
        <Text style={styles.signInText}>have an Don't account?</Text>
        <TouchableOpacity onPress={() => router.replace("auth/signup")}>
          <Text style={styles.loginLink}>Create Account</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer: {
    marginBottom: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    fontSize: 50,
    color: '#63B3ED',
    width:60,
    height:58
  },
  form: {
    width: '80%',
    padding: 15,
    alignItems: 'center',
  },
  input: {
    width: '100%',
    padding: 12,
    marginBottom: 12,
    backgroundColor: 'black',
    color: 'white',
    borderRadius: 5,
    borderWidth: 1,
  },
  inputActive: {
    width: '100%',
    padding: 12,
    marginBottom: 12,
    backgroundColor: 'blue',
    color: 'white',
    borderRadius: 5,
    borderColor: 'lightblue',
    borderWidth: 1,
  },
  button: {
    width: '100%',
    paddingVertical: 12,
    backgroundColor: 'blue',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#A0AEC0',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  signInContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  signInText: {
    color: '#E2E8F0',
  },
  loginLink: {
    color: '#63B3ED',
    fontWeight: 'bold',
  },
});



