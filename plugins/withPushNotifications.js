const { withEntitlementsPlist, withInfoPlist } = require("@expo/config-plugins");

/**
 * Expo Config Plugin to manually enable Push Notifications and 
 * Remote Notifications background mode for iOS.
 */
const withPushNotifications = (config) => {
  // 1. Add remote-notification background mode to Info.plist
  config = withInfoPlist(config, (config) => {
    if (!config.modResults.UIBackgroundModes) {
      config.modResults.UIBackgroundModes = [];
    }
    if (!config.modResults.UIBackgroundModes.includes("remote-notification")) {
      config.modResults.UIBackgroundModes.push("remote-notification");
    }
    return config;
  });

  // 2. Add aps-environment to entitlements
  config = withEntitlementsPlist(config, (config) => {
    config.modResults["aps-environment"] = "development";
    return config;
  });

  return config;
};

module.exports = withPushNotifications;
