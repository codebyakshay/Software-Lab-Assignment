import { Animated, StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import React, { PropsWithChildren } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";

interface ScreenWrapperProps extends PropsWithChildren {
  style?: StyleProp<ViewStyle> | any;
}

export default function ScreenWrapper({ children, style }: ScreenWrapperProps) {
  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      keyboardShouldPersistTaps="handled"
      bottomOffset={20}
    >
      <Animated.View style={[styles.screen, style]}>{children}</Animated.View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});
