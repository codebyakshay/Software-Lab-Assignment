import { Animated, StyleSheet, Text, TouchableOpacity } from "react-native";
import React from "react";

const AnimatedTouchableOpacity =
  Animated.createAnimatedComponent(TouchableOpacity);

interface ButtonProps {
  title: string;
  bgColor: string | Animated.AnimatedInterpolation<string | number>;
  onPress?: () => void;
}

export default function Button({ title, bgColor, onPress }: ButtonProps) {
  return (
    <AnimatedTouchableOpacity
      style={[styles.button, { backgroundColor: bgColor as any }]}
      activeOpacity={0.8}
      onPress={onPress}
    >
      <Text style={styles.text}>{title}</Text>
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
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
});
