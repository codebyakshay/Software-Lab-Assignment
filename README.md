# FarmerEats - Software Lab Assignment

A high-fidelity, premium React Native application built with Expo, showcasing a comprehensive farmer-to-consumer marketplace onboarding and authentication experience.

## 🚀 Overview

FarmerEats is designed to bridge the gap between local farms and consumers. This project implements a robust, multi-step signup process, secure social authentication, and a fluid onboarding experience with a focus on premium UI/UX and state management.

## 🛠 Tech Stack

- **Framework:** [React Native](https://reactnative.dev/) with [Expo (SDK 54)](https://expo.dev/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **State Management:** [MobX](https://mobx.js.org/) & [MobX-State-Tree](https://mobx-state-tree.js.org/)
- **Authentication:** [Firebase Auth](https://rnfirebase.io/auth) (Google & Apple Sign-In)
- **Local Storage:** [MMKV](https://github.com/mrousavy/react-native-mmkv) for high-performance persistence
- **Navigation:** [React Navigation v7](https://reactnavigation.org/)
- **Icons:** [Lucide React Native](https://lucide.dev/guide/packages/lucide-react-native) & Custom SVGs
- **Styling:** Vanilla StyleSheet with a centralized `Design System`

## ✨ Key Features

- **Onboarding Carousel:** A smooth, scroll-linked animation experience introducing the platform's core values.
- **Social Authentication:** Fully integrated Google and Apple login flows using Firebase.
- **Multi-Step Farmer Signup:** A complex, 5-step registration process capturing:
  - Basic User Info
  - Detailed Farm Information (Address, Business Name)
  - Verification Proof (File attachment via `expo-document-picker`)
  - Business Hours / Pickup Schedule
- **Security:** Secure token handling and persistent session management.
- **Modern UI:** Custom-built components adhering to high-fidelity design specifications, supporting both Light and Dark modes.

## 📂 Project Structure

```text
src/
├── api/             # API services and axios configuration
├── component/       # Reusable UI components (SocialAuthGroup, Input, Buttons, etc.)
├── constant/        # Centralized Design System (Colors, Typography, Strings)
├── data/            # Static data and mock definitions
├── firebase/        # Firebase configuration and native setup files
├── navigation/      # Root and nested navigation logic (React Navigation v7)
├── screen/          # Feature-based screen modules (Home, Login, Signup, Onboarding)
├── service/         # Business logic and external service integrations
├── store/           # MobX stores for global state management
└── types/           # Global TypeScript definitions
```

## 🏗 Setup & Installation

### 1. Prerequisites

- Node.js (v18+)
- Watchman (macOS)
- Xcode (for iOS development)
- Android Studio (for Android development)

### 2. Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/codebyakshay/Software-Lab-Assignment.git
cd Software-Lab-Assignment
npm install
```

### 3. Native Setup (Prebuild)

Since this project uses native modules (Firebase, MMKV), you need to run prebuild to generate the `ios` and `android` directories:

```bash
npx expo prebuild
```

### 4. Running the App

```bash
# To run on iOS Simulator
npm run ios

# To run on Android Emulator
npm run android
```

## 🔌 Custom Config Plugins

The project utilizes custom Expo Config Plugins located in `/plugins` to handle specific native configurations that are not supported out-of-the-box by Expo:

- `withFirebaseFix`: Resolves static linking issues for Firebase on iOS.
- `withPushNotifications`: Manually configures background modes and entitlements for remote notifications.

---

Built with ❤️ by [Akshay](https://github.com/codebyakshay) (https://codebyakshay.com)
