import {
  GoogleSignin,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import { Platform } from "react-native";
import {
  getAuth,
  signInWithCredential,
  GoogleAuthProvider,
  AppleAuthProvider,
  signOut as firebaseSignOut,
} from "@react-native-firebase/auth";
import * as AppleAuthentication from "expo-apple-authentication";
import api from "@/api/api";
import { ENDPOINT } from "@/api/endpoint";
import {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
  ForgotPasswordRequest,
  ForgotPasswordResponse,
  VerifyOtpRequest,
  VerifyOtpResponse,
  ResetPasswordRequest,
  ResetPasswordResponse,
} from "@/types/auth";

export class AuthService {
  /**
   * Configure Google Sign-In
   * @param webClientId The Web Client ID from the Firebase Console
   */
  static configureGoogle(webClientId: string) {
    GoogleSignin.configure({
      webClientId,
      offlineAccess: true,
    });
  }

  /**
   * Perform Google Sign-In and authenticate with Firebase
   */
  static async signInWithGoogle() {
    try {
      const auth = getAuth();

      // Check if your device supports Google Play
      await GoogleSignin.hasPlayServices({
        showPlayServicesUpdateDialog: true,
      });

      // Get the users ID token
      const { data } = await GoogleSignin.signIn();
      const idToken = data?.idToken;

      if (!idToken) {
        throw new Error("No ID token found");
      }

      // Create a Google credential with the token
      const googleCredential = GoogleAuthProvider.credential(idToken);

      // Sign-in the user with the credential
      return signInWithCredential(auth, googleCredential);
    } catch (error: any) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // User cancelled the sign-in flow, return null instead of throwing
        return null;
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // Sign-in is already in progress, return null or handle accordingly
        console.warn("Google Sign-In is already in progress");
        return null;
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.error("Play Services not available or outdated");
        throw error;
      }

      console.error("Google Sign-In Error:", error);
      throw error;
    }
  }

  /**
   * Perform Apple Sign-In and authenticate with Firebase
   */
  static async signInWithApple() {
    try {
      const auth = getAuth();

      if (Platform.OS !== "ios") {
        throw new Error("Apple Sign-In is only supported on iOS");
      }

      const appleAuthRequestResponse = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      });

      const { identityToken } = appleAuthRequestResponse;

      if (!identityToken) {
        throw new Error("Apple Sign-In failed - no identity token");
      }

      const appleCredential = AppleAuthProvider.credential(identityToken);

      // Sign-in the user with the credential
      return signInWithCredential(auth, appleCredential);
    } catch (error) {
      console.error("Apple Sign-In Error:", error);
      throw error;
    }
  }

  /**
   * Register a new user
   */
  static async register(data: RegisterRequest): Promise<RegisterResponse> {
    try {
      const response = await api.post<any, RegisterResponse>(
        ENDPOINT.REGISTER,
        data,
      );

      // Handle both string "false" and boolean false success from the API
      if (response.success === "false" || response.success === false) {
        throw new Error(response.message || "Registration failed");
      }

      return response;
    } catch (error: any) {
      console.error("Registration Error:", error);
      throw error;
    }
  }

  /**
   * Login an existing user
   */
  static async login(data: LoginRequest): Promise<LoginResponse> {
    try {
      const response = await api.post<any, LoginResponse>(ENDPOINT.LOGIN, data);

      // Handle both string "false" and boolean false success from the API
      if (response.success === "false" || response.success === false) {
        throw new Error(response.message || "Login failed");
      }

      return response;
    } catch (error: any) {
      console.error("Login Error:", error);
      throw error;
    }
  }

  /**
   * Request an OTP for password recovery
   */
  static async forgotPassword(
    data: ForgotPasswordRequest,
  ): Promise<ForgotPasswordResponse> {
    try {
      console.log("Forgot Password Request:", data);
      const response = await api.post<any, ForgotPasswordResponse>(
        ENDPOINT.FORGOT_PASSWORD,
        data,
      );
      console.log("Forgot Password Response:", response);

      // Handle both string "false" and boolean false success from the API
      if (response.success === "false" || response.success === false) {
        throw new Error(response.message || "Failed to send OTP");
      }

      return response;
    } catch (error: any) {
      console.error("Forgot Password Error:", error);
      throw error;
    }
  }

  /**
   * Verify the OTP for password recovery
   */
  static async verifyOtp(data: VerifyOtpRequest): Promise<VerifyOtpResponse> {
    try {
      console.log("Verify OTP Request:", data);
      const response = await api.post<any, VerifyOtpResponse>(
        ENDPOINT.VERIFY_OTP,
        data,
      );
      console.log("Verify OTP Response:", response);

      // Handle both string "false" and boolean false success from the API
      if (response.success === "false" || response.success === false) {
        throw new Error(response.message || "Failed to verify OTP");
      }

      return response;
    } catch (error: any) {
      console.error("Verify OTP Error:", error);
      throw error;
    }
  }

  /**
   * Reset the password with the verified token
   */
  static async resetPassword(
    data: ResetPasswordRequest,
  ): Promise<ResetPasswordResponse> {
    try {
      console.log("Reset Password Request:", data);
      const response = await api.post<any, ResetPasswordResponse>(
        ENDPOINT.RESET_PASSWORD,
        data,
      );
      console.log("Reset Password Response:", response);

      // Handle both string "false" and boolean false success from the API
      if (response.success === "false" || response.success === false) {
        throw new Error(response.message || "Failed to reset password");
      }

      return response;
    } catch (error: any) {
      console.error("Reset Password Error:", error);
      throw error;
    }
  }

  /**
   * Sign out from Firebase and Social Providers
   */
  static async signOut() {
    try {
      const auth = getAuth();
      await firebaseSignOut(auth);

      if (await GoogleSignin.hasPreviousSignIn()) {
        await GoogleSignin.signOut();
      }
    } catch (error) {
      console.error("Sign Out Error:", error);
      throw error;
    }
  }
}
