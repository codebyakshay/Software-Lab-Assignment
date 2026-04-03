import { Animated, StyleProp, StyleSheet, ViewStyle } from "react-native";
import React, { PropsWithChildren } from "react";

interface ScreenWrapperProps extends PropsWithChildren {
  style?: StyleProp<ViewStyle> | any;
}

export default function ScreenWrapper({ children, style }: ScreenWrapperProps) {
  return (
    <Animated.View style={[styles.screen, style]}>{children}</Animated.View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});
