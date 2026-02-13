import { Text, TouchableOpacity, View } from "react-native";

import { styles } from "./styles";
import { useAuthStore } from "@store/authStore";

export function Home() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Feed</Text>
    </View>
  );
}
