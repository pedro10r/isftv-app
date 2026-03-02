import { Text } from "react-native";

import { ScreenTemplate } from "@components/templates";
import { styles } from "./styles";

export function Home() {
  return (
    <ScreenTemplate>
      <Text style={styles.text}>Feed</Text>
    </ScreenTemplate>
  );
}
