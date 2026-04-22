import { useMemo, useState } from "react";
import { Pressable, Text, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  withTiming,
  Easing,
} from "react-native-reanimated";
import Feather from "@expo/vector-icons/Feather";

import { PrizeRow, FourthPlacePrizeRow } from "@components/molecules";
import { useAppTheme } from "@theme/ThemeContext";
import { DraftCategory } from "@features/tournaments/store";
import { PrizeTier } from "@features/tournaments/types";
import { maskCurrency } from "@utils";

import { createStyles } from "./styles";
import { strings } from "./strings";

const PLACES = [
  { key: "first_place", label: strings.places.first },
  { key: "second_place", label: strings.places.second },
  { key: "third_place", label: strings.places.third },
] as const;

type PlaceKey = (typeof PLACES)[number]["key"];

interface CategoryAccordionProps {
  category: DraftCategory;
  isExpanded: boolean;
  onToggle: () => void;
  onPrizeChange: (
    place: PlaceKey,
    field: keyof PrizeTier,
    value: number | boolean,
  ) => void;
  onFourthPlaceChange: (
    field: "text" | "trophy",
    value: string | boolean,
  ) => void;
}

export function CategoryAccordion({
  category,
  isExpanded,
  onToggle,
  onPrizeChange,
  onFourthPlaceChange,
}: CategoryAccordionProps) {
  const { colors } = useAppTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

  const [bodyHeight, setBodyHeight] = useState(0);

  const animatedHeightStyle = useAnimatedStyle(() => ({
    height: withTiming(isExpanded ? bodyHeight : 0, {
      duration: 300,
      easing: Easing.out(Easing.ease),
    }),
    opacity: withTiming(isExpanded ? 1 : 0, { duration: 300 }),
  }));

  const chevronStyle = useAnimatedStyle(() => ({
    transform: [
      {
        rotate: withTiming(isExpanded ? "180deg" : "0deg", { duration: 300 }),
      },
    ],
  }));

  return (
    <View style={styles.card}>
      <Pressable
        style={[styles.cardHeader, isExpanded && styles.cardHeaderActive]}
        onPress={onToggle}
      >
        <Text style={styles.cardHeaderName}>{category.name}</Text>
        <Animated.View style={chevronStyle}>
          <Feather name="chevron-down" size={20} color={colors.textSecondary} />
        </Animated.View>
      </Pressable>

      <Animated.View style={[animatedHeightStyle, styles.animatedBody]}>
        <View
          style={[styles.cardBody, styles.absoluteFullWidth]}
          onLayout={(e) => {
            const height = e.nativeEvent.layout.height;

            if (height > 0 && Math.abs(height - bodyHeight) > 1) {
              setBodyHeight(height);
            }
          }}
        >
          {PLACES.map((place, index) => {
            const tier = category.prizes[place.key];
            const cashRaw = tier?.cash ?? 0;
            const trophyValue = tier?.trophy ?? false;
            const cashDisplay =
              cashRaw > 0
                ? maskCurrency(
                    String(Math.round(cashRaw * 100)).padStart(3, "0"),
                  )
                : "";

            return (
              <View key={place.key}>
                {index > 0 && <View style={styles.divider} />}

                <PrizeRow
                  label={place.label}
                  cashValue={cashDisplay}
                  trophyValue={trophyValue}
                  onCashChange={(raw) =>
                    onPrizeChange(place.key, "cash", raw / 100)
                  }
                  onTrophyChange={(val) =>
                    onPrizeChange(place.key, "trophy", val)
                  }
                />
              </View>
            );
          })}

          <View style={styles.divider} />

          <FourthPlacePrizeRow
            label={strings.places.fourth}
            textValue={category.prizes.fourth_place?.text ?? ""}
            trophyValue={category.prizes.fourth_place?.trophy ?? false}
            onTextChange={(value) => onFourthPlaceChange("text", value)}
            onTrophyChange={(value) => onFourthPlaceChange("trophy", value)}
            placeholder={strings.places.fourthPlaceholder}
          />
        </View>
      </Animated.View>
    </View>
  );
}
