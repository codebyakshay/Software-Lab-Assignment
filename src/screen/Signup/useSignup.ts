import { useState } from "react";
import { Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { RootStackNavigationProp } from "@/navigation/types";
import { AuthService } from "@/service/AuthService";
import { useStore } from "@/store/StoreProvider";

export function useSignup() {
  const navigation = useNavigation<RootStackNavigationProp>();
  const { onboardingStore } = useStore();

  const [step, setStep] = useState(1);

  // Step 1: Welcome
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [reEnterPassword, setReEnterPassword] = useState("");

  // Step 2: Farm Info
  const [businessName, setBusinessName] = useState("");
  const [informalName, setInformalName] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [city, setCity] = useState("");
  const [stateValue, setStateValue] = useState("");
  const [zipCode, setZipCode] = useState("");

  // Step 3: Verification
  const [proofFile, setProofFile] = useState<string | null>(null);

  // Step 4: Business Hours
  const days = ["M", "T", "W", "Th", "F", "S", "Su"];
  const timeSlots = [
    "8:00am - 10:00am",
    "10:00am - 1:00pm",
    "1:00pm - 4:00pm",
    "4:00pm - 7:00pm",
    "7:00pm - 10:00pm",
  ];
  const [selectedDay, setSelectedDay] = useState("W");
  const [selectedHours, setSelectedHours] = useState<Record<string, string[]>>({
    W: ["8:00am - 10:00am", "10:00am - 1:00pm"],
  });

  const toggleDay = (day: string) => setSelectedDay(day);

  const toggleTimeSlot = (slot: string) => {
    setSelectedHours((prev) => {
      const currentHours = prev[selectedDay] || [];
      const isSelected = currentHours.includes(slot);
      const updatedHours = isSelected
        ? currentHours.filter((h) => h !== slot)
        : [...currentHours, slot];

      return { ...prev, [selectedDay]: updatedHours };
    });
  };

  const handleAttachProof = () => {
    // Mock file attachment
    setProofFile("usda_registration.pdf");
  };

  const nextStep = () => {
    if (step === 1) {
      if (!fullName || !email || !password) {
        Alert.alert("Error", "Please fill in all required fields.");
        return;
      }
      if (password !== reEnterPassword) {
        Alert.alert("Error", "Passwords do not match.");
        return;
      }
    }
    setStep((prev) => prev + 1);
  };

  const prevStep = () => setStep((prev) => prev - 1);

  const handleSignup = async () => {
    try {
      const deviceToken = onboardingStore.deviceToken;
      console.log("--- Signup: Attempting Final Registration ---");
      // TODO: Connect to AuthService.register(formData)
      // Transition to Step 5 (Done)
      setStep(5);
    } catch (error: any) {
      Alert.alert(
        "Error",
        error.message || "An error occurred during registration.",
      );
    }
  };

  const handleFinish = () => {
    navigation.navigate("Login");
  };

  const handleSocialLogin = async (id: number) => {
    try {
      let result;
      if (id === 1) {
        result = await AuthService.signInWithGoogle();
      } else if (id === 2) {
        result = await AuthService.signInWithApple();
      } else {
        Alert.alert("Info", "Facebook login is not implemented yet.");
        return;
      }

      if (result) {
        Alert.alert("Success", `Signed in as ${result.user.email}`);
      }
    } catch (error: any) {
      if (error.code !== "-1") {
        Alert.alert(
          "Error",
          error.message || "An error occurred during sign in.",
        );
      }
    }
  };

  const navigateToLogin = () => navigation.navigate("Login");

  return {
    // Basic
    step,
    nextStep,
    prevStep,
    navigateToLogin,
    handleSignup,
    handleFinish,
    handleSocialLogin,

    // Step 1 Data
    credentials: {
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
    },

    // Step 2 Data
    farm: {
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
    },

    // Step 3 Data
    verification: {
      proofFile,
      setProofFile,
      handleAttachProof,
    },

    // Step 4 Data
    hours: {
      days,
      timeSlots,
      selectedDay,
      toggleDay,
      selectedHours,
      toggleTimeSlot,
    },
  };
}
