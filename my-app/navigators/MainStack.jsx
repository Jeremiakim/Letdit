import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import ChatScreen from "../screens/ChatScreen";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import { LoginContext } from "../context/LoginContext";
import { useContext } from "react";
import CommunitiesScreen from "../screens/CommunitiesScreen";
import CreateScreen from "../screens/CreateScreen";
import InboxScreen from "../screens/InboxScreen";

const Stack = createNativeStackNavigator();

function MainStack() {
  const { isLoggIn } = useContext(LoginContext);
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerStyle: {
          backgroundColor: "white",
        },
        headerTintColor: "black",
      }}
    >
      {isLoggIn ? (
        <>
          <Stack.Screen name={"Home"} component={HomeScreen} />
          <Stack.Screen name={"Communities"} component={CommunitiesScreen} />
          <Stack.Screen name={"Create"} component={CreateScreen} />
          <Stack.Screen name={"Chat"} component={ChatScreen} />
          <Stack.Screen name={"Inbox"} component={InboxScreen} />
        </>
      ) : (
        <>
          <Stack.Screen name={"Login"} component={LoginScreen} />
          <Stack.Screen name={"Register"} component={RegisterScreen} />
        </>
      )}
    </Stack.Navigator>
  );
}

export default MainStack;
