import { useState } from "react";
import { Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { RootStackNavigationProp } from "@/navigation/types";

export function useOtp() {
  const [otp, setOtp] = useState("");
  const navigation = useNavigation<RootStackNavigationProp>();

  const handleSubmit = () => {
    if (otp.length < 5) {
      Alert.alert("Error", "Please enter the full 5-digit code.");
      return;
    }
    // Proceed to Reset Password screen
    navigation.navigate("ResetPassword");
  };

  const handleResendCode = () => {
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
  };
}
