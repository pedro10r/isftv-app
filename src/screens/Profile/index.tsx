import { Text, TouchableOpacity, View } from "react-native";

import { useAuthStore } from "@store/authStore";
import { styles } from "./styles";

export function Profile() {
  const logout = useAuthStore((state) => state.logout);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Profile</Text>

      <TouchableOpacity style={styles.button} onPress={logout}>
        <Text>SAIR</Text>
      </TouchableOpacity>
    </View>
  );
}
