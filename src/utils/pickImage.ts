import { Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";

const ERROR_TITLE = "Erro";
const ERROR_MESSAGE = "Não foi possível acessar a galeria.";

export async function pickImage(
  aspect: [number, number] = [1, 1],
): Promise<string | null> {
  try {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect,
      quality: 0.8,
    });

    if (!result.canceled && result.assets[0]) {
      return result.assets[0].uri;
    }
    return null;
  } catch {
    Alert.alert(ERROR_TITLE, ERROR_MESSAGE);
    return null;
  }
}
