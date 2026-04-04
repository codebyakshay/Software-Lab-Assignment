import { useState } from "react";
import { Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { RootStackNavigationProp } from "@/navigation/types";
import { AuthService } from "@/service/AuthService";
import { useStore } from "@/store/StoreProvider";
import { LoginRequest } from "@/types/auth";
import { Storage, storageKeys } from "@/service/Storage";

export function useLogin() {
  const navigation = useNavigation<RootStackNavigationProp>();
  const { onboardingStore, userStore } = useStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const deviceToken = onboardingStore.deviceToken || Storage.getString(storageKeys.DEVICE_TOKEN) || "";

      if (!email || !password) {
        Alert.alert("Error", "Please fill in all fields.");
        return;
      }

      const loginData: LoginRequest = {
        email,
        password,
        role: "farmer",
        device_token: deviceToken,
        type: "email",
        social_id: ""
      };

      console.log("--- Login: Attempting Login ---", loginData);
      
      const response = await AuthService.login(loginData);
      
      if (response.token) {
        // Store in MMKV
        Storage.set(storageKeys.AUTH_TOKEN, response.token);
        
        // Update UserStore (We don't have the name from login response, so we'll use a placeholder or split email)
        userStore.setUser({
          name: email.split('@')[0], // Fallback name
          email: email,
          token: response.token
        });

        // Navigate to Home
        navigation.navigate("Home" as any);
      }
    } catch (error: any) {
      Alert.alert("Login Error", error.message || "An error occurred during login.");
    }
  };

  const handleSocialLogin = async (id: number) => {
    try {
      let result;
      if (id === 1) {
        result = await AuthService.signInWithGoogle();
      } else if (id === 2) {
        result = await AuthService.signInWithApple();
      } else {
        Alert.alert("Info", "Facebook login is not implemented yet.");
        return;
      }

      if (result) {
        Alert.alert("Success", `Signed in as ${result.user.email}`);
      }
    } catch (error: any) {
      if (error.code !== "-1") {
        Alert.alert(
          "Error",
          error.message || "An error occurred during sign in.",
        );
      }
    }
  };

  const navigateToSignup = () => navigation.replace("Signup");
  const navigateToForgotPassword = () => navigation.replace("ForgotPassword");

  return {
    email,
    setEmail,
    password,
    setPassword,
    handleLogin,
    handleSocialLogin,
    navigateToSignup,
    navigateToForgotPassword,
  };
}
