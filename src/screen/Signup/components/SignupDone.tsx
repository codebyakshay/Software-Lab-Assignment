import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { locale } from "@/constant/Strings";
import { color } from "@/constant/Color";
import { family } from "@/constant/Typography";
import Button from "@/component/Atom/Button/Button";
import Vector from "../../../../assets/Images/Vector.svg";

interface SignupDoneProps {
  onDone: () => void;
}

export default function SignupDone({ onDone }: SignupDoneProps) {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <Vector width={120} height={80} />
        </View>

        <Text style={styles.title}>{locale.signup.signupDoneTitle}</Text>
        <Text style={styles.subtitle}>{locale.signup.signupDoneSubtitle}</Text>
      </View>

      <View style={styles.footer}>
        <Button title="Got it!" bgColor={color.brand} onPress={onDone} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 80,
  },
  content: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
  iconContainer: {
    marginBottom: 40,
  },
  title: {
    fontFamily: family.bold,
    fontSize: 32,
    color: "#261C12",
    marginBottom: 24,
    textAlign: "center",
  },
  subtitle: {
    fontFamily: family.regular,
    fontSize: 14,
    color: "#898989",
    textAlign: "center",
    lineHeight: 20,
    paddingHorizontal: 20,
  },
  footer: {
    width: "100%",
    marginTop: "auto",
    paddingBottom: 20,
  },
});
