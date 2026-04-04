import React, { useRef, useState } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  NativeSyntheticEvent,
  TextInputKeyPressEventData,
} from "react-native";
import { color } from "@/constant/Color";

interface OtpInputProps {
  length?: number;
  onOtpChange: (otp: string) => void;
}

export default function OtpInput({ length = 5, onOtpChange }: OtpInputProps) {
  const [otp, setOtp] = useState<string[]>(Array(length).fill(""));
  const inputRefs = useRef<TextInput[]>([]);

  const handleChange = (text: string, index: number) => {
    const newOtp = [...otp];
    // Only take the last character typed (in case of double chars)
    newOtp[index] = text.slice(-1);
    setOtp(newOtp);
    onOtpChange(newOtp.join(""));

    // Auto-focus next box
    if (text && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (
    e: NativeSyntheticEvent<TextInputKeyPressEventData>,
    index: number,
  ) => {
    // Handling Backspace to focus previous box
    if (e.nativeEvent.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <View style={styles.container}>
      {otp.map((digit, index) => (
        <TextInput
          key={index}
          ref={(ref) => (inputRefs.current[index] = ref!)}
          style={[styles.inputBox, digit !== "" && styles.inputBoxActive]}
          maxLength={1}
          keyboardType="number-pad"
          value={digit}
          onChangeText={(text) => handleChange(text, index)}
          onKeyPress={(e) => handleKeyPress(e, index)}
          textAlign="center"
          placeholderTextColor={color.placeholderTextColor}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 2,
  },
  inputBox: {
    width: 58,
    height: 58,
    backgroundColor: color.backgroundMuted,
    borderRadius: 8,
    fontSize: 24,
    fontWeight: "600",
    color: "#000",
  },
  inputBoxActive: {
    // Optional: add a border or slightly different color when filled
  },
});
