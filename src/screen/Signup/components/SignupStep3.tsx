import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Camera, X, ArrowLeft } from "lucide-react-native";
import { locale } from "@/constant/Strings";
import { color } from "@/constant/Color";
import { family } from "@/constant/Typography";

import Button from "@/component/Atom/Button/Button";
import AuthHeader from "@/component/Molecule/AuthHeader/AuthHeader";

interface SignupStep3Props {
  proofFile: string | null;
  setProofFile: (file: string | null) => void;
  handleAttachProof: () => void;
  prevStep: () => void;
  nextStep: () => void;
}

export default function SignupStep3({
  proofFile,
  setProofFile,
  handleAttachProof,
  prevStep,
  nextStep,
}: SignupStep3Props) {
  return (
    <View style={styles.stepContainer}>
      <AuthHeader
        stepIndicator="Signup 3 of 4"
        screenTitle={locale.signup.verificationTitle}
      />
      <View style={styles.subtitleGroup}>
        <Text style={styles.verificationSubtitle}>
          {locale.signup.verificationSubtitle}
        </Text>
      </View>

      <View style={styles.attachRow}>
        <Text style={styles.attachText}>{locale.signup.attachProof}</Text>
        <TouchableOpacity
          onPress={handleAttachProof}
          style={styles.cameraCircle}
        >
          <Camera size={24} color="#FFF" />
        </TouchableOpacity>
      </View>

      {proofFile && (
        <View style={styles.fileRow}>
          <Text style={styles.fileName}>{proofFile}</Text>
          <TouchableOpacity onPress={() => setProofFile(null)}>
            <X size={20} color="#000" />
          </TouchableOpacity>
        </View>
      )}

      <View style={styles.footer}>
        <TouchableOpacity onPress={prevStep} style={styles.backBtn}>
          <ArrowLeft size={30} color="#000" />
        </TouchableOpacity>
        <View style={styles.btnWrapper}>
          <Button
            title={locale.submit}
            bgColor={color.brand}
            onPress={nextStep}
            disabled={!proofFile}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  stepContainer: {
    flex: 1,
  },
  subtitleGroup: {
    marginTop: -20,
    marginBottom: 40,
  },
  verificationSubtitle: {
    fontFamily: family.regular,
    fontSize: 14,
    color: "#898989",
    lineHeight: 18,
  },
  attachRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  attachText: {
    fontFamily: family.medium,
    fontSize: 14,
    color: "#261C12",
  },
  cameraCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: color.brand,
    justifyContent: "center",
    alignItems: "center",
  },
  fileRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: color.backgroundMuted,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 24,
  },
  fileName: {
    fontFamily: family.regular,
    fontSize: 14,
    color: "#261C12",
    textDecorationLine: "underline",
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: "auto",
    paddingTop: 40,
  },
  btnWrapper: {
    width: "60%",
  },
  backBtn: {
    padding: 10,
    marginLeft: -10,
  },
});
