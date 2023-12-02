import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import ChatScreen from "../screens/ChatScreen";
import CommunitiesScreen from "../screens/CommunitiesScreen";
import CreateScreen from "../screens/CreateScreen";
import InboxScreen from "../screens/InboxScreen";
import { Button } from "react-native-paper";
import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";

const Stack = createNativeStackNavigator();

function DashboardStack() {
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
      <Stack.Screen
        name={"Home"}
        component={HomeScreen}
        options={{
          headerRight: () => (
            <Button
              style={{
                backgroundColor: "white",
              }}
              onPress={() => {
                navigation.navigate("-");
              }}
            >
              <AntDesign name="search1" size={21} color="black" />
            </Button>
          ),
          headerLeft: () => (
            <Button
              style={{
                backgroundColor: "white",
              }}
              onPress={() => {
                navigation.navigate("-");
              }}
            >
              <Feather name="menu" size={24} color="black" />
            </Button>
          ),
        }}
      />
      <Stack.Screen name={"Communities"} component={CommunitiesScreen} />
      <Stack.Screen name={"Create"} component={CreateScreen} />
      <Stack.Screen name={"Chat"} component={ChatScreen} />
      <Stack.Screen name={"Inbox"} component={InboxScreen} />
    </Stack.Navigator>
  );
}

export default DashboardStack;
