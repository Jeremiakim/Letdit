import { useState } from "react";
import {
  Text,
  View,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
} from "react-native";
import { Button, TextInput } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";

function LoginScreen() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <ScrollView style={styles.container}>
      <KeyboardAvoidingView
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          paddingHorizontal: 20,
        }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <Ionicons
          name="logo-reddit"
          size={45}
          color="red"
          style={{ marginBottom: 20, marginTop: 40 }}
        />

        <Text style={{ fontSize: 24, marginBottom: 20, fontWeight: "bold" }}>
          Log In to Letdit
        </Text>
        <TextInput
          style={{ width: 250, marginBottom: 20, backgroundColor: "#F0F0F0" }}
          mode="outlined"
          label="Email"
          placeholder="Your Email @"
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          style={{
            width: 250,
            marginBottom: 310,
            backgroundColor: "#F0F0F0",
          }}
          mode="outlined"
          label="Password"
          placeholder="Your Password"
          secureTextEntry={!isPasswordVisible}
          right={
            <TextInput.Icon
              icon={isPasswordVisible ? "eye-off" : "eye"}
              onPress={togglePasswordVisibility}
            />
          }
          onChangeText={(text) => setPassword(text)}
        />

        <Button
          style={{ width: 350, height: 40, backgroundColor: "red" }}
          mode="contained"
        >
          Continue
        </Button>
      </KeyboardAvoidingView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  errorText: {
    color: "red",
    marginBottom: 10,
  },
});

export default LoginScreen;
