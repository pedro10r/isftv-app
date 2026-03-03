import type {
  CompositeNavigationProp,
  NavigatorScreenParams,
} from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";

export type HomeStackParamList = {
  Home: undefined;
};

export type ProfileStackParamList = {
  Profile: undefined;
  EditProfile: undefined;
};

export type ChampionshipsStackParamList = {
  Championships: undefined;
};

export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
  ForgotPassword: undefined;
};

export type TabParamList = {
  HomeStack: NavigatorScreenParams<HomeStackParamList>;
  ChampionshipsStack: NavigatorScreenParams<ChampionshipsStackParamList>;
  ProfileStack: NavigatorScreenParams<ProfileStackParamList>;
};

export type RootStackParamList = {
  MainTabs: NavigatorScreenParams<TabParamList>;
  AuthStack: NavigatorScreenParams<AuthStackParamList>;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type AuthScreenNavigationProp =
  NativeStackNavigationProp<AuthStackParamList>;

export type HomeScreenNavigationProp = CompositeNavigationProp<
  NativeStackNavigationProp<HomeStackParamList>,
  BottomTabNavigationProp<TabParamList>
>;

export type ChampionshipsScreenNavigationProp = CompositeNavigationProp<
  NativeStackNavigationProp<ChampionshipsStackParamList>,
  BottomTabNavigationProp<TabParamList>
>;

export type ProfileScreenNavigationProp = CompositeNavigationProp<
  NativeStackNavigationProp<ProfileStackParamList>,
  BottomTabNavigationProp<TabParamList>
>;
