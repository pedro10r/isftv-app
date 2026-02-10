import { Text, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";

interface SimpleButtonProps {
  label: string;
  onPress: () => void;
}

export function SimpleButton({ label, onPress }: SimpleButtonProps) {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.6}>
      <View style={styles.decoration}>
        <Text style={styles.buttonText}>{label}</Text>
      </View>
    </TouchableOpacity>
  );
}
