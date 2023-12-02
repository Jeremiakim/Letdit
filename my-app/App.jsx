import { NavigationContainer } from "@react-navigation/native";
import MainTab from "./navigators/MainTab";
import { ApolloProvider } from "@apollo/client";
import { LoginProvider } from "./context/LoginContext";
import client from "./config/apollo";
import MainStack from "./navigators/MainStack";
export default function App() {
  return (
    <ApolloProvider client={client}>
      <LoginProvider>
        <NavigationContainer>
          <MainStack />
        </NavigationContainer>
      </LoginProvider>
    </ApolloProvider>
  );
}
