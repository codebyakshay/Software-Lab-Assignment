import React from "react";
import { StyleSheet, View, ViewStyle, Text } from "react-native";
import { data } from "@/data/Onbaording.data";
import SocialMediaAuthOptions from "../SocialMediaAuthOptions/SocialMediaAuthOptions";
import { color } from "@/constant/Color";
import { family } from "@/constant/Typography";

interface SocialAuthGroupProps {
  onSocialPress: (id: number) => void;
  title: string;
  containerStyle?: ViewStyle;
  titlePosition?: "top" | "bottom";
}

export default function SocialAuthGroup({
  onSocialPress,
  title,
  containerStyle,
  titlePosition = "top",
}: SocialAuthGroupProps) {
  const renderTitle = () => (
    <Text
      style={[
        styles.title,
        titlePosition === "bottom" && { marginTop: 24, marginBottom: 0 },
      ]}
    >
      {title}
    </Text>
  );

  return (
    <View style={[styles.container, containerStyle]}>
      {titlePosition === "top" && renderTitle()}
      <View style={styles.optionsWrapper}>
        {data.socialMediaAuthOptions.map((item) => (
          <SocialMediaAuthOptions
            key={item.id.toString()}
            Svg={item.svg}
            onPress={() => onSocialPress(item.id)}
          />
        ))}
      </View>
      {titlePosition === "bottom" && renderTitle()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginTop: 20,
  },
  title: {
    fontSize: 10,
    color: color.placeholderTextColor,
    fontFamily: family.medium,
    marginBottom: 24,
    textTransform: "lowercase",
  },
  optionsWrapper: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 20,
  },
});
