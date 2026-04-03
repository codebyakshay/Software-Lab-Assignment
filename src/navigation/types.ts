import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export type RootStackParamList = {
  Onboarding: undefined;
  Login: undefined;
  Signup: undefined;
};

export type RootStackNavigationProp = NativeStackNavigationProp<RootStackParamList>;
