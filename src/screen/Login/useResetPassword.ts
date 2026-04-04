import { useState } from "react";
import { Alert } from "react-native";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { RootStackParamList, RootStackNavigationProp } from "@/navigation/types";
import { AuthService } from "@/service/AuthService";

export function useResetPassword() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  const navigation = useNavigation<RootStackNavigationProp>();
  const route = useRoute<RouteProp<RootStackParamList, "ResetPassword">>();
  const { token } = route.params;

  const handleSubmit = async () => {
    if (!newPassword || !confirmPassword) {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }

    if (newPassword !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match.");
      return;
    }

    try {
      setIsLoading(true);
      const response = await AuthService.resetPassword({
        token,
        password: newPassword,
        cpassword: confirmPassword,
      });

      if (response.success === "true" || response.success === true) {
        Alert.alert("Success", response.message || "Password updated successfully.", [
          { text: "OK", onPress: () => navigation.replace("Login") },
        ]);
      } else {
        Alert.alert("Error", response.message || "Failed to reset password.");
      }
    } catch (error: any) {
      Alert.alert("Error", error.message || "Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  const navigateToLogin = () => {
    navigation.replace("Login");
  };

  return {
    newPassword,
    setNewPassword,
    confirmPassword,
    setConfirmPassword,
    handleSubmit,
    navigateToLogin,
    isLoading,
  };
}
