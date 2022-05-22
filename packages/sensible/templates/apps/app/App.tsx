import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StoreProvider, Pages } from "ui";
import { TailwindProvider } from "tailwind-rn";
import { QueryClient, QueryClientProvider } from "react-query";
import { registerRootComponent } from "expo";
import utilities from "./tailwind.json";

const Stack = createNativeStackNavigator();

// Create a client
const queryClient = new QueryClient();

const output = [
  {
    city: "Groningen",
    state: "Groningen",
  },
  {
    city: "Amsterdam",
    state: "North-Holland",
  },
  {
    city: "Maastricht",
    state: "Limburg",
  },
].map((location) => `${location.city}, ${location.state}`);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TailwindProvider utilities={utilities}>
        <StoreProvider>
          <NavigationContainer>
            <Stack.Navigator initialRouteName="index">
              {Object.keys(Pages).map((page) => {
                // @ts-ignore
                const component = Pages[page];
                //@ts-ignore
                const options: ScreenOptions = Pages[page].options;
                return (
                  <Stack.Screen
                    key={`page${page}`}
                    name={page}
                    component={component}
                    options={options}
                  />
                );
              })}
            </Stack.Navigator>
          </NavigationContainer>
        </StoreProvider>
      </TailwindProvider>
    </QueryClientProvider>
  );
}
// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App);
