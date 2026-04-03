import { OnboardingStore } from "./OnboardingStore";

export class RootStore {
  onboardingStore: OnboardingStore;

  constructor() {
    this.onboardingStore = new OnboardingStore();
  }
}

export const rootStore = new RootStore();
