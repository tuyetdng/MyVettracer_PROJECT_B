import React from "react";
import { LogBox, StatusBar, useColorScheme } from "react-native";
import "react-native-gesture-handler";
import SplashScreen from "react-native-splash-screen";
import { QueryClient, QueryClientProvider } from "react-query";
import { createTamagui, TamaguiProvider } from "tamagui";
import { isAndroid } from "@freakycoder/react-native-helpers";
/**
 * ? Local Imports
 */
import defaultConfig from "@tamagui/config/v3";
import { ONE_HOUR } from "./src/config/constants";
import Navigation from "./src/navigation";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      retry: false,
      staleTime: ONE_HOUR,
      onError(err: unknown | Error) {
        console.error(err);
      },
    },
    mutations: {
      onError(err: unknown | Error) {
        console.error(err);
      },
    },
  },
});
const config = createTamagui(defaultConfig);
LogBox.ignoreAllLogs();

const App = () => {
  const scheme = useColorScheme();
  const isDarkMode = scheme === "dark";

  React.useEffect(() => {
    StatusBar.setBarStyle(isDarkMode ? "light-content" : "dark-content");
    if (isAndroid) {
      StatusBar.setBackgroundColor("rgba(0,0,0,0)");
      StatusBar.setTranslucent(true);
    }

    setTimeout(() => {
      SplashScreen.hide();
    }, 750);
  }, [scheme, isDarkMode]);

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <TamaguiProvider config={config}>
          <Navigation />
        </TamaguiProvider>
      </QueryClientProvider>
    </>
  );
};

export default App;
