import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import ChatScreen from "../screens/ChatScreen";
import CommunitiesScreen from "../screens/CommunitiesScreen";
import CreateScreen from "../screens/CreateScreen";
import InboxScreen from "../screens/InboxScreen";
import { Button } from "react-native-paper";
import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import PostDetailScreen from "../screens/PostDetailScreen";
import SearchScreen from "../screens/SearchScreen";
import { Ionicons } from "@expo/vector-icons";
import ProfileScreen from "../screens/ProfileScreen";

const Stack = createNativeStackNavigator();

function DashboardStack({ navigation }) {
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
          headerLeft: () => (
            <Button
              style={{
                backgroundColor: "white",
              }}
              onPress={() => {
                navigation.navigate("Search");
              }}
            >
              <AntDesign name="search1" size={21} color="black" />
            </Button>
          ),
          headerRight: () => (
            <Button
              style={{
                backgroundColor: "white",
              }}
              onPress={() => {
                navigation.navigate("Profile");
              }}
            >
              <Ionicons
                name="ios-person-circle-outline"
                size={22}
                color="black"
              />
            </Button>
          ),
        }}
      />
      <Stack.Screen name={"Communities"} component={CommunitiesScreen} />
      <Stack.Screen name={"Create"} component={CreateScreen} />
      <Stack.Screen name={"Chat"} component={ChatScreen} />
      <Stack.Screen name={"Detail"} component={PostDetailScreen} />
      <Stack.Screen name={"Search"} component={SearchScreen} />
      <Stack.Screen name={"Inbox"} component={InboxScreen} />
      <Stack.Screen name={"Profile"} component={ProfileScreen} />
    </Stack.Navigator>
  );
}

export default DashboardStack;
