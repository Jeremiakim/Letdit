import { useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { Button, TextInput } from "react-native-paper";
function RegisterScreen() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };
  return (
    <ScrollView>
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "white",
          paddingHorizontal: 100,
        }}
      >
        <Text style={{ fontSize: 17, marginBottom: 20, fontWeight: "bold" }}>
          Hello, Welcome to Letdit
        </Text>
        <TextInput
          style={{ width: 250, marginBottom: 20 }}
          mode="outlined"
          label="Name"
          placeholder="Your Name"
        />
        <TextInput
          style={{ width: 250, marginBottom: 20 }}
          mode="outlined"
          label="Username"
          placeholder="Your Username"
        />
        <TextInput
          style={{ width: 250, marginBottom: 20 }}
          mode="outlined"
          label="Email"
          placeholder="Your Email @"
        />
        <TextInput
          style={{ width: 250, marginBottom: 220 }}
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
      </View>
    </ScrollView>
  );
}

export default RegisterScreen;
