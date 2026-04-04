import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { AtSign, LockKeyhole, User, Phone } from "lucide-react-native";
import { locale } from "@/constant/Strings";
import { color } from "@/constant/Color";
import { family } from "@/constant/Typography";

import Button from "@/component/Atom/Button/Button";
import TextInput from "@/component/Atom/TextInput/TextInput";
import SocialAuthGroup from "@/component/Molecule/SocialAuthGroup/SocialAuthGroup";
import AuthHeader from "@/component/Molecule/AuthHeader/AuthHeader";

interface SignupStep1Props {
  fullName: string;
  setFullName: (text: string) => void;
  email: string;
  setEmail: (text: string) => void;
  phone: string;
  setPhone: (text: string) => void;
  password: string;
  setPassword: (text: string) => void;
  reEnterPassword: string;
  setReEnterPassword: (text: string) => void;
  handleSocialLogin: (id: number) => void;
  navigateToLogin: () => void;
  nextStep: () => void;
}

export default function SignupStep1({
  fullName,
  setFullName,
  email,
  setEmail,
  phone,
  setPhone,
  password,
  setPassword,
  reEnterPassword,
  setReEnterPassword,
  handleSocialLogin,
  navigateToLogin,
  nextStep,
}: SignupStep1Props) {
  return (
    <View style={styles.stepContainer}>
      <AuthHeader
        stepIndicator="Signup 1 of 4"
        screenTitle={locale.signup.title}
      />

      <SocialAuthGroup
        onSocialPress={handleSocialLogin}
        title={locale.signup.orSignupWith}
        titlePosition="bottom"
      />

      <View style={styles.fieldGrp}>
        <TextInput
          LeftIcon={User}
          placeholderText={locale.field.fullName}
          value={fullName}
          onChangeText={setFullName}
        />

        <TextInput
          LeftIcon={AtSign}
          placeholderText={locale.field.email}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <TextInput
          LeftIcon={Phone}
          placeholderText={locale.field.phone}
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
        />

        <TextInput
          LeftIcon={LockKeyhole}
          placeholderText={locale.field.password}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <TextInput
          LeftIcon={LockKeyhole}
          placeholderText="Re-enter Password"
          value={reEnterPassword}
          onChangeText={setReEnterPassword}
          secureTextEntry
        />
      </View>

      <View style={styles.footer}>
        <TouchableOpacity onPress={navigateToLogin}>
          <Text style={styles.loginLink}>{locale.login.subTitleForgot2}</Text>
        </TouchableOpacity>

        <View style={styles.btnWrapper}>
          <Button title="Continue" bgColor={color.brand} onPress={nextStep} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  stepContainer: {
    flex: 1,
  },
  fieldGrp: {
    gap: 20,
    marginTop: 32,
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: "auto",
    paddingTop: 40,
  },
  loginLink: {
    fontFamily: family.medium,
    fontSize: 14,
    textDecorationLine: "underline",
  },
  btnWrapper: {
    width: "60%",
  },
});
