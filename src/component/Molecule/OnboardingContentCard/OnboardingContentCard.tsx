import { Animated, StyleSheet, Text, View } from "react-native";
import React from "react";
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
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 32,
    paddingTop: 32,
    alignItems: "center",
    height: "40%",
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#1A1A1A",
    marginBottom: 12,
    textAlign: "center",
  },
  subtitleContainer: {
    minHeight: "20%",
    maxHeight: "30%",
  },
  subtitle: {
    fontSize: 14,
    lineHeight: 21,
    color: "#6B6B6B",
    textAlign: "center",
    marginBottom: 24,
  },
  btnGroup: {
    width: "100%",
    alignItems: "center",
    gap: 20,
  },
});
