import { ReactNode } from "react";
import { Keyboard, TouchableWithoutFeedback, View } from "react-native";

import { styles } from "./styles";

interface FormTemplateProps {
  children: ReactNode;
}

export function FormTemplate({ children }: FormTemplateProps) {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>{children}</View>
    </TouchableWithoutFeedback>
  );
}
