import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { ArrowLeft } from "lucide-react-native";
import { locale } from "@/constant/Strings";
import { color } from "@/constant/Color";
import { family } from "@/constant/Typography";

import Button from "@/component/Atom/Button/Button";
import AuthHeader from "@/component/Molecule/AuthHeader/AuthHeader";

interface SignupStep4Props {
  days: string[];
  timeSlots: string[];
  selectedDay: string;
  toggleDay: (day: string) => void;
  selectedHours: Record<string, string[]>;
  toggleTimeSlot: (slot: string) => void;
  prevStep: () => void;
  handleSignup: () => void;
  isLoading?: boolean;
}

export default function SignupStep4({
  days,
  timeSlots,
  selectedDay,
  toggleDay,
  selectedHours,
  toggleTimeSlot,
  prevStep,
  handleSignup,
  isLoading,
}: SignupStep4Props) {
  return (
    <View style={styles.stepContainer}>
      <AuthHeader
        stepIndicator="Signup 4 of 4"
        screenTitle={locale.signup.businessHoursTitle}
      />
      <View style={styles.subtitleGroup}>
        <Text style={styles.verificationSubtitle}>
          {locale.signup.businessHoursSubtitle}
        </Text>
      </View>

      <View style={styles.daysRow}>
        {days.map((day) => {
          const isSelected = selectedDay === day;
          const hasHours = (selectedHours[day] || []).length > 0;

          return (
            <TouchableOpacity
              key={day}
              onPress={() => toggleDay(day)}
              style={[
                styles.dayBtn,
                isSelected && styles.dayBtnSelected,
                !isSelected && !hasHours && styles.dayBtnEmpty,
              ]}
            >
              <Text
                style={[
                  styles.dayText,
                  isSelected && styles.dayTextSelected,
                  !isSelected && !hasHours && styles.dayTextEmpty,
                ]}
              >
                {day}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <View style={styles.slotsGrid}>
        {timeSlots.map((slot) => {
          const isSelected = (selectedHours[selectedDay] || []).includes(slot);

          return (
            <TouchableOpacity
              key={slot}
              onPress={() => toggleTimeSlot(slot)}
              style={[styles.slotBtn, isSelected && styles.slotBtnSelected]}
            >
              <Text style={styles.slotText}>{slot}</Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <View style={styles.footer}>
        <TouchableOpacity onPress={prevStep} style={styles.backBtn}>
          <ArrowLeft size={30} color="#000" />
        </TouchableOpacity>
        <View style={styles.btnWrapper}>
          <Button
            title="Signup"
            bgColor={color.brand}
            onPress={handleSignup}
            isLoading={isLoading}
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
  daysRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 30,
  },
  dayBtn: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: color.backgroundMuted,
    justifyContent: "center",
    alignItems: "center",
  },
  dayBtnSelected: {
    backgroundColor: color.brand,
  },
  dayBtnEmpty: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#E9E9E9",
  },
  dayText: {
    fontFamily: family.regular,
    fontSize: 14,
    color: "#261C12",
  },
  dayTextSelected: {
    color: "#FFF",
  },
  dayTextEmpty: {
    color: "#0000004D",
  },
  slotsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  slotBtn: {
    width: "48%",
    paddingVertical: 14,
    borderRadius: 12,
    backgroundColor: color.backgroundMuted,
    alignItems: "center",
    justifyContent: "center",
  },
  slotBtnSelected: {
    backgroundColor: color.onBoarding.color3, // Yellow/Orange
  },
  slotText: {
    fontFamily: family.regular,
    fontSize: 12,
    color: "#261C12",
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
