import { Dimensions, StyleSheet, View } from "react-native";
import React from "react";
import { SvgProps } from "react-native-svg";

const { width } = Dimensions.get("window");

interface IllustrationContainerProps {
  Svg: React.FC<SvgProps>;
}

export default function IllustrationContainer({
  Svg,
}: IllustrationContainerProps) {
  return (
    <View style={styles.container}>
      <Svg width="100%" height="100%" preserveAspectRatio="xMidYMid meet" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
});
