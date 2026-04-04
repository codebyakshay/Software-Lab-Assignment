import React from "react";
import { StyleSheet, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LockKeyhole } from "lucide-react-native";
import { locale } from "@/constant/Strings";
import { color } from "@/constant/Color";
import { useResetPassword } from "./useResetPassword";

import Button from "@/component/Atom/Button/Button";
import TextInput from "@/component/Atom/TextInput/TextInput";
import ScreenWrapper from "@/component/Molecule/ScreenWrapper/ScreenWrapper";
import AuthHeader from "@/component/Molecule/AuthHeader/AuthHeader";

export default function ResetPassword() {
  const {
    newPassword,
    setNewPassword,
    confirmPassword,
    setConfirmPassword,
    handleSubmit,
    navigateToLogin,
  } = useResetPassword();

  return (
    <ScreenWrapper>
      <SafeAreaView style={styles.screen}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <AuthHeader
            screenTitle={locale.login.resetPassword}
            subTitle={locale.login.subTitleForgot1}
            linkText={locale.login.subTitleForgot2}
            onLinkPress={navigateToLogin}
            gap={90}
          />

          <View style={styles.fieldGrp}>
            <TextInput
              LeftIcon={LockKeyhole}
              placeholderText={locale.field.newPassword}
              value={newPassword}
              onChangeText={setNewPassword}
              secureTextEntry
            />

            <TextInput
              LeftIcon={LockKeyhole}
              placeholderText={locale.field.confirmNewPassword}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
            />
          </View>

          <View style={styles.btnGroupContainer}>
            <Button
              title={locale.submit}
              bgColor={color.brand}
              onPress={handleSubmit}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </ScreenWrapper>
  );
}

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
});
