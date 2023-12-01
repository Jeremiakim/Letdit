import { NavigationContainer } from "@react-navigation/native";
import MainTab from "./navigators/MainTab";
import { ApolloProvider } from "@apollo/client";
import { LoginProvider } from "./context/LoginContext";

export default function App() {
  return (
    <LoginProvider>
      <NavigationContainer>
        <MainTab />
      </NavigationContainer>
    </LoginProvider>
  );
}
