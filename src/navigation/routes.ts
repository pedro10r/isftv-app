import type {
  AuthStackParamList,
  TournamentsStackParamList,
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
    TOURNAMENTS_STACK: "TournamentsStack",
    PROFILE_STACK: "ProfileStack",
  },
  HOME_STACK: {
    HOME: "Home",
    CREATE_POST: "CreatePost",
  } satisfies Record<string, keyof HomeStackParamList>,
  TOURNAMENTS_STACK: {
    TOURNAMENTS: "Tournaments",
    CREATE_TOURNAMENT: "CreateTournament",
    TOURNAMENT_DETAILS: "TournamentDetails",
  } satisfies Record<string, keyof TournamentsStackParamList>,
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
