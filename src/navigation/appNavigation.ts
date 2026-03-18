import { createNavigationContainerRef, useNavigation } from "@react-navigation/native";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";

import {
  AuthScreenNavigationProp,
  HomeScreenNavigationProp,
  TournamentsScreenNavigationProp,
  ProfileScreenNavigationProp,
  TabParamList,
  RootStackParamList,
} from "./types";

export const navigationRef = createNavigationContainerRef<RootStackParamList>();

/** Use only within AuthStack screens: Login, Register, ForgotPassword. */
export const useAuthNavigation = () =>
  useNavigation<AuthScreenNavigationProp>();

/** Use only within HomeStack screens: Home. */
export const useHomeNavigation = () =>
  useNavigation<HomeScreenNavigationProp>();

/** Use only within TournamentsStack screens: Tournaments. */
export const useTournamentsNavigation = () =>
  useNavigation<TournamentsScreenNavigationProp>();

/** Use only within ProfileStack screens: Profile, EditProfile. */
export const useProfileNavigation = () =>
  useNavigation<ProfileScreenNavigationProp>();

/** Use to navigate between tabs from any screen. */
export const useTabNavigation = () =>
  useNavigation<BottomTabNavigationProp<TabParamList>>();
