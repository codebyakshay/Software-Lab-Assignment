import React, { useCallback, useEffect } from "react";
import { AuthService } from "./service/AuthService";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import RootNavigator from "./navigation/RootNavigator";
import { StoreProvider } from "./store/StoreProvider";
import { KeyboardProvider } from "react-native-keyboard-controller";

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded, fontError] = useFonts({
    "BeVietnamPro-Regular": require("../assets/Fonts/BeVietnamPro-Regular.ttf"),
    "BeVietnamPro-Medium": require("../assets/Fonts/BeVietnamPro-Medium.ttf"),
    "BeVietnamPro-SemiBold": require("../assets/Fonts/BeVietnamPro-SemiBold.ttf"),
    "BeVietnamPro-Bold": require("../assets/Fonts/BeVietnamPro-Bold.ttf"),
    "BeVietnamPro-ExtraBold": require("../assets/Fonts/BeVietnamPro-ExtraBold.ttf"),
    "BeVietnamPro-Light": require("../assets/Fonts/BeVietnamPro-Light.ttf"),
    "BeVietnamPro-Italic": require("../assets/Fonts/BeVietnamPro-Italic.ttf"),
  });

  useEffect(() => {
    AuthService.configureGoogle(
      "47142423047-dcenhlql3do0j3t4jjn4laibc8dp4lt9.apps.googleusercontent.com"
    );
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <StoreProvider>
      <KeyboardProvider>
        <GestureHandlerRootView style={{ flex: 1 }} onLayout={onLayoutRootView}>
          <NavigationContainer>
            <RootNavigator />
            <StatusBar style="auto" />
          </NavigationContainer>
        </GestureHandlerRootView>
      </KeyboardProvider>
    </StoreProvider>
  );
}
