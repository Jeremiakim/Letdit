import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import CreateScreen from "../screens/CreateScreen";
import CommunitiesScreen from "../screens/CommunitiesScreen";
import ChatScreen from "../screens/ChatScreen";
import InboxScreen from "../screens/InboxScreen";
import DashboardStack from "./Dashboard";
import ProfileScreen from "../screens/ProfileScreen";
import { Button } from "react-native-paper";
import { LoginContext } from "../context/LoginContext";
import { useContext } from "react";

const Tab = createBottomTabNavigator();

function MainTab({ styles }) {
  const { setIsLoggIn } = useContext(LoginContext);

  const OnPressLogOut = async () => {
    console.log("Log Out press");
    await SecureStore.deleteItemAsync("token");

    setIsLoggIn(false);
    console.log(setIsLoggIn);
  };

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarInactiveTintColor: "grey",
        tabBarActiveTintColor: "black",
        tabBarShowLabel: false,
      }}
    >
      <Tab.Screen
        name={"Dashboard"}
        // component={HomeScreen}
        component={DashboardStack}
        options={{
          tabBarIcon: ({ focused, color, size }) => {
            const iconName = focused ? "home" : "home-outline";
            return <Ionicons name={iconName} color={color} size={size} />;
          },
          headerShown: false,
        }}
      />
      <Tab.Screen
        name={"Communities"}
        // component={HomeScreen}
        component={CommunitiesScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => {
            const iconName = focused
              ? "people-circle"
              : "people-circle-outline";
            return <Ionicons name={iconName} color={color} size={size} />;
          },
        }}
      />
      <Tab.Screen
        name={"Create"}
        // component={HomeScreen}
        component={CreateScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => {
            const iconName = focused ? "add-outline" : "add-outline";
            return <Ionicons name={iconName} color={color} size={size} />;
          },
        }}
      />
      <Tab.Screen
        name={"Chat"}
        // component={HomeScreen}
        component={ChatScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => {
            const iconName = focused
              ? "chatbubble-ellipses"
              : "chatbubble-ellipses-outline";
            return <Ionicons name={iconName} color={color} size={size} />;
          },
        }}
      />
      <Tab.Screen
        name={"Inbox"}
        // component={HomeScreen}
        component={InboxScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => {
            const iconName = focused ? "mail" : "mail-outline";
            return <Ionicons name={iconName} color={color} size={size} />;
          },
        }}
      />
      {/* <Tab.Screen
        name={"Profile"}
        // component={HomeScreen}
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => {
            const iconName = focused
              ? "ios-person-circle-outline"
              : "ios-person-circle-outline";
            return <Ionicons name={iconName} color={color} size={size} />;
          },
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
              onPress={OnPressLogOut}
            >
              Log Out
            </Button>
          ),
          title: "Profile",
        }}
      /> */}
    </Tab.Navigator>
  );
}

export default MainTab;
