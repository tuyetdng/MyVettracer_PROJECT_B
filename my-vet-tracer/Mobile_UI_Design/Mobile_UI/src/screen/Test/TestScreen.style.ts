import { StyleSheet, ViewStyle } from "react-native";
import { Theme } from "@react-navigation/native";

interface Style {
  container: ViewStyle;
}

export default (theme: Theme) => {
  const { colors } = theme;
  return StyleSheet.create<Style>({
    container: {
      flex: 1,
      backgroundColor: colors.background,
      alignItems: "center",
      justifyContent: "center",
    },
  });
};
