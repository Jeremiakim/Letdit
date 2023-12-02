import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { LoginContext } from "../context/LoginContext";
import { useContext } from "react";
import LogResStack from "./LogResStack";
import MainTab from "./MainTab";
import { Button } from "react-native-paper";
import { Feather } from "@expo/vector-icons";

const Stack = createNativeStackNavigator();

function MainStack() {
  const { isLoggIn } = useContext(LoginContext);
  return (
    <Stack.Navigator
      initialRouteName="LogRes"
      screenOptions={{
        headerStyle: {
          backgroundColor: "white",
        },
        headerTintColor: "black",
      }}
    >
      {isLoggIn ? (
        <>
          <Stack.Screen
            name={"Homie"}
            component={MainTab}
            options={{
              headerShown: false,
            }}
          />
        </>
      ) : (
        <>
          <Stack.Screen
            name={"LogRes"}
            component={LogResStack}
            options={{ headerShown: false }}
          />
        </>
      )}
    </Stack.Navigator>
  );
}

export default MainStack;
