import { StyleSheet, TextStyle, ViewStyle } from "react-native";
import { ExtendedTheme } from "@react-navigation/native";

interface Styles {
  container: ViewStyle;
  title: TextStyle;
  input: TextStyle;
  button: ViewStyle;
  buttonText: TextStyle;
}

const createStyles = (theme: ExtendedTheme) => {
  const { colors } = theme;

  return StyleSheet.create<Styles>({
    container: {
      flex: 1,
      backgroundColor: colors.background,
      // alignItems: "center",
      // justifyContent: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.2,
      shadowRadius: 1.41,

      elevation: 2,
      padding: 5,
    },
    title: {
      fontSize: 24,
      fontWeight: "bold",

      color: colors.text,
      marginBottom: 30,
    },
    titlecontainer: {
      marginTop: 20,
      justifyContent: "center",
      alignItems: "center",
    },

    input: {
      width: "100%",
      height: 50,
      backgroundColor: colors.card,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: colors.border,
      paddingHorizontal: 15,
      fontSize: 16,
      color: colors.text,
      marginBottom: 15,
    },
    button: {
      width: "100%",
      height: 50,
      backgroundColor: colors.primary,
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 8,
    },
    buttonText: {
      color: colors.textOnPrimary || "#FFFFFF", // Default fallback color
      fontSize: 14,
      fontWeight: "bold",
    },
    avatar: {
      borderRadius: 8,
      borderWidth: 1,
      width: 100,
      height: 100,
      marginRight: 10,
      marginBottom: 10,
    },
    buttonAvatar: {
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 8,
      backgroundColor: "grey",
      width: "30%",
      height: 30,
    },
    avatarContainer: {
      flexDirection: "column",
      marginVertical: 15,
    },
  });
};

export default createStyles;
