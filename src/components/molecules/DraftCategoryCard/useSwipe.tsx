import { TouchableOpacity } from "react-native";
import Animated, {
  useAnimatedStyle,
  type SharedValue,
} from "react-native-reanimated";
import Feather from "@expo/vector-icons/Feather";

import { theme, type Colors } from "@theme";
import { useSwipeToDelete } from "@hooks/useSwipeToDelete";

const { spacing, radii } = theme;

const ACTION_WIDTH = spacing.xxl * 2;

interface DeleteActionProps {
  translateX: SharedValue<number>;
  onDelete: () => void;
  colors: Colors;
}

function DeleteAction({ translateX, onDelete, colors }: DeleteActionProps) {
  const style = useAnimatedStyle(() => ({
    width: Math.max(0, -translateX.value),
  }));

  return (
    <Animated.View
      style={[
        {
          position: "absolute",
          right: 0,
          top: 0,
          bottom: 0,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: colors.error,
          borderRadius: radii.l,
          overflow: "hidden",
        },
        style,
      ]}
    >
      <TouchableOpacity
        onPress={onDelete}
        style={{
          width: ACTION_WIDTH,
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Feather name="trash-2" size={18} color={colors.white} />
      </TouchableOpacity>
    </Animated.View>
  );
}

export function useSwipe(onRemove: () => void, colors: Colors) {
  const { gesture, animatedStyle, translateX } = useSwipeToDelete({
    onDelete: onRemove,
    actionWidth: ACTION_WIDTH,
  });

  const renderDeleteAction = () => (
    <DeleteAction translateX={translateX} onDelete={onRemove} colors={colors} />
  );

  return { gesture, cardAnimatedStyle: animatedStyle, renderDeleteAction };
}
