import React from "react";
import { StyleSheet, Text, View, ViewStyle } from "react-native";
import { locale } from "@/constant/Strings";
import { color } from "@/constant/Color";
import { family } from "@/constant/Typography";

interface AuthHeaderProps {
  screenTitle: string;
  subTitle?: string;
  linkText?: string;
  onLinkPress?: () => void;
  stepIndicator?: string;
  containerStyle?: ViewStyle;
  gap?: number;
}

export default function AuthHeader({
  screenTitle,
  subTitle,
  linkText,
  onLinkPress,
  stepIndicator,
  containerStyle,
  gap = 40,
}: AuthHeaderProps) {
  return (
    <View style={[styles.topContainer, { gap }, containerStyle]}>
      <View style={styles.logoContainer}>
        <Text style={styles.logoTextStyle}>{locale.app.title}</Text>
      </View>

      <View style={styles.contentContainer}>
        {stepIndicator && (
          <Text style={styles.stepIndicatorStyle}>{stepIndicator}</Text>
        )}

        <Text style={styles.screenTitleTextStyle}>{screenTitle}</Text>

        {subTitle && (
          <Text style={styles.screenSubTitleTextStyle}>
            {subTitle}{" "}
            {linkText && (
              <Text style={styles.screenSubTitleTextSpan} onPress={onLinkPress}>
                {linkText}
              </Text>
            )}
          </Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  topContainer: {
    marginBottom: 30,
  },
  logoContainer: {},
  logoTextStyle: {
    fontFamily: family.regular,
    fontSize: 16,
  },
  contentContainer: {
    gap: 8,
  },
  stepIndicatorStyle: {
    fontFamily: family.medium,
    fontSize: 14,
    color: color.placeholderTextColor,
  },
  screenTitleTextStyle: {
    fontFamily: family.extraBold,
    fontSize: 32,
  },
  screenSubTitleTextStyle: {
    fontFamily: family.medium,
    fontSize: 14,
    color: color.placeholderTextColor,
  },
  screenSubTitleTextSpan: {
    fontFamily: family.medium,
    fontSize: 14,
    color: color.brand,
  },
});
