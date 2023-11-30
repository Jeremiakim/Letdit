import { useState } from "react";
import {
  Text,
  View,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native"; // Import KeyboardAvoidingView
import { Button, TextInput } from "react-native-paper";

function LoginScreen() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <ScrollView>
      <KeyboardAvoidingView
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "white",
          paddingHorizontal: 20,
        }}
        behavior={Platform.OS === "ios" ? "padding" : "height"} // Platform-aware behavior for KeyboardAvoidingView
      >
        <Text style={{ fontSize: 24, marginBottom: 20, fontWeight: "bold" }}>
          Log In to Letdit
        </Text>
        <TextInput
          style={{ width: 250, marginBottom: 20 }}
          mode="outlined"
          label="Email"
          placeholder="Your Email @"
        />
        <TextInput
          style={{ width: 250, marginBottom: 380 }}
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
        />
        <Button
          style={{ width: 350, height: 40 }}
          mode="contained"
          onPress={() => console.log("Pressed")}
        >
          Continue
        </Button>
      </KeyboardAvoidingView>
    </ScrollView>
  );
}

export default LoginScreen;
