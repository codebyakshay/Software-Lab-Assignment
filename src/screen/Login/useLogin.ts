import { useState } from "react";
import { Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { RootStackNavigationProp } from "@/navigation/types";
import { AuthService } from "@/service/AuthService";
import { useStore } from "@/store/StoreProvider";

export function useLogin() {
  const navigation = useNavigation<RootStackNavigationProp>();
  const { onboardingStore } = useStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const deviceToken = onboardingStore.deviceToken;

      if (!email || !password) {
        Alert.alert("Error", "Please fill in all fields.");
        return;
      }

      if (!deviceToken) {
        console.warn("--- Login: No device token found in store! ---");
      }

      Alert.alert("Success", "Login logic ready with device token.");
    } catch (error: any) {
      Alert.alert("Error", error.message || "An error occurred during login.");
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
