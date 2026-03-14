# Athlete App

A modern mobile application currently under development with Expo and React Native. Built on a clean architecture foundation, it features authentication via Supabase and a service layer for data management.

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

| Category         | Technology                    |
| ---------------- | ----------------------------- |
| Framework        | Expo SDK 54                   |
| Language         | TypeScript                    |
| Navigation       | React Navigation 7            |
| State Management | Zustand                       |
| Forms            | React Hook Form + Zod         |
| Storage          | MMKV (encrypted)              |
| Animations       | React Native Reanimated       |
| Authentication   | Supabase Auth (Email/Senha)   |
| Backend          | Supabase (Database + Storage) |
| Icons            | @expo/vector-icons            |

## 📁 Project Structure

```
src/
├── components/         # Atomic Design Components
│   ├── atoms/          # Button, TextInput
│   ├── molecules/      # Composed components
│   ├── organisms/      # FloatingTabBar
│   └── templates/      # FormTemplate
├── constants/          # App constants
├── models/             # TypeScript types/interfaces
├── navigation/         # Navigation configuration
├── screens/            # App screens
├── services/           # Supabase client + service layer
├── store/              # Zustand stores
└── theme/              # Theme configuration
```

## 🔐 Authentication

The app uses Supabase Auth exclusively:

- **Email/Password Login** - Autenticação tradicional com validação via Zod
- **Session Persistence** - Sessão gerenciada pelo Supabase com MMKV como storage adapter
- **Password Recovery** - Fluxo de recuperação de senha via e-mail

## 🎨 UI/UX

- Floating bottom tab navigation (Instagram-style)
- Smooth animations com React Native Reanimated
- Custom themed components

## 📱 Screens

- **Login** - Autenticação via e-mail e senha
- **Register** - Cadastro de usuário com validação de formulário
- **ForgotPassword** - Recuperação de senha
- **Home** - Feed principal
- **Championships** - Listagem de torneios
- **Profile** - Perfil do usuário com avatar, capa e informações esportivas
- **EditProfile** - Edição de dados do perfil
- **Settings** - Configurações da conta

## 🔧 Environment Variables

Create a `.env` file in the root directory:

```env
EXPO_PUBLIC_SUPABASE_URL=your-supabase-url
EXPO_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
EXPO_PUBLIC_STORAGE_ENCRYPTION_KEY=your-encryption-key
```
