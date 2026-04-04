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
