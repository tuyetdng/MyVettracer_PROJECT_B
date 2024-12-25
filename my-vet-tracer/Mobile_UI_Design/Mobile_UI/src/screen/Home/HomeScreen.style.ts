import { StyleSheet, ViewStyle, TextStyle, ImageStyle } from "react-native";
import { Theme } from "@react-navigation/native";
import { ScreenWidth } from "@freakycoder/react-native-helpers";

interface Style {
  container: ViewStyle;
  header: TextStyle;
  listContainer: ViewStyle;
  row: ViewStyle;
  card: ViewStyle;
  petImage: ImageStyle;
  petName: TextStyle;
  addIcon: TextStyle;
  cardAdd: ViewStyle;
}

export default (theme: Theme) => {
  const { colors } = theme;

  return StyleSheet.create<Style>({
    container: {
      flex: 1,
      backgroundColor: colors.background,
      padding: 20,
    },
    header: {
      fontSize: 30,
      fontWeight: "bold",
      color: colors.text,
      marginBottom: 20,
      marginTop: 20,
    },
    listContainer: {
      paddingBottom: 20,
    },
    row: {
      justifyContent: "space-between",
      marginBottom: 20,
    },
    card: {
      width: "48%",
      height: 150,
      borderRadius: 10,
      alignItems: "center",
      justifyContent: "center",
      elevation: 3,
      backgroundColor: colors.card,
      shadowColor: "#000",
      shadowOpacity: 0.1,
      shadowRadius: 5,
      shadowOffset: { width: 0, height: 2 },
    },
    cardAdd: {
      width: ScreenWidth* 0.9,
      height: 60,
      borderRadius: 20,
      right: 0,
      alignItems: "center",
      justifyContent: "center",
      elevation: 3,
      backgroundColor: '#5EC088',
      shadowColor: "#000",
      shadowOpacity: 0.1,
      shadowRadius: 5,
      shadowOffset: { width: 0, height: 2 },
    },
    petImage: {
      width: 60,
      height: 60,
      borderRadius: 30,
      marginBottom: 10,
    },
    petName: {
      fontSize: 16,
      fontWeight: "600",
      color: colors.text,
    },
    addIcon: {
      fontWeight: "bold",
      color: "#ffffff",
      fontSize: 25,
    },
  });
};
