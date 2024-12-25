import { StyleSheet, TextStyle, ViewStyle } from "react-native";
import { Theme } from "@react-navigation/native";
import { ScreenHeight, ScreenWidth } from "@freakycoder/react-native-helpers";

interface Style {
  container: ViewStyle;
  title: TextStyle;
  subtitle: TextStyle;
  input: ViewStyle;
  button: ViewStyle;
  buttonText: TextStyle;
  pagination: ViewStyle;
  dot: ViewStyle;
  activeDot: ViewStyle;
  inputContainer: ViewStyle;
  passwordToggle: ViewStyle;
  error: TextStyle;
  signupText: TextStyle;
  signupLink: TextStyle;
}


export default (theme: Theme) => {
  const { colors } = theme;
  return StyleSheet.create<Style>({
    container: {
      flex: 1,
      backgroundColor: '#FFFFFF',
      alignItems: "center",
      justifyContent: "center",
      padding: 20,
    },
    title: {
      fontSize: 35,
      fontWeight: "bold",
      color: '#5EC088',
      marginBottom: 5,
    },
    subtitle: {
      fontSize: 23,
      color: '#5EC088',
      marginBottom: 70,
    },
    input: {
      width: "90%",
      height: 50,
      backgroundColor: theme.colors.card,
      borderBottomWidth: 1,
      borderColor: '#5EC088',
      paddingHorizontal: 20,
      marginBottom: 15,
    },
    button: {
      backgroundColor: '#5EC088',
      borderRadius: 8,
      width: ScreenWidth * 0.6,
      height: 50,
      alignItems: "center",
      justifyContent: "center",
      marginTop: 60,
      shadowColor: "#000000",
      shadowOffset: {
        width: 0,
        height: 3,
      },
      shadowOpacity: 0.17,
      shadowRadius: 3.05,
      elevation: 4
    },
    buttonText: {
      color: '#ffffff',
      fontSize: 18,
      fontWeight: "bold",
    },
    pagination: {
      flexDirection: "row",
      marginTop: 20,
    },
    dot: {
      width: 10,
      height: 10,
      borderRadius: 5,
      backgroundColor: theme.colors.border,
      marginHorizontal: 5,
    },
    activeDot: {
      backgroundColor: theme.colors.primary,
    },
    inputContainer: {
      width: "90%",
      height: 50,
      backgroundColor: theme.colors.card,
      borderBottomWidth: 1,
      borderColor: '#5EC088',
      paddingHorizontal: 20,
      marginBottom: 15,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    passwordToggle: {
      paddingRight: 10,
    },
    signupText: {
      fontSize: 14,
      color: colors.text || "#666",
    },
    signupLink: {
      color: colors.primary || "#4CAF50",
      fontWeight: "bold",
    },
    error: {
      color: "red",
      marginBottom: 8,
    },
  });
}
