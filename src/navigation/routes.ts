import type {
  AuthStackParamList,
  ChampionshipsStackParamList,
  HomeStackParamList,
  ProfileStackParamList,
} from "./types";

export const NAV = {
  ROOT: {
    TABS: "MainTabs",
    AUTH_STACK: "AuthStack",
  },
  TABS: {
    HOME_STACK: "HomeStack",
    CHAMPIONSHIPS_STACK: "ChampionshipsStack",
    PROFILE_STACK: "ProfileStack",
  },
  HOME_STACK: {
    HOME: "Home",
  } satisfies Record<string, keyof HomeStackParamList>,
  CHAMPIONSHIPS_STACK: {
    CHAMPIONSHIPS: "Championships",
  } satisfies Record<string, keyof ChampionshipsStackParamList>,
  PROFILE_STACK: {
    PROFILE: "Profile",
    EDIT_PROFILE: "EditProfile",
    SETTINGS: "Settings",
  } satisfies Record<string, keyof ProfileStackParamList>,
  AUTH_STACK: {
    LOGIN: "Login",
    REGISTER: "Register",
    FORGOT_PASSWORD: "ForgotPassword",
  } satisfies Record<string, keyof AuthStackParamList>,
} as const;
