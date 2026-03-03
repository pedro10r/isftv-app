import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import {
  HomeStackParamList,
  ChampionshipsStackParamList,
  ProfileStackParamList,
  AuthStackParamList,
} from "./types";

export const useAuthNavigation = () =>
  useNavigation<NativeStackNavigationProp<AuthStackParamList>>();

export const useHomeNavigation = () =>
  useNavigation<NativeStackNavigationProp<HomeStackParamList>>();

export const useChampionshipsNavigation = () =>
  useNavigation<NativeStackNavigationProp<ChampionshipsStackParamList>>();

export const useProfileNavigation = () =>
  useNavigation<NativeStackNavigationProp<ProfileStackParamList>>();
