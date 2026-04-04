import { TextStyle } from "react-native";

export const family = {
  regular: "BeVietnamPro-Regular",
  medium: "BeVietnamPro-Medium",
  semiBold: "BeVietnamPro-SemiBold",
  bold: "BeVietnamPro-Bold",
  extraBold: "BeVietnamPro-ExtraBold",
  light: "BeVietnamPro-Light",
  italic: "BeVietnamPro-Italic",
} as const;

export type FamilyType = keyof typeof family;

export const typography = {
  onBoarding: {
    title: {
      fontFamily: family.semiBold,
      fontSize: 22,
      color: "#1A1A1A",
      textAlign: "center",
    } as TextStyle,
    subtitle: {
      fontFamily: family.regular,
      fontSize: 14,
      lineHeight: 21,
      color: "#261C12",
      textAlign: "center",
    } as TextStyle,
  },
  ctaBtn: {
    fontFamily: family.medium,
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  } as TextStyle,
  secondaryBtn: {
    fontSize: 14,
    fontWeight: "500",
    color: "#1A1A1A",
    textDecorationLine: "underline",
  } as TextStyle,
};
