const { withDangerousMod } = require("@expo/config-plugins");
const fs = require("fs");
const path = require("path");

/**
 * Expo Config Plugin to fix "Include of non-modular header inside framework module"
 * error when using React Native Firebase with useFrameworks: 'static'.
 */
const withFirebaseFix = (config) => {
  return withDangerousMod(config, [
    "ios",
    async (config) => {
      const podfilePath = path.join(config.modRequest.platformProjectRoot, "Podfile");
      let podfileContent = await fs.promises.readFile(podfilePath, "utf-8");

      const fixCode = `
    # Fix for Firebase Non-Modular Header error
    installer.pods_project.build_configurations.each do |config|
      config.build_settings['CLANG_ALLOW_NON_MODULAR_INCLUDES_IN_FRAMEWORK_MODULES'] = 'YES'
    end
    
    # Ensure RNFBMessaging and other Firebase targets allow non-modular includes
    installer.pods_project.targets.each do |target|
      target.build_configurations.each do |config|
        config.build_settings['CLANG_ALLOW_NON_MODULAR_INCLUDES_IN_FRAMEWORK_MODULES'] = 'YES'
      end
    end
`;

      // Check if already applied (with a slightly different sentinel to avoid matches from old version)
      if (podfileContent.includes("target.build_configurations.each do |config|")) {
        return config;
      }

      // Inject the fix into the post_install block
      const postInstallRegex = /post_install do \|installer\|/;
      if (postInstallRegex.test(podfileContent)) {
        podfileContent = podfileContent.replace(
          postInstallRegex,
          `post_install do |installer|${fixCode}`
        );
      }

      await fs.promises.writeFile(podfilePath, podfileContent);
      return config;
    },
  ]);
};

module.exports = withFirebaseFix;
