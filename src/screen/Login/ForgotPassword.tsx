import React from "react";
import { StyleSheet, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Phone } from "lucide-react-native";
import { locale } from "@/constant/Strings";
import { color } from "@/constant/Color";
import { useForgotPassword } from "./useForgotPassword";

import Button from "@/component/Atom/Button/Button";
import TextInput from "@/component/Atom/TextInput/TextInput";
import ScreenWrapper from "@/component/Molecule/ScreenWrapper/ScreenWrapper";
import AuthHeader from "@/component/Molecule/AuthHeader/AuthHeader";

export default function ForgotPassword() {
  const { phoneNumber, setPhoneNumber, handleSendCode, navigateToLogin } =
    useForgotPassword();

  return (
    <ScreenWrapper>
      <SafeAreaView style={styles.screen}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <AuthHeader
            screenTitle={locale.login.forgotPassword}
            subTitle={locale.login.subTitleForgot1}
            linkText={locale.login.subTitleForgot2}
            onLinkPress={navigateToLogin}
            gap={90}
          />

          <View style={styles.fieldGrp}>
            <TextInput
              LeftIcon={Phone}
              placeholderText={locale.field.phone}
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              keyboardType="phone-pad"
            />
          </View>

          <View style={styles.btnGroupContainer}>
            <Button
              title={locale.sendCode}
              bgColor={color.brand}
              onPress={handleSendCode}
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
