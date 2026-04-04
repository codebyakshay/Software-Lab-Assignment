import React from "react";
import { StyleSheet, ScrollView, View, TouchableOpacity, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { locale } from "@/constant/Strings";
import { color } from "@/constant/Color";
import { useOtp } from "./useOtp";

import Button from "@/component/Atom/Button/Button";
import OtpInput from "@/component/Atom/OtpInput/OtpInput";
import ScreenWrapper from "@/component/Molecule/ScreenWrapper/ScreenWrapper";
import AuthHeader from "@/component/Molecule/AuthHeader/AuthHeader";

export default function Otp() {
  const { otp, setOtp, handleSubmit, handleResendCode, navigateToLogin } =
    useOtp();

  return (
    <ScreenWrapper>
      <SafeAreaView style={styles.screen}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <AuthHeader
            screenTitle={locale.login.verifyOtp}
            subTitle={locale.login.subTitleForgot1}
            linkText={locale.login.subTitleForgot2}
            onLinkPress={navigateToLogin}
            gap={90}
          />

          <View style={styles.fieldGrp}>
            <OtpInput onOtpChange={setOtp} />
          </View>

          <View style={styles.btnGroupContainer}>
            <Button
              title={locale.submit}
              bgColor={color.brand}
              onPress={handleSubmit}
            />
            
            <TouchableOpacity 
              style={styles.resendContainer} 
              onPress={handleResendCode}
              activeOpacity={0.7}
            >
              <Text style={styles.resendText}>{locale.resendCode}</Text>
            </TouchableOpacity>
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
    marginTop: 70,
  },
  btnGroupContainer: {
    marginTop: 32,
    marginBottom: 32,
    alignItems: "center",
    gap: 20
  },
  resendContainer: {
    paddingVertical: 10
  },
  resendText: {
    fontSize: 14,
    fontWeight: "700",
    textDecorationLine: "underline",
    color: "#000"
  }
});
