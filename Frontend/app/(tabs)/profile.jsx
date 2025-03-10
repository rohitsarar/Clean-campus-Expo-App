import { View } from "react-native";
import React from "react";
import PersonInfo from "../personalinfo/PersonInfo";
import { LinearGradient } from "expo-linear-gradient";
import { useColorScheme } from "react-native";

export default function Profile() {
  const theme = useColorScheme(); // Detect system theme (light/dark)

  // Define gradient colors based on theme
  const gradientColors = theme === "dark" ? ["white", "black"] : ["black", "white"];

  return (
    <LinearGradient colors={gradientColors} style={{ flex: 1, padding: 10 }}>
      <View style={{ flex: 1 }}>
        <PersonInfo />
      </View>
    </LinearGradient>
  );
}
