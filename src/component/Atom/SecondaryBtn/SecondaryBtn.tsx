import { StyleSheet, Text, TouchableOpacity } from "react-native";
import React from "react";

interface SecondaryBtnProps {
  title: string;
  onPress?: () => void;
}

export default function SecondaryBtn({ title, onPress }: SecondaryBtnProps) {
  return (
    <TouchableOpacity activeOpacity={0.6} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 14,
    fontWeight: "500",
    color: "#1A1A1A",
    textDecorationLine: "underline",
  },
});
