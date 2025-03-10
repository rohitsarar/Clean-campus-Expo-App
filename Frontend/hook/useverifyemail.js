import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";
import axios from "axios";
import { EXPO_PUBLIC_SERVER_URL } from "@env";
const useVerifyEmail = () => {
  const { setUser } = useAuthContext();
  const [loading, setLoading] = useState(false);

  const verifyEmail = async ({ code }) => {
    if (!code) {
      Alert.alert("Error", "Verification code is required.");
      return false;
    }

    setLoading(true);

    try {
      const API_URL =`${EXPO_PUBLIC_SERVER_URL}/api/auth/verify-email`;
      const response = await axios.post(API_URL, { code });

      if (response.data.error) {
        Alert.alert("Verification Failed", response.data.error);
        return false;
      }

      const { token, ...userData } = response.data;

      // Save token and user data securely
      await AsyncStorage.setItem("jwt", token);
      await AsyncStorage.setItem("clean-campus", JSON.stringify(userData));

      setUser(userData);
      Alert.alert("Verification Successful", "Welcome to Clean Campus!");

      return true;
    } catch (error) {
      if (error.response) {
        Alert.alert("Verification Failed", error.response.data.message || "An unexpected error occurred.");
      } else if (error.request) {
        Alert.alert("Network Error", "Check your internet connection and try again.");
      } else {
        console.error("Verification Error:", error.message);
        Alert.alert("Error", "An unexpected error occurred.");
      }
      return false;
    } finally {
      setLoading(false); // Ensure loading state is reset
    }
  };

  return { verifyEmail, loading };
};

export default useVerifyEmail;
