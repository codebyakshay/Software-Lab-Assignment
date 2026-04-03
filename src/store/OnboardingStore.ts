import { makeAutoObservable } from "mobx";
import { Storage, storageKeys } from "@/service/Storage";

export class OnboardingStore {
  hasFinishedOnboarding: boolean = false;

  constructor() {
    makeAutoObservable(this);
    this.hydrate();
  }

  private hydrate() {
    const value = Storage.getBoolean(storageKeys.HAS_FINISHED_ONBOARDING);
    if (value != null) {
      this.hasFinishedOnboarding = value;
    }
  }

  completeOnboarding = () => {
    this.hasFinishedOnboarding = true;
    Storage.set(storageKeys.HAS_FINISHED_ONBOARDING, true);
  };
}
