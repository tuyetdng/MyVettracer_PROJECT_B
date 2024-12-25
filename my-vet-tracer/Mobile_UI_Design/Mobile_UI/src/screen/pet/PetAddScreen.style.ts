import { StyleSheet, ViewStyle, TextStyle, ImageStyle } from "react-native";
import { Theme } from "@react-navigation/native";

interface Style {
  container: ViewStyle;
  goBackButton: ViewStyle;
  imageContainer: ViewStyle;
  petImage: ImageStyle;
  input: TextStyle;
  label: TextStyle;
  picker: ViewStyle;
  saveButton: ViewStyle;
  saveButtonText: TextStyle;
}

const createStyles = (theme: Theme) => {
  const { colors } = theme;

  return StyleSheet.create<Style>({
    container: {
      flexGrow: 1,
      padding: 20,
      backgroundColor: colors.background,
    },
    goBackButton: {
      marginBottom: 20,
      flexDirection: "row",
      alignItems: "center",
    },
    imageContainer: {
      alignItems: "center",
      marginBottom: 20,
    },
    petImage: {
      width: 150,
      height: 150,
      borderRadius: 10,
      marginBottom: 20,
    },
    input: {
      height: 50,
      borderColor: colors.border,
      borderWidth: 1,
      borderRadius: 8,
      paddingHorizontal: 15,
      marginBottom: 15,
      fontSize: 16,
      color: colors.text,
    },
    label: {
      fontSize: 16,
      color: colors.text,
      marginBottom: 5,
    },
    picker: {
      height: 50,
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 8,
      marginBottom: 15,
      paddingHorizontal: 10,
      backgroundColor: colors.card,
    },
    saveButton: {
      backgroundColor: colors.primary,
      paddingVertical: 15,
      borderRadius: 10,
      alignItems: "center",
      justifyContent: "center",
    },
    saveButtonText: {
      color: '#ffffff',
      fontSize: 18,
      fontWeight: "bold",
    },
  });
};

export default createStyles;
