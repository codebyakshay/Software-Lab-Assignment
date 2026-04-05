import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { RootStackNavigationProp } from "@/navigation/types";
import { AuthService } from "@/service/AuthService";
import { Alert } from "react-native";

export function useForgotPassword() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation<RootStackNavigationProp>();

  const handleSendCode = async () => {
    if (!phoneNumber) {
      Alert.alert("Error", "Please enter your mobile number");
      return;
    }

    const formattedPhone = phoneNumber.startsWith("+")
      ? phoneNumber
      : `+${phoneNumber}`;

    try {
      setIsLoading(true);
      const response = await AuthService.forgotPassword({
        mobile: formattedPhone,
      });

      if (response.success === "true" || response.success === true) {
        navigation.navigate("Otp");
      } else {
        Alert.alert("Error", response.message || "Failed to send OTP");
      }
    } catch (error: any) {
      Alert.alert("Error", error.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const navigateToLogin = () => {
    navigation.navigate("Login");
  };

  return {
    phoneNumber,
    setPhoneNumber,
    handleSendCode,
    navigateToLogin,
    isLoading,
  };
}
