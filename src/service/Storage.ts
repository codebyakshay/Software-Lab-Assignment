import { createMMKV } from "react-native-mmkv";

export const Storage = createMMKV();

export const storageKeys = {
  HAS_FINISHED_ONBOARDING: "has_finished_onboarding",
  DEVICE_TOKEN: "device_token",
  AUTH_TOKEN: "auth_token",
} as const;
