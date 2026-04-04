import { Animated, ActivityIndicator, StyleSheet, Text, TouchableOpacity } from "react-native";
import React from "react";
import { typography } from "@/constant/Typography";

const AnimatedTouchableOpacity =
  Animated.createAnimatedComponent(TouchableOpacity);

interface ButtonProps {
  title: string;
  bgColor: string | Animated.AnimatedInterpolation<string | number>;
  onPress?: () => void;
  isLoading?: boolean;
}

export default function Button({ title, bgColor, onPress, isLoading }: ButtonProps) {
  return (
    <AnimatedTouchableOpacity
      style={[styles.button, { backgroundColor: bgColor as any }]}
      activeOpacity={0.8}
      onPress={onPress}
      disabled={isLoading}
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
  text: {
    ...typography.ctaBtn,
  },
});
