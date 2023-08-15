import { NavigationContainer } from "@react-navigation/native";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
} from "@apollo/client";

import RootNavigator from "./navigator/RootNavigator";

const client = new ApolloClient({
  uri: "https://dolhasca.stepzen.net/api/rude-porcupine/__graphql",
  cache: new InMemoryCache(),
});

export default function App() {
  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </ApolloProvider>
  );
}
