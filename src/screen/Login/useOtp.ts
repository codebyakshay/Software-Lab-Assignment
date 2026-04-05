import { useState } from "react";
import { Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { RootStackNavigationProp } from "@/navigation/types";
import { AuthService } from "@/service/AuthService";

export function useOtp() {
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation<RootStackNavigationProp>();

  const handleSubmit = async () => {
    if (otp.length < 6) {
      Alert.alert("Error", "Please enter the full 6-digit code.");
      return;
    }

    try {
      setIsLoading(true);
      const response = await AuthService.verifyOtp({ otp });

      if (response.success === "true" || response.success === true) {
        // Pass the token to the ResetPassword screen
        navigation.navigate("ResetPassword", { token: response.token });
      } else {
        Alert.alert("Error", response.message || "Failed to verify OTP");
      }
    } catch (error: any) {
      Alert.alert("Error", error.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendCode = () => {
    // Optional: Call forgotPassword again to resend
    Alert.alert("Info", "OTP resent successfully.");
  };

  const navigateToLogin = () => {
    navigation.navigate("Login");
  };

  return {
    otp,
    setOtp,
    handleSubmit,
    handleResendCode,
    navigateToLogin,
    isLoading,
  };
}
