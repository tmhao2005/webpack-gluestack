import "../global.css"

import { Button, ButtonText } from "@/components/ui/button";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { DarkTheme, ThemeProvider } from "@react-navigation/native";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";

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
          alignItems: "center",
        }}
      >
        <Button>
          <ButtonText>Press me!</ButtonText>
        </Button>
      </GluestackUIProvider>
    </ThemeProvider>
  );
}
