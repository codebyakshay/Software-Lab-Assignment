import { StyleSheet, Text, TouchableOpacity } from "react-native";
import React from "react";
import { typography } from "@/constant/Typography";

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
    ...typography.secondaryBtn,
  },
});
