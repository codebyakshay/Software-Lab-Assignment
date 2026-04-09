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
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    try {
      setIsLoading(true);
      const deviceToken =
        onboardingStore.deviceToken ||
        Storage.getString(storageKeys.DEVICE_TOKEN) ||
        "";

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
        social_id: "",
      };

      const response = await AuthService.login(loginData);

      if (response.token) {
        // Store in MMKV
        Storage.set(storageKeys.AUTH_TOKEN, response.token);

        // Update UserStore (We don't have the name from login response, so we'll use a placeholder or split email)
        userStore.setUser({
          name: email.split("@")[0], // Fallback name
          email: email,
          token: response.token,
        });

        // Navigate to Home
        navigation.navigate("Home" as any);
      }
    } catch (error: any) {
      Alert.alert(
        "Login Error",
        error.message || "An error occurred during login.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = async (id: number) => {
    try {
      setIsLoading(true);
      let result;
      let type: "google" | "apple" | "facebook";

      if (id === 1) {
        result = await AuthService.signInWithGoogle();
        type = "google";
      } else if (id === 2) {
        result = await AuthService.signInWithApple();
        type = "apple";
      } else {
        Alert.alert("Info", "Facebook login is not implemented yet.");
        setIsLoading(false);
        return;
      }

      if (result) {
        const deviceToken =
          onboardingStore.deviceToken ||
          Storage.getString(storageKeys.DEVICE_TOKEN) ||
          "some-mock-device-token";

        const loginData: LoginRequest = {
          email: result.user.email || "",
          role: "farmer",
          device_token: deviceToken,
          type: type,
          social_id: result.user.uid,
        };

        try {
          const response = await AuthService.login(loginData);

          if (response.token) {
            // Store in MMKV
            Storage.set(storageKeys.AUTH_TOKEN, response.token);

            // Update UserStore
            userStore.setUser({
              name:
                result.user.displayName ||
                result.user.email?.split("@")[0] ||
                "User",
              email: result.user.email || "",
              token: response.token,
            });

            // Navigate to Home
            navigation.navigate("Home" as any);
          }
        } catch (error: any) {
          const errorMessage = error.message || "";
          if (errorMessage.includes("Account does not exist")) {
            // If account doesn't exist, redirect to Signup with pre-filled data
            Alert.alert(
              "Account Not Found",
              "We couldn't find a Farmer account linked to this Google account. Redirecting you to signup to finish your profile.",
              [
                {
                  text: "Wait",
                  style: "cancel",
                },
                {
                  text: "Continue to Signup",
                  onPress: () => {
                    navigation.navigate("Signup", {
                      initialData: {
                        email: result.user.email || "",
                        fullName: result.user.displayName || "",
                        social_id: result.user.uid,
                        type: type,
                      },
                    });
                  },
                },
              ],
            );
          } else if (errorMessage.includes("Type not matched")) {
            Alert.alert(
              "Login Conflict",
              "This email is already registered with a password. Please log in using your email and password instead.",
            );
          } else {
            throw error; // Rethrow for outer catch
          }
        }
      }
    } catch (error: any) {
      if (error.code !== "-1" && error.code !== "auth/sign-in-cancelled") {
        Alert.alert(
          "Error",
          error.message || "An error occurred during sign in.",
        );
      }
    } finally {
      setIsLoading(false);
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
    isLoading,
  };
}
