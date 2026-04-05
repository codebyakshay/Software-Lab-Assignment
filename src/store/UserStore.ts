import { makeAutoObservable } from "mobx";

export interface UserData {
  name: string;
  email: string;
  token?: string;
}

export class UserStore {
  user: UserData | null = null;
  isAuthenticated: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  setUser(userData: UserData) {
    this.user = userData;
    this.isAuthenticated = !!userData.token;
  }

  logout() {
    this.user = null;
    this.isAuthenticated = false;
  }
}
