import { StyleSheet, TextStyle, ViewStyle, ImageStyle } from "react-native";
import { Theme } from "@react-navigation/native";

interface Style {
  container: ViewStyle;
  header: ViewStyle;
  goBack: ViewStyle;
  name: TextStyle;
  role: TextStyle;
  location: TextStyle;
  profileImage: ImageStyle;
  statsRow: ViewStyle;
  iconButton: ViewStyle;
  aboutSection: ViewStyle;
  aboutTitle: TextStyle;
  description: TextStyle;
  infoSection: ViewStyle;
  infoItem: TextStyle;
  editButton: ViewStyle;
  editButtonText: TextStyle;
}

export default (theme: Theme) => {
  const { colors } = theme;

  return StyleSheet.create<Style>({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    header: {
      padding: 20,
      alignItems: "center",
      borderBottomLeftRadius: 40,
      borderBottomRightRadius: 40,
      backgroundColor: colors.primary,
    },
    goBack: {
      position: "absolute",
      top: 16,
      left: 16,
      width: 40,
      height: 40,
      alignItems: "center",
      justifyContent: "center",
      zIndex: 10,
    },
    name: {
      fontSize: 24, 
      fontWeight: "bold",
      color: colors.text,
      marginTop: 14,
    },
    role: {
      fontSize: 16,
      color: colors.text,
    },
    location: {
      fontSize: 18,
      color: colors.text,
      marginBottom: 10,
    },
    profileImage: {
      width: 100,
      height: 100,
      borderRadius: 50,
      borderWidth: 3,
      borderColor: colors.card,
      marginVertical: 10,
    },
    statsRow: {
      flexDirection: "row",
      marginTop: 10,
    },
    iconButton: {
      marginHorizontal: 10,
      padding: 10,
      backgroundColor: colors.card,
      borderRadius: 20,
      alignItems: "center",
      justifyContent: "center",
    },
    aboutSection: {
      marginTop: 20,
      paddingHorizontal: 20,
    },
    aboutTitle: {
      fontSize: 18,
      fontWeight: "bold",
      marginBottom: 10,
      color: colors.text,
    },
    description: {
      fontSize: 14,
      color: colors.text,
    },
    infoSection: {
      marginTop: 20,
      paddingHorizontal: 20,
    },
    infoItem: {
      fontSize: 18,
      marginBottom: 10,
      color: colors.text,
    },
    editButton: {
      marginTop: 20,
      marginHorizontal: 40,
      padding: 10,
      backgroundColor: colors.primary,
      borderRadius: 20,
      alignItems: "center",
    },
    editButtonText: {
      color: colors.background,
      fontSize: 16,
    },
  });
};
