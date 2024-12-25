import { StyleSheet, ViewStyle, TextStyle, ImageStyle } from "react-native";
import { Theme } from "@react-navigation/native";

interface Style {
  container: ViewStyle;
  goBackButton: ViewStyle;
  goBackText: TextStyle;
  imageContainer: ViewStyle;
  petImage: ImageStyle;
  input: TextStyle;
  saveButton: ViewStyle;
  saveButtonText: TextStyle;
}

export default (theme: Theme) => {
  const { colors } = theme;

  return StyleSheet.create<Style>({
    container: {
      flexGrow: 1,
      padding: 20,
      backgroundColor: colors.background,
    },
    goBackButton: {
      marginTop: 15,
      marginBottom: 10,
    },
    goBackText: {
      fontSize: 16,
      color: colors.primary,
    },
    imageContainer: {
      alignItems: "center",
      marginTop: 20,
      marginBottom: 20,
    },
    petImage: {
      width: 150,
      height: 150,
      borderRadius: 75,
      borderWidth: 5,
      borderColor: "#EDEDED",
    },
    input: {
      borderWidth: 1,
      borderColor: "#CCC",
      borderRadius: 8,
      padding: 10,
      marginBottom: 15,
      fontSize: 16,
      color: colors.text,
    },
    saveButton: {
      backgroundColor: colors.primary,
      padding: 15,
      borderRadius: 8,
      alignItems: "center",
    },
    saveButtonText: {
      color: colors.card,
      fontSize: 18,
      fontWeight: "bold",
    },
  });
};
