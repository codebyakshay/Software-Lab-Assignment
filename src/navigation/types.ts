import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export type RootStackParamList = {
  Onboarding: undefined;
  Login: undefined;
  Signup: undefined;
  ForgotPassword: undefined;
  Otp: undefined;
  ResetPassword: { token: string };
  Home: undefined;
};

export type RootStackNavigationProp =
  NativeStackNavigationProp<RootStackParamList>;
