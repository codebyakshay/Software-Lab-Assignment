import { makeAutoObservable } from "mobx";
import { Storage, storageKeys } from "@/service/Storage";

export class OnboardingStore {
  hasFinishedOnboarding: boolean = false;
  deviceToken: string | null = null;

  constructor() {
    makeAutoObservable(this);
    this.hydrate();
  }

  private hydrate() {
    const value = Storage.getBoolean(storageKeys.HAS_FINISHED_ONBOARDING);
    if (value != null) {
      this.hasFinishedOnboarding = value;
    }

    const token = Storage.getString(storageKeys.DEVICE_TOKEN);
    if (token) {
      this.deviceToken = token;
    }
  }

  completeOnboarding = () => {
    this.hasFinishedOnboarding = true;
    Storage.set(storageKeys.HAS_FINISHED_ONBOARDING, true);
  };

  setDeviceToken = (token: string) => {
    this.deviceToken = token;
    Storage.set(storageKeys.DEVICE_TOKEN, token);
  };
}
