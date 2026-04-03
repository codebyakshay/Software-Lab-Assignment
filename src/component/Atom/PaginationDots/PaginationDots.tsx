import { StyleSheet, View } from "react-native";
import React from "react";

interface PaginationDotsProps {
  total: number;
  activeIndex: number;
}

export default function PaginationDots({
  total,
  activeIndex,
}: PaginationDotsProps) {
  return (
    <View style={styles.container}>
      {Array.from({ length: total }, (_, index) => (
        <View
          key={index}
          style={[
            styles.dot,
            index === activeIndex ? styles.dotActive : styles.dotInactive,
          ]}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 28,
    gap: 8,
  },
  dot: {
    borderRadius: 100,
  },
  dotActive: {
    width: 26,
    height: 8,
    backgroundColor: "#333333",
  },
  dotInactive: {
    width: 8,
    height: 8,
    backgroundColor: "#D1D1D1",
  },
});
