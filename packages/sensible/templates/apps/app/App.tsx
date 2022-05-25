import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StoreProvider, Pages } from "ui";
import { TailwindProvider } from "tailwind-rn";
import { AlertProvider } from "react-with-native-alert";
import { ModalProvider } from "react-with-native-modal";

import utilities from "./tailwind.json";
const Stack = createNativeStackNavigator();

import { registerRootComponent } from "expo";

import { QueryClient, QueryClientProvider } from "react-query";
import { getPageTitle } from "ui/src/pages";

import { LogBox } from "react-native";

LogBox.ignoreLogs(["ViewPropTypes will be removed", "Require cycle"]);
// Create a client
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TailwindProvider utilities={utilities}>
        <StoreProvider>
          <NavigationContainer>
            <AlertProvider>
              <ModalProvider>
                <Stack.Navigator initialRouteName="menu">
                  {Pages.map((page) => {
                    const defaultNavigationOptions = {
                      title: getPageTitle(page),
                    };

                    const options = page.reactNavigationOptions
                      ? {
                          ...defaultNavigationOptions,
                          ...page.reactNavigationOptions,
                        }
                      : defaultNavigationOptions;

                    return (
                      <Stack.Screen
                        key={`page${page.key}`}
                        name={page.key}
                        component={page.component}
                        options={options}
                      />
                    );
                  })}
                </Stack.Navigator>
              </ModalProvider>
            </AlertProvider>
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
