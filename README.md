# Athlete App

A modern mobile application currently under development with Expo and React Native. Built on a clean architecture foundation, it features authentication with biometrics and JWT token management.

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Expo CLI
- iOS Simulator (for iOS development)
- Android Emulator (for Android development)

### Installation

```bash
# Install dependencies
npm install

# Install iOS pods (macOS only)
cd ios && pod install && cd ..

# Run on iOS
npx expo run:ios

# Run on Android
npx expo run:android
```

## 🛠️ Tech Stack

| Category | Technology |
|----------|------------|
| Framework | Expo SDK 54 |
| Language | TypeScript |
| Navigation | React Navigation 7 |
| State Management | Zustand |
| Forms | React Hook Form + Zod |
| Storage | MMKV (encrypted) |
| Animations | React Native Reanimated |
| Authentication | expo-local-authentication (Face ID/Touch ID) |
| JWT | expo-jwt |
| Icons | @expo/vector-icons |

## 📁 Project Structure

```
src/
├── components/         # Atomic Design Components
│   ├── atoms/          # Button, TextInput, SimpleButton
│   ├── molecules/      # Composed components
│   ├── organisms/      # FloatingTabBar
│   └── templates/      # FormTemplate
├── constants/          # App constants
├── lib/                # Utilities
│   ├── jwt/            # JWT utilities
│   └── storage/        # MMKV storage adapter
├── navigation/         # Navigation configuration
├── screens/            # App screens
├── store/              # Zustand stores
└── theme/              # Theme configuration
```

## 🔐 Authentication

The app features a complete authentication flow:

- **Email/Password Login** - Traditional authentication with validation
- **Biometric Login** - Face ID / Touch ID support
- **JWT Tokens** - Secure token generation and validation
- **Persistent Sessions** - MMKV encrypted storage

## 🎨 UI/UX

- Floating bottom tab navigation (Instagram-style)
- Smooth animations with React Native Reanimated
- Custom themed components

## 📱 Screens

- **Login** - Email/password and biometric authentication
- **Register** - User registration with form validation
- **Home** - Main feed screen
- **Championships** - Championship listings
- **Profile** - User profile and settings

## 🔧 Environment Variables

Create a `.env` file in the root directory:

```env
EXPO_PUBLIC_STORAGE_ENCRYPTION_KEY=your-encryption-key
```
