import { useAuthContext } from "../context/AuthContext";
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useRouter } from "expo-router";
import { EXPO_PUBLIC_SERVER_URL } from "@env";
const useLogout = () => {
  const { setUser } = useAuthContext();
   const router = useRouter();

  const logout = async () => {
    try {
      const API_URL =`${EXPO_PUBLIC_SERVER_URL}/api/auth/logout`;

      // Make API call for logout
      const response = await axios.post(API_URL);

      if (response.status !== 200) {
        Alert.alert("Logout failed", "Please try again later.");
        return;
      }
      const storedToken = await AsyncStorage.getItem("jwt");
      const storedUserData = await AsyncStorage.getItem("clean-campus");
      
      // console.log("logout Stored Token:", storedToken);
      // console.log("logout Stored User Data:", JSON.parse(storedUserData)); // Parse JSON before logging
      // Clear local storage and reset user state
      await AsyncStorage.multiRemove(["jwt", "clean-campus"])
      await AsyncStorage.clear();

      setUser(null);

      // Navigate to the sign-in page using router
       router.push("/app/auth/sign-in");

      // Show success message
      Alert.alert("Logout Successful", "You have been logged out.");
    } catch (error) {
      console.error("Error during logout:", error?.message || error);
      Alert.alert("Logout failed", "An unexpected error occurred. Please try again.");
    }
  };

  return { logout };
};

export default useLogout;
