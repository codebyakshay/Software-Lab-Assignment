import React from "react";
import { StyleSheet, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { observer } from "mobx-react-lite";
import { color } from "@/constant/Color";

import ScreenWrapper from "@/component/Molecule/ScreenWrapper/ScreenWrapper";
import { useSignup } from "./useSignup";

// Import Step Components
import SignupStep1 from "./components/SignupStep1";
import SignupStep2 from "./components/SignupStep2";
import SignupStep3 from "./components/SignupStep3";
import SignupStep4 from "./components/SignupStep4";
import SignupDone from "./components/SignupDone";

const Signup = observer(function Signup() {
  const {
    step,
    nextStep,
    prevStep,
    handleSocialLogin,
    navigateToLogin,
    handleSignup,
    handleFinish,
    credentials,
    farm,
    verification,
    hours,
  } = useSignup();

  return (
    <ScreenWrapper>
      <SafeAreaView style={styles.screen}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {step === 1 && (
            <SignupStep1
              {...credentials}
              handleSocialLogin={handleSocialLogin}
              navigateToLogin={navigateToLogin}
              nextStep={nextStep}
            />
          )}

          {step === 2 && (
            <SignupStep2
              {...farm}
              prevStep={prevStep}
              nextStep={nextStep}
            />
          )}

          {step === 3 && (
            <SignupStep3
              {...verification}
              prevStep={prevStep}
              nextStep={nextStep}
            />
          )}

          {step === 4 && (
            <SignupStep4
              {...hours}
              prevStep={prevStep}
              handleSignup={handleSignup}
            />
          )}

          {step === 5 && (
            <SignupDone onDone={handleFinish} />
          )}
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
    flexGrow: 1,
  },
});
