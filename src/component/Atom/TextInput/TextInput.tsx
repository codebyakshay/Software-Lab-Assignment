import React from "react";
import {
  StyleSheet,
  View,
  TextInput as TI,
  Text,
  ColorValue,
  TextInputProps as RNTextInputProps,
  TouchableOpacity,
} from "react-native";
import { color } from "@/constant/Color";
import { LucideProps } from "lucide-react-native";

interface TextInputProps extends RNTextInputProps {
  LeftIcon?: React.ForwardRefExoticComponent<
    LucideProps & React.RefAttributes<SVGSVGElement>
  >;
  placeholderText: string;
  rightText?: string;
  rightTextColor?: ColorValue;
  onRightTextPress?: () => void;
}

export default function TextInput({
  LeftIcon,
  placeholderText,
  rightText,
  rightTextColor,
  onRightTextPress,
  value,
  onChangeText,
  secureTextEntry,
  keyboardType,
  autoCapitalize,
  ...props
}: TextInputProps) {
  return (
    <View style={styles.container}>
      <TI
        style={[
          styles.textInputStyle,
          { paddingLeft: LeftIcon ? 16 + 35 : 16 },
        ]}
        placeholder={placeholderText}
        placeholderTextColor={color.placeholderTextColor}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
        {...props}
      />
      {LeftIcon && (
        <View style={styles.leftIconContainer}>
          <LeftIcon color={color.placeholderTextColor} size={20} />
        </View>
      )}

      {rightText && (
        <TouchableOpacity
          style={styles.rightIconContainer}
          onPress={onRightTextPress}
          activeOpacity={0.7}
        >
          <Text
            style={{ color: rightTextColor, fontSize: 12, fontWeight: "600" }}
          >
            {rightText}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: color.backgroundMuted,
    height: 50,
    width: "100%",
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
  },
  textInputStyle: {
    flex: 1,
    height: "100%",
    borderRadius: 8,
    paddingRight: 16,
    fontSize: 14,
  },

  leftIconContainer: {
    position: "absolute",
    justifyContent: "center",
    height: "100%",
    paddingLeft: 16,
    left: 0,
  },

  rightIconContainer: {
    position: "absolute",
    justifyContent: "center",
    height: "100%",
    paddingRight: 16,
    right: 0,
  },
});
