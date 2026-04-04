import { useState } from "react";
import { Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { RootStackNavigationProp } from "@/navigation/types";

export function useResetPassword() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigation = useNavigation<RootStackNavigationProp>();

  const handleSubmit = () => {
    if (!newPassword || !confirmPassword) {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }

    if (newPassword !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match.");
      return;
    }

    // Logic to reset password would go here
    Alert.alert("Success", "Password updated successfully.", [
      { text: "OK", onPress: () => navigation.replace("Login") },
    ]);
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
  };
}
