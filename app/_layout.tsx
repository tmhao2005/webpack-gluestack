import "../global.css";

import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { DarkTheme, ThemeProvider } from "@react-navigation/native";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";

import colors from "tailwindcss/colors";
import PressMe from "@/components/share/PressMe";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  useEffect(() => {
    SplashScreen.hideAsync();
  }, []);

  return (
    <ThemeProvider value={DarkTheme}>
      <GluestackUIProvider
        style={{
          display: "flex",
          flex: 1,
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <PressMe />
      </GluestackUIProvider>
    </ThemeProvider>
  );
}
