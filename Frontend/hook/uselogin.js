import { useAuthContext } from "../context/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";
import axios from "axios";
import { EXPO_PUBLIC_SERVER_URL } from "@env";
const useLogin = () => {
  const { setUser } = useAuthContext();

  const login = async ({ email, password }) => {
    // Input validation
    if (!email || !password) {
      Alert.alert("Login Failed", "Both email and password are required.");
      return false;
    }
    console.log("the login ",EXPO_PUBLIC_SERVER_URL)

    try {
      const API_URL = `${EXPO_PUBLIC_SERVER_URL}/api/auth/login`;
      const response = await axios.post(API_URL, { email, password });

      if (response.data.error) {
        Alert.alert("Login Failed", response.data.error);
        return false;
      }

      const { token, name, email: userEmail,role } = response.data;

      // Prepare user data
      const userData = { name, email: userEmail, role, token };

      // Save token and user data securely
      await AsyncStorage.multiSet([
        ["jwt", token],
        ["clean-campus", JSON.stringify(userData)],
      ]);
      
      // Retrieve and log stored values properly
      const storedToken = await AsyncStorage.getItem("jwt");
      const storedUserData = await AsyncStorage.getItem("clean-campus");
      
      // console.log("Stored Token:", storedToken);
      // console.log("Stored User Data:", JSON.parse(storedUserData)); // Parse JSON before logging
      
      // Update context state based on role
      setUser(userData);

      // Log role for debugging
      console.log(`Logged in as: ${role}`, userData);

      Alert.alert("Login Successful", `Welcome back, ${name}!`);
      return true;
    } catch (error) {
      if (error.response) {
        Alert.alert("Login Failed", error.response.data.error || "An unexpected error occurred.");
      } else if (error.request) {
        Alert.alert(
          "Network Error",
          "Unable to connect to the server. Please check your internet connection."
        );
      } else {
        console.error("Error during login:", error.message);
        Alert.alert("Login Failed", "An unexpected error occurred.");
      }
      return false;
    }
  };

  return { login };
};

export default useLogin;
