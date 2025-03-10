import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const PasswordStrengthMeter = ({ password }) => {
  const criteria = [
    { label: "At least 6 characters", met: password.length >= 6 },
    { label: "Contains uppercase letter", met: /[A-Z]/.test(password) },
    { label: "Contains lowercase letter", met: /[a-z]/.test(password) },
    { label: "Contains a number", met: /\d/.test(password) },
    { label: "Contains special character", met: /[^A-Za-z0-9]/.test(password) },
  ];

  return (
    <View style={styles.container}>
      {criteria.map((item) => (
        <View key={item.label} style={styles.criteriaItem}>
          <MaterialCommunityIcons
            name={item.met ? "check-circle" : "close-circle"}
            size={16}
            color={item.met ? "green" : "gray"}
          />
          <Text style={[styles.criteriaText, { color: item.met ? "green" : "gray" }]}>
            {item.label}
          </Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { marginTop: 10 },
  criteriaItem: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 3,
  },
  criteriaText: { fontSize: 12 },
});

export default PasswordStrengthMeter;
