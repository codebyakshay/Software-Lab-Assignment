import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { RootStackNavigationProp } from "@/navigation/types";

export function useForgotPassword() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const navigation = useNavigation<RootStackNavigationProp>();

  const handleSendCode = () => {
    // Logic to send OTP would go here
    navigation.navigate("Otp");
  };

  const navigateToLogin = () => {
    navigation.navigate("Login");
  };

  return {
    phoneNumber,
    setPhoneNumber,
    handleSendCode,
    navigateToLogin,
  };
}
