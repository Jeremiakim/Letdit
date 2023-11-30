import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import MainStack from "./MainStack";
import CreateScreen from "../screens/CreateScreen";
import CommunitiesScreen from "../screens/CommunitiesScreen";
import ChatScreen from "../screens/ChatScreen";
import InboxScreen from "../screens/InboxScreen";
import LoginScreen from "../screens/LoginScreen";

const Tab = createBottomTabNavigator();

function MainTab({ styles }) {
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
        component={MainStack}
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
        name={"Login"}
        // component={HomeScreen}
        component={LoginScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => {
            const iconName = focused
              ? "people-circle"
              : "people-circle-outline";
            return <Ionicons name={iconName} color={color} size={size} />;
          },
        }}
      /> */}
    </Tab.Navigator>
  );
}

export default MainTab;
