import { useState } from "react";
import { Alert } from "react-native";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import {
  RootStackNavigationProp,
  RootStackParamList,
} from "@/navigation/types";
import { AuthService } from "@/service/AuthService";
import { useStore } from "@/store/StoreProvider";
import { RegisterRequest } from "@/types/auth";
import { Storage, storageKeys } from "@/service/Storage";
import * as DocumentPicker from "expo-document-picker";

export function useSignup() {
  const navigation = useNavigation<RootStackNavigationProp>();
  const route = useRoute<RouteProp<RootStackParamList, "Signup">>();
  const { onboardingStore, userStore } = useStore();

  const initialData = route.params?.initialData;

  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  // Step 1: Welcome
  const [fullName, setFullName] = useState(initialData?.fullName || "");
  const [email, setEmail] = useState(initialData?.email || "");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [reEnterPassword, setReEnterPassword] = useState("");

  const [socialId, setSocialId] = useState(initialData?.social_id || "");
  const [signupType, setSignupType] = useState<
    "email" | "google" | "apple" | "facebook"
  >(initialData?.type || "email");

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

  const handleAttachProof = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "application/pdf",
        copyToCacheDirectory: true,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const file = result.assets[0];
        setProofFile(file.name);
      }
    } catch (error) {
      console.error("Error picking document:", error);
      Alert.alert("Error", "Could not pick the document. Please try again.");
    }
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
    } else if (step === 2) {
      if (!businessName || !streetAddress || !city || !stateValue || !zipCode) {
        Alert.alert("Error", "Please fill in all farm information.");
        return;
      }
    } else if (step === 3) {
      if (!proofFile) {
        Alert.alert("Error", "Please attach a registration proof.");
        return;
      }
    }
    setStep((prev) => prev + 1);
  };

  const prevStep = () => setStep((prev) => prev - 1);

  const handleSignup = async () => {
    try {
      setIsLoading(true);
      const deviceToken =
        onboardingStore.deviceToken ||
        Storage.getString(storageKeys.DEVICE_TOKEN) ||
        "some-mock-device-token-for-testing"; // Fallback for simulator

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

      // Ensure all 7 days are present in the payload (some backends require full schema)
      const transformedHours: any = {
        mon: [],
        tue: [],
        wed: [],
        thu: [],
        fri: [],
        sat: [],
        sun: [],
      };

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
        type: signupType,
        social_id: signupType === "email" ? deviceToken : socialId,
      };

      console.log(
        "--- DEBUG: Sending Signup Data ---",
        JSON.stringify(signupData, null, 2),
      );

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
      console.warn(
        "--- Registration API Error Details ---",
        error.response?.data || error.message,
      );
      Alert.alert(
        "Registration Error",
        error.response?.data?.message ||
          error.message ||
          "An error occurred during registration.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleFinish = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: "Home" }],
    });
  };

  const handleSocialLogin = async (id: number) => {
    try {
      setIsLoading(true);
      let result;
      let type: "google" | "apple" | "facebook";

      if (id === 1) {
        result = await AuthService.signInWithGoogle();
        type = "google";
      } else if (id === 2) {
        result = await AuthService.signInWithApple();
        type = "apple";
      } else {
        Alert.alert("Info", "Facebook login is not implemented yet.");
        setIsLoading(false);
        return;
      }

      if (result) {
        const deviceToken =
          onboardingStore.deviceToken ||
          Storage.getString(storageKeys.DEVICE_TOKEN) ||
          "some-mock-device-token";

        const loginData: any = {
          email: result.user.email || "",
          role: "farmer",
          device_token: deviceToken,
          type: type,
          social_id: result.user.uid,
        };

        try {
          const response = await AuthService.login(loginData);

          if (response.token) {
            // Store in MMKV
            Storage.set(storageKeys.AUTH_TOKEN, response.token);

            // Update UserStore
            userStore.setUser({
              name:
                result.user.displayName ||
                result.user.email?.split("@")[0] ||
                "User",
              email: result.user.email || "",
              token: response.token,
            });

            // Navigate to Home
            navigation.reset({
              index: 0,
              routes: [{ name: "Home" }],
            });
          }
        } catch (error: any) {
          const errorMessage = error.message || "";
          if (errorMessage.includes("Account does not exist")) {
            // This is the "Magic" part for Signup screen
            // If they click Google on Signup and account doesn't exist, we just pre-fill!
            setFullName(result.user.displayName || "");
            setEmail(result.user.email || "");
            setSocialId(result.user.uid);
            setSignupType(type);

            Alert.alert(
              "Google Linked",
              "We've imported your name and email from Google. Please continue to set up your farm details.",
              [{ text: "Continue", onPress: () => setStep(2) }],
            );
          } else {
            throw error; // Rethrow for outer catch
          }
        }
      }
    } catch (error: any) {
      if (error.code !== "-1" && error.code !== "auth/sign-in-cancelled") {
        Alert.alert(
          "Error",
          error.message || "An error occurred during sign in.",
        );
      }
    } finally {
      setIsLoading(false);
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
    isLoading,

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
