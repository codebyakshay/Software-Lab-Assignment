import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  TouchableWithoutFeedback,
  Modal,
  FlatList,
} from "react-native";
import {
  Tag,
  Smile,
  Home,
  MapPin,
  ChevronDown,
  ArrowLeft,
  X,
} from "lucide-react-native";
import { locale } from "@/constant/Strings";
import { color } from "@/constant/Color";
import { family } from "@/constant/Typography";
import { state as stateData } from "@/data/State.data";

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
  const [isModalVisible, setIsModalVisible] = React.useState(false);

  return (
    <>
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
              <TouchableOpacity
                style={styles.pickerContainer}
                onPress={() => setIsModalVisible(true)}
              >
                <Text
                  style={[
                    styles.pickerText,
                    stateValue !== "" && { color: "#000" },
                  ]}
                >
                  {stateValue || locale.field.state}
                </Text>
                <ChevronDown size={20} color={color.brand} />
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

      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <TouchableWithoutFeedback onPress={() => setIsModalVisible(false)}>
            <View style={styles.modalDismissArea} />
          </TouchableWithoutFeedback>
          <View style={styles.modalContent}>
            <View style={styles.handle} />
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select State</Text>
              <TouchableOpacity
                onPress={() => setIsModalVisible(false)}
                style={styles.closeBtn}
              >
                <X size={24} color="#000" />
              </TouchableOpacity>
            </View>
            <FlatList
              data={stateData}
              keyExtractor={(item) => item.id.toString()}
              style={styles.listContainer}
              showsVerticalScrollIndicator={false}
              initialNumToRender={15}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.stateItem}
                  onPress={() => {
                    setStateValue(item.name);
                    setIsModalVisible(false);
                  }}
                >
                  <Text
                    style={[
                      styles.stateItemText,
                      stateValue === item.name && styles.stateItemTextActive,
                    ]}
                  >
                    {item.name}
                  </Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </Modal>
    </>
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
  modalOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
    zIndex: 1000,
  },
  modalDismissArea: {
    flex: 1,
  },
  modalContent: {
    backgroundColor: "#FFF",
    width: "100%",
    maxHeight: "80%",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingBottom: 40,
  },
  handle: {
    width: 40,
    height: 5,
    backgroundColor: "#E5E5E5",
    borderRadius: 2.5,
    alignSelf: "center",
    marginTop: 12,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#F5F5F5",
  },
  modalTitle: {
    fontFamily: family.bold,
    fontSize: 20,
    color: "#000",
  },
  closeBtn: {
    padding: 4,
  },
  listContainer: {
    paddingHorizontal: 24,
  },
  stateItem: {
    paddingVertical: 18,
    borderBottomWidth: 1,
    borderBottomColor: "#F5F5F5",
  },
  stateItemText: {
    fontFamily: family.regular,
    fontSize: 16,
    color: "#261C12",
  },
  stateItemTextActive: {
    fontFamily: family.bold,
    color: color.brand,
  },
});
