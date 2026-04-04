import { useState } from "react";
import { Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { RootStackNavigationProp } from "@/navigation/types";
import { AuthService } from "@/service/AuthService";
import { useStore } from "@/store/StoreProvider";

export function useSignup() {
  const navigation = useNavigation<RootStackNavigationProp>();
  const { onboardingStore } = useStore();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [reEnterPassword, setReEnterPassword] = useState("");

  const handleSignup = async () => {
    try {
      const deviceToken = onboardingStore.deviceToken;

      console.log("--- Signup: Attempting Registration ---");
      if (!fullName || !email || !password) {
        Alert.alert("Error", "Please fill in all required fields.");
        return;
      }

      if (password !== reEnterPassword) {
        Alert.alert("Error", "Passwords do not match.");
        return;
      }

      Alert.alert("Success", "Registration logic ready with device token.");
    } catch (error: any) {
      Alert.alert(
        "Error",
        error.message || "An error occurred during registration.",
      );
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

  const navigateToLogin = () => navigation.navigate("Login");

  return {
    fullName,
    setFullName,
    email,
    setEmail,
    phone,
    setPhone,
    password,
    setPassword,
    reEnterPassword,
    setReEnterPassword,
    handleSignup,
    handleSocialLogin,
    navigateToLogin,
  };
}
