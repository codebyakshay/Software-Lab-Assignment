import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AtSign, LockKeyhole, User, Phone } from "lucide-react-native";
import { observer } from "mobx-react-lite";
import { locale } from "@/constant/Strings";
import { color } from "@/constant/Color";
import { family } from "@/constant/Typography";
import { useSignup } from "./useSignup";

import Button from "@/component/Atom/Button/Button";
import TextInput from "@/component/Atom/TextInput/TextInput";
import ScreenWrapper from "@/component/Molecule/ScreenWrapper/ScreenWrapper";
import SocialAuthGroup from "@/component/Molecule/SocialAuthGroup/SocialAuthGroup";
import AuthHeader from "@/component/Molecule/AuthHeader/AuthHeader";

const Signup = observer(function Signup() {
  const {
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
    handleSignup,
    handleSocialLogin,
    navigateToLogin,
  } = useSignup();

  return (
    <ScreenWrapper>
      <SafeAreaView style={styles.screen}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
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
              <Text style={styles.loginLink}>
                {locale.login.subTitleForgot2}
              </Text>
            </TouchableOpacity>

            <View style={styles.btnWrapper}>
              <Button
                title="Continue"
                bgColor={color.brand}
                onPress={handleSignup}
              />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </ScreenWrapper>
  );
});

export default Signup;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingHorizontal: 30,
    backgroundColor: color.backgound,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  fieldGrp: {
    gap: 20,
    marginTop: 32,
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 80,
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
