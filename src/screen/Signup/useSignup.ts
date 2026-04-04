import { useState } from "react";
import { Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { RootStackNavigationProp } from "@/navigation/types";
import { AuthService } from "@/service/AuthService";
import { useStore } from "@/store/StoreProvider";
import { RegisterRequest } from "@/types/auth";
import { Storage, storageKeys } from "@/service/Storage";

export function useSignup() {
  const navigation = useNavigation<RootStackNavigationProp>();
  const { onboardingStore, userStore } = useStore();

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
      const deviceToken =
        onboardingStore.deviceToken ||
        Storage.getString(storageKeys.DEVICE_TOKEN) ||
        "";

      console.log("--- Signup: Transforming Data for API ---");

      // Transform Business Hours keys
      const dayMap: Record<string, string> = {
        M: "mon",
        T: "tue",
        W: "wed",
        Th: "thu",
        F: "fri",
        S: "sat",
        Su: "sun",
      };

      const transformedHours: any = {};
      Object.entries(selectedHours).forEach(([day, slots]) => {
        const apiKey = dayMap[day];
        if (apiKey) {
          transformedHours[apiKey] = slots;
        }
      });

      const signupData: RegisterRequest = {
        full_name: fullName,
        email: email,
        phone: phone,
        password: password,
        role: "farmer",
        business_name: businessName,
        informal_name: informalName,
        address: streetAddress,
        city: city,
        state: stateValue,
        zip_code: parseInt(zipCode, 10) || 0,
        registration_proof: proofFile || "my_proof.pdf",
        business_hours: transformedHours,
        device_token: deviceToken,
        type: "email",
        social_id: "",
      };

      console.log("--- Signup: Attempting Final Registration ---", signupData);

      const response = await AuthService.register(signupData);

      if (response.token) {
        // Store in MMKV
        Storage.set(storageKeys.AUTH_TOKEN, response.token);

        // Update UserStore
        userStore.setUser({
          name: fullName,
          email: email,
          token: response.token,
        });

        // Transition to Step 5 (Done)
        setStep(5);
      }
    } catch (error: any) {
      Alert.alert(
        "Registration Error",
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
