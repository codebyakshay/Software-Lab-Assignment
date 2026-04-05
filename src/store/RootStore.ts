import { OnboardingStore } from "./OnboardingStore";
import { UserStore } from "./UserStore";

export class RootStore {
  onboardingStore: OnboardingStore;
  userStore: UserStore;

  constructor() {
    this.onboardingStore = new OnboardingStore();
    this.userStore = new UserStore();
  }
}

export const rootStore = new RootStore();
