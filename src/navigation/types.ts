import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export type RootStackParamList = {
  Onboarding: undefined;
  Login: undefined;
  Signup: { 
    initialData?: { 
      email: string; 
      fullName: string; 
      social_id: string; 
      type: "google" | "apple" | "facebook" 
    } 
  } | undefined;
  ForgotPassword: undefined;
  Otp: undefined;
  ResetPassword: { token: string };
  Home: undefined;
};

export type RootStackNavigationProp =
  NativeStackNavigationProp<RootStackParamList>;
