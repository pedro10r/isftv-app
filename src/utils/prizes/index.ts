import { Prizes } from "@features/tournaments/types";
import { formatCurrency } from "@utils/currency";

export interface FormattedPrizeLine {
  label: string;
  value: string;
}

const TIER_LABELS: Record<keyof Omit<Prizes, "fourth_place">, string> = {
  first_place: "1º Lugar",
  second_place: "2º Lugar",
  third_place: "3º Lugar",
};

const TROPHY_LABEL = "Troféu";
const EMPTY_LABEL = "-";

type TierKey = keyof typeof TIER_LABELS;

export function formatPrizes(prizes: Prizes): FormattedPrizeLine[] {
  const mainKeys: TierKey[] = ["first_place", "second_place", "third_place"];

  const tierLines = mainKeys
    .filter((key) => prizes[key])
    .map((key) => {
      const tier = prizes[key]!;
      const parts: string[] = [];

      if (tier.cash) parts.push(formatCurrency(tier.cash));
      if (tier.trophy) parts.push(TROPHY_LABEL);

      return {
        label: TIER_LABELS[key],
        value: parts.join(" + ") || EMPTY_LABEL,
      };
    });

  if (prizes.fourth_place) {
    const parts: string[] = [];

    if (prizes.fourth_place.text) parts.push(prizes.fourth_place.text);
    if (prizes.fourth_place.trophy) parts.push(TROPHY_LABEL);

    tierLines.push({
      label: "4º Lugar",
      value: parts.join(" + ") || EMPTY_LABEL,
    });
  }

  return tierLines;
}
