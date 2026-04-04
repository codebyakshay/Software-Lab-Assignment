import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import {
  Tag,
  Smile,
  Home,
  MapPin,
  ChevronDown,
  ArrowLeft,
} from "lucide-react-native";
import { locale } from "@/constant/Strings";
import { color } from "@/constant/Color";
import { family } from "@/constant/Typography";

import Button from "@/component/Atom/Button/Button";
import TextInput from "@/component/Atom/TextInput/TextInput";
import AuthHeader from "@/component/Molecule/AuthHeader/AuthHeader";

interface SignupStep2Props {
  businessName: string;
  setBusinessName: (text: string) => void;
  informalName: string;
  setInformalName: (text: string) => void;
  streetAddress: string;
  setStreetAddress: (text: string) => void;
  city: string;
  setCity: (text: string) => void;
  stateValue: string;
  setStateValue: (text: string) => void;
  zipCode: string;
  setZipCode: (text: string) => void;
  prevStep: () => void;
  nextStep: () => void;
}

export default function SignupStep2({
  businessName,
  setBusinessName,
  informalName,
  setInformalName,
  streetAddress,
  setStreetAddress,
  city,
  setCity,
  stateValue,
  setStateValue,
  zipCode,
  setZipCode,
  prevStep,
  nextStep,
}: SignupStep2Props) {
  return (
    <View style={styles.stepContainer}>
      <AuthHeader
        stepIndicator="Signup 2 of 4"
        screenTitle={locale.signup.farmInfoTitle}
      />

      <View style={styles.fieldGrp}>
        <TextInput
          LeftIcon={Tag}
          placeholderText={locale.field.businessName}
          value={businessName}
          onChangeText={setBusinessName}
        />

        <TextInput
          LeftIcon={Smile}
          placeholderText={locale.field.informalName}
          value={informalName}
          onChangeText={setInformalName}
        />

        <TextInput
          LeftIcon={Home}
          placeholderText={locale.field.street}
          value={streetAddress}
          onChangeText={setStreetAddress}
        />

        <TextInput
          LeftIcon={MapPin}
          placeholderText={locale.field.city}
          value={city}
          onChangeText={setCity}
        />

        <View style={styles.row}>
          <View style={{ flex: 1.5 }}>
            <TouchableOpacity style={styles.pickerContainer}>
              <Text style={styles.pickerText}>
                {stateValue || locale.field.state}
              </Text>
              <ChevronDown
                size={20}
                color={color.brand}
                fill="#000"
                style={{ transform: [{ rotate: "180deg" }] }}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.halfWidth}>
            <TextInput
              placeholderText="Enter Zipcode"
              value={zipCode}
              onChangeText={setZipCode}
              keyboardType="number-pad"
            />
          </View>
        </View>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity onPress={prevStep} style={styles.backBtn}>
          <ArrowLeft size={30} color="#000" />
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
  row: {
    flexDirection: "row",
    gap: 20,
    alignItems: "center",
  },
  halfWidth: {
    flex: 1,
  },
  pickerContainer: {
    backgroundColor: color.backgroundMuted,
    borderRadius: 8,
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
  },
  pickerText: {
    fontFamily: family.regular,
    fontSize: 14,
    color: color.placeholderTextColor,
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
