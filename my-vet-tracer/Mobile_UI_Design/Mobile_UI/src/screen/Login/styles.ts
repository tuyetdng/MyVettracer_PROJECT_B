import { StyleSheet, ViewStyle, TextStyle, ImageStyle } from "react-native";
import { Theme } from "@react-navigation/native";
import { ScreenHeight, ScreenWidth } from "@freakycoder/react-native-helpers";

interface Style {
  container: ViewStyle;
  image: ImageStyle;
  header: TextStyle;
  subheader: TextStyle;
  description: TextStyle;
  input: ViewStyle;
  button: ViewStyle;
  buttonText: TextStyle;
  orText: TextStyle;
  socialContainer: ViewStyle;
  socialButton: ViewStyle;
  socialText: TextStyle;
  signupText: TextStyle;
  signupLink: TextStyle;
  passwordToggle: ViewStyle;
  inputContainer: ViewStyle;
  error: TextStyle;
}

export default (theme: Theme) => {
  const { colors } = theme;

  return StyleSheet.create<Style>({
    container: {
      flex: 1,
      backgroundColor: '#ffffff',
      alignItems: "center",
      justifyContent: "center",
    },
    image: {
      width: "90%",
      height: 200,
    },
    header: {
      fontSize: 36,
      fontWeight: "bold",
      color: colors.primary || "#4CAF50",
      marginBottom: 10,
    },
    subheader: {
      fontSize: 32,
      fontWeight: "bold",
      color: "#385142",
      marginBottom: 5,
    },
    description: {
      fontSize: 18,
      color: "#B2B2B2",
      marginBottom: 20,
    },

    input: {
      width: ScreenWidth * 0.9,
      height: 50,
      backgroundColor: "#F0F8EE",
      borderRadius: 20,
      paddingHorizontal: 15,
      marginBottom: 15,
    },
    inputContainer: {
      width: ScreenWidth * 0.9,
      height: 50,      
      paddingHorizontal: 15, // Padding ngang cho container
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between', // Giãn cách giữa các phần tử
      backgroundColor: '#F0F8EE',
      borderRadius: 20,
      marginBottom: 15,
    },
    
    passwordToggle: {
      padding: 12,
    },
    button: {
      width: ScreenWidth * 0.9,
      height: 50,
      backgroundColor: "#5EC088",
      borderRadius: 30,
      justifyContent: "center",
      alignItems: "center",
      marginBottom: 20,
    },
    buttonText: {
      color: "#fff",
      fontSize: 18,
      fontWeight: "bold",
    },
    orText: {
      fontSize: 16,
      color: colors.text || "#666",
      marginBottom: 10,
    },
    socialContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      width: ScreenWidth * 0.9,
      marginBottom: 20,
    },
    socialButton: {
      width: "48%",
      height: 50,
      borderRadius: 10,
      justifyContent: "center",
      alignItems: "center",
    },
    socialText: {
      color: "#fff",
      fontSize: 16,
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
};
