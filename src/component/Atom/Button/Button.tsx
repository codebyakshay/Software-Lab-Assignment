import {
  Animated,
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { typography } from "@/constant/Typography";

const AnimatedTouchableOpacity =
  Animated.createAnimatedComponent(TouchableOpacity);

interface ButtonProps {
  title: string;
  bgColor: string | Animated.AnimatedInterpolation<string | number>;
  onPress?: () => void;
  isLoading?: boolean;
  disabled?: boolean;
}

export default function Button({
  title,
  bgColor,
  onPress,
  isLoading,
  disabled,
}: ButtonProps) {
  const isDisabled = isLoading || disabled;

  return (
    <AnimatedTouchableOpacity
      style={[
        styles.button,
        { backgroundColor: bgColor as any },
        isDisabled && styles.disabledButton,
      ]}
      activeOpacity={0.8}
      onPress={onPress}
      disabled={isDisabled}
    >
      {isLoading ? (
        <ActivityIndicator color="#fff" />
      ) : (
        <Text style={styles.text}>{title}</Text>
      )}
    </AnimatedTouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: "100%",
    paddingVertical: 16,
    borderRadius: 100,
    alignItems: "center",
  },
  disabledButton: {
    opacity: 0.5,
  },
  text: {
    ...typography.ctaBtn,
  },
});
