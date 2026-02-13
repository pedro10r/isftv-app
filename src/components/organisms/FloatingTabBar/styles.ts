import { StyleSheet, Dimensions } from "react-native";
import { theme } from "@theme/index";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const CUSTOM_HEIGHT = 48;
export const TAB_BAR_WIDTH = SCREEN_WIDTH - 32;
export const TAB_COUNT = 3;
export const TAB_BAR_PADDING_X = 6;
export const TAB_WIDTH = (TAB_BAR_WIDTH - TAB_BAR_PADDING_X * 2) / TAB_COUNT;

const { spacing, colors, radii } = theme;

export const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: spacing.l,
    left: 0,
    right: 0,
    alignItems: "center",
  },
  tabBar: {
    flexDirection: "row",
    width: TAB_BAR_WIDTH,
    height: CUSTOM_HEIGHT + spacing.m,
    backgroundColor: colors.surfaceDark,
    borderRadius: spacing.xl,
    alignItems: "center",
    justifyContent: "flex-start",
    paddingHorizontal: TAB_BAR_PADDING_X,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: spacing.xs },
    shadowOpacity: 0.3,
    shadowRadius: spacing.s,
    elevation: spacing.s,
  },
  indicator: {
    position: "absolute",
    width: TAB_WIDTH - spacing.s,
    height: CUSTOM_HEIGHT,
    backgroundColor: colors.surfaceDarkVariant,
    borderRadius: radii.xl,
    bottom: spacing.s,
    left: TAB_BAR_PADDING_X + 4,
  },
  tab: {
    width: TAB_WIDTH,
    height: CUSTOM_HEIGHT,
    alignItems: "center",
    justifyContent: "center",
  },
});
