import { useState } from "react";
import {
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Button, TextInput } from "react-native-paper";
import { FontAwesome5, Foundation } from "@expo/vector-icons";
import { useMutation } from "@apollo/client";
import { REGISTER } from "../queries";
function RegisterScreen({ navigation }) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };
  const [dispatcher] = useMutation(
    REGISTER,
    // !! Solution for late update / cannot await dispatcher:
    // !! We can use callback onCompleted to get the latest data
    {
      onCompleted: async (res) => {
        let token = null;
        console.log(res);
        // if (res?.login?.data?.token) {
        //   token = res.login.data.token;
        // }
        navigation.navigate("Login");
        // await SecureStore.setItemAsync("token", token);
      },
      onError: (err) => {
        console.log(err);
      },
    }
  );

  const pressRegister = async () => {
    await dispatcher({
      variables: {
        input: {
          name,
          username,
          email,
          password,
        },
      },
    });
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
        <FontAwesome5
          name="reddit"
          size={60}
          color="red"
          style={{ marginBottom: 20, marginTop: 40 }}
        />

        <Text style={{ fontSize: 24, marginBottom: 20, fontWeight: "bold" }}>
          Hello, Welcome to <Text style={{ color: "red" }}>Letdit</Text>
        </Text>
        <TextInput
          style={{ width: 250, marginBottom: 20, backgroundColor: "#F0F0F0" }}
          mode="outlined"
          label="Name"
          placeholder="Your Name"
          onChangeText={(text) => setUsername(text)}
        />
        <TextInput
          style={{ width: 250, marginBottom: 20, backgroundColor: "#F0F0F0" }}
          mode="outlined"
          label="Username"
          placeholder="Your Username"
          onChangeText={(text) => setName(text)}
        />
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
            marginBottom: 140,
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
        <Text
          style={{
            marginBottom: 10,
            fontSize: 11,
          }}
        >
          By countinuing, you agree to our{" "}
          <Text style={{ color: "red" }}>User Agreement</Text> and acknowledge
          that you understand the{" "}
          <Text style={{ color: "red" }}>Privacy Policy</Text>
        </Text>
        <Button
          style={{ width: 350, height: 40, backgroundColor: "red" }}
          mode="contained"
          onPress={pressRegister}
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

export default RegisterScreen;
