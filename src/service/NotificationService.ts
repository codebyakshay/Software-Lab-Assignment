import {
  getMessaging,
  getToken,
  requestPermission,
  registerDeviceForRemoteMessages,
  AuthorizationStatus,
} from "@react-native-firebase/messaging";
import { Platform } from "react-native";

export class NotificationService {
  /**
   * Request push notification permissions and generate a device token (FCM)
   * @returns The device token string or null if failed/denied
   */
  static async getDeviceToken(): Promise<string | null> {
    try {
      console.log(
        "--- NotificationService: Starting Token Generation (Modular API) ---",
      );

      const messaging = getMessaging();

      // 1. Request permissions (Required for iOS)
      const authStatus = await requestPermission(messaging);
      const enabled =
        authStatus === AuthorizationStatus.AUTHORIZED ||
        authStatus === AuthorizationStatus.PROVISIONAL;

      if (!enabled) {
        console.warn(
          "--- NotificationService: Notification permission denied ---",
        );
        return null;
      }

      console.log("--- NotificationService: Permission granted ---");

      // 3. Get the token
      const token = await getToken(messaging);

      if (token) {
        console.log(
          "--- NotificationService: Device Token Generated Successfully ---",
        );
        console.log("TOKEN:", token);
        return token;
      } else {
        console.warn(
          "--- NotificationService: Token generation failed (returned null) ---",
        );
        return null;
      }
    } catch (error) {
      console.error(
        "--- NotificationService: Error generating device token ---",
        error,
      );
      return null;
    }
  }
}
