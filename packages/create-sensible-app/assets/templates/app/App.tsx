import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StoreProvider } from "ui/src/Store";
import * as Screens from "ui/src/screens";
import { TailwindProvider } from "tailwind-rn";
import utilities from "./tailwind.json";
import { ScreenProvider } from "react-with-native-navigation";
const Stack = createNativeStackNavigator();

import { QueryClient, QueryClientProvider } from "react-query";

// Create a client
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TailwindProvider utilities={utilities}>
        <StoreProvider>
          <ScreenProvider
            initialRouteName="HomeScreen"
            screens={Screens}
            type="native"
          >
            <NavigationContainer>
              <Stack.Navigator initialRouteName="LoaderScreen">
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
          </ScreenProvider>
        </StoreProvider>
      </TailwindProvider>
    </QueryClientProvider>
  );
}

export default App;
