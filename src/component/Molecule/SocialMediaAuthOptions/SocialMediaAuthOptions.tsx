import { StyleSheet, TouchableOpacity, View } from "react-native";
import React from "react";
import { SvgProps } from "react-native-svg";
import { color } from "@/constant/Color";

interface SocialMediaAuthOptionsProp {
  Svg: React.FC<SvgProps>;
  onPress?: () => void;
}

export default function SocialMediaAuthOptions({
  Svg,
  onPress,
}: SocialMediaAuthOptionsProp) {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Svg width={30} height={30} preserveAspectRatio="xMidYMid meet" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 96,
    height: 52,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    borderWidth: 1,
    borderColor: color.backgroundMuted,
  },
});
