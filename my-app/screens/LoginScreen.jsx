import { useContext, useState } from "react";
import {
  Text,
  View,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Button, TextInput } from "react-native-paper";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";
import { LOGIN } from "../queries";
import * as SecureStore from "expo-secure-store";
import { useLazyQuery } from "@apollo/client";
import { LoginContext } from "../context/LoginContext";

function LoginScreen({ navigation }) {
  const { setIsLoggIn, setUserId } = useContext(LoginContext);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [dispatcher, { data, loading, error }] = useLazyQuery(LOGIN, {
    onCompleted: async (res) => {
      let token = null;
      // let userId;

      if (res?.login?.data?.token) {
        token = res.login.data.token;
        userId = res.login.data.userId;
      }

      await SecureStore.setItemAsync("token", token);
      await SecureStore.setItemAsync("userId", userId);
      setUserId(userId);
      fetchPolicy: "network-only";
      setIsLoggIn(true);
    },
    onError: (err) => {
      console.log(err);
    },
  });

  const pressLogin = async () => {
    await dispatcher({
      variables: {
        username,
        password,
      },
    });
  };

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
        <FontAwesome5
          name="reddit"
          size={60}
          color="red"
          style={{ marginBottom: 20, marginTop: 40 }}
        />

        <Text style={{ fontSize: 24, marginBottom: 20, fontWeight: "bold" }}>
          Log In to <Text style={{ color: "red" }}>Letdit</Text>
        </Text>
        <TextInput
          style={{ width: 250, marginBottom: 20, backgroundColor: "#F0F0F0" }}
          mode="outlined"
          label="Username"
          placeholder="Your Username"
          onChangeText={(text) => setUsername(text)}
        />
        <TextInput
          style={{
            width: 250,
            marginBottom: 10,
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
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text
            style={{
              color: "red",
              marginBottom: 260,
            }}
          >
            Forgot Password?
          </Text>
        </TouchableOpacity>
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
          onPress={pressLogin}
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
