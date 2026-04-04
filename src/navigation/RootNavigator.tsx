import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { observer } from "mobx-react-lite";
import { RootStackParamList } from "./types";
import Onboarding from "../screen/Onboarding/Onboarding";
import Login from "../screen/Login/Login";
import Signup from "../screen/Signup/Signup";
import ForgotPassword from "../screen/Login/ForgotPassword";
import Otp from "../screen/Login/Otp";
import ResetPassword from "../screen/Login/ResetPassword";
import Home from "../screen/Home/HomeScreen";
import { useStore } from "@/store/StoreProvider";

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator = observer(() => {
  const { onboardingStore } = useStore();

  return (
    <Stack.Navigator
      initialRouteName={
        onboardingStore.hasFinishedOnboarding ? "Login" : "Onboarding"
      }
      screenOptions={{
        headerShown: false,
      }}
    >
      {!onboardingStore.hasFinishedOnboarding && (
        <Stack.Screen name="Onboarding" component={Onboarding} />
      )}
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      <Stack.Screen name="Otp" component={Otp} />
      <Stack.Screen name="ResetPassword" component={ResetPassword} />
      <Stack.Screen name="Home" component={Home} />
    </Stack.Navigator>
  );
});

export default RootNavigator;
