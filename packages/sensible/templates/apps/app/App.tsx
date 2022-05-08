import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StoreProvider, Screens } from "ui";
import { TailwindProvider } from "tailwind-rn";
import utilities from "./tailwind.json";
const Stack = createNativeStackNavigator();

import { QueryClient, QueryClientProvider } from "react-query";

// Create a client
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TailwindProvider utilities={utilities}>
        <StoreProvider>
          <NavigationContainer>
            <Stack.Navigator initialRouteName="HomeScreen">
              {Object.keys(Screens).map((screen) => {
                // @ts-ignore
                const component = Screens[screen];
                //@ts-ignore
                const options: ScreenOptions = Screens[screen].options;
                return (
                  <Stack.Screen
                    key={`Screen${screen}`}
                    name={screen}
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

export default App;
//
//
