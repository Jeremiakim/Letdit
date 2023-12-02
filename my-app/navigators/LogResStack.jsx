import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import { Button } from "react-native-paper";

const Stack = createNativeStackNavigator();

function LogResStack({ navigation }) {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerStyle: {
          backgroundColor: "white",
        },
        headerTintColor: "black",
      }}
    >
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{
          headerRight: () => (
            <Button
              style={{
                backgroundColor: "white",
              }}
              labelStyle={{
                color: "gray",
                fontSize: 18,
                fontWeight: "bold",
              }}
              onPress={() => {
                navigation.navigate("Register");
              }}
            >
              Sign Up
            </Button>
          ),
          title: "Sign In",
        }}
      />
      <Stack.Screen
        name="Register"
        component={RegisterScreen}
        options={{
          headerRight: () => (
            <Button
              style={{
                backgroundColor: "white",
              }}
              labelStyle={{
                color: "gray",
                fontSize: 18,
                fontWeight: "bold",
              }}
              onPress={() => {
                navigation.navigate("Login");
              }}
            >
              Log In
            </Button>
          ),
          title: "Sign Up",
        }}
      />
    </Stack.Navigator>
  );
}

export default LogResStack;
