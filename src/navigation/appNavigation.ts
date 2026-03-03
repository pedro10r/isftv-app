import { createNavigationContainerRef, useNavigation } from "@react-navigation/native";

import {
  AuthScreenNavigationProp,
  HomeScreenNavigationProp,
  ChampionshipsScreenNavigationProp,
  ProfileScreenNavigationProp,
  RootStackParamList,
} from "./types";

export const navigationRef = createNavigationContainerRef<RootStackParamList>();

/** Use only within AuthStack screens: Login, Register, ForgotPassword. */
export const useAuthNavigation = () =>
  useNavigation<AuthScreenNavigationProp>();

/** Use only within HomeStack screens: Home. */
export const useHomeNavigation = () =>
  useNavigation<HomeScreenNavigationProp>();

/** Use only within ChampionshipsStack screens: Championships. */
export const useChampionshipsNavigation = () =>
  useNavigation<ChampionshipsScreenNavigationProp>();

/** Use only within ProfileStack screens: Profile, EditProfile. */
export const useProfileNavigation = () =>
  useNavigation<ProfileScreenNavigationProp>();
