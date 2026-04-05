import React from "react";
import { StyleSheet, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AtSign, LockKeyhole } from "lucide-react-native";
import { observer } from "mobx-react-lite";
import { locale } from "@/constant/Strings";
import { color } from "@/constant/Color";
import { useLogin } from "./useLogin";

import Button from "@/component/Atom/Button/Button";
import TextInput from "@/component/Atom/TextInput/TextInput";
import ScreenWrapper from "@/component/Molecule/ScreenWrapper/ScreenWrapper";
import AuthHeader from "@/component/Molecule/AuthHeader/AuthHeader";
import SocialAuthGroup from "@/component/Molecule/SocialAuthGroup/SocialAuthGroup";
import { View } from "react-native";

const Login = observer(function Login() {
  const {
    email,
    setEmail,
    password,
    setPassword,
    handleLogin,
    handleSocialLogin,
    navigateToSignup,
    navigateToForgotPassword,
    isLoading,
  } = useLogin();

  return (
    <ScreenWrapper>
      <SafeAreaView style={styles.screen}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <AuthHeader
            screenTitle={locale.login.title}
            subTitle={locale.login.subTitleLogin1}
            linkText={locale.login.subTitleLogin2}
            onLinkPress={navigateToSignup}
            gap={90}
          />

          <View style={styles.fieldGrp}>
            <TextInput
              LeftIcon={AtSign}
              placeholderText={locale.field.email}
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
            />

            <TextInput
              LeftIcon={LockKeyhole}
              placeholderText={locale.field.password}
              rightText={locale.field.forgot}
              rightTextColor={color.brand}
              onRightTextPress={navigateToForgotPassword}
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
          </View>

          <View style={styles.btnGroupContainer}>
            <Button
              title="Login"
              bgColor={color.brand}
              onPress={handleLogin}
              isLoading={isLoading}
            />
          </View>

          <SocialAuthGroup
            onSocialPress={handleSocialLogin}
            title={locale.orLoginWith}
            containerStyle={styles.socialGrp}
          />
        </ScrollView>
      </SafeAreaView>
    </ScreenWrapper>
  );
});

export default Login;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingHorizontal: 30,
    backgroundColor: color.backgound,
  },
  fieldGrp: {
    gap: 20,
    marginTop: 70,
  },
  btnGroupContainer: {
    marginTop: 32,
    marginBottom: 32,
    alignItems: "center",
  },
  socialGrp: {
    marginTop: 0,
  },
});
