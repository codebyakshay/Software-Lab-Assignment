import { Animated, StyleSheet, Text, View } from "react-native";
import React from "react";
import { typography } from "@/constant/Typography";
import { color } from "@/constant/Color";
import PaginationDots from "@/component/Atom/PaginationDots/PaginationDots";
import Button from "@/component/Atom/Button/Button";
import SecondaryBtn from "@/component/Atom/SecondaryBtn/SecondaryBtn";

interface OnboardingContentCardProps {
  title: string;
  subtitle: string;
  totalSlides: number;
  activeIndex: number;
  ctaBtnTitle: string;
  ctaBgColor: string | Animated.AnimatedInterpolation<string | number>;
  secondaryBtnTitle: string;
  onCtaPress: () => void;
  onSecondaryPress?: () => void;
}

export default function OnboardingContentCard({
  title,
  subtitle,
  totalSlides,
  activeIndex,
  ctaBtnTitle,
  ctaBgColor,
  secondaryBtnTitle,
  onCtaPress,
  onSecondaryPress,
}: OnboardingContentCardProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.subtitleContainer}>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>
      <PaginationDots total={totalSlides} activeIndex={activeIndex} />
      <View style={styles.btnGroup}>
        <Button title={ctaBtnTitle} bgColor={ctaBgColor} onPress={onCtaPress} />
        <SecondaryBtn title={secondaryBtnTitle} onPress={onSecondaryPress} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: color.backgound,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 32,
    paddingTop: 32,
    alignItems: "center",
    height: "40%",
  },
  title: {
    ...typography.onBoarding.title,
    marginBottom: 12,
  },
  subtitleContainer: {
    minHeight: "20%",
    maxHeight: "30%",
  },
  subtitle: {
    ...typography.onBoarding.subtitle,
    marginBottom: 24,
  },
  btnGroup: {
    width: "100%",
    alignItems: "center",
    gap: 20,
  },
});
