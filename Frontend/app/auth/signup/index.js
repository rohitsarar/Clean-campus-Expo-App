import React, { useState } from "react";
import { 
  View, TextInput, TouchableOpacity, Text, StyleSheet, Alert, 
  KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard 
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";  
import usesignup from "../../../hook/usesignup";
import { useRouter } from "expo-router";
import PasswordStrengthMeter from "../PasswordStrengthMeter";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { signup } = usesignup();
  const router = useRouter();

  const handleSubmit = async () => {
    setLoading(true);
    const success = await signup({ name, email, password });
    setLoading(false);
    
    if (success) {
      router.replace("auth/verify/");
    } else {
      Alert.alert("Error", "Signup failed. Please try again.");
    }

    setName("");
    setEmail("");
    setPassword("");
  };

  const getInputStyle = (inputValue) => inputValue ? styles.inputActive : styles.input;

  return (
    <LinearGradient colors={["#0080ff", "#000000"]} style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"} 
        style={{ flex: 1 }}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.scrollContainer}>
            {/* Icon Section */}
            <View style={styles.iconContainer}>
              <Text style={styles.icon}>🌐</Text>
            </View>

            {/* Signup Form */}
            <View style={styles.form}>
              <TextInput
                style={getInputStyle(name)}
                placeholder="Username"
                placeholderTextColor="#A0AEC0"
                value={name}
                onChangeText={setName}
              />
              <TextInput
                style={getInputStyle(email)}
                placeholder="Email"
                placeholderTextColor="#A0AEC0"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
              />
              <TextInput
                style={getInputStyle(password)}
                placeholder="Password"
                placeholderTextColor="#A0AEC0"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />

              {error && <Text style={styles.errorText}>{error}</Text>}

              {/* Password Strength Meter */}
              <PasswordStrengthMeter password={password} />

              <TouchableOpacity 
                style={[styles.button, loading && styles.buttonDisabled]}
                onPress={handleSubmit}
                disabled={loading}
              >
                <Text style={styles.buttonText}>
                  {loading ? "Signing up..." : "Signup"}
                </Text>
              </TouchableOpacity>
            </View>

            {/* Already Have an Account */}
            <View style={styles.signInContainer}>
              <Text style={styles.signInText}>Already have an account?</Text>
              <TouchableOpacity onPress={() => router.replace("auth/sign-in")}>
                <Text style={styles.loginLink}>Login</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  iconContainer: {
    marginBottom: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    fontSize: 50,
    color: "#63B3ED",
  },
  form: {
    width: "80%",
    padding: 15,
    alignItems: "center",
  },
  input: {
    width: "100%",
    padding: 12,
    marginBottom: 12,
    backgroundColor: "black",
    color: "white",
    borderRadius: 5,
    borderWidth: 1,
  },
  inputActive: {
    width: "100%",
    padding: 12,
    marginBottom: 12,
    backgroundColor: "blue",
    color: "white",
    borderRadius: 5,
    borderColor: "lightblue",
    borderWidth: 1,
  },
  button: {
    width: "100%",
    paddingVertical: 12,
    backgroundColor: "blue",
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonDisabled: {
    backgroundColor: "#A0AEC0",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  signInContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  signInText: {
    color: "#E2E8F0",
  },
  loginLink: {
    color: "#63B3ED",
    fontWeight: "bold",
  },
  errorText: {
    color: "red",
    fontWeight: "bold",
    marginBottom: 10,
  },
});

export default Signup;
