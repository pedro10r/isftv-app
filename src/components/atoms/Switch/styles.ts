import { StyleSheet } from "react-native";

import { Colors } from "@theme";

export const TRACK_WIDTH = 53;
export const TRACK_HEIGHT = 27;
export const THUMB_SIZE = 23;
export const THUMB_OFFSET = 2;
export const THUMB_ON_X = TRACK_WIDTH - THUMB_SIZE - THUMB_OFFSET;
export const ANIMATION_DURATION = 200;

export const createStyles = (colors: Colors) =>
  StyleSheet.create({
    track: {
      width: TRACK_WIDTH,
      height: TRACK_HEIGHT,
      borderRadius: TRACK_HEIGHT / 2,
      justifyContent: "center",
    },
    thumb: {
      width: THUMB_SIZE,
      height: THUMB_SIZE,
      borderRadius: THUMB_SIZE / 2,
      backgroundColor: colors.white,
      position: "absolute",
      shadowColor: colors.black,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 4,
    },
  });
